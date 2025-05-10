import { ChangeEvent } from 'react';

import Button from '@_/components/common/Button/Button';
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
  verify: () => void;
  resend: () => void;
  onCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MAX_CODE_LENGTH = 4;

const getButtonMessage = (leftSecond: number, leftCnt: number) => {
  if (leftSecond > 0 && leftCnt > 0) return '인증';
  return '재전송';
};

const isValidButton = (leftSecond: number, leftCnt: number, code: string) => {
  if (leftSecond > 0 && leftCnt > 0 && code.length === MAX_CODE_LENGTH)
    return true;
  if (leftSecond === 0) return true;
  if (leftCnt === 0) return true;
  return false;
};

export default function RegisterCodePage(props: RegisterCodePageProps) {
  const {
    email,
    code,
    leftCnt,
    leftSecond,
    hasCodeError,
    codeErrorMessage,
    isVerified,
    isCodeSending,
    verify,
    resend,
    onCodeChange,
  } = props;

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
        placeholder="인증번호 4자리를 입력하세요"
        isError={hasCodeError}
        disabled={isVerified || leftCnt === 0}
        isLoading={isCodeSending}
        type="number"
        rightIcon={
          !isVerified && (
            <div className={styles['send-container']}>
              <span className={styles['left-time']}>
                {leftCnt ? getMMSSBySecond(leftSecond) : null}
              </span>
              <Button
                onClick={leftCnt && leftSecond ? verify : resend}
                className={[
                  styles['send-button'],
                  isValidButton(leftSecond, leftCnt, code) && !isCodeSending
                    ? styles.valid
                    : '',
                ].join(' ')}
                isValid={isValidButton(leftSecond, leftCnt, code)}
                isLoading={isCodeSending}
              >
                {getButtonMessage(leftSecond, leftCnt)}
              </Button>
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
              {isVerified && '인증완료'}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
