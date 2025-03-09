import { ReactNode } from 'react';

import getDateByISO8601 from '@_/utils/getDateByISO8601';

import styles from './ChatBubble.module.css';

export interface ChatBubbleProps {
  content: ReactNode;
  isUserChat: boolean;
  timeISO: string;
}
const getTimeStrByDate = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 한 자리 숫자 보정
  const period = hours < 12 ? 'AM' : 'PM';

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return `${hours}:${minutes} ${period}`;
};
export default function ChatBubble(props: ChatBubbleProps) {
  const { content, isUserChat, timeISO } = props;
  const date = getDateByISO8601(timeISO);
  const timeStr = getTimeStrByDate(date);
  return (
    <div
      className={[
        styles['chat-bubble-container'],
        styles[isUserChat ? 'mine' : 'others'],
      ].join(' ')}
    >
      <span className={styles['time-span']}>{timeStr}</span>
      <div className={styles['chat-bubble']}>{content}</div>
    </div>
  );
}
