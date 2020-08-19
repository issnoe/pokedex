
import React from 'react';
import {
  ActivityIndicator,
  Image,
  View
} from 'react-native';
import { SECOND_COLOR } from '../config';

const Busy = ({ busy }) => {
  return busy === true ? <View style={{
    flex: 0.6,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'center'
  }}>

    <Image style={{ width: 200, height: 200 }} source={require('../assets/loagingPokemon.png')} ></Image>
    <ActivityIndicator size="large" color={SECOND_COLOR} />

  </View> : <></>;
};
export default Busy;
