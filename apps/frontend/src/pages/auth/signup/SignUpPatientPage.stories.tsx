import type { StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import SignUpPatientPage from './SignUpPatientPage';

const meta = {
  title: 'Pages/AuthPage/SignUpPatientPage',
  component: SignUpPatientPage,
};

export default meta;
type Story = StoryObj<typeof SignUpPatientPage>;

export const Default: Story = {
  args: {},
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
