import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import MBTI_NICKNAME from '@_/constants/mbtiNickname';

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
        {MBTI_NICKNAME[mbti] + ','}
        <br />
        {`${mbti}와 대화를 시작하세요`}
      </span>
    </div>
  );
}
