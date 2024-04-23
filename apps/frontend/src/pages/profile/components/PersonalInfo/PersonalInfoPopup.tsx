import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { type Patient } from '@/app/patient/PatientSlice';
import { patchPatientData } from '@/app/patient/PatientThunks';
import { Button } from '@/components/UI/Button/Button';
import Input from '@/components/UI/Input/Input';
import PopupDoctoo from '@/components/UI/Popup/Popup';
import Icon from '@UI/Icon/Icon';
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
  phone: string;
}

const schema = Joi.object({
  fullname: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
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
    const { email, phone } = data;
    const patienData: Partial<Patient> = {
      email,
      phone,
      firstName,
      lastName,
    };

    console.log(patienData);
    dispatch(patchPatientData(patienData));
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
            <button className='cursor-pointer font-medium text-main'>Upload photo</button>
          </>
        )}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='flex w-full flex-col gap-7'>
          <div className='w-full'>
            <Input id='fullname' label='Name and surname' placeholder='John Smith' type='text' className='w-full' />

            <Input id='email' label='Email' placeholder='john.smith@gmail.com' type='text' className='w-full' />

            <div className='flex w-full'>
              {/* TODO: Add select input after it's ready */}
              <Input id='phone' label='Phone' placeholder='060 612 12 07' type='text' className='w-full' />
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <Button type='secondary' onClick={() => {}} className='w-1/2'>
              Cancel
            </Button>
            <Button type='primary' className='w-1/2'>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </PopupDoctoo>
  );
};

export default PersonalInfoPopup;
