// import React, { Component, useState, useEffect, useRef } from 'react';
// import {
//     SafeAreaView,
//     ImageBackground,
//     Text,
//     Image,
//     KeyboardAvoidingView,
//     TouchableOpacity,
//     View,
//     TextInput,
//     keyboard
// } from 'react-native';
// import BackNavigation from '../../../Lib/BackNavigation';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import images from '../../../Component/Imagepath';
// import CommonMethods from '../../../Lib/CommonMethods';
// import Input from '../../../Component/Textinput';
// import { ScrollView } from 'react-native-gesture-handler';
// import moment from 'moment'
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import DateTimeselect from 'react-native-modal-datetime-picker';
// import Constant from '../../../Component/Constant';
// import Helper from '../../../Component/Helper';
// import ApiUrl from '../../../Component/ApiURl';
// import Apicall from '../../../Component/Apicall';
// import base64 from 'react-native-base64';
// import ConvMethods from '../../../Component/Methods';
// import CustomLoader from '../../../Component/CustomLoader';

// const PayDetails = (props) => {
//     // console.log("props_paydeatils", props.route.params);
//     const navigation = useNavigation();
//     const [address, setaddress] = useState('')
//     const [mobile, setmobile] = useState('')
//     const [city, setcity] = useState('')
//     const [Remitter, setRemitter] = useState('')
//     const [PayDetails, setPaydetails] = useState(props.route.params)
//     const [pincode, setpincode] = useState('')
//     const [remark, setremark] = useState('')
//     const [fromdate, setfromdate] = useState(moment.utc().local())
//     const [todate, settodate] = useState(moment.utc().local())
//     const [DepartName, setDepartmentName] = useState('')

//     const [fromcalendar, setfromcalendar] = useState(false)
//     const [Tocalendar, settocalendar] = useState(false)
//     const [calander, setcalander] = useState(false)

//     const [fromdateime, setformdatetime] = useState(moment.utc().local())
//     const [todateime, settodatetime] = useState(moment.utc().local())

//     const [Vehicle, setVehicle] = useState('')

//     const [flag, setflag] = useState('');
//     const [loaderVisible, setloaderVisible] = useState(false)

//     const [errors, seterrors] = useState([])
//     const [addresserror, setaddresserror] = useState('')
//     const [mobileerror, setmobileerror] = useState('')
//     const [cityerror, setcityerror] = useState('')
//     const [Remittererror, setRemittererror] = useState('')
//     const [pincodeerror, setpincodeerror] = useState('')
//     const [Vehicleerror, setVehicleerror] = useState('')


//     const hideLoader = () => { setloaderVisible(false) }

//     const showLoader = () => { setloaderVisible(true) }

//     const Remitterref = useRef()
//     const Mobileref = useRef()
//     const Pincoderef = useRef()
//     const addresref = useRef()
//     const ciryref = useRef()

//     useEffect(() => {
//         console.log("Payee details useeffect call", PayDetails, Helper.DepartName);
//         if (Helper.DepartName) {
//             // var deptname = PayDetails.Challaninfo?.Dep_Name?.deptnameEnglish
//             var deptname = Helper.DepartName
//             setDepartmentName(deptname[1])
//         }
//         // setDepartmentName(data[1])
//         var date = new Date()
//         var local_date = moment.utc(date).local().format('MMMM Do YYYY');
//         console.log("newdateee_______", local_date);
//         setfromdate(local_date)
//         settodate(local_date)
//         ProfileDetails()
//     }, [])
//     let error = []

//     const ProfileDetails = () => {
//         showLoader()
//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//         var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//         console.log("fialvalrof_payee", finalvar);

//         // Aes 128 encryption
//         var AES128Ency = Helper.AES_128_Encryption(finalvar)
//         // console.log("Districtencrpyted_Result", AES128Ency);

//         // string To bytes conversion
//         var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//         // console.log("srtingTobytes", stringTobytes);

//         // bytes array to base64 conversion 
//         var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//         // console.log("respp_base64", bytesTobase64)

//         //Challan api call
//         Apicall.MainApiMethod(Constant.GET, ApiUrl.PayeeDetails, bytesTobase64).then((resp) => {
//             console.log("respppppp", resp.data);
//             hideLoader()
//             var response = resp.data.GetUserProfileDetailResult

//             //AES 128 Decryption
//             var AES128Decry = Helper.AES_128_Decryption(response)
//             // console.log("aes128dec_Challandetails", AES128Decry);

//             var splitdata = AES128Decry.split("|")
//             console.log("splitdataresult_", splitdata);
//             if (splitdata[0] == rnd) {
//                 setRemitter(splitdata[1])
//                 setaddress(splitdata[2])
//                 setcity(splitdata[3])
//                 setmobile(splitdata[4])
//                 setpincode(splitdata[5])
//             }
//             else {
//                 console.log("Treasury status code is 400");
//             }

//         })
//     }
//     const lastDateOfYear = `15/31/${new Date().getFullYear()}`;

//     const onsubmit = () => {
//         if (onsubmitvalidation()) {
//             console.log("success");

//             showLoader()
//             // random number generate
//             var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//             console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//             var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//             console.log("fialvalrof_payee", finalvar);

//             // Aes 128 encryption
//             var AES128Ency = Helper.AES_128_Encryption(finalvar)
//             console.log("Districtencrpyted_Result", AES128Ency);

//             // string To bytes conversion
//             var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//             console.log("srtingTobytes", stringTobytes);

//             // bytes array to base64 conversion 
//             var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//             console.log("respp_base64", bytesTobase64)
//             Helper.VehicleNumber = Vehicle.toUpperCase()

//             if (Helper.ProfileChallan) {
//                 var profileid = Helper.ServiceName
//                 console.log("profiileid_paymentcheck", profileid);

//                 var data = profileid
//                 console.log("paymentdeatils data", data);
//                 var Url = ApiUrl.CreateChallanSchemas
//             }
//             else if (Helper.IsRepeatChallan) {
//                 var profileid = Helper.GrnInfo.GRN
//                 console.log("Repart_payment", profileid);

//                 var data = profileid
//                 console.log("paymentdeatils data_1", data);
//                 var Url = ApiUrl.RepeatcreateSchmeas
//             }
//             else {
//                 var deptname = Helper.ServiceName.ServiceId
//                 var splitcode = deptname.split('|')
//                 console.log("spitedddddd+", splitcode);

//                 var data = splitcode[0] + '|' + Helper.DepartName[0]

//                 console.log("pipline data_", data);
//                 var Url = ApiUrl.CreateServiceSchemas
//             }




//             //Challan api call
//             console.log("apiurrrr_", Url);
//             Apicall.MainApiMethod(Constant.POST, Url, bytesTobase64, data).then((resp) => {
//                 console.log("respppppp", resp.data);
//                 hideLoader()
//                 var response = resp.data

//                 //AES 128 Decryption
//                 var AES128Decry = Helper.AES_128_Decryption(response)
//                 console.log("aes128dec_Challandetails", AES128Decry);

//                 var splitdata = AES128Decry.split("|")
//                 console.log("splitdataresult_", splitdata);
//                 if (splitdata[0] == rnd) {
//                     console.log("resultofapi_____", splitdata[1]);

//                     var payeeinfo = {
//                         fromdate: fromdateime,
//                         todate: todateime,
//                         address: address,
//                         city: city,
//                         mobile: mobile,
//                         pincode: pincode,
//                         remark: remark
//                     }
//                     console.log("payeinfofo", payeeinfo);
//                     Helper.Payeinfo = payeeinfo

//                     navigation.navigate('HeadDetails', { PayeeDetails: JSON.parse(splitdata[1]), Departname: DepartName, Challan: PayDetails })

//                 }
//                 else {
//                     console.log("Paydetails status code is 400");
//                 }

//             })
//         }
//         else {
//             // CommonMethods.showError("Server down! plese try again")
//         }
//     }
//     const onsubmitvalidation = () => {
//         let regex = /^([A-Za-z]){2}([0-9]){2}([A-Za-z]){2}([0-9]){4}?$/;
//         if (Remitter == '') {
//             error = []
//             console.log('Please Enter Remitter Name');
//             error.push('Remitter')
//             setRemittererror("Please Enter Remitter Name")
//         }
//         if (address == '') {
//             console.log('Please Enter Address');
//             error.push('address')
//             setaddresserror("Please Enter Address")
//         }
//         else if (address.length < 3) {
//             console.log('Address should contain min 3 character');
//             error.push('address')
//             setaddresserror("Address should contain min 3 character")
//         }
//         if (city == '') {
//             console.log('Please Enter City');
//             error.push('city')
//             setcityerror("Please Enter City")
//         }
//         else if (city.length < 3) {
//             console.log('City should contain min 3 character');
//             error.push('city')
//             setcityerror("City should contain min 3 character")
//         }
//         if (mobile === '') {
//             error.push('Mobile')
//             setmobileerror('Please Enter Mobile Number')
//             console.log("Please enter mobile number");
//         }
//         else if (mobile.startsWith("0") === true) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Not Start With 0")
//             console.log("Mobile Number Not Start With 0")
//         }
//         else if (mobile.startsWith("1") === true) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Not Start With 1")
//             console.log("Mobile Number Not Start With 1")
//         }

//         else if (mobile.length < 10) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Should be 10 digit")

//             console.log("mobile number should be 10 digit");
//         }
//         if (pincode == '') {
//             console.log('Please Enter Pincode');
//             error.push('pincode')
//             setpincodeerror("Please Enter Pincode")
//         }
//         if (Helper.DepartName[0] == 104) {
//             if (Vehicle == '') {
//                 console.log('vehicle number not blank')
//                 error.push('Vehicle')
//                 setVehicleerror("Please Enter Vehicle Number")
//             }
//             else if (regex.test(Vehicle) == '') {
//                 // CommonMethods.showError("Please Enter Valid pan card number")
//                 error.push('Vehicle')
//                 setVehicleerror('Please Enter Valid Vehicle Number')
//             }
//         }


//         if (error.length) {
//             console.log("erorororroro_", error);
//             seterrors(error)
//             return;
//         }
//         else if (error.length === 0) {
//             error = []
//             return true
//         }
//     }




//     const validation = () => {
//         let regex = /^([A-Za-z]){2}([0-9]){2}([A-Za-z]){2}([0-9]){4}?$/;

//         if (Remitter == '') {
//             error = []
//             console.log('Please Enter Remitter Name');
//             error.push('Remitter')
//             setRemittererror("Please Enter Remitter Name")
//         }
//         else if (address == '') {
//             console.log('Please Enter Address');
//             error.push('address')
//             setaddresserror("Please Enter Address")
//         }
//         else if (address.length < 3) {
//             console.log('Address should contain min 3 character');
//             error.push('address')
//             setaddresserror("Address should contain min 3 character")
//         }
//         else if (city == '') {
//             console.log('Please Enter City');
//             error.push('city')
//             setcityerror("Please Enter City")
//         }
//         else if (city.length < 3) {
//             console.log('City should contain min 3 character');
//             error.push('city')
//             setcityerror("City should contain min 3 character")
//         }
//         else if (mobile === '') {
//             error.push('Mobile')
//             setmobileerror('Please Enter Mobile Number')
//             console.log("Please enter mobile number");
//         }
//         else if (mobile.startsWith("0") === true) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Not Start With 0")
//             console.log("Mobile Number Not Start With 0")
//         }
//         else if (mobile.startsWith("1") === true) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Not Start With 1")
//             console.log("Mobile Number Not Start With 1")
//         }

//         else if (mobile.length < 10) {
//             // error = []
//             error.push('Mobile')
//             setmobileerror("Mobile Number Should be 10 digit")

//             console.log("mobile number should be 10 digit");
//         }
//         else if (pincode == '') {
//             console.log('Please Enter Pincode');
//             error.push('pincode')
//             setpincodeerror("Please Enter Pincode")
//         }
//         if (Helper.DepartName[0] == 104) {
//             if (Vehicle == '') {
//                 console.log('vehicle number not blank')
//                 error.push('Vehicle')
//                 setVehicleerror("Please Enter Vehicle Number")
//             }
//             else if (regex.test(Vehicle) == '') {
//                 // CommonMethods.showError("Please Enter Valid pan card number")
//                 error.push('Vehicle')
//                 setVehicleerror('Please Enter Valid Vehicle Number')
//             }
//         }


//         if (error.length) {
//             console.log("erorororroro_", error);
//             seterrors(error)
//             return;
//         }
//         else {
//             // keyboard.dismiss()
//             error = []
//             return true
//         }
//     }

//     const changeSelectedDate = (date) => {
//         console.log("dateselect", date);
//         var local_date = moment.utc(date).local().format('MMMM Do YYYY');
//         console.log("convertyyy", local_date);
//         if (flag == 'from') {
//             setfromdate(local_date)
//             setformdatetime(date)
//             setcalander(false)

//         }
//         else if (flag == 'to') {
//             settodate(local_date)
//             settodatetime(date)
//             setcalander(false)

//         }
//     };
//     const dateselect = (value) => {
//         console.log("deatefromval", value);
//         setcalander(true)
//         setflag(value)
//     }
//     // const Todateselect = (value) => {
//     //     console.log("deatetoval", value);
//     //     settocalendar(true)
//     //     setflag(value)
//     // }
//     const _hidefromDateTimePicker = () => {
//         setcalander(false)
//     }
//     // const _hidetoDateTimePicker = () => {
//     //     settocalendar(false)
//     // }

//     const spacechceck = (val, data) => {
//         var value = val.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
//         var format = /[`\s]/;
//         let firstChar = value.charAt(0);
//         if (format.test(firstChar)) {
//             console.log("space hai isme", data);
//             var str = value.substring(1);
//             console.log(str);
//             if (data === 0) {
//                 setRemitter(str)
//                 seterrors([])
//             }
//             else if (data === 1) {
//                 setcity(str)
//                 seterrors([])
//             }

//         }
//         else {
//             if (data === 0) {
//                 setRemitter(value)
//                 seterrors([])
//             }
//             else if (data === 1) {
//                 setcity(value)
//                 seterrors([])
//             }

//         }
//     }
//     const address_spacechceck = (val) => {
//         var value = val.replace(/[`~!@$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓|+\=?;:'".<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')

//         var format = /[`\s]/;
//         let firstChar = value.charAt(0);
//         if (format.test(firstChar)) {
//             console.log("addisme");
//             var str = value.substring(1);
//             console.log(str);
//             setaddress(str)
//             seterrors([])
//         }
//         else {
//             setaddress(value)
//             seterrors([])
//         }
//     }


//     return (
//         <SafeAreaView style={styles.container} >
//             <CustomLoader loaderVisible={loaderVisible} />
//             <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
//                 <View style={styles.mainview}>
//                     <View style={styles.headview}>
//                         <View style={{ flexDirection: 'row' }}>
//                             <BackNavigation navigation={navigation}
//                                 MargT={Platform.OS == 'ios' ? 20 : 22}
//                                 width={30}
//                                 height={30}
//                                 MargL={0}
//                             />
//                             <View style={{ marginTop: 30, flex: 0.8 }}>
//                                 <Text style={styles.containsubH}> Payee Details</Text>
//                             </View>
//                         </View>
//                         <View style={styles.headingview}>
//                             <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{DepartName}</Text>
//                         </View>
//                         <KeyboardAvoidingView
//                             behavior={Platform.OS === "ios" ? "padding" : "padding"}
//                             style={{ flex: 1 }}>
//                             <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 }}>
//                                     <View style={[styles.inputview, { marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between' }]}>
//                                         <View>
//                                             <Text style={styles.Textview}>From Date</Text>
//                                             <Input
//                                                 placeholder="From Date"
//                                                 style={[styles.Textinput, { width: '130%', fontSize: 12 }]}
//                                                 value={fromdate}
//                                                 editable={false}
//                                                 onChangeText={text => setfromdate(text)}
//                                             />
//                                         </View>
//                                         <TouchableOpacity onPress={() => dateselect('from')} >
//                                             <Image
//                                                 source={images.calander}
//                                                 style={styles.ImageStyle}
//                                             />
//                                         </TouchableOpacity>

//                                     </View>
//                                     <View style={[styles.inputview, { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }]}>
//                                         <View>
//                                             <Text style={styles.Textview}>To Date</Text>
//                                             <Input
//                                                 placeholder="To Date"
//                                                 style={[styles.Textinput, { width: '135%', fontSize: 12 }]}
//                                                 value={todate}
//                                                 onChangeText={text => settodate(text)}
//                                                 editable={false}
//                                             />
//                                         </View>
//                                         <TouchableOpacity onPress={() => dateselect('to')} >
//                                             <Image
//                                                 source={images.calander}
//                                                 style={styles.ImageStyle}
//                                             />
//                                         </TouchableOpacity>
//                                     </View>

//                                 </View>
//                                 <View style={styles.inputview}>
//                                     <Text style={styles.Textview}>Remitter Name</Text>
//                                     <TextInput
//                                         placeholder="Enter Remitter Name"
//                                         style={styles.Textinput}
//                                         keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
//                                         value={Remitter}
//                                         onChangeText={text => { spacechceck(text, 0) }}
//                                         // onChangeText={text => { setRemitter(text.replace(/[`~0-9!@#$%^&*()•√π÷×¶∆°¥€¢£©®™✓_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
//                                         onSubmitEditing={() => { addresref.current.focus(), validation() }}

//                                     />
//                                     {
//                                         errors.includes('Remitter') ?
//                                             <Text style={styles.Errortextview}>{Remittererror}</Text> : null
//                                     }
//                                 </View>
//                                 <View style={styles.inputview}>
//                                     <Text style={styles.Textview}>Address</Text>
//                                     <TextInput
//                                         placeholder="Enter Address"
//                                         style={styles.Textinput}
//                                         keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
//                                         value={address}
//                                         ref={addresref}
//                                         maxLength={100}
//                                         // onChangeText={text => { setaddress(text.replace(/[`~!@$%^&*|+=?;:'"<>«≤‹⟨⟩»≥›]/gi, '')), seterrors([]) }}
//                                         onChangeText={text => { address_spacechceck(text) }}

//                                         onSubmitEditing={() => { ciryref.current.focus(), validation() }}
//                                     />
//                                     {
//                                         errors.includes('address') ?
//                                             <Text style={styles.Errortextview}>{addresserror}</Text> : null
//                                     }
//                                 </View>
//                                 <View style={styles.inputview}>
//                                     <Text style={styles.Textview}>City</Text>
//                                     <TextInput
//                                         placeholder="Enter City"
//                                         keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
//                                         style={styles.Textinput}
//                                         value={city}
//                                         ref={ciryref}
//                                         maxLength={15}
//                                         // onChangeText={text => { setcity(text.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
//                                         onChangeText={text => { spacechceck(text, 1) }}
//                                         onSubmitEditing={() => { Mobileref.current.focus(), validation() }}

//                                     />
//                                     {
//                                         errors.includes('city') ?
//                                             <Text style={styles.Errortextview}>{cityerror}</Text> : null
//                                     }
//                                 </View>
//                                 <View style={styles.inputview}>
//                                     <Text style={styles.Textview}>Mobile No.</Text>
//                                     <TextInput
//                                         placeholder="Enter Mobile Number"
//                                         style={styles.Textinput}
//                                         keyboardType="numeric"
//                                         value={mobile}
//                                         ref={Mobileref}
//                                         maxLength={10}
//                                         onChangeText={text => { setmobile(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
//                                         onSubmitEditing={() => { Pincoderef.current.focus(), validation() }}

//                                     />
//                                     {
//                                         errors.includes('Mobile') ?
//                                             <Text style={styles.Errortextview}>{mobileerror}</Text> : null
//                                     }
//                                 </View>
//                                 <View style={styles.inputview}>
//                                     <Text style={styles.Textview}>Pincode</Text>
//                                     <TextInput
//                                         placeholder="Enter Pincode"
//                                         style={styles.Textinput}
//                                         ref={Pincoderef}
//                                         value={pincode}
//                                         keyboardType="numeric"
//                                         maxLength={6}
//                                         onChangeText={text => { setpincode(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
//                                         onSubmitEditing={() => validation()}

//                                     />
//                                     {
//                                         errors.includes('pincode') ?
//                                             <Text style={styles.Errortextview}>{pincodeerror}</Text> : null
//                                     }
//                                 </View>
//                                 {Helper.DepartName[0] == 104 ?
//                                     <View style={styles.inputview}>
//                                         <Text style={styles.Textview}>Vehicle Number</Text>
//                                         <TextInput
//                                             placeholder="Enter Vehicle Number"
//                                             style={styles.Textinput}
//                                             value={Vehicle}
//                                             keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
//                                             maxLength={10}
//                                             autoCapitalize="characters"
//                                             onChangeText={text => { setVehicle(text.replace(/[`~!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
//                                             onSubmitEditing={() => validation()}

//                                         />
//                                         {
//                                             errors.includes('Vehicle') ?
//                                                 <Text style={styles.Errortextview}>{Vehicleerror}</Text> : null
//                                         }
//                                     </View> : null
//                                 }

//                                 <View style={[styles.inputview, { marginBottom: 40 }]}>
//                                     <Text style={styles.Textview}>Remarks (Optional)</Text>
//                                     <Input
//                                         placeholder="Enter Remarks"
//                                         style={styles.Textinput}
//                                         keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
//                                         value={remark}
//                                         maxLength={200}
//                                         onChangeText={text => setremark(text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, ''))}
//                                     />
//                                 </View>


//                                 <View style={styles.buttonview}>
//                                     <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
//                                         <Text style={[styles.appButtonText]}>Next</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </ScrollView>
//                             <DateTimePicker
//                                 isVisible={calander}
//                                 onConfirm={changeSelectedDate}
//                                 onCancel={_hidefromDateTimePicker}
//                             // minimumDate={new Date()}
//                             />
//                             <DateTimeselect
//                                 isVisible={Tocalendar}
//                                 onConfirm={changeSelectedDate}
//                                 onCancel={_hidefromDateTimePicker}
//                                 minimumDate={new Date()}
//                             // maximumDate={new Date(lastDateOfYear)}
//                             />
//                         </KeyboardAvoidingView>
//                     </View>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// export default PayDetails;

import React, { Component, useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
    TextInput,
    keyboard
} from 'react-native';
import BackNavigation from '../../../Lib/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Input from '../../../Component/Textinput';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimeselect from 'react-native-modal-datetime-picker';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../../Component/Methods';
import CustomLoader from '../../../Component/CustomLoader';
import NetInfo from "@react-native-community/netinfo";

const PayDetails = (props) => {
    // console.log("props_paydeatils", props.route.params);
    const navigation = useNavigation();
    const [address, setaddress] = useState('')
    const [mobile, setmobile] = useState('')
    const [city, setcity] = useState('')
    const [Remitter, setRemitter] = useState('')
    const [PayDetails, setPaydetails] = useState(props.route.params)
    const [pincode, setpincode] = useState('')
    const [remark, setremark] = useState('')
    const [fromdate, setfromdate] = useState(moment.utc().local())
    const [todate, settodate] = useState(moment.utc().local())
    const [DepartName, setDepartmentName] = useState('')

    const [fromcalendar, setfromcalendar] = useState(false)
    const [Tocalendar, settocalendar] = useState(false)
    const [Fromcalander, setcalander] = useState(false)

    const [fromdateime, setformdatetime] = useState(moment.utc().local())
    const [todateime, settodatetime] = useState(moment.utc().local())

    const [Vehicle, setVehicle] = useState('')

    const [flag, setflag] = useState('');
    const [loaderVisible, setloaderVisible] = useState(false)

    const [errors, seterrors] = useState([])
    const [addresserror, setaddresserror] = useState('')
    const [mobileerror, setmobileerror] = useState('')
    const [cityerror, setcityerror] = useState('')
    const [Remittererror, setRemittererror] = useState('')
    const [pincodeerror, setpincodeerror] = useState('')
    const [Vehicleerror, setVehicleerror] = useState('')
    const [Dateerror, setDateerror] = useState('')
    const [Fromdatepicker, setFromdatepicker] = useState()
    const [Todatepicker, setTodatepicker] = useState()


    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }

    const Remitterref = useRef()
    const Mobileref = useRef()
    const Pincoderef = useRef()
    const addresref = useRef()
    const ciryref = useRef()

    useEffect(() => {
        console.log("Payee details useeffect call", PayDetails, Helper.DepartName);
        if (Helper.DepartName) {
            // var deptname = PayDetails.Challaninfo?.Dep_Name?.deptnameEnglish
            var deptname = Helper.DepartName
            setDepartmentName(deptname[1])
        }
        // setDepartmentName(data[1])
        var date = new Date()
        var local_date = moment.utc(date).local().format('MMMM Do YYYY');
        console.log("newdateee_______", local_date);
        setfromdate(local_date)
        settodate(local_date)
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                ProfileDetails()
            }
            else {
                hideLoader()
                console.log("fallllllll")
                CommonMethods.showError("Pleae Check Your Internet Connection!")
            }
        })
    }, [])
    let error = []

    const ProfileDetails = () => {
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("fialvalrof_payee", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Districtencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        //Challan api call
        Apicall.MainApiMethod(Constant.GET, ApiUrl.PayeeDetails, bytesTobase64).then((resp) => {
            console.log("respppppp", resp.data);
            hideLoader()
            var response = resp.data.GetUserProfileDetailResult

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)
            // console.log("aes128dec_Challandetails", AES128Decry);

            var splitdata = AES128Decry.split("|")
            console.log("splitdataresult_", splitdata);
            if (splitdata[0] == rnd) {
                setRemitter(splitdata[1])
                setaddress(splitdata[2])
                setcity(splitdata[3])
                setmobile(splitdata[4])
                setpincode(splitdata[5])
            }
            else {
                console.log("Treasury status code is 400");
            }

        })
    }
    const lastDateOfYear = `15/31/${new Date().getFullYear()}`;

    const onsubmit = () => {
        if (onsubmitvalidation()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("success");

                    showLoader()
                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                    var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                    console.log("fialvalrof_payee", finalvar);

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(finalvar)
                    console.log("Districtencrpyted_Result", AES128Ency);

                    // string To bytes conversion
                    var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                    console.log("srtingTobytes", stringTobytes);

                    // bytes array to base64 conversion 
                    var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                    console.log("respp_base64", bytesTobase64)
                    Helper.VehicleNumber = Vehicle.toUpperCase()

                    if (Helper.ProfileChallan) {
                        var profileid = Helper.ServiceName
                        console.log("profiileid_paymentcheck", profileid);

                        var data = profileid
                        console.log("paymentdeatils data", data);
                        var Url = ApiUrl.CreateChallanSchemas
                    }
                    else if (Helper.IsRepeatChallan) {
                        var profileid = Helper.GrnInfo.GRN
                        console.log("Repart_payment", profileid);

                        var data = profileid
                        console.log("paymentdeatils data_1", data);
                        var Url = ApiUrl.RepeatcreateSchmeas
                    }
                    else {
                        var deptname = Helper.ServiceName.ServiceId
                        var splitcode = deptname.split('|')
                        console.log("spitedddddd+", splitcode);

                        var data = splitcode[0] + '|' + Helper.DepartName[0]

                        console.log("pipline data_", data);
                        var Url = ApiUrl.CreateServiceSchemas
                    }




                    //Challan api call
                    console.log("apiurrrr_", Url);
                    Apicall.MainApiMethod(Constant.POST, Url, bytesTobase64, data).then((resp) => {
                        console.log("respppppp", resp.data);
                        hideLoader()
                        var response = resp.data

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_Challandetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")
                        console.log("splitdataresult_", splitdata);
                        if (splitdata[0] == rnd) {
                            console.log("resultofapi_____", splitdata[1]);

                            var payeeinfo = {
                                fromdate: fromdateime,
                                todate: todateime,
                                address: address,
                                city: city,
                                mobile: mobile,
                                pincode: pincode,
                                remark: remark
                            }
                            console.log("payeinfofo", payeeinfo);
                            Helper.Payeinfo = payeeinfo

                            navigation.navigate('HeadDetails', { PayeeDetails: JSON.parse(splitdata[1]), Departname: DepartName, Challan: PayDetails })

                        }
                        else {
                            console.log("Paydetails status code is 400");
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
    const onsubmitvalidation = () => {
        let regex = /^([A-Za-z]){2}([0-9]){2}([A-Za-z]){2}([0-9]){4}?$/;
        var Fromdate_c = new Date(fromdateime)
        var todate_c = new Date(todateime)
        console.log("fromdate___", Fromdate_c.getTime(), "TOdate____", todate_c.getTime());
        if (Fromdate_c.getTime() > todate_c.getTime()) {
            error = []
            console.log('To Date cannot allow less than From Date');
            error.push('Datecal')
            setDateerror("To Date cannot allow less than From Date")
        }
        if (Remitter == '') {
            console.log('Please Enter Remitter Name');
            error.push('Remitter')
            setRemittererror("Please Enter Remitter Name")
        }
        if (address == '') {
            console.log('Please Enter Address');
            error.push('address')
            setaddresserror("Please Enter Address")
        }
        else if (address.length < 3) {
            console.log('Address should contain min 3 character');
            error.push('address')
            setaddresserror("Address should contain min 3 character")
        }
        if (city == '') {
            console.log('Please Enter City');
            error.push('city')
            setcityerror("Please Enter City")
        }
        else if (city.length < 3) {
            console.log('City should contain min 3 character');
            error.push('city')
            setcityerror("City should contain min 3 character")
        }
        if (mobile === '') {
            error.push('Mobile')
            setmobileerror('Please Enter Mobile Number')
            console.log("Please enter mobile number");
        }
        else if (isNaN(mobile)) {
            error.push('Mobile')
            setmobileerror('Mobile Number should be digit')
            console.log("Mobile Number should be digit");
        }
        else if (mobile.startsWith("0") === true) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (mobile.startsWith("1") === true) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }

        else if (mobile.length < 10) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
        }
        if (pincode == '') {
            console.log('Please Enter Pincode');
            error.push('pincode')
            setpincodeerror("Please Enter Pincode")
        }
        else if (isNaN(pincode)) {
            console.log('Pincode should be digits');
            error.push('pincode')
            setpincodeerror("Pincode should be digits")
        }
        else if (pincode.length < 6) {
            console.log('Pincode should contain 6 digits');
            error.push('pincode')
            setpincodeerror("Pincode should contain 6 digits")
        }
        else if (pincode.startsWith("0") === true) {
            // error = []
            error.push('pincode')
            setpincodeerror("Pincode Not Start With 0")
            console.log("Pincode Not Start With 0")
        }
        if (Helper.DepartName[0] == 104) {
            if (Vehicle == '') {
                console.log('vehicle number not blank')
                error.push('Vehicle')
                setVehicleerror("Please Enter Vehicle Number")
            }
            else if (regex.test(Vehicle) == '') {
                // CommonMethods.showError("Please Enter Valid pan card number")
                error.push('Vehicle')
                setVehicleerror('Please Enter Valid Vehicle Number')
            }
        }


        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else if (error.length === 0) {
            error = []
            return true
        }
    }




    const validation = () => {
        let regex = /^([A-Za-z]){2}([0-9]){2}([A-Za-z]){2}([0-9]){4}?$/;
        var Fromdate_c = new Date(fromdateime)
        var todate_c = new Date(todateime)
        console.log("fromdate___", Fromdate_c.getTime(), "TOdate____", todate_c.getTime());
        if (Fromdate_c.getTime() > todate_c.getTime()) {
            error = []
            console.log('To Date cannot allow less than From Date');
            error.push('Datecal')
            setDateerror("To Date cannot allow less than From Date")
        }
        else if (Remitter == '') {
            console.log('Please Enter Remitter Name');
            error.push('Remitter')
            setRemittererror("Please Enter Remitter Name")
        }
        else if (address == '') {
            console.log('Please Enter Address');
            error.push('address')
            setaddresserror("Please Enter Address")
        }
        else if (address.length < 3) {
            console.log('Address should contain min 3 character');
            error.push('address')
            setaddresserror("Address should contain min 3 character")
        }
        else if (city == '') {
            console.log('Please Enter City');
            error.push('city')
            setcityerror("Please Enter City")
        }
        else if (city.length < 3) {
            console.log('City should contain min 3 character');
            error.push('city')
            setcityerror("City should contain min 3 character")
        }
        else if (mobile === '') {
            error.push('Mobile')
            setmobileerror('Please Enter Mobile Number')
            console.log("Please enter mobile number");
        }
        else if (isNaN(mobile)) {
            error.push('Mobile')
            setmobileerror('Mobile Number should be digit')
            console.log("Mobile Number should be digit");
        }
        else if (mobile.startsWith("0") === true) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Not Start With 0")
            console.log("Mobile Number Not Start With 0")
        }
        else if (mobile.startsWith("1") === true) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Not Start With 1")
            console.log("Mobile Number Not Start With 1")
        }

        else if (mobile.length < 10) {
            // error = []
            error.push('Mobile')
            setmobileerror("Mobile Number Should be 10 digit")

            console.log("mobile number should be 10 digit");
        }
        else if (pincode == '') {
            console.log('Please Enter Pincode');
            error.push('pincode')
            setpincodeerror("Please Enter Pincode")
        }
        else if (isNaN(pincode)) {
            console.log('Pincode should be digits');
            error.push('pincode')
            setpincodeerror("Pincode should be digits")
        }
        else if (pincode.length < 6) {
            console.log('Pincode should contain 6 digits');
            error.push('pincode')
            setpincodeerror("Pincode should contain 6 digits")
        }

        else if (pincode.startsWith("0") === true) {
            // error = []
            error.push('pincode')
            setpincodeerror("Pincode Not Start With 0")
            console.log("Pincode Not Start With 0")
        }
        if (Helper.DepartName[0] == 104) {
            if (Vehicle == '') {
                console.log('vehicle number not blank')
                error.push('Vehicle')
                setVehicleerror("Please Enter Vehicle Number")
            }
            else if (regex.test(Vehicle) == '') {
                // CommonMethods.showError("Please Enter Valid pan card number")
                error.push('Vehicle')
                setVehicleerror('Please Enter Valid Vehicle Number')
            }
        }


        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            // keyboard.dismiss()
            error = []
            return true
        }
    }

    const changeSelectedDate = (date) => {
        seterrors([])
        console.log("dateselect", date);
        var local_date = moment.utc(date).local().format('MMMM Do YYYY');
        console.log("convertyyy", local_date);
        if (flag == 'from') {
            setFromdatepicker(date)
            setfromdate(local_date)
            setformdatetime(date)
            setcalander(false)

        }
        else if (flag == 'to') {
            setTodatepicker(date)
            settodate(local_date)
            settodatetime(date)
            settocalendar(false)

        }

    };
    const dateselect = (value) => {
        console.log("deatefromval", value);
        setcalander(true)
        setflag(value)
    }
    const Todateselect = (value) => {
        console.log("deatetoval", value);
        settocalendar(true)
        setflag(value)
    }
    const _hidefromDateTimePicker = () => {
        setcalander(false)
        settocalendar(false)

    }
    // const _hidetoDateTimePicker = () => {
    //     settocalendar(false)
    // }

    const spacechceck = (val, data) => {
        var value = val.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
        var format = /[`\s]/;
        let firstChar = value.charAt(0);
        if (format.test(firstChar)) {
            console.log("space hai isme", data);
            var str = value.substring(1);
            console.log(str);
            if (data === 0) {
                setRemitter(str)
                seterrors([])
            }
            else if (data === 1) {
                setcity(str)
                seterrors([])
            }

        }
        else {
            if (data === 0) {
                setRemitter(value)
                seterrors([])
            }
            else if (data === 1) {
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
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.headview}>
                        <View style={{ flexDirection: 'row' }}>
                            <BackNavigation navigation={navigation}
                                MargT={Platform.OS == 'ios' ? 20 : 22}
                                width={30}
                                height={30}
                                MargL={0}
                            />
                            <View style={{ marginTop: 30, flex: 0.8 }}>
                                <Text style={styles.containsubH}> Payee Details</Text>
                            </View>
                        </View>
                        <View style={styles.headingview}>
                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{DepartName}</Text>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 }}>
                                    <View style={[styles.inputview, { marginHorizontal: 0, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <View>
                                            <Text style={styles.Textview}>From Date</Text>
                                            <Input
                                                placeholder="From Date"
                                                style={[styles.Textinput, { width: '130%', fontSize: 12 }]}
                                                value={fromdate}
                                                editable={false}
                                                onChangeText={text => setfromdate(text)}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => dateselect('from')} >
                                            <Image
                                                source={images.calander}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={[styles.inputview, { marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <View>
                                            <Text style={styles.Textview}>To Date</Text>
                                            <Input
                                                placeholder="To Date"
                                                style={[styles.Textinput, { width: '135%', fontSize: 12 }]}
                                                value={todate}
                                                onChangeText={text => settodate(text)}
                                                editable={false}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => Todateselect('to')} >
                                            <Image
                                                source={images.calander}
                                                style={styles.ImageStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                {
                                    errors.includes('Datecal') ?
                                        <Text style={[styles.Errortextview, { marginHorizontal: 40 }]}>{Dateerror}</Text> : null
                                }
                                <View style={styles.inputview}>
                                    <Text style={styles.Textview}>Remitter Name</Text>
                                    <TextInput
                                        placeholder="Enter Remitter Name"
                                        style={styles.Textinput}
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        value={Remitter}
                                        ref={Remitterref}
                                        onChangeText={text => { spacechceck(text, 0) }}
                                        // onChangeText={text => { setRemitter(text.replace(/[`~0-9!@#$%^&*()•√π÷×¶∆°¥€¢£©®™✓_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                        onSubmitEditing={() => { addresref.current.focus(), validation() }}

                                    />
                                    {
                                        errors.includes('Remitter') ?
                                            <Text style={styles.Errortextview}>{Remittererror}</Text> : null
                                    }
                                </View>
                                <View style={styles.inputview}>
                                    <Text style={styles.Textview}>Address</Text>
                                    <TextInput
                                        placeholder="Enter Address"
                                        style={styles.Textinput}
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        value={address}
                                        ref={addresref}
                                        maxLength={100}
                                        // onChangeText={text => { setaddress(text.replace(/[`~!@$%^&*|+=?;:'"<>«≤‹⟨⟩»≥›]/gi, '')), seterrors([]) }}
                                        onChangeText={text => { address_spacechceck(text) }}

                                        onSubmitEditing={() => { ciryref.current.focus(), validation() }}
                                    />
                                    {
                                        errors.includes('address') ?
                                            <Text style={styles.Errortextview}>{addresserror}</Text> : null
                                    }
                                </View>
                                <View style={styles.inputview}>
                                    <Text style={styles.Textview}>City</Text>
                                    <TextInput
                                        placeholder="Enter City"
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        style={styles.Textinput}
                                        value={city}
                                        ref={ciryref}
                                        maxLength={15}
                                        onChangeText={text => { setcity(text.replace(/[`~0-9!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>\s«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                        // onChangeText={text => { spacechceck(text, 1) }}
                                        onSubmitEditing={() => { Mobileref.current.focus(), validation() }}

                                    />
                                    {
                                        errors.includes('city') ?
                                            <Text style={styles.Errortextview}>{cityerror}</Text> : null
                                    }
                                </View>
                                <View style={styles.inputview}>
                                    <Text style={styles.Textview}>Mobile No.</Text>
                                    <TextInput
                                        placeholder="Enter Mobile Number"
                                        style={styles.Textinput}
                                        keyboardType="numeric"
                                        value={mobile}
                                        ref={Mobileref}
                                        maxLength={10}
                                        onChangeText={text => { setmobile(text.replace(/[`~a-z!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
                                        onSubmitEditing={() => { Pincoderef.current.focus(), validation() }}

                                    />
                                    {
                                        errors.includes('Mobile') ?
                                            <Text style={styles.Errortextview}>{mobileerror}</Text> : null
                                    }
                                </View>
                                <View style={styles.inputview}>
                                    <Text style={styles.Textview}>Pincode</Text>
                                    <TextInput
                                        placeholder="Enter Pincode"
                                        style={styles.Textinput}
                                        ref={Pincoderef}
                                        value={pincode}
                                        keyboardType="numeric"
                                        maxLength={6}
                                        onChangeText={text => { setpincode(text.replace(/[`~a-z!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
                                        onSubmitEditing={() => validation()}

                                    />
                                    {
                                        errors.includes('pincode') ?
                                            <Text style={styles.Errortextview}>{pincodeerror}</Text> : null
                                    }
                                </View>
                                {Helper.DepartName[0] == 104 ?
                                    <View style={styles.inputview}>
                                        <Text style={styles.Textview}>Vehicle Number</Text>
                                        <TextInput
                                            placeholder="Enter Vehicle Number"
                                            style={styles.Textinput}
                                            value={Vehicle}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            maxLength={10}
                                            autoCapitalize="characters"
                                            onChangeText={text => { setVehicle(text.replace(/[`~!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            onSubmitEditing={() => validation()}

                                        />
                                        {
                                            errors.includes('Vehicle') ?
                                                <Text style={styles.Errortextview}>{Vehicleerror}</Text> : null
                                        }
                                    </View> : null
                                }

                                <View style={[styles.inputview, { marginBottom: 40 }]}>
                                    <Text style={styles.Textview}>Remarks (Optional)</Text>
                                    <Input
                                        placeholder="Enter Remarks"
                                        style={styles.Textinput}
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        value={remark}
                                        maxLength={200}
                                        onChangeText={text => setremark(text.replace(/[`|\ ?<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, ''))}
                                    />
                                </View>


                                <View style={styles.buttonview}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
                                        <Text style={[styles.appButtonText]}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            <DateTimePicker
                                date={Fromdatepicker}
                                isVisible={Fromcalander}
                                onConfirm={changeSelectedDate}
                                onCancel={_hidefromDateTimePicker}
                            // minimumDate={new Date()}
                            />
                            <DateTimeselect
                                date={Todatepicker}
                                isVisible={Tocalendar}
                                onConfirm={changeSelectedDate}
                                onCancel={_hidefromDateTimePicker}
                            // minimumDate={new Date()}
                            // maximumDate={new Date(lastDateOfYear)}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PayDetails;



