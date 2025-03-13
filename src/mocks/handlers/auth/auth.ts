import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import MOCK_CONSTANTS from '@_/constants/mock';

import getCookiesStr from '../../utils/getCookiesStr';
import checkIsAuthed from './checkIsAuthed';

const LOGIN_POST = http.post(HTTP_API_END_POINT.login, ({ cookies }) => {
  if (checkIsAuthed(cookies)) {
    return HttpResponse.json(
      { errorMessage: '이미 로그인되어 있음' },
      { status: 401 },
    );
  }
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': getCookiesStr(cookies, {
        sets: [[MOCK_CONSTANTS.cookieAuthKey, MOCK_CONSTANTS.cookieAuthValue]],
      }),
    },
    status: 200,
  });
});

const LOGOUT_POST = http.post(HTTP_API_END_POINT.logout, ({ cookies }) => {
  if (!checkIsAuthed(cookies)) {
    return HttpResponse.json(
      { errorMessage: '로그인 되어있지 않음음' },
      { status: 401 },
    );
  }
  return new HttpResponse(null, {
    headers: {
      'Set-Cookie': getCookiesStr(cookies, {
        deleteKeys: [MOCK_CONSTANTS.cookieAuthKey],
      }),
    },
  });
});

const CHECK_IS_AUTHED_GET = http.get(
  HTTP_API_END_POINT.checkIsAuthed,
  ({ cookies }) => {
    return HttpResponse.json<BaseResponse<CheckIsAuthedBody>>(
      {
        data: {
          isAuthed:
            cookies[MOCK_CONSTANTS.cookieAuthKey] ===
            MOCK_CONSTANTS.cookieAuthValue,
        },
      },
      { status: 200 },
    );
  },
);

export default [LOGIN_POST, LOGOUT_POST, CHECK_IS_AUTHED_GET];
