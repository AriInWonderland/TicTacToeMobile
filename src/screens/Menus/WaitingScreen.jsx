import { View, Text} from "react-native";

import { useEffect, useState } from "react";

import users from '../../../Users';
import {getUsers} from '../../../Users';
import style from '../../App.css';

export default function WaitingScreen ({navigation}){
    const [time, setTime] = useState(0);
    getUsers();
    useEffect(() => {
        setTimeout(() => {
            console.log("Checking...");
            if(users.length > 0){
                console.log(users);
                navigation.navigate("Logged_In");
            } else {
                setTime(time + 1);
            }
        }, 50);
    }, [time])

    return(
        <View style={style.container}>
            <Text style={style.title}>
                Fetching User data...
            </Text>
        </View>
    );
}