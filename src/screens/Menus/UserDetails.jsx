import { getAuth, signOut } from 'firebase/auth';
import { Text, StyleSheet, ScrollView, View} from 'react-native';

import { AsyncStorage } from '@react-native-async-storage/async-storage';

import {users, getActualUserDoc} from '../../../Users';
import style from '../../App.css'

//actualUser = getUserDoc(auth, users);

/*
wins / total games * 100
*/

//Es onda una carta, el fondo de esta es el avatar, si no entra todo el resto es el avatar pero blureado
export default function Ranks({route, navigation}) {
//Agarra un doc cualquiera como argumento o la id de quien es para permitir ver otods los docs
    const doc = route.params;
    const player = doc.doc[0];
    console.log(player);
    return(
        <View style={style.container}>
            <View style={style.card}>
                <Text style={style.card_user}>{player.NickName}</Text>
                <View style={style.card_line}></View>
                <Text style={style.card_mode}>Offline</Text>
                <Text style={style.card_property}>Rank:</Text>
                <Text style={style.card_value}>#{player.rank > 0 ? player.rank : '-'}</Text>
                <Text style={style.card_property}>Points:</Text>
                <Text style={style.card_value}>{player.points}</Text>
                <Text style={style.card_property}>Games Played:</Text>
                <Text style={style.card_value}>{player.playedGames}</Text>
                <Text style={style.card_property}>Win%:</Text>
                <Text style={style.card_value}>{player.winRate > 0 ? player.winRate : '-'}%</Text>
                <View style={style.card_line}></View>
                <Text style={style.card_mode}>Online</Text>
                <Text style={style.card_property}>Rank:</Text>
                <Text style={style.card_value}>#{player.ONrank > 0 ? player.ONrank : '-'}</Text>
                <Text style={style.card_property}>Points:</Text>
                <Text style={style.card_value}>{player.ONpoints}</Text>
                <Text style={style.card_property}>Games Played:</Text>
                <Text style={style.card_value}>{player.ONplayedGames}</Text>
                <Text style={style.card_property}>{player.winRate > 0 ? player.winRate : '-'}%:</Text>
                <Text style={style.card_value}>-%</Text>
            </View>
        </View>
    )
}
//stuff de X doc