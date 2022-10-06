import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    Text,
    Image,
    FlatList,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    // KeyboardAwareScrollView,
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
import NetInfo from "@react-native-community/netinfo";

import Input from '../../../Component/Textinput';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
const Treasury = (props) => {
    // console.log("props_value", props.route.params);
    const navigation = useNavigation();
    const [District, setDistrict] = useState('')
    const [Office, setOffice] = useState('')
    const [Treasury, setTreasury] = useState('')
    const [Disflag, setDisflag] = useState(false)
    const [Challaninfo, setChallaninfo] = useState(props.route.params)
    const [Offlag, setOfflag] = useState(false)
    const [Tresflag, setTresflag] = useState(false)
    const [DepartName, setDepartmentName] = useState('')
    const [Treasy, setTreasy] = useState('')
    const [stateval, setstateval] = useState('')

    //Search State
    const [searchDis, setsearchDis] = useState('')
    const [FlagDis, setFlagDis] = useState(false)
    const [searchOff, setsearchOff] = useState('')
    const [Office_flag, setOffice_flag] = useState(false)
    const [SearchTreasury, setsearchTres] = useState('')
    const [TreasuryFlag, setTreasuryFlag] = useState(false)


    const [districtList, setDistricLIst] = useState('')
    const [offiecList, setOfficeList] = useState('')
    const [TreasuryList, setTreasuryList] = useState('')
    const [loaderVisible, setloaderVisible] = useState(false)

    const [Districterror, setDistricterror] = useState('')
    const [Officeerror, setOfficeerror] = useState('')
    const [Treasuryerror, setTreasuryerror] = useState('')
    const [errors, seterrors] = useState([])

    const [RepaetTreasury, setRepaetTreasury] = useState('')

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    useEffect(() => {
        console.log("Treasure useeffect call", Challaninfo);
        console.log("helpervaliii___________", Helper.ServiceName);
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                District_Api()
            }
            else {
                hideLoader()
                console.log("fallllllll")
                CommonMethods.showError("Pleae Check Your Internet Connection!")
            }
        })

    }, [])
    useEffect(() => {
        console.log("statecheangeee_", stateval);
        Treasure_Api(stateval)
    }, [stateval])

    const District_Api = () => {
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Districtencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        if (Helper.ProfileChallan) {
            var profileid = Helper.ServiceName
            console.log("profiileid_check", profileid);

            var data = profileid + '|' + 0 + '|' + Helper.IsNewChallan + '|' + Helper.IsServiceChallan
            console.log("profledata", data);
        }
        else if (Helper.IsRepeatChallan) {
            var profileid = Helper.GrnInfo.GRN
            console.log("profiileid_Repeate_check", profileid);

            var data = profileid + '|' + 0 + '|' + Helper.IsNewChallan + '|' + Helper.IsServiceChallan
            console.log("profledata__repeeate", data);
        }
        else {
            var serviceid = Challaninfo.Ser_Name.ServiceId.split('|')
            console.log("serviceid___", serviceid[0]);

            var data = serviceid[0] + '|' + Challaninfo.Dep_Name.DeptCode + '|' + Helper.IsNewChallan + '|' + Helper.IsServiceChallan
            console.log("datavarrrr_", data);
        }

        // Aes 128 encryption
        var AES128ency_challan = Helper.AES_128_Encryption(data)
        console.log("Districtencrpyted_Result", AES128Ency);

        //Challan api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.ChallanDetails, bytesTobase64, JSON.stringify(AES128ency_challan)).then((resp) => {
            // console.log("respppppp", resp);
            hideLoader()
            var response = resp.data

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)
            // console.log("aes128dec_District_res", AES128Decry);

            var splitdata = AES128Decry.split("|")
            console.log("resoultofsplidata___", splitdata)

            if (splitdata[0] == rnd) {
                // console.log(" District status code is 200", JSON.parse(splitdata[1]));
                setDistricLIst(JSON.parse(splitdata[1]))
                setTreasy(JSON.parse(splitdata[2]))

                var splitval = splitdata[4].split("*")
                console.log("resssplit", splitval)
                Helper.DepartName = splitval
                setDepartmentName(splitval[1])
                console.log("Helper of repeat+++", Helper.IsRepeatChallan);

                if (Helper.IsRepeatChallan) {
                    var profileid_info = splitdata[6]
                    console.log("profilleddddddd_____", profileid_info)
                    Helper.Profileinfo = profileid_info;

                    var Trescodesplit = splitdata[5].split("*")
                    console.log("res_trescodesplit", Trescodesplit)
                    var substring_Dis = Trescodesplit[1].substring(0, 2)
                    console.log("subtsting__var", substring_Dis);
                    JSON.parse(splitdata[1]).filter(data => {
                        console.log("resusss___", data.DistrictList);
                        var districsplit = data.DistrictList.split("_")
                        console.log("resoullll__", districsplit)
                        var districodesplit = districsplit[1].split(",")
                        console.log("preroundd_____", districodesplit);

                        // console.log("finaly found", districodesplit[0], substring_Dis);

                        districodesplit.filter(item => {
                            console.log("item found", item);

                            if (item == substring_Dis) {
                                // setTreasury(data)
                                // console.log("ajmer find");
                                setDistrict(districsplit[0])
                                Office_APi(districsplit[1], Trescodesplit)
                                setRepaetTreasury(Trescodesplit[1])
                            }

                            else {
                                // console.log("noti found");
                            }
                        })


                    });

                }

            }
            else {
                console.log("District status code is 400");
            }

        })
    }

    const Office_APi = (District_Code, officecode) => {
        console.log("helperdeparcode___", Helper.DepartName, District_Code);
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        // console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Districtencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        var data = Helper.DepartName[0] + '|' + District_Code
        console.log("datavarrrr_", data);

        //Challan api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.OfficeList, bytesTobase64, data).then((resp) => {
            // console.log("respppppp", resp);
            hideLoader()
            var response = resp.data

            //AES 128 Decryption
            var AES128Decry = Helper.AES_128_Decryption(response)
            // console.log("aes128dec_Offiecname", AES128Decry);

            var splitdata = AES128Decry.split("|")

            if (splitdata[0] == rnd) {
                console.log(" Office_name status code is 200");
                var result = splitdata[1]
                console.log("resultofoffice__", result);
                setOfficeList(JSON.parse(result))

                if (Helper.IsRepeatChallan) {
                    console.log("res_officecode", officecode)
                    JSON.parse(result).filter(res_officeocde => {
                        // console.log("resusss___officeid", res_officeocde.officeid, officecode[0]);



                        if (officecode[0] == res_officeocde.officeid) {
                            // console.log("office find");
                            setOffice(res_officeocde)
                            Treasure_Api(res_officeocde.officeid, officecode[1])

                        }

                        else {
                            // console.log("office not found");
                        }
                    });

                }
            }
            else {
                console.log("Office_name status code is 400");
            }

        })
    }

    const Treasure_Api = async (data, treasury_code) => {
        console.log("data________va_", data, treasury_code);
        showLoader()
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        // console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        // console.log("Districtencrpyted_Result", AES128Ency);

        // string To bytes conversion
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        // console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        // console.log("respp_base64", bytesTobase64)

        // Challan api call
        Apicall.MainApiMethod(Constant.POST, ApiUrl.TreasuryList, bytesTobase64, data).then((resp) => {
            // console.log("respppppp_treasury", resp);
            hideLoader()
            if (resp.data) {
                // console.log("ressp_Treasury_list", resp.data);

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(resp.data)
                // console.log("aes128dec_treasuryname", AES128Decry);
                var splitdata = AES128Decry.split("|")

                if (splitdata[0] == rnd) {
                    console.log(" Office_name status code is 200");
                    var result = splitdata[1]
                    console.log("Treasury_restult", result);

                    if (Helper.IsRepeatChallan) {
                        setstateval(data)

                        // console.log("res_officecode", Treasy)
                        // var treasuryresp = Treasy.filter(data => {
                        //     return data.TreasuryCode == result
                        // });
                        console.log("data_treadyrycode__", RepaetTreasury);
                        // setTreasury(treasuryresp[0])
                        Treasy.filter(data => {
                            // console.log("data_autoselect___", data);
                            if (data.TreasuryCode == RepaetTreasury) {
                                setTreasury(data)
                            }
                        });
                        setTreasuryList(Treasy)

                    }
                    else {
                        Treasy.filter(data => {
                            console.log("data_treadyrycode__", data);
                            if (data.TreasuryCode == result) {
                                setTreasury(data)
                            }
                        });
                        setTreasuryList(Treasy)
                    }



                }
                else {
                    console.log("Office_name status code is 400");
                }
            }
            else {
                console.log("resopnse fails", resp);
            }

        })
    }


    // District render
    const renderitem = ({ item, index }) => {
        console.log("renderitem_", item);
        var splitdata = item.DistrictList.split("_")
        // console.log("valuesplit__", splitdata[0]);
        return (
            <View style={styles.flatview}>
                <TouchableOpacity onPress={() => Distselect(splitdata)}>
                    <Text style={{ fontSize: 13, marginLeft: 10, marginVertical: 6, color: Colors.black }}> {splitdata[0]} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const Distselect = (value) => {
        console.log("firstitem", value);
        Helper.District = value
        setOffice('')
        setTreasury('')
        setDistrict(value[0])
        setDisflag(false)
        setFlagDis(false)
        //Office apicall
        Office_APi(value[1])
        seterrors([])
    }

    //Office render
    const officerender = ({ item, index }) => {
        console.log("officeflat", item);
        return (
            <View style={styles.flatview}>
                <TouchableOpacity onPress={() => officeselect(item)}>
                    <Text style={{ fontSize: 13, marginLeft: 10, marginVertical: 6, color: Colors.black }}> {item.officename} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const officeselect = (value) => {
        setTreasury('')
        // Keyboard.dismiss()
        console.log("seconditem", value);
        setOffice(value)
        setOfflag(false)
        setOffice_flag(false)
        seterrors([])
        //Treasury apicall
        Treasure_Api(value.officeid)
    }

    //Treasury render
    const Treasuryrender = ({ item, index }) => {
        // console.log("Treasuryflat", item);
        return (
            <View style={styles.flatview}>
                <TouchableOpacity onPress={() => Treasuryselect(item)}>
                    <Text style={{ fontSize: 13, marginLeft: 10, marginVertical: 6, color: Colors.black }}> {item.TreasuryName} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const Treasuryselect = (value) => {
        console.log("thirditem", value);
        setTreasury(value)
        setTresflag(false)
        setTreasuryFlag(false)
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
                    // console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                    var headervar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                    // console.log("valuebeforencrpy", headervar);

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(headervar)
                    // console.log("Serviceencrpyted_Result", AES128Ency);

                    // string To bytes conversion
                    var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                    // console.log("srtingTobytes", stringTobytes);

                    // bytes array to base64 conversion 
                    var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                    // console.log("respp_base64", bytesTobase64)

                    var finalvar = Office.officeid + '|' + Treasury.TreasuryCode + '|' + Helper.userchallanstatus
                    console.log("finalvaroftreasury", finalvar);


                    // Service_name api call
                    Apicall.MainApiMethod(Constant.POST, ApiUrl.DivisionList, bytesTobase64, finalvar).then((resp) => {
                        console.log("respp_Treasury", resp.data);
                        hideLoader()
                        if (resp.data) {
                            var response = resp.data

                            //AES 128 Decryption
                            var AES128Decry = Helper.AES_128_Decryption(response)
                            console.log("aes128dec_Challan_data", AES128Decry);

                            var splitdata = AES128Decry.split('|')
                            console.log("splitdat", splitdata);
                            if (splitdata[0] == rnd) {
                                CommonMethods.showSuccess('Treasury Details submitted successfully',)
                                navigation.navigate('PayDetails', { District: District, Office: Office, Treasury: Treasury, DivisionList: splitdata[1] })
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
        if (District == '') {
            error = []
            console.log('Please Select District');
            error.push('District')
            setDistricterror('Please Select District')
            // CommonMethods.showError("Please Select District")
        }
        if (Office == '') {
            console.log('Please Select Office');
            error.push('Office')
            setOfficeerror('Please Select Office')
            // CommonMethods.showError("Please Select Office")
        }
        if (Treasury == '') {
            console.log('Please Select Treasury');
            error.push('Treasury')
            setTreasuryerror('Please Select Treasury')
            // CommonMethods.showError("Please Select Treasury")
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

    const District_Search = text => {
        console.log("textvallll_____", text);

        if (districtList) {
            setDistrict(text)
            const newData = districtList.filter(item => {
                console.log("districtsearch_res", item);
                const itemData = `${item.DistrictList.toUpperCase()}`;
                console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                // console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            console.log("newdata__", newData);
            setsearchDis(newData)
            setFlagDis(true)
            setOffice('')
            setOfficeList('')
            setTreasury('')

            setDisflag(false)
        }

    };
    const Office_Search = text => {
        console.log("textvallll_____", text);

        if (offiecList) {
            setOffice(text)
            const newData = offiecList.filter(item => {
                console.log("Office_search_res", item);
                const itemData = `${item.officename.toUpperCase()}`;
                console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                // console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            console.log("newdata__", newData);
            setsearchOff(newData)
            setOffice_flag(true)
        }

    };
    const Treasury_Search = text => {
        console.log("textvallll_____", text);

        if (TreasuryList) {
            setTreasury(text)
            const newData = TreasuryList.filter(item => {
                console.log("Office_search_res", item);
                const itemData = `${item.TreasuryName.toUpperCase()}`;
                console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                // console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            console.log("newdata__", newData);
            setsearchTres(newData)
            setTreasuryFlag(true)
        }

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
                                    <Text style={styles.containsubH}> Select Treasury</Text>
                                </View>
                            </View>

                            <View style={styles.headingview}>
                                <Text style={{ fontSize: 15, paddingHorizontal: 20, textAlign: 'center', color: 'white', width: '100%' }}>{DepartName}</Text>
                            </View>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                <View>
                                    <Text style={styles.textview}>District:</Text>
                                    <View style={styles.Dropdownview}>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.input}>{District ? District[0] : 'Select District'}</Text>

                                        <TouchableOpacity onPress={() => { setDisflag(!Disflag) }}>
                                            <Image source={Disflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>
                                    </View> */}
                                        <View style={[styles.inputview, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
                                            <View style={{ flex: 0.8 }}>
                                                <Input
                                                    placeholder="Select District"
                                                    style={{ width: 300, fontSize: 14, color: Colors.inputcolor }}
                                                    value={District}
                                                    maxLength={40}
                                                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                                    // multiline={true}
                                                    onChangeText={text => { District_Search(text), seterrors([]) }}
                                                // onSubmitEditing={() => validation()}
                                                />
                                            </View>
                                            <TouchableOpacity onPress={() => { setDisflag(!Disflag), setFlagDis(false) }}>
                                                <Image source={Disflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </TouchableOpacity>

                                        </View>
                                        {
                                            errors.includes('District') ?
                                                <Text style={styles.Errortextview}>{Districterror}</Text> : null
                                        }
                                    </View>
                                    {
                                        FlagDis ? (
                                            <View style={{
                                                height: searchDis.length > 0 ? 100 : 0
                                            }}>
                                                <FlatList
                                                    nestedScrollEnabled
                                                    showsVerticalScrollIndicator={false}
                                                    data={searchDis}
                                                    renderItem={renderitem}
                                                />
                                            </View>

                                        ) : null
                                    }

                                    {
                                        Disflag ? (
                                            <View style={{
                                                height: districtList.length > 0 ? 150 : 0
                                            }}>
                                                <FlatList
                                                    showsVerticalScrollIndicator={false}
                                                    nestedScrollEnabled
                                                    data={districtList}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={renderitem}
                                                />
                                            </View>
                                        ) : null
                                    }

                                </View>

                                <View>
                                    <Text style={[styles.textview, { marginTop: Districterror ? 30 : 20 }]}>Office Name:</Text>
                                    <View style={styles.Dropdownview}>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.input}>{Office ? Office.officename : 'Select Office Name'}</Text>

                                        <TouchableOpacity onPress={() => { setOfflag(!Offlag) }}>
                                            <Image source={Offlag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                        </TouchableOpacity>
                                    </View> */}
                                        <TouchableOpacity style={[styles.inputview, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setOfflag(!Offlag) }}>
                                            {/* <View style={{ flex: 0.8 }}>
                                                <Input
                                                    placeholder="Select Office"
                                                    style={{ width: 300, fontSize: 12, color: Colors.inputcolor }}
                                                    value={Office.officename ? Office.officename : Office}
                                                    maxLength={40}
                                                    multiline={true}
                                                    onChangeText={text => Office_Search(text)}
                                                />
                                            </View> */}
                                            <Text numberOfLines={1} style={styles.input}>{Office ? Office.officename : 'Select Office'}</Text>

                                            <View >
                                                <Image source={Offlag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </View>

                                        </TouchableOpacity>

                                        {
                                            errors.includes('Office') ?
                                                <Text style={[styles.Errortextview, { marginTop: 25, height: 50 }]}>{Officeerror}</Text> : null
                                        }
                                    </View>

                                    {
                                        Offlag ? (
                                            <View style={{
                                                height: offiecList.length > 0 ? 120 : 0
                                            }}>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    data={offiecList}
                                                    nestedScrollEnabled={true}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={officerender}
                                                />
                                            </View>
                                        ) : null
                                    }
                                    {/* {
                                        Office_flag ? (
                                            <View style={{
                                                height: searchOff.length > 0 ? 80 : 0
                                            }}>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    data={searchOff}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={officerender}
                                                />
                                            </View>
                                        ) : null
                                    } */}
                                </View>

                                <View>
                                    <Text style={[styles.textview, { marginTop: Officeerror ? 30 : 20 }]}>Treasury:</Text>
                                    <View style={styles.Dropdownview}>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                                            <Text numberOfLines={1} style={styles.input}>{Treasury ? Treasury.TreasuryName : 'Select Treasury'}</Text>

                                            <TouchableOpacity onPress={() => { setTresflag(!Tresflag) }}>
                                                <Image source={Tresflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </TouchableOpacity>
                                        </View> */}
                                        <TouchableOpacity style={[styles.inputview, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }]} onPress={() => { setTresflag(!Tresflag), setTreasuryFlag(false) }}>
                                            {/* <View style={{ flex: 0.8 }}>
                                                <Input
                                                    placeholder="Select Treasury"
                                                    style={{ width: 300, fontSize: 12, color: Colors.inputcolor }}
                                                    value={Treasury.TreasuryName ? Treasury.TreasuryName : Treasury}
                                                    maxLength={40}
                                                    // multiline={true}
                                                    onChangeText={text => { Treasury_Search(text), seterrors([]) }}
                                                />
                                            </View> */}
                                            <Text numberOfLines={1} style={styles.input}>{Treasury ? Treasury.TreasuryName : 'Select Treasury'}</Text>

                                            <View onPress={() => { setTresflag(!Tresflag), setTreasuryFlag(false) }}>
                                                <Image source={Tresflag ? images.Uparrow : images.Droparrow} resizeMode="cover" style={styles.Dropdown} />
                                            </View>

                                        </TouchableOpacity>
                                        {
                                            errors.includes('Treasury') ?
                                                <Text style={[styles.Errortextview, { marginTop: 20 }]}>{Treasuryerror}</Text> : null
                                        }
                                    </View>
                                    {/* {
                                        TreasuryFlag ? (
                                            <View style={{
                                                height: SearchTreasury.length > 0 ? 120 : 0
                                            }}>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    data={SearchTreasury}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={Treasuryrender}
                                                />
                                            </View>
                                        ) : null
                                    } */}
                                    {
                                        Tresflag ? (
                                            <View style={{
                                                height: TreasuryList.length > 0 ? 150 : 0
                                            }}>
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    nestedScrollEnabled
                                                    data={TreasuryList}
                                                    // keyExtractor={(notif) => String()}
                                                    renderItem={Treasuryrender}
                                                />
                                            </View>
                                        ) : null
                                    }

                                </View>

                                {/* <View style={styles.buttonview}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }}>
                                        <Text style={[styles.appButtonText]}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                                <View style={styles.buttonview}>
                                    <TouchableOpacity style={styles.appButtonContainer} onPress={() => { onsubmit() }} >
                                        <Text style={[styles.appButtonText]}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAwareScrollView>

                        </View>


                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Treasury;

