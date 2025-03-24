interface ChatMbtiRequestBody {
  content: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface verifyEmailRequestBody {
  email: string;
  code: number;
}
