import CharToggler from '../../_components/CharToggler/CharToggler';
import RegisterDescription from '../../_components/RegisterDescription/RegisterDescription';
import styles from './RegisterMBTIPage.module.css';

interface RegisterMBTIPageProps {
  energyChar: 'I' | 'E' | null;
  perspectiveChar: 'N' | 'S' | null;
  judgeChar: 'F' | 'T' | null;
  planningChar: 'P' | 'J' | null;
  changeEnergyChar: (value: 'E' | 'I') => void;
  changePerspectiveChar: (value: 'S' | 'N') => void;
  changeJudgeChar: (value: 'T' | 'F') => void;
  changePlanningChar: (value: 'J' | 'P') => void;
}

export default function RegisterMBTIPage(props: RegisterMBTIPageProps) {
  const {
    energyChar,
    perspectiveChar,
    judgeChar,
    planningChar,
    changeEnergyChar,
    changePerspectiveChar,
    changeJudgeChar,
    changePlanningChar,
  } = props;

  return (
    <>
      <RegisterDescription
        title="MBTI 설정하기"
        description="채팅을 위해 본인의 MBTI를 알려주세요"
      />
      <div className={styles.container}>
        <CharToggler
          upValue="E"
          downValue="I"
          nowValue={energyChar}
          description="에너지방향"
          onToggle={changeEnergyChar}
        />
        <CharToggler
          upValue="S"
          downValue="N"
          nowValue={perspectiveChar}
          description="인식"
          onToggle={changePerspectiveChar}
        />
        <CharToggler
          upValue="T"
          downValue="F"
          nowValue={judgeChar}
          description="판단"
          onToggle={changeJudgeChar}
        />
        <CharToggler
          upValue="J"
          downValue="P"
          nowValue={planningChar}
          description="계획성"
          onToggle={changePlanningChar}
        />
      </div>
    </>
  );
}
