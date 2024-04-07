import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './user_screens/Welcome';
import Login from './user_screens/Login';
import Register from './user_screens/Register';
import AppLogin from '../common/AppLogin';
import AppRegister from '../common/AppRegister';
const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Login" component={AppLogin}/>
        <Stack.Screen name="Register" component={AppRegister}/>
    </Stack.Navigator>
  )
}

export default UserNavigation

