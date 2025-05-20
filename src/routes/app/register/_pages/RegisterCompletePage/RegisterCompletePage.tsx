import SonaWithBlur from '@_/components/common/SonaWithBlur/SonaWithBlur';

import styles from './RegisterComplete.module.css';

export default function RegisterCompletePage() {
  return (
    <div className={styles.container}>
      <SonaWithBlur type="complete" />
      <span className={styles.description}>회원가입 완료!</span>
    </div>
  );
}
