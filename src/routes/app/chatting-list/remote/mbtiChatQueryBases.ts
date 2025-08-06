import { QueryClient, queryOptions } from '@tanstack/react-query';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import QUERY_KEY_ROOT from '@_/constants/queryKeyRoot';
import { getFetch } from '@_/fetches/BaseFetches';
import getTargetMbtiBit from '@_/utils/getTargetMbtiBit';

const mbtiChatQueryKeys = {
  all: () => [QUERY_KEY_ROOT.mbtiChat],
  closed: () => [...mbtiChatQueryKeys.all(), 'closed'],
  room: (mbti: Mbti) => [...mbtiChatQueryKeys.all(), mbti],
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
      select: (data) => getTargetMbtiBit(~data.closedMbti),
    }),
  room: (mbti: Mbti, queryClient: QueryClient) =>
    queryOptions({
      queryKey: mbtiChatQueryKeys.room(mbti),
      queryFn: async () => {
        const messages =
          queryClient.getQueryData<ChatMbtiResponseBody>(
            mbtiChatQueryKeys.room(mbti),
          ) || [];
        const offset = 9;
        const lastMs = +new Date(messages?.at(-1)?.time || 0);
        const nowMs = lastMs + 1000 + offset * 60 * 60 * 1000;
        const targetDate = new Date(nowMs);

        const messageResponses = await getFetch<ChatMbtiResponseBody>(
          HTTP_API_END_POINT.mbtiChatGet(
            mbti,
            targetDate.toISOString().slice(0, -5),
          ),
        );

        return [...messages, ...messageResponses];
      },
    }),
} as const satisfies Record<
  keyof typeof mbtiChatQueryKeys,
  (...args: never[]) => void
>;

export default mbtiChatQueryBases;
