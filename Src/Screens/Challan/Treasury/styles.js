import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Component/Color';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',

    },
    headview: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, bottom: Dimensions.get('window').height / 1.5, height: Dimensions.get('window').height / 1.25,
    },
    mainview: { height: '30%', width: Dimensions.get('window').width, position: 'absolute', bottom: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:8,marginHorizontal:2},
    containsubH: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Colors.buttonColors },
    Dropdown: { width: 25, height: 15, tintColor: Colors.appcolor,top:11 },
    Dropdownview: { marginHorizontal: 30, marginTop: 10, height: 40, borderWidth: 1.3, borderRadius: 5, borderColor: '#50A4AB', },
    textview: { fontSize: 14, marginHorizontal: 30, color: Colors.buttonColors, fontWeight: 'bold', marginTop: 20 },
    flatview: { backgroundColor: Colors.dropdown, marginHorizontal: 30, },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    headingview: { backgroundColor: '#417C84', height: 45, justifyContent: 'center', marginTop: 10,alignItems:'center'},
    appButtonText: {
        fontSize: 16,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    // buttonview: { position: 'absolute', bottom: 40, alignSelf: 'center' },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop:50},

    input:{ fontSize: 14, width: '70%', color: Colors.inputcolor,top:8 }


})