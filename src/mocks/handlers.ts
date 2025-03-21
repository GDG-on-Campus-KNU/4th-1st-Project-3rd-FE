import { RequestHandler } from 'node_modules/msw/lib/core/handlers/RequestHandler';
import { WebSocketHandler } from 'node_modules/msw/lib/core/handlers/WebSocketHandler';

import auth from '@_/mocks/handlers/auth/auth';
import email from '@_/mocks/handlers/auth/email';
import chatMbti from '@_/mocks/handlers/chat/mbti/[mbti]';

export const handlers: Array<RequestHandler | WebSocketHandler> = [
  ...chatMbti,
  ...auth,
  ...email,
];
