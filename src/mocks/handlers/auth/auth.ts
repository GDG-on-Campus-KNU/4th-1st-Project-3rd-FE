import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

let isAuthed = false;
export const checkIsAuthed = () => isAuthed === true;
const LOGIN_POST = http.post(HTTP_API_END_POINT.login, () => {
  if (checkIsAuthed()) {
    return HttpResponse.json(
      { errorMessage: '이미 로그인되어 있음' },
      { status: 401 },
    );
  }
  return new HttpResponse(null, {
    status: 200,
  });
});

const LOGOUT_POST = http.post(HTTP_API_END_POINT.logout, () => {
  if (!isAuthed) {
    return HttpResponse.json(
      { errorMessage: '로그인 되어있지 않음음' },
      { status: 401 },
    );
  }
  isAuthed = false;
  return new HttpResponse(null);
});

const CHECK_IS_AUTHED_GET = http.get(
  HTTP_API_END_POINT.checkIsAuthed,
  ({ request }) => {
    return HttpResponse.json(
      {
        data: {
          isAuthed: isAuthed,
        },
      },
      { status: 200, headers: request.headers },
    );
  },
);

export default [LOGIN_POST, LOGOUT_POST, CHECK_IS_AUTHED_GET];
