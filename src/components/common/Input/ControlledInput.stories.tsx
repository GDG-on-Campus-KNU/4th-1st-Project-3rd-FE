import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import ControlledInput from './ControlledInput';

interface TmpProps {
  inputType: 'normal' | 'disabled' | 'error';
  placeholder: string;
}
const TmpElement = (props: TmpProps) => {
  const { inputType, placeholder } = props;
  const [value, setValue] = useState('');

  return (
    <ControlledInput
      disabled={inputType === 'disabled'}
      isError={inputType === 'error'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const meta = {
  title: 'Common/ControlledInput',
  args: {
    placeholder: '내용을 입력하세요',
    inputType: 'normal',
  },
  argTypes: {
    inputType: {
      control: 'select',
      options: ['normal', 'disabled', 'error', 'loading'],
    },
  },
  component: TmpElement,
} satisfies Meta<typeof TmpElement>;

export default meta;
type Story = StoryObj<typeof meta>;
// type Story = StoryObj<typeof meta>;

export const input: Story = {};
