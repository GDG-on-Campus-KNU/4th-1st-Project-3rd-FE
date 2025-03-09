import type { Meta, StoryObj } from '@storybook/react';

import MessageTextArea from './MessageTextArea';

const MockedTextArea = () => {
  return <MessageTextArea onSubmit={alert} textLimit={120} />;
};
const meta = {
  title: 'Chat/mbti/MessageTextArea',

  component: MockedTextArea,
} satisfies Meta<typeof MockedTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BaseHeader: Story = {};
