import { HttpResponse, HttpResponseResolver } from 'msw';

import checkIsAuthed from './checkIsAuthed';

const UNAUTHORIZED_RESPONSE = HttpResponse.json<EmptyResponse>(
  {},
  { status: 403 },
);

export default function httpAuthWrapper(resolver: HttpResponseResolver) {
  return (...args: Parameters<HttpResponseResolver>) => {
    const [options] = args;
    const { cookies } = options;
    if (!checkIsAuthed(cookies)) return UNAUTHORIZED_RESPONSE;
    return resolver(options);
  };
}
