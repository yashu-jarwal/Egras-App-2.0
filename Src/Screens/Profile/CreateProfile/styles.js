import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
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
    Dropdown: { width: 25, height: 15, tintColor: Colors.appcolor,top:10 },
    Dropdownview: { marginHorizontal: 30, marginTop: 30, height: 40, borderWidth: 1.3, borderRadius: 5, borderColor: '#50A4AB', },
    textview: { fontSize: 14, marginHorizontal: 30, color: Colors.buttonColors, fontWeight: 'bold', marginTop: 20 },
    flatview: { marginTop:15, marginLeft:5, },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:5,marginHorizontal:2},
    Textinput: { 
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.bordercolor,
        borderRadius: 5,
        padding: 10,
        width: '95%',
        color: Colors.inputcolor,
    },
    headingview: { backgroundColor: '#417C84', height: 30, justifyContent: 'center', marginTop: 10 },
    appButtonText: {
        fontSize: 15,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center', marginBottom:70},
    // Textinput: {
    //     height: 40,
    //     borderBottomWidth: 1,
    //     borderColor: Colors.bordercolor,
    //     width: '95%',
    //     color: Colors.inputcolor
    // },
    Textview: { fontSize: 15, fontWeight: 'bold', color: Colors.textcolor, },
    inputview: { marginHorizontal: 20,marginLeft:30, marginTop: 20 },

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
    containtext:{fontSize:14, color:Colors.inputcolor,marginTop:20 ,marginHorizontal: 30},
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
    budgethead:{ fontSize: 17, color: Colors.appcolor, fontWeight: 'bold',marginTop:20 ,marginHorizontal: 30},
    input:{ fontSize: 14, width: '70%', color: Colors.inputcolor,top:8 }


})