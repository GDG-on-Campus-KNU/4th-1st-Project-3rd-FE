// base

interface BaseResponse<T> {
  data: T;
}

type ResponseInMocking<T = MessageResponse> = BaseResponse<T> & {
  status?: StatusCode;
};

// response
type MessageResponse = { message: string };
