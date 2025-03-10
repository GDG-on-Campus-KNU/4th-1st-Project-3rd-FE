import getDateByISO8601 from '@_/utils/getDateByISO8601';

import styles from './ChatDayDiv.module.css';

export interface ChatDayDivProps {
  timeISO: string;
}
const getTimeStrByDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '00');
  const day = date.getDay().toString().padStart(2, '00');
  return `${year}.${month}.${day}`;
};

export default function ChatDayDiv(props: ChatDayDivProps) {
  const { timeISO } = props;
  const date = getDateByISO8601(timeISO);
  const timeStr = getTimeStrByDate(date);
  return <div className={styles['chat-day-div']}>{timeStr}</div>;
}
