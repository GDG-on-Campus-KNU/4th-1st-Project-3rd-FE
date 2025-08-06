import { useCallback, useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import { Modal } from '@_/components/common/Modal/Modal';
import SwipeXDetector from '@_/components/common/SwipeXDetector/SwipeXDetector';
import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';
import SONASvg from '@_/components/common/svgs/sona/SONASvg';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { deleteFetch, postFetch } from '@_/fetches/BaseFetches';
import profileQueryBases from '@_/remote/profileQueryBase';

import styles from './AppChattingListPage.module.css';
import ChattingList from './_components/ChattingList/ChattingList';
import ChattingListSkeleton from './_components/ChattingListSkeleton/ChattingListSkeleton';
import ChattingRoomSidebar from './_components/ChattingRoomSidebar/ChattingRoomSidebar';
import mbtiChatQueryBases from './remote/mbtiChatQueryBases';

const ChatManageModalContent = ({
  mbti,
  type,
  isLoading,
  onClose,
  afterModify,
  setIsLoading,
}: {
  mbti: Mbti;
  type: 'close' | 'reset';
  isLoading: boolean;
  onClose: () => void;
  afterModify: { current: (() => void) | undefined };
  setIsLoading: (boolean: boolean) => void;
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
            style={
              isLoading
                ? {}
                : {
                    backgroundColor: '#dedede',
                    color: '#fff',
                    border: 'none',
                  }
            }
            thin
            isLoading={isLoading}
          >
            그만두기
          </Button>
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={async () => {
              setIsLoading(true);
              try {
                if (type === 'close') {
                  await deleteFetch(HTTP_API_END_POINT.mbtiChatClose(mbti));
                } else {
                  await deleteFetch(HTTP_API_END_POINT.mbtiChatInit(mbti));
                }
              } catch (_) {
                setIsLoading(false);
                alert(
                  `${type === 'close' ? '삭제하기' : '리셋하기'}에 실패하였습니다..`,
                );
              }
              setIsLoading(false);
              afterModify.current?.();
              onClose();
            }}
            style={
              isLoading
                ? {}
                : {
                    backgroundColor: '#ff321b',
                    color: '#fff',
                    border: 'none',
                  }
            }
            thin
            isLoading={isLoading}
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
  isLoading,
}: {
  onClose: () => void;
  onLogout: () => void;
  isLoading: boolean;
}) => {
  return (
    <div>
      <p className={styles['modal-title']}>로그아웃</p>
      <p className={styles['modal-description']}>정말 로그아웃 하시겠어요?</p>
      <div className={styles['button-container']}>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={onClose}
            style={
              isLoading
                ? {}
                : {
                    backgroundColor: '#dedede',
                    color: '#fff',
                    border: 'none',
                  }
            }
            className={styles.button}
            isLoading={isLoading}
            thin
          >
            뒤로가기
          </Button>
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={onLogout}
            style={
              isLoading
                ? {}
                : {
                    backgroundColor: '#ff321b',
                    color: '#fff',
                    border: 'none',
                  }
            }
            isLoading={isLoading}
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

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: () => postFetch(HTTP_API_END_POINT.logout),

    onError: () => {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(profileQueryBases.email());
      navigate(APP_END_POINT.main);
    },
  });

  return { logout, isLogoutPending };
};

export default function AppChattingListPage() {
  const location = useLocation();
  const { isSidebarOpened: isSidebarOpenedFromLocation = false } =
    (location.state || {}) as { isSidebarOpened: boolean };
  const navigate = useNavigate();
  const [lastMbti, setLastMbti] = useState<Mbti | null>(null);
  const [lastType, setLastType] = useState<'close' | 'reset' | null>(null);
  const [isChatManageModalOpen, setIsChatManageModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(
    isSidebarOpenedFromLocation,
  );
  const [isSidebarMoved, setIsSidebarMoved] = useState(
    isSidebarOpenedFromLocation,
  );
  const { data: email } = useQuery(profileQueryBases.email());
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isChattingModifying, setIsChattingModifying] = useState(false);
  const afterModifyFn = useRef<undefined | (() => void)>(undefined);

  const {
    data: chattingList,
    isSuccess: isChattingListSuccess,
    isPending: isChattingListPending,
  } = useQuery({
    ...mbtiChatQueryBases.all(),
    refetchInterval: 100,
  });

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

  const openSidebar = useCallback(() => {
    setIsSidebarMoved(true);
    setIsSidebarOpened(true);
  }, []);

  const { logout, isLogoutPending } = useLogout();

  return (
    <>
      <SwipeXDetector
        direction="both"
        onLeftDetect={useCallback(() => setIsSidebarOpened(false), [])}
        onRightDetect={openSidebar}
        startOffsetXPercent={-Infinity}
        finishOffsetXPercent={Infinity}
        criteria={10}
        className={[
          styles.container,
          getSideBarStyle(isSidebarMoved, isSidebarOpened),
        ].join(' ')}
        ref={mainContainerRef}
      >
        <ChattingRoomSidebar
          email={email ?? null}
          logout={() => setIsLogoutModalOpen(true)}
          hide={() => setIsSidebarOpened(false)}
        />

        <div className={styles['main-container']}>
          {isSidebarOpened && (
            <div
              className={styles.dimmer}
              onClick={() => setIsSidebarOpened(false)}
            />
          )}
          <header className={styles.header}>
            <HamburgerSVG onClick={openSidebar} />
            채팅
          </header>
          <section className={styles.section}>
            <button className={styles['add-button']} onClick={handleAddClick}>
              <p className={styles['add-button-description']}>
                채팅방 추가하기
              </p>
              <SolidPlusSVG className={styles['plus-icon']} />
            </button>
            {isChattingListSuccess && chattingList.length === 0 && (
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
            {isChattingListPending && <ChattingListSkeleton />}
            {isChattingListSuccess && chattingList.length > 0 && (
              <ChattingList
                chattingPreviews={chattingList}
                onChattingRoomClick={(mbti) =>
                  navigate(APP_END_POINT.chatMbti(mbti))
                }
                initChat={(mbti, onClose) => {
                  setLastMbti(mbti);
                  setLastType('reset');
                  setIsChatManageModalOpen(true);
                  afterModifyFn.current = onClose;
                }}
                deleteChat={(mbti, onClose) => {
                  setLastMbti(mbti);
                  setLastType('close');
                  afterModifyFn.current = onClose;
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
                isLoading={isChattingModifying}
                setIsLoading={setIsChattingModifying}
                afterModify={afterModifyFn}
                onClose={() => setIsChatManageModalOpen(false)}
              />
            </Modal>
          )}
        </div>
      </SwipeXDetector>
      {isLogoutModalOpen && (
        <Modal
          onClose={() => setIsLogoutModalOpen(false)}
          dimmerColor="transparent"
        >
          <LogoutModalContent
            isLoading={isLogoutPending}
            onClose={() => setIsLogoutModalOpen(false)}
            onLogout={logout}
          />
        </Modal>
      )}
    </>
  );
}
