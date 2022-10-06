import { StyleSheet, Dimensions } from 'react-native';

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
    imageview: { justifyContent:'center' ,flex :1.5,}
    
});