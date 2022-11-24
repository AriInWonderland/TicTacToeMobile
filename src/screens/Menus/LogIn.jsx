import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import users from '../../../Users';
import {actualUser, changeUser} from './UserState';
    
const LogIn = ({navigation}) => {
    const [newUser, setState] = useState({
        name: "",
        passwd: "",
        verify: "",
    });

    const inputHandler = (name, value) => {
        setState({...newUser, [name]: value});
    }

    const logIn = () => {
        let names = [];
        let check;
        users.forEach((i) =>{
            names.push(i.name);
        })

        check = names.indexOf(newUser.name);

        if(check != -1 && users[check].psswd == newUser.passwd){
                navigation.navigate("Logged_In");
                changeUser(users[check].id);
        } 
        else if(check == -1)
                alert("Unknown user...");
        else
            alert("Wrong password");
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Please input your username and password!!!</Text>

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