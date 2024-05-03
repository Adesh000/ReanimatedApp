import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const InterpolateColors = () => {
  const [theme, setTheme] = useState('light');
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1, 1000) : withTiming(0, 1000);
  }, [theme]);
  const Colors = {
    dark: {
      background: '#1e1e1e',
      text: '#F8F8F8',
      circle: '#252525',
    },
    light: {
      background: '#F8F8F8',
      text: '#1E1E1E',
      circle: '#FFF',
    },
  };
  const bStyle = useAnimatedStyle(() => {
    const background = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );
    return {backgroundColor: background};
  });
  const circleStyle = useAnimatedStyle(() => {
    const background = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {backgroundColor: background};
  });
  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {color};
  });
  return (
    <Animated.View style={[styles.mainContainer, bStyle]}>
      <Animated.Text style={[styles.text, textStyle]}>Adesh</Animated.Text>
      <Animated.View style={[styles.circle, circleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggled => {
            setTheme(toggled ? 'dark' : 'light');
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default InterpolateColors;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 10,
  },
  text: {
    fontSize: 80,
    textTransform: 'uppercase',
    letterSpacing: 10,
    fontWeight: '500',
  },
});
