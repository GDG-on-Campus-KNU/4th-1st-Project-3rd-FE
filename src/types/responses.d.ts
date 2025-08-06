// base

interface BaseResponse<T> {
  data: T;
}

type ResponseInMocking<T = MessageResponse> = BaseResponse<T> & {
  status?: StatusCode;
};

interface MessageResponse {
  content: string;
  isUserChat: boolean;
  time: string;
}

type ChatMbtiResponseBody = MessageResponse[];

type ChatMbtiOpenGetResponseBody = {
  closedMbti: number;
};

type ChatMbtiRecentResponseBody = ChattingPreview[];

type ChatMbtiResponse = BaseResponse<ChatMbtiResponseBody>;
type ChatMbtiRecentResponse = BaseResponse<ChatMbtiRecentResponseBody>;
type ChatMbtiOpenGetResponse = BaseResponse<ChatMbtiOpenGetResponseBody>;

type CheckIsAuthedBody = { isAuthed: boolean };
type CheckIsAuthedResponse = BaseResponse<CheckIsAuthedBody>;

type GetEmailResponseBody = string;

type GetEmailResponse = BaseResponse<GetEmailResponseBody>;

type AnalysisFaceResponseBody = {
  mbti: Mbti;
};
type AnalysisFaceResponse = BaseResponse<AnalysisFaceResponseBody>;

type EmptyResponse = Record<string, never>;
