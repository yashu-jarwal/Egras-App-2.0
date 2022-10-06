import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Component/Color';
export default StyleSheet.create({
    container: {
        // padding: 10,
        flex: 1,
        alignItems: 'center',
        // justifyContent:'center',
        // backgroundColor: '#078088',
    },
    Textinput: {
        height: 40,
        marginTop: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: Colors.bordercolor,
        borderRadius: 5,
        width: '100%',
        color: Colors.inputcolor,
    },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    Errortextview: { fontSize: 15, fontWeight: 'bold', color: '#eb4646', marginTop: 0, marginHorizontal: 10 },
    headview: {
        backgroundColor: '#F9FEFF',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.2, height: Dimensions.get('window').height / 1.2,
    },
    maincontainr: {
        backgroundColor: '#F9FEFF',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, bottom: 0, position: 'absolute', height: Dimensions.get('window').height / 1.2,
    },
    mainview: { height: '30%', width: '100%', position: 'absolute', top: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        tintColor: '#adacac',
        top: 15, right: 50
    },
    placeholderstyle: {
        marginLeft: 20
    },
    textview: {
        marginHorizontal: 20,
    },
    containsubH: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#58A3AD' },
    Textview: { fontSize: 15, fontWeight: 'bold', color: '#58A3AD', marginHorizontal: 5 },
    Resttext: { textAlign: 'right', fontSize: 12, marginTop: 10, fontWeight: 'bold', color: '#58A3AD', marginHorizontal: 20 },
    subcontainer: { textAlign: 'center', fontSize: 13, },

    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    appButtonText: {
        fontSize: 12,
        color: "#fff",
        alignSelf: "center",
        marginHorizontal: 18,
    },
    inputView1: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#50A4AB',
        color: Colors.inputcolor,
        marginBottom: 10, marginTop: 20, marginHorizontal: 8
    },
});