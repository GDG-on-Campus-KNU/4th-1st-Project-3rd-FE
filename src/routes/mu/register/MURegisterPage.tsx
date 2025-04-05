import { useEffect, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

import styles from './LoginPage.module.css';

type EmailResponse = {
  isMailValid: boolean;
};

function MURegisterPage() {
  const [emailState, setemailState] = useState(false);

  const fetchemailState = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(
        `${HTTP_API_END_POINT.mockCheckVerifyEmail}?t=${timestamp}`,
      );
      const data: EmailResponse = await res.json();

      setemailState(data.isMailValid);
    } catch (error) {
      console.error('이메일 인증 상태 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchemailState();
  }, []);

  const handleToggle = async () => {
    try {
      await postFetch(HTTP_API_END_POINT.mockCheckVerifyEmail);
      await fetchemailState(); // POST 후 상태 새로 받아오기
    } catch (error) {
      console.error('이메일 인증 상태 토글 오류:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>이메일 인증 리모컨</h2>
      <p className={styles.state}>
        state : {emailState ? '인증됨' : '인증되지 않음'}
      </p>
      <button className={styles.toggle} onClick={handleToggle}>
        인증 상태 변경
      </button>
    </div>
  );
}

export default MURegisterPage;
