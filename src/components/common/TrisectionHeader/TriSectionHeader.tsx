import { ReactNode } from 'react';

import styles from './TriSectionHeader.module.css';

export interface ChatHeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export default function TriSectionHeader(props: ChatHeaderProps) {
  const { left, center, right } = props;

  return (
    <header className={styles.header}>
      <div className={styles.relator}>
        <div
          className={[
            styles['header-section'],
            styles['header-side-section'],
            styles['left-section'],
          ].join(' ')}
        >
          {left}
        </div>
        <div
          className={[styles['header-section'], styles['center-section']].join(
            ' ',
          )}
        >
          {center}
        </div>
        <div
          className={[
            styles['header-section'],
            styles['header-side-section'],
            styles['right-section'],
          ].join(' ')}
        >
          {right}
        </div>
      </div>
    </header>
  );
}
