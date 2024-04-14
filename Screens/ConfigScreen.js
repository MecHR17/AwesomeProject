import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import NumsFromBoard from '../HelperFunctions/PuzzleFunctions.js'
import {Dimensions} from 'react-native';

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
    TextInput: {
        backgroundColor:'white',
        fontSize:20,
        margin:5,
        padding:5
    },
    SideText: {
        fontSize:20,
        fontWeight:'bold'
    }
  });


const RandomPuzzle = (cols,rows,rarity) => {
    const board = [];
    for (let i = 0; i < cols*rows; i++) {
        if(Math.random()>rarity){
            board.push(true);
        }
        else{
            board.push(false);
        }
    }
    
    return NumsFromBoard(board,cols,rows);
}

export default function App({navigation}) {
    const [columns,setColumns] = useState('7');
    const [rows,setRows] = useState('7');
    
    const rarity = 0.5;

    return (
        <View style={{justifyContent:'center',flex:1}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.SideText}>Columns:</Text>
                <TextInput keyboardType='numeric' 
                onChangeText={setColumns} value={columns}
                style={styles.TextInput}/>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.SideText}>Rows:</Text>
                <TextInput keyboardType='numeric' 
                onChangeText={setRows} value={rows}
                style={styles.TextInput}/>
            </View>
            <TouchableOpacity style={styles.checkButton}
            onPress={() => navigation.navigate('GameScreen',
            {cols: parseInt(columns),rows:parseInt(rows),
            puzzle:RandomPuzzle(parseInt(columns),parseInt(rows), rarity )})}>
                <Text style={styles.buttonText}>Generate Puzzle</Text>
            </TouchableOpacity>
        </View>
    );
}