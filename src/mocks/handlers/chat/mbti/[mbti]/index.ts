import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

import httpAuthWrapper from '../../../auth/httpAuthWrapper';

const getOrder = (() => {
  let nowOrder = 1;
  return () => nowOrder++;
})();
// let statusCode: StatusCode = 200;
const mbtiChatMap: Map<Mbti, MessageResponse[]> = new Map();

const getMbtiByUrlStr = (urlStr: string) => {
  const url = new URL(urlStr);
  return url.pathname.split('/').at(-1) as Mbti;
};
const getChatList = (urlStr: string): MessageResponse[] => {
  const mbti = getMbtiByUrlStr(urlStr);
  const list = mbtiChatMap.get(mbti);
  if (!list) throw new Error();
  return list;
};

export const GET = http.get(
  HTTP_API_END_POINT.mbtiChatWildCard,
  httpAuthWrapper(({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const list = getChatList(request.url);
    const startOrder = Number(params.get('startOrder'));

    if (isNaN(startOrder))
      return HttpResponse.json(
        { errorMessage: 'startOrder가 올바르지 않음음' },
        { status: 400 },
      );
    const result = list.filter((msg) => msg.order > startOrder);

    return HttpResponse.json<ChatMbtiResponse>({
      data: { messageResponses: result },
    });
  }),
);

export const POST = http.post(
  HTTP_API_END_POINT.mbtiChatWildCard,
  httpAuthWrapper(async ({ request }) => {
    const { content } = (await request.json()) as ChatMbtiRequestBody;
    const list = getChatList(request.url);
    const timeStringRaw = new Date().toISOString();
    const dotIndex = timeStringRaw.indexOf('.');

    const timeString =
      dotIndex === -1 ? timeStringRaw : timeStringRaw.slice(0, dotIndex);

    list.push({
      content,
      isUserChat: true,
      order: getOrder(),
      time: timeString,
    });
    return HttpResponse.json();
  }),
);

export const MOCK_TEST_POST = http.post(
  HTTP_API_END_POINT.mockMbtiChatWildCard,

  async ({ request }) => {
    const { content } = (await request.json()) as ChatMbtiRequestBody;

    const list = getChatList(request.url);

    const timeStringRaw = new Date().toISOString();
    const dotIndex = timeStringRaw.indexOf('.');

    const timeString =
      dotIndex === -1 ? timeStringRaw : timeStringRaw.slice(0, dotIndex);

    list.push({
      content,
      isUserChat: false,
      order: getOrder(),
      time: timeString,
    });
    return HttpResponse.json({});
  },
);

export default [GET, POST, MOCK_TEST_POST];
