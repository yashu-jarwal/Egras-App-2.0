import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    KeyboardAvoidingView,
    FlatList,
    BackHandler,
    Modal,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions,
    View,
} from 'react-native';
import BackNavigation from '../../../Lib/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Colors from '../../../Component/Color';
import Input from '../../../Component/Textinput';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../../Component/Methods';
import CustomLoader from '../../../Component/CustomLoader';
import moment from 'moment';
import CryptoJS from "react-native-crypto-js";
import { WebView } from 'react-native-webview';
import String from '../../../Component/String';
import { handleNavigation } from '../../../navigation/Route';
import NetInfo from "@react-native-community/netinfo";

const Paymode = (props) => {
    console.log("propsofpaymode___", props.route.params);
    const navigation = useNavigation();
    const [Upicheck, setUpicheck] = useState(false)
    const [NetBcheck, setNetBcheck] = useState(false)
    const [Debitcheck, setDebitcheck] = useState(false)
    const [ChallanInfo, setChallanInfo] = useState(props.route.params)
    const [Upimode, setUpimode] = useState({ Phonepay: false, GooglePay: false, Paytm: false, BHIMUpi: false })
    const [payoption, setpayoption] = useState(0)
    const [Card, setCard] = useState('')
    const [Valid, setValid] = useState('')
    const [Cvv, setCvv] = useState('')
    const [Bankselect, setBankselect] = useState(false)
    const [webflag, setwebview] = useState(false)
    const [loaderVisible, setloaderVisible] = useState(false)
    const [bankselect, setbankselect] = useState('')
    const [WebBody, setWebBody] = useState('')
    const [flag, setflag] = useState(false)
    const [upiverify, setupiverify] = useState(false)
    const [DepartName, setDepartmentName] = useState('')
    const [paymentMode, setpaymode] = useState('N')
    const [modalVisible, setModalVisible] = useState(false)
    const [upiinput, setupiinput] = useState('')
    const [BankImg, setBankImg] = useState([
        { "BankImage": images.Bob, "BSRCode": "0200113", },
        { "BankImage": images.Boi, "BSRCode": "0220123" },
        { "BankImage": images.Canara, "BSRCode": "0240539" },
        { "BankImage": images.Ov, "BSRCode": "121211 " }, //need change
        { "BankImage": images.Idbi, "BSRCode": "6910213" },
        { "BankImage": images.Obc, "BSRCode": "0361193" },
        { "BankImage": images.Paytm, "BSRCode": "9930001" },
        { "BankImage": images.Pnb, "BSRCode": "9920001" },
        { "BankImage": images.Pnb_Gatway, "BSRCode": "9910001", },
        { "BankImage": images.Pnb, "BSRCode": "0304017" },
        { "BankImage": images.SbiePay, "BSRCode": "1000132" },
        { "BankImage": images.Sbi, "BSRCode": "0006326" },
        { "BankImage": images.Test, "BSRCode": "0171051" },
        { "BankImage": images.Ubi, "BSRCode": "0292861" }])


    const hideLoader = () => { setloaderVisible(false) }
    const [errors, seterrors] = useState([])
    const [upierror, setupierror] = useState('')

    const showLoader = () => { setloaderVisible(true) }
    const [NetBank, setNetBank] = useState()
    const [payBank, setpayBank] = useState()
    let error = []
    const [bankclick, setclick] = useState('')
    useEffect(() => {
        // console.log("Paymode useeffect call", Helper.Payeinfo);
        console.log("previeousss_______", ChallanInfo);
        if (Helper.DepartName) {
            // var deptname = PayDetails.Challaninfo?.Dep_Name?.deptnameEnglish
            var deptname = Helper.DepartName
            setDepartmentName(deptname[1])
        }
        if (webflag) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            };
        }
    }, [webflag])

    const GetBankList = () => {
        // showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("fialvalrof_payee", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Districtencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        //BankDetails api call
        Apicall.MainApiMethod(Constant.GET, ApiUrl.BankDetails, bytesTobase64).then((resp) => {
            // console.log("respppppp", resp.data);
            hideLoader()
            var response = resp.data.GetOnlineBanksListResult

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)
            // console.log("aes128dec_Challandetails", AES128Decry);

            var splitdata = AES128Decry.split("|")
            console.log("Banklistttt___________", splitdata);
            if (splitdata[0] == rnd) {
                console.log("resultofapi_____", JSON.parse(splitdata[1]));
                // setBank(
                var finalvarr = JSON.parse(splitdata[1]).map((itemv) => {
                    // console.log("filteeditii__________", itemv);

                    BankImg.map((value) => {
                        // console.log("imageeee__bakkk", value)
                        if (itemv.BSRCode === value.BSRCode) {
                            itemv.img = value.BankImage
                        }
                        return value;
                    })
                    return itemv

                })

                var Netbankingfilter = finalvarr.filter((item) => {
                    return item.access == "Y"
                })
                var Gatwayfilter = finalvarr.filter((item) => {
                    console.log("itemvalueeeee_", item);
                    if (item.BSRCode == "9930001") {
                        return item
                    }
                    if (item.access == 'Z') {
                        return item
                    }
                })
                setNetBank(Netbankingfilter)
                setpayBank(Gatwayfilter)
                console.log("netbanking bankklistttt__", Netbankingfilter, Gatwayfilter)
            }
            else {
                console.log("Paydetails status code is 400");
            }

        })
    }

    const handleBackButtonClick = () => {
        handleNavigation({ type: 'setRoot', page: 'Home', navigation: navigation })
        return true;
    }

    // const onsubmit = () => {
    //     // if (validation()) {
    //         console.log("success");
    //         if (Upicheck) {
    //             setpayoption(1)
    //         }
    //         else if (NetBcheck) {
    //             // setpayoption(2)\
    //             setModalVisible(true)
    //             // Bank Details
    //             GetBankList()
    //         }
    //         else if (Debitcheck) {
    //             setpayoption(3)
    //         }
    //     // }
    // }
    // const Banksumbit = () => {
    //     if (bankselect) {
    //         console.log("succcess", bankselect);
    //         // showLoader()
    //         // random number generate
    //         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
    //         console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

    //         var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
    //         console.log("valuebeforencrpy", finalvar);

    //         // Aes 128 encryption
    //         var AES128Ency = Helper.AES_128_Encryption(finalvar)
    //         console.log("Challanencrpyted_Result", AES128Ency);

    //         // string To bytes conversion
    //         var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
    //         console.log("srtingTobytes", stringTobytes);

    //         // bytes array to base64 conversion 
    //         var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
    //         console.log("respp_base64", bytesTobase64)
    //         console.log("helperpreff____", Helper.DepartName, Helper.ServiceName);
    //         // console.log("porpss");
    //         var Profile_id = 0
    //         var serviceid = 0
    //         var GRn_info = 0

    //         if (Helper.ProfileChallan) {
    //             Profile_id = Helper.ServiceName
    //             console.log("profiileid_check", Profile_id);
    //         }
    //         else if (Helper.IsRepeatChallan) {
    //             GRn_info = Helper.GrnInfo.GRN
    //             console.log("inrepeat_case grn", GRn_info);
    //         }
    //         else {
    //             var serviceinfo = Helper.ServiceName.ServiceId.split('|')
    //             serviceid = serviceinfo[0]
    //             console.log("inservicecheck__", serviceinfo, serviceid);
    //         }



    //         var data = ChallanInfo.Newchallaninfo
    //         var obj = {
    //             ProfileId: Profile_id,
    //             ServiceId: serviceid,
    //             OfficeCode: data.Challan.Office.officeid,
    //             TreasuryCode: data.Challan.Treasury.TreasuryCode,
    //             FromDate: Helper.Payeinfo.fromdate,
    //             ToDate: Helper.Payeinfo.todate,
    //             FullName: Helper.userProfile,
    //             Address: Helper.Payeinfo.address,
    //             City: Helper.Payeinfo.city,
    //             MobileNumber: Helper.Payeinfo.mobile,
    //             PANNumber: Helper.PanNumber,
    //             PinCode: Helper.Payeinfo.pincode,
    //             Remarks: Helper.Payeinfo.remark,
    //             TIN: Helper.VehicleNumber ? Helper.VehicleNumber : '',
    //             BankCode: bankselect.BSRCode,
    //             DivCode: 0,
    //             GRNSchema: ChallanInfo.GRNSchema,
    //             GRN: GRn_info,
    //             TotalAmount: ChallanInfo.TotalAmt,
    //             IPAddress: Helper.deviceIp,
    //             DeviceId: Helper.deviceId,
    //             DeductCommission: Helper.DiscountAmt ? Helper.DiscountAmt : 0,
    //             DeptCode: Helper.DepartName[0]
    //         }
    //         console.log("objectvaluuu__________", JSON.stringify(obj));

    //         // Aes 128 encryption
    //         var AES128Ency = Helper.AES_128_Encryption(JSON.stringify(obj))
    //         console.log("Challanencrpyted_Result", AES128Ency);

    //         // Createnew Challan api call
    //         Apicall.MainApiMethod(Constant.POST, ApiUrl.CreateNewChallan, bytesTobase64, AES128Ency).then((resp) => {
    //             console.log("respppppp", resp.data);
    //             hideLoader()
    //             if (resp.data) {
    //                 // console.log("ressp_Department list", resp.data);
    //                 var response = resp.data

    //                 //AES 128 Decryption
    //                 var AES128Decry = Helper.AES_128_Decryption(response)
    //                 console.log("aes128dec_userdetails", AES128Decry);

    //                 var splitdata = AES128Decry.split("|")

    //                 if (splitdata[0] == rnd) {
    //                     console.log(" Department status code is 200");
    //                     var result = splitdata[1]
    //                     console.log("resultof__", splitdata[1]);
    //                     if (result != -1) {
    //                         CommonMethods.showSuccess('Your GRN number is successfully genrated : ' + splitdata[1])
    //                         setWebBody(splitdata[1])
    //                     }
    //                     else {
    //                         CommonMethods.showSuccess('Something went wrong! GRN not genrated : ' + splitdata[1])
    //                     }


    //                     var postdata = "GRN=" + splitdata[1] + "&UserID=" + Helper.user_token
    //                     console.log("postdateeee__", postdata);
    //                     setwebview(true)

    //                 }
    //                 else {
    //                     console.log("Department status code is 400");
    //                 }
    //             }
    //             else {
    //                 console.log("resopnse fails", resp);
    //             }

    //         })
    //     }
    //     else {
    //         CommonMethods.showError("Please select Bank")
    //     }

    // }

    const onsubmit = () => {
        console.log("success");
        if (Upicheck) {
            // setpayoption(1)


        }
        else if (NetBcheck) {
            // setpayoption(2)\
            setModalVisible(true)
            // Bank Details
            GetBankList()
        }
        else if (Debitcheck) {
            setpayoption(3)
        }
    }

    const Banksumbit = (bankcode) => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                // showLoader()
                // random number generate
                var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                console.log("valuebeforencrpy", finalvar);

                // Aes 128 encryption
                var AES128Ency = Helper.AES_128_Encryption(finalvar)
                console.log("Challanencrpyted_Result", AES128Ency);

                // string To bytes conversion
                var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                console.log("srtingTobytes", stringTobytes);

                // bytes array to base64 conversion 
                var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                console.log("respp_base64", bytesTobase64)
                console.log("helperpreff____", Helper.DepartName, Helper.ServiceName, bankcode);
                // console.log("porpss");

                var data = Helper.GrnInfo + '|' + ChallanInfo.TotalAmt + '|' + bankcode + '|' + paymentMode
                console.log("data___value", data)

                // Aes 128 encryption
                var AES128Ency = Helper.AES_128_Encryption(data)
                console.log("Challanencrpyted_Result", AES128Ency);
                setWebBody(Helper.GrnInfo)

                // Bank submit api call
                Apicall.MainApiMethod(Constant.POST, ApiUrl.BankSubmit, bytesTobase64, AES128Ency).then((resp) => {
                    console.log("respppppp", resp.data);
                    hideLoader()
                    if (resp.data) {
                        // console.log("ressp_Department list", resp.data);
                        var response = resp.data

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_userdetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")
                        console.log("splitdatatt__", splitdata);

                        if (splitdata[0] == rnd) {
                            console.log("upicode");
                            var result = splitdata[1]
                            console.log("resultof__", splitdata[1]);
                            if (result == 1) {

                                var postdata = "GRN=" + Helper.GrnInfo + "&UserID=" + Helper.user_token
                                console.log("postdateeee__", postdata);
                                setModalVisible(false)
                                if (paymentMode == 'UPI') {
                                    console.log("upi success")
                                    UpiSubmit(bankcode)
                                }
                                else {
                                    console.log("inelseneeeeeeeeeeeee")
                                    setwebview(true)
                                }

                            }
                            else {
                                OnModal_cloose()
                                CommonMethods.showSuccess('Something went wrong!')
                            }
                        }
                        else {
                            console.log("Department status code is 400");
                        }
                    }
                    else {
                        console.log("resopnse fails", resp);
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
    const validation = () => {
        //  var regs =[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}
        let regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z.]{3,64}}?$/;

        // console.log("reutrnv", Upicheck, NetBcheck, Debitcheck);
        // if (Upicheck || NetBcheck || Debitcheck == true) {
        //     return true;
        // }
        if (regex.test(upiinput) == '') {
            error = []
            error.push('Upi')
            setupierror("Upi Format Not Valid")
            console.log("Upi Format Not Valid")
        }
        else if (upiinput.startsWith("0") === true) {
            // error = []
            error.push('Upi')
            setupierror("Upi Not Start With 0")
            console.log("Upi Not Start With 0")
        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            return true
        }
    }

    const UpiSubmit = (bankcode) => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                showLoader()
                var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                console.log("valuebeforencrpy", finalvar);

                // Aes 128 encryption
                var AES128Ency = Helper.AES_128_Encryption(finalvar)
                console.log("Challanencrpyted_Result", AES128Ency);

                // string To bytes conversion
                var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                console.log("srtingTobytes", stringTobytes);

                // bytes array to base64 conversion 
                var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                console.log("respp_base64", bytesTobase64)

                var data = ChallanInfo
                console.log("valueeee____", data)
                var obj = {
                    GRNSchema: data.GRNSchema,
                    GRN: Helper.GrnInfo,
                    UPIID: upiinput,
                    // TotalAmount: ChallanInfo.TotalAmt,
                    TotalAmount: data.TotalAmt,
                    BankCode: bankcode
                }
                console.log("objectvaluuu__________", JSON.stringify(obj));

                // // Aes 128 encryption
                var AES128Ency = Helper.AES_128_Encryption(JSON.stringify(obj))
                console.log("Challanencrpyted_Result", AES128Ency);

                // submit upi payment api call
                Apicall.MainApiMethod(Constant.POST, ApiUrl.Upiverify, bytesTobase64, AES128Ency).then((resp) => {
                    console.log("respppppp", resp.data);
                    hideLoader()
                    if (resp.data) {
                        console.log("ressp_apildata", resp.data);
                        var response = resp.data

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_userdetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")
                        console.log("spliiiiiitdata__", splitdata)
                        var StatusData = JSON.parse(splitdata[1])
                        console.log("statusdatateeee________________________", StatusData, StatusData.Status);
                        // var arrayhead = []
                        // // for (var i = 1; i <= splitdata.length - 1; i++) {
                        // //     var splitdata2 = splitdata[i].split("=")
                        // //     console.log("finalspplittt", splitdata2)
                        // //     arrayhead.push(splitdata2)
                        // // }
                        // console.log("fffffff__", arrayhead)
                        // var newarray = arrayhead.reduce(function (prev, curr) { prev[curr[0]] = curr[1]; return prev; }, {})
                        // console.log("newwarrrrrr__", newarray)

                        setModalVisible(false)
                        setUpicheck(false)
                        setNetBcheck(false)
                        setDebitcheck(false)
                        setupiverify(false)
                        if (splitdata[0] == rnd) {
                            console.log(" Department status code is 200");
                            // var result = splitdata[1]
                            // console.log("resultof__", splitdata[1]);
                            if (StatusData.Status != "Error") {

                                console.log("infilooop");
                                CommonMethods.showSuccess('Transaction is Submitted Successfully')
                                navigation.navigate('PaymentSuccess', { Data: StatusData })
                            }
                            else {
                                console.log("iniellssl");
                                onbuttonpress()
                            }

                        }
                        else {
                            console.log("Department status code is 400");
                        }
                    }
                    else {
                        console.log("resopnse fails", resp);
                        setModalVisible(false)
                        setUpicheck(false)
                        setNetBcheck(false)
                        setDebitcheck(false)
                        setupiverify(false)
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

    const UpiVerfiy = () => {
        if (validation()) {
            Banksumbit(9930001)
        }
    }

    // const paymode = (val) => {
    //     console.log("valueof", val);
    //     if (val == 0) {
    //         setUpicheck(!Upicheck)
    //         setNetBcheck(false)
    //         setDebitcheck(false)
    //         onsubmit()
    //     }
    //     else if (val == 1) {
    //         setNetBcheck(!NetBcheck)
    //         setUpicheck(false)
    //         setDebitcheck(false)
    //         onsubmit()
    //     }
    //     else if (val == 2) {
    //         setDebitcheck(!Debitcheck)
    //         setUpicheck(false)
    //         setNetBcheck(false)
    //         onsubmit()
    //     }

    // }
    const paymode = (val) => {
        console.log("valueof", val);
        if (val == 0) {
            setUpicheck(!Upicheck)
            setNetBcheck(false)
            setDebitcheck(false)
            setModalVisible(true)
            setupiverify(true)
            setpaymode("UPI")
        }
        else if (val == 1) {
            setNetBcheck(!NetBcheck)
            setUpicheck(false)
            setDebitcheck(false)
            setModalVisible(true)
            setpaymode("N")

            // Bank Details
            GetBankList()
        }
        else if (val == 2) {
            setDebitcheck(!Debitcheck)
            setUpicheck(false)
            setNetBcheck(false)
            setModalVisible(true)
            setpaymode("N")

            // Bank Details
            GetBankList()
        }

    }

    const UpiPayMode = (val) => {
        console.log("upimodeval", val);
        if (val == 0) {
            setUpimode({ Phonepay: !Upimode.Phonepay, GooglePay: false, Paytm: false, BHIMUpi: false })
        }
        else if (val == 1) {
            setUpimode({ Phonepay: false, GooglePay: false, Paytm: !Upimode.Paytm, BHIMUpi: false })
        }
        else if (val == 2) {
            setUpimode({ Phonepay: false, GooglePay: !Upimode.GooglePay, Paytm: false, BHIMUpi: false })
        }
        else if (val == 3) {
            setUpimode({ Phonepay: false, GooglePay: false, Paytm: false, BHIMUpi: !Upimode.BHIMUpi })
        }

    }

    const renderitem = ({ item, index }) => {
        // console.log("rendddd__________t", item);
        return (
            <View style={styles.flatview}>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: index === bankclick ? Colors.appcolor : Colors.white, borderWidth: 1, borderColor: Colors.buttonColors, marginVertical: 5, borderRadius: 10 }} onPress={() => { onbankselect(item, index) }}>
                    <View style={{}}>
                        <Image resizeMode='contain' style={{ left: 10, height: 25, width: 25, borderRadius: 300 }} source={item.img} />
                    </View>

                    <Text style={{ fontSize: 13, marginLeft: 20, color: index === bankclick ? Colors.white : Colors.black, }}> {item.BankName} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const onbankselect = (item, idx) => {
        setclick(idx)
        console.log("selectedbank_", item);
        setbankselect(item)
        Banksumbit(item.BSRCode)
    }

    const onNavigationStateChange = (webViewState) => {
        console.log("webviewurlllll___", webViewState.url, "webstateeee", webViewState.canGoBack);
        if (webViewState.canGoBack) {
            setflag(true)
        }
    };

    const Onback_Press = () => {
        Alert.alert(
            String.AppName,
            String.Grn_Details + WebBody,
            [
                {
                    text: 'ok', onPress: () => {
                        handleNavigation({ type: 'setRoot', page: 'Home', navigation: navigation })
                    }
                },
            ],
            { cancelable: false }
        )

    }

    const OnModal_cloose = () => {
        setModalVisible(false)
        setUpicheck(false)
        setNetBcheck(false)
        setDebitcheck(false)
        setupiverify(false)
        setclick('')
        setupiinput('')
    }
    const onbuttonpress = (value) => {
        Alert.alert(
            String.AppName,
            String.UPIfail,
            [
                // { text: 'View', onPress: () => { navigation.navigate('ViewChallan', { Data: value.GRN }) } },
                {
                    text: 'ok', onPress: () => {
                        handleNavigation({ type: 'setRoot', page: 'Home', navigation: navigation })
                    }
                },
            ],
            { cancelable: false }
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    {webflag ?
                        <View style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width }}>
                            {/* <TouchableOpacity style={{ backgroundColor: Colors.appcolor, }}>
                                <Text style={[styles.appButtonText,{marginVertical:10}]}>Back to Home</Text>
                            </TouchableOpacity> */}
                            {console.log("sdfff______________", WebBody, Helper.user_token)}
                            <WebView
                                // scalesPageToFit={false}
                                style={{ width: '100%', justifyContent: 'center', alignItems: 'center', resizeMode: 'cover', flex: 1, marginTop: 0 }}
                                onNavigationStateChange={onNavigationStateChange}
                                source={{
                                    uri: Constant.WebUrl + Constant.Payurl,
                                    body: "GRN=" + WebBody + "&UserID=" + Helper.user_token,
                                    method: Constant.POST
                                }}

                            />
                            {
                                flag ?
                                    <TouchableOpacity style={styles.addButton}
                                        onPress={() => { Onback_Press() }}>
                                        <Text style={{ fontSize: 15, color: Colors.white, textAlign: 'center' }}>Done</Text>
                                    </TouchableOpacity>
                                    : null
                            }
                        </View> :

                        <View style={styles.headview}>
                            <View style={{ flexDirection: 'row' }}>
                                <BackNavigation navigation={navigation}
                                    MargT={Platform.OS == 'ios' ? 20 : 22}
                                    width={30}
                                    height={30}
                                    MargL={0}
                                />
                                <View style={{ marginTop: 30, flex: 0.8 }}>
                                    <Text style={styles.containsubH}> Payment Details</Text>
                                </View>
                            </View>
                            <View style={styles.headingview}>
                                <Text style={{ fontSize: 15, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{DepartName}</Text>
                            </View>
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20, color: Colors.buttonColors }}> All Payment Mode</Text>
                            </View>
                            {payoption == 0 ?

                                <View>
                                    <View style={styles.checkview}>
                                        <TouchableOpacity onPress={() => { paymode(0) }}>
                                            <Image resizeMode='contain' style={styles.Redio_Button} source={Upicheck ? images.Radio_select : images.Radio_unselect} />
                                        </TouchableOpacity>
                                        <Text style={styles.Textview}>Upi</Text>
                                    </View>

                                    <View style={styles.checkview}>
                                        <TouchableOpacity onPress={() => { paymode(1) }}>
                                            <Image resizeMode='contain' style={styles.Redio_Button} source={NetBcheck ? images.Radio_select : images.Radio_unselect} />
                                        </TouchableOpacity>
                                        <Text style={styles.Textview}>Net Banking</Text>
                                    </View>

                                    <View style={styles.checkview}>
                                        <TouchableOpacity onPress={() => { paymode(2) }} >
                                            <Image resizeMode='contain'
                                                style={styles.Redio_Button} source={Debitcheck ? images.Radio_select : images.Radio_unselect} />
                                        </TouchableOpacity>
                                        <Text style={styles.Textview}>Payment Gatway</Text>
                                    </View>

                                    {/* <View style={{ alignSelf: 'center', marginTop: 100 }}>
                                        <View style={{ justifyContent: 'center', }}>
                                            <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }}>
                                                <Text style={[styles.appButtonText]}>Confirm</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}

                                </View>
                                : payoption == 1 ?
                                    <View>
                                        <View style={[styles.checkview, { justifyContent: 'space-between' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { UpiPayMode(0) }}>
                                                    <Image resizeMode='contain' style={styles.Redio_Button} source={Upimode.Phonepay ? images.Radio_select : images.Radio_unselect} />
                                                </TouchableOpacity>
                                                <Text style={styles.Textview}>PhonePe</Text>
                                            </View>
                                            {/* <Image resizeMode='cover' style={[styles.Redio_Button, { width: 30 }]} source={images.Paytm} /> */}
                                        </View>

                                        <View style={[styles.checkview, { justifyContent: 'space-between' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { UpiPayMode(1) }}>
                                                    <Image resizeMode='contain' style={styles.Redio_Button} source={Upimode.Paytm ? images.Radio_select : images.Radio_unselect} />
                                                </TouchableOpacity>
                                                <Text style={styles.Textview}>Paytm</Text>
                                            </View>
                                            <Image resizeMode='cover' style={[styles.Redio_Button, { width: 30 }]} source={images.Paytm} />
                                        </View>

                                        <View style={[styles.checkview, { justifyContent: 'space-between' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { UpiPayMode(2) }} >
                                                    <Image resizeMode='contain'
                                                        style={styles.Redio_Button} source={Upimode.GooglePay ? images.Radio_select : images.Radio_unselect} />
                                                </TouchableOpacity>
                                                <Text style={styles.Textview}>GooglePay</Text>
                                            </View>
                                            <Image resizeMode='cover' style={[styles.Redio_Button, { width: 30 }]} source={images.Googlepay} />
                                        </View>

                                        <View style={[styles.checkview, { justifyContent: 'space-between' }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => { UpiPayMode(3) }} >
                                                    <Image resizeMode='contain'
                                                        style={styles.Redio_Button} source={Upimode.BHIMUpi ? images.Radio_select : images.Radio_unselect} />
                                                </TouchableOpacity>
                                                <Text style={styles.Textview}>BHIM UPI</Text>
                                            </View>
                                        </View>

                                    </View>
                                    : payoption == 2 ?
                                        <View>
                                            {/* <View style={styles.flatlistview}>
                                                <FlatList
                                                    style={{ height: 0, }}
                                                    showsVerticalScrollIndicator={false}
                                                    data={Bank}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={renderitem}
                                                />
                                            </View>
                                            <View style={{ alignSelf: 'center', marginTop: 30 }}>
                                                <View style={{ justifyContent: 'center', }}>
                                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => { Banksumbit() }}>
                                                        <Text style={[styles.appButtonText]}>Confirm</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> */}
                                            {/* <View style={{ backgroundColor: '#00000088', flex: 1 }}> */}



                                            {/* </View> */}
                                        </View>



                                        : payoption == 3 ?
                                            <View>
                                                <View style={{ marginHorizontal: 22, marginTop: 20 }}>
                                                    <Text style={styles.inputview}>Card Number</Text>
                                                    <Input
                                                        placeholder="Enter Card Number"
                                                        style={styles.Textinput}
                                                        value={Card}
                                                        underlineColorAndroid="transparent"
                                                        placeholderTextColor="#B5B5B5"
                                                        keyboardType="phone-pad"
                                                        maxLength={16}
                                                        onChangeText={text => setCard(text)}
                                                    />
                                                </View>
                                                <View style={{ flexDirection: 'row', marginHorizontal: 22, justifyContent: 'space-between' }}>
                                                    <View style={{ marginTop: 20 }}>
                                                        <Text style={styles.inputview}>Valid To</Text>
                                                        <Input
                                                            placeholder="MM/YY"
                                                            style={[styles.Textinput, { width: 100 }]}
                                                            value={Valid}
                                                            underlineColorAndroid="transparent"
                                                            placeholderTextColor="#B5B5B5"
                                                            keyboardType="number-pad"
                                                            maxLength={5}
                                                            // onChangeText={text => setValid(text)}
                                                            onChangeText={(text) => {
                                                                setValid(
                                                                    text.length === 3 && !text.includes("/")
                                                                        ? `${text.substring(0, 2)}/${text.substring(2)}`
                                                                        : text
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ marginTop: 20, marginRight: 15 }}>
                                                        <Text style={styles.inputview}>Cvv</Text>
                                                        <Input
                                                            placeholder="Cvv"
                                                            style={[styles.Textinput, { width: 100 }]}
                                                            value={Cvv}
                                                            underlineColorAndroid="transparent"
                                                            placeholderTextColor="#B5B5B5"
                                                            keyboardType="phone-pad"
                                                            maxLength={3}
                                                            onChangeText={text => setCvv(text)}
                                                        />
                                                    </View>
                                                </View>

                                            </View>
                                            : null
                            }
                        </View>
                    }

                </View>
                <View style={{ backgroundColor: '#00000088', flex: 0 }}>
                    <Modal
                        animationType=""
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        {
                            upiverify ?
                                <View style={styles.modalVerify}>

                                    <TouchableOpacity style={styles.closeupi} onPress={() => OnModal_cloose()}>
                                        <Image resizeMode='contain' style={styles.close_Button} source={images.Close} />
                                    </TouchableOpacity>
                                    <View style={[styles.centercomp, { height: 50, flexDirection: 'row', borderRadius: 5 }]}>
                                        <View style={{ marginTop: 20, marginLeft: 0 }} removeClippedSubviews={false}>
                                            <TextInput
                                                placeholder="Exp. 1234567890@upi"
                                                style={styles.Textinput}
                                                contextMenuHidden={false}
                                                value={upiinput}
                                                selectTextOnFocus={false}
                                                maxLength={30}
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor={Colors.inputcolor}
                                                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                                onChangeText={text => {
                                                    setupiinput(text.replace(/[`~!#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, ''))
                                                    seterrors([])
                                                }}

                                            />
                                            {
                                                errors.includes('Upi') ?
                                                    <Text style={styles.Errortextview}>{upierror}</Text> : null
                                            }
                                        </View>

                                        <TouchableOpacity style={styles.buttonverify} onPress={() => { UpiVerfiy() }} >
                                            <Text style={[styles.appButtonText, { marginHorizontal: 0, }]}>Verify</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={styles.modalmain}>

                                    <TouchableOpacity style={styles.closeimg} onPress={() => OnModal_cloose()}>
                                        <Image resizeMode='contain' style={styles.close_Button} source={images.Close} />
                                    </TouchableOpacity>
                                    {
                                        NetBcheck ?
                                            <FlatList
                                                style={{ marginTop: 15 }}
                                                showsVerticalScrollIndicator={false}
                                                data={NetBank}
                                                // keyExtractor={(notif) => String()}
                                                renderItem={renderitem}
                                            /> : Debitcheck ?
                                                <FlatList
                                                    style={{ marginTop: 15 }}
                                                    showsVerticalScrollIndicator={false}
                                                    data={payBank}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={renderitem}
                                                />
                                                : null
                                    }

                                </View>
                        }

                    </Modal>
                </View>


            </ImageBackground>


        </SafeAreaView>

    )
}

export default Paymode;
