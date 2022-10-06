import React, { useState, useEffect, Component } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    Keyboard,
    View,
} from 'react-native';
import styles from './styles'
import images from '../../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Input from '../../../Component/Textinput';
import Apicall from '../../../Component/Apicall';
import { NetworkInfo } from "react-native-network-info"
import CustomLoader from '../../../Component/CustomLoader'
import String from '../../../Component/String';
import { handleNavigation } from '../../../navigation/Route';
import CommonMethods from '../../../Lib/CommonMethods';
import NetInfo from "@react-native-community/netinfo";

class OTP extends Component {
    constructor(props) {
        console.log("otpprops_", props.route.params);
        super(props);
        this.state = {
            isLoading: false,
            loaderVisible: false,
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
            otp6: '',
            user_token: props.route.params ? props.route.params.usertoken : '',
            user_details: props.route.params ? props.route.params.userdetails : '',
            flag: props.route.params ? props.route.params.flag : '',
            errors: [],
            otp6erro: ''
        };
    }

    hideLoader = () => { this.setState({ loaderVisible: false }) }
    showLoader = () => { this.setState({ loaderVisible: true }) }

    Verifyotp = async (encyptedval, rnd) => {
        console.log("rendddd", rnd);
        var Url;
        if (this.state.flag == 'Singup') {
            Url = ApiUrl.Signupverify;
        }
        else if (this.state.flag == 'Forgot_Password') {
            Url = ApiUrl.Verifyotp
        }
        this.showLoader()
        console.log("url__", Url);
        Apicall.ApiMethod(Constant.POST, Url, encyptedval).then((resp) => {
            this.hideLoader()
            console.log("resss_verifyotp", resp.data);
            var response = resp.data

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)

            var splitdata = AES128Decry.split("|")
            console.log("Decrpytedvaue", splitdata[0]);

            if (splitdata[0] == 1 && splitdata[1] == rnd) {
                console.log("otpverify status code is 200");
                CommonMethods.showSuccess("Otp Submitted Successfully")
                if (this.state.flag == 'Singup') {
                    handleNavigation({ type: 'setRoot', page: 'usersignin', navigation: this.props.navigation })
                }
                else if (this.state.flag == 'Forgot_Password') {
                    handleNavigation({ type: 'setRoot', page: 'ChangePassword', navigation: this.props.navigation })
                }
            }
            else {
                CommonMethods.showError("Invalid Otp!")
                console.log("invalidotp and status code is 400");
            }
        })
    }

    onsubmit = () => {
        if (this.validateEmail()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("success");
                    this.showLoader();
                    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
                    var otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6

                    console.log("otpvaluee", otp);

                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("deviceipppp", rnd);

                    var finalvar = this.state.user_token + "|" + otp + "|" + rnd;
                    console.log("otpfinalvar", finalvar)

                    // //AES 128 Encryption
                    var AES128Ency = Helper.AES_128_Encryption(finalvar)
                    console.log("otpencrpyted_Result", AES128Ency);

                    // Api Call 
                    this.Verifyotp(AES128Ency, rnd)
                }
                else {
                    this.hideLoader()
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })

        }
    }

    onResendbutton = () => {
        const { user_details } = this.state;
        var mobile = user_details.MobilePhone
        console.log("mbilellll", mobile);

        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("rendom_gen", rnd);

        var finalvar = mobile + "|" + rnd;
        console.log("otpresendfinalvar", finalvar)

        // //AES 128 Encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        console.log("otpresendencrpyted_Result", AES128Ency);

        // Api Call 
        this.Resendotp(AES128Ency, rnd)
    }

    Resendotp = async (encyptedval, rnd) => {
        console.log("rendddd_resend", rnd);
        Apicall.ApiMethod(Constant.POST, ApiUrl.Resendotp, encyptedval).then((resp) => {
            this.hideLoader()
            console.log("resss_Resendotp", resp.data);
            var response = resp.data

            if (response == 1) {
                CommonMethods.showSuccess("Otp resend successfully on register number")
                console.log("Resendotp status code is 200");
            }
            else {
                CommonMethods.showError("Something went wrong! Please try again")
                console.log("Resendotp status code is 400");
            }
        })
    }




    validateEmail = () => {
        let error = []
        const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
        var otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
        if (otp.length != 6) {
            error.push('otp')
            this.setState({ otp6erro: 'otp field cannot be blank' })
            console.log("otp field cannot be blank")
        }
        if (error.length) {
            console.log("erorororroro_", error);
            this.setState({ errors: error })
            return;
        }
        else {
            Keyboard.dismiss()
            return true
        }
    };

    setValues(key, value) {
        this.setState({ [key]: value.replace(/[^0-9]/g, '') }, () => {
            if (value) {
                switch (key) {
                    case 'otp1':
                        this.otp2.focus();
                        break;
                    case 'otp2':
                        this.otp3.focus();
                        break;
                    case 'otp3':
                        this.otp4.focus();
                        break;
                    case 'otp4':
                        this.otp5.focus();
                        break;
                    case 'otp5':
                        this.otp6.focus();
                        break;
                    case 'otp6':
                        break;
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'otp6':
                        this.otp5.focus();
                        break;
                    case 'otp6':
                        this.otp5.focus();
                        break;
                    case 'otp5':
                        this.otp4.focus();
                        break;
                    case 'otp4':
                        this.otp3.focus();
                        break;
                    case 'otp3':
                        this.otp2.focus();
                        break;
                    case 'otp2':
                        this.otp1.focus();
                        break;
                    default:
                        break;
                }
            }
        })
    }

    render() {
        const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
        console.log("returnvaue__", this.state.user_details);
        return (
            <SafeAreaView style={styles.container} >
                <CustomLoader loaderVisible={this.state.loaderVisible} />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                        <View style={styles.mainview}>
                            <View style={styles.submain}>
                                <View style={styles.headview}>
                                    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                        <Text style={styles.containsubH}> Enter OTP</Text>
                                        <Text style={[styles.containsubH, { fontSize: 14 }]}> {String.CodeDigit}</Text>
                                    </View>


                                    <View style={{ paddingHorizontal: 12, marginTop: 40, }}>
                                        <Text style={styles.Textview}> Enter OTP</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                returnKeyType="next"
                                                style={styles.inputView1}
                                                placeholder={""}
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                blurOnSubmit={false}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                onChangeText={(value) => this.setValues('otp1', value)}
                                                value={otp1}
                                                onSubmitEditing={() => this.otp2.focus()}
                                                ref={(getRef) => this.otp1 = getRef}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                placeholder={""}
                                                maxLength={1}
                                                style={styles.inputView1}
                                                keyboardType={'number-pad'}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues('otp2', value)}
                                                value={otp2}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                ref={(getRef) => this.otp2 = getRef}
                                                onSubmitEditing={() => this.otp3.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                placeholder={""}
                                                maxLength={1}
                                                style={styles.inputView1}
                                                keyboardType={'number-pad'}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues('otp3', value)}
                                                value={otp3}
                                                ref={(getRef) => this.otp3 = getRef}
                                                onSubmitEditing={() => this.otp4.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues('otp4', value)}
                                                value={otp4}
                                                ref={(getRef) => this.otp4 = getRef}
                                                onSubmitEditing={() => this.otp5.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues('otp5', value)}
                                                value={otp5}
                                                ref={(getRef) => this.otp5 = getRef}
                                                onSubmitEditing={() => this.otp6.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => { this.setValues('otp6', value), this.setState({ errors: [] }) }}
                                                value={otp6}
                                                ref={(getRef) => this.otp6 = getRef}
                                                onSubmitEditing={() => { this.validateEmail() }}
                                            // onEndEditing={() => this.validateEmail()}

                                            />

                                        </View>
                                        {
                                            this.state.errors.includes('otp') ?
                                                <Text style={styles.Errortextview}>{this.state.otp6erro}</Text> : null
                                        }
                                        <TouchableOpacity onPress={() => this.onResendbutton()}>
                                            <Text style={styles.Resttext}> Reset OTP</Text>
                                        </TouchableOpacity>

                                    </View>



                                    <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                                        <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.onsubmit()}>
                                            <Text style={[styles.appButtonText]}>Continue</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </ImageBackground>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default OTP;
