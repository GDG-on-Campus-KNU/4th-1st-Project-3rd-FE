import type { Meta, StoryObj } from '@storybook/react';

import MessageTextArea, { MessageTextAreaProps } from './MessageTextArea';

type MockedTextAreaProps = Pick<MessageTextAreaProps, 'maxTextAreaHeight'>;
const MockedTextArea = ({ maxTextAreaHeight }: MockedTextAreaProps) => {
  return (
    <div style={{ backgroundColor: '#F1F1F1', padding: '10px' }}>
      <MessageTextArea
        onSubmit={alert}
        textLimit={120}
        maxTextAreaHeight={maxTextAreaHeight}
      />
    </div>
  );
};
const meta = {
  title: 'Chat/mbti/MessageTextArea',

  args: {
    maxTextAreaHeight: 64,
  },
  component: MockedTextArea,
} satisfies Meta<typeof MockedTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BaseHeader: Story = {};
