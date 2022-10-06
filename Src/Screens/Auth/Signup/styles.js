import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Component/Color';
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    Textinput: {
        height: 40,
        margin: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.bordercolor,
        borderRadius: 10,
        padding: 10,
        width: '95%',
        color: Colors.inputcolor,
    },
    headview: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, bottom: Dimensions.get('window').height / 1.5, height: Dimensions.get('window').height / 1.25,
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:0,marginHorizontal:18},
    mainview: { height: '30%', width: Dimensions.get('window').width, position: 'absolute', bottom: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },
    ImageStyle: {
        padding: 5,
        // margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        tintColor: '#adacac',
        bottom: 4, 
        // marginHorizontal:20
    },
    placeholderstyle: {
        marginLeft: 20
    },
    textview: {
        marginHorizontal: 20, marginTop: 0
    },
    textview: {
        marginHorizontal: 20, marginTop: 0
    },
    Dobview: {
        marginHorizontal: 30,
        height: 40,
        margin: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.bordercolor,
        borderRadius: 10,
        padding: 10,
        width: '85%',
        flexDirection: 'row',
        justifyContent:"space-between"
    },
    Dobtextview: {
        fontSize: 15, color: Colors.inputcolor,height:30
    },
    calendarHead: { backgroundColor: Colors.textcolor, height: 100, width: Dimensions.get('window').width * 0.8, },
    containsubH: { textAlign: 'center', fontSize: 25, marginTop: 20, marginBottom: 10, fontWeight: 'bold', color: Colors.boldtheme },
    forgotview: { textAlign: 'right', fontSize: 15, marginTop: 0, fontWeight: 'bold', color: Colors.boldtheme, marginHorizontal: 0, bottom: 6 },
    buttonview: { marginVertical: 15, marginBottom: 0, backgroundColor: Colors.buttonColors, height: 50, marginHorizontal: 20, borderRadius: 20 },
    buttonText: { textAlign: 'center', fontSize: 17, color: Colors.white, marginTop: 12 },
    subcontainer: { textAlign: 'center', fontSize: 13, },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    modalbutton:{},
    modaltext:{ fontSize: 17, textAlign:'right',color:Colors.buttonColors ,marginRight:40,marginVertical:10},
    modaltextHead:{ fontSize: 15, textAlign:'center',color:Colors.buttonColors ,marginVertical:10}
});

// import React from "react";
// import { Button, Image, StyleSheet, Text, View } from "react-native";
// import CryptoJS from "react-native-crypto-js";
// //import  RSA  from "react-native-rsa-native";
// import RSAKeychain from "react-native-rsa-native";
// const logoUri = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" /><circle cx="420.9" cy="296.5" r="45.7" /><path d="M520.5 78.1z" /></g></svg>`;

// function Link(props) {
//   return (
//     <Text
//       {...props}
//       accessibilityRole="link"
//       style={StyleSheet.compose(styles.link, props.style)}
//     />
//   );
// }

// function App() {
//   function padString(source) {
//     var paddingChar = "0";
//     var size = 16;
//     var padLength = size - source.length;

//     for (var i = 0; i < padLength; i++) source += paddingChar;

//     return source;
//   }

//   function generateKey(password, salt) {
//     var padLengh = salt.length % 16;
//     padLengh = 16 - padLengh;

//     salt = salt.substr(0, 16);

//     if (password.length > 16) password = password.substr(0, 16);

//     password = padString(password, 16, "0");
//     salt = salt + password;
//     return salt;
//   }

//   function encrypt(password, salt, plainText) {
//     var key = generateKey(password, salt);

//     // Encrypt

//     let bytes = CryptoJS.AES.encrypt(plainText, key).toString();
//     let cipherTextBase64 = Buffer.from(bytes).toString("base64");
//     console.log("cipherTextBase64 : " + cipherTextBase64);
//     let ciphertext = bytes;

//     return ciphertext;
//   }

//   function decrypt(password, salt, cipheredText) {
//     var key = generateKey(password, salt);
//     console.log(key);
//     var decryptedText = CryptoJS.AES.decrypt(cipheredText, key);
//     var base64 = CryptoJS.enc.Base64.stringify(decryptedText);
//     console.log(base64);
//     return decryptedText;
//   }

//   const test = () => {
//     var password = "1-DXB";
//     var salt = "b928fdeb-1dab-48e9-8b46-62c1eca56e11";

//     //var encryptedBase64Key = generateKey(password,salt);

//     var plainText =
//       "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpZpUJ8Q9pFv1qxEs7NhGGm81wRf8D2FTLkqXnDSR8f2WLhImO9++sIb/J85FPAqZZNqmFMBxEcyKkUcEK9zD+X91m1erI9Zm6+kVx0WN3Y73IysurG0+KkkX2JkaGNhCI4jvfFA0i/GaOQoo/5XSk3aQTac2mxT5YDrxVvbhEhwIDAQAB";

//     //var encryptedCipherText = encrypt(password, salt, plainText);
//     var encryptedCipherText =
//       "6/5w50Gg4yxXrgUqvaZ23y5mjvAD/WG9JwbuBJK5VICpfIKtEQFhyur6JADDCLUuOySC/d525L9LCLUJu2f6zftVGD4QWbHioZPGPKaANk8IofQfC2P32QQiJUf47T8Gbu16bxn6b2cFPHMFT2Nu6M/ISDDhnb5zd5pukYNKfg32DdJKRXblG9hHVYOt0hk5JW8auQTYXG7+dvRc8XxzfYbg5zd6eye+yDX4FjXVhHvPhTNkKtNM0WaF6O9krnPznJpHhWrck56PxsIYbQ6Yht7dLDBozLBvtTVmZJe5BLk=";

//     var decryptedData = decrypt(password, salt, encryptedCipherText);

//     console.log("encryptedData " + encryptedCipherText);

//     console.log("decryptedData " + decryptedData);

//     alert(encryptedCipherText);
//     alert(decryptedData);
//   };

//   return (
//     <View style={styles.app}>
//       <View style={styles.header}>
//         <Image
//           accessibilityLabel="React logo"
//           source={{ uri: logoUri }}
//           resizeMode="contain"
//           style={styles.logo}
//         />
//         <Text style={styles.title}>React Native for Web</Text>
//       </View>
//       <Text style={styles.text}>
//         This is an example of an app built with{" "}
//         <Link href="https://github.com/facebook/create-react-app">
//           Create React App
//         </Link>{" "}
//         and{" "}
//         <Link href="https://github.com/necolas/react-native-web">
//           React Native for Web
//         </Link>
//       </Text>
//       <Text style={styles.text}>
//         To get started, edit{" "}
//         <Link href="https://codesandbox.io/s/q4qymyp2l6/" style={styles.code}>
//           src/App.js
//         </Link>
//         .
//       </Text>
//       <Button onPress={test} title="Example button1" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   app: {
//     marginHorizontal: "auto",
//     maxWidth: 500
//   },
//   logo: {
//     height: 80
//   },
//   header: {
//     padding: 20
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: "1.5rem",
//     marginVertical: "1em",
//     textAlign: "center"
//   },
//   text: {
//     lineHeight: "1.5em",
//     fontSize: "1.125rem",
//     marginVertical: "1em",
//     textAlign: "center"
//   },
//   link: {
//     color: "#1B95E0"
//   },
//   code: {
//     fontFamily: "monospace, monospace"
//   }
// });

// export default App;
