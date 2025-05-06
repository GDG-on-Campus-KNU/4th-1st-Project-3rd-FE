import type { Meta, StoryObj } from '@storybook/react';

import WaitingDot from './WaitingDot';

const meta = {
  title: 'Common/Dot',
  component: WaitingDot,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WaitingDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
