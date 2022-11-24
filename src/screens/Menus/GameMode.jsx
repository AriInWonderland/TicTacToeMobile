import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function GameMode({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a game mode!</Text>

      <Text style = {styles.button} onPress = {() => {navigation.navigate("Classic_Menu"); console.log("Classic (offline)")}}>
        Offline
      </Text>

      <Text style = {styles.button} onPress = {() => console.log("Online")}>
        OnLine
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#6e3d8b', 
        alignItems: 'center',
        flex: 1,
    },
    title:{
        top: "20%",
        fontSize: 50,
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'white',
    },
    button:{
        flexDirection: 'column',
        backgroundColor: '#2f1a3b',
        color: 'white',
        margin: 20,
        textAlign: 'center',
        fontSize: 26,
        padding: 10,
        top: 346,
        width: "50%",
        borderRadius: 50, 
    },
})