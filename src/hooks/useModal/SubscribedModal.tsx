import {
  getModalContent,
  getModalOpen,
  subscribeIsModalOpen,
  subscribeModalContent,
  updateModalOpen,
} from './store';

import { Modal } from '@_/components/common/Modal/Modal';
import { useSyncExternalStore } from 'react';

export const SubscribedModal = () => {
  const modal = useSyncExternalStore(subscribeModalContent, getModalContent);
  const isOpened = useSyncExternalStore(subscribeIsModalOpen, getModalOpen);

  if (!isOpened) return null;
  return <Modal onClose={() => updateModalOpen(false)}>{modal}</Modal>;
};
