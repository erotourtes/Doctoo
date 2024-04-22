import { useAppSelector } from '@/app/hooks';
import MedicalConditionPopup from './MedicalConditionPopup';
import { useState } from 'react';
import Icon from '@UI/Icon/Icon';

const MedicalCondition = () => {
  const patient = useAppSelector(state => state.patient.data);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-7'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-grey-1'>Declaration number</p>
        <div className='rounded-lg bg-main-light  px-4 py-2 font-medium text-black'>{patient.declarationId}</div>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col gap-1 text-start'>
          <p className='text-grey-1'>Medical condition</p>
          <p className='font-medium text-text'>
            {patient.conditions.length === 0 && '-'}
            {patient.conditions.length !== 0 &&
              patient.conditions.map((condiiton, index) => {
                if (index !== patient.conditions.length - 1) {
                  return `${condiiton.name}, `;
                }
                return condiiton.name;
              })}
          </p>
        </div>
        <button className='flex items-center text-sm text-grey-1' onClick={() => setIsOpen(!isOpen)}>
          <Icon variant={'edit'} />
          Edit
        </button>
        <MedicalConditionPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

      <div className='flex w-full items-center justify-between text-start'>
        <div className='flex flex-col gap-1'>
          <p className='text-grey-1'>Allergies</p>
          <p className='font-medium text-text'>-</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalCondition;
