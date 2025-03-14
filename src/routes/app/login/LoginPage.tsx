import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';

export default function AppLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      const { isAuthed } = await getFetch<CheckIsAuthedBody>(
        HTTP_API_END_POINT.checkIsAuthed,
      );
      if (isAuthed) navigate(APP_END_POINT.chatMbti('ISFJ'));
    }
    const id = setInterval(check, 100);
    return () => clearInterval(id);
  }, [navigate]);

  return (
    <>
      <span style={{ fontSize: '30px' }}>로그인하세요</span>
    </>
  );
}
