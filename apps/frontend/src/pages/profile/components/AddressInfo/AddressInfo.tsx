import { useAppSelector } from '@/app/hooks';
import AddressInfoPopup from './AddressInfoPopup';
import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/icons/Icon';
import { useState } from 'react';

const AddressInfo = () => {
  const patient = useAppSelector(state => state.patient.data);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-7'>
      <div className='flex justify-between'>
        <div>
          <p className='text-lg font-medium'>Address</p>
          {patient.country && (
            <div>
              {patient.country && patient.country + ','} {patient.state && patient.state + ','}{' '}
              {patient.city && patient.city + ','} {patient.street && patient.street + ','}
              {patient.apartment && patient.apartment + ','}
            </div>
          )}
        </div>
        <Button type='secondary' onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
          <Icon variant='plus' />
          Add
        </Button>

        <AddressInfoPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default AddressInfo;
