import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';


const Payment = ({ route }) => {
    const navigation = useNavigation();
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { cartTotal = 0 } = route.params || {};
    const [addressError, setAddressError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');


    // Tính tổng giá trị đơn hàng
    useEffect(() => {
        let total = cartTotal + deliveryFee;
        setTotalAmount(total);
    }, [cartTotal, deliveryFee]);

    const handleDeliveryMethod = (method) => {
        setDeliveryMethod(method);
        if (method === 'fast') {
            setDeliveryFee(15000);
        } else if (method === 'cod') {
            setDeliveryFee(20000);
        }
    };

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    }

    const validateInputs = () => {
        let isValid = true;

        if (!address.trim()) {
            setAddressError('Địa chỉ không được để trống');
            isValid = false;
        } else {
            setAddressError('');
        }

        if (!phoneNumber.trim()) {
            setPhoneNumberError('Số điện thoại không được để trống');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        return isValid;
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}
                >
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../../assets/icon/ic_back.png')}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>THANH TOÁN</Text>
                <View>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <TouchableOpacity style={{ height: 25, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Thông tin khách hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15, height: 25, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <Text style={{ fontSize: 15 }}>Nguyen Thanh Tanh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15, height: 25, borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                    <Text style={{ fontSize: 15 }}>tanhntps30053@fpt.edu.vn</Text>
                </TouchableOpacity>
                <TextInput
                    style={{ marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="Địa chỉ"
                    value={address}
                    placeholderTextColor="grey"
                    onChangeText={text => setAddress(text)}
                />
                {addressError.length > 0 && <Text style={{ color: 'red' }}>{addressError}</Text>}
                <TextInput
                    style={{ marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    placeholderTextColor="grey"
                    onChangeText={text => setPhoneNumber(text)}
                />
                {phoneNumberError.length > 0 && <Text style={{ color: 'red' }}>{phoneNumberError}</Text>}
                <TouchableOpacity style={{ marginTop: 25, height: 25, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Phương thức vận chuyển</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 15, height: 45, borderBottomWidth: 1, borderBottomColor: deliveryMethod === 'fast' ? 'green' : 'grey' }}
                    onPress={() => handleDeliveryMethod('fast')}>
                    <Text style={{ color: deliveryMethod === 'fast' ? 'green' : 'black', fontSize: 15 }}>Giao hàng Nhanh - 15.000đ</Text>
                    {deliveryMethod === 'fast' && <Image source={require('../../../assets/icon/ic_check.png')} style={{ width: 20, height: 20, tintColor: 'green', position: 'absolute', right: 0 }} />}
                    <Text style={{ fontSize: 15 }}>Dự kiến giao hàng 5 - 7/4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 15, height: 45, borderBottomWidth: 1, borderBottomColor: deliveryMethod === 'cod' ? 'green' : 'grey' }}
                    onPress={() => handleDeliveryMethod('cod')}>
                    <Text style={{ color: deliveryMethod === 'cod' ? 'green' : 'black', fontSize: 15 }}>Giao hàng COD - 20.000đ</Text>
                    {deliveryMethod === 'cod' && <Image source={require('../../../assets/icon/ic_check.png')} style={{ width: 20, height: 20, tintColor: 'green', position: 'absolute', right: 0 }} />}
                    <Text style={{ fontSize: 15 }}>Dự kiến giao hàng 4 - 8/4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 25, height: 25, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Hình thức thanh toán</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 25, height: 25, borderBottomWidth: 1, borderBottomColor: paymentMethod === 'visa' ? 'green' : 'grey' }}
                    onPress={() => handlePaymentMethod('visa')}>
                    <Text style={{ color: paymentMethod === 'visa' ? 'green' : 'black', fontSize: 15 }}>Thẻ VISA/MASTERCARD</Text>
                    {paymentMethod === 'visa' && <Image source={require('../../../assets/icon/ic_check.png')} style={{ width: 20, height: 20, tintColor: 'green', position: 'absolute', right: 0 }} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 15, height: 25, borderBottomWidth: 1, borderBottomColor: paymentMethod === 'atm' ? 'green' : 'grey' }}
                    onPress={() => handlePaymentMethod('atm')}>
                    <Text style={{ color: paymentMethod === 'atm' ? 'green' : 'black', fontSize: 15 }}>Thẻ ATM</Text>
                    {paymentMethod === 'atm' && <Image source={require('../../../assets/icon/ic_check.png')} style={{ width: 20, height: 20, tintColor: 'green', position: 'absolute', right: 0 }} />}
                </TouchableOpacity>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Tạm tính</Text>
                        <Text>{cartTotal}đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text>Phí vận chuyển</Text>
                        <Text> {deliveryFee}đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text>Tổng cộng</Text>
                        <Text>{totalAmount}đ</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (validateInputs()) {
                                    navigation.navigate('PaymentCart', { cartTotal, deliveryFee, totalAmount, address, phoneNumber });
                                }
                            }}
                            style={{ backgroundColor: '#007537', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 17 }}> TIẾP TỤC </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    footer: {
        marginTop: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    header: {
        height: 70,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

})