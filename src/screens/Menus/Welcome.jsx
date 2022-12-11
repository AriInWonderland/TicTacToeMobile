import { View, Text, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'

import { collection, addDoc, getDoc, getDocs} from "firebase/firestore"; 
import db from "../../../database/firebase"
import { async } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { AsyncStorage } from '@react-native-async-storage/async-storage';

const Welcome = ({navigation}) => { 

    const map = [gameMap, setMap] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    const [newUser, setState] = useState({
        email: "",
        nick: "",
        password: "",
        verify: "",
    });

    const inputHandler = (name, value) => {
        setState({...newUser, [name]: value});
    }

    const addUser = () => {
        console.log("Adding a user...");
        if(!newUser.email)
            alert("Add an email");
        if(!newUser.nick)
            alert("Please choose a Nickname!");
        if(!newUser.password)
            alert("Add a password");
        if(!newUser.verify)
            alert("You MUST verify your password");

        var check;
        newUser.password === newUser.verify ? check = true : alert("Please verify your password.");

        if(newUser.email && newUser.nick && check){
            console.log("All checks passed");
                console.log("Trying to create user...");
                const auth = getAuth();
                console.log("Got auth...");
                createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                    .then((userCredential) => {
                        console.log("Logging in...");
                        const user = userCredential.user;
                        console.log("[addUser]Creating user doc...");
                        createUserDoc();
                        navigation.navigate("Logged_In");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("Sorry...\nError code: "+errorCode+"\nError Message: " + errorMessage);
                     });
        }
    }

    createUserDoc = async () => {
        console.log("[createUserDoc]Creating user doc...");
        try{
            const docRef = await addDoc(collection(db, "users"), {
                NickName: newUser.nick,
                ONplayedGames: 0,
                ONpoints: 0,
                ONrank: -1,
                playedGames: 0,
                points: 0,
                rank: -1
            });
            console.log("User created.");
        } catch (error){
            console.error("Error creating user doc", error);
        }
    }

   return (
        <View style={styles.container}>
            <Text style={styles.title}>Please create an account or log-in!!!</Text>

            <TextInput 
                style={styles.txtinput} 
                placeholder="Email"
                onChangeText = {(value) => {inputHandler("email", value)}}
            />
            <TextInput 
                style={styles.txtinput} 
                placeholder="NickName"
                onChangeText = {(value) => {inputHandler("nick", value)}}
            />  
            <TextInput 
                style={styles.txtinput} 
                placeholder="Password"
                onChangeText={(value) => inputHandler("password", value)}
                secureTextEntry ={true}
            /> 
            <TextInput 
                style={styles.txtinput} 
                placeholder="Verify Password"
                onChangeText={(value) => inputHandler("verify", value)}
                secureTextEntry = {true}
            /> 

            <Text style={styles.createbt} onPress = {() => addUser()}>Create!!!</Text>
            <Text style={[styles.title, styles.subtitle]}>Already have an account?</Text>
            <Text style={styles.loginbt } onPress = {() => navigation.navigate("LogIn")}>Log in</Text>

            <Text style={styles.loginbt } onPress = {() => navigation.navigate("Ranks")}>[RankDEBUG]</Text>
            <Text style={styles.loginbt } onPress = {() => mapTest()}>[DEBUG]</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#6eff',
        flex: 1,
        alignItems: 'center',
    },
    title:{
        top: "15%",
        fontSize: 50,
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'white',
    },
    subtitle:{
        margin: 10,
        top: "26%",
        fontSize: 16,
        color: 'white',
    },
    txtinput:{
        color: 'white', 
        borderColor: 'white',
        top: "25%",
        borderWidth: 1,
        padding: 15,
        borderRadius: 50,
        width: 350,
        fontSize: 24,
        margin: 15,
    },
    createbt:{
        flexDirection: 'column',
        backgroundColor: '#2f1a3b',
        color: 'white',
        margin: 10,
        textAlign: 'center',
        fontSize: 26,
        padding: 10,
        top: '25%',
        width: "50%",
        borderRadius: 50,  
    },
    loginbt:{
        flexDirection: 'column',
        backgroundColor: '#2f1a3b',
        color: 'white',
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        top: '25%',
        width: "40%",
        borderRadius: 50,   
    },
})

export default Welcome;