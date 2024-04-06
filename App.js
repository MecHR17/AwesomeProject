import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GameScreen from './GameScreen.js'
import MainScreen from './MainScreen.js'
import ConfigScreen from './ConfigScreen.js'

//Navigation import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';



//Nah
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}