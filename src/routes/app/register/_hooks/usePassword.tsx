import { ChangeEvent, useCallback, useState } from 'react';

const ONLY_DIGIT_ALPHABET_REGEX = /^[\dA-Za-z]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const getPasswordErrorMessage = (password: string) => {
  if (!ONLY_DIGIT_ALPHABET_REGEX.test(password))
    return '영어 대소문자와 숫자만 사용하실 수 있습니다';
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  )
    return '8~20글자만 사용하실 수 있습니다.';
  return null;
};
const getPasswordCheckerErrorMessage = (
  password: string,
  passwordChecker: string,
) => {
  if (password !== passwordChecker) return '비밀번호가 일치하지 않습니다.';
  return null;
};

export default function usePassword() {
  const [password, setPassword] = useState('');
  const [passwordChecker, setPasswordChecker] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [passwordCheckerErrorMessage, setPasswordCheckerErrorMessage] =
    useState<string | null>(null);

  const hasPasswordError = !!(
    passwordErrorMessage || passwordCheckerErrorMessage
  );
  const hasPasswordCheckerError = !!passwordCheckerErrorMessage;
  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setPassword(value);
      if (value) setPasswordErrorMessage(getPasswordErrorMessage(value));
      if (!value) setPasswordErrorMessage(null);
      if (passwordChecker) {
        setPasswordCheckerErrorMessage(
          getPasswordCheckerErrorMessage(value, passwordChecker),
        );
      }
      if (!passwordChecker) {
        setPasswordCheckerErrorMessage(null);
      }
    },
    [passwordChecker],
  );
  const handleChangePasswordChecker = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setPasswordChecker(value);
      if (value) {
        setPasswordCheckerErrorMessage(
          getPasswordCheckerErrorMessage(password, e.currentTarget.value),
        );
      }
      if (!value) setPasswordCheckerErrorMessage(null);
    },
    [password],
  );
  return {
    password,
    passwordChecker,
    passwordErrorMessage,
    passwordCheckerErrorMessage,
    hasPasswordError,
    hasPasswordCheckerError,
    handleChangePassword,
    handleChangePasswordChecker,
  };
}
