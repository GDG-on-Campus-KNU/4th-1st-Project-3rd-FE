import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';

export default function useNonLoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkIsAuthed() {
      const { isAuthed } = await getFetch<CheckIsAuthedBody>(
        HTTP_API_END_POINT.checkIsAuthed,
      );

      if (isAuthed) navigate(APP_END_POINT.chattingList);
    }
    checkIsAuthed();
  }, [navigate]);
}
