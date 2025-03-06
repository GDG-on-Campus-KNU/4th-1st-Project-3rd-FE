const WEBSOCKET_PURE_API_END_POINT = {
  testWebsocket: '/test/websocket',
} as const;

const WEBSOCKET_API_END_POINT = (
  Object.keys(
    WEBSOCKET_PURE_API_END_POINT,
  ) as (keyof typeof WEBSOCKET_PURE_API_END_POINT)[]
).reduce(
  (obj, key) => {
    obj[key] =
      import.meta.env.VITE_WEB_SOCKET_URL + WEBSOCKET_PURE_API_END_POINT[key];
    return obj;
  },
  {} as { -readonly [K in keyof typeof WEBSOCKET_PURE_API_END_POINT]: string },
);

export default WEBSOCKET_API_END_POINT;
