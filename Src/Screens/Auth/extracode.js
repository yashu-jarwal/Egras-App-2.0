// // import React from 'react';
// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     Dimensions,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     View,
//     NativeModules, Platform
// } from 'react-native';
// import styles from './styles'
// import Constant from '../../../Component/Constant';
// import CryptoJS from "react-native-crypto-js";
// import { sha256 } from 'react-native-sha256';
// import CryptoAesCbc from 'react-native-crypto-aes-cbc';
// import base64 from 'react-native-base64';
// import Helper from '../../../Component/Helper';
// import { NetworkInfo } from "react-native-network-info"
// import ApiUrl from '../../../Component/ApiURl';
// import axios from 'axios';
// import aesjs from 'aes-js';
// import Utils from '../../../navigation/index'
// import Aes from 'react-native-aes-crypto'
// // import DeviceInfo from 'react-native-device-info';

// const Login = () => {

//     let aes = require('aes-js');

//     const [userid, setuserid] = useState('ramdev')
//     const [password, setpassword] = useState('Test@123')
//     const [check, setcheck] = useState(true)
//     const [deviceIp, setdeviceIp] = useState('')

//     useEffect(() => {
//         NetworkInfo.getIPAddress().then(ipAddress => {
//             console.log("devicekiippp", ipAddress);
//             setdeviceIp(ipAddress)
//         });
//     })

//     const apicall = (encyptedval) => {
//         console.log("encryptedval", encyptedval);

//         var sting = "8iLXamM/4KkmRGZRGSXjORIHq8iwHg513/Nyxgrulkjql82nXKh+l6/Iqdxe0LC0s7y0Gd9+FK79SYTAq5oqmKgHrdRHYUvLyzA7eJMy/IXiaioRaizSAPJvX2HJZvzHaHTGGmy0T0SI6lg/HENGb2TUsBmK4aIhAMbg+aznOzMIoPjTIaipZIdTAvYkn8dZ2QjUsr1zWYZ29PqT/rQMEfOHDUC4tmKbmxxZe3IwA5M="
//         // var axios = require('axios');
//         var data = JSON.stringify(sting);

//         var config = {
//             method: Constant.POST,
//             url: Constant.Base_Url + ApiUrl.LOG_IN,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: data
//         };
//         console.log("configfile", config);

//         axios(config)
//             .then(function (response) {
//                 console.log(JSON.stringify(response.data));
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });

//     }
//     const encryptData = (text, key) => {
//         return Aes.randomKey(16).then(iv => {
//             return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
//                 cipher,
//                 iv,
//             }))
//         })
//     }

//     const extralogintest = () => {

//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         console.log("deviceipppp", deviceIp);

//         //encode MD5
//         var passwordmd5 = CryptoJS.MD5(password).toString();
//         console.log("mdffff", passwordmd5);
//         var md5add = rnd + passwordmd5;

//         var datatestmd5 = CryptoJS.MD5(md5add);
//         var md5string = datatestmd5.toString();
//         console.log("finalmd5", datatestmd5, md5string);

//         // Encode SHA256
//         sha256(password).then((hash) => {
//             console.log("hashfuncall", hash);
//             var joinsha = rnd + hash;

//             sha256(joinsha).then((hashval) => {
//                 console.log("hashfinalval", hashval);
//                 var sha256String = hashval.toString();
//                 console.log("logofsha26", sha256String);


//                 var finalvar = userid + "|" + md5string + "|" + sha256String + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;

//                 // var AESKey = "25Rq912Zub14KcOv"
//                 // var cc = CryptoJS.AES.encrypt((finalvar), AESKey, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()
//                 // console.log("logoffcccc", cc);
//                 // var data = cc.toString(CryptoJS.enc.bytes)
//                 // // var adesddd = CryptoJS.AES.decrypt(cc, AESKey).toString(CryptoJS.enc.Utf8);  //return abcdef ha ha 
//                 // console.log("envcyyyy", data);
//                 // var base64 = data.toString(CryptoJS.enc.Base64)
//                 // console.log("reuttuuu", base64);


//                 // var key = CryptoJS.enc.Utf8.parse('25Rq912Zub14KcOv');
//                 // console.log("restdatkey", key);
//                 // var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
//                 console.log("ivkeydta", finalvar)
//                 var key = "!@#b*&^%)'B^&*(?"

//                 var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(finalvar.toString()), key,
//                     {
//                         keySize: 128 / 32,
//                         // iv: iv,
//                         mode: CryptoJS.mode.CBC,
//                         padding: CryptoJS.pad.Pkcs7
//                     })
//                 var result = encryptedlogin.toString();
//                 console.log("resulllll",result)
//                 // var finalre = result.toString(CryptoJS.enc.Base64)
//                 // console.log("valueoffff", finalre)
//                 // var decrpbytesssssss = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(encryptedlogin.toString()), key).toString()

//                 var decryption = CryptoJS.AES.decrypt("CKw4KmXHJUBjtyqNpqmEOYHXOsEP6ScMcrCqk6xLxdcFgPzIpt0zw7NQ8TBjGRYMiD10PnexpdlCO0luMxQvgj3TcZLe/IGgW7nYXerI0XG4yQCcAnH01cGtdJMd2lsch9hBac9b098lOJFCnDBnc15nPG7dCVg9HgWkz+yhBR6Cb7MAyRydxkDFjp4AMR+1", "!@#b*&^%)'B^&*(?").toString();
//                 // var decryp = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(finalre), key)
//                 console.log("sdfsdfsf",decryption)

//                 // console.log("tstssss", decryp.toString())



//                 // var AesUtil = function (keySize, iterationCount) {
//                 //     this.keySize = keySize / 32;
//                 //     this.iterationCount = iterationCount;
//                 // };

//                 // AesUtil.prototype.generateKey = function (salt, passPhrase) {
//                 //     var key = CryptoJS.PBKDF2(
//                 //         passPhrase,
//                 //         CryptoJS.enc.Hex.parse(salt),
//                 //         { keySize: this.keySize, iterations: this.iterationCount });
//                 //     return key;
//                 // }

//                 // AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
//                 //     var key = this.generateKey(salt, passPhrase);
//                 //     var encrypted = CryptoJS.AES.encrypt(
//                 //         plainText,
//                 //         key,
//                 //         { iv: CryptoJS.enc.Hex.parse(iv) });
//                 //     return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
//                 // }


//             });
//         });
//     }


//     const loginbutton = () => {

//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         console.log("deviceipppp", deviceIp);

//         //encode MD5
//         var passwordmd5 = CryptoJS.MD5(password).toString();
//         console.log("mdffff", passwordmd5);
//         var md5add = rnd + passwordmd5;

//         var datatestmd5 = CryptoJS.MD5(md5add);
//         var md5string = datatestmd5.toString();
//         console.log("finalmd5", datatestmd5, md5string);

//         // var passwordsha = CryptoJS.sha256(planpassword).toString();
//         // console.log("paswooosha256", passwordsha);
//         // var datatestsha = CryptoJS.SHA256(rnd + hash)
//         // console.log("finalsha256", datatestsha);

//         // Encode SHA256
//         sha256(password).then((hash) => {
//             console.log("hashfuncall", hash);
//             var joinsha = rnd + hash;

//             sha256(joinsha).then((hashval) => {
//                 console.log("hashfinalval", hashval);
//                 var sha256String = hashval.toString();
//                 console.log("logofsha26", sha256String);


//                 var finalvar = userid + "|" + md5string + "|" + sha256String + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;
//                 console.log("finalvaa", finalvar)

//                 // var result = encryptData(finalvar, 'fd876698-89a7-46f5-bf5a-70a64f65d323')

//                 // var result = CryptoJS.enc.Utf8.encode(finalvar)
//                 // console.log("sdfsdfsdf", result);




//                 // const utf8 = require('utf8');
//                 // var result = utf8.encode(finalvar)
//                 // console.log("sdfsdfsdf", result);

//                 // var AESKey = "!@#b*&^%)'B^&*(?"
//                 // var cc = CryptoJS.AES.encrypt(('abv'), AESKey, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()
//                 // console.log("logoffcccc", cc);
//                 // var data = cc.toString(CryptoJS.enc.bytes)
//                 // var adesddd = CryptoJS.AES.decrypt(cc, AESKey).toString(CryptoJS.enc.Utf8);  //return abcdef ha ha 
//                 // console.log("envcyyyy", data);
//                 // var base64 = data.toString(CryptoJS.enc.Base64)
//                 // console.log("reuttuuu", base64);







//                 // var resultttt = Utils.handleArgv(result)
//                 // console.log("logreusllllll_", resultttt);


//                 console.log("loginfuncall", finalvar);
//                 let ancyp = finalvar.toLowerCase();
//                 var key = "!@#b*&^%)'B^&*(?"

//                 let ciphertext = CryptoJS.AES.encrypt('abv', key).toString();
//                 console.log("valueoftest", ciphertext);
//                 var ctx = CryptoJS.enc.Base64.parse(ciphertext)
//                 console.log("ddddddddddddd___", ctx.toString());

//                 // const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)



//                 // let textBytes = aes.utils.utf8.toBytes(ciphertext);
//                 // //  var sss = ciphertext.toString(CryptoJS.enc.Utf8);
//                 // // // // apicall(ciphertext)
//                 // console.log("encrypted done", textBytes);

//                 // var encryptedHex = aesjs.utils.hex.fromBytes(textBytes);
//                 // console.log("vslsllls_________",encryptedHex)

//                 // var sss = textBytes.toString(CryptoJS.enc.Utf8);
//                 // console.log("dattttttt",sss);


//                 var bytes = CryptoJS.AES.decrypt(ciphertext, "!@#b*&^%)'B^&*(?");
//                 console.log("decrpytres", bytes.toString());
//                 // var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//                 // console.log("desssssssssss", decryptedData);






//                 // var decryptedData = ciphertext.toString(CryptoJS.enc.Utf8);
//                 // console.log("desssssssssss", decryptedData);

//                 // secretKey = '12345678901111111234567890111111';
//                 // // console.log("datainsecrffff________",Buffer.from("Hello World").toString('base64'));
//                 // const encText = base64.encode(secretKey);
//                 // console.log("envcryyyyy___",encText)
//                 // iv = '1111111234567890';
//                 // secretKeyInBASE64 = 'MTIzNDU2Nzg5MDExMTExMTEyMzQ1Njc4OTAxMTExMTE=';
//                 // ivInBASE64 = 'MTExMTExMTIzNDU2Nzg5MA==';
//                 // keysize128 = '128';
//                 // keysize256 = '256';
//                 // text = 'Sachin Agrawal';

//                 // CryptoAesCbc.encryptInHex(
//                 //     ivInBASE64,
//                 //     secretKeyInBASE64,
//                 //     text,
//                 //     keysize128
//                 // ).then((encryptString) => {
//                 //     console.log("datafinsssss", encryptString);
//                 // });

//                 // var datainbytes = CryptoJS. aesjs.utils.utf8.toBytes(ciphertext);
//                 // console.log("finaldatainbytes", datainbytes);

//                 // let bytes = CryptoJS.AES.decrypt(ciphertext, 'fd876698-89a7-46f5-bf5a-70a64f65d323');
//                 // console.log("decrpbytesssssss",bytes);
//                 // let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

//                 // console.log("decryptedform___",decryptedData); // [{id: 1}, {id: 2}]



//             });
//         });


//         // var datatestsha = CryptoJS.SHA256(rnd + passwordsha.toLowerCase()).toLowerCase();


//         // var finalvar = "ramdev" + "|" + datatestmd5 + "|" + shaval + "|" + rnd + "|" + "10.1231.11" + "|" + "123456";

//         // console.log("loginfuncall",finalvar);
//         // // let ciphertext = CryptoJS.AES.encrypt(finalvar, 'fd876698-89a7-46f5-bf5a-70a64f65d323').toString();
//         // // console.log("valueoftest", ciphertext);
//         // // var datainbytes = aesjs.utils.utf8.toBytes(ciphertext);
//         // // console.log("finaldatainbytes", datainbytes);



//     }

//     const funcallbutton = () => {
//         var number = Math.floor(Math.random() * 9000000000) + 1000000000;
//         console.log(number);

//         // var data = [{ id: 1, name: 'Anil' }, { id: 2, name: 'Sunil' }]
//         // var data = "mydataisvalue"
//         var dash = 'f0de1293d5e93d648b295f2c90a3837e'
//         var dsahhh = 'eca1ff844af59e52d68343ca5963c9da74221f23bb3a3caac8c0df21fb289901'
//         var rnd = "1234567890";
//         var data = "Rammdev" + "|" + dash + "|" + dsahhh + "|" + number + "|" + "10.1231.11" + "|" + "123456";
//         console.log('Encrypt Data -', data)


//         // Encrypt
//         var ciphertext = CryptoJS.AES.encrypt(data, '25Rq912Zub14KcOv').toString();
//         //log encrypted data
//         console.log('Encrypt Data -')
//         console.log("result", ciphertext);

//         // Decrypt
//         var bytes = CryptoJS.AES.decrypt(ciphertext, '25Rq912Zub14KcOv');
//         console.log("decrpytres", bytes);
//         var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
//         console.log("desssssssssss", decryptedData);

//         //log decrypted Data
//         console.log('decrypted Data -')
//         // console.log(decryptedData);
//     }


//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={{ marginTop: 100 }}>
//                 <Text style={{ textAlign: 'center', fontSize: 55, color: '#F9FDFA', letterSpacing: 5 }}> E-GRAS </Text>
//                 <Text style={{ textAlign: 'center', fontSize: 25, color: '#EAF2F5' }}> LOGO </Text>
//             </View>
//             <View style={styles.mainview}>
//                 <View style={styles.submain}>
//                     <View style={styles.headview}>
//                         <Text style={styles.containsubH}> SIGN IN </Text>
//                         <ScrollView showsVerticalScrollIndicator={false}>

//                             <View style={styles.textview}>
//                                 <TextInput
//                                     placeholder="user name"
//                                     style={styles.Textinput}
//                                     value={userid}
//                                     underlineColorAndroid="transparent"
//                                     placeholderTextColor="#DADADA"
//                                     onChangeText={text => setuserid(text)}
//                                 />
//                             </View>
//                             <View style={[styles.textview, { marginTop: 10, flexDirection: 'row' }]}>
//                                 <TextInput
//                                     placeholder="password"
//                                     style={styles.Textinput}
//                                     value={password}
//                                     underlineColorAndroid="transparent"
//                                     placeholderTextColor="#DADADA"
//                                     secureTextEntry={check}
//                                     onChangeText={text => setpassword(text)}
//                                 />
//                                 <TouchableOpacity onPress={() => setcheck(!check)}>
//                                     <Image
//                                         source={require('../../../assets/visibility.png')}
//                                         style={styles.ImageStyle}
//                                     />
//                                 </TouchableOpacity>

//                             </View>
//                             <TouchableOpacity>
//                                 <Text style={styles.forgotview}> Forgot Password? </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={styles.buttonview} onPress={extralogintest}>
//                                 {/* <TouchableOpacity style={styles.buttonview} onPress={funcallbutton}> */}
//                                 <Text style={styles.buttonText}> Sing In </Text>
//                             </TouchableOpacity>

//                             <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 50 }}>
//                                 <Text style={[styles.subcontainer, { color: '#B5B9BA' }]}> Don't have an account? </Text>
//                                 <TouchableOpacity>
//                                     <Text style={[styles.subcontainer, { fontSize: 13, color: '#ACCACB' }]}> SIGN UP! </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </ScrollView>

//                     </View>
//                 </View>
//             </View>





//         </SafeAreaView>
//     );
// };

// export default Login;


// var key = CryptoJS.enc.Utf8.parse('eCu$t0m$iNeTB@n<');
// var iv = CryptoJS.enc.Utf8.parse('eCu$t0m$iNeTB@n<');

// var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('abc'), key,
//     {
//         keySize: 128 / 8,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     })
// console.log("resullll", encryptedlogin.toString())