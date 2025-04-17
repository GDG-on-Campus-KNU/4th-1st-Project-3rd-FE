import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getFetch, postFetch } from '@_/fetches/BaseFetches';

import ChatBubble from './_component/ChatBubble/ChatBubble';
import ChatDayDiv from './_component/ChatDayDiv/ChatDayDiv';
import ChatHeader from './_component/ChatHeader/ChatHeader';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import MessageTextArea from './_component/MessageTextArea/MessageTextArea';
import checkIsSameDay from '@_/utils/checkIsSameDay';
import getDateByISO8601 from '@_/utils/getDateByISO8601';
import styles from './ChatMbtiPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function AppChatMbtiPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const mbti: Mbti =
    (window.location.pathname.split('/').at(-1)?.toUpperCase() as Mbti) ||
    'ISFJ';
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const messageTextAreaRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);

  const handleValueChange = useCallback(() => {
    if (!contentRef.current) return;
    if (!headerRef.current) return;
    if (!messageTextAreaRef.current) return;
    contentRef.current.style.minHeight = `calc(100dvh - ${headerRef.current.clientHeight}px - ${messageTextAreaRef.current.clientHeight}px )`;
  }, []);

  useLayoutEffect(() => {
    handleValueChange();
  }, [handleValueChange]);

  useEffect(() => {
    let isFetching = false;
    async function messageUpdate() {
      if (isFetching) return;
      isFetching = true;
      try {
        const messageResponses = await getFetch<ChatMbtiResponseBody>(
          HTTP_API_END_POINT.mbtiChatGet(mbti, messages.at(-1)?.order || 0),
        );

        setMessages((prev) =>
          messageResponses.length === 0 ? prev : [...prev, ...messageResponses],
        );
      } finally {
        isFetching = false;
      }
    }

    const timeoutId = setInterval(messageUpdate, 100);
    return () => clearInterval(timeoutId);
  }, [messages, mbti]);

  useLayoutEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit = useCallback(
    async (value: string) => {
      setSendingMessage(value);
      postFetch<ChatMbtiRequestBody>(HTTP_API_END_POINT.mbtiChatPost(mbti), {
        body: { content: value },
      })
        .catch(() => alert('메세지 발신에 실패하였습니다..'))
        .finally(() => setSendingMessage(null));
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
      <ChatHeader
        mbti={mbti}
        onMenuClick={() => navigate(-1)}
        ref={headerRef}
      />
      <div className={styles['under-header']}>
        <div className={styles['content-box']} ref={contentRef}>
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
          {sendingMessage && (
            <ChatBubble content={sendingMessage} isUserChat={true} />
          )}
          <div ref={endRef} />
        </div>
        <div className={styles['text-area']} ref={messageTextAreaRef}>
          <MessageTextArea
            onSubmit={handleSubmit}
            onValueChange={handleValueChange}
            maxTextAreaHeight={70}
            canSend={!sendingMessage && !messages.at(-1)?.isUserChat}
          />
        </div>
      </div>
    </>
  );
}
