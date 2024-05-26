import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,get,child } from "firebase/database";
import db from "../HelperFunctions/firebaseconfig"
import { Card } from '@rneui/themed';

const styles = StyleSheet.create({
    checkButton: {
      backgroundColor: '#3C5B6F',
      padding:15,
      borderRadius:15,
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
    return <TouchableOpacity onPress={() => navigation.navigate('GameScreen',
    {cols: parseInt(colCount),rows:parseInt(rowCount),
    puzzle:[rows,cols]}) } style={{marginBottom:10}}>
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider/>
            <Text>Dimensions: {rowCount}x{colCount}</Text>
        </Card>
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
      keyExtractor={(item) => {return item.myId;}}
      numColumns={1}
      contentContainerStyle={styles.container}
      style={{flexShrink:0,flexGrow:0,}}
    />
  );

export default function App({navigation}) {
    const [puzzles,setPuzzles] = useState([]);
    var tmp = [];
    get(ref(db,'/puzzles')).then((snapshot) => {
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach((element,i) => {
                if(element != undefined){
                    element.myId = i;
                    tmp.push(element);
                }
            });
            setPuzzles(tmp);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });

    return (
        <PuzzleList data={puzzles} navigation={navigation}></PuzzleList>
    );
}