import * as React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: '',
        }

    }
    render() {
        return (
            <View>
                <TextInput
                    editable={this.props.editable}
                    placeholder={this.props.placeholder}
                    style={this.props.style}
                    value={this.props.value}
                    placeholderTextColor={"#B5B5B5"}
                    returnKeyType={this.props.returnKeyType}
                    onChangeText={this.props.onChangeText}
                    onSubmitEditing={this.props.onSubmitEditing}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry}
                    contextMenuHidden={true}
                    ref={this.props.ref}
                    fontWeight={this.props.fontWeight}
                    // blurOnSubmit={this.props.blurOnSubmit}
                    maxLength={this.props.maxLength}
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    onEndEditing={this.props.onEndEditing}
                    autoCapitalize={this.props.autoCapitalize}
                    
                />
            </View>
        );
    }
};
