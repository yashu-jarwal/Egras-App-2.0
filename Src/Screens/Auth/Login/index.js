// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    TextInput,
    Keyboard,
    BackHandler,
    Platform,
    View,
    TouchableOpacityBase,
} from 'react-native';
import styles from './styles'
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import images from '../../../Component/Imagepath';
import Colors from '../../../Component/Color';
import CryptoAesCbc from 'react-native-crypto-aes-cbc';
import { NetworkInfo } from "react-native-network-info"
import { handleNavigation } from '../../../navigation/Route';
import CommonMethods from '../../../Lib/CommonMethods';
import aesjs from 'aes-js';
import Utils from '../../../navigation/index'
import Aes from 'react-native-aes-crypto'
import { Base64 } from 'js-base64';
import { useNavigation } from '@react-navigation/native';
import CustomLoader from '../../../Component/CustomLoader'
import AsyncStorageHelper from '../../../Lib/AsyncStoreageHelper';
import NetInfo from "@react-native-community/netinfo";

const Login = () => {
    let error = []

    let aes = require('aes-js');
    const navigation = useNavigation();

    const [userid, setuserid] = useState('')
    const [password, setpassword] = useState('')
    const [check, setcheck] = useState(true)
    const [deviceIp, setdeviceIp] = useState('')
    const [loaderVisible, setloaderVisible] = useState(false)
    const [Loginerror, setLoginerror] = useState('')
    const [Passworderror, setPassworderror] = useState('')
    const [errors, seterrors] = useState([])

    const ref_input2 = useRef();
    const ref_input = useRef();

    useEffect(() => {
        // get device ipv4 addresss
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log("devicekiippp", ipv4Address);
            setdeviceIp(ipv4Address)
            Helper.deviceIp = ipv4Address
        });
        // CheckConnectivity()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    })

    const handleBackButtonClick = () => {
        navigation.navigate('Splash')

    }

    const apicall = async (encyptedval) => {

        Apicall.ApiMethod(Constant.POST, ApiUrl.LOG_IN, encyptedval).then((resp) => {


            console.log("resss", resp.data);
            var response = resp.data
            if (response != undefined || false) {

                console.log("inifffff");
                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)

                var splitdata = AES128Decry.split("|")
                console.log("Decrpytedvaue", splitdata);
                AsyncStorageHelper.setData(Constant.TOKEN, splitdata[1])



                // var userid = splitdata[0]
                // // console.log("userid_", userid);
                hideLoader()
                if (splitdata[0] == 0) {
                    console.log("status code is 200");
                    Helper.user_token = splitdata[1]
                    AsyncStorageHelper.setData(Constant.TOKEN, splitdata[1])
                    if (splitdata[3] == Constant.FALSE) {
                        CommonMethods.showSuccess("Login Successfully")
                        handleNavigation({ type: 'setRoot', page: 'NMpin', navigation: navigation })
                    }
                    else if (splitdata[3] == Constant.TRUE) {
                        CommonMethods.showSuccess("Login Successfully")
                        handleNavigation({ type: 'setRoot', page: 'Mpin', navigation: navigation })
                    }
                    else if (splitdata[4] != Constant.UserStatus) {
                        CommonMethods.showError("User not register")
                        console.log("User is not authorized");
                    }
                }
                else if (splitdata[0] == 1) {
                    CommonMethods.showError("Invalid LoginId or Password")
                    console.log("Invalid LoginId! Please Check");
                }
                else if (splitdata[0] == 2) {
                    CommonMethods.showError("Wrong Login attempt exceed limit 5! Please Reset Password")
                    console.log("Wrong Login attempt exceed limit 5! Please Reset Password");
                }
                else {
                    console.log("status code is 400");
                    CommonMethods.showError("Invalid LoginId or Password")
                }
            }
            else {
                hideLoader()
                CommonMethods.showError("Server Down! Please try again")
            }
        })
    }

    const loginbutton = () => {
        if (validate_check()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    showLoader()

                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("deviceipppp", deviceIp);

                    //encode MD5
                    var passwordmd5 = Helper.MD5Conversion(password)
                    console.log("mdffff", passwordmd5);
                    var updatedmd5 = Helper.MD5Conversion(rnd + passwordmd5)
                    console.log("finalmd5", updatedmd5.toString());

                    // Encode SHA256
                    Helper.Sha256conversion(password).then((Hash) => {
                        console.log("hashfuncall", Hash);
                        var combinsha256 = rnd + Hash;
                        Helper.Sha256conversion(combinsha256).then((FinalHash) => {
                            console.log("hashfuncall", FinalHash);

                            var finalvar = userid + "|" + updatedmd5.toString() + "|" + FinalHash.toString() + "|" + rnd + "|" + deviceIp + "|" + Helper.deviceId;
                            console.log("finalvaa", finalvar)
                            let ancyp = finalvar.toLowerCase();

                            //AES 128 Encryption
                            var AES128Ency = Helper.AES_128_Encryption(ancyp)
                            console.log("LoginMpinResult", AES128Ency);

                            // Api Call 
                            apicall(AES128Ency)
                        })

                    })
                }
                else {
                    hideLoader()
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })
        }

        // // aes encryption 256
        // const key1 = 'fd87669889a746f5bf5a70a64f65d323'
        // // const key1 = 'eCu$t0m$iNeTB@n<eCu$t0m$iNeTB@n<'
        // const iv1 = 'eCu$t0m$iNeTB@n<'

        // const cipher = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse('abc'), CryptoJS.enc.Utf8.parse(key1), {
        //     iv: CryptoJS.enc.Utf8.parse(iv1), // parse the IV 
        //     padding: CryptoJS.pad.Pkcs7,
        //     mode: CryptoJS.mode.CBC
        // })
        // console.log("aesencryp256", cipher.toString());
        // var resultof128ency = CryptoJS.enc.Base64.parse(cipher.toString())
        // console.log("aesbase64_256", CryptoJS.enc.Base64.stringify(resultof128ency))

        // var deccc ="EK1ilVFHZSFHu7LSNbRX7AN3TbF566QnSB4vs2msTFOCA7A="

        // Aes 256 Decryption
        // const decipher = CryptoJS.AES.decrypt(deccc.toString(), CryptoJS.enc.Utf8.parse(key1), {
        //     iv: CryptoJS.enc.Utf8.parse(iv1), // parse the IV 
        //     padding: CryptoJS.pad.Pkcs7,
        //     mode: CryptoJS.mode.CBC
        // })
        // console.log("decrp256",decipher.toString(CryptoJS.enc.Utf8));

    }

    // const validateEmail = () => {
    //     if (userid == '') {
    //         CommonMethods.showError("Enter Your LoginID")
    //         console.log("Enter Your UserName")
    //         return false
    //     }
    //     else if (password == '') {
    //         CommonMethods.showError("Enter Your Passowrd")
    //         console.log("Enter Your Passowrd")
    //         return false
    //     }
    //     else {
    //         return true
    //     }

    // };

    const validate_check = () => {
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;

        let firstChar = userid.charAt(0);


        if (userid === '') {
            // CommonMethods.showError("Please enter Loginid")
            error = []
            console.log("Please enter Loginid")
            error.push('Loginid')
            setLoginerror('Please Enter Loginid')
        }
        else if (format.test(firstChar)) {

            console.log('Loginid Not Start with Special Character')
            error.push('Loginid')
            setLoginerror('Loginid Not Start with Special Character or Number')
        }
        else if (userid.length < 3) {
            // error = []
            error.push('Loginid')
            setLoginerror("Loginid Should contain minimum 3 Character")

            console.log("Loginid Should contain minimum 3 Character");
        }
        if (password === '') {
            error.push('Password')
            setPassworderror('Please Enter Password')

            console.log("Please enter Password");
        }

        else if (password.length < 6) {
            error.push('Password')
            setPassworderror('Password contain at least 6 charchter lenght')

            console.log("Please enter Password");
        }
        if (error.length) {
            console.log("onsubmiterrrr", error.length);
            seterrors(error)
            return;
        }
        else if (error.length === 0) {
            return true
        }
    };

    const validateEmail = () => {
        var format = /[`0-9!@#$%^&*()√π÷×¶∆£¢€¥°©®™✓_+\s-=\[\]{};':"\\|,.<>\/?~]/;
        let firstChar = userid.charAt(0);
        if (userid === '') {
            // CommonMethods.showError("Please enter Loginid")
            error = []
            console.log("Please enter Loginid")
            error.push('Loginid')
            setLoginerror('Please Enter Loginid')
        }
        else if (format.test(firstChar)) {

            console.log('Loginid Not Start with Special Character')
            error.push('Loginid')
            setLoginerror('Loginid Not Start with Special Character')
        }
        else if (userid.length < 3) {
            // error = []
            error.push('Loginid')
            setLoginerror("Loginid Should contain minimum 3 Character")

            console.log("Loginid Should contain minimum 3 Character");
        }
        else if (password === '') {
            error.push('Password')
            setPassworderror('Please Enter Password')

            console.log("Please enter Password");
        }
        else if (password.length < 6) {
            error.push('Password')
            setPassworderror('Password contain at least 6 charchter lenght')

            console.log("Please enter Password");
        }
        if (error.length) {
            console.log("erorororroro_", error.length);
            seterrors(error)
            return;
        }
        else {
            return true
        }
    };

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    // const removeEmojis = (string) => {
    //     // emoji regex from the emoji-regex library
    //     const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g

    //     return string.replace(regex, '')
    // }

    const Secrutrycheck = () => {
        if (check) {
            setcheck(false)
        }
        else {
            setcheck(true)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <CustomLoader loaderVisible={loaderVisible} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                    <View style={{ marginTop: 70 }}>
                        <Text style={{ textAlign: 'center', fontSize: 55, color: '#F9FDFA', letterSpacing: 5 }}> E-GRAS </Text>
                        {/* <Text style={{ textAlign: 'center', fontSize: 25, color: '#EAF2F5' }}> LOGO </Text> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={images.logo} resizeMode='contain' style={{ height: '50%', width: '50%', bottom: 50, right: 30 }} />
                        </View>
                    </View>
                    <View style={styles.mainview}>
                        <View style={styles.submain}>
                            <View style={styles.headview}>
                                <Text style={styles.containsubH}> SIGN IN </Text>
                                <ScrollView showsVerticalScrollIndicator={false}>

                                    <View style={styles.textview} removeClippedSubviews={false}>
                                        <TextInput
                                            placeholder="User Name"
                                            style={styles.Textinput}
                                            contextMenuHidden={false}
                                            value={userid}
                                            selectTextOnFocus={false}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor={Colors.inputcolor}
                                            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            onChangeText={text => {
                                                setuserid(text.replace(/[`\?!\s<>\\\/\""''«≤‹⟨⟩»≥›]/gi, ''))
                                                seterrors([])
                                            }}
                                            returnKeyType="next"
                                            onSubmitEditing={() => { ref_input2.current.focus(), validateEmail() }}

                                        />
                                        {
                                            errors.includes('Loginid') ?
                                                <Text style={styles.Errortextview}>{Loginerror}</Text> : null
                                        }
                                    </View>
                                    <View style={[styles.textview, { marginTop: 10, flexDirection: 'row' }]}>
                                        <TextInput
                                            placeholder="Password"
                                            style={styles.Textinput}
                                            value={password}
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor={Colors.inputcolor}
                                            secureTextEntry={check}
                                            // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                            maxLength={15}
                                            ref={ref_input2}
                                            onChangeText={text => { setpassword(text.replace(/[`%^&£¢€©¥°••√π÷×¶∆°°©₹®™✓()|+\?;:'",<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                            onEndEditing={() => validateEmail()}
                                            onSubmitEditing={() => { loginbutton() }}
                                        />
                                        <View style={{
                                            justifyContent: 'flex-end', bottom: 18,
                                            right: 55,
                                        }}>
                                            <TouchableOpacity onPress={() => { console.log("eyebutton checkk_______", check), Secrutrycheck() }}>
                                                <Image
                                                    source={require('../../../assets/Images/visibility.png')} resizeMode='cover'
                                                    style={styles.ImageStyle}
                                                />
                                            </TouchableOpacity>
                                        </View>



                                    </View>
                                    {
                                        errors.includes('Password') ?
                                            <Text style={[styles.Errortextview, { marginHorizontal: 30 }]}>{Passworderror}</Text> : null
                                    }
                                    <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }}>
                                        <Text style={styles.forgotview}> Forgot Password? </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonview} onPress={loginbutton}>
                                        <Text style={styles.buttonText}> Sing In </Text>
                                    </TouchableOpacity>

                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 50 }}>
                                        <Text style={[styles.subcontainer, { color: Colors.inputcolor }]}> Don't have an account? </Text>
                                        <TouchableOpacity onPress={() =>
                                            handleNavigation({ type: 'setRoot', page: 'UserRegistration', navigation: navigation })
                                        }
                                        >
                                            <Text style={[styles.subcontainer, { fontSize: 15, color: Colors.boldtheme, fontWeight: 'bold' }]}> SIGN UP! </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;
