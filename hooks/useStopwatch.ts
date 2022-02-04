import {useState, useEffect} from 'react';

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
        100,
      );
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  };
};

const useLapsFetcher = () => {
  const [errorWhileFetching, setErrorWhileFetching] = useState(false);
  const postLaps = async (bestLap: number, worstLap: number) => {
    if (!bestLap || !worstLap) {
      return;
    }
    setErrorWhileFetching(false);
    try {
      const response = await fetch('http://fast-and-furious.io/laps', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({bestLap, worstLap}),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
      setErrorWhileFetching(true);
    }
  };

  return {
    postLaps: (b: number, w: number) => postLaps(b, w),
    errorWhileFetching,
  };
};

export const useStopwatch = () => {
  const [laps, setLaps] = useState([]);
  const {isRunning, setIsRunning, elapsedTime, setElapsedTime} = useTimer();
  const {postLaps, errorWhileFetching} = useLapsFetcher();
  const [fetchError, setFetchError] = useState(false);

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    setFetchError(false);
  };

  const newLap = () => {
    setFetchError(false);
    const prevTotal = laps.reduce((acc, curr) => acc + curr, 0);
    if (isRunning) {
      const newLaps = [elapsedTime - prevTotal, ...laps];
      setLaps(newLaps);

      const bestLap = Math.min(...laps);
      const worstLap = Math.max(...laps);
      postLaps(bestLap, worstLap);

      if (errorWhileFetching) {
        setFetchError(true);
      }
    }
  };

  return {
    elapsedTime: elapsedTime.toFixed(2),
    laps,
    newLap: () => newLap(),
    resetTimer: () => resetTimer(),
    stopTimer: () => setIsRunning(false),
    isRunning,
    fetchError,
    startTimer: () => setIsRunning(true),
  };
};
