import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import useImageOnError from '@_/hooks/useImageOnError';

import styles from './ChatHeader.module.css';

export interface ChatHeaderProps {
  onMenuClick: () => void;
  title: string;
  profileSrc?: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { onMenuClick, title, profileSrc } = props;
  const imageOnError = useImageOnError();

  return (
    <header className={styles.header}>
      <HamburgerSVG
        className={styles.menu}
        width={24}
        height={24}
        onClick={onMenuClick}
      />
      <div className={styles.profile}>
        <img
          className={styles['profile-img']}
          src={profileSrc}
          onError={imageOnError}
        />
        <span className={styles['profile-name']}>{title}</span>
      </div>
    </header>
  );
}
