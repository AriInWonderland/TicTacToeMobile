
import {Pressable, StyleSheet} from 'react-native';
import React from 'react'
import Circle from './GameplayIcons/Circle';
import Cross from "./GameplayIcons/Cross";

function Cell(props) {
    const {cell, onPress, xIndex, yIndex } = props;

    return (
        <Pressable onPress={() => onPress(xIndex, yIndex)}style={styles.cell}> 
            {cell === "o" && <Circle></Circle>} 
            {cell === "x" && <Cross></Cross>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cell:{
    width: 100,
    height: 125,
    flex: 1,               //va a usar el mismo espacio para cada una
  },
})

export default Cell