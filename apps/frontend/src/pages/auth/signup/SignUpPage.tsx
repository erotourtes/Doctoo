import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import { AuthMainContainer, LogoWithTitle, Separator, AuthLogInIntoAccount } from '@/pages/auth/auth-components';
import Icon from '../../../components/UI/Icon/Icon';
import InputPassword from '../../../components/UI/Input/InputPassword';
import { FormProvider, useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import PopupDoctoo from '../../../components/UI/Popup/Popup';
import { useState } from 'react';

type SignUpType = {
  email: string;
  password: string;
  fullName: string;
};
const userSignUpSchema = Joi.object<SignUpType>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(1).required(),
});

const SignUpPage = () => {
  const form = useForm<SignUpType>({
    mode: 'onSubmit',
    resolver: joiResolver(userSignUpSchema),
  });
  const errors = form.formState.errors;

  const [open, setOpen] = useState(false);

  const onSubmit = (data: SignUpType) => {
    console.log(data);
    setOpen(true);
  };

  const onGoogleSignUp = () => {};
  const onFacebookSignUp = () => {};

  return (
    <AuthMainContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-[340px] flex-col justify-between gap-y-6'>
          <LogoWithTitle />
          <div>
            <h1 className='mb-2 text-2xl font-bold leading-none tracking-tight'>Create account</h1>
            <p className='text-grey-1'>Select a method to create account:</p>
          </div>

          <div className='space-y-6'>
            <div className='flex justify-around'>
              <Button btnType='button' onClick={onGoogleSignUp} type='secondary' className='w-[150px]'>
                <div className='flex gap-2'>
                  <Icon variant='google' />
                  Google
                </div>
              </Button>
              <Button btnType='button' onClick={onFacebookSignUp} type='secondary' className='w-[150px]'>
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
              <Input type='text' label='Name and Surname' id='fullName' placeholder='John Smith' />
              <Input
                type='email'
                label='Email'
                id='email'
                placeholder='john@gmail.com'
                errorMessage={errors.email?.message}
              />
              <InputPassword label='Password' id='password' errorMessage={errors.password?.message} />
            </div>
          </div>

          <div className='space-y-6'>
            <Button btnType='submit' onClick={() => {}} type='primary' className='w-full'>
              Create account
            </Button>
            <AuthLogInIntoAccount />
          </div>
        </form>
      </FormProvider>

      <PopupDoctoo modalBodyClassName='' closePopup={() => setOpen(false)} popupIsOpen={open}>
        <h2 className='mb-3'>Confirm your account</h2>
        <p>The confirmation link has been sent to your email. Please, check your email and confirm your account</p>
      </PopupDoctoo>
    </AuthMainContainer>
  );
};

export default SignUpPage;
