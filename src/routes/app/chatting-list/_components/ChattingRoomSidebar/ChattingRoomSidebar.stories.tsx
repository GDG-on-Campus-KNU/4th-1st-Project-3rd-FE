import type { Meta, StoryObj } from '@storybook/react';

import ChattingRoomSidebar from './ChattingRoomSidebar';

const Result = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: 'grey' }}>
      <ChattingRoomSidebar
        email={'test@test.com'}
        logout={() => alert('로그아웃')}
        cancel={() => alert('회원탈퇴')}
      />
    </div>
  );
};

const meta = {
  title: 'Chat/ChattingRoomSidebar',
  component: Result,
} satisfies Meta<typeof Result>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Result />,
};
