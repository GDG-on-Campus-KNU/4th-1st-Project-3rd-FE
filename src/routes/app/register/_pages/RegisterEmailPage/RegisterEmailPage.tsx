import { ChangeEvent } from 'react';

import ControlledInput from '@_/components/common/Input/ControlledInput';

import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterEmailPage.module.css';

interface EmailPageProps {
  email: string;
  hasEmailFormatError: boolean;
  usedEmail: string | null;
  isEmailSending: boolean;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterEmailPage({
  email,
  hasEmailFormatError,
  usedEmail,
  isEmailSending,
  onEmailChange,
}: EmailPageProps) {
  const isUsedEmail = email === usedEmail;
  return (
    <>
      <RegisterDescription
        title="인증번호 입력"
        description="이메일 인증으로 가입을 시작할 수 있어요!"
      />

      <ControlledInput
        value={email}
        isError={hasEmailFormatError || isUsedEmail}
        onChange={onEmailChange}
        placeholder="이메일"
        autoFocus
        isLoading={isEmailSending}
      />
      <span className={styles['error-message']}>
        {hasEmailFormatError && '이메일 형식이 맞지 않습니다'}
        <br />
        {isUsedEmail && `${usedEmail}은 이미 사용 중인 이메일입니다.`}
      </span>
    </>
  );
}
