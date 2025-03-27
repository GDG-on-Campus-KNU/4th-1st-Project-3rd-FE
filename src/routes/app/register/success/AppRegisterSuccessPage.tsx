import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import APP_END_POINT from '@_/constants/appEndpoint';

import RegisterCompletePage from '../_pages/RegisterCompletePage/RegisterCompletePage';
import styles from './AppRegisterSuccess.module.css';

export default function AppRegisterSuccessPage() {
  const navigate = useNavigate();
  return (
    <section className={styles.layout}>
      <RegisterCompletePage />
      <Button
        className={styles.button}
        onClick={() => navigate(APP_END_POINT.chatMbti('ISFJ'))}
      >
        채팅하러 가기
      </Button>
    </section>
  );
}
