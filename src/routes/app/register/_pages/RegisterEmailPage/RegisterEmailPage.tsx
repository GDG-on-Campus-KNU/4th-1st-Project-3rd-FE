import { ChangeEvent } from 'react';

import ControlledInput from '@_/components/common/Input/ControlledInput';

import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterEmailPage.module.css';

interface EmailPageProps {
  email: string;
  hasEmailFormatError: boolean;
  usedEmail: string | null;
  isEmailSending: boolean;
  verifiedEmail: string | null;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterEmailPage({
  email,
  hasEmailFormatError,
  usedEmail,
  isEmailSending,
  verifiedEmail,
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
        autoComplete="username"
        disabled={isEmailSending}
      />
      <span className={styles['message']}>
        {verifiedEmail && (
          <>
            {`${verifiedEmail}로 인증 받으셨습니다.`}
            <br />
            이메일을 수정하시면 다른 이메일로 인증받으실 수 있습니다.
          </>
        )}
        {hasEmailFormatError && (
          <div className={styles.error}>이메일 형식이 맞지 않습니다</div>
        )}
        {isUsedEmail && (
          <div
            className={styles.error}
          >{`${usedEmail}은 이미 사용 중인 이메일입니다.`}</div>
        )}
      </span>
    </>
  );
}
