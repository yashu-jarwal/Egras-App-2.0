import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    Dimensions,
    Keyboard,
    View,
} from 'react-native';
import styles from './styles'
import Input from '../../../Component/Textinput';
import images from '../../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import Constant from '../../../Component/Constant';
import { handleNavigation } from '../../../navigation/Route';
import CommonMethods from '../../../Lib/CommonMethods';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import { NetworkInfo } from "react-native-network-info"
import CustomLoader from '../../../Component/CustomLoader'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
import NetInfo from "@react-native-community/netinfo";

class NMpin extends Component {
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
            otp21: '',
            otp22: '',
            otp23: '',
            otp24: '',
            otp25: '',
            otp26: '',
            deviceIp: '',
            errors: [],
            otp6error: '',
            otp26error: '',
        };
    }

    componentDidMount = () => {
        NetworkInfo.getIPAddress().then(ipAddress => {
            // console.log("devicekiippp", ipAddress);
            this.setState({ deviceIp: ipAddress })
            // console.log("devicetoken", Helper.user_token);
        });

    }
    hideLoader = () => { this.setState({ loaderVisible: false }) }
    showLoader = () => { this.setState({ loaderVisible: true }) }

    apicall = async (encyptedval, rnd) => {
        console.log("rendddd", rnd);
        Apicall.ApiMethod(Constant.POST, ApiUrl.NMPIN, encyptedval).then((resp) => {
            this.hideLoader()
            console.log("resss_NMpin", resp.data);
            var response = resp.data

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)

            var splitdata = AES128Decry.split("|")
            console.log("Decrpytedvaue", splitdata[0]);

            if (splitdata[0] == Constant.SUCCESS && splitdata[1] == rnd) {
                CommonMethods.showSuccess("New Mpin Created Successfully")
                console.log("NMPIN status code is 200");
                // this.props.navigation.navigate('Mpin')
                handleNavigation({ type: 'setRoot', page: 'Mpin', navigation: this.props.navigation })

            }
            else {
                CommonMethods.showError("Something went wrong! Please try again")
                console.log("NMPIN status code is 400");
            }
        })
    }

    onsubmit = () => {
        if (this.onsubmitvalidate()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("success");
                    this.showLoader();
                    const { otp1, otp2, otp3, otp4, otp5, otp6, deviceIp } = this.state;

                    var NMpin = otp1 + otp2 + otp3 + otp4 + otp5 + otp6

                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("deviceipppp", deviceIp, rnd);

                    //encode MD5
                    var passwordmd5 = Helper.MD5Conversion(NMpin)
                    console.log("NMpinmd5", passwordmd5);

                    var finalvar = Helper.user_token + "|" + Helper.deviceId + "|" + deviceIp + "|" + passwordmd5.toString() + "|" + rnd;
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

    onsubmitvalidate = () => {
        let error = []
        const { otp1, otp2, otp3, otp4, otp5, otp6, otp21, otp22, otp23, otp24, otp25, otp26 } = this.state;

        var otpfirst = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
        console.log("resslllssssss", otpfirst.length);
        var otpsecond = otp21 + otp22 + otp23 + otp24 + otp25 + otp26

        if (otpfirst.length != 6) {
            error.push('otp')
            this.setState({ otp6error: 'NMPIN field cannot be blank' })
            console.log("otp field cannot be blank")
        }
        if (otpsecond.length != 6) {
            error.push('Confirmotp')
            this.setState({ otp26error: 'Confirm NMPIN field cannot be blank' })
            console.log("Confirm otp field cannot be blank")
        }
        if (otpfirst != otpsecond) {
            error.push('Confirmotp')
            this.setState({ otp26error: 'Confirm NMPIN not match' })
            console.log("Confirm otp not match")
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
    };    //     const { otp1, otp2, otp3, otp4, otp5, otp6, otp21, otp22, otp23, otp24, otp25, otp26 } = this.state;

    //     var otpfirst = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    //     console.log("resslllssssss", otpfirst.length);
    //     var otpsecond = otp21 + otp22 + otp23 + otp24 + otp25 + otp26

    //     if (otpfirst.length != 6) {
    //         CommonMethods.showError("otp field cannot be blank")
    //         console.log("otp field cannot be blank")
    //         return false
    //     }
    //     else if (otpsecond.length != 6) {
    //         CommonMethods.showError("Confirm otp field cannot be blank")
    //         console.log("Confirm otp field cannot be blank")
    //         return false
    //     }
    //     else if (otpfirst != otpsecond) {
    //         CommonMethods.showError("Confirm otp not match")
    //         console.log("Confirm otp not match")
    //         return false
    //     }
    //     else {
    //         return true
    //     }
    // };
    validateEmail = () => {
        let error = []
        const { otp1, otp2, otp3, otp4, otp5, otp6, otp21, otp22, otp23, otp24, otp25, otp26 } = this.state;

        var otpfirst = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
        console.log("resslllssssss", otpfirst.length);
        var otpsecond = otp21 + otp22 + otp23 + otp24 + otp25 + otp26

        if (otpfirst.length != 6) {
            error.push('otp')
            this.setState({ otp6error: 'NMPIN field cannot be blank' })
            console.log("otp field cannot be blank")
        }
        else if (otpsecond.length != 6) {
            error.push('Confirmotp')
            this.setState({ otp26error: 'Confirm NMPIN field cannot be blank' })
            console.log("Confirm otp field cannot be blank")
        }
        else if (otpfirst != otpsecond) {
            error.push('Confirmotp')
            this.setState({ otp26error: 'Confirm NMPIN not match' })
            console.log("Confirm otp not match")
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
    setValues = (key, value) => {
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

    setValues1 = (key, value) => {
        this.setState({ [key]: value.replace(/[^0-9]/g, '') }, () => {
            if (value) {
                switch (key) {
                    case 'otp21':
                        this.otp22.focus();
                        break;
                    case 'otp22':
                        this.otp23.focus();
                        break;
                    case 'otp23':
                        this.otp24.focus();
                        break;
                    case 'otp24':
                        this.otp25.focus();
                        break;
                    case 'otp25':
                        this.otp26.focus();
                        break;
                    case 'otp26':
                        break;
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'otp26':
                        this.otp25.focus();
                        break;
                    case 'otp26':
                        this.otp25.focus();
                        break;
                    case 'otp25':
                        this.otp24.focus();
                        break;
                    case 'otp24':
                        this.otp23.focus();
                        break;
                    case 'otp23':
                        this.otp22.focus();
                        break;
                    case 'otp22':
                        this.otp21.focus();
                        break;
                    default:
                        break;
                }
            }
        })
    }
    render() {
        const { otp1, otp2, otp3, otp4, otp5, otp6, otp21, otp22, otp23, otp24, otp25, otp26, loaderVisible } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <CustomLoader loaderVisible={loaderVisible} />

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                        <View style={styles.mainview}>
                            <View style={styles.submain}>
                                <View style={styles.headview}>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.containsubH}> Create New MPIN</Text>
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
                                                onSubmitEditing={() => { this.validateEmail() }}


                                            />

                                        </View>
                                        {
                                            this.state.errors.includes('otp') ?
                                                <Text style={styles.Errortextview}>{this.state.otp6error}</Text> : null
                                        }

                                    </View>

                                    <View style={{ paddingHorizontal: 12, marginTop: 5, }}>
                                        <Text style={styles.Textview}> Confirm MPIN</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                returnKeyType="next"
                                                style={styles.inputView1}
                                                placeholder={""}
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                blurOnSubmit={false}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                onChangeText={(value) => this.setValues1('otp21', value)}
                                                value={otp21}
                                                onSubmitEditing={() => this.otp22.focus()}
                                                ref={(getRef) => this.otp21 = getRef}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                placeholder={""}
                                                maxLength={1}
                                                style={styles.inputView1}
                                                keyboardType={'number-pad'}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues1('otp22', value)}
                                                value={otp22}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                ref={(getRef) => this.otp22 = getRef}
                                                onSubmitEditing={() => this.otp23.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                placeholder={""}
                                                maxLength={1}
                                                style={styles.inputView1}
                                                keyboardType={'number-pad'}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues1('otp23', value)}
                                                value={otp23}
                                                ref={(getRef) => this.otp23 = getRef}
                                                onSubmitEditing={() => this.otp24.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                // placeholderTextColor={Colors.inputplaceholder}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues1('otp24', value)}
                                                value={otp24}
                                                ref={(getRef) => this.otp24 = getRef}
                                                onSubmitEditing={() => this.otp25.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => this.setValues1('otp25', value)}
                                                value={otp25}
                                                ref={(getRef) => this.otp25 = getRef}
                                                onSubmitEditing={() => this.otp26.focus()}
                                            />
                                            <TextInput
                                                returnKeyType="next"
                                                maxLength={1}
                                                keyboardType={'number-pad'}
                                                placeholder={""}
                                                style={styles.inputView1}
                                                blurOnSubmit={false}
                                                onChangeText={(value) => { this.setValues1('otp26', value), this.setState({ errors: [] }) }}
                                                value={otp26}
                                                ref={(getRef) => this.otp26 = getRef}
                                                onSubmitEditing={() => { this.validateEmail() }}
                                            />

                                        </View>
                                        {
                                            this.state.errors.includes('Confirmotp') ?
                                                <Text style={styles.Errortextview}>{this.state.otp26error}</Text> : null
                                        }
                                    </View>


                                    <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <TouchableOpacity style={styles.appButtonContainer} onPress={() => this.onsubmit()}>
                                                <Text style={[styles.appButtonText, { marginHorizontal: 24, }]}>Continue</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.appButtonContainer}
                                                onPress={() =>
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

export default NMpin;
