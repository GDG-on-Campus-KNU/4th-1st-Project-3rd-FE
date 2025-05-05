import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import { Modal } from '@_/components/common/Modal/Modal';
import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { deleteFetch, getFetch, postFetch } from '@_/fetches/BaseFetches';
import useEmail from '@_/hooks/useEmail';

import styles from './AppChattingListPage.module.css';
import ChattingList from './_components/ChattingList/ChattingList';
import ChattingRoomSidebar from './_components/ChattingRoomSidebar/ChattingRoomSidebar';

const ChatManageModalContent = ({
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
            thin
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
            thin
          >
            {type === 'close' ? '삭제하기' : '리셋하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const LogoutModalContent = ({
  onClose,
  onLogout,
}: {
  onClose: () => void;
  onLogout: () => void;
}) => {
  return (
    <div>
      <p className={styles['modal-title']}>로그아웃</p>
      <p className={styles['modal-description']}>정말 로그아웃 하시겠어요?</p>
      <div className={styles['button-container']}>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: '#dedede',
              color: '#fff',
              border: 'none',
            }}
            className={styles.button}
            thin
          >
            뒤로가기
          </Button>
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={onLogout}
            style={{
              backgroundColor: '#ff321b',
              color: '#fff',
              border: 'none',
            }}
            thin
          >
            로그아웃
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
  const [isChatManageModalOpen, setIsChatManageModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isSidebarMoved, setIsSidebarMoved] = useState(false);
  const { email, resetEmail } = useEmail();
  const mainContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isSidebarOpened) return;
    if (!mainContainerRef.current) return;
    const el = mainContainerRef.current;
    const originOverflow = el.style.overflow;
    mainContainerRef.current.style.overflow = 'hidden';

    return () => {
      el.style.overflow = originOverflow;
    };
  }, [isSidebarOpened]);

  const handleAddClick = () => {
    navigate(APP_END_POINT.chattingListAdd);
  };

  const handleHamburgerClick = useCallback(() => {
    setIsSidebarMoved(true);
    setIsSidebarOpened((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await postFetch(HTTP_API_END_POINT.logout);
    resetEmail();
    setIsLogoutModalOpen(false);
    navigate(APP_END_POINT.main);
  }, [resetEmail, navigate]);

  return (
    <>
      <div
        className={[
          styles.container,
          getSideBarStyle(isSidebarMoved, isSidebarOpened),
        ].join(' ')}
        ref={mainContainerRef}
      >
        <ChattingRoomSidebar
          email={email}
          logout={() => setIsLogoutModalOpen(true)}
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
            채팅
          </header>
          <section className={styles.section}>
            <button className={styles['add-button']} onClick={handleAddClick}>
              <p className={styles['add-button-description']}>
                채팅방 추가하기
              </p>
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
                  setIsChatManageModalOpen(true);
                }}
                deleteChat={(mbti) => {
                  setLastMbti(mbti);
                  setLastType('close');
                  setIsChatManageModalOpen(true);
                }}
              />
            )}
          </section>
          {isChatManageModalOpen && lastMbti && lastType && (
            <Modal onClose={() => setIsChatManageModalOpen(false)}>
              <ChatManageModalContent
                mbti={lastMbti}
                type={lastType}
                onClose={() => setIsChatManageModalOpen(false)}
              />
            </Modal>
          )}
        </div>
      </div>
      {isLogoutModalOpen && (
        <Modal
          onClose={() => setIsLogoutModalOpen(false)}
          dimmerColor="transparent"
        >
          <LogoutModalContent
            onClose={() => setIsLogoutModalOpen(false)}
            onLogout={handleLogout}
          />
        </Modal>
      )}
    </>
  );
}
