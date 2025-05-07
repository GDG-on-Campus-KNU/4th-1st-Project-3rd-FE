import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import ControlledInput from '@_/components/common/Input/ControlledInput';
import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { deleteFetch } from '@_/fetches/BaseFetches';
import useEmail from '@_/hooks/useEmail';

import styles from './AppCancelPage.module.css';

export default function AppCancelPage() {
  const { email, resetEmail } = useEmail();
  const [typedEmail, setTypedEmail] = useState('');
  const navigate = useNavigate();

  const canCancel = email === typedEmail;

  const handleCancel = useCallback(async () => {
    await deleteFetch(HTTP_API_END_POINT.cancelAccount);
    resetEmail();
    navigate(APP_END_POINT.main);
  }, [navigate, resetEmail]);

  return (
    <>
      <header className={styles.header}>
        <SolidArrowHeadSVG direction="left" onClick={() => navigate(-1)} />
        회원탈퇴
      </header>
      <div className={styles['main-content']}>
        <span className={styles['main-description']}>
          정말 PERSONA를
          <br />
          탈퇴하실건가요?
        </span>
        <div className={styles.sona}>
          <SonaWithBlur type="sad" blurMultiple={1.4} />
        </div>
      </div>

      <div className={styles['description-box']}>
        <div className={styles.description}>
          탈퇴 시 계정 및 이용 기록은 모두 삭제되며,
          <br />
          삭제된 데이터는 복구가 불가능합니다.
        </div>
        <ControlledInput
          placeholder={email || ''}
          value={typedEmail}
          onChange={(e) => setTypedEmail(e.target.value)}
          className={styles.input}
        />
        <div className={styles['button-container']}>
          <Button
            className={styles['grey-button']}
            onClick={() => navigate(APP_END_POINT.chattingList)}
            thin
          >
            취소
          </Button>
          <Button
            isValid={canCancel}
            className={canCancel ? styles.red : styles['grey-button']}
            onClick={handleCancel}
            thin
          >
            회원탈퇴
          </Button>
        </div>
      </div>
    </>
  );
}
