import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Dimensions,TextInput } from 'react-native';
import NumsFromBoard from '../HelperFunctions/PuzzleFunctions';
import { getDatabase,ref,push} from "firebase/database";
import db from "../HelperFunctions/firebaseconfig"

const buttonStyle = function(myWidth) {
  return {
    backgroundColor: '#EEEEEE',
    margin: 1.5,
    borderRadius: 0,
    height:myWidth,
    width:myWidth,
    justifyContent:'center'
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:"#444444",
      alignItems:'flex-end',
    },
    selectedButton: {
      backgroundColor: 'black', // Change the color when button is selected
    },
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
    },
  });
  
  const GridButton = ({ item, onPress, black, myWidth }) => (
    <TouchableOpacity
      style={[buttonStyle(myWidth), black ? styles.selectedButton : null]}
      onPress={() => onPress(item)}
      activeOpacity={1}
    >
    </TouchableOpacity>
  );
  
  const GridButtons = ({ data, onPress, colCount, rowCount, blacks, myWidth }) => (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <GridButton item={item} onPress={onPress}
        black={blacks[item]} myWidth={myWidth} />
      )}
      keyExtractor={(item) => item.toString()}
      numColumns={colCount}
      contentContainerStyle={styles.container}
      style={{flexShrink:0,flexGrow:0}}
    />
  );

  const UploadPuzzle = (name,board,rownum,colnum,navigation) => {
    const [row,col] = NumsFromBoard(board,colnum,rownum);
    const rowstr = row.map((val)=>{return val.join(" ")}).join(",");
    const colstr = col.map((val)=>{return val.join(" ")}).join(",");
    const puzzle = {
        "name":name,
        "col":colstr,
        "row":rowstr,
        "colcount":colnum,
        "rowcount":rownum,
    }
    push(ref(db,"/puzzles"),puzzle);

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
  }

  export default function App({navigation,route}) {
    const colCount = route.params.cols;
    const rowCount = route.params.rows;

    const [name,setName] = useState("");

    const [board, setBoard] = useState(Array.from(
      {length: colCount*rowCount},
      (_,index) => false,
    ));

    const handleButtonPress = (item) => {
        setBoard(board.map(
            (_,index) => {return index==item? !board[index]: board[index];}
        ));
    };
    
    const data = Array.from({ length: colCount*rowCount }, (_, index) => index); // Example data from 1 to 12

    const usableWindowWidth = Dimensions.get('window').width*0.75;
    const usableWindowHeight = Dimensions.get('window').height*0.75;

    const widthCand = usableWindowWidth/colCount;
    const heightCand = usableWindowHeight/rowCount;

    const myWidth = (widthCand>heightCand)?heightCand:widthCand;
    /*const sideData = [[1,2],[1,3],[3],[5],[2,1]];
    const topData = [[2,2],[3],[3],[5],[2,1]];*/
    return (
      <View style={{marginTop:30}}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{alignItems:'flex-end',flexDirection:'column',backgroundColor:'#999999',}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
              <GridButtons data={data} onPress={handleButtonPress} 
              colCount={colCount} blacks={board} myWidth={myWidth}/>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={styles.SideText}>Puzzle Name:</Text>
                <TextInput onChangeText={setName} value={name}
                style={styles.TextInput}/>
        </View>
        <TouchableOpacity style={styles.checkButton}
            onPress={() => UploadPuzzle(name,board,rowCount,colCount,navigation)}>
                <Text style={styles.buttonText}>Generate Puzzle</Text>
        </TouchableOpacity>
      </View>
    );
  }