/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useMemo} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Laps from './Laps';

import {useStopwatch} from './hooks/useStopwatch';

const ErrorDisplay = ({fetchError}: {fetchError: boolean}) =>
  fetchError ? (
    <View>
      <Text
        style={{
          color: 'red',
        }}>
        Ouch ... error
      </Text>
    </View>
  ) : null;

const App = () => {
  const {
    isRunning,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    laps,
    newLap,
    fetchError,
  } = useStopwatch();

  const toggleTimer = useCallback(() => {
    isRunning ? stopTimer() : startTimer();
  }, [isRunning, stopTimer, startTimer]);

  const toggleLapsOrReset = () => {
    isRunning ? newLap() : resetTimer();
  };

  const resetStyles = [
    styles.controls,
    {
      backgroundColor: '#3d3d3d',
    },
  ];
  const toggleTimerStyles = [
    styles.controls,
    {
      backgroundColor: isRunning ? '#420e0d' : '#1b361f',
    },
  ];

  const displayedTime = new Date(elapsedTime * 1000)
    .toISOString()
    .substr(11, 8);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.timerContainer}>
        <Text style={styles.status}>{displayedTime}</Text>
        <ErrorDisplay fetchError={fetchError} />
      </View>
      <View style={styles.controlsContainer}>
        <Pressable onPress={toggleLapsOrReset} style={resetStyles}>
          <View style={styles.innerCircle}>
            <Text style={styles.control}>{isRunning ? 'Lap' : 'Reset'}</Text>
          </View>
        </Pressable>
        <Pressable onPress={toggleTimer} style={toggleTimerStyles}>
          <View style={styles.innerCircle}>
            <Text style={styles.control}>{isRunning ? 'Stop' : 'Start'}</Text>
          </View>
        </Pressable>
      </View>
      <Laps laps={laps} displayedTime={displayedTime} isRunning={isRunning} />
    </SafeAreaView>
  );
};

const controlsHeight = 72;
const innerCircle = 63;
const styles = StyleSheet.create({
  control: {
    marginTop: 19,
    alignSelf: 'center',
    color: 'white',
  },
  controls: {
    backgroundColor: Colors.darker,
    width: controlsHeight,
    height: controlsHeight,
    borderRadius: controlsHeight / 2,
    borderWidth: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  innerCircle: {
    width: innerCircle,
    height: innerCircle,
    borderRadius: innerCircle / 2,
    borderWidth: 3,
    margin: 4,
    borderColor: 'black',
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  timerContainer: {
    height: '40%',
    alignItems: 'center',
  },
  status: {
    color: 'white',
    fontSize: 84,
    maxWidth: 400,
  },
  controlsContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
