import { View, Text} from "react-native";

import { useEffect, useState } from "react";

import { getUsers, users } from '../../../Users';
import style from '../../App.css';

export default function WaitingScreen ({navigation}){
    const [time, setTime] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            console.log("Checking...");
            //setTime(time + 1);
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