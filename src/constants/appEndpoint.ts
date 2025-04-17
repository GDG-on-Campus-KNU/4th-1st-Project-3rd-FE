const APP_END_POINT = {
  main: '/',
  login: '/login',
  chatMbtiWithSegment: '/chat/mbti/:mbti',
  chatMbti: (mbti: Mbti) => '/chat/mbti/' + mbti.toLowerCase(),
  register: '/register',
  registerSuccess: '/register/success',
  chattingList: '/chatting-list',
  chattingListAdd: '/chatting-list/add',
};

export default APP_END_POINT;
