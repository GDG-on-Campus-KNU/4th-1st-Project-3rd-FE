import { RequestHandler } from 'node_modules/msw/lib/core/handlers/RequestHandler';
import { WebSocketHandler } from 'node_modules/msw/lib/core/handlers/WebSocketHandler';

import chatMbti from '@_/mocks/handlers/chat/mbti/[mbti]';

export const handlers: Array<RequestHandler | WebSocketHandler> = [...chatMbti];
