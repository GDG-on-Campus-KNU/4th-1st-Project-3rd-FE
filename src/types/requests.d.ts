interface ChatMbtiRequestBody {
  content: string;
}

interface ChatMbtiOpenPostRequestBody {
  mbti: Mbti;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface verifyEmailRequestBody {
  email: string;
  code: string;
}

interface RegisterRequestBody {
  email: string;
  password: string;
  mbti: Mbti;
}
