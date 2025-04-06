import { HttpResponse, http } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';

import httpAuthWrapper from '../../../auth/httpAuthWrapper';

const getOrder = (() => {
  let nowOrder = 1;
  return () => nowOrder++;
})();
const list: MessageResponse[] = [];
// let statusCode: StatusCode = 200;

export const GET = http.get(
  HTTP_API_END_POINT.mbtiChatWildCard,
  httpAuthWrapper(({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
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
