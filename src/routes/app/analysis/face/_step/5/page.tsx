import Button from '@_/components/common/Button/Button';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import MBTI_DESCRIPTION from '@_/constants/mbtiDescription';

import styles from './page.module.css';

export default function AnalysisFaceStep5({ mbti }: { mbti: Mbti }) {
  return (
    <>
      <span className={styles.description}>
        <h3>{mbti}</h3>
        <p>{MBTI_DESCRIPTION[mbti]}</p>
      </span>
      <div className={styles.svg}>
        <SonaWithBlur type={mbti} blurMultiple={1.3} />
      </div>
      <div className={styles['button-container']}>
        <Button>다른 MBTI와 대화하기</Button>
        <Button>다시하기</Button>
      </div>
    </>
  );
}
