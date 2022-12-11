import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

import { AsyncStorage } from '@react-native-async-storage/async-storage';

import logOut from "../../../Users"

const Logged = ({navigation}) => {
  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>
        You have successfully logged into Tic-Tac-Toe_Mobile!
      </Text>

      <Text style = {styles.button} onPress = {() => {navigation.navigate('Select_Game_Mode'); console.log("Play");}}>
        Play!
      </Text>

      <Text style = {styles.button} onPress = {() => console.log("Skins")}>
        Skins
      </Text>

      <Text style = {styles.button} onPress = {() => navigation.navigate("UserDetails")}>
        Account
      </Text>

      <Text style = {styles.subtitle} onPress = {() => logOut()}>
        LogOut
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#6e3d8b', 
    flex: 1,
    alignItems: 'center',
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
    top: 300,
    width: "50%",
    borderRadius: 50, 
  },
  subtitle:{
    margin: 10,
    top: "40%",
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
})

export default Logged;