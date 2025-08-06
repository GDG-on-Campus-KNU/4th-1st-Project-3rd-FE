import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import { Modal } from '@_/components/common/Modal/Modal';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

import mbtiChatQueryBases from '../remote/mbtiChatQueryBases';
import MbtiList from './_components/MbtiList/MbtiList';
import MbtiListSkeleton from './_components/MbtiListSkeleton/MBTIListSkeleton';
import styles from './page.module.css';

const ModalContent = ({
  mbti,
  onClose,
}: {
  mbti: Mbti;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <p className={styles['modal-title']}>{mbti} 채팅방을 추가할까요?</p>
      <p className={styles['modal-description']}>
        MBTI당 하나의 채팅방을 추가할 수 있어요
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
            isLoading={isLoading}
            thin
          >
            그만두기
          </Button>
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            onClick={async () => {
              setIsLoading(true);
              try {
                await postFetch<ChatMbtiOpenPostRequestBody>(
                  HTTP_API_END_POINT.mbtiChatOpenPost,
                  { body: { mbti } },
                );
              } catch (_) {
                alert('채팅방 추가에 실패하였습니다.');
                setIsLoading(false);
              }
              setIsLoading(false);
              navigate(APP_END_POINT.chatMbti(mbti));
              onClose();
            }}
            style={
              isLoading
                ? {}
                : {
                    border: 'none',
                  }
            }
            isLoading={isLoading}
            thin
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AppAddChatPage() {
  const navigate = useNavigate();
  const { data: closedMbti } = useQuery(mbtiChatQueryBases.closed());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMbti, setSelectedMbti] = useState<Mbti | null>(null);

  return (
    <>
      <header className={styles.header}>
        <SolidArrowHeadSVG
          direction="left"
          className={styles.headerLeft}
          onClick={() => navigate(APP_END_POINT.chattingList)}
        />
        <h1 className={styles['header-title']}>채팅방 추가하기</h1>
      </header>
      <section className={styles.main}>
        {closedMbti && (
          <MbtiList
            mbtiList={closedMbti}
            addMbti={(mbti) => {
              setIsModalOpen(true);
              setSelectedMbti(mbti);
            }}
          />
        )}
        {closedMbti && closedMbti.length === 0 && (
          <div className={styles['empty-container']}>
            <SonaWithBlur type="sleep" />
            <p className={styles['empty-text']}>
              모든 MBTI 채팅방이 열렸습니다.
            </p>
          </div>
        )}
        {closedMbti === null && <MbtiListSkeleton />}
      </section>
      {isModalOpen && selectedMbti && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalContent
            mbti={selectedMbti}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
