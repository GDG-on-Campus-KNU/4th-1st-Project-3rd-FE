import { PropsWithChildren, useState, useSyncExternalStore } from 'react';

import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import { authErrorStore } from '@_/fetches/handleNetworkError';

export default function AuthErrorBoundary({ children }: PropsWithChildren) {
  const lastError = useSyncExternalStore(
    authErrorStore.subscribe.bind(authErrorStore),
    authErrorStore.getSnapshot.bind(authErrorStore),
  );
  const [lastHandledError, setLastHandledError] =
    useState<typeof lastError>(null);

  const navigate = useNavigate();

  if (lastError !== lastHandledError) {
    setLastHandledError(lastError);
    navigate(APP_END_POINT.login);
    return;
  }

  return <>{children}</>;
}
