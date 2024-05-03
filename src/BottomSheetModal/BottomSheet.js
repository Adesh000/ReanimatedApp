import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const BottomSheet = forwardRef(({children}, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);
  const context = useSharedValue({y: 0});
  const modalHeight = useSharedValue(0);

  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;
    if (destination === 0) {
      modalHeight.value = withSpring(SCREEN_HEIGHT / 3);
    }
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: modalHeight.value};
    })
    .onUpdate(event => {
      modalHeight.value = -event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (modalHeight.value < SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (modalHeight.value < SCREEN_HEIGHT / 2) {
        modalHeight.value = withSpring(SCREEN_HEIGHT / 3, {damping: 50});
      } else if (modalHeight.value >= SCREEN_HEIGHT / 2) {
        modalHeight.value = withSpring(SCREEN_HEIGHT * 0.9, {damping: 50});
      }
    });

  const rBottomsheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      modalHeight.value,
      [SCREEN_HEIGHT / 3, SCREEN_HEIGHT],
      [25, 5],
      Extrapolation.CLAMP,
    );
    return {
      height: modalHeight.value,
      transform: [{translateY: translateY.value}],
      borderRadius,
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active.value ? 1 : 0),
    };
  });

  const rBackdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: active.value ? 'auto' : 'none',
    };
  });

  return (
    <>
      <Animated.View
        onTouchStart={() => {
          scrollTo(0);
        }}
        animatedProps={rBackdropProps}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          rBackdropStyle,
        ]}></Animated.View>
      <Animated.View style={[styles.bottomSheetContainer, rBottomsheetStyle]}>
        <GestureDetector gesture={gesture}>
          <View style={styles.line} />
        </GestureDetector>
        {children}
      </Animated.View>
    </>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT / 3,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -SCREEN_HEIGHT / 3,
    borderRadius: 25,
    paddingBottom: 50,
  },
  line: {
    width: 65,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
