import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    Modal,
    View,
} from 'react-native';
import styles from './styles'
import Input from '../../../Component/Textinput';
import CommonMethods from '../../../Lib/CommonMethods'
import String from '../../../Component/String';
import images from '../../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Constant from '../../../Component/Constant';
import { handleNavigation } from '../../../navigation/Route';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import CustomLoader from '../../../Component/CustomLoader';
// import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import DateTimePicker from 'react-native-modal-datetime-picker';
import NetInfo from "@react-native-community/netinfo";

import moment from 'moment'
import Colors from '../../../Component/Color';
const Signup = () => {
    const [loginid, setloginid] = useState('')
    const [password, setpassword] = useState('')
    const [mobile, setmobile] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [dob, setdob] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [calendar, setcalendar] = useState(false)
    const navigation = useNavigation();
    const [loaderVisible, setloaderVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalshow, setmodalshow] = useState(false)
    const [datepicker, setdatepicker] = useState()


    //Error state
    const [Loginerror, setLoginerror] = useState('')
    const [Mobileerror, setMobileerror] = useState('')

    const [Passworderror, setPassworderror] = useState('')
    const [errors, seterrors] = useState([])
    const [firstnameerror, setfirstnameerror] = useState('')
    const [lastnameerror, setlastnameerror] = useState('')
    const [doberror, setdoberror] = useState('')
    const [emailerro, setemailerror] = useState('')
    const [addresserror, setaddresserror] = useState('')
    const [cityerror, setcityerror] = useState('')
    const [check, setcheck] = useState(true)

    const loginref = useRef()
    const Mobileref = useRef()
    const passwordref = useRef()
    const firstref = useRef()
    const lastref = useRef()
    const dobref = useRef()
    const emailref = useRef()
    const addresref = useRef()
    const ciryref = useRef()


    const changeSelectedDate = (date) => {
        console.log("dateselect", date);
        setdatepicker(date)
        var local_date = moment.utc(date).local().format('MMMM Do YYYY');
        console.log("convertyyy", local_date);
        setdob(local_date)
        seterrors([])
        setcalendar(false)
        console.log("vauofdobb", dob);
    };
    const _hideDateTimePicker = () => {
        setcalendar(false)
    }

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    const apicall = () => {
        // showLoader()
        // var dateofbirth = new Date(dob)
        // console.log("dobbbb", dateofbirth);
        Helper.Sha256conversion(password).then((Sha256psw) => {
            console.log("passwordSha256", Sha256psw);
            var City = city.replace(/ /g, "")
            var data = JSON.stringify({
                "LoginID": loginid,
                "Password": Sha256psw,
                "MobilePhone": mobile,
                "FirstName": firstname,
                "LastName": lastname,
                "DOB": datepicker,
                "Email": email,
                "Address": address,
                "City": City
            });
            console.log("dataofvallll____", data);

            // Aes 128 encryption
            var AES128Ency = Helper.AES_128_Encryption(data)
            console.log("Dashboardencrpyted_Result", AES128Ency);
            Apicall.ApiMethod(Constant.POST, ApiUrl.Signup, AES128Ency).then((resp) => {
                hideLoader()
                console.log("result_signup", resp.data);
                if (resp.status == 200) {
                    CommonMethods.showSuccess('Otp Send to Register Number')
                    var response = resp.data
                    console.log("singup_responsevalue", response);
                    navigation.navigate('Verification', { usertoken: response, userdetails: JSON.parse(data), flag: 'Singup' })
                    // handleNavigation({ type: 'setRoot', page: 'Verification', navigation: navigation })

                }


            })

        })
    }
    const onsubmit = () => {

        if (onsubmitvalidation()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    showLoader()
                    console.log("all good");

                    var finalvar = loginid + "|" + mobile;
                    console.log("finalvalsingup", finalvar)
                    let ancyp = finalvar.toLowerCase();

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(ancyp)
                    console.log("Dashboardencrpyted_Result", AES128Ency);
                    Apicall.ApiMethod(Constant.POST, ApiUrl.Checkexistuser, AES128Ency).then((resp) => {
                        hideLoader()

                        console.log("result_checkuser", resp.data);
                        if (resp.data == 0) {
                            console.log("email and phone valid");
                            apicall()
                        }
                        else if (resp.data == 1) {
                            CommonMethods.showError('loginid already exist')

                            console.log("loginid already exist");
                        }
                        else if (resp.data == 2) {
                            console.log("phone number already exist");
                            CommonMethods.showError('phone number already exist')
                        }
                        else {
                            console.log("something went wrong");
                            CommonMethods.showError('Something went wrong! Please try again')
                        }

                    })


                }
                else {
                    hideLoader()
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })
        }
    }

    // const validateEmail = () => {
    //     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    //     var regex = /^[A-Za-z0-9 ]+$/

    //     if (loginid == '') {
    //         CommonMethods.showError("Enter LoginId")
    //         console.log("Enter LoginId")
    //         return false
    //     }
    //     else if (regex.test(loginid) == '') {
    //         CommonMethods.showError("LoginId does not allow special character(!@#$%^&)")
    //         console.log("LoginId does not allow special character(!@#$%^&),")
    //         return false
    //     }
    //     else if (mobile == '') {
    //         CommonMethods.showError("Enter Your Mobile Number")
    //         console.log("Enter Your Mobile Number")
    //         return false
    //     }
    //     else if (mobile.startsWith("0") === true) {
    //         CommonMethods.showError("Mobile Number Not Start With 0")
    //         console.log("Mobile Number Not Start With 0")
    //         return false
    //     }
    //     else if (mobile.length < 10) {
    //         CommonMethods.showError("Mobile Number should 10 digits require")
    //         console.log("Mobile Number should 10 digits require")
    //         return false
    //     }
    //     else if (regex.test(mobile) == '') {
    //         CommonMethods.showError("Mobile Number does not allow special character(!@#$%^&)")
    //         console.log("Mobile Number does not allow special character(!@#$%^&),")
    //         return false
    //     }
    //     else if (password == '') {
    //         CommonMethods.showError("Enter Your Password")
    //         console.log("Enter Your Password")
    //         return false
    //     }
    //     else if (strongRegex.test(password) == '') {
    //         CommonMethods.showError(" Passwrod must contain one special character(!@#$), one Uppercase letter(A-Z), one Lowercase letter(a-z), one number(0-9)")
    //         console.log("Enter Your Password")
    //         return false
    //     }
    //     else if (password.length < 6) {
    //         CommonMethods.showError("Password Minimum 8 Character require")
    //         console.log("Password Minimum 8 Character require")
    //         return false
    //     }
    //     else if (firstname == '') {
    //         CommonMethods.showError("Enter Your First Name")
    //         console.log("Enter Your First Name")
    //         return false
    //     }
    //     else if (lastname == '') {
    //         CommonMethods.showError("Enter Your Last Name")
    //         console.log("Enter Your Last Name")
    //         return false
    //     }
    //     else if (dob == '') {
    //         CommonMethods.showError("Please Select Your Date of birth")
    //         console.log("Please Select Your Date of birth")
    //         return false
    //     }
    //     else if (email == '') {
    //         CommonMethods.showError("Enter Your Email")
    //         console.log("Enter Your Email")
    //         return false
    //     }
    //     else if (reg.test(email) == '') {
    //         CommonMethods.showError("Email Not Valid")
    //         console.log("Email Not Valid")
    //         return false
    //     }
    //     else if (address == '') {
    //         CommonMethods.showError("Enter Your Address")
    //         console.log("Enter Your Address")
    //         return false
    //     }
    //     else if (city == '') {
    //         CommonMethods.showError("Enter Your City")
    //         console.log("Enter Your City")
    //         return false
    //     }
    //     else {
    //         return true
    //     }

    // };
    let error = []

    const onsubmitvalidation = () => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;
        let firstChar = loginid.charAt(0);

        if (loginid === '') {
            error = []
            console.log("Please enter Loginid")
            error.push('Loginid')
            setLoginerror('Please Enter Loginid')
        }
        else if (format.test(firstChar)) {
            console.log('Loginid Not Start with Special Character or Number')
            error.push('Loginid')
            setLoginerror('Loginid Not Start with Special Character or Number')
        }
        else if (loginid.length < 3) {
            // error = []
            error.push('Loginid')
            setLoginerror("Loginid Should contain minimum 3 Character")

            console.log("Loginid Should contain minimum 3 Character");
        }
        if (mobile === '') {
            error.push('Mobile')
            setMobileerror('Please Enter Mobile Number')
            console.log("Please enter mobile number");
        }
        else if (isNaN(mobile)) {
            error.push('Mobile')
            setMobileerror('Mobile Number should be digit')
            console.log("Mobile Number should be digit");
        }
        else if (mobile.startsWith("0") === true) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (mobile.startsWith("1") === true) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }
        else if (mobile.length < 10) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
        }
        if (password === '') {
            error.push('Password')
            setPassworderror('Please Enter Password')

            console.log("Please enter Password");
        }
        else if (password.length < 6) {
            error.push('Password')
            setPassworderror('Password should contain atleast 6 characters')
            console.log("Password should contain atleast 6 characters");
        }
        else if (strongRegex.test(password) == '') {
            error.push('Password')
            setPassworderror('Password Not Valid')
            console.log("Enter vaild password")
        }
        if (firstname == '') {
            error.push('firstname')
            setfirstnameerror("Enter Your First Name")
            console.log("Enter Your First Name")
        }
        if (lastname == '') {
            error.push('lastname')
            setlastnameerror("Please Enter Your Last Name")
            console.log("Enter Your Last Name")
        }
        if (dob == '') {
            error.push('dob')
            setdoberror("Please Select Your Date of birth")
            console.log("Please Select Your Date of birth")

        }
        if (email == '') {
            error.push('email')
            setemailerror("Please Enter Your Email")
            console.log("Enter Your Email")
        }
        else if (reg.test(email) == '') {
            error = []
            error.push('email')
            setemailerror("Email Not Valid")
            console.log("Email Not Valid")
        }
        if (address == '') {
            error.push('address')
            setaddresserror("Please Enter Your Address")
            console.log("Enter Your Address")
        }
        else if (address.length < 3) {
            console.log('Address should contain min 3 character');
            error.push('address')
            setaddresserror("Address should contain min 3 character")
        }
        if (city == '') {
            error.push('city')
            setcityerror("Please Enter Your City")
            console.log("Enter Your City")
        }
        else if (city.length < 3) {
            console.log('City should contain min 3 character');
            error.push('city')
            setcityerror("City should contain min 3 character")
        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            return true
        }
    };

    const refershsingup = () => {
        setloginid('')
        setpassword('')
        setmobile('')
        setfirstname('')
        setlastname('')
        setdob('')
        setemail('')
        setcity('')
        setaddress('')
        setcalendar('')
        seterrors([])
    }

    const validateEmail = () => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;
        let firstChar = loginid.charAt(0);
        if (loginid === '') {
            error = []
            console.log("Please enter Loginid")
            error.push('Loginid')
            setLoginerror('Please Enter Loginid')
        }
        else if (format.test(firstChar)) {
            console.log('Loginid Not Start with Special Character or Number')
            error.push('Loginid')
            setLoginerror('Loginid Not Start with Special Character or Number')
        }
        else if (loginid.length < 3) {
            // error = []
            error.push('Loginid')
            setLoginerror("Loginid Should contain minimum 3 Character")

            console.log("Loginid Should contain minimum 3 Character");
        }
        else if (mobile === '') {
            error.push('Mobile')
            setMobileerror('Please Enter Mobile Number')
            console.log("Please enter mobile number");
        }
        else if (isNaN(mobile)) {
            error.push('Mobile')
            setMobileerror('Mobile Number should be digit')
            console.log("Mobile Number should be digit");
        }
        else if (mobile.startsWith("0") === true) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (mobile.startsWith("1") === true) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }

        else if (mobile.length < 10) {
            // error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
        }
        else if (password === '') {
            error.push('Password')
            setPassworderror('Please Enter Password')

            console.log("Please enter Password");
        }
        else if (password.length < 6) {
            error.push('Password')
            setPassworderror('Password should contain atleast 6 characters')
            console.log("Password should contain atleast 6 characters");
        }
        else if (strongRegex.test(password) == '') {
            error.push('Password')
            setPassworderror('Password Not Valid')
            console.log("Enter vaild password")
        }
        else if (firstname == '') {
            error.push('firstname')
            setfirstnameerror("Enter Your First Name")
            console.log("Enter Your First Name")
        }
        else if (lastname == '') {
            error.push('lastname')
            setlastnameerror("Please Enter Your Last Name")
            console.log("Enter Your Last Name")
        }
        else if (dob == '') {
            error.push('dob')
            setdoberror("Please Select Your Date of birth")
            console.log("Please Select Your Date of birth")

        }
        else if (email == '') {
            error.push('email')
            setemailerror("Please Enter Your Email")
            console.log("Enter Your Email")
        }
        else if (reg.test(email) == '') {
            error = []
            error.push('email')
            setemailerror("Email Not Valid")
            console.log("Email Not Valid")
        }
        else if (address == '') {
            error.push('address')
            setaddresserror("Please Enter Your Address")
            console.log("Enter Your Address")
        }
        else if (address.length < 3) {
            console.log('Address should contain min 3 character');
            error.push('address')
            setaddresserror("Address should contain min 3 character")
        }
        else if (city == '') {
            error.push('city')
            setcityerror("Please Enter Your City")
            console.log("Enter Your City")
        }
        else if (city.length < 3) {
            console.log('City should contain min 3 character');
            error.push('city')
            setcityerror("City should contain min 3 character")
        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            return true
        }
    };


    const spacechceck = (val, data) => {
        var value = val.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
        var format = /[`\s]/;
        let firstChar = value.charAt(0);
        if (format.test(firstChar)) {
            console.log("space hai isme", data);
            var str = value.substring(1);
            console.log(str);
            if (data === 0) {
                setfirstname(str)
                seterrors([])
            }
            else if (data === 1) {
                setlastname(str)
                seterrors([])
            }
            else if (data === 2) {
                setcity(str)
                seterrors([])
            }


        }
        else {
            if (data === 0) {
                setfirstname(value)
                seterrors([])
            }
            else if (data === 1) {
                setlastname(value)
                seterrors([])
            }
            else if (data === 2) {
                setcity(value)
                seterrors([])
            }
        }
    }
    const address_spacechceck = (val) => {
        var value = val.replace(/[`~!@$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓|+\=?;:'".<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')

        var format = /[`\s]/;
        let firstChar = value.charAt(0);
        if (format.test(firstChar)) {
            console.log("addisme");
            var str = value.substring(1);
            console.log(str);
            setaddress(str)
            seterrors([])
        }
        else {
            setaddress(value)
            seterrors([])
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomLoader loaderVisible={loaderVisible} />

            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.submain}>

                        <View style={styles.headview}>

                            <Text style={styles.containsubH}> SIGN UP </Text>
                            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                                flexGrow: 1,
                                // padding: 20
                            }}> */}
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                                style={{ flex: 1 }}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                                    <View style={styles.textview}>
                                        <TextInput
                                            placeholder="Login ID"
                                            style={styles.Textinput}
                                            contextMenuHidden={Platform.OS === 'ios' ? true : false}
                                            maxLength={20}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            value={loginid}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            onChangeText={text => {
                                                setloginid(text.replace(/[`\?<>"'\\\/«≤‹⟨⟩»≥›!\s]/gi, ''))
                                                seterrors([])
                                            }}
                                            onSubmitEditing={() => { Mobileref.current.focus(), validateEmail() }}

                                        />
                                        {
                                            errors.includes('Loginid') ?
                                                <Text style={styles.Errortextview}>{Loginerror}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 0, }]}>
                                        <TextInput
                                            placeholder="Mobile No."
                                            style={styles.Textinput}
                                            value={mobile}
                                            keyboardType="numeric"
                                            contextMenuHidden={true}
                                            maxLength={10}
                                            ref={Mobileref}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            onChangeText={text => { setmobile(text.replace(/[`~a-z!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
                                            onSubmitEditing={() => { passwordref.current.focus(), validateEmail() }}
                                        />
                                        {
                                            errors.includes('Mobile') ?
                                                <Text style={styles.Errortextview}>{Mobileerror}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 0, }]} renderToHardwareTextureAndroid={true}>
                                        {/* <TextInput
                                            placeholder="Password"
                                            style={styles.Textinput}
                                            value={password}
                                            // keyboardType='visible-password'
                                            ref={passwordref}
                                            secureTextEntry={check}
                                            underlineColorAndroid="transparent"
                                            // contextMenuHidden={Platform.OS === 'ios' ? true : false}
                                            placeholderTextColor="#B5B5B5"
                                            autoCapitalize='none'
                                            maxLength={15}
                                            onChangeText={text => { setpassword(text.replace(/[`%^&£¢€©¥°••√π÷×¶∆₹°°©®™✓()|+\?;:'",<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            onSubmitEditing={() => { firstref.current.focus(), validateEmail() }}

                                        /> */}
                                        <TextInput
                                            placeholder="Password"
                                            style={styles.Textinput}
                                            value={password}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor={Colors.inputcolor}
                                            // secureTextEntry={check}
                                            // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            maxLength={15}
                                            ref={passwordref}
                                            onChangeText={text => { setpassword(text.replace(/[`%^&£¢€©¥°••√π÷×¶∆₹°°©®™✓()|+\?;:'",<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            onSubmitEditing={() => { firstref.current.focus(), validateEmail() }}
                                        />
                                        {
                                            errors.includes('Password') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{Passworderror}</Text> : null
                                        }

                                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                                            <Text style={styles.forgotview}> Password Policy? </Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={[styles.textview, { marginTop: 0, }]}>
                                        <TextInput
                                            placeholder="First Name"
                                            style={styles.Textinput}
                                            value={firstname}
                                            contextMenuHidden={true}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            ref={firstref}
                                            maxLength={40}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            onChangeText={text => { spacechceck(text, 0) }}
                                            onSubmitEditing={() => { lastref.current.focus(), validateEmail() }}
                                        />

                                        {
                                            errors.includes('firstname') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{firstnameerror}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 0, }]}>
                                        <TextInput
                                            placeholder="Last Name"
                                            style={styles.Textinput}
                                            value={lastname}
                                            contextMenuHidden={true}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            maxLength={40}
                                            ref={lastref}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            // onChangeText={text => { setlastname(text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            onChangeText={text => { spacechceck(text, 1) }}
                                            onSubmitEditing={() => { emailref.current.focus(), validateEmail() }}
                                        />

                                        {
                                            errors.includes('lastname') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{lastnameerror}</Text> : null
                                        }
                                    </View>
                                    <View style={styles.Dobview}>
                                        <Text style={styles.Dobtextview}> {dob ? dob : "Date of Birth"}</Text>
                                        <TouchableOpacity onPress={() => setcalendar(true)} style={{ flex: 0.2 }}>
                                            <Image
                                                source={require('../../../assets/Images/calendar.png')}
                                                resizeMode="center"
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    {
                                        errors.includes('dob') ?
                                            <Text style={[styles.Errortextview, { marginHorizontal: 40 }]}>{doberror}</Text> : null
                                    }

                                    <View style={[styles.textview, { marginTop: 0, }]}>
                                        <TextInput
                                            placeholder="Email"
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            style={styles.Textinput}
                                            value={email}
                                            ref={emailref}
                                            maxLength={50}
                                            contextMenuHidden={true}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            onChangeText={text => { setemail(text.replace(/[\s«≤‹⟨⟩»≥›]/gi, '')), seterrors([]) }}
                                            onSubmitEditing={() => { addresref.current.focus(), validateEmail() }}
                                        />
                                        {
                                            errors.includes('email') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{emailerro}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 0, }]}>
                                        <TextInput
                                            placeholder="Address"
                                            style={styles.Textinput}
                                            value={address}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            ref={addresref}
                                            contextMenuHidden={true}
                                            maxLength={100}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            // onChangeText={text => { setaddress(text.replace(/[`~!@$%^&*|+=?;:'"<>«≤‹⟨⟩»≥›]/gi, '')), seterrors([]) }}
                                            onChangeText={text => { address_spacechceck(text) }}

                                            onSubmitEditing={() => { ciryref.current.focus(), validateEmail() }}
                                        />
                                        {
                                            errors.includes('address') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{addresserror}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 0, marginBottom: 0 }]}>
                                        <TextInput
                                            placeholder="City"
                                            style={styles.Textinput}
                                            value={city}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            ref={ciryref}
                                            contextMenuHidden={true}
                                            maxLength={15}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#B5B5B5"
                                            onChangeText={text => { setcity(text.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>\s«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            // onChangeText={text => { spacechceck(text, 2) }}
                                            onSubmitEditing={() => { validateEmail() }}
                                        />
                                        {
                                            errors.includes('city') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 20 }]}>{cityerror}</Text> : null
                                        }
                                    </View>


                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }} onPress={() => refershsingup()}>
                                        <Text style={[styles.subcontainer, { color: Colors.appcolor, fontSize: 16, fontWeight: 'bold' }]}> Refresh? </Text>
                                        <Image source={images.refersh} resizeMode='contain' style={{ height: '70%', width: '5%', tintColor: Colors.appcolor }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonview} onPress={onsubmit}>
                                        <Text style={styles.buttonText}> Submit </Text>
                                    </TouchableOpacity>

                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 50, marginTop: 15 }}>
                                        <Text style={[styles.subcontainer, { color: '#B5B9BA' }]}> Already have an account? </Text>
                                        <TouchableOpacity onPress={() =>
                                            handleNavigation({ type: 'setRoot', page: 'usersignin', navigation: navigation })
                                        }>
                                            <Text style={[styles.subcontainer, { fontSize: 15, color: Colors.boldtheme, fontWeight: 'bold' }]}> SIGN IN! </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>

                            {/* </ScrollView> */}

                        </View>

                    </View>

                </View>
                <DateTimePicker
                    date={datepicker}
                    isVisible={calendar}
                    onConfirm={changeSelectedDate}
                    onCancel={_hideDateTimePicker}
                    maximumDate={new Date()}
                />
                {modalVisible ?
                    <View style={{ backgroundColor: '#00000088', flex: 1 }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={{ marginHorizontal: 40, marginVertical: '55%', backgroundColor: 'white', }}>
                                <Text style={styles.modaltextHead}>Password Policy</Text>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text> 1. Password should contain atleast 6 characters.</Text>
                                    <Text> 2. Password should contain atleast one numeric digit..</Text>
                                    <Text> 3. Password should contain atleast one Capital Letter.</Text>
                                    <Text> 4. Password should contain atleast one special character from !@#$*_-~=..</Text>
                                </View>


                                <TouchableOpacity
                                    style={styles.modalbutton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modaltext}>Ok</Text>
                                </TouchableOpacity>

                            </View>
                        </Modal>


                    </View> : null
                }

            </ImageBackground>
        </SafeAreaView >
    );
};

export default Signup;
