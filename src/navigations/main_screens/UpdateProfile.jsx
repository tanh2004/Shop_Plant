import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const UpdateProfile = () => {
  const navigation = useNavigation();

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
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>CHỈNH SỬA THÔNG TIN</Text>
        <View>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image style={styles.imagePerson} source={require('../../../assets/person.png')} />
      </View>
      <Text style={{marginTop: 20, color: 'black', fontSize: 15}}>Thông tin sẽ được lưu cho lần mua kế tiếp</Text>
      <Text style={{marginTop: 5, color: 'black', fontSize: 15}}>Bấm vào thông tin chi tiết để chỉnh sửa</Text>
      <View>
        <TextInput 
        />
      </View>
    </View>
  )
}

export default UpdateProfile

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
  imagePerson: {
    width: 100,
    height: 100
  }
})