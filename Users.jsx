/*ar1.sort((a,b) => {return a.points - b.points})
actualiza esto el ganador, todos se suscriben al resto de docs con onSnapshot
*/

import {React, useEffect, useState} from "react";
import db from "./database/firebase";
import { collection, addDoc, getDoc, getDocs, onSnapshot, doc} from "firebase/firestore"; 

import { onAuthStateChanged } from "firebase/auth";
import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const users = [];

export async function save(key, value) {
  console.log("Saving " + value + " as " + key);
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  console.log("Result: ", result);
  return result;
}

function getActualUserDoc (authenticate, UsersArray){
  var uid;
  var Doc;
  onAuthStateChanged(authenticate, (user) => {
    if(user){
      uid = user.UID;
    }
  });
  UsersArray.forEach((user) => {
    if(uid == user.UID){
      Doc = user;
    }
  });
  //necesito el doc
  console.log(Doc);
  return Doc;
}

export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    while(users.length > 0)
        users.pop(); 

    querySnapshot.forEach((user) => {
      const {NickName, playedGames, points, rank, ONplayedGames, ONpoints, ONrank, UID} = user.data();
      users.push({
        id: doc.id,
        NickName,
        playedGames,
        points,
        rank,
        ONplayedGames,
        ONpoints,
        ONrank,
        UID,
      });

      /*const sub = onSnapshot(doc(db, "users", user.data().id), (docData) => {

      })*/
    });
}

export default users;