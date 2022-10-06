import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Image,
    ImageBackground,
    View,
} from 'react-native';
import styles from './styles'
import images from '../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import AsyncStorageHelper from '../../Lib/AsyncStoreageHelper';
import Helper from '../../Component/Helper';
import Constant from '../../Component/Constant';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        console.log("out_seffect_time out");
        setTimeout(() => {
            console.log("inuseffect_time out");
            UserinfoCheck()
        }, 2000)


    })
    console.log("outofyashuuuuuu")

    const UserinfoCheck = () => {
        AsyncStorageHelper.getData(Constant.TOKEN).then((resp) => {
            console.log("respvoflocal", resp);
            if (resp) {
                Helper.user_token = resp;
                navigation.navigate('Mpin')
                // navigation.navigate('Paymode')
            }
            else {
                navigation.navigate('usersignin')
                // navigation.navigate('Paymode')
            }

        })
    }





    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <ImageBackground source={images.Splash} resizeMode='cover' style={styles.backgroundimage}>
                    <View style={styles.imageview}>
                        <Image source={images.logo} resizeMode='contain' style={{ height: '70%', width: '70%' }} />
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Splash;
