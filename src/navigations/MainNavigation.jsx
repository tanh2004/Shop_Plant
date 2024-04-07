import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './main_screens/Home';
import Profile from './main_screens/Profile';
import Search from './main_screens/Search';
import Cart from './main_screens/Cart';
import UpdateProfile from './main_screens/UpdateProfile';
import CartHistory from './main_screens/CartHistory';
import ProductDetail from './main_screens/ProductDetail';
import { Image } from 'react-native';
import Notification from './main_screens/Notification';
import Payment from './main_screens/Payment';
import PaymentCart from './main_screens/PaymentCart';
import PaymentFinal from './main_screens/PaymentFinal';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () =>{
    return(
      <Tab.Navigator
      screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#008031',
          tabBarLabelStyle: { flexDirection: 'row', display: 'none' },
          tabBarIcon: ({ focused, color, size }) => {
              let iconSource;

              if (route.name === 'Home') {
                  iconSource = focused ? require('../../assets/icon/icon_home.png') : require('../../assets/icon/icon_home.png');
              } else if (route.name === 'Search') {
                  iconSource = focused ? require('../../assets/icon/icon_search.png') : require('../../assets/icon/icon_search.png');
              } else if (route.name === 'Notification') {
                  iconSource = focused ? require('../../assets/icon/icon_bell.png') : require('../../assets/icon/icon_bell.png');
              } else if (route.name === 'Profile') {
                  iconSource = focused ? require('../../assets/icon/profile.png') : require('../../assets/icon/profile.png');
              }

              return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
          },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notification" component={Notification} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
    ) 
}
const MainNavigation = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentCart" component={PaymentCart} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentFinal" component={PaymentFinal} options={{ headerShown: false }} />
        <Stack.Screen name="CartHistory" component={CartHistory} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}

export default MainNavigation
