import { Button, Icon, Input, InputPassword, PopupDoctoo } from '@/components/UI';
import {
  AuthLogInIntoAccount,
  AuthMainContainer,
  ErrorMessage,
  LogoWithTitle,
  Separator,
} from '@/pages/auth/auth-components';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { API_URL, instance } from '../../../api/axios.api';

type SignUpType = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
};

const userSignUpSchema = Joi.object<SignUpType>({
  email: Joi.string()
    .email({ tlds: false })
    .messages({
      'string.email': 'Please enter a valid email',
      'string.empty': 'Please enter your email',
    })
    .required(),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Please enter your password',
  }),
  phone: Joi.string()
    .regex(/^\+?\d{10,}$/)
    .messages({ 'string.pattern.base': 'Phone number must have 10 digits.' })
    .required(),
  fullName: Joi.string()
    .min(3)
    .max(30)
    .regex(/^\w+\s+\w+$/)
    .required()
    .messages({
      'string.pattern.base': 'Please enter your first and last name space separated',
      'string.empty': 'Please enter your first and last name',
    }),
});

const SignUpPage = () => {
  const form = useForm<SignUpType>({
    mode: 'onSubmit',
    resolver: joiResolver(userSignUpSchema),
  });
  const errors = form.formState.errors;
  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: SignUpType) => {
    const [firstName, lastName] = data.fullName.split(' ');
    await instance
      .post(
        '/auth/signup',
        {
          firstName: firstName,
          lastName: lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          role: 'PATIENT',
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        setOpen(true);
      })
      .catch(e => {
        if (e.response) setServerError(e.response.data.message);
        else setServerError('Something went wrong');
      });
  };

  const onGoogleSignUp = async () => {
    window.open(`${API_URL}/auth/login/google`, '_self');
  };
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
              <Input
                type='text'
                label='Name and Surname'
                id='fullName'
                placeholder='John Smith'
                errorMessage={errors.fullName?.message}
              />
              <Input
                type='email'
                label='Email'
                id='email'
                placeholder='john@gmail.com'
                errorMessage={errors.email?.message}
              />
              <Input
                type='phone'
                label='Phone'
                id='phone'
                placeholder='+380501804050'
                errorMessage={errors.phone?.message}
              />
              <InputPassword label='Password' id='password' errorMessage={errors.password?.message} />
            </div>
          </div>

          <ErrorMessage message={serverError} />

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
