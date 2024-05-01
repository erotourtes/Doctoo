import { useState } from 'react';
import { Button, InputSearch } from '@/components/UI';
import PageHeader from '@/pages/PageHeader';
import CurrentAppointments from '../CurrentAppointments/CurrentAppointments';

const DoctorDashboard = () => {
  const [search, setSearch] = useState('');

  function handleSubmit(value: string) {
    setSearch(value);
  }
  return (
    <div>
      <PageHeader iconVariant={'dashboard'} title='Dashboard'>
        <InputSearch value={search} setValue={handleSubmit} variant='white' placeholder='Search by surname, symptom' />

        <Button type='primary' btnType='button'>
          Find a patient
        </Button>
      </PageHeader>
      <div className='flex w-full'>
        <CurrentAppointments />

        <div className='ml-auto mt-[24px] min-h-[156px] min-w-[302px] max-w-[302px] flex-col rounded-xl bg-[#ffffff] p-[24px]'>
          <h3>{`Todays appointments (${12})`}</h3>
        </div>
        <div />
      </div>
    </div>
  );
};
export default DoctorDashboard;
