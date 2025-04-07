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
  isLoading?: boolean;
}

const getStyle = (isValid?: boolean, isLoading?: boolean) => {
  if (isValid === false) return 'invalid';
  if (isLoading) return 'loading';
  return 'valid';
};
export default function Button(props: ButtonProps) {
  const { isValid, isLoading, children, className, onClick, ...restProps } =
    props;
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isValid !== false && !isLoading && onClick) onClick(e);
    },
    [onClick, isValid, isLoading],
  );

  return (
    <button
      className={[
        styles[getStyle(isValid, isLoading)],
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
