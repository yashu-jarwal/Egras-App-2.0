import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Component/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    Headingimg: { width: 35, height: 35, tintColor: Colors.white },

    containsubH: { textAlign: 'center', fontSize: 23, color: Colors.white },
    humburger: { marginHorizontal: 25, marginTop: 15 },
    headtextview: { flexDirection: 'row', marginHorizontal: 25 },
    govticon: { width: 75, height: 75, bottom: 0 },
    options: { width: 65, height: 65, tintColor: Colors.white, borderRadius: 20, marginVertical: 20, marginHorizontal: 5 },
    mainview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, },
    centercomp: {
        marginTop: 30,
        height: 180,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Translist: {
        height: Dimensions.get('window').width / 1.2,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1,
        backgroundColor: '#E8FEFC',
        // justifyContent: 'center',
        marginBottom: 50
    },
    imagecomp: {
        height: 80,
        borderRadius: 50,
        width: 80,
        backgroundColor: Colors.appcolor,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    textname: { color: '#fff', fontSize: 16, marginLeft: 15, letterSpacing: 0.5 },
    input: {
        fontSize: 15,
        color: Colors.lightgrey,
        justifyContent:'center',
    
    },
    searchimg: { height: 20, width: 20, tintColor: Colors.lightgrey,marginLeft:25 },
    borderline: { borderBottomWidth: 5, borderBottomColor: Colors.appcolor, height: 10, width: '15%', justifyContent: 'center', alignSelf: 'center', },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        width: 95,
        paddingVertical: 2,
    },
    appButtonText: {
        fontSize: 13,
        color: "#fff",
        alignSelf: "center",
    },
    textinput: { color: Colors.appcolor, fontSize: 15, },
    listview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginVertical: 10, marginLeft: 0, backgroundColor: '#DBF9FB', }


});