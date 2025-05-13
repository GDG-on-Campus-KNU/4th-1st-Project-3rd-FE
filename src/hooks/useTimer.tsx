import { useCallback, useRef, useState } from 'react';

interface useTimerProps {
  targetSec: number;
  onFinish?: () => void;
}

export default function useTimer(props: useTimerProps) {
  const { targetSec, onFinish = () => {} } = props;
  const [leftSecond, setLeftSecond] = useState(targetSec);

  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const resetCount = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  const startCount = useCallback(() => {
    const targetDate = new Date(new Date().getTime() + targetSec * 1000);

    intervalRef.current = setInterval(() => {
      const nowDate = new Date();
      const leftCnt = Math.max(
        0,
        Math.floor((targetDate.getTime() - nowDate.getTime()) / 1000),
      );
      setLeftSecond(leftCnt);
      if (leftCnt === 0) {
        clearInterval(intervalRef.current);

        onFinish();
      }
    }, 100);
  }, [onFinish, targetSec]);

  return { resetCount, startCount, leftSecond };
}
