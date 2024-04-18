import AuthenticateLoginPage from '@/pages/auth/login/AuthenticateLoginPage';
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/AuthPage/Login-Authenticate',
  component: AuthenticateLoginPage,
};

export default meta;
type Story = StoryObj<typeof AuthenticateLoginPage>;

export const Default: Story = {
  args: {},
};
