import React from 'react';
import {StyleSheet, View} from 'react-native';
import Intro from './src/Intro';

function App() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Intro />
    </View>
  );
}

export default App;
