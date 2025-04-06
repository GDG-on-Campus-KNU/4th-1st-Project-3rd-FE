const HTTP_PURE_STRING_API_END_POINT = {
  mbtiChatWildCard: '/chat/mbti/*',
  mbtiChatInitWildCard: '/chat/mbti/*/init',
  mbtiChatCloseWildCard: '/chat/mbti/*/close',
  mbtiChatOpenPost: '/chat/mbti/open',
  mbtiChatOpenGet: '/chat/mbti/open',
  recentMbtiChat: '/chat/mbti/recent',
  mockMbtiChatWildCard: '/mock/chat/mbti/*',
  checkIsAuthed: '/user/check-session',
  login: '/auth/login',
  logout: '/auth/logout',
  sendEmailCode: '/auth/email/code',
  verifyEmail: '/auth/email/code/verify',
  mockCheckVerifyEmail: '/mock/auth/email/code/verify',
  register: '/auth/register',
} as const;

const HTTP_PURE_FUNCTION_API_END_POINT = {
  mbtiChatGet: (mbti: Mbti | '*', startOrder: number) =>
    '/chat/mbti/' + mbti.toLowerCase() + '?' + 'startOrder=' + startOrder,
  mbtiChatPost: (mbti: Mbti | '*') => '/chat/mbti/' + mbti.toLowerCase(),
  mbtiChatInit: (mbti: Mbti | '*') =>
    '/chat/mbti/' + mbti.toLowerCase() + '/init',
  mbtiChatClose: (mbti: Mbti | '*') =>
    '/chat/mbti/' + mbti.toLowerCase() + '/close',
  mockMbtiChat: (mbti: Mbti | '*') => '/mock/chat/mbti/' + mbti.toLowerCase(),
} as const;

// {test:import.meta.env.VITE_API_BASE_URL + '/test',...}
const HTTP_STRING_API_END_POINT = (
  Object.keys(
    HTTP_PURE_STRING_API_END_POINT,
  ) as (keyof typeof HTTP_PURE_STRING_API_END_POINT)[]
).reduce(
  (obj, key) => {
    obj[key] =
      import.meta.env.VITE_API_BASE_URL + HTTP_PURE_STRING_API_END_POINT[key];
    return obj;
  },
  {} as {
    -readonly [K in keyof typeof HTTP_PURE_STRING_API_END_POINT]: string;
  },
);
const HTTP_FUNCTION_API_END_POINT = (
  Object.keys(
    HTTP_PURE_FUNCTION_API_END_POINT,
  ) as (keyof typeof HTTP_PURE_FUNCTION_API_END_POINT)[]
).reduce(
  (obj, key) => {
    const nowFn = HTTP_PURE_FUNCTION_API_END_POINT[key];
    obj[key] = (...args: Parameters<typeof nowFn>) =>
      import.meta.env.VITE_API_BASE_URL +
      nowFn(
        // @ts-expect-error 이 인자는 무조건 튜플형 인자임
        ...args,
      );
    return obj;
  },
  {} as {
    -readonly [K in keyof typeof HTTP_PURE_FUNCTION_API_END_POINT]: (
      ...args: Parameters<(typeof HTTP_PURE_FUNCTION_API_END_POINT)[K]>
    ) => string;
  },
);

const HTTP_API_END_POINT = {
  ...HTTP_STRING_API_END_POINT,
  ...HTTP_FUNCTION_API_END_POINT,
} as const;

export default HTTP_API_END_POINT;
