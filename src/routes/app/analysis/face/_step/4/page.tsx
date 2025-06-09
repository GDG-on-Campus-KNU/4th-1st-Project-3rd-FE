import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import WaitingDot from '@_/components/common/WaitingDot/WaitingDot';

import styles from './page.module.css';

export default function AnalysisFaceStep4() {
  return (
    <div className={styles.container}>
      <div className={styles['sona-container']}>
        <div className={styles['waiting-dot-container']}>
          <WaitingDot />
        </div>
        <SonaWithBlur type="loading" />
      </div>
      <span>
        사진을 바탕으로 MBTI를
        <br />
        유추하고 있어요...
      </span>
    </div>
  );
}
