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
import { handleNavigation } from '../../../navigation/Route';
import NetInfo from "@react-native-community/netinfo";

const ChangePassword = () => {
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [loaderVisible, setloaderVisible] = useState(false)
    const navigation = useNavigation();

    const [NewPassworderror, setNewPassworderror] = useState('')
    const [ConfirmPassworderror, setConfirmPassworderror] = useState('')
    const [errors, seterrors] = useState([])

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    const onsubmit = () => {
        if (onsubmitvalidate()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("success");
                    showLoader()

                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("rendom_gen_chpwd", rnd, Helper.user_TempToken);

                    Helper.Sha256conversion(NewPassword).then((Hash) => {
                        console.log("passwordsha256", Hash);
                        var finalvar = Helper.user_TempToken + "|" + Hash + "|" + rnd;
                        console.log("finalvaa", finalvar)
                        //AES 128 Encryption
                        var AES128Ency = Helper.AES_128_Encryption(finalvar)
                        console.log("chngpwd_encrpyted_Result", AES128Ency);

                        // Api Call 
                        Apicall.ApiMethod(Constant.POST, ApiUrl.ChangePassword, AES128Ency).then((resp) => {
                            hideLoader()
                            console.log("chgpwd_result", resp);
                            var response = resp.data
                            console.log("resultofchangpwd", response);

                            //AES 128 Decryption
                            var AES128Decry = Helper.AES_128_Decryption(response)
                            console.log("chngpwd_decryptval", AES128Decry);
                            var splitdata = AES128Decry.split("|")
                            console.log("splitedvaue", splitdata);


                            if (splitdata[0] == 1 && splitdata[1] == rnd) {
                                console.log("password changed");
                                CommonMethods.showSuccess("Password changed successfully")
                                handleNavigation({ type: 'setRoot', page: 'usersignin', navigation: navigation })
                            }
                            else if (splitdata[0] == 0) {
                                console.log("password already in use");
                                CommonMethods.showSuccess("Password already use")
                            }
                            else {
                                CommonMethods.showError("Something went wrong! Please try again")
                                console.log("password status code is 400");
                            }
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

    }
    const newref = useRef()
    const confirmref = useRef()



    const onsubmitvalidate = () => {
        let error = []
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (NewPassword === '') {
            error.push('NewPassword')
            setNewPassworderror('Please Enter New Password')

            console.log("Please enter NewPassword");
        }
        else if (NewPassword.length < 6) {
            error.push('NewPassword')
            setNewPassworderror('Password should contain atleast 6 characters')
            console.log("Password should contain atleast 6 characters");
        }
        else if (strongRegex.test(NewPassword) == '') {
            error.push('NewPassword')
            setNewPassworderror('Passwrod must contain one special character(!@#$), one Uppercase letter(A-Z), one Lowercase letter(a-z), one number(0-9)')
            console.log("Passwrod must contain one special character(!@#$), one Uppercase letter(A-Z), one Lowercase letter(a-z), one number(0-9)")
        }

        if (ConfirmPassword == '') {
            error.push('ConfirmPassword')
            setConfirmPassworderror('Please Enter Confirm Password ')
            console.log("Please enter Confirm Password");
        }
        else if (NewPassword != ConfirmPassword) {
            error.push('ConfirmPassword')
            setConfirmPassworderror('Confirm Password Not Match ')
            console.log("Confirm Password not match");
        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            return true
        }
    };    //     if (NewPassword == '') {
    //         CommonMethods.showError("Please Enter New Password")
    //         console.log("Please Enter New Password")
    //         return false
    //     }
    //     else if (ConfirmPassword == '') {
    //         CommonMethods.showError("Please enter Confirm Password")
    //         console.log("Please enter Confirm Password");
    //         return false
    //     }
    //     else if (NewPassword != ConfirmPassword) {
    //         CommonMethods.showError("Confirm Password not match")
    //         console.log("Confirm Password not match");
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // };
    const validateEmail = () => {
        let error = []
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if (NewPassword === '') {
            error.push('NewPassword')
            setNewPassworderror('Please Enter New Password')

            console.log("Please enter NewPassword");
        }
        else if (NewPassword.length < 6) {
            error.push('NewPassword')
            setNewPassworderror('Password should contain atleast 6 characters')
            console.log("Password should contain atleast 6 characters");
        }
        else if (strongRegex.test(NewPassword) == '') {
            error.push('NewPassword')
            setNewPassworderror('Passwrod must contain one special character(!@#$), one Uppercase letter(A-Z), one Lowercase letter(a-z), one number(0-9)')
            console.log("Passwrod must contain one special character(!@#$), one Uppercase letter(A-Z), one Lowercase letter(a-z), one number(0-9)")
        }

        else if (ConfirmPassword == '') {
            error.push('ConfirmPassword')
            setConfirmPassworderror('Please Enter Confirm Password ')
            console.log("Please enter Confirm Password");
        }
        else if (NewPassword != ConfirmPassword) {
            error.push('ConfirmPassword')
            setConfirmPassworderror('Confirm Password Not Match ')
            console.log("Confirm Password not match");
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
                                <Text style={styles.containsubH}> Change Password</Text>
                            </View>

                            <View style={{ marginHorizontal: 30, marginTop: 40 }} removeClippedSubviews={false}>
                                <Text style={styles.Textview}> Enter New Password</Text>
                                <TextInput
                                    placeholder="Enter New Password"
                                    style={styles.Textinput}
                                    value={NewPassword}
                                    contextMenuHidden={Platform.OS === 'ios' ? true : false}
                                    maxLength={15}
                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'email-address'}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#B5B5B5"
                                    onChangeText={text => { setNewPassword(text.replace(/[`%^&£¢€©¥°••√π÷×¶∆₹°°©®™✓()|+\?;:'",<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                    // onEndEditing={() => validateEmail()}
                                    onSubmitEditing={() => { confirmref.current.focus(), validateEmail() }}

                                />
                                {
                                    errors.includes('NewPassword') ?
                                        <Text style={styles.Errortextview}>{NewPassworderror}</Text> : null
                                }
                            </View>
                            <View style={{ marginHorizontal: 30, marginTop: 25 }} removeClippedSubviews={false}>
                                <Text style={styles.Textview}> Enter Confirm Password</Text>
                                <TextInput
                                    placeholder="Enter Confirm Password"
                                    style={styles.Textinput}
                                    value={ConfirmPassword}
                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'email-address'}
                                    ref={confirmref}
                                    contextMenuHidden={Platform.OS === 'ios' ? true : false}
                                    maxLength={15}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#B5B5B5"
                                    onChangeText={text => { setConfirmPassword(text.replace(/[`%^&£¢€©¥°••√π÷×¶∆₹°°©®™✓()|+\?;:'",<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                    onEndEditing={() => validateEmail()}
                                />
                                {
                                    errors.includes('ConfirmPassword') ?
                                        <Text style={styles.Errortextview}>{ConfirmPassworderror}</Text> : null
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

export default ChangePassword;
