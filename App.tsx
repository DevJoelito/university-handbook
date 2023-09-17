import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Main from './components/Main';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

const App = () => {
  return (
    <Main
      sDim = { screen }
      wDim = { window }
    />
  );
}

export default App;
