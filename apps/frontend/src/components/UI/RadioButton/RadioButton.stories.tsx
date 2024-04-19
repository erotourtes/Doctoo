import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import '../../../index.css';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Components/UI/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'radiobutton',
    disabled: false,
    id: 'radiobutton',
  },
  render: function Render(args) {
    const [{ isChecked, disabled }, updateArgs] = useArgs();

    function onClick() {
      updateArgs({ isChecked: !isChecked });
    }

    return <RadioButton {...args} onClick={onClick} checked={isChecked} disabled={disabled} />;
  },
};
