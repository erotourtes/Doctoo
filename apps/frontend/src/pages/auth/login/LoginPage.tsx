import { Button, Icon, Input } from '@/components/UI';
import {
  AuthCreateAccount,
  AuthMainContainer,
  ErrorMessage,
  LogoWithTitle,
  Separator,
} from '@/pages/auth/auth-components';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { API_URL, instance } from '../../../api/axios.api';

type SignInType = {
  email: string;
  password: string;
};
const userLogInSchema = Joi.object<SignInType>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    })
    .required(),
  password: Joi.string()
    .min(6)
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
    })
    .required(),
});

const LoginPage = () => {
  const location = useLocation();
  console.log(location);
  const form = useForm<SignInType>({
    mode: 'onSubmit',
    defaultValues: {
      email: location.state?.email || '',
      password: location.state?.password || '',
    },
    resolver: joiResolver(userLogInSchema),
  });
  const errors = form.formState.errors;
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onLogin: SubmitHandler<FieldValues> = async credentials => {
    await instance
      .post('/auth/login/patient', credentials, { withCredentials: true })
      .then(body => {
        const is2faEnabled: boolean = body.data.is2faEnabled;
        if (is2faEnabled) navigate(`/login/authenticate`, { state: { credentials } });
        else navigate('/', { replace: true });
      })
      .catch(e => {
        if (e.response) setServerError(e.response.data.message);
        else setServerError('Something went wrong');
      });
  };

  const onGoogleLogin = () => {
    window.open(`${API_URL}/auth/login/google`, '_self');
  };
  const onFacebookLogin = () => {};

  return (
    <AuthMainContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className='flex w-[340px] flex-col justify-between gap-y-6'>
          <LogoWithTitle />
          <div>
            <h1 className='mb-2 leading-none tracking-tight'>Log In</h1>
            <p className='text-grey-1'>Welcome back! Select a method to log in:</p>
          </div>

          <div className='space-y-6'>
            <div className='flex justify-around'>
              <Button btnType='button' onClick={onGoogleLogin} type='secondary' className='w-[150px]'>
                <div className='flex gap-2'>
                  <Icon variant='google' />
                  Google
                </div>
              </Button>
              <Button btnType='button' onClick={onFacebookLogin} type='secondary' className='w-[150px]'>
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
                id='email'
                type='email'
                label='Email'
                placeholder='John@gmail.com'
                errorMessage={errors.email?.message}
              />
              <Input
                id='password'
                type='password'
                label='Password'
                placeholder=''
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <ErrorMessage message={serverError} />

          <div className='space-y-6'>
            <Button btnType='submit' type='primary' className='w-full'>
              Log in
            </Button>
            <AuthCreateAccount />
          </div>
        </form>
      </FormProvider>
    </AuthMainContainer>
  );
};

export default LoginPage;
