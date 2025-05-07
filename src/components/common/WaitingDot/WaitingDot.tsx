import styles from './WaitingDot.module.css';

interface WaitingDotProps {
  color?: string;
  circleSize?: string | number;
}

export default function WaitingDot(props: WaitingDotProps) {
  const { color = '#4849e8', circleSize: size = '12px' } = props;

  return (
    <div className={styles['dot-container']}>
      <div
        className={[styles.dot, styles.left].join(' ')}
        style={{ backgroundColor: color, width: size, height: size }}
      />
      <div
        className={[styles.dot, styles.middle].join(' ')}
        style={{ backgroundColor: color, width: size, height: size }}
      />
      <div
        className={[styles.dot, styles.right].join(' ')}
        style={{ backgroundColor: color, width: size, height: size }}
      />
    </div>
  );
}
