import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';

export default function AppTestHttpPage() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchServerMessage() {
      try {
        const { message } = await getFetch<MessageResponse>(
          HTTP_API_END_POINT.testHttp,
        );
        setServerMessage(message);
      } catch (_: unknown) {
        setServerMessage('에러가 발생했습니다.');
      }
    }
    fetchServerMessage();
  }, []);
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const { message } = await getFetch<MessageResponse>(
              HTTP_API_END_POINT.testHttp,
            );
            setServerMessage(message);
          } catch (_: unknown) {
            setServerMessage('에러가 발생했습니다.');
          }
        }}
      >
        데이터 다시 가져오기
      </button>
      {serverMessage}
      <br />
      <button onClick={() => navigate(APP_END_POINT.main)}>
        메인 페이지 가기
      </button>
    </div>
  );
}
