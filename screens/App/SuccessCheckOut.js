import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const SuccessCheckOut = ({navigation}) => {

  return (
    <View style={styles.container}>
      {/* Icon GIF */}
      <Image
        source={{ uri: 'https://www.saigonroses.com/image/catalog/1_gtv/common/good.gif' }}
        style={styles.successImage}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.successText}>Đặt hàng thành công!</Text>

      {/* Button Back */}
      <TouchableOpacity
        style={styles.buttonBack}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textButton}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SuccessCheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  successImage: {
    width: 500,
    height: 500,
    margin: 0,
    // backgroundColor: 'red',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#41B100',
    marginBottom: 40,
  },
  buttonBack: {
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})
