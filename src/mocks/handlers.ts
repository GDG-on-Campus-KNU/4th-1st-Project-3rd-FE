import { RequestHandler } from 'node_modules/msw/lib/core/handlers/RequestHandler';
import { WebSocketHandler } from 'node_modules/msw/lib/core/handlers/WebSocketHandler';

import test from '@_/mocks/handlers/test/http';
import websocket from '@_/mocks/handlers/test/websocket';

export const handlers: Array<RequestHandler | WebSocketHandler> = [
  ...test,
  ...websocket,
];
