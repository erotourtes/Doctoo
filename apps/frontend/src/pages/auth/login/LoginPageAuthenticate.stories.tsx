import LoginPageAuthenticate from '@/pages/auth/login/LoginPageAuthenticate';
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/AuthPage/Login-Authenticate',
  component: LoginPageAuthenticate,
};

export default meta;
type Story = StoryObj<typeof LoginPageAuthenticate>;

export const Default: Story = {
  args: {},
};
