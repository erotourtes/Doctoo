import { useLocation, useNavigate } from 'react-router';
import { instance } from '@/api/axios.api';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, useForm } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { ErrorMessage } from '../auth-components';
import { useState } from 'react';
import { Button, Input } from '@/components/UI';

const SignUpPatientPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');
  if (!token) {
    alert('Token is required');
    return null;
  }
  return <SignUpPageOrig token={token} />;
};

type Patient = {
  weight: number;
  height: number;
  age: number;
  bloodType: string;
  gender: string;
  country: string;
  city: string;
  street: string;
};

const patientScheme = Joi.object<Patient>({
  weight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  bloodType: Joi.string()
    .valid('O_PLUS', 'O_MINUS', 'A_PLUS', 'A_MINUS', 'B_PLUS', 'B_MINUS', 'AB_PLUS', 'AB_MINUS')
    .required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
});

const SignUpPageOrig = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const form = useForm<Patient>({
    resolver: joiResolver(patientScheme),
  });
  const errors = form.formState.errors;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (body: Patient) => {
    await instance
      .post(`/auth/signup/patient/${token}`, body, {
        withCredentials: true,
      })
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(e => {
        if (e.response) setServerError(e.response.data.message);
        else setServerError('Something went wrong');
      });
  };

  return (
    <div className='flex h-svh w-svw justify-center'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='m-auto w-[700px]'>
          <h2>Continue your registration</h2>
          <Input id='weight' type='text' errorMessage={errors.weight?.message} label='Weight' />
          <Input id='height' type='text' errorMessage={errors.height?.message} label='Height' />
          <Input id='age' type='text' errorMessage={errors.age?.message} label='Age' />

          <p className={cn('text-md my-2 block text-grey-1')}>Blood type</p>
          <select
            {...form.register('bloodType')}
            defaultValue=''
            className={cn(
              `w-full rounded-lg bg-background py-2 pl-4 pr-10 text-base text-text hover:border focus:border focus:outline-none`,
              errors.bloodType?.message && 'border border-solid border-error',
            )}
          >
            <option disabled value=''>
              Select blood type
            </option>
            <option value='O_PLUS'>O+</option>
            <option value='O_MINUS'>O-</option>
            <option value='A_PLUS'>A+</option>
            <option value='A_MINUS'>A-</option>
            <option value='B_PLUS'>B+</option>
            <option value='B_MINUS'>B-</option>
            <option value='AB_PLUS'>AB+</option>
            <option value='AB_MINUS'>AB-</option>
          </select>
          <ErrorMessage message={errors.bloodType?.message} />

          <p className={cn('text-md my-2 block text-grey-1')}>Gender</p>
          <select
            {...form.register('gender')}
            defaultValue=''
            className={cn(
              `w-full rounded-lg bg-background py-2 pl-4 pr-10 text-base text-text hover:border focus:border focus:outline-none`,
              errors.bloodType?.message && 'border border-solid border-error',
            )}
          >
            <option value='' disabled>
              Select gender
            </option>
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
          </select>
          <ErrorMessage message={errors.gender?.message} />

          <Input id='country' type='text' errorMessage={errors.country?.message} label='Country' />
          <Input id='city' type='text' errorMessage={errors.city?.message} label='City' />
          <Input id='street' type='text' errorMessage={errors.street?.message} label='Street' />

          <ErrorMessage message={serverError} />

          <Button btnType='submit' type='primary' className='mt-3'>
            Sign Up
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPatientPage;
