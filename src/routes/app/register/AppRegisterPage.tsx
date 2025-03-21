import { useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';
import useNonLoginPage from '@_/hooks/useNonLoginPage';

export default function AppRegisterPage() {
  useNonLoginPage();

  const [isGeneratedCode, setIsGeneratedCode] = useState(false);
  const [isMailVerified, setIsMailVerified] = useState(false);
  const [hasMailErrorMessage, setHasMailErrorMessage] = useState(false);

  return (
    <>
      {!isGeneratedCode && (
        <button
          onClick={() =>
            postFetch(HTTP_API_END_POINT.sendEmailCode).then(() =>
              setIsGeneratedCode(true),
            )
          }
        >
          메일 인증 번호 생성
        </button>
      )}
      {isGeneratedCode && !isMailVerified && (
        <button
          onClick={() =>
            postFetch(HTTP_API_END_POINT.verifyEmail)
              .then(() => setIsMailVerified(true))
              .then(() => setHasMailErrorMessage(false))
              .catch(() => setHasMailErrorMessage(true))
          }
        >
          메일 인증 받기
        </button>
      )}
      {hasMailErrorMessage && (
        <span style={{ color: 'red' }}>
          {' '}
          <br /> 코드가 맞지 않습니다.
        </span>
      )}
      {isMailVerified && (
        <button
          onClick={() => {
            postFetch(HTTP_API_END_POINT.register).then(() =>
              location.reload(),
            );
          }}
        >
          회원가입 하기!(누르면 새로고쳐지면서 처음 플로우로 돌아감)
        </button>
      )}
    </>
  );
}
