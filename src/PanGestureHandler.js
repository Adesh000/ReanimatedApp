import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = translateX.value + e.translationX;
      translateY.value = translateY.value + e.translationY;
    })
    .onEnd(e => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance <= 150) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      console.log(translateX.value, translateY.value);
    });
  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);
  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.circle}>
          <Animated.View style={[styles.box, panStyle]} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default PanGesture;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
