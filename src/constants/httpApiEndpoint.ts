const HTTP_PURE_API_END_POINT = {
  mockTestHttp: '/mock/test/http',
  testHttp: '/test/http',

  mbtiChat: '/chat/mbti',
  mockMbtiChat: '/mock/chat/mbti',

  mockTestWebsocket: '/mock/test/websocket',
} as const;

// {test:import.meta.env.VITE_API_BASE_URL + '/test',...}
const HTTP_API_END_POINT = (
  Object.keys(
    HTTP_PURE_API_END_POINT,
  ) as (keyof typeof HTTP_PURE_API_END_POINT)[]
).reduce(
  (obj, key) => {
    obj[key] = import.meta.env.VITE_API_BASE_URL + HTTP_PURE_API_END_POINT[key];
    return obj;
  },
  {} as { -readonly [K in keyof typeof HTTP_PURE_API_END_POINT]: string },
);

export default HTTP_API_END_POINT;
