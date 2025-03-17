import { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonProps } from './Button';

const TmpElement = (props: Pick<ButtonProps, 'isValid' | 'children'>) => {
  const { children, isValid } = props;
  return (
    <Button isValid={isValid} onClick={() => alert('click!')}>
      {children}
    </Button>
  );
};

const meta = {
  title: 'Common/Button',
  args: {
    isValid: true,
    children: '내용',
  },
  component: TmpElement,
} satisfies Meta<typeof TmpElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {};
