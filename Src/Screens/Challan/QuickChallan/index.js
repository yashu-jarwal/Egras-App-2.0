import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    Keyboard,
    View,
} from 'react-native';
import BackNavigation from '../../../Lib/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../Component/Color';
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
import Input from '../../../Component/Textinput';
import NetInfo from "@react-native-community/netinfo";

const QuickChallan = () => {
    const navigation = useNavigation();
    const [Department, setDepartment] = useState('')
    const [Service, setService] = useState('')
    const [flag, setflag] = useState(false)
    const [flagS, setflagS] = useState(false)
    const [flagser, setflagser] = useState(false)
    const [flagserS, setflagserS] = useState(false)
    const [DepartmentLIst, setDepartmentList] = useState('')
    const [SearchDept, setSearchDept] = useState('')
    const [SearcServ, setSearchServ] = useState('')
    const [ServiceListarr, setServiceList] = useState('')
    const [loaderVisible, setloaderVisible] = useState(false)

    const [Departmenterror, setDepartmenterror] = useState('')
    const [Serviceerror, setServiceerror] = useState('')
    const [errors, seterrors] = useState([])


    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }

    useEffect(() => {
        console.log("challan useeffect call");
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                Department_Api()
            }
            else {
                hideLoader()
                console.log("fallllllll")
                CommonMethods.showError("Pleae Check Your Internet Connection!")
            }
        })
    }, [])

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
                    console.log(" Department status code is 200");
                    var result = splitdata[1]
                    console.log("resultofdata", JSON.parse(result))
                    setDepartmentList(JSON.parse(result))
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

    const ServiceList_Api = (data) => {
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        // console.log("valuebeforencrpy", finalvar);

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
        Apicall.MainApiMethod(Constant.POST, ApiUrl.ServiceList, bytesTobase64, JSON.stringify(data)).then((resp) => {
            // console.log("respp_servicelist", resp);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Service_list", resp.data);
                var response = resp.data

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                // console.log("aes128dec_Servicelist_data", AES128Decry);

                var splitdata = AES128Decry.substring(11)
                // console.log("splisssssdddd____", splitdata);
                setServiceList(JSON.parse(splitdata))
            }
            else {
                console.log("resopnse fails", resp);
            }

        })
    }



    const renderitem = ({ item, index }) => {
        // console.log("departmentflatlist", item);

        return (
            <View style={styles.flatview}>
                <TouchableOpacity onPress={() => SelectDept(item)}>
                    <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10, marginVertical: 6, marginHorizontal: 10, color: Colors.black }}> {item.deptnameEnglish} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const servicerender = ({ item, index }) => {
        console.log("servicefflt", item);
        return (
            <View style={styles.flatview}>
                <TouchableOpacity onPress={() => serviceselect(item)}>
                    <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10, marginVertical: 6, color: Colors.black }}> {item.ServiceName} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const SelectDept = (value) => {
        console.log("deptselect", value);
        setService('')
        setDepartment(value)
        setflag(false)
        setflagS(false)
        seterrors([])
        Keyboard.dismiss()
        // Service Name api call
        ServiceList_Api(value.DeptCode)
    }
    const serviceselect = (value) => {
        // console.log("seconditem", value);
        setService(value)
        setflagser(false)
        setflagserS(false)
        seterrors([])
        Keyboard.dismiss()

    }

    const onsubmit = () => {
        if (validation()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    showLoader()
                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                    var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                    // console.log("valuebeforencrpy", finalvar);

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(finalvar)
                    // console.log("Serviceencrpyted_Result", AES128Ency);

                    // string To bytes conversion
                    var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                    // console.log("srtingTobytes", stringTobytes);

                    // bytes array to base64 conversion 
                    var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                    // console.log("respp_base64", bytesTobase64)

                    var data = Service.ServiceId;
                    console.log("apidatatatattta_____adfad", data);
                    var senddata
                    if (data) {
                        var splitdata = data.split('|')
                        senddata = splitdata[0]
                    }
                    // console.log("resullllllllt", splitdata[0]);

                    // Service_name api call
                    Apicall.MainApiMethod(Constant.POST, ApiUrl.Challan_Service, bytesTobase64, senddata).then((resp) => {
                        // console.log("respp_Challan", resp.data);
                        hideLoader()
                        if (resp.data) {
                            console.log("ressp_Service_list", resp.data);
                            var response = resp.data

                            //AES 128 Decryption
                            var AES128Decry = Helper.AES_128_Decryption(response)
                            console.log("aes128dec_Challan_data", AES128Decry);

                            var splitdata = AES128Decry.split('|')
                            var msgsplit = splitdata[1].split('*')
                            console.log("msgsplit", msgsplit, "splitdat", splitdata);
                            if (splitdata[0] == rnd && msgsplit[0] == 0) {
                                CommonMethods.showSuccess('Department and Service Details submitted')
                                console.log("insucccesssfffff");
                                Helper.ServiceName = Service
                                Helper.IsNewChallan = Constant.TRUE
                                Helper.IsServiceChallan = Constant.TRUE
                                Helper.ProfileChallan = false
                                Helper.IsRepeatChallan = false
                                navigation.navigate('Treasury', { Dep_Name: Department, Ser_Name: Service })
                            }
                            else if (msgsplit[0] == -2) {
                                CommonMethods.showError("Invalid Data")
                            }
                            else if (msgsplit[0] == 5) {
                                CommonMethods.showError(msgsplit[1])
                            }
                        }
                        else {
                            console.log("resopnse fails", resp);
                            CommonMethods.showError('Something went wrong! please try again')
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
        if (Department == '') {
            error = []
            console.log('Please Select Department');
            // CommonMethods.showError("Please Select Department")
            error.push('Department')
            setDepartmenterror('Please Select Department')
        }
        if (Service == '') {
            console.log('Please Select Service');
            // CommonMethods.showError("Please Select Service")
            error.push('Service')
            setServiceerror('Please Select Service')
        }
        if (error.length) {
            console.log("erorororroro_", error);
            seterrors(error)
            return;
        }
        else {
            Keyboard.dismiss()
            return true
        }
    }
    const searchItems = text => {
        // console.log("textvallll_____", text);

        if (DepartmentLIst) {
            setDepartment(text)
            const newData = DepartmentLIst.filter(item => {
                // console.log("resultifoiterm", item.deptnameEnglish.toUpperCase());
                const itemData = `${item.deptnameEnglish.toUpperCase()}`;
                // console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                // console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            // console.log("newdata__", newData);
            setSearchDept(newData)
            setflagS(true)
            setService('')
            setSearchServ('')
            setServiceList('')
            setflag(false)


        }

    };
    const searchItems1 = text => {
        // console.log("textvallll_____", text);
        setService(text)
        const newData = ServiceListarr.filter(item => {
            // console.log("resultifoiterm", item.ServiceName.toUpperCase());
            const itemData = `${item.ServiceName.toUpperCase()}`;
            // console.log("itemdata_", itemData);
            const textData = text.toUpperCase();
            // console.log("textdata__", textData);
            return itemData.indexOf(textData) > -1;
        });
        // console.log("newdata__", newData);
        setSearchServ(newData)
        setflagserS(true)
        setflagser(false)
    };


    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />

            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.submain}>
                        <View style={styles.headview}>
                            <View style={{ flexDirection: 'row' }}>
                                <BackNavigation navigation={navigation}
                                    MargT={Platform.OS == 'ios' ? 20 : 22}
                                    width={30}
                                    height={30}
                                    MargL={0}
                                />
                                <View style={{ marginTop: 30, flex: 0.8 }}>
                                    <Text style={styles.containsubH}> Quick Challan</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.textview}>Department:</Text>
                                <View style={styles.Dropdownview}>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.input}>{Department.deptnameEnglish ? Department.deptnameEnglish : 'Select Department'}</Text>

                                        <TouchableOpacity onPress={() => { setflag(!flag) }}>
                                            <Image source={flag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>
                                    </View> */}


                                    <View style={[styles.inputview, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.7 }}>
                                            <TextInput
                                                placeholder="Select Department"
                                                style={{ width: 260, fontSize: 14, color: Colors.inputcolor }}
                                                value={Department.deptnameEnglish ? Department.deptnameEnglish : Department}
                                                maxLength={28}
                                                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                                // multiline={true}
                                                returnKeyType="done"
                                                onChangeText={text => { searchItems(text), seterrors([]) }}
                                                onSubmitEditing={() => setflagS(false)}
                                            // onEndEditing={() => validation()}

                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => { setflag(!flag), setflagS(false) }} style={{ flex: 0 }}>
                                            <Image source={flag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>

                                    </View>
                                    {
                                        errors.includes('Department') ?
                                            <Text style={styles.Errortextview}>{Departmenterror}</Text> : null
                                    }
                                </View>

                                {
                                    flagS ? (
                                        <View style={{
                                            height: SearchDept.length > 10 ? 120 : 100
                                        }}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={SearchDept}
                                                renderItem={renderitem}
                                            />
                                        </View>

                                    ) : null
                                }
                                {
                                    flag ? (
                                        <View style={{
                                            height: DepartmentLIst.length > 0 ? 150 : 0
                                        }}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={DepartmentLIst}
                                                renderItem={renderitem}
                                            />
                                        </View>

                                    ) : null
                                }

                            </View>

                            <View>
                                <Text style={[styles.textview, { marginTop: Departmenterror ? 30 : 20 }]}>Service Name:</Text>
                                <View style={styles.Dropdownview}>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.input}>{Service.ServiceName ? Service.ServiceName : 'Select Service Name'}</Text>

                                        <TouchableOpacity onPress={() => { setflagser(!flagser) }}>
                                            <Image source={flagser ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>
                                    </View> */}
                                    <View style={[styles.inputview, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <View style={{ flex: 0.8 }}>
                                            <Input
                                                placeholder="Select Service"
                                                style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
                                                value={Service.ServiceName ? Service.ServiceName : Service}
                                                maxLength={28}
                                                keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                                // multiline={true}
                                                returnKeyType="done"
                                                onChangeText={text => { searchItems1(text), seterrors([]) }}
                                                onSubmitEditing={() => setflagserS(false)}
                                            // onEndEditing={() => validation()}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => { setflagser(!flagser), setflagserS(false) }}>
                                            <Image source={flagser ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>

                                    </View>
                                    {
                                        errors.includes('Service') ?
                                            <Text style={styles.Errortextview}>{Serviceerror}</Text> : null
                                    }
                                </View>
                                {
                                    flagser ? (
                                        <View style={{
                                            height: 150
                                        }}>
                                            <FlatList
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                data={ServiceListarr}
                                                // keyExtractor={(notif) => String()}
                                                renderItem={servicerender}
                                            />
                                        </View>
                                    ) : null
                                }
                                {
                                    flagserS ? (
                                        <View style={{
                                            height: 150
                                        }}>
                                            <FlatList
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                data={SearcServ}
                                                // keyExtractor={(notif) => String()}
                                                renderItem={servicerender}
                                            />
                                        </View>
                                    ) : null
                                }
                            </View>

                            <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }}>
                                        <Text style={[styles.appButtonText]}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>


                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default QuickChallan;