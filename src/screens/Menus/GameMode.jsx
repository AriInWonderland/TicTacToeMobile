import { View, Text} from 'react-native'
import React from 'react'

import style from '../../App.css';

export default function GameMode({navigation}) {
  return (
    <View style={style.container}>
      <Text style={style.title}>Select a game mode!</Text>

      <Text style = {[style.button, {top:'30%'}]} onPress = {() => {console.log("PvP")}}>
        PvP{'\n'}<Text style={style.description}>Choose to play against another player, online or offline!</Text>
      </Text>

      <Text style = {[style.button, {top:'40%'}]} onPress = {() => {console.log("PvE"); navigation.navigate("PvEMenu")}}>
        PvE{'\n'}<Text style={style.description}>Choose one out of three difficulties to play against a bot!</Text>
      </Text>
    </View>
  )
}