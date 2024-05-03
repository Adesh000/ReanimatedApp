import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const PinchGesture = () => {
  const scale = useSharedValue(1);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const imageUrl =
    'https://res.cloudinary.com/demo/image/upload/e_grayscale/happy_dog.jpg';
  const pinch = Gesture.Pinch()
    .onUpdate(e => (scale.value = e.scale))
    .onEnd(() => (scale.value = withTiming(1)))
    .onChange(e => {
      scale.value = e.scale;
    });
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinch}>
        <Animated.View style={{flex: 1}}>
          <AnimatedImage
            style={[styles.image, animateStyle]}
            source={{uri: imageUrl}}
          />
          <Animated.View style={[styles.focalPoint]} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default PinchGesture;

const styles = StyleSheet.create({
  image: {
    width,
    height,
    resizeMode: 'contain',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
});
