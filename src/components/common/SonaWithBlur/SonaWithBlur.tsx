import { SVGComponentProp } from '@_/types/props';

import SONASvg, { SONAType } from '../svgs/sona/SONASvg';
import styles from './SonaWithBlur.module.css';

interface SonaWithBlurProps extends SVGComponentProp {
  type: SONAType;
  blurMultiple?: number;
}

export default function SonaWithBlur(props: SonaWithBlurProps) {
  const { type = 'sleep', blurMultiple = 1, ...restProps } = props;

  return (
    <div className={styles['empty-container']}>
      <div className={styles['sona-container']}>
        <div
          className={styles.blur}
          style={{
            width: 100 * blurMultiple + '%',
            height: 100 * blurMultiple + '%',
          }}
        />
        <SONASvg type={type} className={styles.sona} {...restProps} />
      </div>
    </div>
  );
}
