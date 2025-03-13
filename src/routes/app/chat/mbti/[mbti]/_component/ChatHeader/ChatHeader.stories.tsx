import type { Meta, StoryObj } from '@storybook/react';

import fallback from '@_/images/imageErrorTmpFallback.avif';

import ChatHeader, { ChatHeaderProps } from './ChatHeader';

type MockedHeaderProps = Omit<ChatHeaderProps, 'onMenuClick'>;
const MockedHeader = (props: MockedHeaderProps) => {
  return <ChatHeader onMenuClick={() => {}} {...props} />;
};
const meta = {
  title: 'Chat/mbti/ChatHeader',

  component: MockedHeader,
} satisfies Meta<typeof MockedHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseHeader: Story = {
  args: {
    title: 'ISFJ',
    profileSrc: fallback,
  },
};
