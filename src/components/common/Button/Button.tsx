import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './Button.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isValid?: boolean;
}

export default function Button(props: ButtonProps) {
  const { isValid, children, className, style, ...restProps } = props;

  return (
    <button
      className={[
        styles[isValid ? 'valid' : 'invalid'],
        styles.button,
        className,
      ].join(' ')}
      style={style}
      {...restProps}
    >
      {children}
    </button>
  );
}
