import type React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { passwordRulesList } from '@/constants/passwordRulesList';
import { InputPassword, Button, PopupDoctoo } from '@/components/UI';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAppDispatch } from '@/app/hooks';
import { changePassword } from '@/app/patient/PatientThunks';
import { useState } from 'react';
import { ErrorMessage } from '../../auth/auth-components';

export interface PopupProps {
  showPopup: boolean;
  handleClosePopup: () => void;
}

type FormValues = {
  newPassword: string;
  oldPassword: string;
};

const scheme = Joi.object<FormValues>({
  newPassword: Joi.string().min(8).required(),
  oldPassword: Joi.string().required(),
});

const SettingsPopup: React.FC<PopupProps> = ({ showPopup, handleClosePopup }) => {
  const form = useForm<FormValues>({
    resolver: joiResolver(scheme),
    mode: 'onSubmit',
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: FormValues) => {
    const res = await dispatch(changePassword(data)).unwrap();
    if (res && res.message) return void setServerError(res.message as string);
    handleClosePopup();
  };

  return (
    <PopupDoctoo
      popupIsOpen={showPopup}
      closePopup={handleClosePopup}
      modalFullClassName='max-w-[588px] p-10 sm:p-12'
      modalBodyClassName=''
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <section className='flex flex-col'>
            <div className='mb-3 flex items-start'>
              <h1 className='block text-xl font-medium'>Change password</h1>
            </div>
            <InputPassword
              id='oldPassword'
              label='Old password'
              placeholder='Enter your password'
              errorMessage='Password is required'
              className='mb-5'
              classNameInput=''
              classNameLabel='text-sm sm:text-base '
            />
            <InputPassword
              id='newPassword'
              label='Create new password'
              placeholder='Enter your password'
              errorMessage='Password is required'
              className='my-custom-class'
              classNameInput=''
              classNameLabel='text-sm sm:text-base'
            />

            <div className='mb-2 flex w-full  flex-col items-start'></div>
            <ErrorMessage message={serverError} />

            <ul className='mt-5'>
              {passwordRulesList &&
                passwordRulesList.map(({ id, rule }) => (
                  <li
                    key={id}
                    className='flex items-center gap-2 text-xs text-main before:block before:h-1 before:w-1 before:rounded-full before:bg-main before:content-[""] sm:text-base'
                  >
                    {rule}
                  </li>
                ))}
            </ul>
          </section>

          <div className='mt-4 flex flex-col-reverse gap-4 sm:mt-8 sm:flex-row sm:justify-between'>
            <Button type='secondary' onClick={handleClosePopup} className='sm:w-64'>
              Cancel
            </Button>

            <Button type='primary' btnType='submit' className='sm:w-64'>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </PopupDoctoo>
  );
};

export default SettingsPopup;
