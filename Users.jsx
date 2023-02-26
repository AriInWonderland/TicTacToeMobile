/*ar1.sort((a,b) => {return a.points - b.points})
actualiza esto el ganador, todos se suscriben al resto de docs con onSnapshot
*/

import {React, useEffect, useState} from "react";
import db from "./database/firebase";
import { collection, getDocs, query, onSnapshot} from  "firebase/firestore"; 

import { onAuthStateChanged, getAuth } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const users = [];
export const actualDoc = [];

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

//usar async para forzar que espere la fiunciopn esta
export function getActualUserDoc(){
  while(actualDoc.length > 0)
    actualDoc.pop();
  const auth = getAuth();
  onAuthStateChanged(auth,(player)=>{ 
    users.forEach((user)=>{
        if(user.UID == player.uid){
          actualDoc.push(user);
        }
      })
  }) 
  console.log("Got actual user");
  return;
}

export function getUser(auth, uid){
  users.forEach((user)=>{
    if(user.UID == uid){
      console.log("Got user");
      return user;
    }
  })
}

export async function getUsers() {
    //const querySnapshot = await getDocs(collection(db, "users"));
    while(users.length > 0)
        users.pop(); 
    
    const q = query(collection(db,"users"));
    const unsubscribe = onSnapshot(q, (querySnap)=>{
      while(users.length > 0)
          users.pop(); 
      while(actualDoc.length > 0)
        actualDoc.pop();
      querySnap.forEach((doc)=>{
        users.push(doc.data());
      });
      getActualUserDoc();
    });
    /* esta es la "original"
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
      });*/

      /*const sub = onSnapshot(doc(db, "users", user.data().id), (docData) => {

      })*/
    //});
}

export default users;