import { ReactNode } from 'react';

let modalContent: React.ReactNode = null;
let modalListeners: (() => void) | undefined;

export const notifyModalContent = () => {
  modalListeners?.();
};

export const subscribeModalContent = (listener: () => void) => {
  if (!modalListeners) return () => {};
  modalListeners = listener;
  return () => {
    modalListeners = undefined;
  };
};

export const updateModalContent = (content: ReactNode) => {
  modalContent = content;
  notifyModalContent();
};

export const getModalContent = () => {
  return modalContent;
};

let isModalOpen = false;
let isModalOpenListeners: (() => void) | undefined;

export const notifyIsModalOpen = () => {
  isModalOpenListeners?.();
};

export const subscribeIsModalOpen = (listener: () => void) => {
  if (!isModalOpenListeners) return () => {};
  isModalOpenListeners = listener;
  return () => {
    isModalOpenListeners = undefined;
  };
};

export const updateModalOpen = (open: boolean) => {
  isModalOpen = open;
  notifyIsModalOpen();
};

export const getModalOpen = () => {
  return isModalOpen;
};
