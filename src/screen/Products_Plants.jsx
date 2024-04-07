import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

// Define your Plan data here

const Products_Plants = () => {
    const [activeTab, setActiveTab] = useState('Tất cả');
    const [filteredProducts, setFilteredProducts] = useState(Plan);

    const changeTab = (tabName) => {
        setActiveTab(tabName);
        // Filter products based on selected tab
        if (tabName === 'Tất cả') {
            setFilteredProducts(Plan);
        } else {
            const filtered = Plan.filter(product => product.type === tabName);
            setFilteredProducts(filtered);
        }
    };

    const renderItem = ({ item }) => {
        const { name, type, price, avatar } = item;
        return (
            <TouchableOpacity style={styles.productItem}>
                <View style={{ backgroundColor: '#f6f6f6' }}>
                    <Image source={{ uri: item.avatar }} style={styles.productImage} />
                </View>
                <Text style={styles.productName}>{name}</Text>
                <Text>{type}</Text>
                <Text style={styles.price}>{price}đ</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/icon/ic_back.png')}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'black' }}>CÂY TRỒNG</Text>
                <TouchableOpacity>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/icon/ic_shop.png')}
                    />
                </TouchableOpacity>
            </View>
            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Tất cả' && styles.activeTab]}
                    onPress={() => changeTab('Tất cả')}>
                    <Text style={[styles.tabText, activeTab === 'Tất cả' && styles.activeTabText]}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Hàng mới về' && styles.activeTab]}
                    onPress={() => changeTab('Hàng mới về')}>
                    <Text style={[styles.tabText, activeTab === 'Hàng mới về' && styles.activeTabText]}>Hàng mới về</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Ưa sáng' && styles.activeTab]}
                    onPress={() => changeTab('Ưa sáng')}>
                    <Text style={[styles.tabText, activeTab === 'Ưa sáng' && styles.activeTabText]}>Ưa sáng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Ưa bóng' && styles.activeTab]}
                    onPress={() => changeTab('Ưa bóng')}>
                    <Text style={[styles.tabText, activeTab === 'Ưa bóng' && styles.activeTabText]}>Ưa bóng</Text>
                </TouchableOpacity>
            </View>
            {/* Product List */}
            <FlatList
                data={filteredProducts}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Products_Plants;

const styles = StyleSheet.create({
    header: {
        height: 70,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    tab: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    tabText: {
        fontSize: 16,
    },
    activeTab: {
        backgroundColor: '#006f22',
        borderRadius: 5
    },
    activeTabText: {
        color: 'white',
    },
    flatListContainer: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    productName: {
        color: 'black',
        fontSize: 18,
    },
    productItem: {
        position: 'relative',
        marginRight: 10,
        marginLeft: 15,
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
    price: {
        color: 'green',
        fontSize: 18
    },
});
var Plan = [{
    "id": 1,
    "name": "Rollinia",
    "type": "Ưa sáng",
    "size": "nhỏ",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000294-cay-xanh-tai-hinh-cay-canh-png-180.png"
}, {
    "id": 2,
    "name": "Song Of India",
    "type": "Ưa bóng",
    "size": "Nhỏ",
    "origin": "Việt Nam",
    "status": 160,
    "price": "200.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000194-cay-xanh-tai-hinh-cay-canh-png-80.png"
}, {
    "id": 3,
    "name": "Pink Anthurium",
    "type": "Ưa bóng",
    "size": "nhỏ",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000156-cay-xanh-chau-cay-tai-hinh-cay-canh-png-42.png"
}, {
    "id": 4,
    "name": "Black Love Plant",
    "type": "Ưa sáng",
    "size": "nhỏ",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000125-cay-xanh-chau-cay-tai-hinh-cay-canh-png-11.png"
}, {
    "id": 5,
    "name": "Grey Start Plan",
    "type": "Ưa sáng",
    "size": "Lớn",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000193-cay-nhiet-doi-cay-chuoi-canh-tai-hinh-cay-canh-png-79.png"
}, {
    "id": 6,
    "name": "Banana Plant",
    "type": "Ưa sáng",
    "size": "Lớn",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000286-cay-nhiet-doi-cay-chuoi-canh-tai-hinh-cay-canh-png-172.png"
}, {
    "id": 7,
    "name": "Orange Plan",
    "type": "Ưa sáng",
    "size": "Lớn",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000193-cay-nhiet-doi-cay-chuoi-canh-tai-hinh-cay-canh-png-79.png"
}, {
    "id": 8,
    "name": "Kapuche Plant",
    "type": "Ưa sáng",
    "size": "Lớn",
    "origin": "Việt Nam",
    "status": 160,
    "price": "240.000",
    "avatar": "https://free.vector6.com/wp-content/uploads/2021/03/0000000286-cay-nhiet-doi-cay-chuoi-canh-tai-hinh-cay-canh-png-172.png"
}
]