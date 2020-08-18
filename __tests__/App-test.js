/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import Search from '../src/screens/Search'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders components correctly', () => {
  renderer.create(<Search />);
});

it('renders correctly', () => {
  renderer.create(<App />);
});
