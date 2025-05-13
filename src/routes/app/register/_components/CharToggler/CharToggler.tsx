import styles from './CharToggler.module.css';

export interface CharTogglerProps<T extends string> {
  upValue: T;
  downValue: T;
  nowValue: T | null | undefined;
  description: string;
  isLoading?: boolean;
  onToggle: (value: T) => void;
}

export default function CharToggler<T extends string>(
  props: CharTogglerProps<T>,
) {
  const { upValue, downValue, nowValue, description, isLoading, onToggle } =
    props;

  return (
    <div className={styles.container}>
      <div
        className={[
          styles['char-box'],
          styles[nowValue === upValue ? 'selected' : 'unselected'],
        ].join(' ')}
        onClick={isLoading ? undefined : () => onToggle(upValue)}
      >
        {isLoading && <div className={styles.loading} />}
        {upValue}
      </div>
      <div className={styles.description}>{description}</div>
      <div
        className={[
          styles['char-box'],
          styles[nowValue === downValue ? 'selected' : 'unselected'],
        ].join(' ')}
        onClick={isLoading ? undefined : () => onToggle(downValue)}
      >
        {isLoading && <div className={styles.loading} />}
        {downValue}
      </div>
    </div>
  );
}
