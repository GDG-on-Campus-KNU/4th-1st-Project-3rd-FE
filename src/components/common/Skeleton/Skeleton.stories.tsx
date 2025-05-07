import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from './Skeleton';

const meta = {
  title: 'Common/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Skeleton
      style={{ width: '100px', height: '100px', borderRadius: '30px' }}
    />
  ),
};
