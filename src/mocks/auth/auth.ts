import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import MOCK_CONSTANTS from '@_/constants/mock';

import getCookiesStr from '../utils/getCookiesStr';

let hasSession = true;

const LOGIN_POST = http.post(HTTP_API_END_POINT.login, ({ cookies }) => {
  if (hasSession) {
    return HttpResponse.json(
      { errorMessage: '이미 로그인되어 있음' },
      { status: 401 },
    );
  }
  hasSession = true;
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': getCookiesStr(cookies, {
        sets: [[MOCK_CONSTANTS.cookieAuthKey, MOCK_CONSTANTS.cookieAuthValue]],
      }),
    },
  });
});

const LOGOUT_POST = http.post(HTTP_API_END_POINT.login, ({ cookies }) => {
  if (hasSession) {
    return HttpResponse.json(
      { errorMessage: '로그인 되어있지 않음음' },
      { status: 401 },
    );
  }
  hasSession = false;
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': getCookiesStr(cookies, {
        deleteKeys: [MOCK_CONSTANTS.cookieAuthKey],
      }),
    },
  });
});

const CHECK_IS_AUTHED_GET = http.get(HTTP_API_END_POINT.checkIsAuthed, () => {
  return HttpResponse.json<CheckIsAuthedBody>(
    { isAuthed: hasSession },
    { status: 200 },
  );
});

export default [LOGIN_POST, LOGOUT_POST, CHECK_IS_AUTHED_GET];
