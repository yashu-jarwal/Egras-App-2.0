// import React, { Component, useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     ImageBackground,
//     Text,
//     Image,
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
// import { ScrollView } from 'react-native-gesture-handler';
// import moment from 'moment'
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Constant from '../../../Component/Constant';
// import Helper from '../../../Component/Helper';
// import ApiUrl from '../../../Component/ApiURl';
// import Apicall from '../../../Component/Apicall';
// import base64 from 'react-native-base64';
// import ConvMethods from '../../../Component/Methods';
// import CustomLoader from '../../../Component/CustomLoader';
// import Colors from '../../../Component/Color';
// import { Value } from 'react-native-reanimated';

// const Create_Profile = (props) => {
//     // console.log("props_paydeatils", props.route.params);
//     const navigation = useNavigation();
//     const [Deptflag, setDeptflag] = useState(false)
//     const [Majorflag, setMajorflag] = useState(false)
//     const [Budgetflag, setBudgetflag] = useState(false)

//     const [DepartName, setDepartmentName] = useState('')
//     const [Name, setName] = useState('')
//     const [MajorHead, setMajorHead] = useState('')
//     const [BudgetHead, setBudgetHead] = useState('')

//     const [BudgetHeadtList, setBudgetHeadtList] = useState()
//     const [Budget_HList, setBudget_HList] = useState()
//     const [MajorHeadtList, setMajorHeadList] = useState()
//     const [DepartmentList, setDepartmentList] = useState()
//     const [SelectedBudget, setSelectBudget] = useState()
//     const [BudgetInfo, setBudgetInfo] = useState([])
//     const [Selectflag, setSelectedflag] = useState(false)

//     //Search State
//     const [searchDept, setsearchDept] = useState()
//     const [SearchDeptflag, setSearchDeptflag] = useState(false)
//     const [budgetselect, setbudgetselect] = useState(false)

//     const [districtList, setDistricLIst] = useState('')
//     const [loaderVisible, setloaderVisible] = useState(false)

//     const [Nameerror, setNameerror] = useState('')
//     const [Departmenterror, setDepartmenterror] = useState('')
//     const [MajorHeaderror, setMajorHeaderror] = useState('')
//     const [BudgetHeaderror, setBudgetHeaderror] = useState('')


//     const [errors, seterrors] = useState([])

//     const hideLoader = () => { setloaderVisible(false) }
//     const showLoader = () => { setloaderVisible(true) }

//     var budgetHeadInfo = [];
//     // var BudgetInfo = [{"Schecode": "100001-0", "Schemaname": "0029-00-101-01-00-सरचार्ज के अतिरिक्त भू-राजस्‌व", "isSelect": true}, {"Schecode": "100002-0", "Schemaname": "0029-00-101-02-00-भू-राजस्व पर सरचार्ज", "isSelect": true}, {"Schecode": "100003-0", "Schemaname": "0029-00-103-01-00-भूमि पर पौर कर और उपकर", "isSelect": true}]

//     useEffect(() => {
//         console.log("Profile useeffect call");
//         Department_Api()
//     }, [BudgetHeadtList])

//     const Department_Api = () => {
//         showLoader()
//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//         var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//         // console.log("valuebeforencrpy", finalvar);

//         // Aes 128 encryption
//         var AES128Ency = Helper.AES_128_Encryption(finalvar)
//         // console.log("Challanencrpyted_Result", AES128Ency);

//         // string To bytes conversion
//         var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//         // console.log("srtingTobytes", stringTobytes);

//         // bytes array to base64 conversion 
//         var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//         // console.log("respp_base64", bytesTobase64)

//         // Department api call
//         Apicall.MainApiMethod(Constant.GET, ApiUrl.DepartmentService, bytesTobase64).then((resp) => {
//             // console.log("respppppp", resp);
//             hideLoader()
//             if (resp.data) {
//                 // console.log("ressp_Department list", resp.data);
//                 var response = resp.data.GetServiceDepartmentListResult

//                 //AES 128 Decryption
//                 var AES128Decry = Helper.AES_128_Decryption(response)
//                 // console.log("aes128dec_userdetails", AES128Decry);

//                 var splitdata = AES128Decry.split("|")

//                 if (splitdata[0] == rnd) {
//                     console.log(" Department_profile status code is 200");
//                     var result = splitdata[1]
//                     // console.log("resultofdata", JSON.parse(result))
//                     setDepartmentList(JSON.parse(result))
//                 }
//                 else {
//                     console.log("Department_profile status code is 400");
//                 }
//             }
//             else {
//                 console.log("resopnse fails", resp);
//             }

//         })
//     }
//     const Major_Head_Api = (data) => {
//         console.log("data_____", data);
//         showLoader()
//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//         var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//         console.log("valuebeforencrpy", finalvar);

//         // Aes 128 encryption
//         var AES128Ency = Helper.AES_128_Encryption(finalvar)
//         // console.log("Serviceencrpyted_Result", AES128Ency);

//         // string To bytes conversion
//         var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//         // console.log("srtingTobytes", stringTobytes);

//         // bytes array to base64 conversion 
//         var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//         // console.log("respp_base64", bytesTobase64)

//         // Service_name api call
//         Apicall.MainApiMethod(Constant.POST, ApiUrl.MajorHead, bytesTobase64, JSON.stringify(data)).then((resp) => {
//             console.log("respp_majorhead", resp.data);
//             hideLoader()
//             if (resp.data) {
//                 // console.log("ressp_Service_list", resp.data);
//                 var response = resp.data

//                 //AES 128 Decryption
//                 var AES128Decry = Helper.AES_128_Decryption(response)
//                 // console.log("aes128dec_Servicelist_data", AES128Decry);

//                 var splitdata = AES128Decry.substring(11)
//                 console.log("splisssssdddd____", splitdata);
//                 setMajorHeadList(JSON.parse(splitdata))
//             }
//             else {
//                 console.log("resopnse fails", resp);
//             }

//         })
//     }

//     const Budget_Head_Api = (value) => {
//         console.log("data_____", value, Helper.DepartName);
//         showLoader()
//         // random number generate
//         var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//         // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//         var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//         console.log("valuebeforencrpy", finalvar);

//         // Aes 128 encryption
//         var AES128Ency = Helper.AES_128_Encryption(finalvar)
//         // console.log("Serviceencrpyted_Result", AES128Ency);

//         // string To bytes conversion
//         var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//         // console.log("srtingTobytes", stringTobytes);

//         // bytes array to base64 conversion 
//         var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//         // console.log("respp_base64", bytesTobase64)

//         var data = Helper.DepartName.DeptCode + '|' + value.Majorheadcode
//         // console.log("budgetdataa__", data);

//         // Service_name api call
//         Apicall.MainApiMethod(Constant.POST, ApiUrl.BudgetHeadList, bytesTobase64, JSON.stringify(data)).then((resp) => {
//             // console.log("respp_BudgetHead", resp.data);
//             hideLoader()
//             if (resp.data) {
//                 // console.log("ressp_Service_list", resp.data);
//                 var response = resp.data

//                 //AES 128 Decryption
//                 var AES128Decry = Helper.AES_128_Decryption(response)
//                 // console.log("aes128dec_Servicelist_data", AES128Decry);

//                 var splitdata = AES128Decry.substring(11)
//                 // console.log("splisssssdddd____", splitdata);
//                 setBudgetHeadtList(JSON.parse(splitdata))
//             }
//             else {
//                 console.log("resopnse fails", resp);
//             }

//         })
//     }

//     const onsubmit = () => {
//         if (validation()) {
//             console.log("success");

//             // showLoader()
//             // random number generate
//             var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
//             console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

//             var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
//             console.log("fialvalrof_payee", finalvar);

//             // Aes 128 encryption
//             var AES128Ency = Helper.AES_128_Encryption(finalvar)
//             console.log("Districtencrpyted_Result", AES128Ency);

//             // string To bytes conversion
//             var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
//             console.log("srtingTobytes", stringTobytes);

//             // bytes array to base64 conversion 
//             var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
//             console.log("respp_base64", bytesTobase64)


//             for (var i = 0; i < SelectedBudget.length; i++) {
//                 console.log("SelectedBudget_____", SelectedBudget[i]);
//                 budgetHeadInfo.push({ "BudgedHead": SelectedBudget[i].Schemaname, "ScheCode": SelectedBudget[i].Schecode })

//             }
//             console.log("Finalheadinfor__", budgetHeadInfo);

//             var data = JSON.stringify(budgetHeadInfo) + '|' + Name + '|' + Helper.DepartName.DeptCode

//             console.log("pipline_resdata_", data);


//             //Create New Profile api call
//             Apicall.MainApiMethod(Constant.POST, ApiUrl.CreateNewProfile, bytesTobase64, JSON.stringify(data)).then((resp) => {
//                 console.log("respppppp", resp.data);
//                 hideLoader()
//                 var response = resp.data

//                 //AES 128 Decryption
//                 var AES128Decry = Helper.AES_128_Decryption(response)
//                 console.log("aes128dec_Challandetails", AES128Decry);

//                 var splitdata = AES128Decry.split("|")
//                 console.log("splitdataresult_", splitdata);
//                 if (splitdata[0] == rnd && splitdata[1] == 1) {
//                     console.log("resultofapi_____", splitdata[1]);
//                     CommonMethods.showSuccess("Profile Created Successfully")
//                     navigation.navigate('ProfileList')
//                 }
//                 else {
//                     console.log("Profile not created");
//                     CommonMethods.showSuccess("Profile Not Created")

//                 }

//             })
//         }
//     }
//     const validation = () => {
//         let error = []
//         if (Name == '') {
//             error = []
//             error.push('Name')
//             setNameerror("Please Enter Name")
//             console.log('Please Enter Name');
//         }
//         if (DepartName == '') {
//             console.log('Please Select Department Name');
//             error.push('DepartName')
//             setDepartmenterror("Please Select Department Name")
//         }
//         if (MajorHead == '') {
//             console.log('Please Select MajorHead');
//             error.push('MajorHead')
//             setMajorHeaderror('Please Select MajorHead')
//         }
//         if (SelectedBudget == '') {
//             console.log('Please Select Budget');
//             error.push('SelectedBudget')
//             setBudgetHeaderror("Please Select Budget")
//         }
//         if (error.length) {
//             console.log("erorororroro_", error);
//             seterrors(error)
//             return;
//         }
//         else {
//             return true
//         }
//     }
//     const Department_Search = text => {
//         console.log("textvallll_____", text);

//         if (DepartmentList) {
//             setDepartmentName(text)
//             const newData = DepartmentList.filter(item => {
//                 console.log("resss__", item);
//                 const itemData = `${item.deptnameEnglish.toUpperCase()}`;
//                 console.log("itemdata_", itemData);
//                 const textData = text.toUpperCase();
//                 // console.log("textdata__", textData);
//                 return itemData.indexOf(textData) > -1;
//             });
//             console.log("newdata__", newData);
//             setsearchDept(newData)
//             setSearchDeptflag(true)
//         }

//     };
//     const onDeptselect = (val, index) => {
//         console.log("slecteddd__", val);
//         setMajorHead('')
//         setBudgetHeadtList('')
//         setSelectBudget('')
//         setDepartmentName(val.deptnameEnglish)
//         setDeptflag(false)
//         setSearchDeptflag(false)
//         Helper.DepartName = val

//         //Major_Head_apicall
//         Major_Head_Api(val.DeptCode)
//     }

//     const onMajorHeadSelect = (val) => {
//         setBudgetHeadtList('')
//         setSelectBudget('')
//         console.log("slecteddd__MajorHead", val,);
//         setMajorHead(val.Majorheadname)
//         setMajorflag(false)

//         //Budget_Head_apicall
//         Budget_Head_Api(val)
//     }
//     // const onBudgetSelect = (data) => {

//     //     console.log("slecteddd__budget", data, BudgetHeadtList);
//     //     data.isSelect = !data.isSelect;
//     //     console.log("scheckdatat__", BudgetHeadtList);
//     //     setBudgetInfo([])
//     //     BudgetHeadtList.filter((item) => {
//     //         console.log("filtecalllll_")
//     //         if (item.isSelect == true) {
//     //             console.log("data_set", item)
//     //             // return BudgetInfo.push(item)
//     //             setBudgetInfo(item)

//     //         }
//     //     })
//     //     console.log("resulllll_falll", BudgetInfo, BudgetInfo.length)



//     //     // console.log("filterdatat", SelectedBudgetHead)

//     //     const index = BudgetHeadtList.findIndex(
//     //         item => data.Schemaname === item.Schemaname
//     //     );
//     //     console.log("indexxxxx_valyee", index, BudgetHeadtList);

//     //     BudgetHeadtList[index] = data;

//     //     // this.setState({
//     //     //     dataSource: this.state.dataSource,
//     //     // });
//     //     setBudgetHead(data.Schemaname)
//     //     // console.log("budgetlist__befor", BudgetHeadtList)
//     //     // // setBudgetHeadtList(BudgetHeadtList)
//     //     // setBudget_HList(BudgetHeadtList)
//     //     // console.log("budgetlist__after", Budget_HList)
//     //     // setbudgetselect(!budgetselect)
//     //     // let SelectedBudgetHead = Budget_HList.filter((item) =>
//     //     //     item.isSelect == true
//     //     // )
//     //     // console.log("selectedbudget___itemval", SelectedBudgetHead);
//     //     // console.log("selectedbudget___Lenght", SelectedBudgetHead.length);

//     //     // if (SelectedBudgetHead.length <= 9) {
//     //     //     console.log("in_lenghtselect", SelectedBudgetHead);

//     //     //     setSelectBudget(SelectedBudgetHead)
//     //     // }
//     //     // else {
//     //     //     CommonMethods.showError("You Can Select Max 9 Budget Head")
//     //     // }
//     // }
//     const onBudgetSelect = (data) => {

//         console.log("slecteddd__budget", data, BudgetHeadtList);
//         data.isSelect = !data.isSelect;
//         // data.selectedClass = data.isSelect ? styles.selected : styles.list;

//         const index = BudgetHeadtList.findIndex(
//             item => data.Schemaname === item.Schemaname
//         );
//         console.log("indexxxxx_valyee", index, BudgetHeadtList);

//         BudgetHeadtList[index] = data;
//         setBudgetHead(data.Schemaname)
//         setBudgetHeadtList(BudgetHeadtList)
//         setbudgetselect(!budgetselect)
//         let SelectedBudgetHead = BudgetHeadtList.filter((item) =>
//             item.isSelect == true
//         )
//         console.log("selectedbudget___itemval", SelectedBudgetHead);
//         console.log("selectedbudget___Lenght", SelectedBudgetHead.length);

//         if (SelectedBudgetHead.length <= 9) {
//             console.log("in_lenghtselect", SelectedBudgetHead);

//             setSelectBudget(SelectedBudgetHead)
//         }
//         else {
//             CommonMethods.showError("You Can Select Max 9 Budget Head")
//         }
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
//                                 <Text style={styles.containsubH}>Create New Profile</Text>
//                             </View>
//                         </View>
//                         <KeyboardAvoidingView
//                             behavior={Platform.OS === "ios" ? "padding" : "padding"}
//                             style={{ flex: 1 }}>
//                             <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

//                                 <View style={styles.inputview}>
//                                     <Input
//                                         placeholder="Enter Name"
//                                         style={styles.Textinput}
//                                         value={Name}
//                                         onChangeText={text => { setName(text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
//                                         onEndEditing={() => validation()}
//                                     />
//                                     {
//                                         errors.includes('Name') ?
//                                             <Text style={styles.Errortextview}>{Nameerror}</Text> : null
//                                     }
//                                 </View>

//                                 <View>
//                                     <View style={styles.Dropdownview}>
//                                         {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
//                                         <Text numberOfLines={1} style={styles.input}>{District ? District[0] : 'Select District'}</Text>

//                                         <TouchableOpacity onPress={() => { setDisflag(!Disflag) }}>
//                                             <Image source={Disflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
//                                         </TouchableOpacity>
//                                           </View> */}
//                                         <View style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
//                                             <View style={{ flex: 0.6, }}>
//                                                 <Input
//                                                     placeholder="Select Department"
//                                                     style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
//                                                     value={DepartName}
//                                                     maxLength={30}
//                                                     multiline={true}
//                                                     onEndEditing={() => validation()}
//                                                     onChangeText={text => { Department_Search(text), seterrors([]) }}

//                                                 />
//                                             </View>
//                                             <TouchableOpacity onPress={() => { setDeptflag(!Deptflag) }} >
//                                                 <Image source={Deptflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
//                                             </TouchableOpacity>

//                                         </View>

//                                         {
//                                             errors.includes('DepartName') ?
//                                                 <Text style={styles.Errortextview}>{Departmenterror}</Text> : null
//                                         }
//                                     </View>

//                                     {
//                                         SearchDeptflag ?
//                                             <ScrollView showsVerticalScrollIndicator={false} style={{
//                                                 // height: 200,
//                                                 flex: 1,
//                                             }}>

//                                                 <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown }}>
//                                                     {searchDept.map((element, index) => {
//                                                         console.log("mapdata____", element, index);
//                                                         return (
//                                                             <TouchableOpacity style={styles.flatview} onPress={() => { onDeptselect(element, index), seterrors([]) }}>
//                                                                 <Text>{element.deptnameEnglish}</Text>
//                                                             </TouchableOpacity>
//                                                         );
//                                                     })}
//                                                 </View>
//                                             </ScrollView>
//                                             : null
//                                     }
//                                     {
//                                         Deptflag ?
//                                             <ScrollView showsVerticalScrollIndicator={false} style={{
//                                                 height: 200,
//                                                 flex: 1,
//                                             }}>

//                                                 <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown }}>
//                                                     {DepartmentList.map((element, index) => {
//                                                         console.log("mapdata____", element, index);
//                                                         return (
//                                                             <TouchableOpacity style={styles.flatview} onPress={() => { onDeptselect(element, index), seterrors([]) }}>
//                                                                 <Text>{element.deptnameEnglish}</Text>
//                                                             </TouchableOpacity>
//                                                         );
//                                                     })}
//                                                 </View>
//                                             </ScrollView>

//                                             : null
//                                     }



//                                 </View>
//                                 <View>
//                                     <View style={styles.Dropdownview}>
//                                         <TouchableOpacity style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setMajorflag(!Majorflag), seterrors([]) }}>

//                                             {/* <View style={{ justifyContent:'center',alignItems:'center'}}>
//                                                 <Input
//                                                     placeholder="Select Major Head"
//                                                     style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
//                                                     value={MajorHead}
//                                                     maxLength={35}
//                                                     editable={false}
//                                                     multiline={true}
//                                                     onSubmitEditing={() => { Keyboard.dismiss() }}
//                                                     onChangeText={text => setMajorHead(text)}
//                                                 />


//                                             </View> */}
//                                             <Text numberOfLines={1} style={styles.input}>{MajorHead ? MajorHead : 'Select Major Head'}</Text>

//                                             <View style={{}}>
//                                                 <Image source={Majorflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
//                                             </View>

//                                         </TouchableOpacity>



//                                     </View>
//                                     {
//                                         errors.includes('MajorHead') ?
//                                             <Text style={[styles.Errortextview, { marginHorizontal: 32 }]}>{MajorHeaderror}</Text> : null
//                                     }
//                                     {
//                                         Majorflag ?
//                                             <ScrollView showsVerticalScrollIndicator={false} style={{
//                                                 height: MajorHeadtList ? 200 : 0,
//                                                 flex: 1,
//                                             }}>

//                                                 <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown }}>
//                                                     {MajorHeadtList ? MajorHeadtList.map((element, index) => {
//                                                         console.log("mapdata____", element, index);
//                                                         return (
//                                                             <TouchableOpacity style={styles.flatview} onPress={() => onMajorHeadSelect(element)}>
//                                                                 <Text>{element.Majorheadname}</Text>
//                                                             </TouchableOpacity>
//                                                         );
//                                                     }) : null}
//                                                 </View>
//                                             </ScrollView>

//                                             : null
//                                     }
//                                 </View>
//                                 <View style={{}}>
//                                     {/* <Text style={styles.budgethead}>Select budged head to proceed-</Text> */}
//                                     <View>
//                                         <View style={[styles.Dropdownview, {}]}>
//                                             <TouchableOpacity style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setBudgetflag(!Budgetflag), seterrors([]) }}>

//                                                 <Text numberOfLines={1} style={styles.input}>{BudgetHead ? SelectedBudget.length + " Budget Head Selected" : 'Select Budget Head'}</Text>

//                                                 <View style={{}}>
//                                                     <Image source={Budgetflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
//                                                 </View>

//                                             </TouchableOpacity>


//                                         </View>
//                                         {
//                                             errors.includes('SelectedBudget') ?
//                                                 <Text style={[styles.Errortextview, {marginHorizontal:32}]}>{BudgetHeaderror}</Text> : null
//                                         }
//                                         {
//                                             Budgetflag ?
//                                                 <ScrollView showsVerticalScrollIndicator={false} style={{
//                                                     height: BudgetHeadtList ? 200 : 0,
//                                                     flex: 1,
//                                                 }}>

//                                                     <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown, }}>
//                                                         {BudgetHeadtList ? BudgetHeadtList.map((element, index) => {
//                                                             // console.log("mapdata____", element, index);

//                                                             return (
//                                                                 <View>
//                                                                     {budgetselect ?
//                                                                         <TouchableOpacity style={[styles.flatview, { backgroundColor: element.isSelect ? Colors.buttonColors : Colors.dropdown, }]} onPress={() => onBudgetSelect(element)}>
//                                                                             <Text style={{ color: element.isSelect ? Colors.white : Colors.black, }} >{element.Schemaname}</Text>
//                                                                         </TouchableOpacity>

//                                                                         : <TouchableOpacity style={[styles.flatview, { backgroundColor: element.isSelect ? Colors.buttonColors : Colors.dropdown }]} onPress={() => onBudgetSelect(element)}>
//                                                                             <Text style={{ color: element.isSelect ? Colors.white : Colors.black, }}>{element.Schemaname}</Text>
//                                                                         </TouchableOpacity>
//                                                                     }
//                                                                 </View>

//                                                             );
//                                                         }) : null}
//                                                     </View>
//                                                 </ScrollView>

//                                                 : null
//                                         }
//                                     </View>


//                                 </View>

//                                 <View>

//                                     <Text style={styles.budgethead}>You selected-</Text>
//                                     {
//                                         Budgetflag == false ?
//                                             <View>
//                                                 <ScrollView showsVerticalScrollIndicator={false} style={{
//                                                     height: SelectedBudget ? SelectedBudget.length ? 100 : 0 : null,
//                                                     // height: BudgetInfo.length > 0 ? 100 : 0,

//                                                     flex: 1,
//                                                 }}>

//                                                     <View style={{ marginHorizontal: 30, }}>
//                                                         {SelectedBudget ? SelectedBudget.map((item, index) => {
//                                                             console.log("arrrrr_Data", item, index);
//                                                             return (
//                                                                 <View style={styles.flatview}>
//                                                                     <Text>{item.Schemaname}</Text>
//                                                                 </View>
//                                                             )
//                                                         }) :
//                                                             null
//                                                         }
//                                                     </View>
//                                                 </ScrollView>
//                                             </View>
//                                             : null}



//                                 </View>



//                                 <View style={styles.buttonview}>
//                                     <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
//                                         <Text style={[styles.appButtonText]}>Continue</Text>
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

// export default Create_Profile;

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
import BackNavigation from '../../../Lib/BackNavigation';
import NetInfo from "@react-native-community/netinfo";

import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Input from '../../../Component/Textinput';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Constant from '../../../Component/Constant';
import Helper from '../../../Component/Helper';
import ApiUrl from '../../../Component/ApiURl';
import Apicall from '../../../Component/Apicall';
import base64 from 'react-native-base64';
import ConvMethods from '../../../Component/Methods';
import CustomLoader from '../../../Component/CustomLoader';
import Colors from '../../../Component/Color';
import { Value } from 'react-native-reanimated';

const Create_Profile = (props) => {
    // console.log("props_paydeatils", props.route.params);
    const navigation = useNavigation();
    const [Deptflag, setDeptflag] = useState(false)
    const [Majorflag, setMajorflag] = useState(false)
    const [Budgetflag, setBudgetflag] = useState(false)
    const [clearflag, setclearflag] = useState(false)

    const [DepartName, setDepartmentName] = useState('')
    const [Name, setName] = useState('')
    const [MajorHead, setMajorHead] = useState('')
    const [BudgetHead, setBudgetHead] = useState('')

    const [BudgetHeadtList, setBudgetHeadtList] = useState()
    const [Budget_HList, setBudget_HList] = useState()
    const [MajorHeadtList, setMajorHeadList] = useState()
    const [DepartmentList, setDepartmentList] = useState()
    const [SelectedBudget, setSelectBudget] = useState()
    const [BudgetInfo, setBudgetInfo] = useState([])
    const [Selectflag, setSelectedflag] = useState(false)

    //Search State
    const [searchDept, setsearchDept] = useState()
    const [SearchDeptflag, setSearchDeptflag] = useState(false)
    const [budgetselect, setbudgetselect] = useState(false)

    const [districtList, setDistricLIst] = useState('')
    const [loaderVisible, setloaderVisible] = useState(false)

    const [Nameerror, setNameerror] = useState('')
    const [Departmenterror, setDepartmenterror] = useState('')
    const [MajorHeaderror, setMajorHeaderror] = useState('')
    const [BudgetHeaderror, setBudgetHeaderror] = useState('')


    const [errors, seterrors] = useState([])

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    var budgetHeadInfo = [];
    // var BudgetInfo = [{"Schecode": "100001-0", "Schemaname": "0029-00-101-01-00-सरचार्ज के अतिरिक्त भू-राजस्‌व", "isSelect": true}, {"Schecode": "100002-0", "Schemaname": "0029-00-101-02-00-भू-राजस्व पर सरचार्ज", "isSelect": true}, {"Schecode": "100003-0", "Schemaname": "0029-00-103-01-00-भूमि पर पौर कर और उपकर", "isSelect": true}]

    useEffect(() => {
        console.log("Profile useeffect call");

        Department_Api()

    }, [BudgetHeadtList])

    // useEffect(() => {
    //     console.log("insecond useefffffect_____");
    //     return () => {
    //         if (clearflag) {
    //             console.log("in yashuuncmountttt parttt____________");
    //             setDepartmentName('')
    //             setName('')
    //             setMajorHead('')
    //             setBudgetHead('')
    //             setSelectBudget('')
    //         }
    //     }

    // }, [clearflag])

    const Department_Api = () => {
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        // console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Challanencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        // Department api call
        Apicall.MainApiMethod(Constant.GET, ApiUrl.DepartmentService, bytesTobase64).then((resp) => {
            // console.log("respppppp", resp);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Department list", resp.data);
                var response = resp.data.GetServiceDepartmentListResult

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                // console.log("aes128dec_userdetails", AES128Decry);

                var splitdata = AES128Decry.split("|")

                if (splitdata[0] == rnd) {
                    console.log(" Department_profile status code is 200");
                    var result = splitdata[1]
                    // console.log("resultofdata", JSON.parse(result))
                    setDepartmentList(JSON.parse(result))
                }
                else {
                    console.log("Department_profile status code is 400");
                }
            }
            else {
                console.log("resopnse fails", resp);
            }

        })
    }
    const Major_Head_Api = (data) => {
        console.log("data_____", data);
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Serviceencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        // Service_name api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.MajorHead, bytesTobase64, JSON.stringify(data)).then((resp) => {
            console.log("respp_majorhead", resp.data);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Service_list", resp.data);
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                // console.log("aes128dec_Servicelist_data", AES128Decry);

                var splitdata = AES128Decry.substring(11)
                console.log("splisssssdddd____", splitdata);
                setMajorHeadList(JSON.parse(splitdata))
            }
            else {
                console.log("resopnse fails", resp);
            }

        })
    }

    const Budget_Head_Api = (value) => {
        console.log("data_____", value, Helper.DepartName);
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Serviceencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        var data = Helper.DepartName.DeptCode + '|' + value.Majorheadcode
        // console.log("budgetdataa__", data);

        // Service_name api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.BudgetHeadList, bytesTobase64, JSON.stringify(data)).then((resp) => {
            // console.log("respp_BudgetHead", resp.data);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Service_list", resp.data);
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                // console.log("aes128dec_Servicelist_data", AES128Decry);

                var splitdata = AES128Decry.substring(11)
                // console.log("splisssssdddd____", splitdata);
                setBudgetHeadtList(JSON.parse(splitdata))
            }
            else {
                console.log("resopnse fails", resp);
            }

        })
    }

    const onsubmit = () => {
        if (validation()) {
            console.log("success");
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


                    for (var i = 0; i < SelectedBudget.length; i++) {
                        console.log("SelectedBudget_____", SelectedBudget[i]);
                        budgetHeadInfo.push({ "BudgedHead": SelectedBudget[i].Schemaname, "ScheCode": SelectedBudget[i].schecode })

                    }
                    console.log("Finalheadinfor__", budgetHeadInfo);

                    var data = JSON.stringify(budgetHeadInfo) + '|' + Name + '|' + Helper.DepartName.DeptCode

                    console.log("pipline_resdata_", data);


                    //Create New Profile api call
                    Apicall.MainApiMethod(Constant.POST, ApiUrl.CreateNewProfile, bytesTobase64, JSON.stringify(data)).then((resp) => {
                        console.log("respppppp", resp.data);
                        hideLoader()
                        var response = resp.data

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_Challandetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")
                        console.log("splitdataresult_", splitdata);
                        if (splitdata[0] == rnd && splitdata[1] == 1) {
                            console.log("resultofapi_____", splitdata[1]);
                            CommonMethods.showSuccess("Profile Created Successfully")
                            navigation.navigate('ProfileList')
                            setclearflag(true)
                        }
                        else {
                            console.log("Profile not created");
                            CommonMethods.error("Profile Not Created")

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
    }
    const validation = () => {
        let error = []
        if (Name == '') {
            error = []
            error.push('Name')
            setNameerror("Please Enter Name")
            console.log('Please Enter Name');
        }
        else if (Name.length < 3) {
            error = []
            error.push('Name')
            setNameerror("Profile Name Contain min 3 Charachter")
            console.log('Profile Name Contain min 3 Charachter');
        }
        if (DepartName == '') {
            console.log('Please Select Department Name');
            error.push('DepartName')
            setDepartmenterror("Please Select Department Name")
        }
        if (MajorHead == '') {
            console.log('Please Select MajorHead');
            error.push('MajorHead')
            setMajorHeaderror('Please Select MajorHead')
        }
        if (BudgetHead == '') {
            console.log('Please Select Budget');
            error.push('SelectedBudget')
            setBudgetHeaderror("Please Select Budget Head")
        }
        else if (SelectedBudget.length == 0) {
            console.log('Please Select Budget');
            error.push('SelectedBudget')
            setBudgetHeaderror("Please Select Budget Head")
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
    const Department_Search = text => {
        console.log("textvallll_____", text);

        if (DepartmentList) {
            setDepartmentName(text)
            const newData = DepartmentList.filter(item => {
                console.log("resss__", item);
                const itemData = `${item.deptnameEnglish.toUpperCase()}`;
                console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                // console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            console.log("newdata__", newData);
            setsearchDept(newData)
            setDeptflag(false)
            setSearchDeptflag(true)

            setMajorHead('')
            setBudgetHeadtList('')
            setSelectBudget('')
            setMajorHeadList()
        }

    };
    const onDeptselect = (val, index) => {
        console.log("slecteddd__", val);
        setMajorHead('')
        setBudgetHeadtList('')
        setSelectBudget('')
        setDepartmentName(val.deptnameEnglish)
        setDeptflag(false)
        setSearchDeptflag(false)
        seterrors([])
        Helper.DepartName = val

        //Major_Head_apicall
        Major_Head_Api(val.DeptCode)
    }

    const onMajorHeadSelect = (val) => {
        setBudgetHeadtList('')
        setSelectBudget('')
        console.log("slecteddd__MajorHead", val,);
        setMajorHead(val.Majorheadname)
        setMajorflag(false)

        //Budget_Head_apicall
        Budget_Head_Api(val)
    }
    // const onBudgetSelect = (data) => {

    //     console.log("slecteddd__budget", data, BudgetHeadtList);
    //     data.isSelect = !data.isSelect;
    //     console.log("scheckdatat__", BudgetHeadtList);
    //     setBudgetInfo([])
    //     BudgetHeadtList.filter((item) => {
    //         console.log("filtecalllll_")
    //         if (item.isSelect == true) {
    //             console.log("data_set", item)
    //             // return BudgetInfo.push(item)
    //             setBudgetInfo(item)

    //         }
    //     })
    //     console.log("resulllll_falll", BudgetInfo, BudgetInfo.length)



    //     // console.log("filterdatat", SelectedBudgetHead)

    //     const index = BudgetHeadtList.findIndex(
    //         item => data.Schemaname === item.Schemaname
    //     );
    //     console.log("indexxxxx_valyee", index, BudgetHeadtList);

    //     BudgetHeadtList[index] = data;

    //     // this.setState({
    //     //     dataSource: this.state.dataSource,
    //     // });
    //     setBudgetHead(data.Schemaname)
    //     // console.log("budgetlist__befor", BudgetHeadtList)
    //     // // setBudgetHeadtList(BudgetHeadtList)
    //     // setBudget_HList(BudgetHeadtList)
    //     // console.log("budgetlist__after", Budget_HList)
    //     // setbudgetselect(!budgetselect)
    //     // let SelectedBudgetHead = Budget_HList.filter((item) =>
    //     //     item.isSelect == true
    //     // )
    //     // console.log("selectedbudget___itemval", SelectedBudgetHead);
    //     // console.log("selectedbudget___Lenght", SelectedBudgetHead.length);

    //     // if (SelectedBudgetHead.length <= 9) {
    //     //     console.log("in_lenghtselect", SelectedBudgetHead);

    //     //     setSelectBudget(SelectedBudgetHead)
    //     // }
    //     // else {
    //     //     CommonMethods.showError("You Can Select Max 9 Budget Head")
    //     // }
    // }
    const onBudgetSelect = (data) => {

        console.log("slecteddd__budget", data, BudgetHeadtList);
        data.isSelect = !data.isSelect;
        // data.selectedClass = data.isSelect ? styles.selected : styles.list;

        const index = BudgetHeadtList.findIndex(
            item => data.Schemaname === item.Schemaname
        );
        console.log("indexxxxx_valyee", index, BudgetHeadtList);

        BudgetHeadtList[index] = data;
        setBudgetHead(data.Schemaname)
        setBudgetHeadtList(BudgetHeadtList)
        setbudgetselect(!budgetselect)
        let SelectedBudgetHead = BudgetHeadtList.filter((item) =>
            item.isSelect == true
        )
        console.log("selectedbudget___itemval", SelectedBudgetHead);
        console.log("selectedbudget___Lenght", SelectedBudgetHead.length);

        if (SelectedBudgetHead.length <= 9) {
            console.log("in_lenghtselect", SelectedBudgetHead);

            setSelectBudget(SelectedBudgetHead)
        }
        else {
            CommonMethods.showError("You Can Select Max 9 Budget Head")
        }
    }

    const ondepartselect = (value) => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{
                height: SearchDeptflag ? 200 : 200,
                flex: 1,
            }}>

                <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown }}>
                    {value ? value.map((element, index) => {
                        console.log("mapdata____", element, index);
                        return (
                            <TouchableOpacity style={styles.flatview} onPress={() => { onDeptselect(element, index) }}>
                                <Text>{element.deptnameEnglish}</Text>
                            </TouchableOpacity>
                        );
                    }) : null}
                </View>
            </ScrollView>
        )

    }

    const Createprofile_spacechceck = (val) => {
        var value = val.replace(/[`~!@#$%^&*£¢€©¥°••√π÷×¶∆°°©®™✓()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')

        var format = /[`\s]/;
        let firstChar = value.charAt(0);
        if (format.test(firstChar)) {
            console.log("addisme");
            var str = value.substring(1);
            console.log(str);
            setName(str)
            seterrors([])
        }
        else {
            setName(value)
            seterrors([])
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
                                <Text style={styles.containsubH}>Create New Profile</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                                <View style={styles.inputview}>
                                    <Input
                                        placeholder="Enter Name"
                                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                        style={styles.Textinput}
                                        value={Name}
                                        // onChangeText={text => { setName(text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\{\}\[\]\\\/]/gi, '')), seterrors([]) }}
                                        onChangeText={text => { Createprofile_spacechceck(text) }}

                                    // onEndEditing={() => validation()}
                                    />
                                    {
                                        errors.includes('Name') ?
                                            <Text style={styles.Errortextview}>{Nameerror}</Text> : null
                                    }
                                </View>

                                <View>
                                    <View style={styles.Dropdownview}>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.input}>{District ? District[0] : 'Select District'}</Text>

                                        <TouchableOpacity onPress={() => { setDisflag(!Disflag) }}>
                                            <Image source={Disflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>
                                          </View> */}
                                        <View style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                            <View style={{ flex: 0.6, }}>
                                                <Input
                                                    placeholder="Select Department"
                                                    style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
                                                    value={DepartName}
                                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                                    maxLength={30}
                                                    multiline={true}
                                                    // onEndEditing={() => setDeptflag(false)}
                                                    // onSubmitEditing={() => setDeptflag(false)}
                                                    onChangeText={text => { Department_Search(text) }}

                                                />
                                            </View>
                                            <TouchableOpacity onPress={() => { setDeptflag(!Deptflag), setSearchDeptflag(false) }} >
                                                <Image source={Deptflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </TouchableOpacity>

                                        </View>

                                        {
                                            errors.includes('DepartName') ?
                                                <Text style={styles.Errortextview}>{Departmenterror}</Text> : null
                                        }
                                    </View>

                                    {
                                        SearchDeptflag ?
                                            ondepartselect(searchDept)
                                            : null
                                    }
                                    {
                                        Deptflag ?
                                            ondepartselect(DepartmentList)
                                            : null
                                    }



                                </View>
                                <View>
                                    <View style={styles.Dropdownview}>
                                        <TouchableOpacity style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setMajorflag(!Majorflag), seterrors([]) }}>

                                            {/* <View style={{ justifyContent:'center',alignItems:'center'}}>
                                                <Input
                                                    placeholder="Select Major Head"
                                                    style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
                                                    value={MajorHead}
                                                    maxLength={35}
                                                    editable={false}
                                                    multiline={true}
                                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                                    onChangeText={text => setMajorHead(text)}
                                                />


                                            </View> */}
                                            <Text numberOfLines={1} style={styles.input}>{MajorHead ? MajorHead : 'Select Major Head'}</Text>

                                            <View style={{}}>
                                                <Image source={Majorflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </View>

                                        </TouchableOpacity>



                                    </View>
                                    {
                                        errors.includes('MajorHead') ?
                                            <Text style={[styles.Errortextview, { marginHorizontal: 32 }]}>{MajorHeaderror}</Text> : null
                                    }
                                    {
                                        Majorflag ?
                                            <ScrollView showsVerticalScrollIndicator={false} style={{
                                                height: MajorHeadtList ? 200 : 0,
                                                flex: 1,
                                            }}>

                                                <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown }}>
                                                    {MajorHeadtList ? MajorHeadtList.map((element, index) => {
                                                        console.log("mapdata____", element, index);
                                                        return (
                                                            <TouchableOpacity style={styles.flatview} onPress={() => onMajorHeadSelect(element)}>
                                                                <Text>{element.Majorheadname}</Text>
                                                            </TouchableOpacity>
                                                        );
                                                    }) :
                                                        <Text style={{ textAlign: 'center' }}>No Record Found</Text>

                                                    }
                                                </View>
                                            </ScrollView>

                                            : null
                                    }
                                </View>
                                <View style={{}}>
                                    {/* <Text style={styles.budgethead}>Select budged head to proceed-</Text> */}
                                    <View>
                                        <View style={[styles.Dropdownview, {}]}>
                                            <TouchableOpacity style={[{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setBudgetflag(!Budgetflag), seterrors([]) }}>

                                                <Text numberOfLines={1} style={styles.input}>{BudgetHead ? SelectedBudget.length + " Budget Head Selected" : 'Select Budget Head'}</Text>

                                                <View style={{}}>
                                                    <Image source={Budgetflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                                </View>

                                            </TouchableOpacity>


                                        </View>
                                        {
                                            errors.includes('SelectedBudget') ?
                                                <Text style={[styles.Errortextview, { marginHorizontal: 32, }]}>{BudgetHeaderror}</Text> : null
                                        }
                                        {
                                            Budgetflag ?
                                                <ScrollView showsVerticalScrollIndicator={false} style={{
                                                    height: BudgetHeadtList ? 200 : 0,
                                                    flex: 1,
                                                }}>

                                                    <View style={{ marginHorizontal: 30, backgroundColor: Colors.dropdown, }}>
                                                        {BudgetHeadtList ? BudgetHeadtList.map((element, index) => {
                                                            // console.log("mapdata____", element, index);

                                                            return (
                                                                <View>
                                                                    {budgetselect ?
                                                                        <TouchableOpacity style={[styles.flatview, { backgroundColor: element.isSelect ? Colors.buttonColors : Colors.dropdown, }]} onPress={() => onBudgetSelect(element)}>
                                                                            <Text style={{ color: element.isSelect ? Colors.white : Colors.black, }} >{element.Schemaname}</Text>
                                                                        </TouchableOpacity>

                                                                        : <TouchableOpacity style={[styles.flatview, { backgroundColor: element.isSelect ? Colors.buttonColors : Colors.dropdown }]} onPress={() => onBudgetSelect(element)}>
                                                                            <Text style={{ color: element.isSelect ? Colors.white : Colors.black, }}>{element.Schemaname}</Text>
                                                                        </TouchableOpacity>
                                                                    }
                                                                </View>

                                                            );
                                                        }) : null}
                                                    </View>
                                                </ScrollView>

                                                : null
                                        }
                                    </View>


                                </View>

                                <View>

                                    <Text style={styles.budgethead}>You selected-</Text>
                                    {
                                        Budgetflag == false ?
                                            <View>
                                                <ScrollView showsVerticalScrollIndicator={false} style={{
                                                    height: SelectedBudget ? SelectedBudget.length ? 100 : 0 : null,
                                                    // height: BudgetInfo.length > 0 ? 100 : 0,

                                                    flex: 1,
                                                }}>

                                                    <View style={{ marginHorizontal: 30, }}>
                                                        {SelectedBudget ? SelectedBudget.map((item, index) => {
                                                            console.log("arrrrr_Data", item, index);
                                                            return (
                                                                <View style={styles.flatview}>
                                                                    <Text>{item.Schemaname}</Text>
                                                                </View>
                                                            )
                                                        }) :
                                                            null
                                                        }
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            : null}



                                </View>



                                <View style={styles.buttonview}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
                                        <Text style={[styles.appButtonText]}>Continue</Text>
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

export default Create_Profile;