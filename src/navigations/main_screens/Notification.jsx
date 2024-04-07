import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={styles.container} >
      <Text>Không có thông báo nào</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
})