import { useCallback, useState } from 'react';

import SolidArrowSVG from '@_/components/common/svgs/SolidArrowSVG';

import styles from './MessageTextArea.module.css';

export interface MessageTextAreaProps {
  onSubmit: (str: string) => void;
  textLimit?: number;
}

const getStatus = (stringLength: number, textLimit: number) => {
  if (stringLength === 0) return 'empty-message';
  if (stringLength > textLimit) {
    return 'over-message';
  }
  return 'proper-message';
};

export default function MessageTextArea(props: MessageTextAreaProps) {
  const { onSubmit, textLimit = 120 } = props;
  const [value, setValue] = useState('');
  const valueLength = [...new Intl.Segmenter().segment(value)].length;
  const status = getStatus(valueLength, textLimit);
  const handleSubmit = async () => {
    try {
      await onSubmit(value);
      setValue('');
    } catch (_: unknown) {
      setValue(value);
    }
  };
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return (
    <div className={styles['message-text-area-container']}>
      <textarea
        className={styles['message-text-area']}
        name="message"
        id="message"
        value={value}
        placeholder="무엇이든 물어보세요"
        onChange={handleChange}
      />
      <div className={styles[status]}>
        <span
          className={styles['send-counter']}
        >{`${valueLength}/${textLimit}`}</span>
        <div className={styles['send-button']} onClick={handleSubmit}>
          <SolidArrowSVG direction="up" />
        </div>
      </div>
    </div>
  );
}
