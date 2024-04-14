import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GameScreen from './Screens/GameScreen.js'
import MainScreen from './Screens/MainScreen.js'
import ConfigScreen from './Screens/ConfigScreen.js'
import BrowseScreen from './Screens/BrowseScreen.js'
import CreateScreen from './Screens/CreateScreen.js'
import CreateConfigScreen from './Screens/CreateConfigScreen.js';

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
        <Stack.Screen name="BrowseScreen" component={BrowseScreen} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen name="CreateConfigScreen" component={CreateConfigScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}