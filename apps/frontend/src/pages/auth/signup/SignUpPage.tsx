import Icon from '@/components/icons/Icon';
import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import Input from '@/components/UI/Input/Input';
import { AuthMainContainer, LogoWithTitle, Separator, AuthLogInIntoAccount } from '@/pages/auth/auth-components';

const SignUpPage = () => {
  return (
    <AuthMainContainer>
      <form className='my-20 flex w-[340px] flex-col justify-between gap-y-6'>
        <LogoWithTitle />
        <div>
          <h1 className='mb-2 text-2xl font-bold leading-none tracking-tight'>Create account</h1>
          <p className='text-grey-1'>Select a method to create account:</p>
        </div>

        <div className='space-y-6'>
          <div className='flex justify-around'>
            <Button onClick={() => {}} type={ButtonTypes.SECONDARY} className='w-[150px]'>
              <div className='flex gap-2'>
                <Icon variant='google' />
                Google
              </div>
            </Button>
            <Button onClick={() => {}} type={ButtonTypes.SECONDARY} className='w-[150px]'>
              <div className='flex gap-2'>
                <Icon variant='facebook' />
                Facebook
              </div>
            </Button>
          </div>

          <div className='relative top-1 flex items-center text-grey-1'>
            <Separator />
            <p className='mx-2 min-w-fit'>or continue with email</p>
            <Separator />
          </div>

          <div className='space-y-4'>
            <Input type='text' label='Name and Surname' placeholder='John Smith' className='w-full bg-grey-5' />
            <Input type='email' label='Email' placeholder='john@gmail.com' className='w-full bg-grey-5' />
            <Input type='password' label='Password' placeholder='' className='w-full bg-grey-5' />
          </div>
        </div>

        <div className='space-y-6'>
          <Button onClick={() => {}} type={ButtonTypes.PRIMARY} className='w-full'>
            Create account
          </Button>
          <AuthLogInIntoAccount />
        </div>
      </form>
    </AuthMainContainer>
  );
};

export default SignUpPage;
