import React, { Component } from 'react';
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
import Input from '../../../Component/Textinput';
import images from '../../../Component/Imagepath';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import { NetworkInfo } from "react-native-network-info"
import CustomLoader from '../../../Component/CustomLoader'
import { handleNavigation } from '../../../navigation/Route';
import CommonMethods from '../../../Lib/CommonMethods';
import NetInfo from "@react-native-community/netinfo";
import CryptoJS from "react-native-crypto-js";

class Mpin extends Component {
    constructor(props) {
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
            deviceIp: '',
            errors: [],
            otp6erro: ''
        };
    }

    componentDidMount = () => {
        NetworkInfo.getIPV4Address().then(ipv4Address => {
            console.log("devicekiippp", ipv4Address);
            this.setState({ deviceIp: ipv4Address })
            Helper.deviceIp = ipv4Address
        });

        var key = CryptoJS.enc.Utf8.parse("fd87669889a746f5bf5a70a64f65d323");
        console.log("keyenceee_", key);
        var iv = CryptoJS.enc.Utf8.parse("fd87669889a746f5bf5a70a64f65d323");
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("deviceipppp", rnd);
        var finalvar = "train"+ "|"+ rnd
        console.log("finalllllll_",finalvar);
        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(finalvar), key,
            {
                keySize: 256,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })
        var Encrypted = encryptedlogin.toString()
        console.log("aesencryp128_", Encrypted, Encrypted.length);

    //     // Decrypted
    //     var decrypted = CryptoJS.AES.decrypt(Encrypted, key, {
    //         keySize: 256,
    //         iv: iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     });
    //     console.log('Decrypted : ' + decrypted);
    //     // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8)); 
    //     // return decrypted.toString(CryptoJS.enc.Utf8);
    }


    hideLoader = () => { this.setState({ loaderVisible: false }) }

    showLoader = () => { this.setState({ loaderVisible: true }) }

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

    apicall = async (encyptedval, rnd) => {
        console.log("rendddd", rnd);
        Apicall.ApiMethod(Constant.POST, ApiUrl.MPIN, encyptedval).then((resp) => {
            this.hideLoader()
            console.log("resss_Mpin", resp);

            if (resp) {
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)

                var splitdata = AES128Decry.split("|")
                // console.log("Decrpytedvaue_Mpin", splitdata[0]);

                if (splitdata[0] == 1 && splitdata[1] == rnd) {
                    CommonMethods.showSuccess("Mpin Submitted Successfully")
                    // console.log("MPIN status code is 200");
                    handleNavigation({ type: 'setRoot', page: 'Home', navigation: this.props.navigation })

                }
                else {
                    CommonMethods.showError("MPIN Invalid")
                    this.setState({ otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' })
                    console.log("NMPIN status code is 400");
                }
            }
            else {
                console.log("respfailsssss");
            }

        })
    }

    onsubmit = () => {
        if (this.validateEmail()) {

            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
                    var Mpin = otp1 + otp2 + otp3 + otp4 + otp5 + otp6

                    console.log("success", Mpin);
                    this.showLoader();

                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("deviceipppp", this.state.deviceIp, rnd, Helper.user_token);

                    //encode MD5
                    var passwordmd5 = Helper.MD5Conversion(Mpin)
                    console.log("mdffff", passwordmd5);

                    var updatedmd5 = Helper.MD5Conversion(rnd + passwordmd5)
                    Helper.User_Mpin = updatedmd5.toString()

                    console.log("finalmd5", updatedmd5.toString());

                    var finalvar = Helper.user_token + "|" + Helper.deviceId + "|" + updatedmd5.toString() + "|" + rnd;
                    console.log("NewMpinfinalvar", finalvar)

                    //AES 128 Encryption
                    var AES128Ency = Helper.AES_128_Encryption(finalvar)
                    console.log("NewMpinencrpyted_Result", AES128Ency);

                    // Api Call 
                    this.apicall(AES128Ency, rnd)
                }

                else {
                    this.hideLoader()
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })

        }

    }

    // validateEmail = () => {
    //     const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
    //     var otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    //     if (otp.length != 6) {
    //         CommonMethods.showError("otp field cannot be blank")
    //         console.log("otp field cannot be blank")
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // };
    validateEmail = () => {
        let error = []
        const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;
        var otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
        if (otp.length != 6) {
            error.push('otp')
            this.setState({ otp6erro: 'MPIN field cannot be blank' })
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


    render() {
        const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state;

        return (
            <SafeAreaView style={styles.container} >
                <CustomLoader loaderVisible={this.state.loaderVisible} />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                        <View style={styles.mainview}>
                            <View style={styles.submain}>
                                <View style={styles.headview}>
                                    <View style={{ marginTop: 20, }}>
                                        <Text style={styles.containsubH}> Enter MPIN</Text>
                                    </View>

                                    <View style={{ paddingHorizontal: 12, marginTop: 40, }}>
                                        <Text style={styles.Textview}> Enter MPIN</Text>
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
                                                // onSubmitEditing={() => { null }}
                                                onSubmitEditing={() => { this.validateEmail() }}

                                            />

                                        </View>
                                        {
                                            this.state.errors.includes('otp') ?
                                                <Text style={styles.Errortextview}>{this.state.otp6erro}</Text> : null
                                        }


                                    </View>
                                    <TouchableOpacity onPress={() =>
                                        //  this.props.navigation.navigate('NMpin')
                                        handleNavigation({ type: 'setRoot', page: 'NMpin', navigation: this.props.navigation })
                                    }
                                        style={{ marginHorizontal: 0 }} >
                                        <Text style={styles.Resttext}> Reset MPIN</Text>
                                    </TouchableOpacity>

                                    <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <TouchableOpacity style={styles.appButtonContainer} onPress={() => { this.onsubmit() }}>
                                                <Text style={[styles.appButtonText, { marginHorizontal: 24, }]}>Continue</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.appButtonContainer} onPress={() =>
                                                handleNavigation({ type: 'setRoot', page: 'usersignin', navigation: this.props.navigation })
                                            }>
                                                <Text style={styles.appButtonText}>Change User</Text>
                                            </TouchableOpacity>
                                        </View>
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

export default Mpin;
