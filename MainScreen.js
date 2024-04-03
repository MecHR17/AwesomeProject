import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumsFromBoard from './PuzzleFunctions.js'

const styles = StyleSheet.create({
    checkButton: {
      backgroundColor: 'blue',
      padding:15,
      borderRadius:5,
      marginHorizontal:100,
      marginTop:10,
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    },
  });

const RandomPuzzle = (cols,rows) => {
    const board = [];
    for (let i = 0; i < cols*rows; i++) {
        if(Math.random()>0.5){
            board.push(true);
        }
        else{
            board.push(false);
        }
    }
    
    return NumsFromBoard(board,cols,rows);
}

export default function App({navigation}) {
    const columns = 5;
    const rows = 5;
    return (
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('GameScreen',
        {cols: columns,rows:rows,puzzle:RandomPuzzle(columns,rows)})}>
            <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
    );
}