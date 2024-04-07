import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/Reducer';
import { useDispatch } from 'react-redux';

const Profile = () => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 25 }}>Profile</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Image style={styles.imagePerson} source={require('../../../assets/person.png')} />
        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text style={{ color: 'black', fontSize: 18 }}>Nguyễn Thanh Tánh</Text>
          <Text>tanhntps30053@gmail.com</Text>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={{ borderBottomWidth: 0.5, height: 30 }}>
          <Text style={{ fontSize: 18 }}>Chung</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
          <Text style={styles.text}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartHistory')}>
          <Text style={styles.text} >Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Q & A</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={{ borderBottomWidth: 0.5, height: 30 }}>
          <Text style={{ fontSize: 18 }}>Bảo mật và điều khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Chính sách quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          dispatch(logout());
        }} >
          <Text style={{
            marginTop: 20,
            color: 'red',
            fontSize: 18,
            fontWeight: 'bold'
          }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffff',
    flex: 1,
    margin: 40
  },
  imagePerson: {
    width: 50,
    height: 50
  },
  text: {
    marginTop: 20,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})