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
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    headview: {
        backgroundColor: '#F9FEFF',
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.2, height: Dimensions.get('window').height / 1.2,
    },
    mainview: { height: '30%', width: '100%', position: 'absolute', top: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },

    containsubH: { textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#58A3AD' },
    Textview: { fontSize: 15, fontWeight: 'bold', color: '#58A3AD', marginLeft: 5 },
    Resttext: { fontSize: 12, color: '#58A3AD', textAlign: 'right', marginTop: 10, fontWeight: 'bold', marginRight: 10 },
    Errortextview: { fontSize: 15, fontWeight: 'bold', color: '#eb4646', marginTop: 0, marginHorizontal: 10 },
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