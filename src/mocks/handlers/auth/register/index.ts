import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

import { loginInMSW } from '../auth';
import { checkHasMailSession } from '../email';

const POST_REGISTER = http.post(HTTP_API_END_POINT.register, () => {
  if (!checkHasMailSession())
    return new HttpResponse(JSON.stringify({ errorCode: 'R001' }), {
      status: 401,
    });
  loginInMSW();
  return new HttpResponse(JSON.stringify({}), {
    status: 200,
  });
});

export default [POST_REGISTER];
