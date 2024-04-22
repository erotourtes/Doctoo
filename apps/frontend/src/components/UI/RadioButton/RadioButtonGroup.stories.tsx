import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../index.css';
import RadioButtonGroup from './RadioButtonGroup';

const meta = {
  title: 'Components/UI/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    groupName: {
      control: 'text',
    },
    options: {
      control: 'object',
    },
  },
  args: { setSelected: fn() },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    groupName: 'group',
    selected: null,
  },
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs();

    function setSelected(value: string | null) {
      updateArgs({ selected: value });
    }

    return <RadioButtonGroup {...args} selected={selected} setSelected={setSelected} className='flex flex-col gap-3' />;
  },
};
