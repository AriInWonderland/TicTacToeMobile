import { View, Text, Alert } from 'react-native'
import React from 'react'
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import {useEffect} from 'react';

import style from '../../App.css'
import {actualDoc, getActualUserDoc} from '../../../Users';

const Logged = ({navigation}) => {
  getActualUserDoc();

  const logOut = () =>{
    console.log("log out");
    const auth = getAuth();
    console.log("Auth = ", auth)
    signOut(auth)
      .then(() =>{
        SecureStore.deleteItemAsync("email");
        SecureStore.deleteItemAsync("password");
        navigation.popToTop();
      }).catch((error) =>{
        console.log(error.code);
        console.log(error.Message);
        alert("An error occured while logging out...");
      });
  }

  return (
    <View style={style.container}>
        
      <Text style={style.title}>
        You have successfully logged into Tic-Tac-Toe_Mobile!
      </Text>

      <Text style = {[style.button, style.bt]} onPress = {() => {navigation.navigate('Select_Game_Mode'); console.log("Play");}}>
        Play!
      </Text>

      <Text style = {[style.button, style.bt]} onPress = {() => Alert.alert("Sorry but his feature isn't ready yet.")}>
        Skins
      </Text>

      <Text style={[style.button, style.bt]}>
        Offline Ranks
      </Text>

      <Text style={[style.button, style.bt]}>
        Online Ranks
      </Text>

      <Text style = {[style.button, style.bt]} onPress = {() => navigation.navigate("UserDetails", {doc: actualDoc})}>
        Account
      </Text>

      <Text style = {style.link_like} onPress = {() => logOut()}>
        LogOut
      </Text>
    </View>
  )
}
export default Logged;