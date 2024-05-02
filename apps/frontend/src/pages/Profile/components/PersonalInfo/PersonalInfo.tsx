import { useAppSelector } from '@/app/hooks';
import { Button, Icon } from '@/components/UI';
import { capitalizeString } from '@/utils/capitalizeString';
import { useState } from 'react';
import PersonalInfoPopup from './PersonalInfoPopup';
import { PatientProfilePhoto } from '@/components/ProfilePhoto/PatientProfilePhoto';

const PersonalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const patient = useAppSelector(state => state.patient.data);
  const photoURL = patient.avatarKey !== '' ? `${import.meta.env.VITE_S3_BASE_URL}/${patient.avatarKey}` : null;

  return (
    <div className='flex flex-col items-center justify-between gap-2 rounded-xl bg-white p-3 md:p-7 xl:flex-row'>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:self-start'>
        <PatientProfilePhoto photoURL={photoURL} />

        <div className='flex flex-col gap-1 text-start text-grey-1'>
          <p className='text-xl font-medium text-black sm:text-2xl'>
            {capitalizeString(patient.firstName)} {capitalizeString(patient.lastName)}
          </p>
          <p>{patient.email}</p>
          <p>{patient.phone}</p>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between gap-2 sm:self-end xl:gap-8'>
        <button className='flex items-center gap-1 text-sm text-grey-1' onClick={() => setIsOpen(!isOpen)}>
          <Icon variant='edit' />
          Edit
        </button>
        <div>
          <Button btnType='button' type='secondary' onClick={() => {}} className='flex items-center gap-2 px-3 py-0'>
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
