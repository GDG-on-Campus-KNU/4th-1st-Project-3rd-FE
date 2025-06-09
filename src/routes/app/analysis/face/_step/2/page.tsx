import Button from '@_/components/common/Button/Button';
import CameraSVG from '@_/components/common/svgs/CameraSvg';
import GallerySVG from '@_/components/common/svgs/GallareySvg';

import styles from './page.module.css';

export default function AnalysisFaceStep2({
  goNextStep,
}: {
  goNextStep: () => void;
}) {
  return (
    <div className={styles.container}>
      <span className={styles.description}>
        <h2>서비스 이용 접근 권한 안내</h2>
        <div style={{ height: '10px' }} />
        서비스 이용을 위해 다음의
        <br />
        <b>접근권한 확인</b>이 필요합니다.
      </span>
      <div className={styles['permission-list']}>
        <div className={styles['permission-container']}>
          <CameraSVG />
          <div>
            <h3>카메라</h3>
            얼굴 촬영을 통해 MBTI 유추를 위한
            <br />
            AI 관상 분석에 사용됩니다.
          </div>
        </div>
        <div className={styles['permission-container']}>
          <GallerySVG />
          <div>
            <h3>갤러리</h3>
            기기에 저장된 얼굴 사진을 불러와
            <br />
            AI 관상 분석에 사용됩니다.
          </div>
        </div>
      </div>
      <span className={styles['permission-description']}>
        휴대폰 설정 &gt; 접근권한에서 변경이 가능합니다.
      </span>
      <Button className={styles.button} onClick={goNextStep}>
        확인
      </Button>
    </div>
  );
}
