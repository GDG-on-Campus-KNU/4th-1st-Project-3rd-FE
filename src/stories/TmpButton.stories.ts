import type { Meta, StoryObj } from '@storybook/react';

import TmpButton, { ButtonProps } from '@_/stories/TmpButton';

const meta = {
  title: 'Example/Page',
  component: TmpButton,
  argTypes: {
    value: { control: 'text' }, // value만 허용
  },
} satisfies Meta<typeof TmpButton>;

export default meta;
type Story = StoryObj<Omit<ButtonProps, 'onClick'>>;
// type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    value: '123312',
  },
};
