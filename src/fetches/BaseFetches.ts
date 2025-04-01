import getNetworkError from './getNetworkError';
import handleNetworkError from './handleNetworkError';

type EmptyBodyMethod = 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS';
type CanHasBodyMethod = 'POST' | 'PUT' | 'PATCH';

type Method = EmptyBodyMethod | CanHasBodyMethod;

// TODO: object가 아닌 number|string|null 등으로 이루어진 객체타입으로 고쳐야 함(현재 mapped 타입으로 할 시 기본 객체 적용용 안됨)
// 기존 코드
// type JSONValue =
//   | string
//   | number
//   | boolean
//   | null
//   | JSONValue[]
//   | { [key: string | number]: JSONValue };

type JSONValue = object;

type ResponseErrorHandler = (response?: Response) => void;
interface CustomRequestInitBase extends RequestInit {
  handleResponseError?: ResponseErrorHandler;
}
// body가 있으면 안되는 메서드에서는 body를 제한
interface EmptyBodyRequestInit extends Omit<CustomRequestInitBase, 'body'> {
  method: Method;
  body?: never;
}

interface HasBodyRequestInit<BodyType extends JSONValue>
  extends Omit<CustomRequestInitBase, 'body'> {
  method: CanHasBodyMethod;
  body: BodyType;
}

type CustomRequestInit<BodyType extends JSONValue = JSONValue> =
  | EmptyBodyRequestInit
  | HasBodyRequestInit<BodyType>;

function isEmptyBodyRequestInit(
  customRequestInit: CustomRequestInit,
): customRequestInit is EmptyBodyRequestInit {
  return customRequestInit.body === undefined;
}

const defaultHeaders = { 'Content-Type': 'application/json' };
function getAddedDefaultHeader(option: RequestInit): RequestInit {
  const { headers, ...restOption } = option;
  if (!headers) return { ...restOption, headers: defaultHeaders };
  return { ...restOption, headers: { ...defaultHeaders, ...headers } };
}

async function baseFetch(
  url: string,
  option: CustomRequestInit,
): Promise<Response> {
  if (isEmptyBodyRequestInit(option)) {
    return fetch(url, getAddedDefaultHeader(option));
  }
  const { body, ...restOption } = option;
  const optionResult: RequestInit = restOption;
  optionResult.body = JSON.stringify(body);
  return fetch(url, getAddedDefaultHeader(optionResult));
}

const handleDefaultResponseError: ResponseErrorHandler = (
  response?: Response,
) => {
  if (!response) return;
  const networkError = getNetworkError(response);
  // 이 함수에서 에러 throw
  handleNetworkError(networkError);
};

async function normalizedFetch<ResponseType>(
  url: string,
  option: CustomRequestInit,
): Promise<ResponseType> {
  const response = await baseFetch(url, option);
  if (!response.ok) {
    if (option.handleResponseError) option.handleResponseError(response);
    handleDefaultResponseError(response);
  }

  try {
    const json = (await response.json()) as ResponseType extends EmptyResponse
      ? EmptyResponse
      : BaseResponse<ResponseType>;
    return json.data;
  } catch (_: unknown) {
    // TODO: 이거 response타입 안나오게 변경
    return {} as ResponseType;
  }
}

export async function getFetch<ResponseType>(
  url: string,
  option: Omit<EmptyBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<ResponseType>(url, { ...option, method: 'GET' });
}

export async function deleteFetch<ResponseType>(
  url: string,
  option: Omit<EmptyBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<ResponseType>(url, { ...option, method: 'DELETE' });
}

type CanHasBodyFetchArgs<BodyType extends JSONValue | undefined> =
  BodyType extends JSONValue
    ? [url: string, option: Omit<HasBodyRequestInit<BodyType>, 'method'>]
    : [url: string, option?: Omit<EmptyBodyRequestInit, 'method'>];

export async function postFetch<
  BodyType extends JSONValue | undefined = undefined,
  ResponseType = EmptyResponse,
>(...args: CanHasBodyFetchArgs<BodyType>) {
  const [url, options] = args;
  if (!options) {
    return normalizedFetch<ResponseType>(url, {
      method: 'POST',
    });
  }
  return normalizedFetch<ResponseType>(url, {
    ...options,
    method: 'POST',
  });
}

export async function patchFetch<
  BodyType extends JSONValue | undefined = undefined,
  ResponseType = EmptyResponse,
>(...args: CanHasBodyFetchArgs<BodyType>) {
  const [url, options] = args;
  if (!options) {
    return normalizedFetch<ResponseType>(url, {
      method: 'PATCH',
    });
  }
  return normalizedFetch<ResponseType>(url, {
    ...options,
    method: 'PATCH',
  });
}
