import type { Meta, StoryObj } from '@storybook/react';

import TriSectionHeader from './TriSectionHeader';

const TmpElement = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
      }}
    />
  );
};

interface TriSectionHeaderStoryArg {
  hasLeft: boolean;
  leftWidth: number;
  leftHeight: number;
  hasCenter: boolean;
  centerWidth: number;
  centerHeight: number;
  hasRight: boolean;
  rightWidth: number;
  rightHeight: number;
}
function TriSectionHeaderForStory({
  hasLeft,
  leftHeight,
  leftWidth,
  hasCenter,
  centerHeight,
  centerWidth,
  hasRight,
  rightHeight,
  rightWidth,
}: TriSectionHeaderStoryArg) {
  return (
    <TriSectionHeader
      left={
        hasLeft && (
          <TmpElement height={leftHeight} width={leftWidth} color="black" />
        )
      }
      center={
        hasCenter && (
          <TmpElement height={centerHeight} width={centerWidth} color="black" />
        )
      }
      right={
        hasRight && (
          <TmpElement height={rightHeight} width={rightWidth} color="black" />
        )
      }
    />
  );
}

const meta = {
  title: 'Common/TriSectionHeader',
  args: {
    hasLeft: true,
    leftHeight: 60,
    leftWidth: 60,
    hasCenter: true,
    centerHeight: 60,
    centerWidth: 60,
    hasRight: true,
    rightHeight: 60,
    rightWidth: 60,
  },
  component: TriSectionHeaderForStory,
} satisfies Meta<typeof TriSectionHeaderForStory>;

export default meta;
type Story = StoryObj<typeof meta>;
// type Story = StoryObj<typeof meta>;

export const BaseHeader: Story = {};
