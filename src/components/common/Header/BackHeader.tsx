import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useCallback,
} from 'react';

import { useNavigate } from 'react-router-dom';

import SolidArrowHeadSVG from '../svgs/SolidArrowHeadSVG';
import styles from './BackHeader.module.css';

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement> {
  menu?: ReactNode;
  onBack?: () => void;
}

export default function ControlledInput(props: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = useCallback(
    // navigate의 오버로딩이 충분히 구현되어있지 않기 때문에 as 사용
    () => navigate(-1),
    [navigate],
  );
  const {
    children,
    onBack = handleBack,
    style,
    className,
    ...restProps
  } = props;

  return (
    <header
      className={[styles.header, className].join(' ')}
      style={style}
      {...restProps}
    >
      <SolidArrowHeadSVG
        direction="left"
        className={styles.menu}
        onClick={onBack}
      />
      <div className={styles.children}>{children}</div>
    </header>
  );
}
