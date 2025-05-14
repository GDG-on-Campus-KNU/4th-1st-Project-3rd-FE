import { ChangeEvent } from 'react';

import ControlledInput from '@_/components/common/Input/ControlledInput';

import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterPassword.module.css';

interface RegisterPasswordPageProps {
  password: string;
  passwordChecker: string;
  passwordErrorMessage: string | null;
  passwordCheckerErrorMessage: string | null;
  hasPasswordError: boolean;
  hasPasswordCheckerError: boolean;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordChecker: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterPasswordPage(props: RegisterPasswordPageProps) {
  const {
    password,
    passwordChecker,
    passwordErrorMessage,
    passwordCheckerErrorMessage,
    hasPasswordError,
    hasPasswordCheckerError,
    onChangePassword,
    onChangePasswordChecker,
  } = props;

  return (
    <>
      <RegisterDescription title="비밀번호 설정" />
      {/* 접근성을 위한 빈 input */}
      <input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: 'none' }}
      />
      <ControlledInput
        type="password"
        value={password}
        isError={hasPasswordError}
        onChange={onChangePassword}
        placeholder="비밀번호"
        maxLength={20}
        autoFocus
        autoComplete="new-password"
      />
      <span className={styles['error-message']}>
        {hasPasswordError && passwordErrorMessage}
      </span>
      <ControlledInput
        type="password"
        value={passwordChecker}
        isError={hasPasswordCheckerError}
        onChange={onChangePasswordChecker}
        placeholder="비밀번호 확인"
        autoComplete="new-password"
        maxLength={20}
      />
      <span className={styles['error-message']}>
        {hasPasswordCheckerError && passwordCheckerErrorMessage}
      </span>
    </>
  );
}
