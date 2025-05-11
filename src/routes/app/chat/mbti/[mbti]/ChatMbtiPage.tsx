import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import WaitingDot from '@_/components/common/WaitingDot/WaitingDot';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch, postFetch } from '@_/fetches/BaseFetches';
import checkIsSameDay from '@_/utils/checkIsSameDay';
import getDateByISO8601 from '@_/utils/getDateByISO8601';

import styles from './ChatMbtiPage.module.css';
import ChatBubble from './_component/ChatBubble/ChatBubble';
import ChatDayDiv from './_component/ChatDayDiv/ChatDayDiv';
import ChatHeader from './_component/ChatHeader/ChatHeader';
import ChatSkeleton from './_component/ChatSkeleton/ChatSkeleton';
import MessageTextArea from './_component/MessageTextArea/MessageTextArea';

type SendingPhase = 'posting' | 'wait-update' | 'complete';

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
  const [isShownWaitingDot, setIsShownWaitingDot] = useState(false);
  const [hasChattedThisMount, setHasChattedThisMount] = useState(false);
  const [sendingPhase, setSendingPhase] = useState<SendingPhase>('complete');
  const [isChatFirstLoading, setIsChatFirstLoading] = useState(true);

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
        const offset = 9;
        const lastMs = +new Date(messages.at(-1)?.time || 0);
        const nowMs = lastMs + 1000 + offset * 60 * 60 * 1000;
        const targetDate = new Date(nowMs);

        const messageResponses = await getFetch<ChatMbtiResponseBody>(
          HTTP_API_END_POINT.mbtiChatGet(
            mbti,
            targetDate.toISOString().slice(0, -5),
          ),
        );

        if (messageResponses.at(-1)?.isUserChat) {
          setSendingMessage(null);
          setSendingPhase('complete');
        }

        setMessages((prev) =>
          messageResponses.length === 0 ? prev : [...prev, ...messageResponses],
        );
      } finally {
        setIsChatFirstLoading(false);
        isFetching = false;
      }
    }

    const timeoutId = setInterval(messageUpdate, 100);
    return () => clearInterval(timeoutId);
  }, [messages, mbti]);

  useEffect(() => {
    const lastMessage = messages.at(-1);
    if (!lastMessage) return;

    if (lastMessage.isUserChat) {
      const id = setTimeout(
        () => setIsShownWaitingDot(true),
        hasChattedThisMount ? 600 : 0,
      );
      return () => clearTimeout(id);
    }

    setIsShownWaitingDot(false);
  }, [messages, hasChattedThisMount]);

  useLayoutEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages, isShownWaitingDot, sendingMessage]);

  const handleSubmit = useCallback(
    async (value: string) => {
      setSendingMessage(value);
      setSendingPhase('posting');
      postFetch<ChatMbtiRequestBody>(HTTP_API_END_POINT.mbtiChatPost(mbti), {
        body: { content: value },
      })
        .then(() =>
          setSendingPhase((prev) =>
            prev === 'complete' ? prev : 'wait-update',
          ),
        )
        .catch(() => {
          alert('메세지 발신에 실패하였습니다..');

          setSendingMessage(null);
          setSendingPhase('complete');
        })
        .finally(() => {
          setHasChattedThisMount(true);
        });
    },
    [mbti],
  );

  // useEffect(() => {
  //   for (let i = 0; i < 100; i++) {
  //     handleSubmit('123123');
  //   }
  // }, []);

  // TODO: POST가 바로 응답오면 이거 없앨 것,
  useLayoutEffect(() => {
    setSendingPhase('complete');
    setSendingMessage(null);
  }, [messages]);
  console.log(sendingPhase);

  return (
    <>
      <ChatHeader
        mbti={mbti}
        onMenuClick={() => navigate(APP_END_POINT.chattingList)}
        ref={headerRef}
      />
      <div className={styles['under-header']}>
        <div className={styles['content-box']} ref={contentRef}>
          {isChatFirstLoading && <ChatSkeleton />}
          {messages.map((message, index) => {
            const lastMessage = messages[index - 1];
            const lastDate = lastMessage
              ? getDateByISO8601(lastMessage.time)
              : null;
            const nowDate = getDateByISO8601(message.time);
            const isSameDay = lastDate && checkIsSameDay(nowDate, lastDate);
            return (
              <Fragment key={message.time + message.isUserChat}>
                {!isSameDay && <ChatDayDiv timeISO={message.time} />}
                <ChatBubble
                  content={message.content}
                  isUserChat={message.isUserChat}
                  timeISO={message.time}
                />
              </Fragment>
            );
          })}
          {sendingPhase !== 'complete' && (
            <>
              {!checkIsSameDay(
                getDateByISO8601(
                  messages.at(-1)?.time || '2001-05-17T00:00:00',
                ),
                new Date(),
              ) && <ChatDayDiv timeISO={new Date().toISOString()} />}
              <ChatBubble content={sendingMessage} isUserChat={true} />
            </>
          )}
          {isShownWaitingDot && messages.at(-1)?.isUserChat && (
            <ChatBubble content={<WaitingDot />} isUserChat={false} />
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
