import {React, useEffect, useState} from "react";
import db from "./database/firebase";
import { collection, addDoc, getDoc, getDocs} from "firebase/firestore"; 

const users = [];

async function getUsers() {
    console.log("Retrieving users...");

    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const {name, psswd, playedGames, points, rank, ONplayedGames, ONpoints, ONrank} = doc.data();
      users.push({
        id: doc.id,
        name,
        psswd,
        playedGames,
        points,
        rank,
        ONplayedGames,
        ONpoints,
        ONrank,
      });
    });
  console.log(users);
}
getUsers();

export default users;