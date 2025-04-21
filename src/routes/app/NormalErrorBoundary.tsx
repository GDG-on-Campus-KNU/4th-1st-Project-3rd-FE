import { PropsWithChildren } from 'react';

import Button from '@_/components/common/Button/Button';
import { ErrorBoundary } from '@_/components/common/ErrorBoundary/ErrorBoundary';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';

import styles from './NormalErrorBoundary.module.css';

export default function NormalErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div className={styles.container}>
          <SonaWithBlur type="ISFJ" height={150} />
          <span className={styles.description}>
            에러가 발생했습니다.
            <br />
            다시 시도해주세요.
          </span>
          <div className={styles['button-container']}>
            <Button onClick={resetError}>다시 시도</Button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
