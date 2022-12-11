import {React, useEffect, useState} from "react";
import db from "./database/firebase";
import { collection, addDoc, getDoc, getDocs} from "firebase/firestore"; 

import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from "firebase/auth";

const logOut = () =>{
    console.log("log out");
    signOut(auth).then(() =>{
        navigation.popToTop();
    }).catch((error) =>{
        console.log(error.code);
        console.log(error.Message);
        alert("An error occured while logging out...");
    });
}

const users = [];

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

    querySnapshot.forEach((doc) => {
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
  console.log(users);
}

getUsers();

export default users;