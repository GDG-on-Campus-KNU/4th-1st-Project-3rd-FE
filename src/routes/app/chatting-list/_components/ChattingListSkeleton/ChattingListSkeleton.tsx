import Skeleton from '@_/components/common/Skeleton/Skeleton';

import styles from './ChattingListSkeleton.module.css';

const ItemSkeleton = () => {
  return (
    <div className={[styles['chatting-room-container']].join(' ')}>
      <Skeleton className={styles['profile-image']}></Skeleton>
      <div className={styles['chat-info']}>
        <Skeleton className={styles['name-and-time']}></Skeleton>
        <Skeleton className={styles.message}></Skeleton>
      </div>
    </div>
  );
};

export default function ChattingListSkeleton() {
  return (
    <div>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </div>
  );
}
