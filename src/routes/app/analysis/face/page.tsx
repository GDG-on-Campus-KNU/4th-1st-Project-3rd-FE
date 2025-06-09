import { useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import BackHeader from '@_/components/common/Header/BackHeader';

import AnalysisFaceStep1 from './_step/1/page';
import AnalysisFaceStep2 from './_step/2/page';
import AnalysisFaceStep3 from './_step/3/page';
import AnalysisFaceStep4 from './_step/4/page';
import AnalysisFaceStep5 from './_step/5/page';
import styles from './page.module.css';

const AnalysisFacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { step = 1 } = (location.state || {}) as { step?: 1 | 2 | 3 | 4 | 5 };
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef}>
      <BackHeader>관상 MBTI</BackHeader>
      <div className={styles.container}>
        {step === 1 && (
          <AnalysisFaceStep1
            goNextStep={() => navigate('.', { state: { step: 2 } })}
          />
        )}
        {step === 2 && (
          <AnalysisFaceStep2
            goNextStep={() => navigate('.', { state: { step: 3 } })}
          />
        )}
        {step === 3 && (
          <AnalysisFaceStep3
            divRef={divRef}
            goNextStep={() => navigate('.', { state: { step: 5 } })}
          />
        )}
        {step === 4 && <AnalysisFaceStep4 />}
        {step === 5 && <AnalysisFaceStep5 mbti={'INFP'} />}
      </div>
    </div>
  );
};

export default AnalysisFacePage;
