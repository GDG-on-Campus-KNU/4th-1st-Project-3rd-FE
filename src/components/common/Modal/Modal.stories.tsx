import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';

const ModalWithHooks = () => {
  const [_, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <Modal onClose={() => setIsOpen(false)}>
        <div>
          <h2 style={{ margin: '0 0 16px 0' }}>모달 제목</h2>
          <p style={{ margin: '0 0 24px 0' }}>
            모달의 내용이 여기에 들어갑니다. children으로 전달되는 컨텐츠는
            자유롭게 구성할 수 있습니다.
          </p>
        </div>
      </Modal>
    </div>
  );
};

const LongContentModal = () => {
  const [_, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>긴 컨텐츠 모달 열기</button>
      <Modal onClose={() => setIsOpen(false)}>
        <div>
          <h2 style={{ margin: '0 0 16px 0' }}>긴 컨텐츠 모달</h2>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} style={{ margin: '0 0 16px 0' }}>
              {index + 1}번째 문단입니다. 모달의 스크롤 동작을 테스트하기 위한
              긴 컨텐츠입니다. 모달의 최대 높이를 초과하면 스크롤이 생성됩니다.
            </p>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const meta = {
  title: 'Common/Modal',
  component: ModalWithHooks,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalWithHooks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongContent: Story = {
  render: () => <LongContentModal />,
};
