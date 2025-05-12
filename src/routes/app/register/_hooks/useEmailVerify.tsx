import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

const VERIFY_INIT_SECOND = 5 * 60;
const LEFT_COUNT_INIT = 5;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

export default function useEmailVerify() {
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [hasEmailFormatError, setHasEmailFormatError] = useState(false);
  const [usedEmail, setUsedEmail] = useState<string | null>(null);
  const [isValidCode, setIsValidCode] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState<string>('');
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [canVerifyCode, setCanVerifyCode] = useState(false);
  const [leftSecond, setLeftSecond] = useState(0);
  const [leftCnt, setLeftCnt] = useState(LEFT_COUNT_INIT);
  const [codeErrorMessage, setCodeErrorMessage] = useState<string | null>(null);
  const hasCodeError = !!codeErrorMessage;
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!isValidCode) return;
    function leftTimeInterval() {
      setLeftSecond((prev) => {
        return Math.max(prev - 1, 0);
      });
    }
    intervalIdRef.current = setInterval(leftTimeInterval, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [isValidCode]);

  useEffect(() => {
    if (isValidCode && leftSecond === 0) {
      clearInterval(intervalIdRef.current);
      setIsValidCode(false);
    }
  }, [isValidCode, leftSecond]);

  const sendEmail = useCallback(async () => {
    setIsEmailSending(true);
    try {
      await postFetch(HTTP_API_END_POINT.sendEmailCode, {
        body: { email },
        handleCode: (code) => {
          switch (code) {
            case 'U001':
              setUsedEmail(email);
              return;
          }
        },
      });
    } catch (e: unknown) {
      setIsEmailSending(false);
      throw e;
    }
    setIsEmailSending(false);
    setHasEmailFormatError(false);
    setUsedEmail(null);
    setIsValidCode(true);
    setLeftCnt(LEFT_COUNT_INIT);
    setLeftSecond(VERIFY_INIT_SECOND);
    setCanVerifyCode(true);
    setCodeErrorMessage(null);
    setIsVerified(false);
    setCodeErrorMessage(null);
    setIsVerified(false);
    setHasEmailFormatError(false);
    setCode('');
  }, [email]);

  const verifyCode = useCallback(async () => {
    if (!canVerifyCode) return;
    if (leftSecond <= 0) return;
    if (leftCnt <= 0) return;
    if (code.length !== 4) return;
    setIsCodeSending(true);
    try {
      setCanVerifyCode(false);
      await postFetch<verifyEmailRequestBody>(HTTP_API_END_POINT.verifyEmail, {
        body: { email, code },
        handleCode: (code) => {
          switch (code) {
            case 'E001':
              return setCodeErrorMessage(
                '유효시간이 지났습니다. 오른쪽 버튼을 눌러 인증메일을 다시 보내주세요.',
              );
            case 'E002':
              return setCodeErrorMessage(
                '인증 횟수를 모두 사용하였습니다\n오른쪽 버튼을 눌러 인증메일을 다시 보내주세요.',
              );
            case 'E003':
              return setCodeErrorMessage(
                `인증번호가 일치하지 않습니다 ${LEFT_COUNT_INIT - leftCnt + 1}/${LEFT_COUNT_INIT}`,
              );
            default:
              return setCodeErrorMessage('예상치 못한 오류가 발생하였습니다.');
          }
        },
      });
    } catch (_: unknown) {
      if (leftCnt) setLeftCnt(leftCnt - 1);
      setIsCodeSending(false);
      setCanVerifyCode(true);
      throw _;
    }
    setCodeErrorMessage(null);
    setIsCodeSending(false);
    setIsVerified(true);
    setHasEmailFormatError(false);
  }, [canVerifyCode, leftSecond, code, leftCnt, email]);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setHasEmailFormatError(!EMAIL_REGEX.test(e.currentTarget.value));
  }, []);

  const handleChangeCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.currentTarget.value))) return;
    if (e.currentTarget.value.length > 4) return;
    setCode(e.currentTarget.value);
  }, []);

  return {
    email,
    code,
    leftCnt,
    leftSecond,
    hasEmailFormatError,
    usedEmail,
    isEmailSending,
    isCodeSending,
    isVerified,
    hasCodeError,
    codeErrorMessage,
    sendEmail,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
  };
}
