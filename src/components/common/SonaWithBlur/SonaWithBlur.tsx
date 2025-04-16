import SONASvg from '../svgs/sona/SONASvg';
import { SVGComponentProp } from '@_/types/props';
import styles from './SonaWithBlur.module.css';

interface SonaWithBlurProps extends SVGComponentProp {
  type: 'sleep' | Mbti;
  width?: number;
  height?: number;
}

export default function SonaWithBlur(props: SonaWithBlurProps) {
  const { type = 'sleep', ...restProps } = props;

  return (
    <div className={styles['empty-container']}>
      <div className={styles['sona-container']}>
        <div className={styles.blur} />
        <SONASvg type={type} className={styles.sona} {...restProps} />
      </div>
    </div>
  );
}
