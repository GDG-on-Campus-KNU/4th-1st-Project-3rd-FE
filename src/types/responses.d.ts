// base

interface BaseResponse<T> {
  data: T;
}

type ResponseInMocking<T = MessageResponse> = BaseResponse<T> & {
  status?: StatusCode;
};

interface MessageResponse {
  content: string;
  order: number;
  isUserChat: boolean;
  time: string;
}

type ChatMbtiResponseBody = {
  messageResponses: MessageResponse[];
};
type ChatMbtiResponse = BaseResponse<ChatMbtiResponseBody>;
