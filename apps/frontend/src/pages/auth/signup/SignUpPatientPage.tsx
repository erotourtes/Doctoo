import { Button, Input } from '@/components/UI';
import { cn } from '@/utils/cn';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router';
import api from '../../../app/api';
import { BloodType, Gender } from '../../../dataTypes/Patient';
import { AuthMainContainer, ErrorMessage } from '../auth-components';

const SignUpPatientPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');
  if (!token) return <Navigate to='/signup' replace />;
  return <SignUpPageOrig token={token} />;
};

type Patient = {
  weight: number;
  height: number;
  age: number;
  bloodType: keyof typeof BloodType;
  gender: keyof typeof Gender;
  country: string;
  city: string;
  street: string;
};

const patientScheme = Joi.object<Patient>({
  weight: Joi.number().min(30).max(1000).required(),
  height: Joi.number().min(50).max(300).required(),
  age: Joi.number().min(18).max(130).required(),
  bloodType: Joi.string()
    .valid(...Object.keys(BloodType))
    .required()
    .messages({ 'any.only': 'Please select blood type' }),
  gender: Joi.string()
    .valid(...Object.keys(Gender))
    .required()
    .messages({ 'any.only': 'Please select you gender' }),
  country: Joi.string().min(3).max(100).required(),
  city: Joi.string().min(3).max(100).required(),
  street: Joi.string().min(3).max(100).required(),
});

const SignUpPageOrig = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const form = useForm<Patient>({
    resolver: joiResolver(patientScheme),
  });
  const errors = form.formState.errors;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (body: Patient) => {
    const { error } = await api.POST('/auth/signup/patient/{token}', {
      body,
      params: { path: { token } },
    });

    if (error) {
      const message = Array.isArray(error.message) ? error.message.join('\n') : error.message;
      setServerError(message);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <AuthMainContainer>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='lg:min-w[700px] my-6 min-w-[300px] max-w-[700px] space-y-3 md:min-w-[400px]'
        >
          <h2>Continue your registration</h2>
          <Input id='weight' type='text' errorMessage={errors.weight?.message} label='Weight' />
          <Input id='height' type='text' errorMessage={errors.height?.message} label='Height' />
          <Input id='age' type='text' errorMessage={errors.age?.message} label='Age' />

          <div>
            <p className={cn('text-md my-2 block text-grey-1')}>Blood type</p>
            <select
              {...form.register('bloodType')}
              defaultValue=''
              className={cn(
                `w-full rounded-lg border border-transparent bg-background py-2 pl-4 pr-10 text-base text-text hover:border-text focus:border-text focus:outline-none`,
                errors.bloodType?.message && 'border border-solid border-error',
              )}
            >
              <option disabled value=''>
                Select blood type
              </option>
              {Object.keys(BloodType).map(key => (
                <option key={key} value={key}>
                  {BloodType[key as keyof typeof BloodType]}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.bloodType?.message} />
          </div>

          <div>
            <p className={cn('text-md my-2 block text-grey-1')}>Gender</p>
            <select
              {...form.register('gender')}
              defaultValue=''
              className={cn(
                `w-full rounded-lg border border-transparent bg-background py-2 pl-4 pr-10 text-base text-text hover:border-text focus:border-text focus:outline-none`,
                errors.bloodType?.message && 'border border-solid border-error',
              )}
            >
              <option value='' disabled>
                Select gender
              </option>
              {Object.keys(Gender).map(key => (
                <option key={key} value={key}>
                  {Gender[key as keyof typeof Gender]}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.gender?.message} />
          </div>

          <Input id='country' type='text' errorMessage={errors.country?.message} label='Country' />
          <Input id='city' type='text' errorMessage={errors.city?.message} label='City' />
          <Input id='street' type='text' errorMessage={errors.street?.message} label='Street' />

          <ErrorMessage message={serverError} />

          <Button btnType='submit' type='primary' className='w-full'>
            Sign Up
          </Button>
        </form>
      </FormProvider>
    </AuthMainContainer>
  );
};

export default SignUpPatientPage;
