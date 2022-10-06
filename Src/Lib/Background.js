import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
} from 'react-native';
import Colors from '../Component/Color'
import images from '../Component/Imagepath';

const BackScreen = () => {

    return (
        <SafeAreaView style={styles.container} >
            <ImageBackground source={images.AppBackground} resizeMode='cover' style={styles.backgroundimage}>
                <View style={styles.mainview}>
                    <View style={styles.submain}>
                        <View style={styles.headview}>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default BackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    headview: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        width: Dimensions.get('window').width / 1.15, bottom: Dimensions.get('window').height / 1.5, height: Dimensions.get('window').height / 1.25,
    },
    mainview: { height: '30%', width: Dimensions.get('window').width, position: 'absolute', bottom: 0 },
    submain: { justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute', marginVertical: 50 },
    backgroundimage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})

