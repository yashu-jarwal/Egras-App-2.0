import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import images from '../Component/Imagepath';
import Colors from '../Component/Color';

export default class BackNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={[styles.back_view, { marginTop: this.props.MargT, marginLeft: this.props.MargL }]}>
                <Image resizeMode='contain' style={{width: this.props.width, height: this.props.height,tintColor:Colors.buttonColors}} source={images.BackIcon} />
            </TouchableOpacity >

        );
    }
}

const styles = StyleSheet.create({
    back_icon: { width: 25, height: 25, },
    back_view: { height: 50, paddingHorizontal: 20, justifyContent: 'center' },
})