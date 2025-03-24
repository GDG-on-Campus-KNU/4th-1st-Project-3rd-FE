import { useCallback, useEffect, useRef, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';
import useChangeHandler from '@_/hooks/useChangeHandler';

const VERIFY_INIT_SECOND = 5 * 60;
export default function useEmailVerify() {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState<string>('');
  const [canCheckCode, setCanVerifyCode] = useState(false);
  const [leftSecond, setLeftSecond] = useState(0);
  const [leftCnt, setLeftCnt] = useState(5);
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
      setHasEmailError(true);
      if (leftCnt) setLeftCnt(leftCnt - 1);
      setCanVerifyCode(true);
      setHasCodeError(true);
      return;
    }
    setHasCodeError(false);
    setIsVerified(true);
  }, [canCheckCode, leftSecond, code, leftCnt, email]);

  const handleChangeEmail = useChangeHandler(setEmail);

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
