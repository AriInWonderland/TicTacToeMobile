import { View, StyleSheet } from 'react-native'
import React from 'react'

const Cross = () => {
  return (                  
    <View style={styles.dualcross}>
        <View style={styles.crossline}></View>
        <View style={[styles.crossline,styles.crosslineInverse]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  dualcross:{ 
    flex: 1,
  },
  crossline:{
    position: 'absolute',
    width  :   10,
    height : '100%',
    right: '48%',
    backgroundColor : '#ff0000',
    borderRadius: 50,
    transform : [
      {
        rotate : '45deg',
      },
    ],
  },
  crosslineInverse:{ 
    transform : [
      {
        rotate : '-45deg',
      },
    ],
  },
})
export default Cross;