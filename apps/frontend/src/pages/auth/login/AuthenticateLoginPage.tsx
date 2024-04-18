import Icon from '@/components/icons/Icon';
import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import Input from '@/components/UI/Input/Input';
import { LogoWithTitle, AuthMainContainer, AuthCreateAccount } from '@/pages/auth/auth-components';
import React, { useRef } from 'react';

const EMAIL_VERIFICATION_CODE_LEN = 6;

const AuthenticateLoginPage = () => {
  const [code, setCode] = React.useState<string>('');

  return (
    <AuthMainContainer>
      <form className='my-20 flex w-[360px] flex-col justify-between gap-y-6'>
        <LogoWithTitle />
        <div>
          <h1 className='mb-2 text-xl font-medium leading-none tracking-tight'>Authenticate Your Account</h1>
          <p className='text-grey-1'>
            Protecting your account is our top priority. Please confirm your account by entering the authorization code
            sent to your email
          </p>
        </div>

        <div>
          {/*  TODO: when input will be ready */}
          <Input
            type='text'
            placeholder='___'
            className='bg-background flex h-12 w-12 items-center justify-center font-black'
          />
        </div>

        <div>
          <p>
            It may take a minute to receive your code. Haven’t received it?{' '}
            <span className='text-main'>Resend a new code</span>
          </p>
        </div>

        <div className='space-y-6'>
          <div className='flex justify-around'>
            <Button onClick={() => {}} type={ButtonTypes.SECONDARY} className='w-[150px]'>
              Back
            </Button>
            <Button
              disabled={code.length != EMAIL_VERIFICATION_CODE_LEN}
              onClick={() => {}}
              type={ButtonTypes.PRIMARY}
              className='w-[150px]'
            >
              Submit
            </Button>
          </div>
          <AuthCreateAccount />
        </div>
      </form>
    </AuthMainContainer>
  );
};

export default AuthenticateLoginPage;
