import { HttpResponse, HttpResponseResolver } from 'msw';

import { checkIsAuthed } from './auth';

const getUnauthedResponse = () =>
  HttpResponse.json<EmptyResponse>({}, { status: 403 });

export default function httpAuthWrapper(resolver: HttpResponseResolver) {
  return (...args: Parameters<HttpResponseResolver>) => {
    if (!checkIsAuthed()) return getUnauthedResponse();
    return resolver(...args);
  };
}
