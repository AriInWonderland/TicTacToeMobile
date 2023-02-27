import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import style from '../../../App.css';

export default function PvEMenu({navigation}) {
  return (
    <View style={style.container}>
        <Text style={style.title}>How do you want to play?</Text>

        <Text style = {[style.button, {top: '25%'}]} onPress = {() => {navigation.navigate("Classic_Game", {diff: "LOCAL"});console.log("Local");}}>
            Local PvP
            <Text style={style.description}>{'\n'}A local game between two players on your own phone</Text>
        </Text>
        <Text style = {[style.button, {top:'30%'}]} onPress = {() => {navigation.navigate("Classic_Game", {diff: "BOT_EASY"})}}>
            Easy Bot
            <Text style={style.description}>{'\n'}A local game against a bot which is easy to defeat</Text>
        </Text>

        <Text style = {[style.button, {top:'35%'}]} onPress = {() => {navigation.navigate("Classic_Game", {diff: "BOT_MEDIUM"})}}>
            Intermediate Bot
        <Text style={style.description}>{'\n'}A local game against a bot which is harder to defeat</Text>
        </Text>
  </View>
  )
}