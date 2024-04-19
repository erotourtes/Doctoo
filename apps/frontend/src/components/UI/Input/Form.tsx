import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from './Input';

interface LoginData {
  emailInput: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [emailInput, setEmailInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit: SubmitHandler<LoginData> = data => {
    console.log(data);
    setEmailInput('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='email'
        label='Email'
        placeholder='Email'
        value={emailInput}
        setValue={setEmailInput}
        error={errors.emailInput?.message}
        {...register('emailInput', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      <input
        type='password'
        placeholder='Password'
        {...register('password', { required: 'Password is required' })}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
