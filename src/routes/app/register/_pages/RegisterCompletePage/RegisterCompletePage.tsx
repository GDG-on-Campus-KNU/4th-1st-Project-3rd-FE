import RegisterComplete from '@_/assets/register_complete.png';

import styles from './RegisterComplete.module.css';

export default function RegisterCompletePage() {
  return (
    <div className={styles.container}>
      <div className={styles['character-box']}>
        <div className={styles.blur} />
        <img src={RegisterComplete} alt="캐릭터" className={styles.character} />
      </div>
      <span className={styles.description}>회원가입 완료!</span>
    </div>
  );
}
