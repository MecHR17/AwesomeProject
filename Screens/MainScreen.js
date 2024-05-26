import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumsFromBoard from '../HelperFunctions/PuzzleFunctions.js'

import { Icon } from '@rneui/themed';

const styles = StyleSheet.create({
    checkButton: {
      flexDirection:"row",
      justifyContent:"space-between",
      backgroundColor: '#3C5B6F',
      padding:15,
      borderRadius:15,
      marginHorizontal:100,
      marginTop:10,
      width:150
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:20
    },
    title: {
      fontWeight:'bold',
      fontFamily:'notoserif',
      fontSize:40,
      marginBottom:50
    },
    icon: {
      color:"white",
    }
  });

export default function App({navigation}) {
    const columns = 7;
    const rows = 7;
    return (
      <View style={{justifyContent:"center", alignItems:"center", flex:1,marginBottom:50}}>
        <Text style={styles.title}>NONOGRAM</Text>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('ConfigScreen')}>
            <Text style={styles.buttonText}>Play</Text>
            <Icon name="puzzle" type="foundation" color="white" size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('BrowseScreen')}>
            <Text style={styles.buttonText}>Browse</Text>
            <Icon name="search" type="fontawesome" color="white" size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('CreateConfigScreen')}>
            <Text style={styles.buttonText}>Create</Text>
            <Icon name="create" type="MaterialIcons" color="white" size={30}></Icon>
        </TouchableOpacity>
      </View>

    );
}