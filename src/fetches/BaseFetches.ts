type EmptyBodyMethod = 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS';
type CanHasBodyMethod = 'POST' | 'PUT' | 'PATCH';

// body가 있으면 안되는 메서드에서는 body를 제한
interface EmptyBodyRequestInit extends RequestInit {
  method: EmptyBodyMethod;
  body?: never;
}
interface HasBodyRequestInit extends Omit<RequestInit, 'body'> {
  method?: CanHasBodyMethod;
  body?: object;
}

type CustomRequestInit = EmptyBodyRequestInit | HasBodyRequestInit;

function isEmptyBodyRequestInit(
  customRequestInit: CustomRequestInit,
): customRequestInit is EmptyBodyRequestInit {
  return !!(
    customRequestInit.method &&
    EMPTY_BODY_METHOD_LIST.includes(customRequestInit.method)
  );
}
const EMPTY_BODY_METHOD_LIST = ['GET', 'HEAD', 'DELETE', 'OPTIONS'];

async function baseFetch(url: string, option: CustomRequestInit) {
  const { body, ...restOption } = option;
  const optionResult: RequestInit = restOption;
  if (!isEmptyBodyRequestInit(option) && body) {
    optionResult.body = JSON.stringify(body);
  }
  return await fetch(url, optionResult);
}

async function normalizedFetch<T>(
  url: string,
  option: CustomRequestInit,
): Promise<T> {
  const response = await baseFetch(url, option);
  if (!response.ok) throw new Error('에러가 났어용~');

  const json = (await response.json()) as BaseResponse<T>;
  return json.data;
}

export async function getFetch<T>(
  url: string,
  option: Omit<EmptyBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<T>(url, { ...option, method: 'GET' });
}

export async function postFetch<T>(
  url: string,
  option: Omit<HasBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<T>(url, { ...option, method: 'POST' });
}

export async function deleteFetch<T>(
  url: string,
  option: Omit<EmptyBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<T>(url, { ...option, method: 'DELETE' });
}

export async function patchFetch<T>(
  url: string,
  option: Omit<HasBodyRequestInit, 'method'> = {},
) {
  return normalizedFetch<T>(url, { ...option, method: 'POST' });
}
