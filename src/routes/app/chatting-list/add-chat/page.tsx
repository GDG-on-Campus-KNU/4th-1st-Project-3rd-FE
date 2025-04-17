import APP_END_POINT from '@_/constants/appEndpoint';
import Button from '@_/components/common/Button/Button';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import MbtiList from './_components/MbtiList/MbtiList';
import { Modal } from '@_/components/common/Modal/Modal';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import { postFetch } from '@_/fetches/BaseFetches';
import styles from './page.module.css';
import useClosedMbti from './_hooks/useClosedMbti';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ModalContent = ({
  mbti,
  onClose,
}: {
  mbti: Mbti;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
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
              await postFetch<ChatMbtiOpenPostRequestBody>(
                HTTP_API_END_POINT.mbtiChatOpenPost,
                { body: { mbti } },
              );
              navigate(APP_END_POINT.chatMbti(mbti));
              onClose();
            }}
            style={{
              border: 'none',
            }}
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
  const closedMbti = useClosedMbti();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMbti, setSelectedMbti] = useState<Mbti | null>(null);

  return (
    <>
      <header className={styles.header}>
        <SolidArrowHeadSVG
          direction="left"
          className={styles.headerLeft}
          onClick={() => navigate(-1)}
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
