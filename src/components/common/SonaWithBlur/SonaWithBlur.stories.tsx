import type { Meta, StoryObj } from '@storybook/react';

import SonaWithBlur from './SonaWithBlur';

const meta: Meta<typeof SonaWithBlur> = {
  title: 'Common/SonaWithBlur',
  component: SonaWithBlur,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'sleep',
        'INFP',
        'INFJ',
        'INTP',
        'INTJ',
        'ISFP',
        'ISFJ',
        'ISTP',
        'ISTJ',
        'ENFP',
        'ENFJ',
        'ENTP',
        'ENTJ',
        'ESFP',
        'ESFJ',
        'ESTP',
        'ESTJ',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SonaWithBlur>;

export const Default: Story = {
  args: {
    type: 'sleep',
    width: 127,
    height: 121,
  },
};

export const Large: Story = {
  args: {
    type: 'sleep',
    width: 200,
    height: 190,
  },
};

export const Small: Story = {
  args: {
    type: 'sleep',
    width: 64,
    height: 61,
  },
};
