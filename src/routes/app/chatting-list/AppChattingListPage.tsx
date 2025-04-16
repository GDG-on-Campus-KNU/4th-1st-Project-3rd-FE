import { useEffect, useRef, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import { getFetch } from '@_/fetches/BaseFetches';
import styles from './AppChattingListPage.module.css';

export default function AppChattingListPage() {
  const [chattingList, setChattingList] = useState<ChattingPreview[]>([]);
  const [isLoading, setIsFirstLoading] = useState(true);
  const intervalId = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    let isFetching = false;
    async function updateChattingList() {
      if (isFetching) return;
      isFetching = true;
      const { list } = await getFetch<ChatMbtiRecentResponseBody>(
        HTTP_API_END_POINT.recentMbtiChat,
      );

      setChattingList(list);
      isFetching = false;
      setIsFirstLoading(false);
    }
    intervalId.current = setInterval(updateChattingList, 100);
    return () => clearInterval(intervalId.current);
  }, []);

  const handleMenuClick = () => {
    // TODO: 메뉴 클릭 처리
    console.log('메뉴 클릭');
  };

  const handleAddClick = () => {
    // TODO: 채팅방 추가 처리
    console.log('채팅방 추가');
  };

  return (
    <>
      <header className={styles.header}>
        <HamburgerSVG />
      </header>
      <section className={styles.section}>
        <button className={styles['add-button']} onClick={handleAddClick}>
          <p className={styles['add-button-description']}>채팅방 추가하기</p>
          <SolidPlusSVG className={styles['plus-icon']} />
        </button>
        {!isLoading && chattingList.length === 0 && (
          <div className={styles['empty-container']}>
            <div className={styles['sona-container']}>
              <div className={styles.blur} />
              <SONASvg type="sleep" className={styles.sona} />
            </div>
            <p className={styles['sona-text']}>
              채팅방을 추가하여 SONA와 함께
              <br />
              MBTI채팅을 시작하세요!
            </p>
          </div>
        )}
      </section>
    </>
  );
}
