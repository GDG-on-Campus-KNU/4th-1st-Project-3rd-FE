import { Meta, StoryObj } from '@storybook/react';

import SolidStepIndicator from './SolidStepIndicator';

const meta = {
  title: 'Common/SolidStepIndicator',
  args: {
    maxStep: 5,
    nowStep: 1,
  },
  component: SolidStepIndicator,
} satisfies Meta<typeof SolidStepIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {};
