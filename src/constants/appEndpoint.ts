const APP_END_POINT = {
  main: '/',
  login: '/login',
  chatMbtiWithSegment: '/chat/mbti/:mbti',
  chatMbti: (mbti: Mbti) => '/chat/mbti/' + mbti.toLowerCase(),
  register: '/register',
};

export default APP_END_POINT;
