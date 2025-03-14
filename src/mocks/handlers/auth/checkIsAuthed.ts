import MOCK_CONSTANTS from '@_/constants/mock';

export default function checkIsAuthed(cookies: Record<string, string>) {
  return (
    cookies[MOCK_CONSTANTS.cookieAuthKey] === MOCK_CONSTANTS.cookieAuthValue
  );
}
