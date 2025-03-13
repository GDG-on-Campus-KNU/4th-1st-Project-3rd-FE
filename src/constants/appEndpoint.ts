const APP_END_POINT = {
  main: '/',
  chatMbtiWithSegment: '/chat/mbti/:mbti',
  chatMbti: (mbti: Mbti) => '/chat/mbti/' + mbti.toLowerCase(),
};

export default APP_END_POINT;
