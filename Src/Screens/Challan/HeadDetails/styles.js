import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Component/Color';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',

    },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    containsubH: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Colors.buttonColors },
    Dropdown: { width: 15, height: 15, tintColor: Colors.appcolor },
    Dropdownview: { marginHorizontal: 30, marginTop: 10, height: 30, borderWidth: 1.3, borderRadius: 5, borderColor: '#50A4AB', },
    textview: { fontSize: 14, marginHorizontal: 30, color: Colors.buttonColors, fontWeight: 'bold', marginTop: 20 },
    flatview: { marginHorizontal: 0, },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:5,marginHorizontal:0},
    headingview: { backgroundColor: '#417C84', height: 45, justifyContent: 'center', marginTop: 10,alignItems:'center'},
    appButtonText: {
        fontSize: 15,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center',marginVertical:40},
    Textinput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: Colors.bordercolor,
        width: '95%',
        color: Colors.inputcolor
    },
    Textview: { fontSize: 15, fontWeight: 'bold', color: Colors.textcolor, },
    inputview: { marginHorizontal: 40, marginTop: 20 },
    mainview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headview: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, height: Dimensions.get('window').height / 1.25,

    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
        alignItems: 'center',
        tintColor: '#adacac',
        top: 25, right: 5
    },

})