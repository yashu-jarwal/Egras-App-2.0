// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     FlatList,
//     Alert,
//     StyleSheet,
//     View,
// } from 'react-native';
// import String from './String';
// import { useNavigation } from '@react-navigation/native';
// import Colors from './Color';
// import Images from  '../assets/BankImages'

// const CustomList = (props) => {
//     console.log("prass dataa", props.data);
//     var data = props.data
//     console.log("valuoffffff",  data);
//     const [TransLIst, setTransLIst] = useState(data)



  


//     return (
//         <SafeAreaView style={styles.container}>
//             {console.log("givendataonot",TransLIst)}
//             <FlatList
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ marginBottom: 30 }}
//                 nestedScrollEnabled
//                 data={TransLIst}
//                 // keyExtractor={(notif) => String()}
//                 renderItem={Transrenderitem}
//             />
//         </SafeAreaView>
//     );


// };

// export default CustomList;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     appButtonContainer: {
//         backgroundColor: "#08818A",
//         borderRadius: 20,
//         width: 95,
//         paddingVertical: 2,
//     },
//     appButtonText: {
//         fontSize: 13,
//         color: "#fff",
//         alignSelf: "center",
//     },
//     textinput: { color: Colors.appcolor, fontSize: 15, },
//     mainview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginVertical: 10, marginLeft: 0, backgroundColor: '#DBF9FB', }
// });