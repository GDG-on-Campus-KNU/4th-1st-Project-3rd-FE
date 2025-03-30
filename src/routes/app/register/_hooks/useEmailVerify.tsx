import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

const VERIFY_INIT_SECOND = 5 * 60;
const LEFT_COUNT_INIT = 5;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

const getCodeErrorMessage = (
  leftCnt: number,
  maxVerifyCnt: number,
  leftSecond: number,
) => {
  if (leftSecond === 0)
    return '유효시간이 지났습니다. 오른쪽 버튼을 눌러 인증메일을 다시 보내주세요.' as const;
  if (leftCnt === 0)
    return '인증 횟수를 모두 사용하였습니다\n오른쪽 버튼을 눌러 인증메일을 다시 보내주세요.' as const;
  if (leftCnt !== LEFT_COUNT_INIT)
    return `인증번호가 일치하지 않습니다 ${maxVerifyCnt - leftCnt}/${maxVerifyCnt}` as const;
  return null;
};

export default function useEmailVerify() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState<string>('');
  const [canVerifyCode, setCanVerifyCode] = useState(false);
  const [leftSecond, setLeftSecond] = useState(0);
  const [leftCnt, setLeftCnt] = useState(LEFT_COUNT_INIT);
  const codeErrorMessage = getCodeErrorMessage(
    leftCnt,
    LEFT_COUNT_INIT,
    leftSecond,
  );
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

  const sendCode = useCallback(async () => {
    try {
      await postFetch(HTTP_API_END_POINT.sendEmailCode, { body: { email } });
    } catch (_: unknown) {
      setHasEmailError(true);
      return;
    }
    setHasEmailError(false);
    setIsValidCode(true);
    setLeftCnt(LEFT_COUNT_INIT);
    setLeftSecond(VERIFY_INIT_SECOND);
    setCanVerifyCode(true);
  }, [email]);

  const verifyCode = useCallback(async () => {
    if (!canVerifyCode) return;
    if (leftSecond <= 0) return;
    if (leftCnt <= 0) return;
    if (code.length !== 4) return;
    try {
      setCanVerifyCode(false);
      await postFetch<verifyEmailRequestBody>(HTTP_API_END_POINT.verifyEmail, {
        body: { email, code: Number(code) },
      });
    } catch (_: unknown) {
      if (leftCnt) setLeftCnt(leftCnt - 1);
      setCanVerifyCode(true);
      return;
    }
    setIsVerified(true);
  }, [canVerifyCode, leftSecond, code, leftCnt, email]);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setHasEmailError(!EMAIL_REGEX.test(e.currentTarget.value));
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
    hasEmailError,
    isVerified,
    hasCodeError,
    codeErrorMessage,
    sendCode,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
  };
}
