import Icon from '@/components/icons/Icon';
import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import Input from '@/components/UI/Input/Input';
import React, { useRef } from 'react';

const EMAIL_VERIFICATION_CODE_LEN = 6;

const AuthenticateLoginPage = () => {
  const [code, setCode] = React.useState<string>('');

  return (
    <div className='flex h-svh w-svw justify-center'>
      <div className='flex max-h-[700px] w-full justify-center overflow-y-auto sm:w-[60%]'>
        <form className='my-20 flex w-[360px] flex-col justify-between gap-y-6'>
          <div className='flex items-center gap-1'>
            <Icon className='size-7' variant='logo' />
            <h1 className='text-main font-syncopate text-2xl font-extrabold'>Doctoo</h1>
          </div>
          <div>
            <h1 className='mb-2 text-xl font-medium leading-none tracking-tight'>Authenticate Your Account</h1>
            <p className='text-grey-1'>
              Protecting your account is our top priority. Please confirm your account by entering the authorization
              code sent to your email
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
            <div className='mx-6 flex justify-between'>
              <p> Don't have an account? </p>
              <p className='text-main'>Create one</p>
            </div>
          </div>
        </form>
      </div>
      <div className='bg-greeting-bg hidden h-full w-[40%] bg-cover bg-no-repeat sm:block '> </div>
    </div>
  );
};

export default AuthenticateLoginPage;
