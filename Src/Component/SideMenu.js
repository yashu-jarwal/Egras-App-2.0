import * as React from 'react';
import { View, Text, DeviceEventEmitter, StyleSheet, Image, Dimensions, FlatList, Alert, TouchableOpacity } from 'react-native';
// import images from '../../Component/ImagesPath';
import String from '../Component/String';
// import AsyncStorageHelper from '../../Lib/AsyncStorageHelper';
import Helper from '../Component/Helper';
import { handleNavigation } from '../navigation/Route';
import images from '../Component/Imagepath';
import AsyncStorageHelper from '../Lib/AsyncStoreageHelper';
import Constant from '../Component/Constant';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderVisible: false,

            // ManuList: [{ NameRoute: 'Dashboard', title: 'Home', img: images.Home }, { NameRoute: 'EditUserProfile', title: 'Edit User Profile', img: images.Editprofile }, { NameRoute: 'ChangePassword', title: 'Change Password', img: images.ChangePassword }, { NameRoute: 'ContactUs', title: 'Contact Us', img: images.Contact }, { NameRoute: 'Signout', title: 'Sign out', img: images.Signout }]
            ManuList: [{ NameRoute: 'Dashboard', title: 'Home', img: images.Home }, { NameRoute: 'ContactUs', title: 'Contact Us', img: images.Contact }, { NameRoute: 'Signout', title: 'Sign out', img: images.Signout }]

        }
    }

    componentDidMount = () => {
        // this.listener = DeviceEventEmitter.addListener('Notifiy', (data) => {
        //     Helper.isNotifiy = data
        // });

    }

    renderManu = ({ item, index }) => {
        // console.log("itemvalll", item, index);
        return (
            <TouchableOpacity onPress={() => { this.onClick(item.NameRoute) }} style={styles.contantview}>
                <Image resizeMode='contain' style={{ width: 20, height: 20, tintColor: '#fff' }} source={item.img} />
                <Text style={styles.textname}>{item.title}</Text>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <View style={styles.container} >
                <View style={styles.BackView}>
                    <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center', letterSpacing: 0.5, fontWeight: 'bold', marginRight: 10 }}>{Helper.userProfile}</Text>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.ManuList}
                    // keyExtractor={(notif) => String()}
                    renderItem={this.renderManu}
                />
            </View>

        );
    }

    onClick = (NameRoute) => {
        console.log("onlcick", NameRoute);
        if (NameRoute == 'Signout') {
            this.gotoLogOut()
        }
        else {
            this.props.navigation.closeDrawer()
            handleNavigation({ type: 'push', page: NameRoute, navigation: this.props.navigation })

        }


    }

    gotoLogOut = () => {
        Alert.alert(
            String.AppName,
            String.Logoutsubmit,
            [
                { text: 'No', onPress: () => { console.log("Logout no") } },
                { text: 'Yes', onPress: () => { this.LogoutApiCall() } },
            ],
            { cancelable: false }
        )
    }

    LogoutApiCall = () => {
        AsyncStorageHelper.removeItemValue(Constant.TOKEN)
        // AsyncStorageHelper.removeItemValue("isloads")
        Helper.User_Mpin = ''
        Helper.user_token = ''
        handleNavigation({ type: 'setRoot', page: 'usersignin', navigation: this.props.navigation })
    }

    hideLoader() {
        this.setState({ loaderVisible: false })
    }
    showLoader() {
        this.setState({ loaderVisible: true })
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 0, backgroundColor: '#007F92' },
    BackView: { flex: .6, backgroundColor: '#025B6B', width: '100%', justifyContent: 'center', },
    textname: { color: '#fff', fontSize: 16, marginLeft: 15, letterSpacing: 0.5 },
    contantview: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 5, },

})
