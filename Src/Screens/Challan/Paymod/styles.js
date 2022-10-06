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
    containsubH: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Colors.textcolor },
    flatview: { marginHorizontal: 20, },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    buttonverify: { backgroundColor: Colors.buttonColors, height: 40, width: 90, marginLeft: 20, marginTop: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    close_Button: { height: 25, width: 25,tintColor: Colors.buttonColors },
    Bankimgstyles: { height: 20, width: 20 },
    headingview: { backgroundColor: '#417C84', height: 45, justifyContent: 'center', marginTop: 10, alignItems: 'center' },
    appButtonText: {
        fontSize: 15,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    closeimg: { width: 10, position: 'absolute', right: 40, bottom: Dimensions.get('window').height / 1.95 },
    closeupi: { width: 10, position: 'absolute', right: 40, bottom: Dimensions.get('window').height / 3.8 },

    flatlistview: {
        marginTop: 15,
        height: Dimensions.get('window').height / 2.5
    },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center', marginBottom: 40 },
    Textview: { fontSize: 15, fontWeight: 'bold', marginHorizontal: 10, color: Colors.inputcolor },
    inputview: { fontSize: 15, fontWeight: 'bold', color: Colors.buttonColors, },

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
    modalbutton: {},
    modalVerify: { backgroundColor: 'white', borderWidth: 2, borderColor: Colors.buttonColors, position: 'absolute', bottom: 0, height: Dimensions.get('window').height / 4, width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30 },

    modalmain: { backgroundColor: 'white', borderWidth: 2, borderColor: Colors.buttonColors, position: 'absolute', bottom: 0, height: Dimensions.get('window').height / 2, width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
    modaltext: { fontSize: 17, textAlign: 'right', color: Colors.buttonColors, marginRight: 40, marginVertical: 10 },
    modaltextHead: { fontSize: 15, textAlign: 'center', color: Colors.buttonColors, marginVertical: 10 },
    Redio_Button: {
        height: 20,
        width: 30,
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:0,marginHorizontal:18},
    input: {
        fontSize: 15,
        color: Colors.lightgrey,
        justifyContent: 'center',
        borderWidth: .5,
        borderRadius: 10

    },
    centercomp: {
        marginTop: Dimensions.get('window').height/17,
        height: 180,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent:'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Textinput: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: '#50A4AB',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        color: Colors.inputcolor,

        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        // paddingLeft: 0,
    },
    checkview: { marginTop: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, },
    addButton: {
        backgroundColor: Colors.appcolor,
        height: 35,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        position: 'absolute',
        bottom: 70,
        right: Dimensions.get('window').width / 2.8,
        shadowColor: "#000000",
        flexDirection: 'row',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
})