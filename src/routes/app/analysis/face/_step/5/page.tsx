import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import APP_END_POINT from '@_/constants/appEndpoint';
import MBTI_DESCRIPTION from '@_/constants/mbtiDescription';

import styles from './page.module.css';

export default function AnalysisFaceStep5({
  mbti,
  retest,
}: {
  mbti: Mbti;
  retest: () => void;
}) {
  const navigate = useNavigate();

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
        <Button onClick={() => navigate(APP_END_POINT.login)}>
          다른 MBTI와 대화하기
        </Button>
        <Button onClick={retest}>다시하기</Button>
      </div>
    </>
  );
}
