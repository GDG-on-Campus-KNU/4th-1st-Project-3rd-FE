import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import MBTI_DESCRIPTION from '@_/constants/mbtiDescription';

import styles from './ChatFallback.module.css';

interface ChatFallbackProps {
  mbti: Mbti;
}

export default function ChatFallback(props: ChatFallbackProps) {
  const { mbti } = props;

  return (
    <div className={styles.content}>
      <SonaWithBlur type={mbti} blurMultiple={1.3} width={170} />
      <span>
        {MBTI_DESCRIPTION[mbti] + ','}
        <br />
        {`${mbti}와 대화를 시작하세요`}
      </span>
    </div>
  );
}
