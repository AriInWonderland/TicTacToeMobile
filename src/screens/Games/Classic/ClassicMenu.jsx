import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ClassicMenu({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>How do you want to play?</Text>

        <Text style = {styles.button} onPress = {() => {navigation.navigate("Classic_Game", {diff: "LOCAL"});console.log("Local");}}>
            Local PvP
            <Text style={[styles.title, styles.description]}>                                A local game between two players on your own phone</Text>
        </Text>
        <Text style = {styles.button} onPress = {() => {navigation.navigate("Classic_Game", {diff: "BOT_EASY"})}}>
            Easy Bot
            <Text style={[styles.title, styles.description]}>                                   A local game against a bot which is easy to defeat</Text>
        </Text>

        <Text style = {styles.button} onPress = {() => {navigation.navigate("Classic_Game", {diff: "BOT_MEDIUM"})}}>
            Intermediate Bot
        <Text style={[styles.title, styles.description]}>                                A local game against a bot which is harder to defeat</Text>
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
        top: 300,
        width: "50%",
        borderRadius: 50, 
    },
    description:{
        fontSize: 15,
        fontStyle: 'italic',
    },
})