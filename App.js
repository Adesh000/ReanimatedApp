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
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <Drawer.Navigator>
          <Drawer.Screen name="Intro" component={Intro} />
          <Drawer.Screen name="PanGesture" component={PanGesture} />
          <Drawer.Screen name="Stopwatch" component={Stopwatch} />
          <Drawer.Screen name="Fetch" component={Fetch} />
          <Drawer.Screen
            name="ScrollviewAnimation"
            component={ScrollviewAnimation}
          />
          <Drawer.Screen
            name="InterpolateColors"
            component={InterpolateColors}
          />
          <Drawer.Screen name="PintchGesture" component={PinchGesture} />
          <Drawer.Screen name="BottomModal" component={BottomModal} />
          <Drawer.Screen name="Accordian" component={Accordian} />
          <Drawer.Screen name="Spinner" component={Spinner} />
        </Drawer.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
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
