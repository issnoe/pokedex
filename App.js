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

import Search from './src/screens/Search';
const App: () => React$Node = () => {
  return (
    <>
      <Search />
      <Text>Pokedex</Text>
    </>
  );
};
export default App;
