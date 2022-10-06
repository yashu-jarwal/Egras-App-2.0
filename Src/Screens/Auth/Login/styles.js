import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Component/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    Textinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        flex: 0,
        borderColor: '#50A4AB',
        borderRadius: 10,
        padding: 10,
        width: '95%',
        color: Colors.inputcolor,


        // flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        // paddingLeft: 0,
    },
    headview: {
        backgroundColor: '#F9FEFF',
        flex: 0,
        height: Dimensions.get('window').height / 1.9, width: Dimensions.get('window').width / 1.15, bottom: Dimensions.get('window').height / 3.5
    },
    mainview: { height: '28%', width: '100%', position: 'absolute', bottom: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', },
    Errortextview: { fontSize: 15, fontWeight: 'bold', color: '#eb4646', marginTop: 0, marginHorizontal: 18 },
    ImageStyle: {
        padding: 10,
        // margin: 5,
        height: 25,
        width: 30,
        // resizeMode: 'stretch',
        // alignItems: 'center',
        tintColor: '#CDCDCD',
        
       
    },
    textview: {
        marginHorizontal: 10,
    },
    containsubH: { textAlign: 'center', fontSize: 25, marginTop: 20, marginBottom: 10, fontWeight: 'bold', color: Colors.boldtheme },
    forgotview: { textAlign: 'right', fontSize: 15, marginTop: 0, fontWeight: 'bold', color: Colors.boldtheme, marginHorizontal: 20 },
    buttonview: { marginVertical: 15, backgroundColor: '#08818A', height: 50, marginHorizontal: 20, borderRadius: 20 },
    buttonText: { textAlign: 'center', fontSize: 17, color: 'white', marginTop: 13 },
    subcontainer: { textAlign: 'center', fontSize: 13, },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    Logoimage: {
        width: 200, height: 200
    }
});