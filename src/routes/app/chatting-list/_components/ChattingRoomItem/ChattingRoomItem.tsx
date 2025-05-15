import {
  type HTMLProps,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import RefreshSVG from '@_/components/common/svgs/RefreshSVG';
import TrashCanSVG from '@_/components/common/svgs/TrashCanSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';

import styles from './ChattingRoomItem.module.css';

export interface ChattingRoomItemProps extends HTMLProps<HTMLDivElement> {
  mbti: Mbti;
  lastMessage: string | null;
  isViewed: boolean;
  isSwiped: boolean;
  setIsSwiped: (isSwiped: boolean | ((prev: boolean) => boolean)) => void;
  onRefresh: () => void;
  onDelete: () => void;
  onChattingRoomClick: () => void;
}

const getTouchEventOffsetXPosition = (e: TouchEvent<HTMLDivElement>) => {
  return e.touches[0].clientX;
};

const getMovedDistance = (
  swipeStartedTouchX: number | null,
  swipeLastTouchX: number | null,
  isSwiped: boolean,
) => {
  if (swipeStartedTouchX === null || swipeLastTouchX === null) return 0;
  if (isSwiped) return swipeLastTouchX - swipeStartedTouchX;

  return swipeStartedTouchX - swipeLastTouchX;
};

export function ChattingRoomItem({
  mbti,
  lastMessage,
  isSwiped,
  isViewed,
  className,
  style,
  onRefresh,
  onDelete,
  onChattingRoomClick,
  setIsSwiped,
  ...restProps
}: ChattingRoomItemProps) {
  const swipeStartedTouchX = useRef<number | null>(null);
  const swipeLastTouchX = useRef<number | null>(null);
  const touchStarted = useRef(false);

  const swiperRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const canMoveRef = useRef(true);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.style.right = `${isSwiped ? buttonContainerRef.current?.offsetWidth : 0}px`;
    }
  }, [isSwiped]);

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    touchStarted.current = true;
    canMoveRef.current = true;
    swipeStartedTouchX.current = getTouchEventOffsetXPosition(e);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!canMoveRef.current) return;
      if (swipeStartedTouchX.current === null) return;
      canMoveRef.current = false;

      swipeLastTouchX.current = e.touches[e.touches.length - 1].clientX;
      requestAnimationFrame(() => {
        if (!swiperRef.current) {
          canMoveRef.current = true;
          return;
        }
        if (swipeStartedTouchX.current === null) return;
        const moveDistance = getMovedDistance(
          swipeStartedTouchX.current,
          swipeLastTouchX.current,
          isSwiped,
        );
        const BUTTONS_WIDTH = buttonContainerRef.current?.offsetWidth || 0;

        swiperRef.current.style.right = `${
          isSwiped
            ? Math.max(Math.min(BUTTONS_WIDTH - moveDistance, BUTTONS_WIDTH), 0)
            : Math.min(Math.max(moveDistance, 0), BUTTONS_WIDTH)
        }px`;
        canMoveRef.current = true;
      });
    },
    [isSwiped],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!swiperRef.current) return;
      if (swipeStartedTouchX.current === null) return;
      if (swipeLastTouchX.current === null) return;
      const BUTTONS_WIDTH = buttonContainerRef.current?.offsetWidth || 0;
      const moveDistance = getMovedDistance(
        swipeStartedTouchX.current,
        swipeLastTouchX.current,
        isSwiped,
      );
      setIsSwiped((prev) => {
        const isSameLast = moveDistance <= 40;
        const nextIsSwiped = isSameLast ? prev : !prev;
        if (!swiperRef.current) return nextIsSwiped;
        if (isSameLast) {
          swiperRef.current.style.right = `${nextIsSwiped ? BUTTONS_WIDTH : 0}px`;
        }
        return nextIsSwiped;
      });

      swipeStartedTouchX.current = null;
      swipeLastTouchX.current = null;
    },
    [isSwiped, setIsSwiped],
  );

  const handleRefresh = useCallback(() => {
    onRefresh();
    setIsSwiped(false);
  }, [onRefresh, setIsSwiped]);

  const handleDelete = useCallback(() => {
    onDelete();
    setIsSwiped(false);
  }, [onDelete, setIsSwiped]);
  return (
    <div
      className={[styles['chatting-room-container'], className].join(' ')}
      style={style}
      {...restProps}
    >
      <div
        className={styles['chatting-room']}
        onClick={isSwiped ? undefined : onChattingRoomClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={swiperRef}
      >
        <div className={styles['profile-image']}>
          <SONASvg
            className={styles['profile-image-svg']}
            type={mbti}
            width={36}
            height={36}
          />
        </div>
        <div className={styles['chat-info']}>
          <div className={styles['name-and-time']}>
            <h3 className={styles.name}>{mbti}</h3>
          </div>
          <p className={styles.message}>{lastMessage || '대화가 없습니다'}</p>
          {!isViewed && <div className={styles['unread-count']} />}
        </div>
      </div>
      <div className={styles['chat-actions']} ref={buttonContainerRef}>
        <button
          className={[styles['chat-actions-button'], styles.refresh].join(' ')}
          onClick={isSwiped ? handleRefresh : undefined}
        >
          <RefreshSVG />
        </button>
        <button
          className={[styles['chat-actions-button'], styles.delete].join(' ')}
          onClick={isSwiped ? handleDelete : undefined}
        >
          <TrashCanSVG />
        </button>
      </div>
    </div>
  );
}
