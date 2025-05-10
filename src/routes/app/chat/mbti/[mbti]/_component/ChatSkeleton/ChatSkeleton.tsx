import Skeleton from '@_/components/common/Skeleton/Skeleton';

import styles from './ChatSkeleton.module.css';

const BubbleSkeleton = ({
  width,
  type,
}: {
  width: number;
  type: 'mine' | 'others';
}) => {
  return (
    <div className={[styles['chat-bubble-container'], styles[type]].join(' ')}>
      <Skeleton className={styles['time-span']} />
      <Skeleton
        className={styles['chat-bubble']}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default function ChatSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles['chat-day-div']} />
      <BubbleSkeleton type="mine" width={30} />
      <BubbleSkeleton type="others" width={30} />
      <BubbleSkeleton type="mine" width={30} />
      <BubbleSkeleton type="others" width={30} />
    </div>
  );
}
