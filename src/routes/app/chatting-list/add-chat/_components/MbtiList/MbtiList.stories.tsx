import type { Meta, StoryObj } from '@storybook/react';

import MbtiList from './MbtiList';

const meta: Meta<typeof MbtiList> = {
  title: 'add-chat/MbtiList',
  component: MbtiList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '300px', height: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MbtiList>;

export const Default: Story = {
  args: {
    mbtiList: ['INFP', 'INFJ', 'INTP', 'ENFP'],
    addMbti: (mbti) => alert('MBTI 추가: ' + mbti),
  },
};

export const Empty: Story = {
  args: {
    mbtiList: [],
    addMbti: (mbti) => alert(`MBTI 추가: ${mbti}`),
  },
};

export const FullList: Story = {
  args: {
    mbtiList: [
      'INFP',
      'INFJ',
      'INTP',
      'INTJ',
      'ISFP',
      'ISFJ',
      'ISTP',
      'ISTJ',
      'ENFP',
      'ENFJ',
      'ENTP',
      'ENTJ',
      'ESFP',
      'ESFJ',
      'ESTP',
      'ESTJ',
    ],
    addMbti: (mbti) => alert('MBTI 추가:' + mbti),
  },
};
