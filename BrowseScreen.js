import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,get,child } from "firebase/database";

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

const firebaseConfig = {
apiKey: 'AIzaSyAN7IzZDe0XLfDuIZFHG8iG_dWXvvPmuyk',
authDomain: 'nonogram-9ca92.firebaseapp.com',
databaseURL: 'https://nonogram-9ca92-default-rtdb.firebaseio.com/',
projectId: 'nonogram-9ca92',
storageBucket: 'nonogram-9ca92.appspot.com',
messagingSenderId: '662832630636',
appId: '1:662832630636:android:cee2a1c3b1ba1d328bc149',
measurementId: 'G-2E1KNBB1RR',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
    const puzzles = [];
    
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
    puzzles.map((item, index) => ({ ...item, "myId": index }));
    return (
        <PuzzleList data={puzzles} navigation={navigation}></PuzzleList>
    );
}