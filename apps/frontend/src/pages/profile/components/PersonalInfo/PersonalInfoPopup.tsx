import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { patchUserData } from '@/app/patient/PatientThunks';
import { PopupDoctoo, Icon, Input, Button } from '@/components/UI';
import type { IUSer } from '@/dataTypes/User';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

type PersonalInfoPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormData {
  fullname: string;
  email: string;
  countryIndex: string;
  phone: string;
}

const schema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  countryIndex: Joi.string().required(),
  phone: Joi.string().required(),
});

const PersonalInfoPopup = ({ isOpen, onClose }: PersonalInfoPopupProps) => {
  const patient = useAppSelector(state => state.patient.data);

  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  const { handleSubmit } = methods;

  function onSubmit(data: FormData): void {
    const [firstName, lastName] = data.fullname.split(' ');
    const phone = data.countryIndex + data.phone;
    const { email } = data;
    const userData: Partial<IUSer> = {
      email,
      phone,
      firstName,
      lastName,
    };

    console.log(userData);
    dispatch(patchUserData({ id: patient.userId, data: userData }));
  }
  return (
    <PopupDoctoo
      popupIsOpen={isOpen}
      closePopup={onClose}
      modalBodyClassName='relative z-20 flex h-full min-w-[500px] flex-col gap-7 rounded-xl bg-white'
    >
      <p className='text-2xl font-medium text-black'>Personal info</p>
      <div className='flex items-center gap-7'>
        {patient.avatarKey && (
          <>
            <img src={patient.avatarKey} alt='avatar' className='h-[92px] w-[92px] rounded-lg' />
            <div className='flex gap-7'>
              <button className='flex gap-2 font-medium text-main'>
                <Icon variant='change' />
                Change photo
              </button>
              <button className='flex gap-2 font-medium text-black'>
                <Icon variant='delete' />
                Delete photo
              </button>
            </div>
          </>
        )}
        {!patient.avatarKey && (
          <>
            <div className='flex h-[92px] w-[92px] items-center justify-center rounded-lg bg-background text-main'>
              <Icon variant='account' className='h-12 w-12' />
            </div>
            <button
              onClick={() => {
                console.log('uploaded');
              }}
              className='cursor-pointer font-medium text-main'
            >
              Upload photo
            </button>
          </>
        )}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input id='fullname' label='Name and surname' placeholder='John Smith' type='text' className='w-full' />

            <Input id='email' label='Email' placeholder='john.smith@gmail.com' type='text' className='w-full' />
            <Input id='email' label='Email' placeholder='john.smith@gmail.com' type='text' className='w-full' />

            <div className='flex w-full flex-col'>
              {/* TODO: Add select input after it's ready */}
              <p className='text-md my-2 block text-grey-1'>Phone</p>
              <div className='flex w-full gap-4'>
                <div className='relative w-1/5'>
                  <select
                    {...methods.register('countryIndex')}
                    className='flex w-full appearance-none items-center  justify-center rounded-md border border-transparent bg-background px-4 py-2 text-grey-1 outline-none focus:border-text'
                  >
                    <option className='flex w-full items-center justify-center' value='+1' selected>
                      🇺🇸 +1
                    </option>
                    <option className='flex w-full items-center justify-center' value='+38'>
                      🇺🇦 +38
                    </option>
                    <option className='flex w-full items-center justify-center' value='+44'>
                      🇬🇧 +44
                    </option>
                    <option className='flex w-full items-center justify-center' value='+49'>
                      🇩🇪 +49
                    </option>
                    <option className='flex w-full items-center justify-center' value='+48'>
                      🇵🇱 +48
                    </option>
                    <option className='flex w-full items-center justify-center' value='+33'>
                      🇫🇷 +33
                    </option>
                  </select>
                  <svg
                    className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12.416 14.376C12.2181 14.6728 11.7819 14.6728 11.584 14.376L8.51823 9.77735C8.29672 9.44507 8.53491 9 8.93426 9L15.0657 9C15.4651 9 15.7033 9.44507 15.4818 9.77735L12.416 14.376Z'
                      fill='#707D7E'
                    />
                  </svg>
                </div>
                <Input id='phone' placeholder='060 612 12 07' type='text' className='w-4/5' />
              </div>
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <Button btnType='reset' type='secondary' onClick={() => {}} className='w-1/2'>
              Cancel
            </Button>
            <Button btnType='submit' type='primary' className='w-1/2'>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </PopupDoctoo>
  );
};

export default PersonalInfoPopup;
