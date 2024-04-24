import type React from 'react';
import { passwordRulesList } from '@/constants/passwordRulesList';
import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import InputPassword from '../../../components/UI/Input/InputPassword';
import { FormProvider, useForm } from 'react-hook-form';

export interface PopupProps {
  handleClosePopup: () => void;
}

const SettingsPopup: React.FC<PopupProps> = ({ handleClosePopup }) => {
  const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const methods = useForm();

  return (
    <>
      <div className='fixed inset-0 bg-black opacity-20' onClick={handleClosePopup}></div>

      <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center' onClick={handleClosePopup}>
        <div className='relative h-[500px] w-[588px] rounded-lg bg-white p-4 shadow-md' onClick={handlePopupClick}>
          <div className='absolute right-1 top-1 p-2'></div>
          <div className='m-7 flex flex-col gap-8'>
            <section className=' flex h-[332px] w-[492px] flex-col'>
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
                    classNameInput='my-custom-input-class'
                    classNameLabel='my-custom-label-class'
                  />
                  <InputPassword
                    id='check-password'
                    label='Create new password'
                    placeholder='Enter your password'
                    errorMessage='Password is required'
                    className='my-custom-class'
                    classNameInput='my-custom-input-class'
                    classNameLabel='my-custom-label-class'
                  />
                </form>
              </FormProvider>

              <div className='mb-2 flex w-full  flex-col items-start '></div>

              <ul className='mt-5'>
                {passwordRulesList &&
                  passwordRulesList.map(({ id, rule }) => (
                    <li
                      key={id}
                      className='flex  items-center gap-2 text-main before:block before:h-1   before:w-1  before:rounded-full before:bg-main before:content-[""]'
                    >
                      {rule}
                    </li>
                  ))}
              </ul>
            </section>

            <section>
              <div className='mt-2 flex justify-between gap-4'>
                <Button type={ButtonTypes.SECONDARY} onClick={handleClosePopup} className='w-64'>
                  Cancel
                </Button>

                <Button type={ButtonTypes.PRIMARY} onClick={() => {}} className='w-64'>
                  Save
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPopup;
