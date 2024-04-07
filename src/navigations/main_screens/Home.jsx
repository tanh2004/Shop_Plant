import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Products from '../../screen/Products';
import AxiosInstance from '../../helpers/AxiosInstance';

const Home = (props) => {
  const {navigation} = props;
  const [list, setlist] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const fetchProducts = async () => {
    try {
      setrefreshing(true);
      const response = await AxiosInstance().get("/products");
      console.log(response.data);
      setlist(response.data.slice(0,10));
      setrefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  
  //Adapter
  const renderItem = ({ item }) => {
    const { name, category, price, images } = item;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', {id: item._id})}
        style={styles.productItem}>
        <View style={{ backgroundColor: '#f6f6f6' }}>
          <Image
            source={{ uri: images[0] }}
            style={styles.productImage} />
        </View>
        <Text style={styles.productName}>{name}</Text>
        <Text>{category.category_name}</Text>
        <Text style={styles.price}>{price}đ</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.aboveBannerContainer}>
        <View style={styles.aboveBanner}>
          <Text style={styles.text}>Planta - tỏa sáng</Text>
          <TouchableOpacity style={styles.icshop} onPress={() => navigation.navigate('Cart')}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../../assets/icon/ic_shop.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.banner} source={require('../../../assets/banner.png')} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerText}>Không gian nhà bạn</Text>
        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Text style={{ color: '#009e55', marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#009e55' }}>Xem hàng mới về </Text>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../../assets/icon/ic_next.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={{ color: 'black', fontSize: 25 }}>Cây trồng</Text>
        <FlatList
          data={list.slice(0,10)}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={fetchProducts}
          initialNumToRender={10}
        />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  price: {
    color: 'green',
    fontSize: 18
  },
  flatListContainer: {
    paddingTop: 10,
    flexGrow: 1
  },
  productName: {
    color: 'black',
    fontSize: 18,
  },
  productItem: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    width: 170,
    height: 230
  },
  productImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 5,
  },
  bodyContainer: {
    margin: 30,
    flex: 1
  },
  text: {
    color: 'black',
    fontSize: 25,
    marginTop: 10
  },
  icshop: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  aboveBanner: {
    margin: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboveBannerContainer: {
    width: '100%',
    height: 90,
    backgroundColor: '#f6f6f6',
  },
  banner: {
    width: '100%',
    height: '25%'
  },
  bannerTextContainer: {
    position: 'absolute',
    width: '100%',
  },
  bannerText: {
    color: 'black',
    fontSize: 25,
    marginTop: 80,
    margin: 20
  },
  flatListContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  }
})

