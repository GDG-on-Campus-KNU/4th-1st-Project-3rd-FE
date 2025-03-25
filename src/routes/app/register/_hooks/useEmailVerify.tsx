import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';
import useChangeHandler from '@_/hooks/useChangeHandler';

const VERIFY_INIT_SECOND = 5 * 60;
const LEFT_COUNT_INIT = 5;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
export default function useEmailVerify() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState<string>('');
  const [canCheckCode, setCanVerifyCode] = useState(false);
  const [leftSecond, setLeftSecond] = useState(0);
  const [leftCnt, setLeftCnt] = useState(LEFT_COUNT_INIT);
  const [hasCodeError, setHasCodeError] = useState(false);

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
    if (isValidCode) return;
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
  }, [isValidCode, email]);

  const verifyCode = useCallback(async () => {
    if (!canCheckCode) return;
    if (leftSecond <= 0) return;
    if (code.length !== 4) return;
    try {
      setCanVerifyCode(false);
      await postFetch<verifyEmailRequestBody>(HTTP_API_END_POINT.verifyEmail, {
        body: { email, code: Number(code) },
      });
    } catch (_: unknown) {
      if (leftCnt) setLeftCnt(leftCnt - 1);
      setCanVerifyCode(true);
      setHasCodeError(true);
      return;
    }
    setHasCodeError(false);
    setIsVerified(true);
  }, [canCheckCode, leftSecond, code, leftCnt, email]);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setHasEmailError(!EMAIL_REGEX.test(e.currentTarget.value));
  }, []);

  const handleChangeCode = useChangeHandler(setCode);

  return {
    email,
    hasEmailError,
    isVerified,
    hasCodeError,
    sendCode,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
  };
}
