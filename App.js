//Hacer un sistema de elo
//la administracion de la data de en donde mandar las cosas seria un array bidimensional, 0,1,2 y 0,1,2 con un state y permiiria hacer cosas como el check de la win mas facil, para esto usa useState
//como x y o usar padorus o algo asi
// hay docs de lo de {condicion && todo} en lo de reacth, pero es como un if.
import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
//Presable es un View pero con una propiedad onPress, o sea que se pueden reemplazar View con Pressable
//Por ejemplo el de cell originalmente eran View,
import bg from "./assets/bg.jpeg";
import Circle from './src/Circle';
import Cross from "./src/Cross";

const empty = [ //crea el array bidireccional para el posicionamiento en el mapa
    ['', '', '',],
    ['', '', '',],
    ['', '', '',],
];


export default function App() {
  const [gameMap, setMap] = useState(empty);

  //No se usa posicionamienot absoluto ya que haria Views vacios cuando no hay nada en la casilla 

const [CurrentTurn, setCurrentTurn] = useState("x"); //es un array bidimensional creo

const Touch = (Column, Row) => { //declara una funcion 
  console.warn("Zone pressed: ",Column, Row);
  if(gameMap[Column][Row] !== ""){
    Alert.alert("Sorry but you can't cheat here!"); //Es mas un check que otra cosa
    return;
  }
  setMap((existingMap) => {
    const updatedMap = [...existingMap];
    updatedMap [Column][Row] = CurrentTurn;
    return updatedMap;
  }) //espera un objeto o una funcion, por lo que arrow function go brr 

  winnerCheck();
  setCurrentTurn(CurrentTurn === "x" ? "o" : "x");//Una conditional expression de C para que el codigo sea mas compacto
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
}

const reset = () => {
  setMap([
    ['', '', '',],
    ['', '', '',],
    ['', '', '',],
  ]);
  setCurrentTurn("x");
}

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} ImageBackground="contain">

        <View style={styles.map}>
          {gameMap.map((row, rowIndex) => 
            <View style={styles.row}>
              {row.map((cell, columIndex) => (<Pressable onPress={() => Touch(rowIndex, columIndex)}style={styles.cell}> 

                {cell === "o" && <Circle></Circle>} 

                {cell === "x" && <Cross></Cross>}

              </Pressable>))}
            </View>
            )}
        </View>
      </ImageBackground>
    <StatusBar style="auto" />
  </View>
  ); 
}

{/*con () lo devuele, con {} es un simble bloque de codigo
          Min 49:42, hay que crear un view para rows y otro para las columnas para evitar que sean 9 uno arriba de otro.
          usa uno que es rows y otro que es cell*/}

          {/*<View style={styles.circle}>
            <View style={styles.innercircle}></View>
          </View>
        

  {/*resizeMode en ImageBackground maneja como se expande LA IMAGEN, contain es solo la imagen sin importar que queden espacios 
  //y cover cubre TODO, escala la imagen pero revienta el centro, por eso esta en CONTAIN con el bg del mismo color que la imagen
  //View no tiene primitivas pero si estilos para modificar cosas
//El view adentro del otro es para tapar el de arriba y que sea como una dona*/}
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

  cell:{
    width: 100,
    height: 125,
    flex: 1,               //va a usar el mismo espacio para cada una
  },

  row:{
    flex: 1,
    flexDirection: 'row',
  },

});