import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';
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
    containsubH: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Colors.buttonColors },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    headingview: { backgroundColor: '#417C84', height: 30, justifyContent: 'center', marginTop: 10 },

    textview: { fontSize: 16, color: '#292D2E', marginTop: 20 },
    texthead: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40 },
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
    containtext: { fontSize: 14, color: Colors.inputcolor, marginTop: 20 },
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
    input: { fontSize: 14, width: '70%', color: Colors.inputcolor, top: 8 }


})