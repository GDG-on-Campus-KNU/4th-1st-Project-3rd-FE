import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import MbtiList from './_components/MbtiList/MbtiList';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import { postFetch } from '@_/fetches/BaseFetches';
import styles from './page.module.css';
import useClosedMbti from './_hooks/useClosedMbti';
import { useNavigate } from 'react-router-dom';

export default function AppAddChatPage() {
  const navigate = useNavigate();
  const closedMbti = useClosedMbti();

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
            addMbti={async (mbti) => {
              await postFetch<ChatMbtiOpenPostRequestBody>(
                HTTP_API_END_POINT.mbtiChatOpenPost,
                { body: { mbti } },
              );
              navigate(APP_END_POINT.chatMbti(mbti));
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
    </>
  );
}
