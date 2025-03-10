import type { Meta, StoryObj } from '@storybook/react';

import ChatDayDiv, { ChatDayDivProps } from './ChatDayDiv';

const MockedChatDayDiv = (props: ChatDayDivProps) => {
  return (
    <div style={{ backgroundColor: '#F1F1F1', padding: '10px' }}>
      <ChatDayDiv {...props} />
    </div>
  );
};

const meta = {
  title: 'Chat/mbti/ChatDayDiv',

  component: MockedChatDayDiv,
} satisfies Meta<typeof MockedChatDayDiv>;

export default meta;
type Story = StoryObj<typeof meta>;
const timeStringRaw = new Date().toISOString();
const dotIndex = timeStringRaw.indexOf('.');

const timeString =
  dotIndex === -1 ? timeStringRaw : timeStringRaw.slice(0, dotIndex);
export const BaseHeader: Story = {
  args: {
    timeISO: timeString,
  },
};
