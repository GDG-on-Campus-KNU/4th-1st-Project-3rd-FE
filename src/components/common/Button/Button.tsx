import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from 'react';

import styles from './Button.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isValid?: boolean;
}

export default function Button(props: ButtonProps) {
  const { isValid, children, className, onClick, ...restProps } = props;
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isValid !== false && onClick) onClick(e);
    },
    [onClick, isValid],
  );
  return (
    <button
      className={[
        styles[isValid !== false ? 'valid' : 'invalid'],
        styles.button,
        className,
      ].join(' ')}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  );
}
