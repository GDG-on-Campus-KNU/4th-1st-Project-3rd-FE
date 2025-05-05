import { HTMLProps } from 'react';

import AtSVG from '@_/components/common/svgs/AtSvg';
import GoOutSVG from '@_/components/common/svgs/GoOutSvg';
import PeopleCancelSVG from '@_/components/common/svgs/PeopleCancelSVG';

import styles from './ChattingRoomSidebar.module.css';

interface ChattingRoomSidebarProps extends HTMLProps<HTMLDivElement> {
  email: string | null;
  logout: () => void;
  cancel: () => void;
}

export default function ChattingRoomSidebar(props: ChattingRoomSidebarProps) {
  const { email, logout, cancel, className, style, ...restProps } = props;

  return (
    <section
      className={[styles.sidebar, className].join(' ')}
      style={{ ...style }}
      {...restProps}
    >
      <div className={styles.header}>
        <AtSVG className={styles.svg} />
        <span>{email}</span>
      </div>
      <div>
        <div className={styles['bottom-box']} onClick={logout}>
          <GoOutSVG className={[styles.svg, styles.grey].join(' ')} />
          <span>로그아웃</span>
        </div>
        <div
          className={[styles['bottom-box'], styles.red].join(' ')}
          onClick={cancel}
        >
          <PeopleCancelSVG className={styles.svg} />
          <span>회원탈퇴</span>
        </div>
      </div>
    </section>
  );
}
