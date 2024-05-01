import { Button } from '@/components/UI/Button/Button';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import { fn } from '@storybook/test';
import PageHeader from '../PageHeader';
import { useAppSelector } from '@/app/hooks';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { getMyDoctorData } from '@/app/doctor/DoctorThunks';
import MyDoctorsFilters from './Components/Filters/MyDoctorsFilters';
import { useState } from 'react';
import { InputSearch } from '@/components/UI';
import DoctorsList from './Components/DoctorsList';
import { getMyAppointments } from '@/app/appointment/AppointmentThunks';
import dayjs from 'dayjs';

const MyDoctorsPage = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(state => state.appointment.appointments);
  const doctors = useAppSelector(state => state.doctor.doctors);
  useEffect(() => {
    dispatch(getMyDoctorData());
    dispatch(getMyAppointments());
  }, []);

  const [chosenOptions, setChosenOptions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const meetingsForDay = appointments.map(appointment => ({
    date: dayjs(appointment.startedAt).toDate(),
    status: appointment.status.toUpperCase(),
  }));

  return (
    <div>
      <header className='bg-background'>
        <PageHeader iconVariant={'my-doctors'} title='My doctors'>
          <InputSearch
            variant={'white'}
            value={searchValue}
            setValue={setSearchValue}
            placeholder='Search by doctor, symptom'
          />
          <Button type={'primary'} onClick={() => {}}>
            Find a doctor
          </Button>
        </PageHeader>
      </header>
      <section className='bg-background '>
        <div className='flex gap-6'>
          <div className='shrink grow basis-4/5'>
            <ul className='mb-6 flex gap-4'>
              <MyDoctorsFilters doctors={doctors} chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} />
            </ul>
            {doctors?.length ? (
              <DoctorsList doctors={doctors} appointments={appointments} chosenOptions={chosenOptions} />
            ) : (
              <div className='flex h-[594px] w-full items-center justify-center rounded-xl bg-white text-center text-text'>
                <span className='flex flex-col items-center gap-4'>
                  <span>
                    Your doctors will be displayed here. Let’s find one and book <br /> appointment
                  </span>
                  <span>
                    <Button type={'secondary'} onClick={fn()}>
                      Find
                    </Button>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div>
            <Calendar meetingsForDay={meetingsForDay} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default MyDoctorsPage;
