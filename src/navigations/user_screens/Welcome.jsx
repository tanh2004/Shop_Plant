import { StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Login from './Login';

const Welcome = (props) => {
  const { navigation } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/logo.png')}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome to our Plant Shop!</Text>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});
