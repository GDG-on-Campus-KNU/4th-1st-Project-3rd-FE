import styles from './CharToggler.module.css';

export interface CharTogglerProps<T extends string> {
  upValue: T;
  downValue: T;
  nowValue: T | null | undefined;
  description: string;
  onToggle: (value: T) => void;
}

export default function CharToggler<T extends string>(
  props: CharTogglerProps<T>,
) {
  const { upValue, downValue, nowValue, description, onToggle } = props;

  return (
    <div className={styles.container}>
      <div
        className={[
          styles['char-box'],
          styles[nowValue === upValue ? 'selected' : 'unselected'],
        ].join(' ')}
        onClick={() => onToggle(upValue)}
      >
        {upValue}
      </div>
      <div className={styles.description}>{description}</div>
      <div
        className={[
          styles['char-box'],
          styles[nowValue === downValue ? 'selected' : 'unselected'],
        ].join(' ')}
        onClick={() => onToggle(downValue)}
      >
        {downValue}
      </div>
    </div>
  );
}
