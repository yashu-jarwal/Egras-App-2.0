import React from 'react';
import { StyleSheet, View, Modal,Animated,Easing, ActivityIndicator } from 'react-native';
import images from '../Component/Imagepath';
import Colors from '../Component/Color';

export default class CustomLoader extends React.Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0);

    }
    componentDidMount() {
        this.spin();

    }
    spin() {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 1600,
            useNativeDriver: true,
            easing: Easing.linear,
        }).start(() => this.spin()
        );
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.loaderVisible}
                onRequestClose={() => {
                    console.log("back press");
                }}>
                <View style={styles.container}>
                    <View style={{backgroundColor:'#fff',paddingHorizontal:40,paddingVertical:40,borderRadius:20,}}>
                    <Animated.Image
                        style={[styles.ImgCss, { transform: [{ rotate: spin }] }]}
                        source={images.Loader} />                    
                        </View>
                   
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center',        backgroundColor: "#00000090"},
    textCss: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: 'black'},
    ImgCss: {width: 50, height: 50, resizeMode: "contain",tintColor:Colors.appcolor},
});