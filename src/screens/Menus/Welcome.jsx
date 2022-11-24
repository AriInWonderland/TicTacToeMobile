import { View, Text, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'

import { collection, addDoc, getDoc, getDocs} from "firebase/firestore"; 
import db from "../../../database/firebase"
import { async } from '@firebase/util';

import {actualUser, changeUser} from './UserState';
import users from '../../../Users';

const Welcome = ({navigation}) => { 

    const map = [gameMap, setMap] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    const [newUser, setState] = useState({
        name: "",
        passwd: "",
        verify: "",
    });

    const inputHandler = (name, value) => {
        setState({...newUser, [name]: value});
    }

    const addUser = async () => {
        let check = false;

        if(!newUser.name)
            alert("Add nickname");
        if(users.some((i)=>{
            return i.name === newUser.name;
        }))
            alert("Other user has already taken that name.");

        if(!newUser.passwd)
            alert("Add pswd");
        if(!newUser.verify)
            alert("You MUST verify your psswd");

        newUser.passwd === newUser.verify ? check = true : alert("Please verify your password.");

        if(newUser.name && newUser.passwd && check)
            try{
                await addDoc(collection(db, "users"),{
                    name:        newUser.name,
                    psswd:       newUser.passwd,
                    playedGames: 0,
                    points:      0,
                    rank:       -1, 
                    ONplayedGames: 0,
                    ONpoints: 0,
                    ONrank: -1,
            });
            alert("Welcome "+ newUser.name +"!!!");
            } catch {
                alert("Failed to create new user...");
            }
    }

    //console.log(users);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please create an account or log-in!!!</Text>

            <TextInput 
                style={styles.txtinput} 
                placeholder="NickName"
                onChangeText = {(value) => {inputHandler("name", value)}}
            /> 
            <TextInput 
                style={styles.txtinput} 
                placeholder="Password"
                onChangeText={(value) => inputHandler("passwd", value)}
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
            <Text style={styles.loginbt } onPress = {() => navigation.navigate("LogIn")  }>Log in</Text>

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