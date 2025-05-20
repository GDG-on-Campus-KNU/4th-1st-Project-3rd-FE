import type { Meta, StoryObj } from '@storybook/react';

import SONASvg, { SONAType } from './SONASvg';

const options: SONAType[] = [
  'talk',
  'sad',
  'complete',
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
];

const meta: Meta<typeof SONASvg> = {
  title: 'Common/SonaSVG',
  component: SONASvg,
  argTypes: {
    type: {
      control: 'select',
      options: options,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SONASvg>;

export const Default: Story = {
  args: { type: 'talk' },
  render(props) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          height: 300,
          backgroundColor: 'blue',
        }}
      >
        <SONASvg type={props.type} style={{ backgroundColor: 'white' }} />
      </div>
    );
  },
};
