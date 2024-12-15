import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Intro from './src/Intro';
import PanGesture from './src/PanGestureHandler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Stopwatch from './src/Stopwatch';
import Fetch from './src/Fetch';
import InterpolateColors from './src/InterpolateColors';
import ScrollviewAnimation from './src/scrollAnimation/ScrollviewAnimation';
import PinchGesture from './src/PinchGesture';
import BottomModal from './src/BottomSheetModal/BottomModal';
import Accordian from './src/Accordian/Accordian';
import Spinner from './src/Spinner';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <Intro />
        {/* <PanGesture /> */}
        {/* <Stopwatch /> */}
        {/* <Fetch /> */}
        {/* <ScrollviewAnimation /> */}
        {/* <InterpolateColors /> */}
        {/* <PinchGesture /> */}
        {/* <BottomModal /> */}
        {/* <Accordian /> */}
        {/* <Spinner /> */}
      </View>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
