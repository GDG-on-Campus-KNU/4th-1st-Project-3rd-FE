const APP_END_POINT = {
  main: '/',
  chatMbtiWildCard: '/chat/mbti/*',
  chatMbti: (mbti: Mbti) => '/chat/mbti/' + mbti.toLowerCase(),
};

export default APP_END_POINT;
