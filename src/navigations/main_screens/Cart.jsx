import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItemFromCart } from '../../redux/Reducer';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';



const Cart = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const cart = useSelector(state => state.app.cart);

  const [modalVisible, setModalVisible] = useState(false);
  // State to manage checkbox toggle
  const [checkedItems, setCheckedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const handleCheckboxToggle = (item) => {
    // Toggle the checkbox status
    if (checkedItems.includes(item._id)) {
      setCheckedItems(checkedItems.filter(id => id !== item._id));
    } else {
      setCheckedItems([...checkedItems, item._id]);
    }
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ _id: item._id }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ _id: item._id }));
  };

  const handleRemove = (item) => {
    dispatch(removeItemFromCart({ _id: item._id }));
  };

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      // Kiểm tra xem item có trong checkedItems không
      if (checkedItems.includes(item._id)) {
        // Nếu có, thì tính tổng giá tiền cho item đó
        return acc + item.price * item.quantity;
      } else {
        // Nếu không, giữ nguyên giá trị tổng giá tiền
        return acc;
      }
    }, 0);
    setCartTotal(totalPrice);
  }, [cart, checkedItems]);

  

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
        <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Giỏ hàng</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../../../assets/icon/ic_delete.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {cart.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleCheckboxToggle(item)}>
              {checkedItems.includes(item._id) ? (
                <Image source={require('../../../assets/icon/ic_check.png')} style={styles.checkbox} />
              ) : (
                <View style={styles.checkbox} />
              )}
            </TouchableOpacity>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={{ fontSize: 18, color: '#007537', margin: 2 }}>{item.price}đ</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleDecrement(item)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(item)} style={styles.removeButton}>
                  <Text style={styles.buttonTextDelete}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Tạm tính</Text>
          <Text style={styles.total}>{cartTotal}đ</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Payment', { cartTotal: cartTotal })} style={{ backgroundColor: '#007537', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 17 }}> TIẾN HÀNH THANH TOÁN </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ color: 'black', fontSize: 18 }}>Xác nhận xóa đơn hàng?</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>Thao tác này không thể khôi phục.</Text>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity
                style={{ backgroundColor: '#007537', width: 300, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10 }}
                onPress={() => {
                  // Xử lý xóa các mặt hàng đã chọn
                  checkedItems.forEach(itemId => {
                    const item = cart.find(item => item._id === itemId);
                    if (item) {
                      handleRemove(item);
                    }
                  });
                  // Đóng modal
                  toggleModal();
                }}>
                <Text style={{ color: 'white' }}>Đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'black', borderBottomWidth: 1, }}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 550,
    alignItems: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,

    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checked: {
    backgroundColor: 'green',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    color: 'black',
    fontSize: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  button: {
    borderWidth: 2,
    width: 25,
    alignItems: 'center'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  buttonTextDelete: {
    color: 'black',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontSize: 15
  },
  header: {
    height: 70,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removeButton: {
    marginLeft: 80,
    width: 30,
    alignItems: 'center'
  },
  quantity: {
    marginHorizontal: 10,
    minWidth: 20,
    color: 'black',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
  },
  total: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    marginRight: 5
  },
});
