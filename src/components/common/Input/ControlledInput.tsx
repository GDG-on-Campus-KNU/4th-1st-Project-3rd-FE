import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

import styles from './ControlledInput.module.css';

export interface ControlledInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
  rightIcon?: ReactNode;
}

const getStatus = (disabled?: boolean, isError?: boolean) => {
  if (disabled) return 'disabled';
  if (isError) return 'invalid';
  return 'normal';
};

const getParsedValue = (
  value: string | number | readonly string[] | undefined,
  type?: React.HTMLInputTypeAttribute,
) => {
  if (value === undefined) return '';
  if (type === 'password') return value.toString().replace(/./g, '*');
  return value;
};

export default function ControlledInput(props: ControlledInputProps) {
  const { disabled, isError, rightIcon, className, value, type, ...restProps } =
    props;
  const status = getStatus(disabled, isError);
  const parsedValue = getParsedValue(value, type);

  return (
    <div className={styles['input-container']}>
      <input
        className={[styles[status], styles.input, className].join(' ')}
        value={parsedValue}
        type={type}
        {...restProps}
      />
      <div className={styles['right-node']}>{rightIcon}</div>
    </div>
  );
}
