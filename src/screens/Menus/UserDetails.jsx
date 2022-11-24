import { Text, StyleSheet, ScrollView, View} from 'react-native';
import users from "../../../Users"
import { actualUser } from './UserState';

const getUserIndex = (id) =>{
    let ids = [];
    users.forEach((i) => {
        ids.push(i.id);
    })
    console.log(users);
    return ids.indexOf(id);
}

//Es onda una carta, el fondo de esta es el avatar, si no entra todo el resto es el avatar pero blureado
export default function Ranks({navigation}) {
    const actualUserIndex = getUserIndex(actualUser);
    console.log("\nActual User:");
    console.log(users[actualUserIndex]);
    return(
    <View style={styles.container}>
            <View style={styles.listbg}>
                <Text style={styles.title}>     NickName:</Text>
                <Text style={[styles.subtitle, {textAlign: 'left'}]}>   {users[actualUserIndex].name}</Text>
                
                <View style={styles.line}></View>

                <Text style={[styles.title, {textAlign: 'center'}]}>     Offline Stats</Text>
                <Text style={styles.title}>     Games Played:</Text>
                <Text style={styles.subtitle}> {users[actualUserIndex].playedGames}</Text>
                <Text style={styles.title}>     Points:</Text>
                <Text style={styles.subtitle}> {users[actualUserIndex].points}</Text>
                <Text style={styles.title}>     Rank:</Text>
                {users[actualUserIndex].rank > 0 ? <Text style={styles.subtitle}> {users[actualUserIndex].rank}</Text> : <Text style={styles.subtitle}>-</Text>}

                <View style={styles.line}></View>

                <Text style={[styles.title, {textAlign: 'center'}]}>     Online Stats</Text>
                <Text style={styles.title}>     Games Played:</Text>
                <Text style={styles.subtitle}> {users[actualUserIndex].ONplayedGames}</Text>
                <Text style={styles.title}>     Points:</Text>
                <Text style={styles.subtitle}> {users[actualUserIndex].ONpoints}</Text>
                <Text style={styles.title}>     Rank:</Text>
                {users[actualUserIndex].ONrank > 0 ? <Text style={styles.subtitle}> {users[actualUserIndex].ONrank}</Text> : <Text style={styles.subtitle}>-</Text>}

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