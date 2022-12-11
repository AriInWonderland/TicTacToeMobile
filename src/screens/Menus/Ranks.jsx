//Usar listItem y los avatar
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { ListItem } from "@rneui/themed";
import users from "../../../Users"

//Implementar binary search o algo asi para ordenar de myor a menor, onda simplemente tengo que ordenar el array.

const list = [];
/*
while(users){
    users.forEach((i) => {
        if(i.rank > 0)
            list.push(i);
    })
}
*/
export default function Ranks({navigation}) {
    return(
        <ScrollView style={styles.container}>
            {
                users.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>#{l.rank}</ListItem.Title>
                            <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#6eff', 
    },
})