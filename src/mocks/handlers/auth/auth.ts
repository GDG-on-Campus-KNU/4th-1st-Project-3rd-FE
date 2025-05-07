import { HttpResponse } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import customHttp from '@_/mocks/customhttp';

let isAuthed = false;
export const checkIsAuthed = () => isAuthed === true;
export const loginInMSW = () => (isAuthed = true);
export const logoutInMSW = () => (isAuthed = false);
const LOGIN_POST = customHttp.post(HTTP_API_END_POINT.login, () => {
  if (checkIsAuthed()) {
    return HttpResponse.json(
      { errorMessage: '이미 로그인되어 있음' },
      { status: 401 },
    );
  }
  isAuthed = true;
  return new HttpResponse(JSON.stringify({}), {
    status: 200,
  });
});

const LOGOUT_POST = customHttp.post(HTTP_API_END_POINT.logout, () => {
  if (!isAuthed) {
    return HttpResponse.json(
      { errorMessage: '로그인 되어있지 않음음' },
      { status: 401 },
    );
  }
  isAuthed = false;
  return new HttpResponse(JSON.stringify({}));
});

const CHECK_IS_AUTHED_GET = customHttp.get(
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

const EMAIL_GET = customHttp.get(HTTP_API_END_POINT.getEmail, () =>
  HttpResponse.json<GetEmailResponse>(
    {
      data: 'test@test.com',
    },
    { status: 200 },
  ),
);

const CANCEL_POST = customHttp.post(HTTP_API_END_POINT.cancelAccount, () => {
  isAuthed = false;
  return new HttpResponse(JSON.stringify({}));
});

export default [
  LOGIN_POST,
  LOGOUT_POST,
  CHECK_IS_AUTHED_GET,
  EMAIL_GET,
  CANCEL_POST,
];
