import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;
const ScrollComponent = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  });
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: `rgba(0, 256, 256, 0.${index + 2})`},
      ]}
      key={index}>
      <Animated.View style={[styles.circle, rStyle]}>
        <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default ScrollComponent;

const styles = StyleSheet.create({
  mainContainer: {
    width,
    height,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    fontWeight: '500',
    color: '#fff',
  },
});
