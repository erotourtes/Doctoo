import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { Button, Icon } from '@/components/UI';
import AddressInfoPopup from './AddressInfoPopup';

const AddressInfo = () => {
  const patient = useAppSelector(state => state.patient.data);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-7'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-lg font-medium'>Address</p>
        </div>
        <Button type='secondary' onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
          <Icon variant='plus' />
          Add
        </Button>
      </div>
      {patient.country && (
        <div>
          {patient.country && patient.country}
          {patient.state && ', ' + patient.state}
          {patient.city && ', ' + patient.city}
          {patient.street && ', ' + patient.street}
          {patient.apartment && ', ' + patient.apartment}
        </div>
      )}

      <AddressInfoPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default AddressInfo;
