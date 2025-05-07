import { ChangeEvent } from 'react';

import ControlledInput from '@_/components/common/Input/ControlledInput';

import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterEmailPage.module.css';

interface EmailPageProps {
  email: string;
  hasEmailError: boolean;
  isEmailSending: boolean;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterEmailPage({
  email,
  hasEmailError,
  isEmailSending,
  onEmailChange,
}: EmailPageProps) {
  return (
    <>
      <RegisterDescription
        title="인증번호 입력"
        description="이메일 인증으로 가입을 시작할 수 있어요!"
      />

      <ControlledInput
        value={email}
        isError={hasEmailError}
        onChange={onEmailChange}
        placeholder="이메일"
        isLoading={isEmailSending}
      />
      <span className={styles['error-message']}>
        {hasEmailError && '이메일 형식이 맞지 않습니다'}
      </span>
    </>
  );
}
