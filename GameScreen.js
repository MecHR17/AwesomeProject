import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumsFromBoard from './PuzzleFunctions';

const styles = StyleSheet.create({
    container: {
      backgroundColor:"#444444",
      alignItems:'flex-end',
    },
    numContainer: {
      alignItems:'flex-end',
      justifyContent:'flex-end',
      backgroundColor:'#999999',
      overflow:'hidden',
      alignSelf:'flex-end',
    },
    topNumContainer: {
      alignContent:"flex-end",
      justifyContent:"flex-end",
      alignSelf:'flex-end',
      backgroundColor:'#999999'
    },
    button: {
      backgroundColor: '#EEEEEE',
      margin: 1.5,
      borderRadius: 0,
      height:45,
      width:45,
      justifyContent:'center'
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
    XVisible: {
        color:'black',
        fontWeight:'bold',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:30
    },
    XInvisible: {
        color:'#0000',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:30
    },
    sideText: {
      fontSize:15,
      fontWeight:'bold',
      margin:1.5,
      marginRight:8,
      height:45,
      textAlignVertical:"center",
      paddingLeft:5
    },
    topText: {
      textAlignVertical:'bottom',
      textAlign:'center',
      fontSize:15,
      margin:1.5,
      width:45,
      fontWeight:'bold',
    },
  });
  
  const GridButton = ({ item, onPress, black }) => (
    <TouchableOpacity
      style={[styles.button, black ? styles.selectedButton : null]}
      onPress={() => onPress(item)}
      activeOpacity={1}
    >
        <Text style={[black==null? styles.XVisible: styles.XInvisible]}>X</Text>
    </TouchableOpacity>
  );
  
  const GridButtons = ({ data, onPress, colCount, rowCount, blacks }) => (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <GridButton item={item} onPress={onPress}
        black={blacks[item]} />
      )}
      keyExtractor={(item) => item.toString()}
      numColumns={colCount}
      contentContainerStyle={styles.container}
      style={{flexShrink:0,flexGrow:0}}
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
      style={{}}
    />
  }
  
  const checkPuzzle= (board,topNums,sideNums,cols,rows) => {
    const [SideNum,TopNum] = NumsFromBoard(board,cols,rows);
    if(SideNum.toString() !== sideNums.toString() || TopNum.toString() !== topNums.toString())
      return false;
    //If passed both checks
    return true;
  }
  
  const handleCheck = (board,topData,sideData,colCount,rowCount,setBtnText) => {
    const res = checkPuzzle(board,topData,sideData,colCount,rowCount);
    if(res){
      setBtnText("Solved!");
    }
    else{
      setBtnText("Check");
    }
  }
  
  export default function GameScreen({navigation,route}) {
    const colCount = route.params.cols;
    const rowCount = route.params.rows;
    const [btnText,setBtnText] = useState("Check");
    const [selected, setSelected] = useState(null);
    const [board, setBoard] = useState(Array.from(
      {length: colCount*rowCount},
      (_,index) => false,
    ));

    const [modex, setModex] = useState(false);

    const handleButtonPress = (item) => {
        if(!modex){
            setBoard(board.map(
                (_,index) => {return index==item? !board[index]: board[index];}
            ));
        }
        else{
            setBoard(board.map(
                (_,index) => {return index==item? (board[index]==null?false:null): board[index];}
            ));
        }
    };
    
    const data = Array.from({ length: colCount*rowCount }, (_, index) => index); // Example data from 1 to 12
    
    const sideData = route.params.puzzle[0];
    const topData = route.params.puzzle[1];

    /*const sideData = [[1,2],[1,3],[3],[5],[2,1]];
    const topData = [[2,2],[3],[3],[5],[2,1]];*/
    return (
      <View style={{marginTop:30}}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{alignItems:'flex-end',flexDirection:'column',backgroundColor:'#999999',}}>
            <TopNum data={topData} colNum={rowCount} />
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
              <SideNum data={sideData}/>
              <GridButtons data={data} onPress={handleButtonPress} 
              colCount={colCount} blacks={board}/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => {setModex(!modex)}}>
            <Text style={styles.buttonText}>{modex?"X":"O"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => handleCheck(board,topData,sideData,colCount,rowCount,setBtnText)}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
