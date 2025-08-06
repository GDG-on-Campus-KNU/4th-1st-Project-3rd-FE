import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';
import NetworkError from '@_/fetches/errors/NetworkError';
import useTimer from '@_/hooks/useTimer';

const VERIFY_INIT_SECOND = 5 * 60;
const LEFT_COUNT_INIT = 5;

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

export default function useEmailVerify() {
  const [email, setEmail] = useState('');
  const [hasEmailFormatError, setHasEmailFormatError] = useState(false);
  const [usedEmail, setUsedEmail] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState<string>('');
  const [canVerifyCode, setCanVerifyCode] = useState(false);
  const [leftCnt, setLeftCnt] = useState(LEFT_COUNT_INIT);
  const [codeErrorMessage, setCodeErrorMessage] = useState<string | null>(null);
  const hasCodeError = !!codeErrorMessage;

  const {
    leftSecond: codeLeftSecond,
    startCount: startCodeCount,
    resetCount: resetCodeCount,
  } = useTimer(useMemo(() => ({ targetSec: VERIFY_INIT_SECOND }), []));

  const { mutate: sendEmail, isPending: isSendEmailPending } = useMutation({
    mutationFn: () =>
      postFetch(HTTP_API_END_POINT.sendEmailCode, { body: { email } }),
    onSuccess: () => {
      setHasEmailFormatError(false);
      setUsedEmail(null);
      setLeftCnt(LEFT_COUNT_INIT);
      setCanVerifyCode(true);
      setCodeErrorMessage(null);
      setIsVerified(false);
      setCodeErrorMessage(null);
      setIsVerified(false);
      setHasEmailFormatError(false);
      setCode('');
      startCodeCount();
      setVerifiedEmail(email);
    },
    onError: (e: NetworkError) => {
      if (e.code === 'E001') {
        alert('이메일이 만료되었습니다. 처음부터 다시 시도해주세요.');
      } else alert('알 수 없는 오류입니다. 다시 시도해주세요.');
    },
  });

  const { mutate: verifyCodeMutate, isPending: isVerifyCodePending } =
    useMutation({
      mutationFn: () =>
        postFetch(HTTP_API_END_POINT.verifyEmail, { body: { email, code } }),

      onSuccess: () => {
        setCodeErrorMessage(null);
        setIsVerified(true);
        setHasEmailFormatError(false);
        resetCodeCount();
      },
      onError: (e: NetworkError) => {
        switch (e.code) {
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

  const verifyCode = useCallback(async () => {
    if (!canVerifyCode) return;
    if (codeLeftSecond <= 0) return;
    if (leftCnt <= 0) return;
    if (code.length !== 4) return;
    verifyCodeMutate();
  }, [canVerifyCode, codeLeftSecond, code, leftCnt, verifyCodeMutate]);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setHasEmailFormatError(!EMAIL_REGEX.test(e.currentTarget.value));
  }, []);

  const handleChangeCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.currentTarget.value))) return;
    if (e.currentTarget.value.length > 4) return;
    setCode(e.currentTarget.value);
  }, []);

  const resetCode = useCallback(() => {
    setCode('');
  }, []);

  return {
    email,
    code,
    leftCnt,
    leftSecond: codeLeftSecond,
    hasEmailFormatError,
    usedEmail,
    isEmailSending: isSendEmailPending,
    isCodeSending: isVerifyCodePending,
    isVerified,
    hasCodeError,
    codeErrorMessage,
    isCodeExpired: leftCnt === 0 || codeLeftSecond === 0,
    verifiedEmail,
    sendEmail,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
    resetCode,
  };
}
