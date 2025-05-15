import { PropsWithChildren, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import { ErrorBoundary } from '@_/components/common/ErrorBoundary/ErrorBoundary';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import APP_END_POINT from '@_/constants/appEndpoint';

import styles from './NormalErrorBoundary.module.css';

export default function NormalErrorBoundary({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [isLoadingBar, setIsLoadingBar] = useState(true);

  return (
    <ErrorBoundary
      fallback={({ resetError }) =>
        isLoadingBar ? (
          <>
            loading
            {setTimeout(() => setIsLoadingBar(false))}
          </>
        ) : (
          <div className={styles.container}>
            <SonaWithBlur type="ISFJ" height={150} />
            <span className={styles.description}>
              에러가 발생했습니다.
              <br />
              다시 시도해주세요.
            </span>
            <div className={styles['button-container']}>
              <Button
                className={styles['back-button']}
                onClick={() => {
                  setIsLoadingBar(true);
                  navigate(APP_END_POINT.main);
                }}
              >
                메인화면으로
              </Button>
              <Button
                onClick={() => {
                  setIsLoadingBar(true);
                  resetError();
                }}
              >
                다시 시도
              </Button>
            </div>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  );
}
