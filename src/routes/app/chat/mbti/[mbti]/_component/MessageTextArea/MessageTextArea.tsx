import { useCallback, useEffect, useRef, useState } from 'react';

import SolidArrowSVG from '@_/components/common/svgs/SolidArrowSVG';

import styles from './MessageTextArea.module.css';

export interface MessageTextAreaProps {
  onSubmit: (str: string) => void;
  textLimit?: number;
  maxTextAreaHeight?: number;
}

const getStatus = (stringLength: number, textLimit: number) => {
  if (stringLength === 0) return 'empty-message';
  if (stringLength > textLimit) {
    return 'over-message';
  }
  return 'proper-message';
};

export default function MessageTextArea(props: MessageTextAreaProps) {
  const { onSubmit, textLimit = 120, maxTextAreaHeight = Infinity } = props;
  const [value, setValue] = useState('');
  const valueLength = [...new Intl.Segmenter().segment(value)].length;
  const status = getStatus(valueLength, textLimit);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    const lastHeight = el.style.height;
    function resizeTextArea() {
      if (!el) return;
      const height = Math.min(el.scrollHeight, maxTextAreaHeight);
      el.style.height = height + 'px';
    }
    resizeTextArea();

    el.addEventListener('change', resizeTextArea);
    return () => {
      el.removeEventListener('change', resizeTextArea);
      el.style.height = lastHeight;
    };
  }, [maxTextAreaHeight]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueLength === 0 || valueLength >= maxTextAreaHeight) return;
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

      const el = textAreaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      const height = Math.min(el.scrollHeight, maxTextAreaHeight);
      el.style.height = height + 'px';
    },
    [maxTextAreaHeight],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['message-text-area-container']}
    >
      <textarea
        className={styles['text-area']}
        name="message"
        id="message"
        value={value}
        placeholder="무엇이든 물어보세요"
        onChange={handleChange}
        ref={textAreaRef}
      />
      <div className={[styles['send-container'], styles[status]].join(' ')}>
        <span
          className={styles['send-counter']}
        >{`${valueLength}/${textLimit}`}</span>
        <button className={styles['send-button']} type="submit">
          <SolidArrowSVG direction="up" />
        </button>
      </div>
    </form>
  );
}
