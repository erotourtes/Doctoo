import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import Input from '@/components/UI/Input/Input';
import Icon from '@/components/icons/Icon';

const LoginPage = () => {
  const handleLogin = () => {};

  return (
    <div className='flex h-svh w-svw justify-center'>
      <div className='flex max-h-[700px] w-full justify-center overflow-y-auto sm:w-[60%]'>
        <form className='my-20 flex w-[340px] flex-col justify-between gap-y-6'>
          <div className='flex items-center gap-1'>
            <Icon className='size-7' variant='logo' />
            <h1 className='text-main font-syncopate text-2xl font-extrabold'>Doctoo</h1>
          </div>
          <div>
            <h1 className='mb-2 text-2xl font-bold leading-none tracking-tight'>Log In</h1>
            <p className='text-grey-1'>Welcome back! Select a method to log in:</p>
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

            <div className='text-grey-1 relative top-1 flex items-center'>
              <Separator />
              <p className='mx-2 min-w-fit'>or continue with email</p>
              <Separator />
            </div>

            <div className='space-y-4'>
              <Input type='email' label='Email' placeholder='Jhon@gmail.com' className='bg-grey-5 w-full' />
              <Input type='password' label='Password' placeholder='' className='bg-grey-5 w-full' />
            </div>
          </div>

          <div className='space-y-6'>
            <Button onClick={handleLogin} type={ButtonTypes.PRIMARY} className='w-full'>
              Log in
            </Button>
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

const Separator = () => <div className='my-auto block w-full border-b-[1px]' />;

export default LoginPage;
