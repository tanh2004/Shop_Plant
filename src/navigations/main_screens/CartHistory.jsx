import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../helpers/AxiosInstance'
import { useNavigation } from '@react-navigation/native';


const CartHistory = () => {
  const [carts, setCarts] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    fetchPaidCarts();
  }, []);

  const fetchPaidCarts = async () => {
    try {
      const response = await AxiosInstance().get('/cart');
      setCarts(response.data);
    } catch (error) {
      console.log('Error fetching paid carts:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../../../assets/icon/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>LỊCH SỬ GIAO DỊCH</Text>
        <View>
        </View>
      </View>
      <FlatList
        data={carts}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemId}>ID: {item._id}</Text>
            <Text style={styles.cartItemStatus}>Status: {item.status}</Text>
            <Text style={styles.cartItemDate}>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

export default CartHistory

const styles = StyleSheet.create({
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
  cartItem: {
    marginBottom: 20
  },
  cartItemId: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cartItemStatus: {
    fontSize: 14
  },
  cartItemDate: {
    fontSize: 14
  }
})