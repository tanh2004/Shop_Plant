import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button, ToastAndroid } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';
import { addItemToCart } from '../../redux/Reducer';
import { useDispatch, useSelector } from 'react-redux';


const ProductDetail = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const id = route?.params?.id;
  const [product, setproduct] = useState({});

  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  useEffect(() => {
    const getDetail = async () => {
      try {
        const result = await AxiosInstance().get(`/products/${id}`);
        if (result.status) {
          setproduct(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDetail();
    return () => {
    }
  }, [id])

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm

  const images = [
    'https://free.vector6.com/wp-content/uploads/2021/03/0000000294-cay-xanh-tai-hinh-cay-canh-png-180.png',
    'https://free.vector6.com/wp-content/uploads/2021/03/0000000194-cay-xanh-tai-hinh-cay-canh-png-80.png',
    'https://free.vector6.com/wp-content/uploads/2021/03/0000000156-cay-xanh-chau-cay-tai-hinh-cay-canh-png-42.png'
  ]
  const renderImages = () => {
    return images.map((item, index) => {
      return (
        <View key={index + 1}>
          <Image
            resizeMode='contain'
            source={{ uri: item }}
            style={{ width: '100%', height: 300 }}
          />
        </View>
      )
    })
  }
  const renderDots = () => {
    return images.map((item, index) => {
      return (
        <View key={index + 1}
          style={{
            width: 10, height: 10,
            borderRadius: 5,
            backgroundColor: selectedIndex === index ? 'black' : 'gray',
            margin: 5
          }} />
      )
    })
  }

  // Tính toán giá sản phẩm dựa trên số lượng và giá cố định
  const calculateTotalPrice = () => {
    if (product && product.price) {
      return product.price * quantity;
    }
    return 0;
  }

  //Thêm giỏ hàng
  const add = () => {
    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images,

    }
    dispatch(addItemToCart(item));
    ToastAndroid.show('Bạn đã thêm sản phẩm vào giỏ hàng', ToastAndroid.SHORT);
  }
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
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{product.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../../../assets/icon/ic_shop.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#f6f6f6' }}>
        <TouchableOpacity>
          <Image
            style={[styles.previous, styles.icon]}
            source={require('../../../assets/icon/last.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={[styles.next, styles.icon]}
            source={require('../../../assets/icon/next.png')}
          />
        </TouchableOpacity>
        <PagerView style={styles.pagerView}
          initialPage={selectedIndex}>
          {renderImages()}
        </PagerView>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {renderDots()}
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Products_Plants')}
            style={{ width: 70, backgroundColor: 'green', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Cây trồng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 70, backgroundColor: 'green', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 10 }}>
            <Text style={{ color: 'white' }}>{product.category ? product.category.category_name : 'Category Not Available'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 25, color: '#00772e', marginTop: 10 }}>{product.price}đ</Text>
        <Text style={styles.text}>Chi tiết sản phẩm</Text>
        <View style={styles.lineThrough}></View>
        <View style={styles.chitiet}>
          <Text style={{ color: '#919191', fontWeight: 'bold' }}>Kích cỡ</Text>
          <Text style={{ color: '#919191', fontWeight: 'bold' }}>Nhỏ</Text>
        </View>
        <View style={styles.lineThrough}></View>
        <View style={styles.chitiet}>
          <Text style={{ color: '#919191', fontWeight: 'bold' }}>Xuất xứ</Text>
          <Text style={{ color: '#919191', fontWeight: 'bold' }}>Châu Phi</Text>
        </View>
        <View style={styles.lineThrough}></View>
        <View style={styles.chitiet}>
          <Text style={{ color: '#919191', fontWeight: 'bold' }}>Tình trạng</Text>
          <Text style={{ color: '#00772e', fontWeight: 'bold' }}>Còn {product.quantity} sp</Text>
        </View>
        <View style={styles.lineThrough}>
        </View>
      </View>
      {/* Thêm footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Đã chọn {quantity} sản phẩm</Text>
          <Text >Tạm tính</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.tang} onPress={() => setQuantity(quantity - 1)}>
              <Text style={{ color: 'black' }}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={quantity.toString()}
              onChangeText={text => setQuantity(parseInt(text))}
              keyboardType="numeric"
              style={styles.quantityInput}
            />
            <TouchableOpacity style={styles.tang} onPress={() => setQuantity(quantity + 1)}>
              <Text style={{ color: 'black' }}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 10, color: 'black', fontSize: 25 }}>{calculateTotalPrice()}đ</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={add}>
          <Text style={{ color: 'white', fontSize: 20 }}>THÊM GIỎ HÀNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductDetail

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tang: {
    borderWidth: 1,
    width: 20,
    alignItems: 'center'
  },
  chitiet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    color: 'gray'
  },
  text: {
    color: 'gray',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold'
  },
  lineThrough: {
    borderWidth: 0.5,
    flex: 1,
    borderColor: 'gray',
    marginTop: 5
  },
  body: {
    margin: 40
  },
  header: {
    height: 70,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  next: {
    right: 30,
  },
  previous: {
    left: 30,
  },
  icon: {
    position: 'absolute',
    top: 150,
  },
  container: {
    flex: 1
  },
  pagerView: {
    width: '100%',
    height: 300,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#00772e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});