//Hacer un sistema de elo
//Con un switch hacer que 1 = left o top, 2 = middle y 3 = right o bottom para no mostrar cosas
//como row 1 al que gano
//como x y o usar padorus o algo asi
//{condicion && ToDo}
//state gameover para desactivar todo cuando alguien gane o alla empate, por lo que 
//en ese moemtno solo se podria reiniciar.
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import bg from "./assets/bg.jpeg";
import Cell from "./src/Cell"
import {empty} from "./src/MapStuff"
//Presable es un View pero con una propiedad onPress, o sea que se pueden reemplazar View con Pressable
//Por ejemplo el de cell originalmente eran View,

export default function App() {
  const [gameMap, setMap] = useState(empty);

  var [gameState, setState] = useState("inGame");

  const [CurrentTurn, setCurrentTurn] = useState("x"); //es un array bidimensional creo

  useEffect(() => {
    if(CurrentTurn === "o")
      botTurn();
  }, [CurrentTurn]);
  //useEffect ejecuta CALLBACK si es que DEPENDENCIES cambio desde la ultima llamada 

  const Touch = (Column, Row) => { //declara una funcion 
    if(gameState === "inGame"){
      console.warn("Zone pressed: ",Column, Row);

      if(gameMap[Column][Row] !== ""){
        Alert.alert("Sorry but you can't cheat here!"); //Es mas un check que otra cosa
        return;
      }

      setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap [Column][Row] = CurrentTurn;
      return updatedMap;
    }) 

    winnerCheck();
    setCurrentTurn(CurrentTurn === "x" ? "o" : "x");//Una conditional expression de C para que el codigo sea mas compacto
  }
  else{
    Alert.alert("The game is already Over!!!", 
    "", 
    [{text: "Play again!", onPress:() => reset()},{text: "Yeah I know!", style: "cancel"}], 
    {cancelable: true});

  }
}

const winnerCheck = () => {
  //Check rows
  for(let i = 0;i<=2; i++){
    const Xwin = gameMap[i].every((cell) => cell === "x");
    const Owin = gameMap[i].every((cell) => cell === "o");

    if(Xwin || Owin)
      winner("Row " + (i+1));
  }
  //Check columns
  for(let col = 0; col<=2; col++){
    const Xwin = true;
    const Owin = true;

    for(let row = 0; row<=2; row++){
      if(gameMap[row][col] !== "x")
        Xwin = false;
      if(gameMap[row][col] !== "o")
        Owin = false;
    } 
    
    if(Xwin || Owin)
      winner("Column " + (col+1));
  }

  //Check diagonals
  //Left to righ
  let i = 0;
  let XoblWin = true;
  let OoblWin = true;

  for(; i<=2; i++){
    if(gameMap[i][i] !== "x")
      XoblWin = false;
    if(gameMap[i][i] !== "o")
      OoblWin = false;
  }
  if(XoblWin || OoblWin)
    winner("Oblicuous left to right");

  //Right to left
  XoblWin = true;
  OoblWin = true;

  for(i=0; i<=2; i++){
    if(gameMap[i][2-i] !== "x")
      XoblWin = false;
    if(gameMap[i][2-i] !== "o")
      OoblWin = false;
  }
  if(XoblWin || OoblWin)
    winner("Oblicuous right to left");
  
  tieCheck();
}

var tie = true;

const tieCheck = () => { //Checkea si esta todo ocupado, se ejecuta despues de winner o en winner, por lo que

  for(let i=0; i<=2; i++)
    if(tie === true)
      tie = gameMap[i].every((cell) => cell === "x" || cell ==="o");

  {tie === true && Tie();}
}

const Tie = () => {
    Alert.alert("It's a tie!", 
    "Sorry, but no one won!", 
    [{text: "Play again!", onPress:() => reset()},{text: "Ok...", style: "cancel"}], 
    {cancelable: true});
}

//Crear un boton para resetear cuando aparezca despues de apretar Ok... en winner y tie
const winner = (where) => {
  Alert.alert(
    "The winner is "+CurrentTurn.toUpperCase(), 
    "In "+where, 
    [{text: "Play again!", onPress:() => reset()},{text: "Ok...", style: "cancel"}], 
    {cancelable: true});
  
  setState("gameOver");
}

const reset = () => {
  setMap([
    ['', '', '',],
    ['', '', '',],
    ['', '', '',],
  ]);
  setCurrentTurn("x");
  setState("inGame");
}

//Bot
const botTurn = () => {
  //Collect all possible options

  //Choose the best one 
  
  Touch(1,2);//Just a place-holder, first lets think about how to call it
}


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} ImageBackground="contain">

        <Text style={{
            position: 'absolute',
            fontSize: 26,
            color: "white",
            top: 50,
          }          
        }>
          Current turn: {CurrentTurn}
        </Text>
        <View style={styles.map}>
          {gameMap.map((row, rowIndex) => 
            <View style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell cell={cell} yIndex={columnIndex} xIndex={rowIndex} onPress={Touch} ></Cell>
              ))}
            </View>
            )}
        </View>
      </ImageBackground>
    <StatusBar style="auto" />
  </View>
  ); 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#242d34',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bg:{
    width  : '100%',  //This are both
    height : '100%',  //relative to the screen not the image
    alignItems: 'center',     //It's assigned to bg so all it's children are centered too, can I overwrite this on tex??
    justifyContent: 'center',
    paddingTop : 24,   //Agrega padding arriba, por lo que la imagen se mueve para abajo
  },

  map:{
    width : "44%",
    height: "44%",
    aspectRatio: 1/1,
    transform : [
      {
        translateX: 2.2,//translate mueve
      }
    ]
  },

  row:{
    flex: 1,
    flexDirection: 'row',
  },

});