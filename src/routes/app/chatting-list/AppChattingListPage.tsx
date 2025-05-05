import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import { Modal } from '@_/components/common/Modal/Modal';
import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { deleteFetch, getFetch } from '@_/fetches/BaseFetches';

import styles from './AppChattingListPage.module.css';
import ChattingList from './_components/ChattingList/ChattingList';
import ChattingRoomSidebar from './_components/ChattingRoomSidebar/ChattingRoomSidebar';

const ModalContent = ({
  mbti,
  type,
  onClose,
}: {
  mbti: Mbti;
  type: 'close' | 'reset';
  onClose: () => void;
}) => {
  return (
    <div>
      <p className={styles['modal-title']}>
        {mbti} 채팅방을 {type === 'close' ? '삭제' : '리셋'}할까요?
      </p>
      <p className={styles['modal-description']}>
        {type === 'close'
          ? '채팅방은 다시 만들 수 있지만'
          : '채팅방은 남아있지만'}{' '}
        내용은 사라져요
      </p>
      <div className={styles['button-container']}>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: '#dedede',
              color: '#fff',
              border: 'none',
            }}
          >
            그만두기
          </Button>
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={async () => {
              if (type === 'close') {
                await deleteFetch(HTTP_API_END_POINT.mbtiChatClose(mbti));
              } else {
                await deleteFetch(HTTP_API_END_POINT.mbtiChatInit(mbti));
              }

              onClose();
            }}
            style={{
              backgroundColor: '#ff321b',
              color: '#fff',
              border: 'none',
            }}
          >
            {type === 'close' ? '삭제하기' : '리셋하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const getSideBarStyle = (isMoved: boolean, isOpen: boolean) => {
  if (!isMoved) return styles.init;
  if (isOpen) return styles.open;
  return styles.close;
};

export default function AppChattingListPage() {
  const [chattingList, setChattingList] = useState<ChattingPreview[]>([]);
  const [isLoading, setIsFirstLoading] = useState(true);
  const intervalId = useRef<ReturnType<typeof setInterval>>(undefined);
  const navigate = useNavigate();
  const [lastMbti, setLastMbti] = useState<Mbti | null>(null);
  const [lastType, setLastType] = useState<'close' | 'reset' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isSidebarMoved, setIsSidebarMoved] = useState(false);

  useEffect(() => {
    let isFetching = false;
    async function updateChattingList() {
      if (isFetching) return;
      isFetching = true;
      const data = await getFetch<ChatMbtiRecentResponseBody>(
        HTTP_API_END_POINT.recentMbtiChat,
      );

      setChattingList(data);
      isFetching = false;
      setIsFirstLoading(false);
    }
    intervalId.current = setInterval(updateChattingList, 100);
    return () => clearInterval(intervalId.current);
  }, []);

  const handleAddClick = () => {
    navigate(APP_END_POINT.chattingListAdd);
  };

  const handleHamburgerClick = useCallback(() => {
    setIsSidebarMoved(true);
    setIsSidebarOpened((prev) => !prev);
  }, []);
  return (
    <div
      className={[
        styles.container,
        getSideBarStyle(isSidebarMoved, isSidebarOpened),
      ].join(' ')}
    >
      <ChattingRoomSidebar
        email={'이메일 바꿔야함'}
        logout={() => {}}
        cancel={() => {}}
      />

      <div className={styles['main-container']}>
        {isSidebarOpened && (
          <div
            className={styles.dimmer}
            onClick={() => setIsSidebarOpened(false)}
          />
        )}
        <header className={styles.header}>
          <HamburgerSVG onClick={handleHamburgerClick} />
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
              onChattingRoomClick={(mbti) =>
                navigate(APP_END_POINT.chatMbti(mbti))
              }
              initChat={(mbti) => {
                setLastMbti(mbti);
                setLastType('reset');
                setIsModalOpen(true);
              }}
              deleteChat={(mbti) => {
                setLastMbti(mbti);
                setLastType('close');
                setIsModalOpen(true);
              }}
            />
          )}
        </section>
        {isModalOpen && lastMbti && lastType && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <ModalContent
              mbti={lastMbti}
              type={lastType}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
