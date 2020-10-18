import * as React from 'react';
import { DefaultTheme } from '@react-navigation/native';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};