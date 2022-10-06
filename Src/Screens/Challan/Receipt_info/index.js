import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Dimensions,
    BackHandler,
    Alert,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';

import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../../Component/Methods';
import CustomLoader from '../../../Component/CustomLoader';
import Colors from '../../../Component/Color';
import { handleNavigation } from '../../../navigation/Route';
import RNShareFile from 'react-native-share-pdf';
import String from '../../../Component/String';

const PaymentSuccess = (props) => {
    console.log("Paymentreciept__props", props)
    const navigation = useNavigation();
    const [ChallanInfo, setChallanInfo] = useState(props.route.params.Data ? props.route.params.Data : props.route.params)
    const [paymentstatus, setpaymentstatus] = useState('')
    const [webflag, setwebflag] = useState(false)


    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }
    const [loaderVisible, setloaderVisible] = useState(false)
    // let image = "data:application/pdf;base64," + pdf.toString('base64');

    useEffect(() => {
        console.log("propsss", ChallanInfo)
        if (ChallanInfo.Status == "P" && ChallanInfo.Amount != null && ChallanInfo.GRN != null) {
            console.log("inpending");
            setpaymentstatus("Pending")
        }
        else if (ChallanInfo.Status == "S" && ChallanInfo.Amount != null && ChallanInfo.GRN != null) {
            console.log("inSuccess");
            setpaymentstatus("Success")
        }
        else if (ChallanInfo.Status == "F" && ChallanInfo.Amount == null && ChallanInfo.GRN == null) {
            console.log("inFailcase");
            setpaymentstatus("Fail")
        }
        // console.log("pddddffffff___", image);
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, [])

    const downloadHistory = async (data) => {
        console.log("rullllll___", data);
        // var RNFetchBlob = require('react-native-fetch-blob').default;

        // const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
        // let pdfLocation = DocumentDir + '/' + 'test.pdf';
        // RNFetchBlob.fs.writeFile(pdfLocation, data, 'base64');
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

    // const onsubmit = () => {
    //     console.log("success");

    //     showLoader()
    //     // random number generate
    //     var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
    //     console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

    //     var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
    //     console.log("fialvalrof_payee", finalvar);

    //     // Aes 128 encryption
    //     var AES128Ency = Helper.AES_128_Encryption(finalvar)
    //     console.log("Districtencrpyted_Result", AES128Ency);

    //     // string To bytes conversion
    //     var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
    //     console.log("srtingTobytes", stringTobytes);

    //     // bytes array to base64 conversion 
    //     var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
    //     console.log("respp_base64", bytesTobase64)

    //     //Genreate Challan Receipt api call
    //     Apicall.MainApiMethod(Constant.POST, ApiUrl.GetGRNPDF, bytesTobase64, Helper.GrnInfo).then((resp) => {
    //         console.log("respppppp", resp.data);
    //         hideLoader()
    //         var response = resp.data

    //         //AES 128 Decryption
    //         var AES128Decry = Helper.AES_128_Decryption(response)
    //         console.log("aes128dec_Challandetails", AES128Decry);

    //         var splitdata = AES128Decry.split("|")
    //         console.log("splitdataresult_", splitdata);



    //         var dtt = "data:application/pdf;base64"
    //         var source = { uri: dtt + "," + splitdata[1] }
    //         // var source = dtt + "," + splitdata[1]

    //         console.log("ressss__", source);

    //         setBudgetflag(source)



    //         //Function to check the platform
    //         //If iOS the start downloading
    //         //If Android then ask for runtime permission
    //         if (Platform.OS === 'ios') {
    //             downloadHistory();
    //         } else {
    //             try {
    //                 PermissionsAndroid.request(
    //                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                     {
    //                         title: 'storage title',
    //                         message: 'storage_permission',
    //                     },
    //                 ).then(granted => {
    //                     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                         //Once user grant the permission start downloading
    //                         console.log('Storage Permission Granted.');
    //                         downloadHistory(splitdata[1]);
    //                     } else {
    //                         //If permission denied then show alert 'Storage Permission 
    //                         Alert.alert('storage_permission');
    //                     }
    //                 });
    //             } catch (err) {
    //                 //To handle permission related issue
    //                 console.log('error', err);
    //             }
    //         }



    //         if (splitdata[0] == rnd) {
    //             //AES 128 Decryption
    //             var AES128Decry = Helper.AES_128_Decryption(splitdata[1])
    //             console.log("aes128dec_Challandetails", AES128Decry);
    //             navigation.navigate('ProfileList')
    //             setclearflag(true)
    //         }
    //         else {
    //             console.log("Profile not created");
    //             // CommonMethods.error("Profile Not Created")

    //         }

    //     })
    // }
    const onsubmit = () => {
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
        Apicall.MainApiMethod(Constant.POST, ApiUrl.GetGRNPDF, bytesTobase64, ChallanInfo.GRN).then((resp) => {
            console.log("respppppp", resp.data);
            hideLoader()
            var response = resp.data
            if (response) {

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                console.log("aes128dec_Challandetails", AES128Decry);

                var splitdata = AES128Decry.split("|")
                console.log("splitdataresult_", splitdata);

                if (splitdata[0] == rnd) {
                    var result = splitdata[1]
                    console.log("resultof__", result);
                    if (result) {
                        onsharepdf(result);
                    }
                    else {
                        CommonMethods.showError("Something went wrong! Please try again")
                    }
                }
            }
            else {
                CommonMethods.showError("Something went wrong! Please try again")

            }

        })
    }

    // const onsharepdf = async (base64str) => {

    //     var documentFileName = 'E-Challan.pdf'
    //     const showError = await RNShareFile.sharePDF(base64str, documentFileName);
    //     console.log("ddddddd_", showError)
    // }

    const onsharepdf = async (base64str) => {

        // Check for storage permission
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        }
        const dirs = RNFetchBlob.fs.dirs;
        console.log("checkdata aya kya", dirs);

        // set the path for E-Challan file
        var path = dirs.DownloadDir + "/E-Challan_" + ChallanInfo.GRN + ".pdf";
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
                        <TouchableOpacity onPress={() => {
                            handleNavigation({ type: 'setRoot', page: 'Home', navigation: navigation })
                        }} style={{ paddingHorizontal: 20, marginTop: Platform.OS == 'ios' ? 20 : 22, justifyContent: 'center' }}>
                            {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ paddingHorizontal: 20, marginTop: Platform.OS == 'ios' ? 20 : 22, justifyContent: 'center' }}> */}
                            <Image resizeMode='contain' style={{ width: 35, height: 35, tintColor: Colors.buttonColors }} source={images.BackIcon} />
                        </TouchableOpacity >

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>

                            {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}> */}
                            <View style={[styles.shawdow, { marginHorizontal: 0, }]}>
                                <View style={{ marginVertical: 10, marginHorizontal: 50 }}>
                                    <Text style={{ flex: 0, textAlign: 'center', color: Colors.buttonColors }}>GRN: {ChallanInfo ? ChallanInfo.GRN : null}</Text>

                                </View>
                                <View style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        paymentstatus == "Pending" ?
                                            <Image source={images.Pending} style={{ height: 50, width: 50, tintColor: "#f0e4a1" }} resizeMode='cover' />
                                            :
                                            paymentstatus == "Success" ?
                                                <Image source={images.success} style={{ height: 50, width: 50, tintColor: "green" }} />
                                                : paymentstatus == "Fail" ?
                                                    <Image source={images.Fail} style={{ height: 50, width: 50, tintColor: "red" }} />
                                                    : null
                                    }
                                    <View>
                                        <Text style={styles.Headtextview}>{paymentstatus}</Text>
                                    </View>

                                </View>
                                <View>
                                    <Text style={[styles.Headtextview, { fontSize: 25, fontWeight: 'bold', color: 'black' }]}>RS. {ChallanInfo ? ChallanInfo.Amount : null}</Text>
                                </View>
                                {/* <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}> */}
                                {
                                    paymentstatus == "Success" ?
                                        <TouchableOpacity onPress={() => onsubmit()} style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={images.Download} style={{ height: 40, width: 40, tintColor: Colors.buttonColors }} />
                                        </TouchableOpacity>
                                        : null
                                }

                            </View>





                            {/* </ScrollView> */}
                        </KeyboardAvoidingView>
                    </View>
                </View>
                {/* } */}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PaymentSuccess;