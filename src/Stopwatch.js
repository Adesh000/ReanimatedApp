import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let intervalTime;
    if (running) {
      intervalTime = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalTime);
    }

    return () => clearInterval(intervalTime);
  }, [running]);
  console.log(time);
  return (
    <View>
      <Text style={{color: '#000'}}>{time}</Text>
      <Button
        title={running ? 'Stop' : 'Start'}
        onPress={() => setRunning(prev => !prev)}
      />
      <Button
        title="Reset"
        onPress={() => {
          setTime(0);
          setRunning(false);
        }}
      />
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({});
