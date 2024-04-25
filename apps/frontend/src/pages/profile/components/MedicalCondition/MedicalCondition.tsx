import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import MedicalConditionPopup from './MedicalConditionPopup';
import { Icon } from '@/components/UI';

const MedicalCondition = () => {
  const patient = useAppSelector(state => state.patient.data);

  const { conditions, allergies } = patient;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-7'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-grey-1'>Declaration number</p>
        {/*TODO"where should be decalration id?? */}
        <div className='rounded-lg bg-main-light  px-4 py-2 font-medium text-black'>{123498}</div>
      </div>

      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col gap-1 text-start'>
          <p className='text-grey-1'>Medical condition</p>
          <p className='font-medium text-text'>
            {conditions.length === 0 && '-'}
            {conditions.length !== 0 &&
              conditions.map((condiiton, index) => {
                if (index !== conditions.length - 1) {
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
          <p className='font-medium text-text'>
            {allergies.length === 0 && '-'}
            {allergies.length !== 0 &&
              allergies.map((allergie, index) => {
                if (index !== allergies.length - 1) {
                  return `${allergie.name}, `;
                }
                return allergie.name;
              })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalCondition;
