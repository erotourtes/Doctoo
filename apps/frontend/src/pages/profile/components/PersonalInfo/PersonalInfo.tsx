import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { capitalizeString } from '@/utils/capitalizeString';
import { Icon, Button } from '@/components/UI';
import PersonalInfoPopup from './PersonalInfoPopup';

const PersonalInfo = () => {
  const patient = useAppSelector(state => state.patient.data);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-full justify-between rounded-xl bg-white p-7'>
      <div className='flex gap-4'>
        <div className='flex aspect-square w-24 items-center justify-center rounded-lg bg-background text-main'>
          <Icon variant='account' className='h-12 w-12' />
        </div>
        <div className='flex flex-col gap-1 text-start text-grey-1'>
          <p className=' text-2xl font-medium text-black'>
            {capitalizeString(patient.firstName)} {capitalizeString(patient.lastName)}
          </p>
          <p>{patient.email}</p>
          <p>{patient.phone}</p>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <button className='flex items-center text-sm text-grey-1' onClick={() => setIsOpen(!isOpen)}>
          <Icon variant={'edit'} />
          Edit
        </button>
        <div>
          <Button btnType='button' type='secondary' onClick={() => {}} className='flex items-center'>
            <Icon variant='plus' />
            Add a document
          </Button>
        </div>
        <PersonalInfoPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default PersonalInfo;
