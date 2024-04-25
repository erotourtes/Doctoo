import type React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { passwordRulesList } from '@/constants/passwordRulesList';
import { InputPassword, Button } from '@/components/UI';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import InputPassword from '../../../components/UI/Input/InputPassword';
import { FormProvider, useForm } from 'react-hook-form';
import PopupDoctoo from '@/components/UI/Popup/Popup';

export interface PopupProps {
  showPopup: boolean;
  handleClosePopup: () => void;
}

const SettingsPopup: React.FC<PopupProps> = ({ showPopup, handleClosePopup }) => {
  const methods = useForm();

  return (
    <PopupDoctoo
      popupIsOpen={showPopup}
      closePopup={handleClosePopup}
      modalFullClassName='max-w-[588px] p-10 sm:p-12'
      modalBodyClassName=''
    >
      <section className='flex flex-col'>
        <div className='mb-3 flex items-start'>
          <h1 className='block text-xl font-medium'>Change password</h1>
        </div>
        <FormProvider {...methods}>
          <form>
            <InputPassword
              id='password'
              label='Old password'
              placeholder='Enter your password'
              errorMessage='Password is required'
              className='mb-5'
              classNameInput=''
              classNameLabel='text-sm sm:text-base '
            />
            <InputPassword
              id='check-password'
              label='Create new password'
              placeholder='Enter your password'
              errorMessage='Password is required'
              className='my-custom-class'
              classNameInput=''
              classNameLabel='text-sm sm:text-base'
            />
          </form>
        </FormProvider>

        <div className='mb-2 flex w-full  flex-col items-start'></div>

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
        <Button type={ButtonTypes.SECONDARY} onClick={handleClosePopup} className='sm:w-64'>
          Cancel
        </Button>

        <Button type={ButtonTypes.PRIMARY} onClick={() => {}} className='sm:w-64'>
          Save
        </Button>
      </div>
    </PopupDoctoo>
  );
};

export default SettingsPopup;
