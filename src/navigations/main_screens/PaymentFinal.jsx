import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const PaymentFinal = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
                <Image
                style={styles.logo}
                source={require('../../../assets/icon/history.png')}
                />
                <Text style={{fontSize: 18, marginTop: 10, color: 'black'}}>Bạn đã thanh toán đơn hàng thành công!</Text>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Home')}
                style={{height: 40, width: 200, backgroundColor: '#b8d82b', margin: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                    <Text style={{color: 'black'}}>Trở về trang chủ</Text>
                </TouchableOpacity>

        </View>
    )
}

export default PaymentFinal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200
    }

})