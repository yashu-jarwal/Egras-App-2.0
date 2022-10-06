import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    RefreshControl,
    Image,
    Keyboard,
    ImageBackground, TextInput,
    Alert,
    View,
} from 'react-native';
import styles from './styles'
import images from '../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import Constant from '../../Component/Constant';
import Helper from '../../Component/Helper';
import ApiUrl from '../../Component/ApiURl';
import Apicall from '../../Component/Apicall';
import CustomLoader from '../../Component/CustomLoader'
import Colors from '../../Component/Color';
import TransactionList from '../../Component/CustomeFlatlist'
import base64 from 'react-native-base64';
import ConvMethods from '../../Component/Methods';
import Buffer from 'buffer'
import CryptoJS from 'react-native-crypto-js';
import String from '../../Component/String';
import CommonMethods from '../../Lib/CommonMethods';
import AsyncStorageHelper from '../../Lib/AsyncStoreageHelper';
import NetInfo from "@react-native-community/netinfo";


const Home = (props) => {
    const [refreshing, setrefreshing] = useState(false)
    const [loaderVisible, setloaderVisible] = useState(false)
    const navigation = useNavigation();
    const [name, setname] = useState('')
    const [Grn_val, setGrN] = useState('')
    // var arrdata = []
    const [TransLIst, setTransLIst] = useState()

    const ManuList = [{ img: images.CreateProfile, title: 'Create Profile', }, { img: images.ProfileList, title: 'Profile List', }, { img: images.QuickChallan, title: 'Quick Challan' }]

    const OpenManu = async () => {
        // await AsyncStorageHelper.setData("isloads", false)
        props.navigation.openDrawer()
    }
    const hideLoader = () => { setloaderVisible(false) }

    const showLoader = () => { setloaderVisible(true) }

    const renderitem = ({ item, index }) => {
        // console.log("flatlist", item.img);
        return (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => onselect(item.title)}>
                <View style={styles.imagecomp}>
                    <Image resizeMode='contain' style={styles.options} source={item.img} />
                </View>
                <View>
                    <Text style={{ color: Colors.appcolor, fontSize: 13, marginTop: 10, }}> {item.title} </Text>
                </View>
            </TouchableOpacity>

        )
    }

    const onselect = (value) => {
        console.log("Homeoption", value);
        if (value == 'Quick Challan') {
            navigation.navigate('Challan')
        }
        else if (value == 'Create Profile') {
            navigation.navigate('CreateProfile')
        }
        else if (value = 'Profile List') {
            navigation.navigate('ProfileList')
        }
    }

    useEffect(() => {
        console.log("useeffect call");
        AsyncStorageHelper.getData(Constant.TOKEN).then((resp) => {
            console.log("respvoflocal", resp);
            if (resp) {
                Helper.user_token = resp;
            }
        })
        apicall()
    }, [])

    const Top10Transaction_api = () => {
        console.log("top 10 trensaction call api");
        // random number generate
        var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
        console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

        var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
        console.log("valuebeforencrpy", finalvar);

        // Aes 128 encryption
        var AES128Ency = Helper.AES_128_Encryption(finalvar)
        console.log("Dashboardencrpyted_Result", AES128Ency);

        // string To bytes conversion
        console.log("stripirr", AES128Ency.length)
        var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
        console.log("srtingTobytes", stringTobytes);

        // bytes array to base64 conversion 
        var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
        console.log("respp_base64", bytesTobase64)
        // top 10 transaction list api call
        Apicall.MainApiMethod(Constant.GET, ApiUrl.Transactionlist, bytesTobase64).then((resp) => {
            if (resp.data) {
                setrefreshing(false)
                // console.log("resp_top10transaction", resp.data);
                var response = resp.data.GetLastTransactionsListResult

                //AES 128 Decryption
                var AES128Decry = Helper.AES_128_Decryption(response)
                // console.log("aes128dec_transaction", AES128Decry);

                var splitdata = AES128Decry.split("|")
                // console.log("reslultttt", splitdata);

                if (splitdata[0] == rnd) {
                    console.log(" transaction list status code is 200");
                    var result = splitdata[1]
                    setTransLIst(JSON.parse(result))
                }
                else {
                    console.log("userdetails status code is 400");
                }
            }
            else {
                setrefreshing(false)
            }

        })
    }

    const apicall = async () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                // random number generate
                var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                console.log("valuebeforencrpy", finalvar);

                // Aes 128 encryption
                var AES128Ency = Helper.AES_128_Encryption(finalvar)
                console.log("Dashboardencrpyted_Result", AES128Ency);

                // string To bytes conversion
                console.log("stripirr", AES128Ency.length)
                var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                console.log("srtingTobytes", stringTobytes);

                // bytes array to base64 conversion 
                var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                console.log("respp_base64", bytesTobase64)

                // user details api call
                Apicall.MainApiMethod(Constant.GET, ApiUrl.GetUserDetail, bytesTobase64).then((resp) => {
                    if (resp.data) {
                        setrefreshing(false)
                        // console.log("ressp_getuserdeatils", resp.data);
                        var response = resp.data.GetFullNameResult

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_userdetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")

                        if (splitdata[0] == rnd) {
                            // console.log(" userdetails status code is 200");
                            var result = splitdata[1]
                            JSON.parse(result).map((element, index) => {
                                // console.log("mapview", element.FirstName);
                                var FullName = element.FirstName + ' ' + element.LastName
                                // console.log("fulll name", FullName);
                                Helper.userProfile = FullName;
                                setname(FullName)
                            })
                            Top10Transaction_api()
                        }
                        else {
                            console.log("userdetails status code is 400");
                        }
                    }
                    else {
                        setrefreshing(false)
                    }

                })
            }

            else {
                setrefreshing(false)
                console.log("fallllllll")
                CommonMethods.showError("Pleae Check Your Internet Connection!")
            }
        })

    }

    const GRN_validateion = () => {
        if (Grn_val == '') {
            CommonMethods.showError("Please Enter GRN To Search")
            return false
        }
        else if (Grn_val.startsWith("0") === true) {
            console.log("GRN Number Not Start With 0")
            CommonMethods.showError("GRN Number Not Start with 0")
        }
        else {
            return true
        }
    }

    const SearchGrN_apicall = async () => {
        if (GRN_validateion()) {
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == true) {
                    console.log("serach_grnval", Grn_val)
                    // random number generate
                    var rnd = Math.floor(Math.random() * 9000000000) + 1000000000;
                    console.log("Random number", rnd, Helper.user_token, Helper.User_Mpin);

                    var finalvar = Helper.user_token + ':' + rnd + Helper.User_Mpin
                    console.log("valuebeforencrpy", finalvar);

                    // Aes 128 encryption
                    var AES128Ency = Helper.AES_128_Encryption(finalvar)
                    console.log("Dashboardencrpyted_Result", AES128Ency);

                    // string To bytes conversion
                    console.log("stripirr", AES128Ency.length)
                    var stringTobytes = ConvMethods.StringToBytes(AES128Ency)
                    console.log("srtingTobytes", stringTobytes);

                    // bytes array to base64 conversion 
                    var bytesTobase64 = base64.encodeFromByteArray(stringTobytes)
                    console.log("respp_base64", bytesTobase64)


                    // Search GRN api call
                    Apicall.MainApiMethod(Constant.POST, ApiUrl.SearchGRN, bytesTobase64, JSON.stringify(Grn_val)).then((resp) => {
                        console.log("respooo_grnsearch", resp.data);
                        if (resp.data) {
                            setrefreshing(false)
                            // console.log("resp_top10transaction", resp.data);
                            var response = resp.data

                            //AES 128 Decryption
                            var AES128Decry = Helper.AES_128_Decryption(response)
                            // console.log("aes128dec_transaction", AES128Decry);

                            var splitdata = AES128Decry.split("|")
                            console.log("reslultttt_grnSerach", splitdata);

                            if (splitdata[0] == rnd) {
                                console.log(" SearchGRN status code is 200", splitdata[1]);
                                var result = splitdata[1]
                                var data = JSON.parse(result)
                                console.log("apiarray fails", data.length);

                                if (data.length > 0) {
                                    console.log("resulltttttttt__fffff");
                                    setTransLIst(JSON.parse(result))

                                }
                                else {
                                    console.log("failllllfsdfasd");
                                    setTransLIst('')
                                }
                            }
                            else {
                                console.log("userdetails status code is 400");
                            }
                        }
                        else {
                            setrefreshing(false)
                        }

                    })
                }
                else {
                    setrefreshing(false)
                    console.log("fallllllll")
                    CommonMethods.showError("Pleae Check Your Internet Connection!")
                }
            })
        }
    }

    const _onRefresh = () => {
        setrefreshing(true)
        apicall()
        setGrN('')
    }

    const GRN_Apicall = (data) => {
        console.log("success", data);
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
                Apicall.MainApiMethod(Constant.POST, ApiUrl.GRN_Repeatability, bytesTobase64, JSON.stringify(data.GRN)).then((resp) => {
                    console.log("respppppp_grnapicall", resp.data);
                    hideLoader()
                    var response = resp.data

                    //AES 128 Decryption
                    var AES128Decry = Helper.AES_128_Decryption(response)
                    console.log("aes128dec_Repeat_Challan", AES128Decry);

                    var splitdata = AES128Decry.split("|")
                    console.log("splitdataresult_", splitdata);
                    var splitres = splitdata[1].split('*')
                    if (splitdata[0] == rnd && splitres[0] == 0) {
                        console.log("resultofapi_____RepeatGRN", splitres[0]);
                        // CommonMethods.showSuccess("Repeat Trasaction Successfully")
                        Helper.IsRepeatChallan = true
                        Helper.IsServiceChallan = Constant.FALSE
                        Helper.IsNewChallan = Constant.FALSE
                        Helper.ProfileChallan = false
                        Helper.GrnInfo = data

                        navigation.navigate('Treasury')
                    }
                    else if (splitdata[0] == rnd && splitres[0] == 2) {
                        console.log("resultofapi_____RepeatGRN_whenreturn 2", splitres[0]);
                        // CommonMethods.showSuccess("Repeat Trasaction Successfully")
                        Helper.IsRepeatChallan = true
                        Helper.IsServiceChallan = Constant.FALSE
                        Helper.IsNewChallan = Constant.FALSE
                        Helper.ProfileChallan = false
                        Helper.GrnInfo = data
                        navigation.navigate('Treasury')

                    }
                    else if (splitres[0] == 1) {
                        CommonMethods.showError("Cannot Repeat GRN! Please try after sometime")
                    }
                    else if (splitres[0] == 3) {
                        CommonMethods.showError("Cannot Repeat CTD Challan")
                    }
                    else if (splitres[0] == 5) {
                        CommonMethods.showError("Above 8000 budget head Challan Not Repeat")
                    }
                    else {
                        console.log("Repeat Trasaction fail", splitres[1]);
                        CommonMethods.showError("Repeat Trasaction fail " + splitres[1])
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
    const onbuttonpress = (value) => {
        console.log("valueeeee__", value)
        if (value.Status == 'Success') {
            Alert.alert(
                String.AppName,
                String.View_Repeat,
                [
                    { text: 'cancel'},

                    { text: 'View', onPress: () => { navigation.navigate('ViewChallan', { Data: value.GRN }) } },

                    { text: 'Repeat', onPress: () => { GRN_Apicall(value) } },
                ],
                { cancelable: false }
            )
        }
        else {
            Alert.alert(
                String.AppName,
                String.Repeat,
                [
                    { text: 'cancel' },

                    { text: 'Repeat', onPress: () => { GRN_Apicall(value) } },
                ],
                { cancelable: false }
            )
        }
    }

    return (
        <SafeAreaView>
            <CustomLoader loaderVisible={loaderVisible} />

            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <TouchableOpacity onPress={() => { OpenManu() }} style={styles.humburger} >
                        <Image resizeMode='cover' style={styles.Headingimg} source={images.drawer} />
                    </TouchableOpacity>
                    <Image resizeMode='contain' style={styles.govticon} source={images.govticon} />
                </View>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }>

                    <View style={styles.headtextview}>
                        <Text style={[styles.containsubH, { fontWeight: 'bold', }]}> Welcome </Text>
                        <Text style={[styles.containsubH, { fontSize: 20, top: 4 }]}>{name}</Text>
                    </View>

                    <View style={[styles.centercomp, { height: 50, flexDirection: 'row', borderRadius: 5 }]}>
                        <View style={{ marginRight: 30 }}>
                            <TextInput
                                style={styles.input}
                                // textAlign={'center'}
                                placeholder="Search GRN"
                                value={Grn_val}
                                // multiline={true}
                                placeholderTextColor={"#BBBBBB"}
                                keyboardType="numeric"
                                onChangeText={(text) => { setGrN(text.replace(/[`~a-z!@#$%^&*()_|+\-=?;:'",.<>«≤‹⟨⟩»≥›\s\{\}\[\]\\\/'']/gi, '')) }}
                                onSubmitEditing={() => GRN_validateion()}
                                onEndEditing={console.log("tounchhhh")}
                            />
                        </View>

                        <TouchableOpacity style={{ justifyContent: 'center', right: 0, position: 'absolute', alignSelf: 'flex-end', backgroundColor: Colors.buttonColors, height: 50, width: 70 }} onPress={() => SearchGrN_apicall()} >
                            <Image resizeMode='contain' style={styles.searchimg} source={images.Search} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centercomp}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            horizontal
                            data={ManuList}
                            // keyExtractor={(notif) => String()}
                            renderItem={renderitem}
                        />
                    </View>

                    <View style={{ marginVertical: 25, marginLeft: 15 }}>
                        <Text style={{
                            fontSize: 25,
                            color: '#24B6CE'
                        }}> Latest Transactions </Text>
                    </View>
                    <View style={styles.Translist}>
                        <View style={[styles.borderline, { marginTop: 10 }]}>
                        </View>
                        <View style={[styles.borderline, { width: '10%', borderBottomColor: '#90D0CF' }]}>
                        </View>
                        {
                            TransLIst ?
                                <View>

                                    <View>

                                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{
                                            // height: 300,
                                            // marginTop: 30
                                            // flex: ,
                                        }}>
                                            {TransLIst ? TransLIst.map((element, index) => {
                                                // console.log("arrrrr_Data", element, index);
                                                return (
                                                    <TouchableOpacity style={styles.listview} onPress={() => { onbuttonpress(element) }}>
                                                        <View style={{ flex: .6, marginVertical: 10, paddingLeft: 20 }}>
                                                            <Text style={[styles.textinput, { fontSize: 18 }]}>{element.GRN}</Text>
                                                            <View style={{ flexDirection: 'row', flex: 0.5 }}>
                                                                <Text style={[styles.textinput, { fontSize: 13, fontWeight: 'bold' }]}>{element.Status}</Text>
                                                                <Text style={[styles.textinput, { fontSize: 13 }]}> {element.ChallanDate}</Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <View style={{ flexDirection: 'row', marginRight: 10, }}>
                                                                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                                                                    <Text style={[styles.textinput, { paddingLeft: 50 }]}>{element.TotalAmount}</Text>
                                                                </View>
                                                                <View style={{ marginVertical: 10 }}>
                                                                    <Text style={[styles.textinput, { marginLeft: 0 }]}>₹ </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 15, }}>
                                                                <Image source={images.Rightarrow} resizeMode="contain" style={{ height: 20, width: 20, bottom: 5, tintColor: Colors.appcolor }} />
                                                            </View>
                                                        </View>



                                                    </TouchableOpacity>
                                                );
                                            }) : null}

                                        </ScrollView>
                                    </View>

                                </View>


                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>No Record Found</Text>
                                </View>
                        }
                    </View>
                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    );


};

export default Home;
