
import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { SECOND_COLOR } from '../config';

const Busy = ({ busy }) => {
  return busy === true ? <ActivityIndicator size="large" color={SECOND_COLOR} /> : <></>;
};
export default Busy;
