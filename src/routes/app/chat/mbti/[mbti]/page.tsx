import { Fragment, useEffect, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';

export default function AppChatMbtiPage() {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const mbti: Mbti = 'ENFJ';
  useEffect(() => {
    async function messageUpdate() {
      const { messageResponses } = await getFetch<ChatMbtiResponseBody>(
        HTTP_API_END_POINT.mbtiChatGet(mbti, messages.at(-1)?.order || 0),
      );

      setMessages((prev) =>
        messageResponses.length === 0 ? prev : [...prev, ...messageResponses],
      );
    }

    const timeoutId = setInterval(messageUpdate, 100);
    return () => clearInterval(timeoutId);
  }, [messages]);
  return (
    <>
      {messages.map((c) => (
        <Fragment key={c.order}>
          {`[${c.isUserChat ? '유저 메세지' : '서버 메세지'} ${c.time}]:${c.content}`}
          <br />
        </Fragment>
      ))}
    </>
  );
}
