import { queryOptions } from '@tanstack/react-query';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import QUERY_KEY_ROOT from '@_/constants/queryKeyRoot';
import { getFetch } from '@_/fetches/BaseFetches';
import getTargetMbtiBit from '@_/utils/getTargetMbtiBit';

const mbtiChatQueryKeys = {
  all: () => [QUERY_KEY_ROOT.mbtiChat],
  closed: () => [...mbtiChatQueryKeys.all(), 'closed'],
};

const mbtiChatQueryBases = {
  all: () =>
    queryOptions({
      queryKey: mbtiChatQueryKeys.all(),
      queryFn: () =>
        getFetch<ChatMbtiRecentResponseBody>(HTTP_API_END_POINT.recentMbtiChat),
    }),
  closed: () =>
    queryOptions({
      queryKey: mbtiChatQueryKeys.closed(),
      queryFn: () =>
        getFetch<ChatMbtiOpenGetResponseBody>(
          HTTP_API_END_POINT.mbtiChatOpenGet,
        ),
      select: (data) => getTargetMbtiBit(data.closedMbti),
    }),
} as const satisfies Record<keyof typeof mbtiChatQueryKeys, () => void>;

export default mbtiChatQueryBases;
