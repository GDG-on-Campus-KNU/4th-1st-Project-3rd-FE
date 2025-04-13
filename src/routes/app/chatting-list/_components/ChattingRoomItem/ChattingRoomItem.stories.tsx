import type { Meta, StoryObj } from '@storybook/react';

import { ChattingRoomItem } from './ChattingRoomItem';

const meta = {
  title: 'Chat/ChattingRoomItem',
  component: ChattingRoomItem,
  args: {
    mbti: 'ENFJ',
    lastMessage: '안녕하세요! 오늘 하루는 어떠셨나요?',
    isViewed: false,
    onChattingRoomClick: () => alert('채팅방 클릭!'),
    onRefresh: () => alert('새로고침!'),
    onDelete: () => alert('삭제!'),
  },
  argTypes: {
    mbti: {
      control: 'select',
      options: [
        'ENFJ',
        'ENFP',
        'ENTJ',
        'ENTP',
        'ESFJ',
        'ESFP',
        'ESTJ',
        'ESTP',
        'INFJ',
        'INFP',
        'INTJ',
        'INTP',
        'ISFJ',
        'ISFP',
        'ISTJ',
        'ISTP',
      ],
      description: 'MBTI 유형',
    },
    lastMessage: {
      control: 'text',
      description: '마지막 메시지',
    },
    isViewed: {
      control: 'boolean',
      description: '읽음 여부',
    },
    className: {
      control: 'text',
      description: '추가 클래스명',
    },
    style: {
      control: 'object',
      description: '추가 스타일',
    },
  },
} satisfies Meta<typeof ChattingRoomItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Viewed: Story = {
  args: {
    isViewed: true,
  },
};

export const NoLastMessage: Story = {
  args: {
    lastMessage: null,
    isViewed: true,
  },
};

export const LongMessage: Story = {
  args: {
    lastMessage:
      '안녕하세요! 긴 메시지를 보내보겠습니다. 이 메시지는 말줄임표로 처리되어야 합니다. 실제로는 이렇게 긴 메시지가 올 수 있습니다.',
  },
};
