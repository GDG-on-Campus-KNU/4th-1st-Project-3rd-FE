import Skeleton from '@_/components/common/Skeleton/Skeleton';

import styles from './MbtiListSkeleton.module.css';

const ItemSkeleton = () => {
  return (
    <div className={styles['mbti-item']}>
      <div className={styles['mbti-item-sona-container']}>
        <Skeleton className={styles['mbti-item-sona']} />
        <Skeleton className={styles['mbti-item-text']} />
      </div>
      <Skeleton className={styles['mbti-item-add-button']} />
    </div>
  );
};

export default function MbtiListSkeleton() {
  return (
    <div>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
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
