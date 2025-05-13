import { ChangeEvent, useEffect, useRef } from 'react';

import ControlledInput from '@_/components/common/Input/ControlledInput';
import getMMSSBySecond from '@_/utils/getMMSSBySecond';

import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterCodePage.module.css';

interface RegisterCodePageProps {
  email: string;
  code: string;
  maxVerifyCnt: number;
  leftCnt: number;
  leftSecond: number;
  isVerified: boolean;
  isCodeSending: boolean;
  hasCodeError: boolean;
  codeErrorMessage: string | null;
  isExpired: boolean;
  isAuto: boolean;
  verify: () => Promise<void>;
  onCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetCode: () => void;
}

const MAX_CODE_LENGTH = 4;

export default function RegisterCodePage(props: RegisterCodePageProps) {
  const {
    email,
    code,
    leftCnt,
    leftSecond,
    hasCodeError,
    codeErrorMessage,
    isVerified,
    isExpired,
    isCodeSending,
    isAuto,
    verify,
    onCodeChange,
    resetCode,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const canCodeSend = !isExpired && code.length === MAX_CODE_LENGTH;

  useEffect(() => {
    if (canCodeSend) {
      verify().catch((_) => {
        resetCode();
        setTimeout(() => inputRef.current?.focus());
        throw _;
      });
      return;
    }
  }, [canCodeSend, resetCode, verify]);

  return (
    <>
      <RegisterDescription
        title="인증번호 입력"
        description={`${email}로 전송되었어요`}
      />
      <ControlledInput
        max={9999}
        min={0}
        value={code}
        onChange={onCodeChange}
        className={styles.input}
        placeholder={
          isExpired
            ? '인증 메일을 다시 받으세요'
            : '인증번호 4자리를 입력하세요'
        }
        isError={hasCodeError}
        disabled={isVerified || isExpired}
        isLoading={isCodeSending}
        type="number"
        autoFocus
        autoComplete="one-time-code"
        ref={inputRef}
        rightIcon={
          !isVerified && (
            <div className={styles['send-container']}>
              <span className={styles['left-time']}>
                {leftCnt ? getMMSSBySecond(leftSecond) : null}
              </span>
            </div>
          )
        }
      />
      <div className={styles['description-container']}>
        <span className={styles['mail-description']}>
          메일이 안 왔을 경우, 스팸함을 확인해주세요.
        </span>
        <div>
          <span className={styles['error-message']}>
            {hasCodeError && codeErrorMessage}
            <span className={styles['verified-message']}>
              {!isAuto && isVerified && '인증완료'}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
