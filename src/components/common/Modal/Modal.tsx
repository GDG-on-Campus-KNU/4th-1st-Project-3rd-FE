import { ReactNode, useLayoutEffect, useRef } from 'react';

import styles from './Modal.module.css';

export interface ModalProps {
  children: ReactNode;
  dimmerColor?: string;
  onClose: () => void;
}

export function Modal({ children, dimmerColor, onClose }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!backdropRef.current) return;
    const parentElement = backdropRef.current.parentElement;
    if (!parentElement) return;
    const beforeParentOverFlow = parentElement.style.overflow;
    parentElement.style.overflow = 'hidden';

    return () => {
      parentElement.style.overflow = beforeParentOverFlow;
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      ref={backdropRef}
      style={{ backgroundColor: dimmerColor || `rgb(0 0 0 / 40%)` }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
