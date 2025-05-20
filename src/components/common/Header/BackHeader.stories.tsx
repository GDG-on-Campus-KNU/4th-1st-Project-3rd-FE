import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import BackHeader from './BackHeader';

const TmpElement = ({ str }: { str: string }) => {
  return (
    <BrowserRouter>
      <BackHeader onBack={() => alert('back!')}>{str}</BackHeader>
    </BrowserRouter>
  );
};

const meta = {
  title: 'Common/Header',

  component: TmpElement,
} satisfies Meta<typeof TmpElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const header: Story = {
  args: { str: '헤더' },
};
