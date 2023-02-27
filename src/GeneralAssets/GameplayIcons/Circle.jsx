import { View, StyleSheet } from 'react-native'
import React from 'react'

const Circle = () => {
    return (
        <View style={styles.circle}>
            <View style={styles.innercircle}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    circle:{
        left : 0 * 132,     // los valores para jugar con el movimiento, la formula seria COLUMNA * 132, 0 * 132, 1 * 132, 2 * 132
        top  : 0 * 132,

        flex: 1,
        margin : 10,
        borderRadius : 50,

        alignItems      : 'center',
        justifyContent  : 'center',
        backgroundColor : '#ffffff',
    },

    innercircle:{
        width  : '80%',
        height : '80%',
        backgroundColor : '#1f0019',
        borderRadius : 50,
    },

})

export default Circle;