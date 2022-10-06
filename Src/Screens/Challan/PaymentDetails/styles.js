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
    containsubH: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: Colors.buttonColors },
    Dropdown: { width: 15, height: 15, tintColor: Colors.appcolor },
    Dropdownview: { marginHorizontal: 30, marginTop: 10, height: 30, borderWidth: 1.3, borderRadius: 5, borderColor: '#50A4AB', },
    textview: { fontSize: 14, marginHorizontal: 30, color: Colors.buttonColors, fontWeight: 'bold', marginTop: 20 },
    flatview: { backgroundColor: Colors.appcolor, marginHorizontal: 30, },
    appButtonContainer: {
        backgroundColor: "#08818A",
        borderRadius: 20,
        // marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 10
    },
    Errortextview: {fontSize: 15, fontWeight: 'bold', color: '#eb4646',marginTop:8,marginHorizontal:2},
    headingview: { backgroundColor: '#417C84', height: 45, justifyContent: 'center', marginTop: 10,alignItems:'center'},
    appButtonText: {
        fontSize: 16,
        color: Colors.white,
        alignSelf: "center",
        marginHorizontal: 110,
    },
    buttonview: { flex: 1, justifyContent: 'center', alignSelf: 'center', marginBottom:40},
    Textinput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: Colors.bordercolor,
        width: '95%',
        color: Colors.inputcolor
    },
    Textview: { fontSize: 15, fontWeight: 'bold', color: Colors.textcolor, },
    inputview: { marginHorizontal: 40, marginTop: 20 },
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

// import React, { Component } from 'react';
// import { View, Text, FlatList, TextInput, ListItem } from 'react-native';

// class FlatListDropDown extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: [],
//             value: '',
//         };

//         this.arrayNew = [
//             { "DeptCode": 151, "deptnameEnglish": "151- Administrative Reforms & Coordination Department" },
//             { "DeptCode": 152, "deptnameEnglish": "152- Agricultural Census Department" },
//             { "DeptCode": 3, "deptnameEnglish": "3- Agricultural Marketing Department" },
//             { "DeptCode": 2, "deptnameEnglish": "2- Agriculture Department" },
//             { "DeptCode": 4, "deptnameEnglish": "4- Animal Husbandry Department" },
//             { "DeptCode": 153, "deptnameEnglish": "153- Arabic, Persian Research Institute" },
//             { "DeptCode": 6, "deptnameEnglish": "6- Archaeology and Museums Department" },
//             { "DeptCode": 19, "deptnameEnglish": "19- Archives Department" },
//             { "DeptCode": 205, "deptnameEnglish": "205- Ayurved College,Udaipur" },
//             { "DeptCode": 7, "deptnameEnglish": "7- Ayurved Department" },
//             { "DeptCode": 9, "deptnameEnglish": "9- Bhasha and Library Department" },
//             { "DeptCode": 211, "deptnameEnglish": "211- Bio-Fuel Authority, Rajasthan , Jaipur" },
//             { "DeptCode": 220, "deptnameEnglish": "220- Child Empowerment Department" }
//         ];
//     }
//     //     this.arrayNew = [
//     //         { "DeptCode": 151, "deptnameEnglish": "151- Administrative Reforms & Coordination Department" },
//     //         { "DeptCode": 152, "deptnameEnglish": "152- Agricultural Census Department" },
//     //         { "DeptCode": 3, "deptnameEnglish": "3- Agricultural Marketing Department" },
//     //         { "DeptCode": 2, "deptnameEnglish": "2- Agriculture Department" },
//     //         { "DeptCode": 4, "deptnameEnglish": "4- Animal Husbandry Department" },
//     //         { "DeptCode": 153, "deptnameEnglish": "153- Arabic, Persian Research Institute" },
//     //         { "DeptCode": 6, "deptnameEnglish": "6- Archaeology and Museums Department" },
//     //         { "DeptCode": 19, "deptnameEnglish": "19- Archives Department" },
//     //         { "DeptCode": 205, "deptnameEnglish": "205- Ayurved College,Udaipur" },
//     //         { "DeptCode": 7, "deptnameEnglish": "7- Ayurved Department" },
//     //         { "DeptCode": 9, "deptnameEnglish": "9- Bhasha and Library Department" },
//     //         { "DeptCode": 211, "deptnameEnglish": "211- Bio-Fuel Authority, Rajasthan , Jaipur" },
//     //         { "DeptCode": 220, "deptnameEnglish": "220- Child Empowerment Department" }
//     // ]
//     // }

//     renderSeparator = () => {
//         return (
//             <View
//                 style={{
//                     height: 1,
//                     width: '100%',
//                     backgroundColor: 'red',
//                 }}
//             />
//         );
//     };

//     searchItems = text => {
//         const newData = this.arrayNew.filter(item => {
//             console.log("resultifoiterm", item.deptnameEnglish.toUpperCase());
//             const itemData = `${item.deptnameEnglish.toUpperCase()}`;
//             console.log("itemdata_", itemData);
//             const textData = text.toUpperCase();
//             console.log("textdata__", textData);
//             return itemData.indexOf(textData) > -1;
//         });
//         console.log("newdata__",newData);
//         this.setState({
//             data: newData,
//             value: text,
//         });
//     };

//     renderHeader = () => {
//         return (
//             <TextInput
//                 style={{ height: 60, borderColor: '#000', borderWidth: 1 }}
//                 placeholder="   Type Here...Key word"
//                 onChangeText={text => this.searchItems(text)}
//                 value={this.state.value}
//             />
//         );
//     };

//     render() {
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     padding: 25,
//                     width: '98%',
//                     alignSelf: 'center',
//                     justifyContent: 'center',
//                 }}>
//                 <FlatList
//                     data={this.state.data}
//                     renderItem={({ item }) => (
//                         <Text style={{ padding: 10 }}>{item.deptnameEnglish} </Text>
//                     )}
//                     keyExtractor={item => item.name}
//                     // ItemSeparatorComponent={this.renderSeparator}
//                     ListHeaderComponent={this.renderHeader}
//                 />
//             </View>
//         );
//     }
// }

// export default FlatListDropDown;