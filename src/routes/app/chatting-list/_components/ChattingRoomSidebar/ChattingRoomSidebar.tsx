import { HTMLProps } from 'react';

import { useNavigate } from 'react-router-dom';

import AtSVG from '@_/components/common/svgs/AtSvg';
import FileClipboardSVG from '@_/components/common/svgs/FileClipboardSVG';
import GoOutSVG from '@_/components/common/svgs/GoOutSvg';
import HashTagSVG from '@_/components/common/svgs/HashTagSVG';
import PeopleCancelSVG from '@_/components/common/svgs/PeopleCancelSVG';
import APP_END_POINT from '@_/constants/appEndpoint';

import styles from './ChattingRoomSidebar.module.css';

interface ChattingRoomSidebarProps extends HTMLProps<HTMLDivElement> {
  email: string | null;
  logout: () => void;
  hide: () => void;
}

export default function ChattingRoomSidebar(props: ChattingRoomSidebarProps) {
  const { email, logout, hide, className, style, ...restProps } = props;

  const navigate = useNavigate();
  return (
    <section
      className={[styles.sidebar, className].join(' ')}
      style={{ ...style }}
      {...restProps}
    >
      <div>
        <div className={styles.header}>
          <AtSVG className={styles.svg} />
          <span>{email}</span>
        </div>
        <div className={styles.item} onClick={hide}>
          <HashTagSVG />
          채팅
        </div>
        <div
          className={styles.item}
          onClick={() =>
            navigate(APP_END_POINT.analysisFace, {
              state: {
                isFromChattingList: true,
              },
            })
          }
        >
          <FileClipboardSVG />
          관상 MBTI 검사
        </div>
      </div>
      <div>
        <div className={styles['bottom-box']} onClick={logout}>
          <GoOutSVG className={[styles.svg, styles.grey].join(' ')} />
          <span>로그아웃</span>
        </div>
        <div
          className={[styles['bottom-box'], styles.red].join(' ')}
          onClick={() => navigate(APP_END_POINT.cancel)}
        >
          <PeopleCancelSVG className={styles.svg} />
          <span>회원탈퇴</span>
        </div>
      </div>
    </section>
  );
}
