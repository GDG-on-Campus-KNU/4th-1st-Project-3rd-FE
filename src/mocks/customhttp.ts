import { http } from 'msw';

import sleep from './utils/sleep';

let nowSleepTime: number = 0;

export function changeNowNetworkType(ms: number) {
  nowSleepTime = ms;
}

function NetworkSpeedWrapper<F>(resolver: F) {
  if (typeof resolver !== 'function') return () => {};
  // @ts-expect-error function이 아닌 경우는 없음
  return async (...args: Parameters<F>) => {
    if (nowSleepTime > 10000) throw new Error();

    const result = resolver(...args);
    await sleep(nowSleepTime);
    return result;
  };
}

const customHttp: typeof http = (
  Object.keys(http) as (keyof typeof http)[]
).reduce(
  (obj, key) => {
    obj[key] = (path, resolve, option) =>
      http[key](path, NetworkSpeedWrapper(resolve), option);
    return obj;
  },
  {} as { [R in keyof typeof http]: (typeof http)[R] },
);

export default customHttp;
