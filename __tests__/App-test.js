/**
 * @format
 */

import 'react-native';
import React from 'react';
import WelcomeScreen from '../src/screens/WelcomeScreen'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const welcome = renderer.create(<WelcomeScreen/>)

test('snapshot', () => {
  expect(welcome).toMatchSnapshot();
});
