import type { Meta, StoryObj } from '@storybook/react';

import ChattingList from './ChattingList';

const meta = {
  title: 'Chat/ChattingList',
  component: ChattingList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initChat: { action: 'initChat' },
    deleteChat: { action: 'deleteChat' },
    onChattingRoomClick: { action: 'onChattingRoomClick' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'calc(100vw - 32px)', boxSizing: 'border-box' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChattingList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chattingPreviews: [
      {
        mbti: 'ENTP',
        lastMessage: '안녕하세요!',
        isViewed: false,
      },
      {
        mbti: 'INTJ',
        lastMessage: '코드 리뷰 부탁드립니다.',
        isViewed: true,
      },
      {
        mbti: 'ISTP',
        lastMessage: '코드 리뷰 부탁드립니다.',
        isViewed: true,
      },
    ],
    initChat: (mbti) => alert('initChat ' + mbti),
    deleteChat: (mbti) => alert('deleteChat ' + mbti),
    onChattingRoomClick: (mbti) => alert('onChattingRoomClick ' + mbti),
  },
};
