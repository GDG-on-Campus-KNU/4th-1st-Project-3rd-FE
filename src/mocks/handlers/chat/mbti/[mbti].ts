import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

const getOrder = (() => {
  let nowOrder = 1;
  return () => nowOrder++;
})();
const list: MessageResponse[] = [];
// let statusCode: StatusCode = 200;

export const GET = http.get(
  HTTP_API_END_POINT.mbtiChatWildCard,
  ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const lastOrder = Number(params.get('lastOrder'));

    if (isNaN(lastOrder))
      return HttpResponse.json(
        { errorMessage: 'lastOrder가 올바르지 않음음' },
        { status: 400 },
      );
    const result = list.filter((msg) => msg.order > lastOrder);
    return HttpResponse.json<ChatMbtiResponse>(
      { data: { messageResponses: result } },
      { status: 200 },
    );
  },
);

export const POST = http.post(
  HTTP_API_END_POINT.mbtiChatWildCard,
  async ({ request }) => {
    const { content } = (await request.json()) as ChatMbtiRequestBody;

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
    return HttpResponse.json({});
  },
);

export const MOCK_TEST_POST = http.post(
  HTTP_API_END_POINT.mockMbtiChatWildCard,

  async ({ request }) => {
    const { content } = (await request.json()) as ChatMbtiRequestBody;

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
