import { getAuth, signOut } from 'firebase/auth';
import { Text, StyleSheet, ScrollView, View} from 'react-native';

import { AsyncStorage } from '@react-native-async-storage/async-storage';

import {users, getUserDoc} from '../../../Users';

const auth = getAuth();
actualUser = getUserDoc(auth, users);

//Es onda una carta, el fondo de esta es el avatar, si no entra todo el resto es el avatar pero blureado
export default function Ranks({navigation}) {
    return(
    <View style={styles.container}>
            <View style={styles.listbg}>
                <Text style={styles.title}>     NickName:</Text>
                <Text style={[styles.subtitle, {textAlign: 'left'}]}>   {users[actualUserIndex].name}</Text>
                
                <View style={styles.line}></View>

                <Text style={[styles.title, {textAlign: 'center'}]}>     Offline Stats</Text>
                <Text style={styles.title}>     Games Played:</Text>
                <Text style={styles.subtitle}> {actualUser.playedGames}</Text>
                <Text style={styles.title}>     Points:</Text>
                <Text style={styles.subtitle}> {actualUser.points}</Text>
                <Text style={styles.title}>     Rank:</Text>
                {actualUser.rank > 0 ? <Text style={styles.subtitle}> {actualUser.rank}</Text> : <Text style={styles.subtitle}>-</Text>}

                <View style={styles.line}></View>

                <Text style={[styles.title, {textAlign: 'center'}]}>     Online Stats</Text>
                <Text style={styles.title}>     Games Played:</Text>
                <Text style={styles.subtitle}> {actualUser.ONplayedGames}</Text>
                <Text style={styles.title}>     Points:</Text>
                <Text style={styles.subtitle}> {actualUser.ONpoints}</Text>
                <Text style={styles.title}>     Rank:</Text>
                {actualUser.ONrank > 0 ? <Text style={styles.subtitle}> {actualUser.ONrank}</Text> : <Text style={styles.subtitle}>-</Text>}

                <View style={styles.line}></View>
            </View>
    </View>
    )
}

{/*<Text style={styles.title}>  {users[getUserIndex(actualUser)].name}</Text>*/}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#6e3d8b',
        flex: 1,
        alignContent: 'center',
    },
    title:{
        color:'grey',
        top: '3%',
        fontSize:  25,
        marginTop: 10,
    },
    subtitle:{
        top: "3%",
        marginRight: '10%',
        fontSize: 50,
        fontStyle: 'italic',
        textAlign: 'right',
        color: 'white',
    },
    listbg:{
        backgroundColor: '#211229',
        margin: 10,
        borderRadius: 50,
        top: "5%",
        marginBottom: "20%",
        flex: 1,
    }, 
    line:{
        top: "4%",
        width  : '100%',
        height : 4,
        backgroundColor : '#4D4153',
        borderRadius: 50,
    },
})