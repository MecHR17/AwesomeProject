import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

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
            onPress={() => navigation.navigate('CreateScreen',
                {cols: parseInt(columns),rows:parseInt(rows)})
            }>
                <Text style={styles.buttonText}>Generate Puzzle</Text>
            </TouchableOpacity>
        </View>
    );
}