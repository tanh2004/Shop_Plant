import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

const Register = ({ value, onChangeText, placeholder, secureTextEntry, showPassword, togglePasswordVisibility }) => {
    const handleInputChange = (text) => {
        onChangeText(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 2,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    icon: {
        width: 20,
        height: 20,
    },
});