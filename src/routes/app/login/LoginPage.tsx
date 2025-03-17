import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import ControlledInput from '@_/components/common/Input/ControlledInput';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

import styles from './LoginPage.module.css';

export default function AppLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postFetch<LoginRequestBody>(HTTP_API_END_POINT.login, {
      body: { email, password },
    })
      .then(() => {
        navigate(APP_END_POINT.chatMbti('ISFJ'));
      })
      .catch(() => {
        setErrorMessage('아이디 혹은 비밀번호가 틀렸습니다');
      });
  };

  return (
    <>
      <div className={styles.description}>
        로그인 후
        <br />
        이용이 가능합니다
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <ControlledInput
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isError={!!errorMessage}
        />
        <div className={styles['id-input']} />
        <ControlledInput
          placeholder="비밀번호"
          type={'password'}
          maxLength={30}
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
          isError={!!errorMessage}
        />
        <div className={styles['error-message']}>{errorMessage}</div>
        <Button className={styles['login-button']}>로그인</Button>
      </form>
    </>
  );
}
