import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    BackHandler,
    Platform,
    Alert,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import String from '../../Component/String';
import BackNavigation from '../../Lib/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../Component/Imagepath';
import CommonMethods from '../../Lib/CommonMethods';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import Constant from '../../Component/Constant';
import Helper from '../../Component/Helper';
import ApiUrl from '../../Component/ApiURl';
import Apicall from '../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../Component/Methods';
import CustomLoader from '../../Component/CustomLoader';
import Colors from '../../Component/Color';
import RNFetchBlob from 'rn-fetch-blob';
import { handleNavigation } from '../../navigation/Route';
import NetInfo from "@react-native-community/netinfo";
import DownloadLink from "react-download-link";
import RNShareFile from 'react-native-share-pdf';
import { color } from 'react-native-reanimated';
const View_Challan = (props) => {
    console.log("Paymentreciept__props", props)
    const navigation = useNavigation();
    const [ChallanInfo, setChallanInfo] = useState(props.route.params.Data ? props.route.params.Data : props.route.params)
    const [GRNinfo, setGRNinfo] = useState('')
    const [Headinfo, setHeadinfo] = useState('')




    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }
    const [loaderVisible, setloaderVisible] = useState(false)

    useEffect(() => {
        console.log("propsss", ChallanInfo)

        // if (ChallanInfo.TRANS_STATUS == "P") {
        //     setpaymentstatus("Pending")
        // }
        // else if (ChallanInfo.TRANS_STATUS == "S") {
        //     setpaymentstatus("Success")
        // }
        // else if (ChallanInfo.TRANS_STATUS == "F") {
        //     setpaymentstatus("Fail")
        // }
        GRN_Apicall()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [])

    const GRN_Apicall = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
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


                //Repeat Transaction api call
                Apicall.MainApiMethod(Constant.POST, ApiUrl.ViewGrnDetails, bytesTobase64, JSON.stringify(ChallanInfo)).then((resp) => {
                    console.log("respppppp_grnapicall", resp.data);
                    hideLoader()
                    var response = resp.data

                    //AES 128 Decryption
                    var AES128Decry = Helper.AES_128_Decryption(response)
                    console.log("aes128dec_Repeat_Challan", AES128Decry);

                    var splitdata = AES128Decry.split("|")
                    console.log("splitdataresult_", splitdata);
                    // var splitres = splitdata[1].split('*')
                    if (splitdata[0] == rnd) {
                        var data = JSON.parse(splitdata[1])
                        var headD = JSON.parse(splitdata[2])
                        console.log("givendataa___", data[0], headD)
                        setGRNinfo(data[0])
                        setHeadinfo(headD)
                    }

                })
            }

            else {
                hideLoader()
                console.log("fallllllll")
                CommonMethods.showError("Pleae Check Your Internet Connection!")
            }
        })
    }

    const downloadHistory = async (data) => {
        console.log("rullllll___", data);
        // var RNFetchBlob = require('react-native-fetch-blob').default;

        const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
        let pdfLocation = DocumentDir + '/' + 'test.pdf';
        RNFetchBlob.fs.writeFile(pdfLocation, data, 'base64');
        // // var RNFetchBlob = require('react-native-fetch-blob').default;

        // const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
        // let pdfLocation = DocumentDir + '/' + 'test.pdf';
        // // RNFetchBlob.fs.writeFile(pdfLocation, pdf_base64Str, 'base64');


        // // let binary = await getPdfBinary(url);
        // const base64Str = base64_encode(url);
        // RNFetchBlob.fs.writeFile(pdfLocation, base64Str, 'base64');

        // const { config, fs } = RNFetchBlob;
        // let PictureDir = fs.dirs.PictureDir;
        // let date = new Date();
        // let options = {
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         //Related to the Android only
        //         useDownloadManager: true,
        //         notification: true,
        //         path:
        //             PictureDir +
        //             '/Report_Download' +
        //             Math.floor(date.getTime() + date.getSeconds() / 2),
        //         description: 'Risk Report Download',
        //     },
        // };
        // config(options)
        //     .fetch('GET', url)
        //     .then((res) => {
        //         //Showing alert after successful downloading
        //         console.log('res -> ', JSON.stringify(res));
        //         alert('Report Downloaded Successfully.');
        //     });
    }
    const handleBackButtonClick = () => {
        handleNavigation({ type: 'setRoot', page: 'Home', navigation: navigation })
        return true;
    }

    const onsubmit = (value) => {
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

        //Genreate E-Challan pdf
        Apicall.MainApiMethod(Constant.POST, ApiUrl.GetGRNPDF, bytesTobase64, GRNinfo.GRN).then((resp) => {
            console.log("respppppp", resp.data);
            hideLoader()
            var response = resp.data

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)
            console.log("aes128dec_Challandetails", AES128Decry);

            var splitdata = AES128Decry.split("|")
            console.log("splitdataresult_", splitdata);

            if (splitdata[0] == rnd) {
                var result = splitdata[1]
                console.log("resultof__", result);
                if (result) {
                    if (value == "share") {
                        onsharepdf(result);
                    }
                    else if (value == "download") {
                        onDonwloadpdf(result)
                    }

                }
                else {
                    CommonMethods.showError("Something went wrong! Please try again")
                }
            }

        })
    }

    const onsharepdf = async (base64str) => {
        // var documentFileName = 'E-Challan.pdf'
        var documentFileName = "E-Challan_" + GRNinfo.GRN + ".pdf"
        const showError = await RNShareFile.sharePDF(base64str, documentFileName);
        console.log("ddddddd_", showError)
    }

    const onDonwloadpdf = async (base64str) => {

        // Check for storage permission
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        }
        const dirs = RNFetchBlob.fs.dirs;
        console.log("checkdata aya kya", dirs);

        // set the path for E-Challan file
        var path = dirs.DownloadDir + "/E-Challan_" + GRNinfo.GRN + ".pdf";
        console.log("checkpdf aya kya", path);
        RNFetchBlob.fs.writeFile(path, base64str, 'base64')
            .then((result) => {
                console.log("File has been saved to:" + result)
                Alert.alert(
                    String.AppName,
                    String.Filemessage,
                    [
                        { text: 'ok' },
                    ],
                    { cancelable: false }
                )
            })
            .catch(error => console.log(error));
    }

    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>

                <View style={styles.mainview}>
                    <View style={styles.headview}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <BackNavigation navigation={navigation}
                                MargT={Platform.OS == 'ios' ? 20 : 22}
                                width={30}
                                height={30}
                                MargL={0}
                            />
                            <View style={{ marginTop: 30, flex: 0.8 }}>
                                <Text style={styles.containsubH}> e-Challan</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => { onsubmit("download") }}>
                                    <Image source={images.Download} style={{ height: 30, width: 30, tintColor: Colors.buttonColors }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => { onsubmit("share") }}>
                                    <Image source={images.Share} style={{ height: 25, width: 25, tintColor: Colors.buttonColors }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 0 }}>

                                <View style={[styles.shadowContainerStyle, { margin: 20, }]}>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>GRN:</Text>
                                        <Text style={styles.subtextview}>{GRNinfo ? GRNinfo.GRN : null}</Text>
                                    </View>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>Total Amount:</Text>
                                        <Text style={styles.subtextview}>₹ {GRNinfo ? GRNinfo.TotalAmount : null} </Text>
                                    </View>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>Discount:</Text>
                                        <Text style={styles.subtextview}>₹ {GRNinfo ? GRNinfo.DeductCommission : null} </Text>
                                    </View>

                                </View>
                                <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                    <Text style={styles.Titleview}>Department</Text>
                                </View>
                                <View style={[styles.shadowContainerStyle, {}]}>
                                    <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                        <Text style={styles.textview}>{GRNinfo ? GRNinfo.DeptNameEnglish : null}</Text>
                                        {/* <Text style={styles.subtextview}>{Helper.GrnInfo}</Text> */}
                                    </View>
                                    <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                        <Text style={styles.textview}>{GRNinfo ? GRNinfo.office : null}</Text>
                                        {/* <Text style={styles.subtextview}>₹ </Text> */}
                                    </View>
                                    <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                        <Text style={styles.textview}>{GRNinfo ? GRNinfo.TreasuryName : null}</Text>
                                        {/* <Text style={styles.subtextview}>-</Text> */}
                                    </View>
                                </View>

                                <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                    <Text style={styles.Titleview}>Heads (Particular)</Text>
                                </View>
                                <View style={[styles.shadowContainerStyle, {}]}>

                                    {
                                        Headinfo ?
                                            Headinfo.map((item) => {
                                                console.log("itemvallll___", item)
                                                return (
                                                    <View style={[styles.textlineview, { marginVertical: 5 }]}>
                                                        <Text style={[styles.textview, { flex: 0.6 }]}>{item ? item.SCHEMANAME : null}</Text>
                                                        <Text style={[styles.subtextview, { flex: 0.6 }]}>{item ? item.Amount : null}</Text>
                                                    </View>
                                                )

                                            }) : null

                                    }
                                </View>


                                <View style={[styles.shadowContainerStyle, { margin: 20, }]}>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>Payee:</Text>
                                        <Text style={styles.subtextview}>{GRNinfo ? GRNinfo.FullName : null}</Text>
                                    </View>
                                </View>
                                <View style={[styles.shadowContainerStyle, { margin: 20, marginBottom: 20 }]}>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>Bank Name:</Text>
                                        <Text style={styles.subtextview}>{GRNinfo ? GRNinfo.BankName : null}</Text>
                                    </View>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>CIN:</Text>
                                        <Text style={styles.subtextview}> {GRNinfo ? GRNinfo.CIN : null} </Text>
                                    </View>
                                    <View style={styles.textlineview}>
                                        <Text style={styles.textview}>Ref:</Text>
                                        <Text style={styles.subtextview}> {GRNinfo ? GRNinfo.Ref : null} </Text>
                                    </View>
                                </View>
                            </ScrollView>

                        </KeyboardAvoidingView>
                    </View>
                </View>
                {/* } */}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default View_Challan;