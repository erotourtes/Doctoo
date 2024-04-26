import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { Button, Icon } from '@/components/UI';
import AddressInfoPopup from './AddressInfoPopup';

const AddressInfo = () => {
  const patient = useAppSelector(state => state.patient.data);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-3 md:p-7'>
      <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
        <h3 className='text-lg font-medium text-black'>Address</h3>
        <Button
          type='secondary'
          onClick={() => setIsOpen(!isOpen)}
          className='flex w-3/4 items-center justify-center gap-2 sm:max-w-[140px]'
        >
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
