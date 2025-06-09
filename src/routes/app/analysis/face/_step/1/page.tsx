import Button from '@_/components/common/Button/Button';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';

import styles from './page.module.css';

export default function AnalysisFaceStep1({
  goNextStep,
}: {
  goNextStep: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.svg}>
        <SonaWithBlur type="talk" />
      </div>
      <span className={styles.description}>
        <h2>당신의 얼굴에서 MBTI가 보인다면?</h2>
        <br />
        AI가 관상을 분석해 당신의 성격 유형을 유추합니다.
        <br />
        과연 내 얼굴엔 어떤 성격이 담겨 있을까?
        <br />
        지금 사진 한 장으로 시작해보세요!
      </span>
      <Button className={styles.button} onClick={goNextStep}>
        MBTI 알아보기
      </Button>
    </div>
  );
}
