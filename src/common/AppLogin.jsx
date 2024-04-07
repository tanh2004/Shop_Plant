import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import Login from '../navigations/user_screens/Login';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/UserAPI';

const AppLogin = (props) => {
    const { navigation } = props;
    const appState = useSelector(state => state.app);
    const dispatch = useDispatch();

    const [email, setemail] = useState('tanhntps30053@fpt.edu.vn');
    const [password, setpassword] = useState('1');

    const handleLogin = () => {
        try {
            const body = { email, password };
            dispatch(login(body));
        } catch (error) {

        }
    }
    const [formData, setFormData] = useState({
        email: '',
        passWord: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberAccount, setRememberAccount] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    }

    const handleRememberAccountToggle = () => {
        setRememberAccount(!rememberAccount);
    }

    const handleInputChange = (text, field) => {
        setFormData({
            ...formData,
            [field]: text,
        });
    };


    return (
        <KeyboardAvoidingView style={styles.container} >
            <Image
                style={styles.image}
                source={require('../../assets/welcome.png')}
            />
            <View style={styles.textcontainer}>
                <Text style={styles.text}>Chào mừng bạn </Text>
                <Text style={styles.textWelcome}>Đăng nhập tài khoản</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <Login
                    value={email}
                    onChangeText={setemail}
                    placeholder="Nhập email hoặc số điện thoại"
                />
                <Login
                    value={password}
                    onChangeText={setpassword}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    showPassword={showPassword}
                    togglePasswordVisibility={handleTogglePasswordVisibility}
                />
                <View style={styles.missContainer}>
                    <CheckBox
                        value={rememberAccount}
                        onValueChange={handleRememberAccountToggle}
                    />
                    <Text style={styles.textMiss}>Nhớ tài khoản</Text>
                    <Text style={styles.textForget}>Forgot Password?</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng Nhập</Text>
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
                    <Text style={styles.textMiss}>Bạn không có tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{
                            color: 'green',
                            fontSize: 16
                        }}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AppLogin;
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
        flexDirection: 'row', // Hiển thị các thành phần con theo chiều dọc
        alignItems: 'center',
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
        height: '45%'
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