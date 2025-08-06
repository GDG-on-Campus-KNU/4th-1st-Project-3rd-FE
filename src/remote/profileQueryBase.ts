import { queryOptions } from '@tanstack/react-query';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import QUERY_KEY_ROOT from '@_/constants/queryKeyRoot';
import { getFetch } from '@_/fetches/BaseFetches';

const profileQueryKeys = {
  all: () => [QUERY_KEY_ROOT.profile],
  email: () => [...profileQueryKeys.all(), 'email'],
};

const profileQueryBases = {
  email: () =>
    queryOptions({
      queryKey: profileQueryKeys.email(),
      queryFn: () =>
        getFetch<GetEmailResponseBody>(HTTP_API_END_POINT.getEmail),
    }),
} as const satisfies Record<
  Exclude<keyof typeof profileQueryKeys, 'all'>,
  () => void
>;

export default profileQueryBases;
