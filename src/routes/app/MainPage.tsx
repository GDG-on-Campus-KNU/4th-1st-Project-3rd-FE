import { Link, useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import APP_END_POINT from '@_/constants/appEndpoint';

import styles from './MainPage.module.css';

export default function AppMainPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <div>
        <SonaWithBlur type="talk" />
      </div>
      <div className={styles['main-description']}>
        PERSONA와 함께
        <br />
        MBTI 채팅을 시작하세요
      </div>
      <br />
      <div className={styles['sub-description']}>
        다양한 MBTI를 가진 AI와 대화해 볼 수 있어요
      </div>
      <Button
        onClick={() => navigate(APP_END_POINT.login)}
        className={styles.button}
      >
        로그인하고 이용하기
      </Button>
      <div className={styles['register-span']}>
        PERSONA가 처음이에요.{' '}
        <Link className={styles.register} to={APP_END_POINT.register}>
          회원가입하기
        </Link>
      </div>
    </div>
  );
}
