import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import Icon from '../Icon/Icon';
import { /* useAppDispatch */ useAppSelector } from '@/app/hooks';
import utc from 'dayjs/plugin/utc';
import { Button } from '../Button/Button';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import ScheduleSuccessModal from './ScheduleSuccessModal';
// import { AppointmentStatus } from '@/dataTypes/Appointment';
// import type { ICreateAppointment } from '@/dataTypes/Appointment';
// import { createAppointment } from '@/app/appointment/AppointmentThunks';

dayjs.extend(utc);

const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const today = dayjs();

type ScheduleBookProps = {
  doctorId: string;
  patientId: string;
  closePopup: () => void;
};

interface ICreateAppointment {
  doctorId: string;
  patientId: string;
  assignedAt: string;
  status: AppointmentStatus;
  notes: string;
}

export default function ScheduleBook({ closePopup, doctorId, patientId }: ScheduleBookProps) {
  // const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [currentDate, setCurrentDate] = useState(today);
  const [_, setNewAppointment] = useState<ICreateAppointment>({
    doctorId: '',
    patientId: '',
    assignedAt: '',
    status: AppointmentStatus.PLANNED,
    notes: '',
  });

  const [successfullModal, setSuccessfullModal] = useState(false);

  const appointments = useAppSelector(state => state.appointment.appointments);

  const plannedAppointments = useMemo(() => {
    return appointments
      .filter(appointment => appointment.status === 'Planned')
      .map(appointment => dayjs.utc(dayjs(appointment.assignedAt).format('YYYY-MM-DD hh:mm a')));
  }, [appointments]);

  const isAppointmentPlanned = (date: Dayjs, time: string) => {
    const [hour, minutePart] = time.split(':');
    const minute = minutePart.slice(0, 2);
    const ampm = minutePart.slice(3);
    const hour24 = ampm === 'pm' && hour !== '12' ? Number(hour) + 12 : hour;
    const dateTime = dayjs.utc(`${date.format('YYYY-MM-DD')} ${hour24}:${minute}`, 'YYYY-MM-DD HH:mm');
    return plannedAppointments.some(appointment => dateTime.isSame(appointment, 'minute'));
  };

  const incrementDate = () => setCurrentDate(currentDate.add(3, 'day'));
  const decrementDate = () => setCurrentDate(currentDate.subtract(3, 'day'));

  const dates = [currentDate, currentDate.add(1, 'day'), currentDate.add(2, 'day')];
  const schedule = [
    { week: 'Mon', timeSlots: ['10:00 am', '11:00 am', '12:00 pm', '01:00 pm'] },
    { week: 'Tue', timeSlots: ['10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm'] },
    {
      week: 'Wed',
      timeSlots: ['10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm'],
      available: true,
    },
    { week: 'Thu', timeSlots: ['10:00 am', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm'] },
    {
      week: 'Fri',
      timeSlots: ['10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm'],
    },
    {
      week: 'Sat',
      timeSlots: ['10:00 am', '11:00 am', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm'],
    },
    {
      week: 'Sun',
      timeSlots: ['01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm'],
    },
  ];

  const getFirstAvailableTime = () => {
    for (const date of dates) {
      const dayOfWeek = weeks[date.day()];
      const daySchedule = schedule.find(item => item.week === dayOfWeek);
      if (daySchedule) {
        for (const time of daySchedule.timeSlots) {
          const dateTime = dayjs(`${date.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD hh:mm a');
          if (!isAppointmentPlanned(date, time)) {
            return dateTime;
          }
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const firstAvailableTime = getFirstAvailableTime();
    if (firstAvailableTime) {
      setSelectedDate(firstAvailableTime);
    }
  }, [currentDate]);

  useEffect(() => {
    if (!selectedDate) return;

    const createNewAppointment: ICreateAppointment = {
      doctorId: doctorId,
      patientId: patientId,
      assignedAt: selectedDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      status: AppointmentStatus.PLANNED,
      notes: '',
    };

    setNewAppointment(createNewAppointment);
  }, [selectedDate]);

  function handleBookAppointment() {
    // dispatch(createAppointment(newAppointment));
    closePopup();
    setSuccessfullModal(true);
  }

  function selectDate(date: Dayjs, time: string, isPlanned: boolean) {
    if (isPlanned) return;
    setSelectedDate(dayjs(`${date.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD hh:mm a'));
  }

  return (
    <>
      <div className='flex flex-grow flex-col gap-y-8'>
        {/* WEEK PICKER */}
        <div className='flex items-center gap-x-6'>
          <Icon
            variant='shevron-right'
            className=' h-6 w-6 rotate-180 cursor-pointer text-text'
            onClick={decrementDate}
          />

          <div className='flex w-full gap-x-6'>
            {dates.map((date, index) => (
              <div
                key={index}
                className={`flex flex-1 select-none flex-col items-center justify-center rounded-lg px-6 py-2 ${date.isSame(today, 'day') ? 'bg-main-light text-base font-semibold text-black' : 'bg-white text-black'}`}
              >
                <div>{weeks[date.day()]}</div>
                <div>{date.format('MMM D')}</div>
              </div>
            ))}
          </div>

          <Icon variant='shevron-right' className='h-6 w-6 cursor-pointer text-text' onClick={incrementDate} />
        </div>

        {/* TIME PICKER */}
        <div className='grid max-h-80 w-full grid-cols-3 gap-x-6 self-center overflow-hidden px-12'>
          {dates.map((date, index) => {
            const dayOfWeek = weeks[date.day()];
            const daySchedule = schedule.find(item => item.week === dayOfWeek);

            return (
              <div key={index} className=''>
                {daySchedule?.timeSlots.map((time, i) => {
                  const isPlanned = isAppointmentPlanned(date, time);

                  return (
                    <button
                      key={i}
                      className={`mb-4 flex h-10 w-full items-center justify-center rounded-lg text-base font-normal text-black
                    ${selectedDate?.isSame(dayjs(`${date.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD hh:mm a'), 'minute') ? 'bg-main text-white' : 'bg-main-light hover:bg-main-medium'}

                    ${isPlanned ? 'cursor-not-allowed border border-grey-4 bg-transparent text-grey-4 hover:bg-transparent' : ''}`}
                      onClick={() => selectDate(date, time, isPlanned)}
                      disabled={isPlanned}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* BOOK APPOINTMENT BUTTON */}
        <div className='px-12'>
          <Button
            disabled={selectDate === undefined}
            btnType='button'
            type='primary'
            className={`w-full ${selectDate === undefined && 'cursor-not-allowed'}`}
            onClick={() => handleBookAppointment()}
          >
            Book appointment
          </Button>
        </div>
      </div>

      {/* BOOKING SUCCESS MODAL */}
      <ScheduleSuccessModal
        popupIsOpen={successfullModal}
        closePopup={() => setSuccessfullModal(false)}
        date={selectedDate!}
      />
    </>
  );
}
