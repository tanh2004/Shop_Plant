import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import UserNavigation from './UserNavigation'
import MainNavigation from './MainNavigation'
import { useSelector, useDispatch } from 'react-redux'


const AppNavigation = () => {
    const appState = useSelector(state => state.app);
    console.log(appState);
  return (
    <NavigationContainer>
        {appState.user ? <MainNavigation/> : <UserNavigation/>}
    </NavigationContainer>
  )
}

export default AppNavigation