import {Button, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import Svg, {Circle} from 'react-native-svg';

const Spinner = () => {
  const progress = useSharedValue(0);
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
      {/* <Svg height={100} width={100} viewBox="0 0 100 100">
        <Circle cx={'50'} cy={'50'} r={50} fill={'red'} />
      </Svg> */}
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
