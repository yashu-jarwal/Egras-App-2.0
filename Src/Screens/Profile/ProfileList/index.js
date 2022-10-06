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
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import images from '../../../Component/Imagepath';
import CommonMethods from '../../../Lib/CommonMethods';
import Input from '../../../Component/Textinput';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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
import NetInfo from "@react-native-community/netinfo";

const Profile_list = (props) => {
    // console.log("props_paydeatils", props.route.params);
    const navigation = useNavigation();
    const [itemflag, setitemflag] = useState(false)

    const [loaderVisible, setloaderVisible] = useState(false)
    const [profilesarch, setprofilesarch] = useState('')

    const [array, setarray] = useState('')
    const [ProfileSchema, setProfileSchema] = useState()
    const [SchemaInfo, setSchemaInfo] = useState()

    //Proifle search
    const [FlagProfile, setFlagProifle] = useState(false)
    const [searchProfile, setsearchProfile] = useState()

    const hideLoader = () => { setloaderVisible(false) }
    const showLoader = () => { setloaderVisible(true) }

    useEffect(() => {
        console.log("Get Profile useeffect call");
        ProfileList_Api();
    }, [])

    var Profileid;

    const ProfileList_Api = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
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

                // ProfileList api call
                Apicall.MainApiMethod(Constant.GET, ApiUrl.GetProfileLIst, bytesTobase64).then((resp) => {
                    console.log("respppppp", resp);
                    hideLoader()
                    if (resp.data) {
                        // console.log("ressp_Department list", resp.data);
                        var response = resp.data.GetUserProfileListResult

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        console.log("aes128dec_userdetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")

                        if (splitdata[0] == rnd) {
                            console.log(" profileList status code is 200");
                            var result = splitdata[1]
                            console.log("resultofdata", JSON.parse(result))
                            setarray(JSON.parse(result))
                        }
                        else {
                            console.log("profileList status code is 400");
                        }
                    }
                    else {
                        console.log("resopnse fails", resp);
                    }

                })

                // ProfileSchema api call
                Apicall.MainApiMethod(Constant.GET, ApiUrl.SchemaName, bytesTobase64).then((resp) => {
                    // console.log("respppppp", resp);
                    hideLoader()
                    if (resp.data) {
                        // console.log("ressp_Department list", resp.data);
                        var response = resp.data.FillUserSchemaResult

                        //AES 128 Decryption
                        var AES128Decry = Helper.AES_128_Decryption(response)
                        // console.log("aes128dec_userdetails", AES128Decry);

                        var splitdata = AES128Decry.split("|")

                        if (splitdata[0] == rnd) {
                            console.log(" profileList_Schema status code is 200");
                            var result = splitdata[1]
                            // console.log("resultofprofileschema", JSON.parse(result))
                            setProfileSchema(JSON.parse(result))
                        }
                        else {
                            console.log("profileList_Schema status code is 400");
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


    const onsubmit = () => {
        console.log("success", Profileid);
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == true) {
                // showLoader()
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

                //Create challan with profile api call
                Apicall.MainApiMethod(Constant.POST, ApiUrl.NewChallanCreate_Ability, bytesTobase64, JSON.stringify(Profileid)).then((resp) => {
                    console.log("respppppp", resp.data);
                    hideLoader()
                    var response = resp.data

                    //AES 128 Decryption
                    var AES128Decry = Helper.AES_128_Decryption(response)
                    console.log("aes128dec_Challandetails", AES128Decry);
                    Helper.IsRepeatChallan = false
                    var splitdata = AES128Decry.split("|")
                    console.log("splitdataresult_", splitdata);
                    var split = splitdata[1].split("*")
                    console.log(split);
                    if (splitdata[0] == rnd && split[0] == 0) {
                        console.log("Simplechallan_resultofapi_____", splitdata[1]);
                        Helper.ProfileChallan = true
                        Helper.IsNewChallan = Constant.TRUE
                        Helper.ServiceName = Profileid
                        Helper.IsServiceChallan = Constant.FALSE
                        Helper.IsRepeatChallan = false
                        navigation.navigate('Treasury')
                    }
                    else if (splitdata[0] == rnd && split[0] == 2) {
                        console.log("0030hallan_resultofapi_____", splitdata[1]);
                        Helper.ProfileChallan = true
                        Helper.IsNewChallan = Constant.TRUE
                        Helper.ServiceName = Profileid
                        Helper.IsServiceChallan = Constant.FALSE
                        Helper.IsRepeatChallan = false
                        navigation.navigate('Treasury')
                    }
                    else if (splitdata[0] == rnd && split[0] == 3) {
                        CommonMethods.showError("CTD Challan Make With Web Application")
                    }
                    else if (splitdata[0] == rnd && split[0] == 5) {
                        CommonMethods.showError("8000 Above Budget Head Challan Make With Web Application")
                    }
                    else {
                        console.log("Paydetails status code is 400");
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
    const onprofileselect = (item) => {
        setitemflag(!itemflag)
        console.log("slect___", item.UserProfile);

        item.selected = !item.selected;
        // item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

        const index = array.findIndex(
            res => item.UserProfile === res.UserProfile
        );
        console.log("indexxxx__", index);
        array[index] = item;
        setarray(array)
        const userschema = ProfileSchema ? ProfileSchema.filter(element =>
            element.UserPro == item.UserPro
        ) : null
        console.log("filteress", userschema);
        setSchemaInfo(userschema)
    }

    const onrenderitem = ({ item, index }) => {
        console.log("renderitem_profileget", item);
        return (
            <View>
                {
                    item.selected ?
                        <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', backgroundColor: item.selected ? "#B0F9FF" : Colors.buttonColors, borderRadius: 10, height: item.selected ? 220 : 40 }} onPress={() => onprofileselect(item, index)}>

                            {
                                item.selected ?
                                    <View style={{ marginTop: 5, marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 32, color: Colors.black, marginHorizontal: 10 }}>- </Text>
                                    </View>
                                    : <View style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5 }}>
                                        <Text style={{ fontSize: 32, color: Colors.white, marginHorizontal: 10 }}>+</Text>
                                    </View>
                            }
                            {
                                item.selected ?
                                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{
                                        height: 200,
                                        flex: 1,
                                    }}>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ fontSize: 15, color: Colors.black }}>{item.UserProfile}</Text>

                                            {
                                                SchemaInfo ? SchemaInfo.map((val) => {
                                                    Profileid = val.UserPro
                                                    return (
                                                        <View style={{}}>
                                                            <View style={{ flex: 0.8, marginRight: 10 }}>
                                                                <Text numberOfLines={3} style={{ fontSize: 15, color: Colors.black, marginTop: 10, marginLeft: 10 }}>{val.BudgetHead} - {val.schemaname} </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }) : null
                                            }


                                            <View style={styles.buttonview} >
                                                <TouchableOpacity style={styles.appButtonContainer} onPress={() => onsubmit()}>
                                                    <Text style={[styles.appButtonText]}>Continue</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                    :
                                    <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                                        <Text style={{ fontSize: 15, color: Colors.white, textAlign: 'center' }}>{item.UserProfile}</Text>
                                    </View>
                            }


                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', backgroundColor: Colors.buttonColors, borderRadius: 10, height: 40 }} onPress={() => onprofileselect(item, index)}>

                            <View style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5 }}>
                                <Text style={{ fontSize: 25, color: Colors.white, marginHorizontal: 10 }}>+</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                                <Text style={{ fontSize: 15, color: Colors.white, textAlign: 'center' }}>{item.UserProfile}</Text>
                            </View>

                        </TouchableOpacity>

                }

            </View>
        )
    }

    const Profile_Search = text => {
        console.log("textvallll_____", text);

        if (array) {
            setprofilesarch(text)
            const newData = array.filter(item => {
                console.log("Profilesearch_res", item);
                const itemData = `${item.UserProfile.toUpperCase()}`;
                console.log("itemdata_", itemData);
                const textData = text.toUpperCase();
                console.log("textdata__", textData);
                return itemData.indexOf(textData) > -1;
            });
            console.log("newdata__", newData);
            setsearchProfile(newData)
            setFlagProifle(true)
        }
        // const index = array.findIndex(
        //     res => item.UserProfile === res.UserProfile
        // );

    };

    return (
        <SafeAreaView style={styles.container} >
            <CustomLoader loaderVisible={loaderVisible} />
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.headview}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={{ marginTop: Platform.OS == 'ios' ? 20 : 22, marginLeft: 0, height: 50, paddingHorizontal: 20, justifyContent: 'center' }}>
                                <Image resizeMode='contain' style={{ width: 30, height: 30, tintColor: Colors.buttonColors }} source={images.BackIcon} />
                            </TouchableOpacity >
                            <View style={{ marginTop: 30, flex: 0.8 }}>
                                <Text style={styles.containsubH}>Profile List</Text>
                            </View>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "padding"}
                            style={{ flex: 1 }}>
                            <View style={styles.centercomp}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}>
                                    <Image resizeMode='contain' style={styles.searchimg} source={images.Search} />
                                </View>
                                <Input
                                    style={styles.input}
                                    textAlign={'center'}
                                    value={profilesarch}
                                    placeholder="Search Profile"
                                    placeholderTextColor={"black"}
                                    maxLength={25}
                                    onChangeText={(text) => Profile_Search(text)}
                                />
                            </View>
                            {array == '' ?
                                < View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <Text style={{ textAlign: 'center', fontSizeP: 18, }}>No Record Found</Text>
                                </View>
                                :

                                <View style={{ height: 400 }}>
                                    {
                                        FlagProfile ?
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                nestedScrollEnabled={true}
                                                contentContainerStyle={{ marginHorizontal: 30 }}
                                                data={searchProfile}
                                                // keyExtractor={(notif) => String()}
                                                renderItem={onrenderitem}
                                            />
                                            :
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                nestedScrollEnabled={true}
                                                contentContainerStyle={{ marginHorizontal: 30 }}
                                                data={array}
                                                // keyExtractor={(notif) => String()}
                                                renderItem={onrenderitem}
                                            />
                                    }

                                </View>
                            }


                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ImageBackground >
        </SafeAreaView >
    )
}

export default Profile_list;

// import React from "react";
// import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image } from "react-native";

// export default class Store extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             loading: false,
//             dataSource: [],
//         };
//     }
//     componentDidMount() { this.fetchData(); }

//     fetchData = () => {
//         this.setState({ loading: true });

//         fetch("https://jsonplaceholder.typicode.com/photos")
//             .then(response => response.json())
//             .then(responseJson => {
//                 console.log("resppppp__",responseJson);
//                 responseJson = responseJson.map(item => {
//                     // console.log("itevvvv___",item.isSelect);
//                     item.isSelect = false;
//                     item.selectedClass = styles.list;

//                     return item;
//                 });

//                 this.setState({
//                     loading: false,
//                     dataSource: responseJson,
//                 });
//             }).catch(error => {
//                 this.setState({ loading: false });
//             });
//     };

//     FlatListItemSeparator = () => <View style={styles.line} />;

//     selectItem = data => {
//         console.log("data___",data);
//         data.item.isSelect = !data.item.isSelect;
//         data.item.selectedClass = data.item.isSelect ? styles.selected : styles.list;

//         const index = this.state.dataSource.findIndex(
//             item => data.item.id === item.id
//         );
// console.log("indexxxx__",index);
//         this.state.dataSource[index] = data.item;

//         this.setState({
//             dataSource: this.state.dataSource,
//         });
//     };

//     goToStore = () => this.props.navigation.navigate("Expenses", { selected: this.state.selected, });

//     renderItem = data =>
//         <TouchableOpacity
//             style={[styles.list, data.item.selectedClass]}
//             onPress={() => this.selectItem(data)}
//         >
//             <Image
//                 source={{ uri: data.item.thumbnailUrl }}
//                 style={{ width: 40, height: 40, margin: 6 }}
//             />
//             <Text style={styles.lightText}>  {data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}  </Text>
//         </TouchableOpacity>

//     render() {
//         const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
//         if (this.state.loading) {
//             return (
//                 <View style={styles.loader}>
//                     <ActivityIndicator size="large" color="purple" />
//                 </View>
//             );
//         }

//         return (
//             <View style={styles.container}>
//                 <Text style={styles.title}>yashyu</Text>
//                 <FlatList
//                     data={this.state.dataSource}
//                     ItemSeparatorComponent={this.FlatListItemSeparator}
//                     renderItem={item => this.renderItem(item)}
//                     keyExtractor={item => item.id.toString()}
//                     extraData={this.state}
//                 />

//                 <View style={styles.numberBox}>
//                     <Text style={styles.number}>{itemNumber}</Text>
//                 </View>

//                 <TouchableOpacity style={styles.icon}>
//                     <View>
//                         {/* <Icon
//         raised
//         name="shopping-cart"
//         type="font-awesome"
//         color="#e3e3e3"
//         size={30}
//         onPress={() => this.goToStore()}
//         containerStyle={{ backgroundColor: "#FA7B5F" }}
//       /> */}
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#192338",
//         paddingVertical: 50,
//         position: "relative"
//     },
//     title: {
//         fontSize: 20,
//         color: "#fff",
//         textAlign: "center",
//         marginBottom: 10
//     },
//     loader: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#fff"
//     },
//     list: {
//         paddingVertical: 5,
//         margin: 3,
//         flexDirection: "row",
//         backgroundColor: "#192338",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         zIndex: -1
//     },
//     lightText: {
//         color: "#f7f7f7",
//         width: 200,
//         paddingLeft: 15,
//         fontSize: 12
//     },
//     line: {
//         height: 0.5,
//         width: "100%",
//         backgroundColor: "rgba(255,255,255,0.5)"
//     },
//     icon: {
//         position: "absolute",
//         bottom: 20,
//         width: "100%",
//         left: 290,
//         zIndex: 1
//     },
//     numberBox: {
//         position: "absolute",
//         bottom: 75,
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         left: 330,
//         zIndex: 3,
//         backgroundColor: "#e3e3e3",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     number: { fontSize: 14, color: "#000" },
//     selected: { backgroundColor: "#FA7B5F" },
// });