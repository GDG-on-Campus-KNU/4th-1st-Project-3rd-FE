import { HTMLProps } from 'react';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import styles from './ChatHeader.module.css';

export interface ChatHeaderProps extends HTMLProps<HTMLElement> {
  onMenuClick: () => void;
  mbti: Mbti;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { onMenuClick, mbti, className, style, ...restProps } = props;

  return (
    <header
      className={[styles.header, className].join(' ')}
      style={style}
      {...restProps}
    >
      <SolidArrowHeadSVG
        direction="left"
        className={styles.menu}
        width={24}
        height={24}
        onClick={onMenuClick}
      />
      <div className={styles.profile}>
        <div className={styles['profile-img']}>
          <SONASvg type={mbti} width={36} height={36} />
        </div>
        <span className={styles['profile-name']}>{mbti}</span>
      </div>
    </header>
  );
}
