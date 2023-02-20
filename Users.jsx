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
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  console.log("Looking for saved creentials...");
  if (result != undefined) {
    console.log(result);
    return result;
  } else {
    console.log('No values stored under that key.');
    return undefined;
  }
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

async function getUsers() {
    console.log("Retrieving users...");

    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((user) => {
      const sub = onSnapshot(doc(db, "users", user.data().id), (doc) => {
        const {NickName, playedGames, points, rank, ONplayedGames, ONpoints, ONrank, UID} = doc.data();
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
    });
  });
  console.log(users);
}

export default users;