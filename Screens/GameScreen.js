import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import NumsFromBoard from '../HelperFunctions/PuzzleFunctions';

import Toggle from "react-native-toggle-element";
import { color } from '@rneui/themed/dist/config';

import { Icon } from '@rneui/themed';

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

const sideStyle = function(myWidth) {
  return {
    fontSize: myWidth*15/45,
    fontWeight:'bold',
    margin:1.5,
    marginRight:8,
    height:myWidth,
    textAlignVertical:"center",
    paddingLeft:5
  }
}

const XVisibleStyle = function(myWidth) {
  return {
    color:'black',
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:myWidth*30/45
  }
}

const XInvisibleStyle = function(myWidth) {
  return {
    color:'#0000',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:myWidth*30/45
  }
}

const topStyle = function(myWidth) {
  return {
    textAlignVertical:'bottom',
    textAlign:'center',
    fontSize:myWidth*15/45,
    margin:1.5,
    width:myWidth,
    fontWeight:'bold',
  }
}

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
    selectedButton: {
      backgroundColor: 'black', // Change the color when button is selected
    },
    checkButton: {
      backgroundColor: '#3C5B6F',
      padding:15,
      paddingHorizontal:20,
      borderRadius:15,
      marginHorizontal:100,
      marginTop:"auto",
      marginBottom:30
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    },
    sliderText: {
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    }
  });
  
  const GridButton = ({ item, onPress, black, myWidth }) => (
    <TouchableOpacity
      style={[buttonStyle(myWidth), black ? styles.selectedButton : null]}
      onPress={() => onPress(item)}
      activeOpacity={1}
    >
        <Text style={[black==null? XVisibleStyle(myWidth): XInvisibleStyle(myWidth)]}>X</Text>
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
  
  const OneTopNum = ({data, myWidth}) => {
    return <Text style={topStyle(myWidth)}>{data.join("\n")}</Text>
  }
  
  const TopNum = ({data,colNum, myWidth}) => {
    return <FlatList
    data={data}
    renderItem={({ item }) => (
      <OneTopNum data={item} myWidth={myWidth}></OneTopNum>
    )}
    keyExtractor={(_,index) => index}
    numColumns={colNum}
    contentContainerStyle={styles.topNumContainer}
  />
  }
  
  const OneSideNum = ({data, myWidth}) => {
    return <Text style={sideStyle(myWidth)}>{data.join(" ")}</Text>
  }
  
  const SideNum = ({data, myWidth}) => {
    return <FlatList
      data={data}
      renderItem={({ item }) => (
        <OneSideNum data={item} myWidth={myWidth}></OneSideNum>
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
  
  export default function App({navigation,route}) {
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

    const usableWindowWidth = Dimensions.get('window').width*0.75;
    const usableWindowHeight = Dimensions.get('window').height*0.75;

    const widthCand = usableWindowWidth/colCount;
    const heightCand = usableWindowHeight/rowCount;

    const myWidth = (widthCand>heightCand)?heightCand:widthCand;
    /*const sideData = [[1,2],[1,3],[3],[5],[2,1]];
    const topData = [[2,2],[3],[3],[5],[2,1]];*/
    return (
      <View style={{marginTop:30, alignItems:"center",flex:1}}>
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:20}}>
          <View style={{alignItems:'flex-end',flexDirection:'column',backgroundColor:'#999999',}}>
            <TopNum data={topData} colNum={colCount} myWidth={myWidth}/>
            <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
              <SideNum data={sideData} myWidth={myWidth}/>
              <GridButtons data={data} onPress={handleButtonPress} 
              colCount={colCount} blacks={board} myWidth={myWidth}/>
            </View>
          </View>
        </View>
        <Toggle value={modex?false:true} onPress={() => {setModex(!modex)}}
          disabledTitleStyle={{color:"gray"}}
          animationDuration={200}
          leftComponent={
            <Icon name="cross" type='entypo' color={modex ? "white":"lightgray"} size={30}/>
          }
          rightComponent={
            <Icon name="square-full" type='font-awesome-5' color={modex ? "lightgray":"white"}/>
          }
          thumbStyle={{backgroundColor:"purple", justifyContent:'center'}}
          thumbButton={{
            width:60,
            height:60,
            radius: 30,
          }}
          trackBar={{
            activeBackgroundColor: "#999999",
            inActiveBackgroundColor: "#999999",
            borderActiveColor: "black",
            borderInActiveColor: "black",

            borderWidth: 0,
            width: 110,
            height:55,
          }}>
        </Toggle>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => handleCheck(board,topData,sideData,colCount,rowCount,setBtnText)}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
