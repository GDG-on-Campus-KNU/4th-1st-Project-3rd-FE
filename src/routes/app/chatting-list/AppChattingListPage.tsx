import { useEffect, useRef, useState } from 'react';

import APP_END_POINT from '@_/constants/appEndpoint';
import ChattingList from './_components/ChattingList/ChattingList';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import { getFetch } from '@_/fetches/BaseFetches';
import styles from './AppChattingListPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function AppChattingListPage() {
  const [chattingList, setChattingList] = useState<ChattingPreview[]>([]);
  const [isLoading, setIsFirstLoading] = useState(true);
  const intervalId = useRef<ReturnType<typeof setInterval>>(undefined);
  const navigate = useNavigate();

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

  const handleAddClick = () => {
    navigate(APP_END_POINT.chattingListAdd);
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
        {!isLoading && chattingList.length > 0 && (
          <ChattingList
            chattingPreviews={chattingList}
            onChattingRoomClick={() => {}}
            initChat={() => {}}
            deleteChat={() => {}}
          />
        )}
      </section>
    </>
  );
}
