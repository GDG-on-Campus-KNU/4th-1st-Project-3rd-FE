import getNetworkError from './getNetworkError';
import handleNetworkError from './handleNetworkError';

type EmptyBodyMethod = 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS';
type CanHasBodyMethod = 'POST' | 'PUT' | 'PATCH';

type Method = EmptyBodyMethod | CanHasBodyMethod;

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type EmptyBody = [never];
// body가 있으면 안되는 메서드에서는 body를 제한
interface EmptyBodyRequestInit extends Omit<RequestInit, 'body'> {
  method: Method;
  body?: never;
}

interface HasBodyRequestInit<BodyType extends JSONValue>
  extends Omit<RequestInit, 'body'> {
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

async function baseFetch(
  url: string,
  option: CustomRequestInit,
): Promise<Response> {
  if (isEmptyBodyRequestInit(option)) {
    return fetch(url, option);
  }
  const { body, ...restOption } = option;
  const optionResult: RequestInit = restOption;
  optionResult.body = JSON.stringify(body);
  return fetch(url, optionResult);
}

async function normalizedFetch<ResponseType>(
  url: string,
  option: CustomRequestInit,
): Promise<ResponseType> {
  const response = await baseFetch(url, option);
  if (!response.ok) {
    const networkError = getNetworkError(response);
    // 이 함수에서 에러 throw
    handleNetworkError(networkError);
  }

  const json = (await response.json()) as ResponseType extends EmptyResponse
    ? EmptyResponse
    : BaseResponse<ResponseType>;
  return json.data;
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

type CanHasBodyFetchArgs<BodyType extends JSONValue | EmptyBody> =
  BodyType extends EmptyBody
    ? [url: string, option?: Omit<EmptyBodyRequestInit, 'method'>]
    : [url: string, option: Omit<HasBodyRequestInit<BodyType>, 'method'>];

export async function postFetch<
  BodyType extends JSONValue | EmptyBody = EmptyBody,
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
  BodyType extends JSONValue | EmptyBody = EmptyBody,
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
