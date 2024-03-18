import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Intro = () => {
  const PI = 3.14;
  const [animate, setAnimate] = useState(false);
  const progress = useSharedValue(0);
  const scale = useSharedValue(0);
  const animated = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: progress.value * 20,
      transform: [{scale: scale.value}, {rotate: `${progress.value * PI}rad`}],
    };
  }, []);
  const handleBoxAnimation = () => {
    if (animate) {
      progress.value = withRepeat(withSpring(1), 3, true);
      scale.value = withRepeat(withSpring(1), 3, true);
      setAnimate(prev => !prev);
    } else {
      progress.value = withTiming(0, 500);
      scale.value = withSpring(0, 500);
      setAnimate(prev => !prev);
    }
  };

  return (
    <View>
      <Animated.View style={[styles.container, animated]} />
      <Button onPress={handleBoxAnimation} title="Click" />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginBottom: 10,
  },
});
