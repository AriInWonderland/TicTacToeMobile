import { View, Text} from "react-native";

import { useEffect } from "react";

import { getUsers, users } from '../../../Users';
import style from '../../App.css';

export default function WaitingScreen ({navigation}){
    useEffect(() => {
        setTimeout(() => {
            console.log("Checking...");
        }, 10);
    }, [])

    return(
        <View style={style.container}>
            <Text style={style.title}>
                Fetching User data...
            </Text>
        </View>
    );
}