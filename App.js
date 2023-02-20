import { React, useEffect }           from "react"                         ;
import { View, Text }                 from 'react-native'                  ;
import { NavigationContainer }        from '@react-navigation/native'      ;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import   AsyncStorage                 from "@react-native-async-storage/async-storage";
import { getValueFor                } from "./Users";

const Stack = createNativeStackNavigator();

import Welcome       from './src/screens/Menus/Welcome'            ;
import Ranks         from './src/screens/Menus/Ranks'              ;
import Logged        from './src/screens/Menus/Logged'             ;
import GameMode      from "./src/screens/Menus/GameMode"           ;
import ClassicMenu   from "./src/screens/Games/Classic/ClassicMenu";
import Classic_Game  from "./src/screens/Games/Classic/ClassicGame";
import UserDetails   from "./src/screens/Menus/UserDetails"        ;
import LogIn         from "./src/screens/Menus/LogIn"              ;
import WaitingScreen from "./src/screens/Menus/WaitingScreen";     ;

const MyStack = () =>{
  return(
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options = {{headerShown: false}}
    />
    <Stack.Screen 
      name="Logged_In" 
      component={Logged} 
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="Select_Game_Mode"
      component={GameMode}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="Classic_Menu"
      component={ClassicMenu}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="Classic_Game"
      component={Classic_Game}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetails}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="Ranks"
      component={Ranks}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="LogIn"
      component={LogIn}
      options = {{headerShown: false}}
    />
    <Stack.Screen
      name="WaitingScreen"
      component={WaitingScreen}
      options = {{headerShown: false}}
  />
  </Stack.Navigator>
  )
}

export default function App() {
  console.log("App");
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}