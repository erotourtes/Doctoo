import type { FC, PropsWithChildren } from 'react';
import Icon from '../../components/UI/Icon/Icon';

export const LogoWithTitle = () => {
  return (
    <div className='flex items-center gap-1'>
      <Icon className='size-7' variant='logo' />
      <h1 className='font-syncopate text-2xl font-extrabold text-main'>Doctoo</h1>
    </div>
  );
};

export const AuthCreateAccount = () => {
  return (
    <div className='mx-6 flex justify-center gap-1'>
      <p>{"Don't have an account?"}</p>
      <p className='text-main'>Create one</p>
    </div>
  );
};

export const AuthLogInIntoAccount = () => {
  return (
    <div className='mx-6 flex justify-center gap-1'>
      <p>Already have an account?</p>
      <p className='text-main'>Log In</p>
    </div>
  );
};

export const AuthMainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex h-svh w-svw justify-center'>
      <div className='m-auto flex max-h-[700px] w-full justify-center overflow-y-auto sm:w-[60%]'>{children}</div>
      <div className='hidden h-full w-[40%] bg-greeting-bg bg-cover bg-no-repeat sm:block '> </div>
    </div>
  );
};

export const Separator = () => <div className='my-auto block w-full border-b-[1px]' />;
