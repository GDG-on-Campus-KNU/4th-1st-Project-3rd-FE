import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

import styles from './ControlledInput.module.css';

export interface ControlledInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
  isLoading?: boolean;
  rightIcon?: ReactNode;
}

const getStatus = (
  disabled?: boolean,
  isError?: boolean,
  isLoading?: boolean,
) => {
  if (isLoading) return 'disabled';
  if (disabled) return 'disabled';
  if (isError) return 'invalid';
  return 'normal';
};

export default function ControlledInput(props: ControlledInputProps) {
  const {
    disabled,
    isError,
    isLoading,
    rightIcon,
    className,
    value,
    type,
    ...restProps
  } = props;
  const status = getStatus(disabled, isError, isLoading);

  return (
    <div className={styles['input-container']}>
      <input
        className={[styles[status], styles.input, className].join(' ')}
        value={value}
        type={type}
        disabled={disabled || isLoading}
        {...restProps}
      />
      <div className={styles['right-node']}>{rightIcon}</div>
    </div>
  );
}
