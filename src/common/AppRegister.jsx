import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import Register from '../navigations/user_screens/Register';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/RegisterAPI';


const AppRegister = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const registrationStatus = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const handleInputChange = (text, field) => {
        setFormData({
            ...formData,
            [field]: text,
        });
    };

    const handleRegistration = () => {
        dispatch(registerUser(formData))
            .then(() => {
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
                navigation.navigate('Login');
            })
            .catch((error) => {
                // Handle registration error
                console.error('Registration failed:', error);
            });
    };



return (
    <KeyboardAvoidingView style={styles.container} >
        <Image
            style={styles.image}
            source={require('../../assets/register.png')}
        />
        <View style={styles.textcontainer}>
            <Text style={styles.text}>Đăng ký </Text>
            <Text style={styles.textWelcome}>Tạo tài khoản</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
            <Register
                value={formData.name}
                onChangeText={(text) => handleInputChange(text, 'name')}
                placeholder="Họ tên"
            />
            <Register
                value={formData.email}
                onChangeText={(text) => handleInputChange(text, 'email')}
                placeholder="E-mail"
            />
            <Register
                value={formData.phoneNumber}
                onChangeText={(text) => handleInputChange(text, 'phoneNumber')}
                placeholder="Số điện thoại"
            />
            <Register
                value={formData.password}
                onChangeText={(text) => handleInputChange(text, 'password')}
                placeholder="Mật khẩu"

            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'black' }}>Để đăng ký tài khoản, bạn đồng ý</Text><Text style={{ color: 'green', textDecorationLine: 'underline' }}> Terms & </Text>
            </View>
            <View style={styles.missContainer}>
                <Text style={{ color: 'green', textDecorationLine: 'underline' }}> Conditions</Text><Text style={{ color: 'black' }}> and</Text><Text style={{ color: 'green', textDecorationLine: 'underline' }}> Privacy Policy</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.styleor}>
                <View style={styles.lineThrough}>
                </View>
                <Text style={{ marginHorizontal: 9, color: 'black' }}>Hoặc</Text>
                <View style={styles.lineThrough}>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/google.png')}
                />
                <Image
                    style={styles.icon}
                    source={require('../../assets/facebook.png')}
                />
            </View>
            <View style={styles.iconContainer}>
                <Text style={styles.textMiss}>Tôi đã có tài khoản</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{
                        color: 'green',
                        fontSize: 16
                    }}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
);
};

export default AppRegister;
const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        margin: 20
    },
    styleor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
        margin: 20
    },
    lineThrough: {
        borderWidth: 0.5,
        flex: 1,
        borderColor: 'green'
    },
    missContainer: {
        // Hiển thị các thành phần con theo chiều dọc
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textMiss: {
        fontSize: 16, // Đổi kích thước văn bản nếu cần
        color: 'black', // Màu văn bản
        marginHorizontal: 10,
    },
    textForget: {
        fontSize: 16, // Đổi kích thước văn bản nếu cần
        color: 'green', // Màu văn bản
        marginHorizontal: 85,
    },
    textWelcome: {
        fontSize: 20,
        color: 'black'
    },
    image: {
        width: '100%',
        height: '30%',

    },
    button: {
        backgroundColor: '#329b47',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textcontainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    scrollView: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
});