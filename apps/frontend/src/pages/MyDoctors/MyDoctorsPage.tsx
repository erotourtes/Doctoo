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
import { filterReducer, initialFilterState } from './Components/Filters/filterReducer';
import { useReducer } from 'react';
import useWindowWide from '@/hooks/useWindowWide';
import { useNavigate } from 'react-router';

const MyDoctorsPage = () => {
  const mobileWidth = useWindowWide(768);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(state => state.appointment.appointments);
  const doctors = useAppSelector(state => state.doctor.doctors);

  const [filterState, dispatchFilterAction] = useReducer(filterReducer, initialFilterState);
  useEffect(() => {
    dispatch(getMyDoctorData());
    dispatch(getMyAppointments());
  }, []);

  const [searchValue, setSearchValue] = useState<string>('');

  const meetingsForDay = appointments.map(appointment => ({
    date: dayjs(appointment.startedAt).toDate(),
    status: appointment.status.toUpperCase(),
  }));

  function handleSubmit(value: string) {
    setSearchValue(value);
  }

  const findDoctor = () => {
    navigate(`/doctors?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div>
      <header className='bg-background'>
        <PageHeader iconVariant={'my-doctors'} title='My doctors' className='flex-col gap-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 sm:flex-row'>
            <InputSearch
              variant={'white'}
              value={searchValue}
              setValue={handleSubmit}
              placeholder={`${mobileWidth ? 'Search by doctor, symptom' : 'Search by doctor'}`}
              className='w-full'
            />
            <Button
              type={'primary'}
              onClick={findDoctor}
              className='flex items-center justify-center whitespace-nowrap'
            >
              Find a doctor
            </Button>
          </div>
        </PageHeader>
      </header>

      <section className='flex flex-col gap-6 bg-background xl:flex-row'>
        <div className='shrink grow basis-4/5'>
          <ul className='mb-6 flex gap-4'>
            <MyDoctorsFilters state={filterState} dispatch={dispatchFilterAction} doctors={doctors} />
          </ul>
          {doctors?.length ? (
            <DoctorsList filters={filterState} doctors={doctors} appointments={appointments} />
          ) : (
            <div className='flex h-[250px] w-full items-center justify-center rounded-xl bg-white p-2 text-center text-text lg:h-[350px] xl:h-[600px]'>
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
      </section>
    </div>
  );
};
export default MyDoctorsPage;
