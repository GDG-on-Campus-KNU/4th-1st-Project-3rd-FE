import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import styles from './MbtiList.module.css';

interface MbtiListProps {
  mbtiList: Mbti[];
  addMbti: (mbti: Mbti) => void;
}

export default function MbtiList(props: MbtiListProps) {
  const { mbtiList, addMbti } = props;

  return (
    <div>
      {mbtiList.map((mbti) => (
        <div key={mbti} className={styles['mbti-item']}>
          <div className={styles['mbti-item-sona-container']}>
            <SONASvg type={mbti} className={styles['mbti-item-sona']} />
            <p className={styles['mbti-item-text']}>{mbti}</p>
          </div>
          <button
            className={styles['mbti-item-add-button']}
            onClick={() => addMbti(mbti)}
          >
            <SolidPlusSVG />
          </button>
        </div>
      ))}
    </div>
  );
}
