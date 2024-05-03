import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ScrollComponent from './ScrollComponent';
const {width, height} = Dimensions.get('screen');
const SIZE = width * 0.7;
const WORDS = ["What's", 'up', 'mobile', 'devs'];
const ScrollviewAnimation = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      {WORDS.map((title, index) => (
        <ScrollComponent title={title} index={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};

export default ScrollviewAnimation;
