import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
    
const LogIn = ({navigation}) => {
    const [User, setState] = useState({
        email: "",
        passwd: "",
    });

    const inputHandler = (name, value) => {
        setState({...User, [name]: value});
    }

    const auth = getAuth();
    const logIn = () => {
        signInWithEmailAndPassword(auth, User.email, User.passwd)
            .then((userCredential) => {
                //Signed in!!!
                const user = userCredential.user;
                navigation.navigate("Logged_In");
            })
            .catch((error) => {
                console.error(error.code)
                console.error(error.message)
            });
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Please input your username and password!!!</Text>

        <TextInput 
            style={styles.txtinput} 
            placeholder="Email"
            onChangeText = {(value) => {inputHandler("email", value)}}
        /> 
        <TextInput 
            style={styles.txtinput} 
            placeholder="Password"
            onChangeText={(value) => inputHandler("passwd", value)}
            secureTextEntry ={true}
        /> 

        <Text style={styles.createbt} onPress = {() => logIn()} >Log me in!!!</Text>
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