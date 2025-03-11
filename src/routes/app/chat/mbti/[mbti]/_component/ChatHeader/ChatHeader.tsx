import { HTMLProps } from 'react';

import HamburgerSVG from '@_/components/common/svgs/HamburgerSVG';
import useImageOnError from '@_/hooks/useImageOnError';

import styles from './ChatHeader.module.css';

export interface ChatHeaderProps extends HTMLProps<HTMLElement> {
  onMenuClick: () => void;
  title: string;
  profileSrc?: string;
}

const WRONG_SRC = '/wrong';

export default function ChatHeader(props: ChatHeaderProps) {
  const { onMenuClick, title, profileSrc, className, style, ...restProps } =
    props;
  const imageOnError = useImageOnError();

  return (
    <header
      className={[styles.header, className].join(' ')}
      style={style}
      {...restProps}
    >
      <HamburgerSVG
        className={styles.menu}
        width={24}
        height={24}
        onClick={onMenuClick}
      />
      <div className={styles.profile}>
        <img
          className={styles['profile-img']}
          src={profileSrc || WRONG_SRC}
          onError={imageOnError}
        />
        <span className={styles['profile-name']}>{title}</span>
      </div>
    </header>
  );
}
