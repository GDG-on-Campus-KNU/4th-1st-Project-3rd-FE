import { HttpResponse } from 'msw';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { MBTI_LIST } from '@_/constants/mbti';
import customHttp from '@_/mocks/customhttp';
import sleep from '@_/mocks/utils/sleep';

export const POST = customHttp.post(
  HTTP_API_END_POINT.analysisFace,
  async () => {
    await sleep(3000);
    return HttpResponse.json<AnalysisFaceResponse>({
      data: {
        mbti: MBTI_LIST.slice().sort(() => Math.random() - 0.5)[0],
      },
    });
  },
);

export default [POST];
