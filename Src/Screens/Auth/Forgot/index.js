import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    View,
} from 'react-native';
import styles from './styles'
import images from '../../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import Input from '../../../Component/Textinput';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import { NetworkInfo } from "react-native-network-info"
import CommonMethods from '../../../Lib/CommonMethods';
import CustomLoader from '../../../Component/CustomLoader'
import String from '../../../Component/String';
import { set } from 'react-native-reanimated';
import NetInfo from "@react-native-community/netinfo";

const ForgotPassword = () => {
    const [Loginid, setLoginid] = useState('');
    const [Mobile, setMobile] = useState('');
    const [loaderVisible, setloaderVisible] = useState(false)
    const navigation = useNavigation();
    const [errors, seterrors] = useState([])
    const [Loginerror, setLoginerror] = useState('')
    const [Mobileerror, setMobileerror] = useState('')

    const ref_input2 = useRef();
    const mobileref = useRef()

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    const Sendotp = (value) => {
        showLoader()

        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("rendom_gen", rnd, value);
        Helper.user_TempToken = value;

        //AES 128 Encryption
        var AES128Ency = Helper.AES_128_Encryption(value)
        console.log("otpresendencrpyted_Result", AES128Ency);

        // Api Call 
        Apicall.ApiMethod(Constant.POST, ApiUrl.SendMessage, AES128Ency).then((resp) => {
            hideLoader()
            console.log("resss_Resendotp", resp);
            CommonMethods.showSuccess("Otp send to register mobile number")
            navigation.navigate('Verification', { usertoken: value, userdetails: Mobile, flag: 'Forgot_Password' })

            // var response = resp.data

            // if (response == 1) {
            //     console.log("Resendotp status code is 200");
            //     CommonMethods.showSuccess("Otp send to register mobile number")
            //     navigation.navigate('Verification', { usertoken: usertkn, userdetails: Mobile, flag: 'Forgot_Password' })
            // }
            // else {
            //     CommonMethods.showError("Something went wrong! Please try again")
            //     console.log("Resendotp status code is 400");
            // }
        })
    }

    const onsubmit = () => {
        if (onsubmitvalidate()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("success");
                    showLoader();

                    var finalvar = Loginid + "|" + Mobile;
                    console.log("finalvalsingup", finalvar)
                    let ancyp = finalvar.toLowerCase();

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(ancyp)
                    console.log("forgotpsdencrpyted_Result", AES128Ency);
                    Apicall.ApiMethod(Constant.POST, ApiUrl.CheckUser, AES128Ency).then((resp) => {
                        hideLoader()

                        var response = resp.data;
                        console.log("result_checkuser", response);

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)

                        var splitdata = AES128Decry.split("|")
                        console.log("Decrpytedvaue", splitdata);


                        if (splitdata[0] == -1) {
                            CommonMethods.showError("User not register! Please check LoginId or Mobile Number")
                            console.log("user not register");
                        }
                        else if (splitdata[0] == 0) {
                            console.log("user register");

                            //Api Call
                            Sendotp(splitdata[3])
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
    //     var regex = /^[A-Za-z0-9 ]+$/

    //     console.log("loginnnnnn", Loginid, Mobile);
    //     if (Loginid == '') {
    //         CommonMethods.showError("Please enter Loginid")
    //         console.log("Please enter Loginid")
    //         return false
    //     }
    //     else if (regex.test(Loginid) == '') {
    //         CommonMethods.showError("LoginId does not allow special character(!@#$%^&)")
    //         console.log("User name does not allow special character(!@#$%^&),")
    //         return false
    //     }
    //     else if (Mobile == '') {
    //         CommonMethods.showError("Please enter mobile number")
    //         console.log("Please enter mobile number");
    //         return false
    //     }
    //     else if (Mobile.startsWith("0") === true) {
    //         CommonMethods.showError("Mobile Number Not Start With 0")
    //         console.log("Mobile Number Not Start With 0")
    //         return false
    //     }
    //     else if (Mobile.length < 10) {
    //         CommonMethods.showError("mobile number should be 10 digit")
    //         console.log("mobile number should be 10 digit");
    //         return false
    //     }
    //     else if (regex.test(Mobile) == '') {
    //         CommonMethods.showError("Mobile Number does not allow special character(!@#$%^&)")
    //         console.log("Mobile Number does not allow special character(!@#$%^&),")
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // };
    let error = []


    const onsubmitvalidate = () => {
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;
        let firstChar = Loginid.charAt(0);
        if (Loginid === '') {
            // CommonMethods.showError("Please enter Loginid")
            console.log("Please enter Loginid")
            error.push('Loginid')
            setLoginerror('Please Enter Loginid')
        }
        else if (format.test(firstChar)) {
            console.log('Loginid Not Start with Special Character or Number')
            error.push('Loginid')
            setLoginerror('Loginid Not Start with Special Character or Number')
        }
        if (Mobile === '') {
            error.push('Mobile')
            setMobileerror('Please Enter Mobile Number')

            console.log("Please enter mobile number");
        }
        else if (Mobile.startsWith("0") === true) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (Mobile.startsWith("1") === true) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }
        else if (Mobile.length < 10) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
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
    const validateEmail = () => {
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;
        let firstChar = Loginid.charAt(0);
        if (Loginid === '') {
            // CommonMethods.showError("Please enter Loginid")
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
        else if (Mobile === '') {
            error.push('Mobile')
            setMobileerror('Please Enter Mobile Number')

            console.log("Please enter mobile number");
        }
        else if (Mobile.startsWith("0") === true) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (Mobile.startsWith("1") === true) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }
        else if (Mobile.length < 10) {
            error = []
            error.push('Mobile')
            setMobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
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

    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />

            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.submain}>
                        <View style={styles.headview}>
                            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                <Text style={styles.containsubH}> Forgot Password</Text>
                            </View>

                            <View style={{ marginHorizontal: 30, marginTop: 40 }} removeClippedSubviews={true}>
                                <Text style={styles.Textview}> Enter LoginID</Text>
                                <TextInput
                                    placeholder="Enter LoginID"
                                    style={styles.Textinput}
                                    value={Loginid}
                                    underlineColorAndroid="transparent"
                                    contextMenuHidden={true}
                                    placeholderTextColor="#B5B5B5"
                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    returnKeyType="next"

                                    onChangeText={text => {
                                        setLoginid(text.replace(/[`\?<>"'!\\\/\s«≤‹⟨⟩»≥›]/gi, ''))

                                        seterrors([])
                                    }}
                                    onSubmitEditing={() => { ref_input2.current.focus(), validateEmail() }}
                                />
                                {
                                    errors.includes('Loginid') ?
                                        <Text style={styles.Errortextview}>{Loginerror}</Text> : null
                                }
                            </View>
                            <View style={{ marginHorizontal: 30, marginTop: 25 }} removeClippedSubviews={true}>
                                <Text style={styles.Textview}> Enter Mobile Number</Text>
                                <TextInput
                                    placeholder="Enter Mobile Number"
                                    style={styles.Textinput}
                                    value={Mobile}
                                    ref={ref_input2}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#B5B5B5"
                                    contextMenuHidden={true}
                                    maxLength={10}
                                    keyboardType="numeric"
                                    onChangeText={text => { setMobile(text.replace(/[`~a-z!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                    onSubmitEditing={() => onsubmit()}

                                />
                                {
                                    errors.includes('Mobile') ?
                                        <Text style={styles.Errortextview}>{Mobileerror}</Text> : null
                                }
                            </View>


                            <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                                <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
                                    <Text style={[styles.appButtonText]}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView >
    );
};

export default ForgotPassword;
