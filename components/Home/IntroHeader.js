import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const IntroHeader = () => {
  const userName = 'John Doe'
  const user = 'https://i.guim.co.uk/img/media/327aa3f0c3b8e40ab03b4ae80319064e401c6fbc/377_133_3542_2834/master/3542.jpg?width=620&dpr=1&s=none&crop=none'
  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        margin:8
      }}>
        <Image source={{ uri: user }} style={{ width: 45, height: 45, borderRadius: 99 }} />
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'outfit-bold',
          marginLeft: 10
        }}>Hello,{userName}</Text>
      </View>
    </View>
  )
}

export default IntroHeader

const styles = StyleSheet.create({})