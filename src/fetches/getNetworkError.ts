import NetworkError from './errors/NetworkError';
import AuthError from './errors/auth/AuthError';
import UnexpectedNetworkError from './errors/unexpectedNetwork/UnexpectedNetworkError';

export default async function getNetworkError(response: Response) {
  if (response.status === 403) return new AuthError({ code: 'auth' });
  const { title: code } = (await response.json()) as {
    title: string | undefined;
  };
  if (code === undefined) return new UnexpectedNetworkError();
  return new NetworkError({ code });
}
