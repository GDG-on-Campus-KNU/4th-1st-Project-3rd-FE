import getNetworkError from './getNetworkError';
import handleNetworkError from './handleNetworkError';

type EmptyBodyMethod = 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS';
type CanHasBodyMethod = 'POST' | 'PUT' | 'PATCH';

// body가 있으면 안되는 메서드에서는 body를 제한
interface EmptyBodyRequestInit extends RequestInit {
  method: EmptyBodyMethod;
  body?: never;
}
interface HasBodyRequestInit<BodyType> extends Omit<RequestInit, 'body'> {
  method?: CanHasBodyMethod;
  body: BodyType;
}

type CustomRequestInit<BodyType = unknown> =
  | EmptyBodyRequestInit
  | HasBodyRequestInit<BodyType>;

function isEmptyBodyRequestInit(
  customRequestInit: CustomRequestInit,
): customRequestInit is EmptyBodyRequestInit {
  return !!(
    customRequestInit.method &&
    EMPTY_BODY_METHOD_LIST.includes(customRequestInit.method)
  );
}
const EMPTY_BODY_METHOD_LIST = ['GET', 'HEAD', 'DELETE', 'OPTIONS'];

async function baseFetch(
  url: string,
  option: CustomRequestInit,
): Promise<Response> {
  const { body, ...restOption } = option;
  const optionResult: RequestInit = restOption;
  if (!isEmptyBodyRequestInit(option) && body) {
    optionResult.body = JSON.stringify(body);
  }
  return await fetch(url, optionResult);
}

async function normalizedFetch<ResponseType, BodyType = unknown>(
  url: string,
  option: CustomRequestInit<BodyType>,
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
  option: Omit<EmptyBodyRequestInit, 'method'> = { body: undefined },
) {
  return normalizedFetch<ResponseType>(url, { ...option, method: 'GET' });
}

export async function deleteFetch<ResponseType>(
  url: string,
  option: Omit<EmptyBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<ResponseType>(url, { ...option, method: 'DELETE' });
}

export async function postFetch<BodyType, ResponseType = EmptyResponse>(
  url: string,
  option: Omit<HasBodyRequestInit<BodyType>, 'method'> = {
    body: undefined as BodyType,
  },
) {
  return normalizedFetch<ResponseType, BodyType>(url, {
    ...option,
    method: 'POST',
  });
}

export async function patchFetch<BodyType, ResponseType = EmptyResponse>(
  url: string,
  option: Omit<HasBodyRequestInit<BodyType>, 'method'> = {
    body: undefined as BodyType,
  },
) {
  return normalizedFetch<ResponseType, BodyType>(url, {
    ...option,
    method: 'PATCH',
  });
}
