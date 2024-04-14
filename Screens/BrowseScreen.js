import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,get,child } from "firebase/database";
import db from "../HelperFunctions/firebaseconfig"

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

const ListFromNumstring = (numstring) => {
    const one = [];
    numstring.split(",").forEach(element => {
        var inner = [];
        if(element!="")
            element.split(" ").forEach(num => {
                inner.push(parseInt(num));
            });
        one.push(inner);
    });
    return one;
}

const PuzzleCard = ({rowCount,colCount,rows,cols,name,navigation})=>{
    return <TouchableOpacity style={styles.checkButton}
            onPress={() => navigation.navigate('GameScreen',
            {cols: parseInt(colCount),rows:parseInt(rowCount),
            puzzle:[rows,cols]}) }>
                <Text style={styles.buttonText}>
                    {name}
                </Text>
    </TouchableOpacity>
}
//a
const PuzzleList = ({ data, navigation}) => (
    <FlatList
      data={data}
      renderItem={( {item} ) => {
        return <PuzzleCard rowCount={item.rowcount} colCount={item.colcount}
            rows={ListFromNumstring(item.row)} cols={ListFromNumstring(item.col)}
            name={item.name} navigation={navigation}/>
      }}
      keyExtractor={(item) => item.myId}
      numColumns={1}
      contentContainerStyle={styles.container}
      style={{flexShrink:0,flexGrow:0}}
    />
  );

export default function App({navigation}) {
    var puzzles = [];
    
    get(ref(db,'/puzzles')).then((snapshot) => {
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach(element => {
                if(element != undefined)
                    puzzles.push(element);
            });
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });
    puzzles = puzzles.map((item, index) => ({ ...item, "myId": index }));
    return (
        <PuzzleList data={puzzles} navigation={navigation}></PuzzleList>
    );
}