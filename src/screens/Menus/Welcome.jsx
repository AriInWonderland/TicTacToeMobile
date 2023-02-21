import { View, Text, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'

import { collection, addDoc, getDoc, getDocs} from "firebase/firestore"; 
import db from "../../../database/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import * as SecureStore from 'expo-secure-store';

import style from '../../App.css';
import { getValueFor, save } from '../../../Users';

const Welcome = ({navigation}) => { 
    let user;
    let pass;
    useEffect(() => {
        user = getValueFor("email"); 
        pass = getValueFor("password"); 
    }, [])
    const auth = getAuth();
    const [val, setVal] = useState('');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [val3, setVal3] = useState(''); 
    const [userName, onChangeName] = React.useState('Your value here');
    const [userPass, onChangePass] = React.useState('Your value here');
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
                createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                    .then((userCredential) => {
                        console.log("Logging in...");
                        const user = userCredential.user;
                        console.log("[addUser]Creating user doc...");
                        createUserDoc();
                        save('email', newUser.email);
                        save('password', newUser.password);
                        setVal('');
                        setVal1('');
                        setVal2('');
                        setVal3('');
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
        <View style={style.container}>
            <Text style={style.title}>Please create an account or log-in!!!</Text>

            <TextInput 
                style={style.txtinput} 
                placeholder="Email"
                placeholderTextColor="#f0f8ff81"
                value = {val}
                onChangeText = {(value) => {inputHandler("email", value);setVal(value);}}
   />
            <TextInput 
                style={style.txtinput} 
                placeholder="NickName"
                placeholderTextColor="#f0f8ff81"
                value = {val1}
                onChangeText = {(value) => {inputHandler("nick", value); setVal1(value)}}
            />  
            <TextInput 
                style={style.txtinput} 
                placeholder="Password"
                placeholderTextColor="#f0f8ff81"
                value = {val2}
                onChangeText={(value) => {inputHandler("password", value); setVal2(value)}}
                secureTextEntry ={true}
            /> 
            <TextInput 
                style={style.txtinput} 
                placeholder="Verify Password"
                placeholderTextColor="#f0f8ff81"
                value = {val3}
                onChangeText={(value) => {inputHandler("verify", value); setVal3(value)}}
                secureTextEntry = {true}
            /> 

            <Text style={style.button} onPress = {() => addUser()}>Create!!!</Text>
            <Text style={[style.title, style.subtitle]}>Already have an account?</Text>
   
            <Text style={[style.button, {
                width: '35%',
                fontSize: 20, 
            }]} onPress = {() => {
                                    if(user != undefined){
                                        signInWithEmailAndPassword(auth, user._z, pass._z)
                                            .then((userCredential) =>{
                                                navigation.navigate("WaitingScreen");
                                            })
                                            .catch((error) =>{
                                                console.log(error.code);
                                                console.log(error.message);
                                            });
                                    }
                                    else{
                                        navigation.navigate("LogIn");
                                        setVal('');
                                        setVal1('');
                                        setVal2('');
                                        setVal3('');
                                    }
                                }}>Log in</Text>
        </View> 
    )
}
export default Welcome;