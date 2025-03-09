import type { Meta, StoryObj } from '@storybook/react';

import ChatBubble, { ChatBubbleProps } from './ChatBubble';

type MockedBubbleProps = Omit<ChatBubbleProps, 'content'> & { content: string };
const MockedBubble = (props: MockedBubbleProps) => {
  return (
    <div style={{ backgroundColor: '#F1F1F1', padding: '10px' }}>
      <ChatBubble {...props} />
    </div>
  );
};
const meta = {
  title: 'Chat/mbti/ChatBubble',

  component: MockedBubble,
} satisfies Meta<typeof MockedBubble>;

export default meta;
type Story = StoryObj<typeof meta>;
const timeStringRaw = new Date().toISOString();
const dotIndex = timeStringRaw.indexOf('.');

const timeString =
  dotIndex === -1 ? timeStringRaw : timeStringRaw.slice(0, dotIndex);
export const BaseHeader: Story = {
  args: {
    content: '123123',
    isUserChat: false,
    timeISO: timeString,
  },
};
