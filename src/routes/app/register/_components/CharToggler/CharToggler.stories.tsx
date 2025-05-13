import { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import CharToggler, { CharTogglerProps } from './CharToggler';

type TmpElementProps = Pick<
  CharTogglerProps<string>,
  'upValue' | 'downValue' | 'description' | 'isLoading'
>;

const TmpElement = ({
  upValue,
  downValue,
  description,
  isLoading,
}: TmpElementProps) => {
  const [nowValue, setNowValue] = useState<string | null | undefined>(null);
  useEffect(() => {
    setNowValue(null);
  }, [upValue, downValue]);
  return (
    <CharToggler
      upValue={upValue}
      downValue={downValue}
      nowValue={nowValue}
      onToggle={(value) =>
        setNowValue((prev) => (prev === value ? null : value))
      }
      description={description}
      isLoading={isLoading}
    />
  );
};
const meta = {
  title: 'register/CharToggler',
  args: {
    upValue: 'E',
    downValue: 'I',
    description: '에너지방향',
    isLoading: false,
  },
  component: TmpElement,
} satisfies Meta<typeof TmpElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {};
