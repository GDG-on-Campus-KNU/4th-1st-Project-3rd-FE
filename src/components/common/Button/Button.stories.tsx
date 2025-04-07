import { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonProps } from './Button';

const TmpElement = (
  props: Pick<ButtonProps, 'isValid' | 'isLoading' | 'children'>,
) => {
  const { children, isLoading, isValid } = props;
  return (
    <Button
      isValid={isValid}
      isLoading={isLoading}
      onClick={() => alert('click!')}
    >
      {children}
    </Button>
  );
};

const meta = {
  title: 'Common/Button',
  args: {
    isValid: true,
    isLoading: false,
    children: '내용',
  },
  component: TmpElement,
} satisfies Meta<typeof TmpElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {};
