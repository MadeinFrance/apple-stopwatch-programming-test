import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const switchColorStatus = status => {
  switch (status) {
    case 'worst':
      return 'red';
    case 'best':
      return 'green';
    default:
      return 'white';
  }
};

const lapStatus = (isBestLap, isWorstLap) => {
  if (isBestLap && isWorstLap) {
    return;
  }
  if (isBestLap) {
    return 'best';
  } else if (isWorstLap) {
    return 'worst';
  }
  return null;
};

const Laps: FC<{
  isRunning: boolean;
  displayedTime: string;
  laps: number[];
}> = ({isRunning, displayedTime, laps}) => {
  const bestLap = Math.min(...laps);
  const worstLap = Math.max(...laps);

  return (
    <ScrollView style={styles.scrollView}>
      {isRunning && (
        <>
          <View style={styles.lapsContainer} key="nextLap">
            <Text style={styles.nextLap}>Lap {laps.length + 1}</Text>
            <Text style={styles.nextLap}>{displayedTime}</Text>
          </View>
          <View style={styles.divider} />
        </>
      )}
      {laps.map((lap, i) => {
        const isBestLap = lap === bestLap;
        const isWorstLap = lap === worstLap;
        const color = switchColorStatus(lapStatus(isBestLap, isWorstLap));

        return (
          <>
            <View key={i} style={styles.lapsContainer}>
              <Text style={{color}}>Lap {laps.length - i}</Text>
              <Text style={{color}}>{+lap.toFixed(2)}s</Text>
            </View>
            <View style={styles.divider} />
          </>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {marginTop: 15},
  lapsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#202020',
    marginHorizontal: 10,
  },
  nextLap: {
    color: 'white',
  },
});

export default Laps;
