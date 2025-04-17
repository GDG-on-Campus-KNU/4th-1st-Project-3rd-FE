import { ReactNode, useCallback } from 'react';
import { updateModalContent, updateModalOpen } from './store';

export const useModal = (children: ReactNode) => {
  const open = useCallback(() => {
    updateModalContent(children);
    updateModalOpen(true);
  }, [children]);

  const close = useCallback(() => {
    updateModalContent(null);
    updateModalOpen(false);
  }, []);

  return { open, close };
};
