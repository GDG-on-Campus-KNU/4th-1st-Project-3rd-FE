import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { HttpResponse } from 'msw';
import { MBTI_LIST } from '@_/constants/mbti';
import customHttp from '@_/mocks/customhttp';
import getDateByISO8601 from '@_/utils/getDateByISO8601';
import getMbtiBit from '@_/utils/getMBTIBit';
import httpAuthWrapper from '../../../auth/httpAuthWrapper';

const getOrder = (() => {
  let nowOrder = 1;
  return () => nowOrder++;
})();
// let statusCode: StatusCode = 200;
const mbtiChatMap: Map<Mbti, (MessageResponse & { isViewed: boolean })[]> =
  new Map();
mbtiChatMap.set('INFP', []);
mbtiChatMap.set('INTP', []);
mbtiChatMap.set('ENFP', []);
mbtiChatMap.set('ENTP', []);
mbtiChatMap.set('ENFJ', []);
mbtiChatMap.set('ENTJ', []);
mbtiChatMap.set('ISFP', []);
mbtiChatMap.set('ESTP', []);
mbtiChatMap.set('ESTJ', []);
mbtiChatMap.set('ISFJ', []);
mbtiChatMap.set('ISTP', []);
mbtiChatMap.set('ISTJ', []);
mbtiChatMap.set('ESFP', []);
mbtiChatMap.set('ESFJ', []);

const getMbtiByUrlStr = (urlStr: string) => {
  const url = new URL(urlStr);
  return url.pathname.split('/').at(-1)?.toUpperCase() as Mbti;
};
const getChatList = (
  urlStr: string,
): (MessageResponse & { isViewed: boolean })[] => {
  const mbti = getMbtiByUrlStr(urlStr);
  const list = mbtiChatMap.get(mbti);
  if (!list) throw new Error();
  return list;
};

export const GET = customHttp.get(
  HTTP_API_END_POINT.mbtiChatWildCard,
  httpAuthWrapper(({ request }) => {
    if (request.url.startsWith(HTTP_API_END_POINT.recentMbtiChat)) {
      return recentGet();
    }
    if (request.url.startsWith(HTTP_API_END_POINT.mbtiChatOpenGet)) {
      return openGet();
    }
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
    result.forEach((msg) => {
      msg.isViewed = true;
    });
    return HttpResponse.json<ChatMbtiResponse>({
      data: { messageResponses: result },
    });
  }),
);

const recentGet = () => {
  const list = [...mbtiChatMap]
    .sort(([aMbti, aMessages], [bMbti, bMessages]) => {
      const aLastISO = aMessages.at(-1)?.time;
      const bLastISO = bMessages.at(-1)?.time;
      if (!aLastISO && !bLastISO) return aMbti < bMbti ? -1 : 1;
      if (!aLastISO) return 1;
      if (!bLastISO) return -1;
      const aDate = getDateByISO8601(aLastISO);
      const bDate = getDateByISO8601(bLastISO);
      return aDate <= bDate ? -1 : 1;
    })
    .map(([mbti, messages]) => ({
      mbti,
      lastMessage: messages.at(-1)?.content || null,
      isViewed: messages.at(-1)?.isViewed || true,
    }));
  return HttpResponse.json<ChatMbtiRecentResponse>({
    data: {
      list,
    },
  });
};

const openGet = () => {
  const resultBit = MBTI_LIST.filter((mbti) => !mbtiChatMap.has(mbti)).reduce(
    (bit, mbti) => bit | getMbtiBit(mbti),
    0,
  );

  return HttpResponse.json<ChatMbtiOpenGetResponse>({
    data: { closedMbti: resultBit },
  });
};

export const POST = customHttp.post(
  import.meta.env.VITE_API_BASE_URL + '/chat/mbti/*',
  httpAuthWrapper(async ({ request }) => {
    const param = request.url.split('/').at(-1);
    if (param === 'open')
      return handlePostOpen(
        ((await request.json()) as ChatMbtiOpenPostRequestBody).mbti,
      );

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
      isViewed: false,
    });
    return HttpResponse.json();
  }),
);

const handlePostOpen = (mbti: Mbti) => {
  if (mbtiChatMap.has(mbti)) throw new Error();
  mbtiChatMap.set(mbti, []);
  return HttpResponse.json({});
};

const DELETE = customHttp.delete(
  import.meta.env.VITE_API_BASE_URL + '/chat/mbti/*',
  ({ request }) => {
    const parsedUrl = request.url
      .replace(import.meta.env.VITE_API_BASE_URL + '/chat/mbti/', '')
      .split('/');
    const [mbti, ...restPathArr] = parsedUrl;
    const path = restPathArr.join('/');
    console.log(mbti, path);
    if (path === 'init') return handleDeleteInit(mbti.toUpperCase() as Mbti);
    if (path === 'close') return handleDeleteClose(mbti.toUpperCase() as Mbti);
    throw new Error();
  },
);

const handleDeleteClose = (mbti: Mbti) => {
  if (!mbtiChatMap.has(mbti)) throw new Error();
  mbtiChatMap.delete(mbti);
  return HttpResponse.json({});
};

const handleDeleteInit = (mbti: Mbti) => {
  if (!mbtiChatMap.has(mbti)) throw new Error();
  mbtiChatMap.set(mbti, []);
  return HttpResponse.json({});
};

export const MOCK_TEST_POST = customHttp.post(
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
      isViewed: false,
    });
    return HttpResponse.json({});
  },
);

export default [GET, POST, DELETE, MOCK_TEST_POST];
