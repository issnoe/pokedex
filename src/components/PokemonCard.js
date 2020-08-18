
import React from 'react';
import {
  ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { SECOND_COLOR, URL_IMAGES } from '../config';

const sizeDimentions = {
  'large': {
    width: 200,
    height: 200,
  },
  small: {
    width: 100,
    height: 100,
  },
};

const Pokemon = ({ size = 'small', name = '', id = '25', callback }) => {
  return <TouchableOpacity onPress={() => {
    callback({ name, id });
  }} style={styles.pokemonContainer} >
    <Image
      style={sizeDimentions[size]}
      progressiveRenderingEnabled={true}
      loadingIndicatorSource={{ uri: `${URL_IMAGES}${'25'}.png` }}
      source={{ uri: `${URL_IMAGES}${id}.png` }}
    />
    <Text style={styles.pokemonName}>{name}</Text>
  </TouchableOpacity>;
};
const PokemonCard = (props) => {
  return <View style={styles.pokemonCardContainer}>
    <Pokemon {...props} />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokemonName: {
    textTransform: 'uppercase',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#273339',
    fontWeight: 'bold',
  },
  pokemonCardContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pokemonContainer: {
    flex: 1,
    backgroundColor: '#95f8ad',
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00ff00',
    borderBottomWidth: 0,
    shadowColor: '#0000',
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default PokemonCard;
