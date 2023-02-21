import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import   AsyncStorage                 from "@react-native-async-storage/async-storage";

import * as SecureStore from 'expo-secure-store';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import style from "../../App.css";
    
import { getValueFor, save } from '../../../Users';


const LogIn = ({navigation}) => {
    const key1 = "email";
    const key2 = "password"
    //Aca directamente te logea si tenes guardado tu login en el cache
    const [val, setVal] = useState('');
    const [val1, setVal1] = useState('');
    const [User, setState] = useState({
        email: "",
        passwd: "",
    });

    const inputHandler = (name, value) => {
        setState({...User, [name]: value});
    }

    const auth = getAuth();
    const logIn = () => {
        onChangeName(User.email);
        onChangePass(User.passwd);
        signInWithEmailAndPassword(auth, User.email, User.passwd)
            .then((userCredential) => {
                //Signed in!!!
                save(key1, User.email);
                save(key2, User.passwd);
                const user = userCredential.user;
                User.email = "";
                User.passwd = "";
                setVal('');
                setVal1('');
                navigation.navigate("WaitingScreen");
            })
            .catch((error) => {
                console.error(error.code)
                console.error(error.message)
            });
    }

    const resetPassword = () => {
        const auth = getAuth();
        if(!User.email){
            Alert.alert("Please input your email first!");
            return;
        }
        sendPasswordResetEmail(auth, User.email)
            .then(() => {Alert.alert("You can now check your inbox!")})
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert("Sorry!!!",
                            error.message);
            })
    }

  return (
    <View style={style.container}>
        <Text style={style.title}>Please input your username and password!!!</Text>

        <TextInput 
            style={style.txtinput} 
            placeholder="Email"
            placeholderTextColor="#f0f8ff81"
            value = {val}
            onChangeText = {(value) => {inputHandler("email", value); setVal(value);}}
        /> 
        <TextInput 
            style={style.txtinput} 
            placeholder="Password"
            placeholderTextColor="#f0f8ff81"
            value = {val1}
            onChangeText={(value) => {inputHandler("passwd", value); setVal1(value)}}
            secureTextEntry ={true}
        /> 

        <Text style={style.link_like} onPress= {() => resetPassword()}>Forgot password?</Text>
        <Text style={style.button} onPress = {() => {
                                                        logIn();
                                                        }} >Log me in!!!</Text>
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
        margin: 4,
        top: "26%",
        fontSize: 20,
        fontStyle: 'italic',
        textDecorationStyle: 'dashed',
        color: 'white',
        textDecorationLine: 'underline',
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
        top: '28%',
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



export default LogIn