import * as React from 'react';
import { Alert, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import AsyncStorageHelper from './AsyncStorageHelper';
// import String from '../Component/String';
import DeviceInfo from 'react-native-device-info';
// import { LocationsPermission } from './LocationsPermission';
import Constants from './Constant';
import { sha256 } from 'react-native-sha256';
import CryptoJS from "react-native-crypto-js";

export default class Helper extends React.Component {

    static mainApp;
    static navigationRef;
    static toast;
    static user_token = '';
    static singup_token = '';
    static device_type = Platform.OS == 'ios' ? 'ios' : 'andriod';
    static deviceId = DeviceInfo.getDeviceId();
    static deviceIp = ''
    static user = {};
    static user_id = {};
    static userData = {};

    static DepartName = ''
    static ServiceName = ''
    static GrnInfo = ''
    static IsRepeatChallan = false
    static District = ''
    static IsNewChallan = Constants.FALSE
    static IsServiceChallan = Constants.FALSE
    static ProfileChallan = false
    static PanNumber = ''
    static VehicleNumber = ''
    static DiscountAmt = ''
    static Profileinfo = ''

    static Payeinfo = {}
    static token = {};
    static userchallanstatus = ''
    static country_code = '+1'
    static user_TempToken = ''
    static globalLoader;
    static user_image = ''
    static User_Mpin = ''
    static userProfile = ''
    static Loc_Status = ''
    static isNotifiy = false
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    // static registerLoader(mainApp) {
    //     Helper.globalLoader = mainApp;
    // }

    // static async setData(key, val) {
    //     try {
    //         let tempval = JSON.stringify(val);
    //         await AsyncStorage.setItem(key, tempval);
    //     } catch (error) {
    //         console.error(error, 'AsyncStorage');
    //         // Error setting data
    //     }
    // }

    // static async removeData(key, val) {
    //     try {
    //         let tempval = JSON.stringify(val);
    //         await AsyncStorage.removeItem(key, tempval);
    //     } catch (error) {
    //         console.error(error, 'AsyncStorage');
    //         // Error setting data
    //     }
    // }

    // static async getData(key) {
    //     let value = '';
    //     try {
    //         value = await AsyncStorage.getItem(key);
    //         if (value) {
    //             let newvalue = JSON.parse(value);
    //             return newvalue;
    //         } else {
    //             return value;
    //         }
    //     } catch (error) {
    //         console.error(error, 'AsyncStorage');
    //         // Error retrieving data
    //     }
    // }


    // static registerToast(toast) {
    //     Helper.toast = toast;
    // }

    // static showToast(msg) {
    //     Toast.show(msg, {
    //         duration: Toast.durations.SHORT,
    //         position: Toast.positions.BOTTOM,
    //         shadow: true,
    //         animation: true,
    //         hideOnPress: true,
    //         containerStyle: { backgroundColor: 'rgba(0,0,0,0.7)', width: '70%', }

    //     });


    // }

    // static LogOutMethod() {
    //     AsyncStorageHelper.removeItemValue(Constants.USER_DATA)
    //     AsyncStorageHelper.removeItemValue(Constants.TOKEN)
    //     AsyncStorageHelper.removeItemValue("isloads")
    //     // AsyncStorageHelper.removeItemValue(Constants.isloads)
    //     Helper.userData = {}
    //     Helper.user_id = {}
    //     Helper.token = {}
    //     Helper.latitude = 0
    //     Helper.longitude = 0
    //     Helper.navigationRef.reset({
    //         index: 0,
    //         routes: [
    //             { name: 'usersignin' },
    //         ],
    //     })


    // }


    // static cameraAlert(alertMessage, Camera, Gallery, Cancel, cbCamera, cbGallery) {
    //     Alert.alert(
    //         String.AppName,
    //         alertMessage,
    //         [
    //             { text: 'Camera', onPress: () => { if (cbCamera) cbCamera(true); console.log('OK Pressed') } },
    //             { text: 'Gallery', onPress: () => { if (cbGallery) cbGallery(true); console.log('OK Pressed') } },
    //             { text: 'Cancel', onPress: () => { if (cbCamera) cbCamera(false); }, style: 'cancel' },
    //         ],
    //         { cancelable: false }
    //     )
    // }

    // static permissionConfirm(alertMessage, cb) {
    //     Alert.alert(
    //         String.AppName,
    //         alertMessage,
    //         [
    //             { text: 'NOTNOW', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
    //             { text: 'SETTINGS', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
    //         ],
    //         { cancelable: false }
    //     )
    // }

    // static CheckCurrentMap = async(cb) => {
    //   LocationsPermission.geoCurrentLocation(0, (data) => {
    //       console.log('data===>>>',data)
    //       if (data.latitude && data.longitude) {
    //           Helper.latitude = data.latitude
    //           Helper.longitude = data.longitude
    //           // cb(data)
    //       } else{
    //           this.CheckCurrentMap()
    //       }   
    //   })
    // }

    static Sha256conversion(data) {
        console.log("funcdata", data);
        return sha256(data);
    }
    static MD5Conversion(data) {
        return CryptoJS.MD5(data).toString();
    }

    static AES_128_Encryption(data) {
        var key = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
        console.log("keyenceee_", key);
        var iv = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
        var Encrypted = encryptedlogin.toString()
        console.log("aesencryp128", Encrypted);
        return Encrypted;
    }

    static AES_128_Decryption(data) {
        // console.log("decrpyvalue", data);
        var key = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
        var iv = CryptoJS.enc.Utf8.parse("eCu$t0m$iNeTB@n<");
        var decrypted = CryptoJS.AES.decrypt(data, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        // console.log('Decrypted : ' + decrypted);
        // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
        return decrypted.toString(CryptoJS.enc.Utf8);
    }







}
