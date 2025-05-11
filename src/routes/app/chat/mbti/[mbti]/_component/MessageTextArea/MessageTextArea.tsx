import {
  HTMLProps,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import SolidArrowSVG from '@_/components/common/svgs/SolidArrowSVG';

import styles from './MessageTextArea.module.css';

export interface MessageTextAreaProps
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (str: string) => void;
  onValueChange?: (str?: string) => void;
  textLimit?: number;
  maxTextAreaHeight?: number;
  canSend?: boolean;
}

const getStatus = (stringLength: number, textLimit: number) => {
  if (stringLength === 0) return 'empty-message';
  if (stringLength > textLimit) {
    return 'over-message';
  }
  return 'proper-message';
};

const getSendStatus = (
  stringLength: number,
  textLimit: number,
  canSend: boolean,
) => {
  if (!canSend) return 'can-not-send';
  if (stringLength === 0) return 'can-not-send';
  if (stringLength > textLimit) {
    return 'can-not-send';
  }
  return 'can-send';
};

export default function MessageTextArea(props: MessageTextAreaProps) {
  const {
    onSubmit,
    onValueChange,
    textLimit = 120,
    maxTextAreaHeight = Infinity,
    className,
    style,
    canSend = true,
    ...restProps
  } = props;
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
    if (!canSend) return;
    if (valueLength === 0 || valueLength > textLimit) return;
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

      if (onValueChange) {
        onValueChange(value);
      }
    },
    [onValueChange, value],
  );

  const handleKeydown = useCallback(
    async (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!canSend) return;
        if (valueLength === 0 || valueLength > textLimit) return;
        try {
          await onSubmit(value);
          setValue('');
        } catch (_: unknown) {
          setValue(value);
        }
      }
    },
    [canSend, valueLength, textLimit, onSubmit, value],
  );

  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (el) {
      el.style.height = 'auto';
      const height = Math.min(el.scrollHeight, maxTextAreaHeight);
      el.style.height = height + 'px';
    }
  }, [value, maxTextAreaHeight]);
  return (
    <form
      onSubmit={handleSubmit}
      className={[styles['message-text-area-container'], className].join(' ')}
      style={style}
      {...restProps}
    >
      <textarea
        className={styles['text-area']}
        name="message"
        id="message"
        value={value}
        placeholder="무엇이든 물어보세요"
        onChange={handleChange}
        onKeyDown={handleKeydown}
        ref={textAreaRef}
      />
      <div className={[styles['send-container'], styles[status]].join(' ')}>
        <span
          className={styles['send-counter']}
        >{`${valueLength}/${textLimit}`}</span>
        <button
          className={[
            styles['send-button'],
            styles[getSendStatus(valueLength, textLimit, canSend)],
          ].join(' ')}
          type="submit"
        >
          <SolidArrowSVG direction="up" />
        </button>
      </div>
    </form>
  );
}
