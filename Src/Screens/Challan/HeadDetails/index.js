// import React, { Component, useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     ImageBackground,
//     Text,
//     FlatList,
//     Image,
//     ScrollView,
//     KeyboardAvoidingView,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import BackNavigation from '../../../Lib/BackNavigation';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles';
// import images from '../../../Component/Imagepath';
// import CommonMethods from '../../../Lib/CommonMethods';
// import Input from '../../../Component/Textinput';
// import moment from 'moment'
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Constant from '../../../Component/Constant';
// import Helper from '../../../Component/Helper';
// import ApiUrl from '../../../Component/ApiURl';
// import Apicall from '../../../Component/Apicall';
// import base64 from 'react-native-base64';
// import ConvMethods from '../../../Component/Methods';
// import CustomLoader from '../../../Component/CustomLoader';
// import { Headline } from 'react-native-paper';
// import Colors from '../../../Component/Color';

// const HeadDetails = (props) => {
//     // console.log("props_HeadDetails", props.route.params);
//     const navigation = useNavigation();
//     const [DepartName, setDepartName] = useState('')
//     const [loaderVisible, setloaderVisible] = useState(false)
//     const [Remitter, setRemitter] = useState([])
//     const [HeadList, setHeadList] = useState(props.route.params)
//     const [TotalAmt, setTotalAmt] = useState(0)
//     const [Pannumber, setPannumber] = useState('')
//     const [panflag, setpanflag] = useState(false)
//     const [Discount, setDiscount] = useState(0)
//     const [DiscountAmt, setDiscountAmt] = useState(0)
//     const [Discountflag, setDiscountflag] = useState(false)
//     const [Discounterror, setDiscounterror] = useState('')
//     var HeadInfo = []

//     const [errors, seterrors] = useState([])
//     const [pancarderror, setpancarderror] = useState('')


//     const hideLoader = () => { setloaderVisible(false) }

//     const showLoader = () => { setloaderVisible(true) }

//     useEffect(() => {
//         console.log("Head details useeffect call", HeadList);
//         if (Helper.IsRepeatChallan) {
//             HeadList.PayeeDetails.map((item, index) => {
//                 console.log("item", item);
//                 Remitter[index] = JSON.stringify(item.Amount)
//                 console.log("remittttter_", Remitter);
//                 setRemitter(Remitter)
//                 var sumamount = 0;
//                 for (var i = 0; i < Remitter.length; i++) {
//                     console.log("beformmmmmm__", JSON.parse(Remitter[i]));
//                     sumamount += parseInt(Remitter[i])
//                     console.log("submooo________asdf", sumamount);
//                 }

//                 // const taollll = Remitter.map(function (elt) { // assure the value can be converted into an integer
//                 //     return /^\d+$/.test(elt) ? parseInt(elt) : 0;
//                 // })
//                 //     .reduce(function (a, b) { // sum all resulting numbers
//                 //         return a + b
//                 //     })
//                 // console.log("sumttt___sf", taollll);
//                 setTotalAmt(sumamount)

//             })
//         }


//         if (Helper.DepartName) {
//             // var deptname = PayDetails.Challaninfo?.Dep_Name?.deptnameEnglish
//             var deptname = Helper.DepartName
//             console.log("department codeeee____", Helper.DepartName);
//             setDepartName(deptname[1])
//         }
//     }, [Remitter])

//     useEffect(() => {
//         if (TotalAmt > 50000) {
//             setpanflag(true)
//         }
//         else {
//             setpanflag(false)
//         }
//         console.log("secondddd__useefect___callll");

//     }, [TotalAmt])

//     useEffect(
//         () => {
//             const result = Math.round((TotalAmt / 100) * 20)
//             var discount_amt = 0
//             if (Discount > 0) {
//                 if (Discount <= result) {
//                     setDiscountflag(false)
//                     console.log("indidscunnnn_______________________________", TotalAmt, Discount);
//                     discount_amt = TotalAmt - Discount
//                     console.log("discountttt_________________adsmfat", discount_amt);
//                     setDiscountAmt(discount_amt)
//                     setDiscountflag(true)
//                 }
//             }
//             else {
//                 setDiscountflag(false)
//             }


//         }, [Discount]
//     )


//     const validateEmail = () => {
//         let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
//         const result = Math.round((TotalAmt / 100) * 20)
//         let error = []

//         if (TotalAmt > 50000) {
//             if (Pannumber == '') {
//                 // CommonMethods.showError("Please Enter Valid pan card number")
//                 error.push('Pannumber')
//                 setpancarderror('Please Enter pan card number')
//             }
//             else if (regex.test(Pannumber) == '') {
//                 // CommonMethods.showError("Please Enter Valid pan card number")
//                 error.push('Pannumber')
//                 setpancarderror('Please Enter Valid pan card number')
//             }
//         }
//         if (Helper.DepartName[0] == 86) {

//             if (Discount > result) {
//                 console.log("discount value is more than 20% of total amount");
//                 error.push('Discount')
//                 setDiscounterror('Commission Amount not allowed more than 20% of ' + TotalAmt)
//             }


//         }
//         if (error.length) {
//             console.log("erorororroro_", error);
//             seterrors(error)
//             return;
//         }
//         else {
//             if (Remitter == '') {
//                 error = []
//                 CommonMethods.showError("Please Enter Amount")
//                 console.log("Please enter aleast one BudgetHead Amount")
//             }
//             // else if (Remitter.length==0) {
//             //     error = []
//             //     CommonMethods.showError("Please Enter Amount")
//             //     console.log("Please enter aleast one BudgetHead mount")
//             // }
//             else {
//                 return true

//             }
//         }
//     };

//     const onsubmit = () => {
//         if (validateEmail()) {
//             console.log("headdetails", HeadList.PayeeDetails);
//             console.log("remiter___val", Remitter);
//             var data = HeadList.PayeeDetails
//             console.log("onsubmit_check+_", data.length);
//             // for (var i = 0; i <= data.length - 1; i++) {
//             //     console.log("resultoflooopp______", data[i], Remitter[i]);
//             //     var splititem = data[i].BudgetHead.split("-")
//             //     console.log("splitedeee____", splititem, Helper.IsServiceChallan);
//             //     if (Helper.IsServiceChallan == 'True') {
//             //         var Schecode = data[i].schecode
//             //     }
//             //     else {
//             //         var Schecode = data[i].Schecode
//             //     }
//             //     if (Remitter[i] === undefined) {
//             //         Remitter[i] = 0
//             //         var Amountval = Remitter[i]
//             //     }
//             //     else {
//             //         var Amountval = Remitter[i]
//             //     }
//             //     console.log("schecocdee___________________", Schecode);
//             //     // HeadInfo.push({ "ScheCode": data[i].schecode ? data[i].schecode : data[i].Schecode, "amount": Remitter[i], "BudgetHead": splititem[0] })
//             //     HeadInfo.push({ "ScheCode": Schecode, "amount": Amountval, "BudgetHead": splititem[0] })
//             //     console.log("inforlooop_headifoo", HeadInfo);
//             // }

//             // for (var i = 0; i <= data.length - 1; i++) {
//             //     console.log("firstforlooop", Remitter[i]);
//             //     // var splititem = data[i].BudgetHead.split("-")
//             //     console.log("splitedeee____", Helper.IsServiceChallan);
//             //     if (Remitter[i] === undefined) {
//             //         console.log("infirstlooop");
//             //         data[i].Amount = 0
//             //     }
//             //     else if (Remitter[i] === "") {
//             //         console.log("insecondlooop");

//             //         data[i].Amount = 0
//             //     }
//             //     else {
//             //         console.log("inlastlooop");
//             //         data[i].Amount = Remitter[i]
//             //     }
//             //     console.log("inforlooop_headifoo", data);
//             // }
//             for (var i = 0; i <= data.length - 1; i++) {
//                 console.log("firstforlooop", Remitter[i]);
//                 // var splititem = data[i].BudgetHead.split("-")
//                 console.log("splitedeee____", Helper.IsServiceChallan);

//                 console.log("inlastlooop");
//                 data[i].Amount = Remitter[i] /// agar kuch value hai hi nhi to add hi kyu krwana hai apn ko

//                 console.log("inforlooop_data", data);
//             }
//             for (var i = 0; i <= data.length - 1; i++) {
//                 // console.log("resultoflooopp______", data[i]);

//                 if (Helper.IsRepeatChallan) {
//                     if (Helper.IsServiceChallan == 'True') {
//                         var Schecode = data[i].schecode
//                     }
//                     else {
//                         var Schecode = data[i].Schecode
//                     }



//                     HeadInfo.push({ "ScheCode": Schecode, "amount": data[i].Amount, "BudgetHead": data[i].Budgethead })
//                     console.log("inforlooop_headifoo_isre", HeadInfo);
//                 }
//                 else {
//                     var splititem = data[i].BudgetHead.split("-")
//                     console.log("Secondloop_splitedeee____", splititem, Helper.IsServiceChallan);
//                     if (Helper.IsServiceChallan == 'True') {
//                         var Schecode = data[i].schecode
//                     }
//                     else {
//                         var Schecode = data[i].Schecode
//                     }
//                     HeadInfo.push({ "ScheCode": Schecode, "amount": data[i].Amount, "BudgetHead": splititem[0] })
//                     console.log("inforlooop_headifoo_isnot", HeadInfo);
//                 }
//             }
//             Helper.PanNumber = Pannumber
//             Helper.DiscountAmt = Discount
//             var j = 0;
//             if (Discount) {
//                 for (var i = 0; i <= HeadInfo.length - 1; i++) {
//                     console.log("headdddddd___amountttt", HeadInfo[i].amount);
//                     if (HeadInfo[i].amount > 0) {
//                         console.log("insie offfff looooooop_________");
//                         j++;
//                     }
//                 }
//                 if (j == 1) {
//                     console.log("ho gya kamm bhai shabh", j);
//                     console.log("finalresult____", HeadInfo);
//                     const FindalBudgetHeadinfo = HeadInfo.filter(item => {
//                         console.log("data_treadyrycode________________________asdf", item);

//                         if (item.amount > 0) {
//                             return item
//                         }
//                     });
//                     console.log("filter____data__ff", FindalBudgetHeadinfo);
//                     navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(FindalBudgetHeadinfo), TotalAmt: Discountflag ? DiscountAmt : TotalAmt })
//                     // navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(HeadInfo), TotalAmt: TotalAmt })

//                 }
//                 else {
//                     console.log("lag gai lanka bhai", j);
//                     CommonMethods.showError("Discount allow in case Amount enter in one BudgetHead/Purpose only.")
//                 }
//             }
//             else {
//                 console.log("finalresult____", HeadInfo);
//                 const finalheadd = HeadInfo.filter(item => {
//                     console.log("data_treadyrycode________________________asdf", item);

//                     if (item.amount > 0) {
//                         return item
//                     }
//                 });
//                 console.log("filter____data__ff", finalheadd.length);
//                 if (finalheadd.length > 0) {
//                     navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(finalheadd), TotalAmt: Discountflag ? DiscountAmt : TotalAmt })
//                 }
//                 else {
//                     CommonMethods.showError("Please enter aleast one BudgetHead Amount")
//                 }

//             }


//         } 
//     }

//     //Head Details render
//     const Headrender = ({ item, index }) => {
//         console.log("headlistvalue", item, index);
//         var splititem = item.BudgetHead.split("-")
//         // console.log("splitdata", splititem[0]);
//         var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
//         return (
//             <View style={styles.flatview}>
//                 <View style={styles.inputview}>
//                     <Text style={[styles.Textview, { color: Colors.inputcolor, }]}>{BudgetH}-{item.schemaname}</Text>
//                 </View>

//                 <View style={styles.inputview}>
//                     <Text style={styles.Textview}>Enter Amount</Text>
//                     <Input
//                         placeholder="Enter Amount"
//                         style={styles.Textinput}
//                         value={Remitter[index]}
//                         keyboardType='phone-pad'
//                         maxLength={16}
//                         // onChangeText={text => onvaluechange(text)}
//                         onChangeText={text => {

//                             Remitter[index] = text;
//                             console.log("valueoftextinput", Remitter);
//                             const arrOfNum = [];

//                             Remitter.forEach(str => {
//                                 arrOfNum.push(Number(str));
//                             });
//                             var data = 0
//                             for (var i = 0; i <= arrOfNum[i]; i++) {
//                                 data += arrOfNum[i]
//                             }
//                             setTotalAmt(data)
//                             console.log(data)
//                             setRemitter(Remitter)
//                         }}
//                     />
//                 </View>
//             </View>
//         )
//     }

//     return (
//         <SafeAreaView style={styles.container} >
//             <CustomLoader loaderVisible={loaderVisible} />
//             <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
//                 <View style={styles.mainview}>

//                     <View style={styles.headview}>

//                         <View style={{ flexDirection: 'row' }}>
//                             <BackNavigation navigation={navigation}
//                                 MargT={Platform.OS == 'ios' ? 20 : 22}
//                                 width={30}
//                                 height={30}
//                                 MargL={0}
//                             />
//                             <View style={{ marginTop: 30, flex: 0.8 }}>
//                                 <Text style={styles.containsubH}> Head Details</Text>
//                             </View>
//                         </View>
//                         <View style={styles.headingview}>
//                             <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{DepartName}</Text>
//                         </View>

//                         <KeyboardAvoidingView
//                             behavior={Platform.OS === "ios" ? "padding" : "padding"}
//                             style={{ flex: 1 }}>
//                             <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
//                                 <View style={{ flex: 1.5 }}>

//                                     <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{
//                                         height: 200,
//                                         // marginBottom: 40,
//                                         // flex: 0.6,
//                                     }}>
//                                         <View style={{ marginHorizontal: 0 }}>
//                                             {
//                                                 HeadList.PayeeDetails.map((item, index) => {
//                                                     // console.log("reurnnn___", item);

//                                                     if (Helper.IsRepeatChallan) {
//                                                         var budget_head = item.Budgethead ? item.Budgethead : item.BudgetHead
//                                                         var splititem = budget_head.split("-")
//                                                         console.log("splitdata", splititem[0]);
//                                                         var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
//                                                         // Remitter[index] = item.Amount
//                                                         // setRemitter(Remitter)
//                                                         console.log("need to check Remmitter value___",Remitter)
//                                                     }
//                                                     else {
//                                                         var splititem = item.BudgetHead.split("-")
//                                                         // console.log("splitdata", splititem[0]);
//                                                         var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
//                                                     }

//                                                     return (
//                                                         <View style={styles.flatview}>
//                                                             <View style={styles.inputview}>
//                                                                 <Text style={[styles.Textview, { color: Colors.inputcolor, }]}>{BudgetH}-{item.schemaname ? item.schemaname : item.SCHEMANAME}</Text>
//                                                             </View>

//                                                             <View style={styles.inputview}>
//                                                                 <Text style={styles.Textview}>Enter Amount</Text>
//                                                                 <Input
//                                                                     placeholder="Enter Amount"
//                                                                     style={styles.Textinput}
//                                                                     value={Remitter[index]}
//                                                                     // value={Number(Remitter[index])}
//                                                                     keyboardType="numeric"
//                                                                     maxLength={11}
//                                                                     // onChangeText={text => onvaluechange(text)}
//                                                                     onChangeText={text => {
//                                                                         let value = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
//                                                                         console.log("remititerr__indexxx__",Remitter[index],index)
//                                                                         Remitter[index] = value
//                                                                         console.log("valueoftextinput", Remitter);
//                                                                         const arrOfNum = [];

//                                                                         Remitter.forEach(str => {
//                                                                             arrOfNum.push(Number(str));
//                                                                         });
//                                                                         console.log("arrrayofnum__",arrOfNum)
//                                                                         var data = 0
//                                                                         for (var i = 0; i <= arrOfNum[i]; i++) {
//                                                                             data += arrOfNum[i]
//                                                                         }
//                                                                         setTotalAmt(data)
//                                                                         console.log(data)
//                                                                         // setRemitter(Remitter)
//                                                                     }}
//                                                                 />
//                                                             </View>
//                                                         </View>
//                                                     )
//                                                 })
//                                             }
//                                         </View>
//                                     </ScrollView>
//                                 </View>

//                                 {Helper.DepartName[0] == 86 ?
//                                     <View style={[styles.inputview, { marginTop: 30 }]}>
//                                         <Text style={styles.Textview}>Discount</Text>

//                                         <Input
//                                             placeholder="Enter Discount"
//                                             style={styles.Textinput}
//                                             value={Discount}
//                                             autoCapitalize='characters'
//                                             maxLength={10}
//                                             keyboardType="number-pad"
//                                             onChangeText={text => { setDiscount(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
//                                             onEndEditing={() => validateEmail()}
//                                         />
//                                         {
//                                             errors.includes('Discount') ?
//                                                 <Text style={styles.Errortextview}>{Discounterror}</Text> : null
//                                         }
//                                     </View>
//                                     : null
//                                 }
//                                 <View style={[styles.inputview, { marginTop: 30 }]}>
//                                     {
//                                         Discountflag ?
//                                             <Text style={styles.Textview}>Net Amount: {DiscountAmt}</Text>
//                                             : <Text style={styles.Textview}>Net Amount: {TotalAmt}</Text>

//                                     }
//                                 </View>

//                                 {
//                                     panflag ?
//                                         <View style={styles.inputview}>
//                                             <Text style={styles.Textview}>Pan Number</Text>

//                                             <Input
//                                                 placeholder="Enter Pan Number"
//                                                 style={styles.Textinput}
//                                                 value={Pannumber}
//                                                 autoCapitalize='characters'
//                                                 maxLength={10}
//                                                 onChangeText={text => { setPannumber(text), seterrors([]) }}
//                                                 onEndEditing={() => validateEmail()}
//                                             />
//                                             {
//                                                 errors.includes('Pannumber') ?
//                                                     <Text style={styles.Errortextview}>{pancarderror}</Text> : null
//                                             }
//                                         </View>
//                                         : null
//                                 }




//                                 <View style={styles.buttonview}>
//                                     <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }}>
//                                         <Text style={[styles.appButtonText]}>Next</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </ScrollView>
//                         </KeyboardAvoidingView>
//                     </View>

//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     )
// }

// export default HeadDetails;


import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    FlatList,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
} from 'react-native';
import BackNavigation from '../../../Lib/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Input from '../../../Component/Textinput';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../../Component/Methods';
import CustomLoader from '../../../Component/CustomLoader';
import { Headline } from 'react-native-paper';
import Colors from '../../../Component/Color';
import NetInfo from "@react-native-community/netinfo";

const HeadDetails = (props) => {
    // console.log("props_HeadDetails", props.route.params);
    const navigation = useNavigation();
    const [DepartName, setDepartName] = useState('')
    const [loaderVisible, setloaderVisible] = useState(false)
    const [Remitter, setRemitter] = useState([])
    const [HeadList, setHeadList] = useState(props.route.params)
    const [TotalAmt, setTotalAmt] = useState(0)
    const [Pannumber, setPannumber] = useState('')
    const [panflag, setpanflag] = useState(false)
    const [Discount, setDiscount] = useState(0)
    const [DiscountAmt, setDiscountAmt] = useState(0)
    const [Discountflag, setDiscountflag] = useState(false)
    const [Discounterror, setDiscounterror] = useState('')
    const [NewRemitter, setNewRemitter] = useState()
    const [flagarrray, setflagarray] = useState(false)
    // var j = 0;
    var HeadInfo = []
    let newRemitter = []
    const [errors, seterrors] = useState([])
    const [pancarderror, setpancarderror] = useState('')


    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }

    useEffect(() => {
        console.log("Head details useeffect call", HeadList);
        if (Helper.IsRepeatChallan) {
            HeadList.PayeeDetails.map((item, index) => {
                console.log("item", item);
                Remitter[index] = JSON.stringify(item.Amount)
                // newRemitter.push(JSON.stringify(item.Amount))
                // NewRemitter[index] = item.Amount
                console.log("remittttter_", Remitter);
                setRemitter(Remitter)
                // setNewRemitter(NewRemitter)
                var sumamount = 0;
                for (var i = 0; i < Remitter.length; i++) {
                    console.log("beformmmmmm__", JSON.parse(Remitter[i]));
                    sumamount += parseInt(Remitter[i])
                    console.log("submooo________asdf", sumamount);
                }

                // const taollll = Remitter.map(function (elt) { // assure the value can be converted into an integer
                //     return /^\d+$/.test(elt) ? parseInt(elt) : 0;
                // })
                //     .reduce(function (a, b) { // sum all resulting numbers
                //         return a + b
                //     })
                setTotalAmt(sumamount)

            })
        }


        if (Helper.DepartName) {
            // var deptname = PayDetails.Challaninfo?.Dep_Name?.deptnameEnglish
            var deptname = Helper.DepartName
            console.log("department codeeee____", Helper.DepartName);
            setDepartName(deptname[1])
        }
    }, [flagarrray])

    useEffect(() => {
        if (TotalAmt > 50000) {
            setpanflag(true)
        }
        else {
            setpanflag(false)
        }
        console.log("secondddd__useefect___callll");

    }, [TotalAmt])

    useEffect(
        () => {

            discount_check()
            return () => {
                console.log('******************* UNMOUNTED');
            };
        }, [Discount]
    )

    const discount_check = () => {
        console.log("need to find totalamount", TotalAmt);
        const result = Math.round((TotalAmt / 100) * 20)
        var discount_amt = 0
        if (Discount > 0) {
            if (Discount <= result) {
                setDiscountflag(false)
                console.log("indidscunnnn_______________________________", TotalAmt, Discount);
                discount_amt = TotalAmt - Discount
                console.log("discountttt_________________adsmfat", discount_amt);
                setDiscountAmt(discount_amt)
                setDiscountflag(true)
            }
        }
        else {
            setDiscountflag(false)
        }
    }


    const validateEmail = () => {
        let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        const result = Math.round((TotalAmt / 100) * 20)
        let error = []

        if (TotalAmt > 50000) {
            if (Pannumber == '') {
                // CommonMethods.showError("Please Enter Valid pan card number")
                error.push('Pannumber')
                setpancarderror('Please Enter pan card number')
            }
            else if (regex.test(Pannumber) == '') {
                // CommonMethods.showError("Please Enter Valid pan card number")
                error.push('Pannumber')
                setpancarderror('Please enter valid PAN!( Ex: ABCDE1234F)')
            }
        }
        if (Helper.DepartName[0] == 86) {

            if (Discount > result) {
                console.log("discount value is more than 20% of total amount");
                error.push('Discount')
                setDiscounterror('Commission Amount not allowed more than 20% of ' + TotalAmt)
            }


        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            if (Remitter == '') {
                error = []
                CommonMethods.showError("Please Enter Amount")
                console.log("Please enter aleast one BudgetHead Amount")
            }
            // else if (Remitter.length==0) {
            //     error = []
            //     CommonMethods.showError("Please Enter Amount")
            //     console.log("Please enter aleast one BudgetHead mount")
            // }
            else {
                console.log("Remittervalue____________________", Remitter);
                return true

            }
        }
    };
    const Banksumbit = (grnsc) => {
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
        console.log("helperpreff____", Helper.DepartName, Helper.ServiceName);
        // console.log("porpss");
        var Profile_id = 0
        var serviceid = 0
        var GRn_info = 0

        if (Helper.ProfileChallan) {
            Profile_id = Helper.ServiceName
            console.log("profiileid_check", Profile_id);
        }
        else if (Helper.IsRepeatChallan) {
            GRn_info = Helper.GrnInfo.GRN
            Profile_id = Helper.Profileinfo
            console.log("inrepeat_case grn", GRn_info);
        }
        else {
            var serviceinfo = Helper.ServiceName.ServiceId.split('|')
            serviceid = serviceinfo[0]
            console.log("inservicecheck__", serviceinfo, serviceid);
        }



        // var data = ChallanInfo.Newchallaninfo
        var data = HeadList
        console.log("valueeee____", data)
        var obj = {
            ProfileId: Profile_id,
            ServiceId: serviceid,
            OfficeCode: data.Challan.Office.officeid,
            TreasuryCode: data.Challan.Treasury.TreasuryCode,
            FromDate: Helper.Payeinfo.fromdate,
            ToDate: Helper.Payeinfo.todate,
            FullName: Helper.userProfile,
            Address: Helper.Payeinfo.address,
            City: Helper.Payeinfo.city,
            MobileNumber: Helper.Payeinfo.mobile,
            PANNumber: Helper.PanNumber,
            PinCode: Helper.Payeinfo.pincode,
            Remarks: Helper.Payeinfo.remark,
            TIN: Helper.VehicleNumber ? Helper.VehicleNumber : '',
            BankCode: 0,
            DivCode: 0,
            GRNSchema: grnsc,
            GRN: GRn_info,
            // TotalAmount: ChallanInfo.TotalAmt,
            TotalAmount: Discountflag ? DiscountAmt : TotalAmt,
            IPAddress: Helper.deviceIp,
            DeviceId: Helper.deviceId,
            DeductCommission: Helper.DiscountAmt ? Helper.DiscountAmt : 0,
            DeptCode: Helper.DepartName[0]
        }
        console.log("objectvaluuu__________", JSON.stringify(obj));

        // // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(JSON.stringify(obj))
        console.log("Challanencrpyted_Result", AES128Ency);

        // Createnew Challan api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.CreateNewChallan, bytesTobase64, AES128Ency).then((resp) => {
            console.log("respppppp", resp.data);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Department list", resp.data);
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                console.log("aes128dec_userdetails", AES128Decry);

                var splitdata = AES128Decry.split("|")

                if (splitdata[0] == rnd) {
                    console.log(" Department status code is 200");
                    var result = splitdata[1]
                    console.log("resultof__", splitdata);
                    if (result != -1) {
                        CommonMethods.showSuccess('Your GRN number is successfully genrated : ' + splitdata[1])
                        Helper.GrnInfo = splitdata[1]
                        HeadInfo = []
                        navigation.navigate('Paymode', { TotalAmt: splitdata[2], GRNSchema: grnsc })
                        // navigation.navigate('Paymode', { TotalAmt: Discountflag ? DiscountAmt : TotalAmt, GRNSchema: grnsc })
                    }
                    else {
                        CommonMethods.showError('Something went wrong! GRN not genrated : ' + splitdata[1])
                        HeadInfo = []

                    }


                    var postdata = "GRN=" + splitdata[1] + "&UserID=" + Helper.user_token
                    console.log("postdateeee__", postdata);

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

    const onsubmit = () => {
        HeadInfo = []
        if (validateEmail()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {

                    console.log("headdetails", HeadList.PayeeDetails);
                    console.log("remiter___val", Remitter);
                    var data = HeadList.PayeeDetails
                    console.log("onsubmit_check+_", data.length);
                    // for (var i = 0; i <= data.length - 1; i++) {
                    //     console.log("resultoflooopp______", data[i], Remitter[i]);
                    //     var splititem = data[i].BudgetHead.split("-")
                    //     console.log("splitedeee____", splititem, Helper.IsServiceChallan);
                    //     if (Helper.IsServiceChallan == 'True') {
                    //         var Schecode = data[i].schecode
                    //     }
                    //     else {
                    //         var Schecode = data[i].Schecode
                    //     }
                    //     if (Remitter[i] === undefined) {
                    //         Remitter[i] = 0
                    //         var Amountval = Remitter[i]
                    //     }
                    //     else {
                    //         var Amountval = Remitter[i]
                    //     }
                    //     console.log("schecocdee___________________", Schecode);
                    //     // HeadInfo.push({ "ScheCode": data[i].schecode ? data[i].schecode : data[i].Schecode, "amount": Remitter[i], "BudgetHead": splititem[0] })
                    //     HeadInfo.push({ "ScheCode": Schecode, "amount": Amountval, "BudgetHead": splititem[0] })
                    //     console.log("inforlooop_headifoo", HeadInfo);
                    // }

                    // for (var i = 0; i <= data.length - 1; i++) {
                    //     console.log("firstforlooop", Remitter[i]);
                    //     // var splititem = data[i].BudgetHead.split("-")
                    //     console.log("splitedeee____", Helper.IsServiceChallan);
                    //     if (Remitter[i] === undefined) {
                    //         console.log("infirstlooop");
                    //         data[i].Amount = 0
                    //     }
                    //     else if (Remitter[i] === "") {
                    //         console.log("insecondlooop");

                    //         data[i].Amount = 0
                    //     }
                    //     else {
                    //         console.log("inlastlooop");
                    //         data[i].Amount = Remitter[i]
                    //     }
                    //     console.log("inforlooop_headifoo", data);
                    // }
                    for (var i = 0; i <= data.length - 1; i++) {
                        console.log("firstforlooop", Remitter[i]);
                        // var splititem = data[i].BudgetHead.split("-")
                        console.log("splitedeee____", Helper.IsServiceChallan);

                        console.log("inlastlooop");
                        data[i].Amount = Remitter[i] /// agar kuch value hai hi nhi to add hi kyu krwana hai apn ko

                        console.log("inforlooop_data", data);
                    }
                    for (var i = 0; i <= data.length - 1; i++) {
                        // console.log("resultoflooopp______", data[i]);

                        if (Helper.IsRepeatChallan) {
                            if (Helper.IsServiceChallan == 'True') {
                                var Schecode = data[i].schecode
                            }
                            else {
                                var Schecode = data[i].Schecode
                            }



                            HeadInfo.push({ "ScheCode": Schecode, "amount": data[i].Amount, "BudgetHead": data[i].Budgethead })
                            console.log("inforlooop_headifoo_isre", HeadInfo);
                        }
                        else {
                            var splititem = data[i].BudgetHead.split("-")
                            console.log("Secondloop_splitedeee____", splititem, Helper.IsServiceChallan);
                            if (Helper.IsServiceChallan == 'True') {
                                var Schecode = data[i].schecode
                            }
                            else {
                                var Schecode = data[i].Schecode
                            }
                            HeadInfo.push({ "ScheCode": Schecode, "amount": data[i].Amount, "BudgetHead": splititem[0] })
                            console.log("inforlooop_headifoo_isnot", HeadInfo);
                        }
                    }
                    Helper.PanNumber = Pannumber
                    Helper.DiscountAmt = Discount
                    // var j = 0;
                    if (Discount) {
                        var j = 0
                        console.log("headinfor_length__", HeadInfo.length)
                        for (var i = 0; i <= HeadInfo.length - 1; i++) {
                            console.log("headdddddd___amountttt", HeadInfo[i].amount);
                            // if (HeadInfo[i].amount > 0) {
                            if (HeadInfo[i].amount > 0) {
                                console.log("inside the if loop_________", j, HeadInfo[i].amount);
                                j++;
                            }
                        }
                        if (j == 1) {
                            console.log("ho gya kamm bhai shabh", j);
                            console.log("finalresult____", HeadInfo);
                            const FindalBudgetHeadinfo = HeadInfo.filter(item => {
                                console.log("data_treadyrycode________________________asdf", item);

                                if (item.amount > 0) {
                                    return item
                                }
                            });
                            console.log("filter____data__ff", FindalBudgetHeadinfo);
                            // navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(FindalBudgetHeadinfo), TotalAmt: Discountflag ? DiscountAmt : TotalAmt })
                            // navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(HeadInfo), TotalAmt: TotalAmt })
                            Banksumbit(JSON.stringify(FindalBudgetHeadinfo))
                        }
                        else {
                            console.log("lag gai lanka bhai", j);
                            CommonMethods.showError("Discount allow in case Amount enter in one BudgetHead/Purpose only.")
                        }
                    }
                    else {
                        console.log("finalresult____", HeadInfo);
                        const finalheadd = HeadInfo.filter(item => {
                            console.log("data_treadyrycode________________________asdf", item);

                            if (item.amount > 0) {
                                return item
                            }
                        });
                        console.log("filter____data__ff", finalheadd.length);
                        if (finalheadd.length > 0) {
                            Banksumbit(JSON.stringify(finalheadd))

                            // navigation.navigate('Paymode', { Newchallaninfo: HeadList, GRNSchema: JSON.stringify(finalheadd), TotalAmt: Discountflag ? DiscountAmt : TotalAmt })
                        }
                        else {
                            CommonMethods.showError("Please enter aleast one BudgetHead Amount")
                        }

                    }

                }
                else {
                    hideLoader()
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })
        }
    }

    //Head Details render
    const Headrender = ({ item, index }) => {
        console.log("headlistvalue", item, index);
        var splititem = item.BudgetHead.split("-")
        // console.log("splitdata", splititem[0]);
        var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
        return (
            <View style={styles.flatview}>
                <View style={styles.inputview}>
                    <Text style={[styles.Textview, { color: Colors.inputcolor, }]}>{BudgetH}-{item.schemaname}</Text>
                </View>

                <View style={styles.inputview}>
                    <Text style={styles.Textview}>Enter Amount</Text>
                    <Input
                        placeholder="Enter Amount"
                        style={styles.Textinput}
                        value={Remitter[index]}
                        keyboardType='phone-pad'
                        maxLength={16}
                        // onChangeText={text => onvaluechange(text)}
                        onChangeText={text => {

                            Remitter[index] = text;
                            console.log("valueoftextinput", Remitter);
                            const arrOfNum = [];

                            Remitter.forEach(str => {
                                arrOfNum.push(Number(str));
                            });
                            var data = 0
                            for (var i = 0; i <= arrOfNum[i]; i++) {
                                data += arrOfNum[i]
                            }
                            setTotalAmt(data)
                            console.log(data)
                            setRemitter(Remitter)
                        }}
                    />
                </View>
            </View>
        )
    }
    // console.log("NewRemmmitttter__", newRemitter);

    const onvaluechange = (text, index) => {
        console.log("textinpuvalll__", text, index);

        // let value = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')

        const newArray = [...Remitter]
        console.log("oldnewarrrrr__", newArray);
        newArray[index] = text;
        console.log("newarrrrr__", newArray);
        setRemitter(newArray)


        const arrOfNum = [];

        newArray.forEach(str => {
            console.log("numberofvvvvvvvv_", str);
            if (str === undefined) {
                arrOfNum.push(Number(0));
                console.log("instrrr_if", arrOfNum);
            }
            else {
                arrOfNum.push(Number(str));
                console.log("instrrr_else");
            }

        });
        console.log("arrrayofnum__", arrOfNum)
        var data = 0
        for (var i = 0; i < arrOfNum.length; i++) {
            console.log("arrayofii________________________", arrOfNum[i]);
            data += arrOfNum[i]
        }
        setTotalAmt(data)
        console.log(data)
        // setRemitter(newArray)
        if (Discount) {
            // setTotalAmt(data)
            // setDiscountAmt(data)
            setDiscount(0)
            console.log("ASDFASDFASDF");
            discount_check()
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
                                <Text style={styles.containsubH}> Head Details</Text>
                            </View>
                        </View>
                        <View style={styles.headingview}>
                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{DepartName}</Text>
                        </View>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>

                                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{
                                        height: 200,
                                        // marginBottom: 40,
                                        // flex: 0.6,
                                    }}>
                                        <View style={{ marginHorizontal: 0 }}>
                                            {
                                                HeadList.PayeeDetails.map((item, index) => {
                                                    // console.log("reurnnn___", item);

                                                    if (Helper.IsRepeatChallan) {
                                                        var budget_head = item.Budgethead ? item.Budgethead : item.BudgetHead
                                                        var splititem = budget_head.split("-")
                                                        console.log("splitdata", splititem[0]);
                                                        var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
                                                        // Remitter[index] = item.Amount
                                                        // setRemitter(Remitter)
                                                        // console.log("need to check Remmitter value___", Remitter)
                                                        // console.log(" NewRimtter value___", NewRemitter)

                                                    }
                                                    else {
                                                        var splititem = item.BudgetHead.split("-")
                                                        // console.log("splitdata", splititem[0]);
                                                        var BudgetH = splititem[0].replace(/(\d{4})(\d{2})(\d{3})(\d{2})(\d+)/, '$1-$2-$3-$4-$5');
                                                    }

                                                    return (
                                                        <View>
                                                            {/* {
                                                                Helper.IsRepeatChallan ?
                                                                    <View style={styles.flatview}>

                                                                        <View style={styles.inputview}>
                                                                            <Text style={[styles.Textview, { color: Colors.inputcolor, }]}>{BudgetH}-{item.schemaname ? item.schemaname : item.SCHEMANAME}</Text>
                                                                        </View>

                                                                        <View style={styles.inputview}>
                                                                            <Text style={styles.Textview}>Enter Amount</Text>
                                                                            <Input
                                                                                placeholder="Enter Amount"
                                                                                style={styles.Textinput}
                                                                                // value={Remitter[index]}
                                                                                value={Number(Remitter[index])}
                                                                                keyboardType="numeric"
                                                                                maxLength={11}
                                                                                // onChangeText={text => onvaluechange(text)}
                                                                                onChangeText={text => {
                                                                                    // let value = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
                                                                                    // console.log("New_remititerr__indexxx__", NewRemitter[index], index)
                                                                                    console.log("in iss______________repeat")

                                                                                    Remitter[index] = text
                                                                                    console.log("valueoftextinput", Remitter);
                                                                                    const arrOfNum = [];

                                                                                    Remitter.forEach(str => {
                                                                                        arrOfNum.push(Number(str));
                                                                                    });
                                                                                    console.log("arrrayofnum__", arrOfNum)
                                                                                    var data = 0
                                                                                    for (var i = 0; i <= arrOfNum[i]; i++) {
                                                                                        data += arrOfNum[i]
                                                                                    }
                                                                                    setTotalAmt(data)
                                                                                    console.log(data)
                                                                                    setRemitter(Remitter)
                                                                                }}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                    : */}

                                                            <View style={styles.flatview}>

                                                                <View style={styles.inputview}>
                                                                    <Text style={[styles.Textview, { color: Colors.inputcolor, }]}>{BudgetH}-{item.schemaname ? item.schemaname : item.SCHEMANAME}</Text>
                                                                </View>
                                                                {console.log("remititerr__indexxx__", Remitter[index], index)
                                                                }
                                                                <View style={styles.inputview}>
                                                                    <Text style={styles.Textview}>Enter Amount</Text>
                                                                    <Input
                                                                        placeholder="Enter Amount"
                                                                        style={styles.Textinput}
                                                                        value={Remitter[index]}
                                                                        // value={Number(Remitter[index])}
                                                                        keyboardType="numeric"
                                                                        maxLength={11}
                                                                        onChangeText={text => onvaluechange(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, ''), index)}
                                                                    // onChangeText={text => {
                                                                    //     let value = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",\s.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')
                                                                    //     console.log("remititerr__indexxx__", Remitter[index], index)
                                                                    //     Remitter[index] = Number(value)
                                                                    //     console.log("valueoftextinput", Remitter);
                                                                    //     const arrOfNum = [];

                                                                    //     Remitter.forEach(str => {
                                                                    //         arrOfNum.push(Number(str));
                                                                    //     });
                                                                    //     console.log("arrrayofnum__", arrOfNum)
                                                                    //     var data = 0
                                                                    //     for (var i = 0; i <= arrOfNum[i]; i++) {
                                                                    //         data += arrOfNum[i]
                                                                    //     }
                                                                    //     setTotalAmt(data)
                                                                    //     console.log(data)
                                                                    //     setRemitter(Remitter)
                                                                    // }}
                                                                    />
                                                                </View>
                                                            </View>
                                                            {/* } */}
                                                        </View>

                                                    )
                                                })
                                            }
                                        </View>
                                    </ScrollView>
                                </View>

                                {Helper.DepartName[0] == 86 ?
                                    <View style={[styles.inputview, { marginTop: 30 }]}>
                                        <Text style={styles.Textview}>Discount</Text>

                                        <Input
                                            placeholder="Enter Discount"
                                            style={styles.Textinput}
                                            value={Discount}
                                            autoCapitalize='characters'
                                            maxLength={10}
                                            keyboardType="number-pad"
                                            onChangeText={text => { setDiscount(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\s\{\}\[\]\\\/'']/gi, '')), seterrors([]) }}
                                            onEndEditing={() => validateEmail()}
                                        />
                                        {
                                            errors.includes('Discount') ?
                                                <Text style={styles.Errortextview}>{Discounterror}</Text> : null
                                        }
                                    </View>
                                    : null
                                }
                                <View style={[styles.inputview, { marginTop: 30 }]}>
                                    {
                                        Discountflag ?
                                            <Text style={styles.Textview}>Net Amount: {DiscountAmt}</Text>
                                            : <Text style={styles.Textview}>Net Amount: {TotalAmt}</Text>

                                    }
                                </View>

                                {
                                    panflag ?
                                        <View style={styles.inputview}>
                                            <Text style={styles.Textview}>Pan Number</Text>

                                            <Input
                                                placeholder="Enter Pan Number"
                                                style={styles.Textinput}
                                                value={Pannumber}
                                                autoCapitalize='characters'
                                                maxLength={10}
                                                onChangeText={text => { setPannumber(text), seterrors([]) }}
                                                onEndEditing={() => validateEmail()}
                                            />
                                            {
                                                errors.includes('Pannumber') ?
                                                    <Text style={styles.Errortextview}>{pancarderror}</Text> : null
                                            }
                                        </View>
                                        : null
                                }




                                <View style={styles.buttonview}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }}>
                                        <Text style={[styles.appButtonText]}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default HeadDetails;


