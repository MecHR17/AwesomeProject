import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NumsFromBoard from '../HelperFunctions/PuzzleFunctions.js'

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

export default function App({navigation}) {
    const columns = 7;
    const rows = 7;
    return (
      <View>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('ConfigScreen')}>
            <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('BrowseScreen')}>
            <Text style={styles.buttonText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton}
        onPress={() => navigation.navigate('CreateConfigScreen')}>
            <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>

    );
}