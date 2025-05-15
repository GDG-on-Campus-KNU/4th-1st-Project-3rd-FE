import { HTMLProps, TouchEvent, useCallback, useRef } from 'react';

interface SwipeToXContainerInterface extends HTMLProps<HTMLDivElement> {
  startOffsetXPercent?: number;
  finishOffsetXPercent?: number;
  criteria?: number;
}

interface SwipeToXContainerLeftProps extends SwipeToXContainerInterface {
  direction: 'left';
  onLeftDetect: () => void;
}

interface SwipeToXContainerRightProps extends SwipeToXContainerInterface {
  direction: 'right';
  onRightDetect: () => void;
}

interface SwipeToXContainerBothProps extends SwipeToXContainerInterface {
  direction: 'both';
  onRightDetect: () => void;
  onLeftDetect: () => void;
}

const getTouchEventOffsetXPercent = (e: TouchEvent<HTMLDivElement>) => {
  const touch = e.touches[0];
  const rect = e.currentTarget.getBoundingClientRect();

  const offsetX = touch.clientX - rect.left;

  const width = e.currentTarget.offsetWidth;

  return (offsetX / width) * 100;
};

const initOffsetXPercent = 101;
const initOnDetect = () => {};
export default function SwipeXDetector(
  props:
    | SwipeToXContainerLeftProps
    | SwipeToXContainerRightProps
    | SwipeToXContainerBothProps,
) {
  const {
    startOffsetXPercent = 0,
    finishOffsetXPercent = 100,
    criteria = 30,
    children,
    direction,
    onRightDetect,
    onLeftDetect,
    ...restProps
  } = { onLeftDetect: initOnDetect, onRightDetect: initOnDetect, ...props };

  const swipeStartedOffsetXPercent = useRef(initOffsetXPercent);
  const swipeLastOffsetX = useRef(initOffsetXPercent);
  const touchStarted = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const nowOffsetXPercent = getTouchEventOffsetXPercent(e);
      if (nowOffsetXPercent < startOffsetXPercent) return;
      if (nowOffsetXPercent > finishOffsetXPercent) return;
      touchStarted.current = true;
      swipeStartedOffsetXPercent.current = nowOffsetXPercent;
    },
    [startOffsetXPercent, finishOffsetXPercent],
  );

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    swipeLastOffsetX.current = e.touches[e.touches.length - 1].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!touchStarted.current) return;
      touchStarted.current = false;
      const rect = e.currentTarget.getBoundingClientRect();

      const offsetX = swipeLastOffsetX.current - rect.left;

      const width = e.currentTarget.offsetWidth;

      const lastOffsetXPercent = (offsetX / width) * 100;
      const diffOffsetXPercent =
        lastOffsetXPercent - swipeStartedOffsetXPercent.current;
      if (direction === 'both' || direction === 'left') {
        if (diffOffsetXPercent < 0 && diffOffsetXPercent <= -criteria)
          onLeftDetect();
      }

      if (direction === 'both' || direction === 'right') {
        if (diffOffsetXPercent > 0 && diffOffsetXPercent >= criteria)
          onRightDetect();
      }
    },
    [direction, onLeftDetect, onRightDetect, criteria],
  );

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...restProps}
    >
      {children}
    </div>
  );
}
