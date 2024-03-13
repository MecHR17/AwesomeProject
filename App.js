import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding:10,
    justifyContent:'flex-start',
  },
  numContainer: {
    alignItems:'flex-end',
    paddingTop:20
  },
  topNumContainer: {
    paddingLeft:120,
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
  sideText: {
    fontSize:15,
    fontWeight:'bold',
    paddingBottom:23
  },
  topText: {
    textAlignVertical:'bottom',
    fontSize:15,
    fontWeight:'bold',
    paddingRight:35
  },
});

const GridButton = ({ item, onPress, isSelected, black }) => (
  <TouchableOpacity
    style={[styles.button, black ? styles.selectedButton : null]}
    onPress={() => onPress(item)}
  >
  </TouchableOpacity>
);

const GridButtons = ({ data, onPress, selected, colCount, blacks }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <GridButton item={item} onPress={onPress} isSelected={selected === item}
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

export default function App() {
  const colCount = 5;
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
  const sideData = [[1,1,1],[1,1,1],[1,3],[5],[2,1]];
  const topData = [[1,1,1],[1,1,1],[1,3],[5],[2,1]];
  return (
    <View style={{flexDirection:'column', justifyContent:'flex-start'}}>
      <TopNum data={topData} colNum={colCount} />
      <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
        <SideNum data={sideData}/>
        <GridButtons data={data} onPress={handleButtonPress}
        selected={selected} colCount={colCount} blacks={board}/>
      </View>
    </View>
  );
}