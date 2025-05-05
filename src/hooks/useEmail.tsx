import { useEffect, useSyncExternalStore } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';

let email: string | null = null;

let emailListeners: (() => void) | undefined;

const notifyEmail = () => {
  emailListeners?.();
};
const subscribeEmail = (listener: () => void) => {
  if (!emailListeners) return () => {};
  emailListeners = listener;
  return () => {
    emailListeners = undefined;
  };
};

const updateEmail = async (nextEmail: string | null) => {
  email = nextEmail;
  notifyEmail();
};

const getEmail = () => {
  return email;
};

const fetchEmail = async () => {
  const { email } = await getFetch<GetEmailResponseBody>(
    HTTP_API_END_POINT.getEmail,
  ).catch(() => ({ email: null }));
  return email;
};

export default function useEmail() {
  const email = useSyncExternalStore(subscribeEmail, getEmail);

  useEffect(() => {
    if (email) return;
    const exec = async () => {
      const nextEmail = await fetchEmail();
      updateEmail(nextEmail);
    };

    exec();
  }, [email]);

  const resetEmail = () => updateEmail(null);

  return { email, resetEmail };
}
