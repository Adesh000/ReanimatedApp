import {Button, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';

const Spinner = () => {
  const progress = useSharedValue(10);
  console.log('Progress', progress);
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(progress.value, 500),
  }));
  return (
    <View>
      <Button
        onPress={() => {
          progress.value = 100;
        }}
        title="Click"
      />
      <Animated.View style={styles.line}>
        <Animated.View
          style={[
            {height: 10, backgroundColor: 'red', borderRadius: 5},
            animatedStyle,
          ]}></Animated.View>
      </Animated.View>
      <Animated.View style={styles.container}></Animated.View>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'grey',
    marginTop: 20,
  },
  line: {
    height: 10,
    width: 300,
    backgroundColor: 'grey',
    marginTop: 20,
    borderRadius: 5,
  },
});
