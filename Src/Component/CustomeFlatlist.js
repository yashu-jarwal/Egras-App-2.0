import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
    StyleSheet,
    View,
} from 'react-native';
import String from './String';
import { useNavigation } from '@react-navigation/native';
import Colors from './Color';

const CustomList = (props) => {
    console.log("prass dataa", props.data);
    var data = props.data
    console.log("valuoffffff",  data);
    const [TransLIst, setTransLIst] = useState(data)


    const Transrenderitem = ({ item, index }) => {
        console.log("flatlist", item);
        return (
            <TouchableOpacity style={styles.mainview} onPress={onbuttonpress}>
                <View style={{ flex: .6, marginVertical: 10, paddingLeft: 20 }}>
                    <Text style={[styles.textinput, { fontSize: 18 }]}>{item.GRN}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.textinput, { fontSize: 13, fontWeight: 'bold' }]}>{item.Status}</Text>
                        <Text style={[styles.textinput, { fontSize: 13 }]}> {item.ChallanDate}</Text>
                    </View>
                </View>
                <View style={{ flex: 0.3, marginVertical: 10 }}>
                    <Text style={[styles.textinput, { paddingLeft: 20 }]}> {item.TotalAmount} ₹ </Text>
                    {/* <TouchableOpacity style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>REPEAT</Text>
                    </TouchableOpacity> */}
                </View>
            </TouchableOpacity>
        )
    }

    const onbuttonpress = () => {
        Alert.alert(
            String.AppName,
            String.Repeat,
            [
                { text: 'Cancle', onPress: () => { console.log("Cancle transaction") } },
                { text: 'Repeat', onPress: () => { } },
            ],
            { cancelable: false }
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {console.log("givendataonot",TransLIst)}
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 30 }}
                nestedScrollEnabled
                data={TransLIst}
                // keyExtractor={(notif) => String()}
                renderItem={Transrenderitem}
            />
        </SafeAreaView>
    );


};

export default CustomList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    mainview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginVertical: 10, marginLeft: 0, backgroundColor: '#DBF9FB', }
});