import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/Reducer';

const PaymentCart = ({ route }) => {
    const navigation = useNavigation();
    const app = useSelector(state => state.app)
    const dispatch = useDispatch();
    const { cartTotal, deliveryFee, totalAmount, address, phoneNumber } = route.params;

    const handlePaymentAndOrder = async () => {
        try {
               console.log(app.cart)
            const response = await AxiosInstance().post('/cart', {
                user: app.user._id,
                products: app.cart
            });
            dispatch(clearCart());
            navigation.navigate('PaymentFinal');
            
        } catch (error) {
            console.error('Payment and order failed:', error);
            Alert.alert('Error', 'Failed to process payment and place order');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Payment',cartTotal )}
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
                    <Text style={{ color: 'black', fontSize: 15 }}>Nhập thông tin thẻ</Text>
                </TouchableOpacity>
                <TextInput
                    style={{ marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="Nhập số thẻ"
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={{ marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="Tên chủ thẻ"
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={{ marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="Ngày hết hạn(MM/YY)"
                    placeholderTextColor="grey"
                />
                <TextInput
                    style={{ width: 90, marginTop: 15, height: 35, borderBottomWidth: 1, borderBottomColor: 'grey' }}
                    placeholder="CVV"
                    placeholderTextColor="grey"
                />
                <TouchableOpacity style={{marginTop: 35, height: 25, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <Text style={{ color: 'black', fontSize: 15 }}>Thông tin khách hàng</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 15, marginTop: 15}}>Nguyen Thanh Tanh</Text>
                <Text style={{ fontSize: 15, marginTop: 15}}>tanhntps30053@fpt.edu.vn</Text>
                <Text style={{ fontSize: 15, marginTop: 15}}>{address}</Text>
                <Text style={{ fontSize: 15, marginTop: 15}}>{phoneNumber}</Text>



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
                        <TouchableOpacity onPress={handlePaymentAndOrder} style={{ backgroundColor: '#007537', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 17 }}> TIẾN HÀNH THANH TOÁN </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default PaymentCart

const styles = StyleSheet.create({
    footer: {
        marginTop: 150
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