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
    containsubH: { textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: Colors.buttonColors },

    textview: { fontSize: 16, fontWeight: 'bold',color:Colors.buttonColors },
    Titleview: { fontSize: 17, fontWeight: 'bold',marginHorizontal:10,color:Colors.black,letterSpacing:.8 },

    subtextview: { fontSize: 14, textAlign: 'right',flex:0.6, fontWeight: 'bold',color:Colors.buttonColors },
    Headtextview: { fontSize: 15,textAlign:'center',color:Colors.buttonColors},

    flatview: { marginTop: 15, marginLeft: 5, },
    textlineview: { marginVertical:5, flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:10,marginTop:10 },
    // textlineview: { marginTop: 0,marginLeft:15},
    shawdow:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2,
        elevation:1,
        // justifyContent:'center',alignItems:'center',
        // marginHorizontal: 20 ,
        // justifyContent:'center',
        // alignItems:'center',
        // flex:1,
        // marginTop:20,
    },
    shadowContainerStyle: {   //<--- Style with elevation
        borderWidth: .3,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
        marginHorizontal:20,
        marginVertical:5
      },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    Errortextview: { fontSize: 15, fontWeight: 'bold', color: '#eb4646', marginTop: 5, marginHorizontal: 2 },
    headingview: { backgroundColor: '#417C84', height: 30, justifyContent: 'center', marginTop: 10 },
    appButtonText: {
        fontSize: 15,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center',  },
    borderwidth:{ borderBottomWidth: 0.8, marginHorizontal: 0, marginTop: 20 },

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