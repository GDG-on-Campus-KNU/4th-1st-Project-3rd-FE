import NetworkError from './errors/NetworkError';
import AuthError from './errors/auth/AuthError';
import AuthErrorStore from './errors/auth/AuthErrorStore';

export const authErrorStore = new AuthErrorStore();

export default function handleNetworkError(error: NetworkError) {
  if (error instanceof AuthError) {
    authErrorStore.setLastError(error);
    throw error;
  }

  throw error;
}
