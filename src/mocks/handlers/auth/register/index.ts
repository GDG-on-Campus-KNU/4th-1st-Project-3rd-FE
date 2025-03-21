import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

const POST_REGISTER = http.post(HTTP_API_END_POINT.register, () => {
  return new HttpResponse(JSON.stringify({}), {
    status: 200,
  });
});

export default [POST_REGISTER];
