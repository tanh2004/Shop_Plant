import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import AxiosInstance from '../../helpers/AxiosInstance';


const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {

    try {
      const response = await AxiosInstance().get(`/products/search?name=${searchText}&page=1`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: item.images[0] || 'https://cdn.pixabay.com/photo/2024/02/22/15/18/clouds-8590310_640.jpg' }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price}đ</Text>
        <Text style={{ color: 'black' }}>Còn {item.quantity} sp</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require('../../../assets/icon/ic_back.png')}
        />
        <Text style={{ fontSize: 25, color: 'black' }}>Tìm kiếm</Text>
        <View></View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm sản phẩm"
          onChangeText={text => setSearchText(text)}
        value={searchText}
        onEndEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => handleSearch(searchText)} style={styles.searchIcon}>
          <Image source={require('../../../assets/icon/icon_search.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    margin: 30
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 15,
    padding: 10
  },
  searchIcon: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: 'black'
  },
  price: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
});

