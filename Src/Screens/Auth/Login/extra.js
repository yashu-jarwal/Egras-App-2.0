// // // import React from 'react';
// // import React, { useState, useEffect } from 'react';
// // import {
// //     SafeAreaView,
// //     Dimensions,
// //     Text,
// //     TextInput,
// //     TouchableOpacity,
// //     ScrollView,
// //     Image,
// //     View,
// //     NativeModules, Platform
// // } from 'react-native';
// // import styles from './styles'
// // import Constant from '../../../Component/Constant';
// // import CryptoJS from "react-native-crypto-js";
// // import { sha256 } from 'react-native-sha256';
// // import CryptoAesCbc from 'react-native-crypto-aes-cbc';
// // import base64 from 'react-native-base64';
// // import Helper from '../../../Component/Helper';
// // import { NetworkInfo } from "react-native-network-info"
// // import ApiUrl from '../../../Component/ApiURl';
// // import axios from 'axios';
// // import aesjs from 'aes-js';
// // import Utils from '../../../navigation/index'
// // import Aes from 'react-native-aes-crypto'
// // // import DeviceInfo from 'react-native-device-info';

// // const Login = () => {

// //     let aes = require('aes-js');

// //     const [userid, setuserid] = useState('ramdev')
// //     const [password, setpassword] = useState('Test@123')
// //     const [check, setcheck] = useState(true)
// //     const [deviceIp, setdeviceIp] = useState('')

// //     useEffect(() => {
// //         NetworkInfo.getIPAddress().then(ipAddress => {
// //             console.log("devicekiippp", ipAddress);
// //             setdeviceIp(ipAddress)
// //         });
// //     })

// //     const apicall = (encyptedval) => {
// //         console.log("encryptedval", encyptedval);

// //         var sting = "8iLXamM/4KkmRGZRGSXjORIHq8iwHg513/Nyxgrulkjql82nXKh+l6/Iqdxe0LC0s7y0Gd9+FK79SYTAq5oqmKgHrdRHYUvLyzA7eJMy/IXiaioRaizSAPJvX2HJZvzHaHTGGmy0T0SI6lg/HENGb2TUsBmK4aIhAMbg+aznOzMIoPjTIaipZIdTAvYkn8dZ2QjUsr1zWYZ29PqT/rQMEfOHDUC4tmKbmxxZe3IwA5M="
// //         // var axios = require('axios');
// //         var data = JSON.stringify(sting);

// //         var config = {
// //             method: Constant.POST,
// //             url: Constant.Base_Url + ApiUrl.LOG_IN,
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             data: data
// //         };
// //         console.log("configfile", config);

// //         axios(config)
// //             .then(function (response) {
// //                 console.log(JSON.stringify(response.data));
// //             })
// //             .catch(function (error) {
// //                 console.log(error);
// //             });

// //     }

// //     const loginbutton = () => {

// //         // random number generate
// //         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
// //         console.log("deviceipppp", deviceIp);

// //         //encode MD5
// //         var passwordmd5 = CryptoJS.MD5(password).toString();
// //         console.log("mdffff", passwordmd5);
// //         var md5add = rnd + passwordmd5;

// //         var datatestmd5 = CryptoJS.MD5(md5add);
// //         var md5string = datatestmd5.toString();
// //         console.log("finalmd5", datatestmd5, md5string);

// //         // Encode SHA256
// //         sha256(password).then((hash) => {
// //             console.log("hashfuncall", hash);
// //             var joinsha = rnd + hash;

// //             sha256(joinsha).then((hashval) => {
// //                 console.log("hashfinalval", hashval);
// //                 var sha256String = hashval.toString();
// //                 console.log("logofsha26", sha256String);


// //                 var finalvar = userid + "|" + md5string + "|" + sha256String + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;
// //                 console.log("finalvaa", finalvar)


// //                 console.log("loginfuncall", finalvar);
// //                 let ancyp = finalvar.toLowerCase();
// //                 /*
// //                                 // Aes 128 Encryption 
// //                                 var key = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
// //                                 var iv = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
// //                                 var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(ancyp), key,
// //                                     {
// //                                         keySize: 256 / 8,
// //                                         // blockSize: 128/8,
// //                                         iv: iv,
// //                                         mode: CryptoJS.mode.CBC,
// //                                         padding: CryptoJS.pad.Pkcs7
// //                                     })
// //                                 var rsutll = encryptedlogin.toString()
// //                                 console.log("resullll", rsutll)
                               
                
// //                                 // Aes 128 Decryption 
// //                                 var decrypted = CryptoJS.AES.decrypt(rsutll, key, {
// //                                     keySize: 256 / 8,
// //                                     iv: iv,
// //                                     mode: CryptoJS.mode.CBC,
// //                                     padding: CryptoJS.pad.Pkcs7
// //                                 });
// //                                 console.log('Decrypted : ' + decrypted);
// //                                 console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
                
// //                                 */



// //                 ///////////////////////////
// //                 // var encryptedlogin = CryptoJS.AES.encrypt('abc', key,
// //                 //     {
// //                 //         keySize: 512 / 8,
// //                 //         // blockSize: 128/8,
// //                 //         iv: iv,
// //                 //         mode: CryptoJS.mode.CBC,
// //                 //         padding: CryptoJS.pad.Pkcs7
// //                 //     })
// //                 // // var base =  CryptoJS.enc.Base64(encryptedlogin)
// //                 // var rsutll = encryptedlogin.toString()

// //                 // console.log("resullll", rsutll)
// //                 // var base = CryptoJS.enc.Utf8.parse(rsutll)
// //                 // console.log(base.toString());

// //                 ///////////////

// //                 // const STORE_KEY = "12345678912345678912345678912345"
// //                 // const key = CryptoJS.enc.Utf8.parse(STORE_KEY);
// //                 // // const iv = CryptoJS.enc.Utf8.parse(STORE_IV);
// //                 // var result = CryptoJS.AES.encrypt("abc", key, { iv: key });
// //                 // var result1 = result.ciphertext.toString();
// //                 // console.log("encrtyption", result1);


// //             });
// //         });



// //     }

// //     const funcallbutton = () => {
// //         var number = Math.floor(Math.random() * 9000000000) + 1000000000;
// //         console.log(number);

// //         var dash = 'f0de1293d5e93d648b295f2c90a3837e'
// //         var dsahhh = 'eca1ff844af59e52d68343ca5963c9da74221f23bb3a3caac8c0df21fb289901'
// //         var data = "Rammdev" + "|" + dash + "|" + dsahhh + "|" + number + "|" + "10.1231.11" + "|" + "123456";
// //         console.log('Encrypt Data -', data)

// //         // var keyconv = CryptoJS.enc.Utf8.parse('fd876698-89a7-46f5-bf5a-70a64f65d323')
// //         // sha256(joinsha).then((hashval) => {
// //         //     console.log("hashfinalval", hashval);
// //         //     var sha256String = hashval.toString();
// //         //     console.log("logofsha26", sha256String);



// //         //////
// //         var keyvvv = 'fd876698-89a7-46f5-bf5a-70a64f65d323'
// //         var str = CryptoJS.enc.Utf8.parse(keyvvv);
// //         // var str = utffff.words;
// //         console.log("stripirr", str)
// //         var utf8 = [];
// //         for (var i = 0; i < str.length; i++) {
// //             var charcode = str.charCodeAt(i);
// //             if (charcode < 0x80) utf8.push(charcode);
// //             else if (charcode < 0x800) {
// //                 utf8.push(0xc0 | (charcode >> 6),
// //                     0x80 | (charcode & 0x3f));
// //             }
// //             else if (charcode < 0xd800 || charcode >= 0xe000) {
// //                 utf8.push(0xe0 | (charcode >> 12),
// //                     0x80 | ((charcode >> 6) & 0x3f),
// //                     0x80 | (charcode & 0x3f));
// //             }
// //             // surrogate pair
// //             else {
// //                 i++;
// //                 // UTF-16 encodes 0x10000-0x10FFFF by
// //                 // subtracting 0x10000 and splitting the
// //                 // 20 bits of 0x0-0xFFFFF into two halves
// //                 charcode = 0x10000 + (((charcode & 0x3ff) << 10)
// //                     | (str.charCodeAt(i) & 0x3ff))
// //                 utf8.push(0xf0 | (charcode >> 18),
// //                     0x80 | ((charcode >> 12) & 0x3f),
// //                     0x80 | ((charcode >> 6) & 0x3f),
// //                     0x80 | (charcode & 0x3f));
// //             }
// //         }
// //         // return utf8;
// //         console.log("urgggg_", utf8);
// //         // sha256(str).then((hashval) => {
// //         //     console.log("hashfinalval", hashval);
// //         //     // var sha256String = hashval.toString();
// //         //     // console.log("logofsha26", sha256String);
// //         // })




// //         // var key = CryptoJS.enc.Utf8.parse('eCu$t0m$iNeTB@n<');
// //         // var iv = CryptoJS.enc.Utf8.parse('eCu$t0m$iNeTB@n<');

// //         // var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
// //         //     {
// //         //         keySize: 256 / 8,
// //         //         blockSize: 128 / 8,
// //         //         iv: iv,
// //         //         mode: CryptoJS.mode.CBC,
// //         //         padding: CryptoJS.pad.Pkcs7
// //         //     })
// //         // console.log("resullll", encryptedlogin.toString())


// //     }


// //     return (
// //         <SafeAreaView style={styles.container}>
// //             <View style={{ marginTop: 100 }}>
// //                 <Text style={{ textAlign: 'center', fontSize: 55, color: '#F9FDFA', letterSpacing: 5 }}> E-GRAS </Text>
// //                 <Text style={{ textAlign: 'center', fontSize: 25, color: '#EAF2F5' }}> LOGO </Text>
// //             </View>
// //             <View style={styles.mainview}>
// //                 <View style={styles.submain}>
// //                     <View style={styles.headview}>
// //                         <Text style={styles.containsubH}> SIGN IN </Text>
// //                         <ScrollView showsVerticalScrollIndicator={false}>

// //                             <View style={styles.textview}>
// //                                 <TextInput
// //                                     placeholder="user name"
// //                                     style={styles.Textinput}
// //                                     value={userid}
// //                                     underlineColorAndroid="transparent"
// //                                     placeholderTextColor="#DADADA"
// //                                     onChangeText={text => setuserid(text)}
// //                                 />
// //                             </View>
// //                             <View style={[styles.textview, { marginTop: 10, flexDirection: 'row' }]}>
// //                                 <TextInput
// //                                     placeholder="password"
// //                                     style={styles.Textinput}
// //                                     value={password}
// //                                     underlineColorAndroid="transparent"
// //                                     placeholderTextColor="#DADADA"
// //                                     secureTextEntry={check}
// //                                     onChangeText={text => setpassword(text)}
// //                                 />
// //                                 <TouchableOpacity onPress={() => setcheck(!check)}>
// //                                     <Image
// //                                         source={require('../../../assets/visibility.png')}
// //                                         style={styles.ImageStyle}
// //                                     />
// //                                 </TouchableOpacity>

// //                             </View>
// //                             <TouchableOpacity>
// //                                 <Text style={styles.forgotview}> Forgot Password? </Text>
// //                             </TouchableOpacity>

// //                             <TouchableOpacity style={styles.buttonview} onPress={loginbutton}>
// //                                 {/* <TouchableOpacity style={styles.buttonview} onPress={funcallbutton}> */}
// //                                 <Text style={styles.buttonText}> Sing In </Text>
// //                             </TouchableOpacity>

// //                             <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 50 }}>
// //                                 <Text style={[styles.subcontainer, { color: '#B5B9BA' }]}> Don't have an account? </Text>
// //                                 <TouchableOpacity>
// //                                     <Text style={[styles.subcontainer, { fontSize: 13, color: '#ACCACB' }]}> SIGN UP! </Text>
// //                                 </TouchableOpacity>
// //                             </View>
// //                         </ScrollView>

// //                     </View>
// //                 </View>
// //             </View>





// //         </SafeAreaView>
// //     );
// // };

// // export default Login;


// // final code
// const funcallbutton = () => {
//     // var number = Math.floor(Math.random() * 9000000000) + 1000000000;
//     // console.log(number);

//     // var dash = 'f0de1293d5e93d648b295f2c90a3837e'
//     // var dsahhh = 'eca1ff844af59e52d68343ca5963c9da74221f23bb3a3caac8c0df21fb289901'
//     // var data = "Rammdev" + "|" + dash + "|" + dsahhh + "|" + number + "|" + "10.1231.11" + "|" + "123456";
//     // console.log('Encrypt Data -', data)

//     // // var keyconv = CryptoJS.enc.Utf8.parse('fd876698-89a7-46f5-bf5a-70a64f65d323')
//     // // sha256(joinsha).then((hashval) => {
//     // //     console.log("hashfinalval", hashval);
//     // //     var sha256String = hashval.toString();
//     // //     console.log("logofsha26", sha256String);



//     // //////
//     // var str = 'fd87669889a746f5bf5a70a64f65d323'
//     // // var str = CryptoJS.enc.Utf8.parse(keyvvv);
//     // // var str = utffff.words;
//     // console.log("stripirr", str)
//     // var utf8 = [];
//     // for (var i = 0; i < str.length; i++) {
//     //     var charcode = str.charCodeAt(i);
//     //     if (charcode < 0x80) utf8.push(charcode);
//     //     else if (charcode < 0x800) {
//     //         utf8.push(0xc0 | (charcode >> 6),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     //     else if (charcode < 0xd800 || charcode >= 0xe000) {
//     //         utf8.push(0xe0 | (charcode >> 12),
//     //             0x80 | ((charcode >> 6) & 0x3f),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     //     // surrogate pair
//     //     else {
//     //         i++;
//     //         // UTF-16 encodes 0x10000-0x10FFFF by
//     //         // subtracting 0x10000 and splitting the
//     //         // 20 bits of 0x0-0xFFFFF into two halves
//     //         charcode = 0x10000 + (((charcode & 0x3ff) << 10)
//     //             | (str.charCodeAt(i) & 0x3ff))
//     //         utf8.push(0xf0 | (charcode >> 18),
//     //             0x80 | ((charcode >> 12) & 0x3f),
//     //             0x80 | ((charcode >> 6) & 0x3f),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     // }
//     // console.log("urgggg_", utf8);

//     // // return utf8;
//     // var str1 = "abc"
//     // var utf88 = [];
//     // for (var i = 0; i < str1.length; i++) {
//     //     var charcode = str1.charCodeAt(i);
//     //     if (charcode < 0x80) utf88.push(charcode);
//     //     else if (charcode < 0x800) {
//     //         utf88.push(0xc0 | (charcode >> 6),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     //     else if (charcode < 0xd800 || charcode >= 0xe000) {
//     //         utf88.push(0xe0 | (charcode >> 12),
//     //             0x80 | ((charcode >> 6) & 0x3f),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     //     // surrogate pair
//     //     else {
//     //         i++;
//     //         // UTF-16 encodes 0x10000-0x10FFFF by
//     //         // subtracting 0x10000 and splitting the
//     //         // 20 bits of 0x0-0xFFFFF into two halves
//     //         charcode = 0x10000 + (((charcode & 0x3ff) << 10)
//     //             | (str1.charCodeAt(i) & 0x3ff))
//     //         utf88.push(0xf0 | (charcode >> 18),
//     //             0x80 | ((charcode >> 12) & 0x3f),
//     //             0x80 | ((charcode >> 6) & 0x3f),
//     //             0x80 | (charcode & 0x3f));
//     //     }
//     // }
//     // console.log("reslllllllllll", utf88);
//     // var utfenc = new Uint8Array(utf88);
//     // console.log("resuttttt", Base64.fromUint8Array(utfenc))




//     // // sha256(str).then((hashval) => {
//     // //     console.log("hashfinalval", hashval);
//     // //     // var sha256String = hashval.toString();
//     // //     // console.log("logofsha26", sha256String);
//     // // })


//     // // Aes 128 Encryption 
//     // // var key = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
//     // // var iv = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
//     // var encryptedlogin = CryptoJS.AES.encrypt("abc", utf8.toString(),
//     //     {
//     //         keySize: 256 / 8,
//     //         blockSize: 128 / 8,
//     //         iv: utf8,
//     //         mode: CryptoJS.mode.CBC,
//     //         padding: CryptoJS.pad.Pkcs7
//     //     })
//     // var rsutll = encryptedlogin.toString()
//     // console.log("resullll", rsutll)


//     // // Aes 128 Decryption 
//     // // var decrypted = CryptoJS.AES.decrypt(rsutll, key, {
//     // //     keySize: 256 / 8,
//     // //     iv: iv,
//     // //     mode: CryptoJS.mode.CBC,
//     // //     padding: CryptoJS.pad.Pkcs7
//     // // });
//     // // console.log('Decrypted : ' + decrypted);
//     // // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));


//     // random number generate
//     var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//     console.log("deviceipppp", deviceIp);

//     //encode MD5
//     var passwordmd5 = Helper.MD5Conversion(password)
//     console.log("mdffff", passwordmd5);
//     var updatedmd5 = Helper.MD5Conversion(rnd + passwordmd5)
//     console.log("finalmd5", updatedmd5.toString());

//     // Encode SHA256
//     Helper.Sha256conversion(password).then((Hash) => {
//         console.log("hashfuncall", Hash);
//         var combinsha256 = rnd + Hash;
//         Helper.Sha256conversion(combinsha256).then((FinalHash) => {
//             console.log("hashfuncall", FinalHash);

//             var finalvar = userid + "|" + updatedmd5.toString() + "|" + FinalHash.toString() + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;
//             console.log("finalvaa", finalvar)
//             let ancyp = finalvar.toLowerCase();

//             //AES 128 Encryption
//             var AES128Ency = Helper.AES_128_Encryption(ancyp)
//             console.log("yashudata", AES128Ency);

//             //AES 128 Decryption
//             var AES128Decry = Helper.AES_128_Decryption(AES128Ency)
//             console.log("jarwal",AES128Decry);
//         })

//     })
//     // // Encode SHA256
//     // sha256(password).then((hash) => {
//     // console.log("hashfuncall", JSON.parse(sha256val) );
//     //     var joinsha = rnd + hash;

//     //     sha256(joinsha).then((hashval) => {
//     //         // console.log("hashfinalval", hashval);
//     //         var sha256String = hashval.toString();
//     //         // console.log("logofsha26", sha256String);


//     //         var finalvar = userid + "|" + updatedmd5.toString() + "|" + sha256String + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;
//     //         console.log("finalvaa", finalvar)
//     //         let ancyp = finalvar.toLowerCase();


//     //         // Aes 128 Encryption
//     //         var key = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
//     //         var iv = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
//     //         var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('abc'), key,
//     //             {
//     //                 keySize: 128 / 32,
//     //                 // blockSize: 128/8,
//     //                 iv: iv,
//     //                 mode: CryptoJS.mode.CBC,
//     //                 padding: CryptoJS.pad.Pkcs7
//     //             })
//     //         var rsutll = encryptedlogin.toString()
//     //         console.log("aesencryp128", rsutll);
//     //         // var parsecon = CryptoJS.enc.Base64.parse(rsutll)
//     //         // console.log("resullll", CryptoJS.enc.Base64.stringify(parsecon))

//     //         // Aes 128 Decryption
//     //         // var decrypted = CryptoJS.AES.decrypt(rsutll, key, {
//     //         //     keySize: 128 / 8,
//     //         //     iv: iv,
//     //         //     mode: CryptoJS.mode.CBC,
//     //         //     padding: CryptoJS.pad.Pkcs7
//     //         // });
//     //         // console.log('Decrypted : ' + decrypted);
//     //         // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));



//     //         // aes encryption 256
//     //         const key1 = 'fd87669889a746f5bf5a70a64f65d323'
//     //         // const key1 = 'eCu$t0m$iNeTB@n<eCu$t0m$iNeTB@n<'
//     //         const iv1 = 'eCu$t0m$iNeTB@n<'

//     //         const cipher = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('abc'), CryptoJS.enc.Utf8.parse(key1), {
//     //             iv: CryptoJS.enc.Utf8.parse(iv1), // parse the IV 
//     //             padding: CryptoJS.pad.Pkcs7,
//     //             mode: CryptoJS.mode.CBC
//     //         })
//     //         console.log("aesencryp256", cipher.toString());
//     //         var resultof128ency = CryptoJS.enc.Base64.parse(cipher.toString())
//     //         console.log("aesbase64_256", CryptoJS.enc.Base64.stringify(resultof128ency))

//     //         // var deccc ="EK1ilVFHZSFHu7LSNbRX7AN3TbF566QnSB4vs2msTFOCA7A="

//     //         // Aes 256 Decryption
//     //         // const decipher = CryptoJS.AES.decrypt(deccc.toString(), CryptoJS.enc.Utf8.parse(key1), {
//     //         //     iv: CryptoJS.enc.Utf8.parse(iv1), // parse the IV 
//     //         //     padding: CryptoJS.pad.Pkcs7,
//     //         //     mode: CryptoJS.mode.CBC
//     //         // })
//     //         // console.log("decrp256",decipher.toString(CryptoJS.enc.Utf8));




//     //     })
//     // })
// }