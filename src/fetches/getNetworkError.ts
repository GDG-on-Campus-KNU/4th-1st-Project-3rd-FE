import NetworkError from './errors/NetworkError';
import AuthError from './errors/auth/AuthError';

export default function getNetworkError(response: Response) {
  if (response.status === 403) return new AuthError();
  return new NetworkError();
}
