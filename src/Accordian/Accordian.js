import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AccordianItem = ({isExpanded}) => {
  console.log('Expanded', isExpanded);
  const height = useSharedValue(0);
  const derivedHeight = useDerivedValue(() => {
    withTiming(height.value * Number(isExpanded.value), {
      duration: 500,
    });
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      height: derivedHeight.value,
    };
  });
  return (
    <Animated.View style={rStyle}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[
          {
            position: 'absolute',
            top: 10,
            width: '100%',
            //   backgroundColor: 'blue',
          },
        ]}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: 'blue',
          }}
        />
      </View>
    </Animated.View>
  );
};

const Accordian = () => {
  const open = useSharedValue(false);

  return (
    <View>
      <Button
        onPress={() => {
          open.value = !open.value;
        }}
        title="Click"
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AccordianItem isExpanded={open} />
      </View>
    </View>
  );
};

export default Accordian;

const styles = StyleSheet.create({});
