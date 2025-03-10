import { Fragment, useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch, postFetch } from '@_/fetches/BaseFetches';
import checkIsSameDay from '@_/utils/checkIsSameDay';
import getDateByISO8601 from '@_/utils/getDateByISO8601';

import styles from './ChatMbtiPage.module.css';
import ChatBubble from './_component/ChatBubble/ChatBubble';
import ChatDayDiv from './_component/ChatDayDiv/ChatDayDiv';
import ChatHeader from './_component/ChatHeader/ChatHeader';
import MessageTextArea from './_component/MessageTextArea/MessageTextArea';

export default function AppChatMbtiPage() {
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [searchParams] = useSearchParams();
  const mbti: Mbti =
    (searchParams.get('mbti')?.toUpperCase() as Mbti) || 'ISFJ';

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
  }, [messages, mbti]);
  const handleSubmit = useCallback(
    async (value: string) => {
      postFetch<ChatMbtiRequestBody>(HTTP_API_END_POINT.mbtiChatPost(mbti), {
        body: { content: value },
      });
    },
    [mbti],
  );
  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     handleSubmit('123123');
  //   }
  // }, []);
  return (
    <>
      <ChatHeader onMenuClick={() => {}} title={mbti} />
      <div className={styles['under-header']}>
        <div className={styles['content-box']}>
          {messages.map((message, index) => {
            const lastMessage = messages[index - 1];
            const lastDate = lastMessage
              ? getDateByISO8601(lastMessage.time)
              : null;
            const nowDate = getDateByISO8601(message.time);
            const isSameDay = lastDate && checkIsSameDay(nowDate, lastDate);
            return (
              <Fragment key={message.order}>
                {!isSameDay && <ChatDayDiv timeISO={message.time} />}
                <ChatBubble
                  content={message.content}
                  isUserChat={message.isUserChat}
                  timeISO={message.time}
                />
              </Fragment>
            );
          })}
        </div>
        <div className={styles['text-area']}>
          <MessageTextArea onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
