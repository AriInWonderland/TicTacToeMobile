//Hacer un sistema de elo
//Con un switch hacer que 1 = left o top, 2 = middle y 3 = right o bottom para no mostrar cosas
//como row 1 al que gano
//como x y o usar padorus o algo asi
//{condicion && ToDo}
//state gameover para desactivar todo cuando alguien gane o alla empate, por lo que 
//en ese moemtno solo se podria reiniciar.
//Un delay en el bot y capaz mostrar una animacion o algo
//hacer modos coxn el mapa mas grande
//Esto en un archivo de gameplay CLASSIC y que las dificultades lo llamen

/*
game{
    game-id
    Xplayer
    Oplayer
    map = string**
    inUse?
}

string**:
Antes de mandar el mapa al doc lo convierte en string usando 
JSON.stringify(mapa), para recibirlo lo convierte a array de nuevo
usando Array.from(mapa)
*/
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import bg from "../../../../assets/bg.png";
import Cell from "../../../GeneralAssets/Cell"

export default function Classic_Game({route, navigation}) {
  const {diff} = route.params;

  var [gameState, setState] = useState("inGame");
  const [CurrentTurn, setCurrentTurn] = useState("x"); //es un array bidimensional creo
  const [GameMode, setGameMode] = useState(diff);

  const map = [gameMap, setMap] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const reset = () => {
    setMap([
      ['', '', '',],
      ['', '', '',],
      ['', '', '',],
    ]);
    setCurrentTurn("x");
}
/*
  const add_points = (NewPoints) => {
    tengo que hacer lo de firebase y eso aca, el tema es que
    tambien necesito leer antes para hacer algo onda 
    points : OldPoints + NewPoints
    db.collection("users").doc(actualUser).update({points: })
  }
*/
  useEffect(() => {
    if(gameState === "inGame" && CurrentTurn === "o" && GameMode !== "LOCAL")
      botTurn();
  }, [CurrentTurn]);
  //useEffect ejecuta CALLBACK si es que DEPENDENCIES cambio desde la ultima llamada 

  useEffect(() => {
      let won = checkWinner(gameMap);

      if(won){
        winner(won);
        setState("gameOver")
        won = 0;
        switch(GameMode){
          case "LOCAL":
            break;
          case "BOT_EASY":
            break;
          case "BOT_MEDIUM":
            break;
        }
      }
      else
        tieCheck();
  }, [gameMap]);

  useEffect(() => {
    reset();
  }, [GameMode])

  const mapTouch = (Column, Row) => { 
    if(gameState === "inGame"){

      if(gameMap[Column][Row] !== ""){
        //Alert.alert("Sorry but you can't cheat here!"); //Es mas un check que otra cosa
        return;
      }
      setMap((existingMap) => {
        const updatedMap = [...existingMap];
        updatedMap [Column][Row] = CurrentTurn;
        return updatedMap;
      }) 

    setCurrentTurn(CurrentTurn === "x" ? "o" : "x");//Una conditional expression de C para que el codigo sea mas compacto
  }
  else
    overWarn();
}

const overWarn = () => {
  Alert.alert("The game is already Over!!!", 
  "", 
  [{text: "Play again!", onPress:() => {reset(); setState("inGame");}},{text: "Yeah I know!", style: "cancel"}], 
  {cancelable: true});
}

const copyArray = (from) => {
  const copy = from.map((arg) => {
    return arg.slice();
  });
  return copy;
}

const tieCheck = () => { //Checkea si esta todo ocupado, se ejecuta despues de winner o en winner, por lo que
  let tie = true;

  for(let i=0; i<=2; i++)
    if(tie === true)
      tie = gameMap[i].every((cell) => cell === "x" || cell ==="o");

  {tie === true && Tie();}
}

const Tie = () => {
    Alert.alert("It's a tie!", 
    "Sorry, but no one won!", 
    [{text: "Play again!", onPress:() => reset()}], 
    {cancelable: true});
}
//Bot
const botTurn = () => {
  //Collect all possible options
  const possiblePostitions = [];
  gameMap.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) =>{
      if(cell==="")
        possiblePostitions.push({row: rowIndex, col: columnIndex});
    })
  )

  let choosePosition;

  switch(GameMode){
    case "BOT_EASY":
      choosePosition = possiblePostitions[Math.floor(Math.random() * possiblePostitions.length)];
      break;
    case "BOT_MEDIUM":
      //Check if the bot can win 
      possiblePostitions.forEach((Possibility)=> {
      const mapCopy = copyArray(gameMap);

      mapCopy[Possibility.row][Possibility.col] = "o";
    
      if(checkWinner(mapCopy) === "o")
        choosePosition = Possibility;
      })

      //Check if the opponent can win taking a possible position.
      if(!choosePosition)
        possiblePostitions.forEach((Possibility)=> {

          const mapCopy = copyArray(gameMap);

          mapCopy[Possibility.row][Possibility.col] = "x";
    
          if(checkWinner(mapCopy) === "x")
            choosePosition = Possibility;
          
        })

      if(!choosePosition)
        choosePosition = possiblePostitions[Math.floor(Math.random() * possiblePostitions.length)];
      break;
  }

  if(choosePosition)
    mapTouch(choosePosition.row,choosePosition.col);
}

const checkWinner = (checkMap) => {
  //Check rws
  for(let i = 0;i<=2; i++){
    const Xwin = checkMap[i].every((cell) => cell === "x");
    const Owin = checkMap[i].every((cell) => cell === "o");

    if(Xwin)
      return "x";
    if(Owin)
      return "o";
  }
  //Check columns
  for(let col = 0; col<=2; col++){
    let Xwin = true;
    let Owin = true;

    for(let row = 0; row<=2; row++){
      if(checkMap[row][col] !== "x")
        Xwin = false;
      if(checkMap[row][col] !== "o")
        Owin = false;
    } 
  
    if(Xwin)
      return "x";
    if(Owin)
      return "o";
  }

  //Check diagonals
  //Left to righ
  let i = 0;
  let XoblWin = true;
  let OoblWin = true;

  for(; i<=2; i++){
    if(checkMap[i][i] !== "x")
      XoblWin = false;
    if(checkMap[i][i] !== "o")
      OoblWin = false;
  }
  if(XoblWin)
    return "x";
  if(OoblWin)
    return "o";

  //Right to left
  XoblWin = true;
  OoblWin = true;

  for(i=0; i<=2; i++){
    if(checkMap[i][2-i] !== "x")
      XoblWin = false;
    if(checkMap[i][2-i] !== "o")
      OoblWin = false;
  }

  if(XoblWin)
    return "x";
  if(OoblWin)
    return "o";  
}

//Crear un boton para resetear cuando aparezca despues de apretar Ok... en winner y tie
  const winner = (who) => { 
    Alert.alert(
     "The winner is "+who, 
      "Good job!!!", 
      [{text: "Play again!", onPress:() => {reset(); setState("inGame");}}], 
      {cancelable: true}); 
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
                  <Cell cell={cell} yIndex={columnIndex} xIndex={rowIndex} onPress={mapTouch} ></Cell>
                ))}
             </View>
              )}
          </View>
          {/*<View style={styles.buttons}>
            <Text onPress={() => setGameMode("LOCAL")} style={[styles.button, {backgroundColor: GameMode === "LOCAL" ? "purple" : "blue"}]}>Local</Text>
            <Text onPress={() => setGameMode("BOT_EASY")} style={[styles.button, {backgroundColor: GameMode === "BOT_EASY" ? "purple" : "blue"}]}>Easy Bot</Text>
            <Text onPress={() => setGameMode("BOT_MEDIUM")} style={[styles.button, {backgroundColor: GameMode === "BOT_MEDIUM" ? "purple" : "blue"}]}>Medium Bot</Text>
          </View>*/}
       </ImageBackground>
      <StatusBar style="auto" />
    </View>
  ); 
}

const styles = StyleSheet.create({
  buttons:{
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
  },
  button:{
    fontSize: 24,
    color: "white",
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },

  container:{
    flex: 1,
    backgroundColor: '#1f0019',
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
        translateX: 2.2,//translat
      }
    ]
  },

  row:{
    flex: 1,
    flexDirection: 'row',
  },

});