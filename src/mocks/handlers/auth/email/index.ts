import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

let isMailValid = false;
let hasMailSession = false;
export const checkHasMailSession = () => hasMailSession;
const POST_SEND_EMAIL = http.post(HTTP_API_END_POINT.sendEmailCode, () => {
  return new HttpResponse(JSON.stringify({}), {
    status: 200,
  });
});

const POST_VERIFY_MAIL = http.post(HTTP_API_END_POINT.verifyEmail, () => {
  if (!isMailValid)
    return new HttpResponse(JSON.stringify({ errorCode: 'E001' }), {
      status: 401,
    });
  hasMailSession = true;
  return new HttpResponse(JSON.stringify({}), {
    status: 200,
  });
});

const GET_CHECK_VERIFY_SERVER_OPEN = http.get(
  HTTP_API_END_POINT.mockCheckVerifyEmail,
  () => {
    return new HttpResponse(
      JSON.stringify({
        isMailValid,
      }),
      {
        status: 200,
      },
    );
  },
);

const POST_CHECK_VERIFY_SERVER = http.post(
  HTTP_API_END_POINT.mockCheckVerifyEmail,
  () => {
    isMailValid = !isMailValid;

    return new HttpResponse(
      JSON.stringify({
        isMailValid,
      }),
      {
        status: 200,
      },
    );
  },
);

export default [
  POST_SEND_EMAIL,
  POST_VERIFY_MAIL,
  GET_CHECK_VERIFY_SERVER_OPEN,
  POST_CHECK_VERIFY_SERVER,
];
