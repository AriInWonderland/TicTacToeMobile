import { View, Text} from "react-native";

import { useEffect, useState } from "react";

import users, { acutalDoc, getActualUserDoc } from '../../../Users';
import {getUsers} from '../../../Users';
import style from '../../App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function WaitingScreen ({navigation}){
    const [time, setTime] = useState(0);
    getUsers();
    useEffect(() => {
        setTimeout(() => {
            if(users.length > 0){
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