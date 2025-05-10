import NetworkError from './errors/NetworkError';
import AuthError from './errors/auth/AuthError';
import AuthErrorStore from './errors/auth/AuthErrorStore';

export const authErrorStore = new AuthErrorStore();

export default function manageNetworkError(error: NetworkError) {
  if (!error.shouldHandled) throw error;
  if (error instanceof AuthError) {
    authErrorStore.setLastError(error);
    throw error;
  }

  // TODO: shouldHandled인 에러는 throw 말고 다른 처리를 해주어야 함함
  throw error;
}
