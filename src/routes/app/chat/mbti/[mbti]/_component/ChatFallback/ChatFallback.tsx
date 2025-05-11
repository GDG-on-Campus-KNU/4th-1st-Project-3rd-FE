import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';

import styles from './ChatFallback.module.css';

const DESCRIPTION: Record<Mbti, string> = {
  ISTJ: '실무적인 관리자',
  ISFJ: '실용적인 조력가',
  INFJ: '통찰력 있는 상담가',
  INTJ: '전략적인 설계자',
  ISTP: '실용적인 기술자',
  ISFP: '조용한 예술가',
  INFP: '이상적인 치유자',
  INTP: '논리적인 사색가',
  ESTP: '활동적인 문제 해결사',
  ESFP: '열정적인 연예인',
  ENFP: '창의적인 옹호자',
  ENTP: '혁신적인 발명가',
  ESTJ: '체계적인 조직가',
  ESFJ: '사교적인 돌봄 제공자',
  ENFJ: '카리스마 있는 리더',
  ENTJ: '대담한 통솔자',
};

interface ChatFallbackProps {
  mbti: Mbti;
}

export default function ChatFallback(props: ChatFallbackProps) {
  const { mbti } = props;

  return (
    <div className={styles.content}>
      <SonaWithBlur type={mbti} blurMultiple={1.3} />
      <span>
        {DESCRIPTION[mbti] + ','}
        <br />
        {`${mbti}와 대화를 시작하세요`}
      </span>
    </div>
  );
}
