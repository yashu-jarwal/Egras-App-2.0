// import React, {Component} from'react';
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     Dimensions,
//     ScrollView,
//     TouchableOpacity,
//     Modal,
//     TouchableHighlight,
//     NativeModules,
//     ToastAndroid,
//     Alert,
//     FlatList,
// } from'react-native';
// // import CryptoJS from "crypto-js";
// import CryptoJS from "react-native-crypto-js";

// // import forge from "node-forge";

// class Utils extends React.Component{
//    //Process the return result
//     static handleResult(result){
//         let key1 = CryptoJS.enc.Utf8.parse(key);
//         let iv = CryptoJS.enc.Utf8.parse('your iv');
//         let encryptedHexStr = CryptoJS.enc.Hex.parse(result);
//         let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//        //AES decryption
//         let decrypt = CryptoJS.AES.decrypt(srcs, key1, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.NoPadding
//         });
//         let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//        //Remove the extra ASCII code
//         let resultStr = decryptedStr.slice(0,-decryptedStr.slice(-1).charCodeAt());
//         return JSON.parse(resultStr)
//     }
//    //Processing parameter transfer
//     static handleArgv(string){
//         let key ='fd876698-89a7-46f5-bf5a-70a64f65d323'

//         console.log(string,"Parameter connection before encryption");
//         let key1 = CryptoJS.enc.Utf8.parse('25Rq912Zub14KcOv');//16 bits
//         let iv = CryptoJS.enc.Utf8.parse("your iv");
//         let encrypted ='';
        
//         var length=16-getStrLeng(string)%16;
//         console.log("Processing parameter transfer to obtain encryption length and remaining result", getStrLeng(string), length);
//         for(var i=0;i<length;i++){
//             string=string+String.fromCharCode(length)
//         }

//         let srcs = CryptoJS.enc.Utf8.parse(string);
//        //AES encryption
//         encrypted = CryptoJS.AES.encrypt(srcs, key1, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.NoPadding
//         });
//        //Remove the extra ASCII code
//        //var length=16-string.length%16;
//         function getStrLeng(str){
//             var realLength = 0;
//             var len = str.length;
//             var charCode = -1;
//             for(var i = 0; i <len; i++){
//                 charCode = str.charCodeAt(i);
//                 if (charCode >= 0 && charCode <= 128) {
//                     realLength += 1;
//                 }else{
//                    //If it is Chinese, add 3 to the length
//                     realLength += 3;
//                 }
//             }
//             return realLength;
//         }
//         return encrypted.ciphertext.toString();
//     }

//    //Password md5 encryption
//     // static md5Text(passWord){
//     //     var md = forge.md.md5.create();//
//     //     md.update(passWord);
//     //     var mdPass=md.digest().toHex();//
//     //     var md1 = forge.md.md5.create();
//     //     md1.update(mdPass+'salt value');
//     //     return md1.digest().toHex();
//     // }
//     // static rsaEncode(str,publicKey){
//     //     let encrypt = new JSEncrypt();//instantiate the encrypted object
//     //     console.log("public key", publicKey);
//     //     encrypt.setPublicKey(publicKey);//Set the public key
//     //     let result = encrypt.encrypt(str);//The result obtained is already a base64 string
    
//     //     let str1 = result.replace(/\+/g, "-");//When passing parameters, you need to replace +-in the string
//     //     let str2 = str1.replace(/\//g, "_");
//     //     return str2;
//     // }
// }

// // module.exports = Utils;
// export default Utils