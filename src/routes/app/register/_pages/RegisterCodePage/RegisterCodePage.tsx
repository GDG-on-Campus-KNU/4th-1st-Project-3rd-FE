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
  hasCodeError: boolean;
  verify: () => void;
  resend: () => void;
  onCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const getErrorMessage = (leftCnt: number, maxVerifyCnt: number) => {
  if (leftCnt > 0)
    return ` 인증번호가 일치하지 않습니다${maxVerifyCnt - leftCnt}/${maxVerifyCnt}`;
  return '인증 횟수를 모두 사용하였습니다\n오른쪽 버튼을 눌러 인증메일을 다시 보내주세요';
};

const getButtonMessage = (leftSecond: number, leftCnt: number) => {
  if (leftSecond > 0 && leftCnt > 0) return '인증';
  return '재전송';
};
export default function RegisterCodePage(props: RegisterCodePageProps) {
  const {
    email,
    code,
    maxVerifyCnt,
    leftCnt,
    leftSecond,
    hasCodeError,
    isVerified,
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
        disabled={isVerified}
        rightIcon={
          !isVerified && (
            <div className={styles['send-container']}>
              {
                <span className={styles['left-time']}>
                  {getMMSSBySecond(leftSecond)}
                </span>
              }
              <Button
                onClick={leftCnt && leftSecond ? verify : resend}
                className={styles['send-button']}
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
          {hasCodeError && (
            <span className={styles['error-message']}>
              {getErrorMessage(leftCnt, maxVerifyCnt)}
            </span>
          )}
          {isVerified && (
            <span className={styles['verified-message']}>인증완료</span>
          )}
        </div>
      </div>
    </>
  );
}
