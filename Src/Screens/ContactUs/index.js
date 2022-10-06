import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
} from 'react-native';
import BackNavigation from '../../Lib/BackNavigation';
import CryptoJS from "react-native-crypto-js";

import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../Component/Imagepath';
import CommonMethods from '../../Lib/CommonMethods';
import Input from '../../Component/Textinput';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Constant from '../../Component/Constant';
import Helper from '../../Component/Helper';
import ApiUrl from '../../Component/ApiURl';
import Apicall from '../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../Component/Methods';
import CustomLoader from '../../Component/CustomLoader';
import Colors from '../../Component/Color';

const Contact_us = (props) => {
    // console.log("props_paydeatils", props.route.params);
    const navigation = useNavigation();
    const [Deptflag, setDeptflag] = useState(false)
    const [Majorflag, setMajorflag] = useState(false)

    const [loaderVisible, setloaderVisible] = useState(false)

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    useEffect(() => {
        console.log("Profile useeffect call");
        var message = "some_secret_message";
        var key = CryptoJS.enc.Base64.parse("eCu$t0m$iNeTB@n<");
        console.log("keyenceee_", key );
        var iv = CryptoJS.enc.Base64.parse("eCu$t0m$iNeTB@n<");
        console.log("iv__", iv);
        var encryptedlogin = CryptoJS.AES.encrypt(message, key,
            {
                iv: iv,
            })
        var Encrypted = encryptedlogin.toString()

        console.log("aesencryp128", Encrypted);
        var data = CryptoJS.AES.decrypt(Encrypted, key, { iv: iv });
        console.log("decrrrr___",data.toString(CryptoJS.enc.Utf8));

        // var message = "some_secret_message";

        // var key = "6Le0DgMTAAAAANokdEEial"; //length=22
        // var iv = "mHGFxENnZLbienLyANoi.e"; //length=22

        // key = CryptoJS.enc.Base64.parse(key); // length=16 bytes
        // //key is now e8b7b40e031300000000da247441226a5d, length=32 (hex encoded)
        // iv = CryptoJS.enc.Base64.parse(iv); // length=16 bytes
        // //iv is now 987185c4436764b6e27a72f2fffffffd, length=32 (hex encoded)

        // var cipherData = CryptoJS.AES.encrypt(message, key, { iv: iv });

        // var key = "6Le0DgMTAAAAANokdEEial"; //length=22
        // var iv = "mHGFxENnZLbienLyANoi.e123"; //length=25

        // key = CryptoJS.enc.Base64.parse(key); // length = 16 bytes
        // //key is now e8b7b40e031300000000da247441226a5d, length=32 (hex encoded)
        // iv = CryptoJS.enc.Base64.parse(iv); // length = 18 bytes
        // //iv is now 987185c4436764b6e27a72f2fffffffded76, length=36 (hex encoded)

        // var data = CryptoJS.AES.decrypt(cipherData, key, { iv: iv }); //data contains "some_secret_message", so additional "123" in IV is irrelevant.
        // console.log("decrrrr___",data.toString(CryptoJS.enc.Utf8));
        

        //data contains "some_secret_message"
    }, [])

    const onsubmit = () => {
        if (validation()) {
            console.log("success");

            showLoader()
            // random number generate
            var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
            console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

            var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
            console.log("fialvalrof_payee", finalvar);

            // Aes 128 encryption
            var AES128Ency = Helper.AES_128_Encryption(finalvar)
            console.log("Districtencrpyted_Result", AES128Ency);

            // string To bytes conversion
            var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
            console.log("srtingTobytes", stringTobytes);

            // bytes array to base64 conversion 
            var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
            console.log("respp_base64", bytesTobase64)


            // var deptname = PayDetails.Challaninfo?.Ser_Name?.ServiceId
            var deptname = Helper.ServiceName.ServiceId
            var splitcode = deptname.split('|')
            console.log("spitedddddd+", splitcode);

            // var data = splitcode[0] + '|' + PayDetails.Challaninfo?.Dep_Name?.DeptCode
            var data = splitcode[0] + '|' + Helper.DepartName.DeptCode

            console.log("pipline data_", data);


            //Challan api call
            Apicall.MainApiMethod(Constant.POST, ApiUrl.CreateServiceSchemas, bytesTobase64, data).then((resp) => {
                console.log("respppppp", resp.data);
                hideLoader()
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                console.log("aes128dec_Challandetails", AES128Decry);

                var splitdata = AES128Decry.split("|")
                console.log("splitdataresult_", splitdata);
                if (splitdata[0] == rnd) {
                    console.log("resultofapi_____", splitdata[1]);

                    var payeeinfo = {
                        fromdate: fromdate,
                        todate: todate,
                        address: address,
                        city: city,
                        mobile: mobile,
                        pincode: pincode,
                        remark: remark
                    }
                    console.log("payeinfofo", payeeinfo);
                    Helper.Payeinfo = payeeinfo

                    navigation.navigate('HeadDetails', { PayeeDetails: JSON.parse(splitdata[1]), Departname: DepartName, Challan: PayDetails })

                }
                else {
                    console.log("Paydetails status code is 400");
                }

            })
        }
    }


    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.headview}>
                        <View style={{ flexDirection: 'row' }}>
                            <BackNavigation navigation={navigation}
                                MargT={Platform.OS == 'ios' ? 20 : 22}
                                width={30}
                                height={30}
                                MargL={0}
                            />
                            <View style={{ marginTop: 30, flex: 0.8 }}>
                                <Text style={styles.containsubH}>Contact Us</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                                <View style={styles.texthead}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textview}>E Treasury Officer</Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.textview}>0141425599</Text>
                                    </View>
                                </View>
                                <View style={styles.texthead}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textview}>Email Address</Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.textview}>e-to-rj@nic.in</Text>
                                    </View>
                                </View>
                                <View style={styles.texthead}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textview}>Lokesh Sharma (9:30 AM to 6:00 PM) Working Days Only</Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.textview}>9528528555</Text>
                                    </View>
                                </View>
                                <View style={styles.texthead}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textview}>Help Desk</Text>
                                    </View>
                                    <View style={{ flex: 0.4 }}>
                                        <Text style={styles.textview}>0141-2561820</Text>
                                    </View>
                                </View>

                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Contact_us;


// import React, { Component } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

// var selected = [];
// class Contact_us extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: [
//                 { 'appName': "app1" },
//                 { 'appName': "app2" },
//                 { 'appName': "app3" },
//                 { 'appName': "app4" },
//                 { 'appName': "app5" },
//                 { 'appName': "app6" },
//                 { 'appName': "app7" },

//             ],
//             itemChecked: []
//         };
//     }

//     componentDidMount() {
//     }


//     renderSeperator = () => {
//         return (
//             <View
//                 style={{
//                     height: 1,
//                     backgroundColor: '#CED0CE',
//                 }}
//             />
//         );
//     };

//     selectItem = (item) => {
//         console.log("sleecteditemmm__", item);
//         item.isSelect = !item.isSelect;
//         if (item.isSelect) {
//             selected.push(item.appName);
//         } else {
//             for (let i = 0; i < selected.length; i++) {
//                 if (selected[i] === item.appName) {
//                     selected.splice(i, 1)
//                 }
//             }
//         }
//         console.log("itmeselectee++", selected);
//         this.setState({ itemChecked: selected });
//     };

//     renderRow = (item) => {
//         // console.log("renderrow++", item);
//         const isSelected = item.isSelect;
//         const viewStyle = isSelected ? styles.selected : styles.normal;
//         return (
//             <TouchableOpacity
//                 style={viewStyle}
//                 onPress={() => this.selectItem(item)}
//             >
//                 {/* <Image
//                     style={{ width: 51, height: 51, resizeMode: 'contain', flex: 1 }}
//                     source={{ uri: `data:image;base64,${item.icon}` }}
//                 /> */}
//                 <Text style={{ alignSelf: 'center', marginStart: 10, flex: 5 }}>{item.appName}</Text>
//             </TouchableOpacity>
//         );
//     };

//     render() {
//         return (
//             <FlatList
//                 data={this.state.data}
//                 renderItem={({ item }) => this.renderRow(item)}
//                 keyExtractor={(item) => item.appName}
//                 ItemSeparatorComponent={this.renderSeperator}
//                 extraData={this.state}
//             />
//         );
//     }
// }

// const styles = {
//     selected: {
//         flexDirection: 'row',
//         padding: 5,
//         backgroundColor: 'blue'
//     },
//     normal: {
//         flexDirection: 'row',
//         padding: 5
//     }
// }

// export default Contact_us;