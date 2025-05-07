import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Skeleton.module.css';

export default function Skeleton(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  const { className, style, ...restProps } = props;

  return (
    <div
      className={[styles.skeleton, className].join(' ')}
      style={style}
      {...restProps}
    />
  );
}
