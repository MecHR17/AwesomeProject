import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding:10,
    justifyContent:'flex-start',
  },
  numContainer: {
    alignItems:'flex-end',
    paddingTop:20,
    width:40,
    overflow:'hidden'
  },
  topNumContainer: {
    paddingLeft:120,
    height:40
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 20,
    margin: 2,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue', // Change the color when button is selected
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
  sideText: {
    fontSize:15,
    fontWeight:'bold',
    paddingBottom:23
  },
  topText: {
    textAlignVertical:'bottom',
    fontSize:15,
    fontWeight:'bold',
    paddingRight:36
  },
});

const GridButton = ({ item, onPress, black }) => (
  <TouchableOpacity
    style={[styles.button, black ? styles.selectedButton : null]}
    onPress={() => onPress(item)}
  >
  </TouchableOpacity>
);

const GridButtons = ({ data, onPress, colCount, blacks }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <GridButton item={item} onPress={onPress}
      black={blacks[item]} />
    )}
    keyExtractor={(item) => item.toString()}
    numColumns={colCount}
    contentContainerStyle={styles.container}
  />
);

const OneTopNum = ({data}) => {
  return <Text style={styles.topText}>{data.join("\n")}</Text>
}

const TopNum = ({data,colNum}) => {
  return <FlatList
  data={data}
  renderItem={({ item }) => (
    <OneTopNum data={item}></OneTopNum>
  )}
  keyExtractor={(_,index) => index}
  numColumns={colNum}
  contentContainerStyle={styles.topNumContainer}
/>
}

const OneSideNum = ({data}) => {
  return <Text style={styles.sideText}>{data.join(" ")}</Text>
}

const SideNum = ({data}) => {
  return <FlatList
    data={data}
    renderItem={({ item }) => (
      <OneSideNum data={item}></OneSideNum>
    )}
    keyExtractor={(_,index) => index}
    numColumns={1}
    contentContainerStyle={styles.numContainer}
  />
}

const checkPuzzle= (board,topNums,sideNums,cols) => {
  //RowCheck
  for(var i = 0; i < cols; i++){
    var cur = 0;
    var tmp = [];
    for(var k = i*cols; k < i*cols+cols; k++){
      if(board[k]){
        cur++;
      }
      else{
        if(cur != 0){
          tmp.push(cur);
          cur = 0;
        }
      }
    }
    if(cur != 0){
      tmp.push(cur);
    }
    if(tmp.toString() !== sideNums[i].toString()){
      return false;
    }
  }
  //ColCheck
  for(var i=0; i<cols; i++){
    var cur = 0;
    var tmp2 = [];
    for(var k = i; k<=cols*cols-(cols-i);k+=cols){
      if(board[k]){
        cur++;
      }
      else{
        if(cur != 0){
          tmp2.push(cur);
          cur = 0;
        }
      }
    }
    if(cur != 0){
      tmp2.push(cur);
    }

    if(tmp2.toString() !== topNums[i].toString()){
      return false;
    }
  }

  //If passed both checks
  return true;
}

const handleCheck = (board,topData,sideData,colCount,setBtnText) => {
  const res = checkPuzzle(board,topData,sideData,colCount);
  if(res){
    setBtnText("Solved!");
  }
  else{
    setBtnText("Check");
  }
}

export default function App() {
  const colCount = 5;
  const [btnText,setBtnText] = useState("Check");
  const [selected, setSelected] = useState(null);
  const [board, setBoard] = useState(Array.from(
    {length: colCount*colCount},
    (_,index) => false,
  ));
  
  const handleButtonPress = (item) => {
    setBoard(board.map(
      (_,index) => {return index==item? !board[index]: board[index];}
    ));
  };
  
  const data = Array.from({ length: colCount*colCount }, (_, index) => index); // Example data from 1 to 12
  const sideData = [[1,2],[1,3],[3],[5],[2,1]];
  const topData = [[2,2],[3],[3],[5],[2,1]];
  return (
    <View style={{flexDirection:'column', justifyContent:'flex-start',marginTop:30}}>
      <TopNum data={topData} colNum={colCount} />
      <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
        <SideNum data={sideData}/>
        <GridButtons data={data} onPress={handleButtonPress} 
        colCount={colCount} blacks={board}/>
      </View>
      <TouchableOpacity style={styles.checkButton}
      onPress={() => handleCheck(board,topData,sideData,colCount,setBtnText)}>
        <Text style={styles.buttonText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
}