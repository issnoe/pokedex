/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Search from './src/screens/Search';
import Pokedex from './src/screens/Pokedex';
const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Pokedex" component={Pokedex} options={({ route }) => ({ title: `#${route.params.id} ${route.params.name.toUpperCase()}` })} />
        </Stack.Navigator>
      </NavigationContainer>
      <Text>Pokedex</Text>
    </>

  );
};
export default App;
