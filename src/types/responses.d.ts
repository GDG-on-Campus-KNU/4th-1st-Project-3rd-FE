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

type ChatMbtiOpenGetResponseBody = {
  closedMbti: number;
};

type ChatMbtiRecentResponseBody = {
  list: ChattingPreview[];
};

type ChatMbtiResponse = BaseResponse<ChatMbtiResponseBody>;
type ChatMbtiRecentResponse = BaseResponse<ChatMbtiRecentResponseBody>;
type ChatMbtiOpenGetResponse = BaseResponse<ChatMbtiOpenGetResponseBody>;

type CheckIsAuthedBody = { isAuthed: boolean };
type CheckIsAuthedResponse = BaseResponse<CheckIsAuthedBody>;

type EmptyResponse = Record<string, never>;
