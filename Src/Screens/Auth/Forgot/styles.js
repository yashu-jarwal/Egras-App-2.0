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
    headview: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.2, height: Dimensions.get('window').height / 1.2,
    },
    maincontainr: {
        // backgroundColor: '#F9FEFF',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, bottom: 0, position: 'absolute', height: Dimensions.get('window').height / 1.2,
    },
    mainview: { height: '30%', width: '100%', position: 'absolute', top: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },
    placeholderstyle: {
        marginLeft: 20
    },
    textview: {
        marginHorizontal: 20,
    },
    containsubH: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: Colors.textcolor },
    Textview: { fontSize: 15, fontWeight: 'bold', color: Colors.textcolor },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:5},
    Resttext: { fontSize: 12, color: Colors.textcolor, textAlign: 'right', marginTop: 10, fontWeight: 'bold', marginRight: 10 },
    subcontainer: { textAlign: 'center', fontSize: 13, },

    appButtonContainer: {
        backgroundColor: Colors.buttonColors,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    appButtonText: {
        fontSize: 15,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 70,
    },
    Textinput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: Colors.bordercolor,
        width: '95%',
        color: Colors.inputcolor
    },
});