import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { /* useAppDispatch */ useAppSelector } from '@/app/hooks';
import utc from 'dayjs/plugin/utc';
import ScheduleSuccessModal from './ScheduleSuccessModal';
import BookAppointmentBtn from './ScheduleBookComponents/BookAppointmentBtn';
import TimePicker from './ScheduleBookComponents/TimePicker';
import WeekPicker from './ScheduleBookComponents/WeekPicker';
// import { AppointmentStatus } from '@/dataTypes/Appointment';
// import type { ICreateAppointment } from '@/dataTypes/Appointment';
// import { createAppointment } from '@/app/appointment/AppointmentThunks';

dayjs.extend(utc);

const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type ScheduleBookProps = {
  doctorId: string;
  patientId: string;
  closePopup: () => void;
  currentDay?: Dayjs;
};

// interface ICreateAppointment {
//   doctorId: string;
//   patientId: string;
//   assignedAt: string;
//   status: AppointmentStatus;
//   notes: string;
// }

export default function ScheduleBook({ closePopup, currentDay = dayjs() }: ScheduleBookProps) {
  // const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [currentDate, setCurrentDate] = useState(currentDay);
  // const [newAppointment, setNewAppointment] = useState<ICreateAppointment>({
  //   doctorId: '',
  //   patientId: '',
  //   assignedAt: '',
  //   status: AppointmentStatus.PLANNED,
  //   notes: '',
  // });

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

  // useEffect(() => {
  //   if (!selectedDate) return;

  //   const createNewAppointment: ICreateAppointment = {
  //     doctorId: doctorId,
  //     patientId: patientId,
  //     assignedAt: selectedDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
  //     status: AppointmentStatus.PLANNED,
  //     notes: '',
  //   };

  //   setNewAppointment(createNewAppointment);
  // }, [selectedDate]);

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
        <WeekPicker
          dates={dates}
          weeks={weeks}
          currentDate={currentDate}
          decrementDate={decrementDate}
          incrementDate={incrementDate}
        />

        <TimePicker
          dates={dates}
          weeks={weeks}
          schedule={schedule}
          selectedDate={selectedDate}
          isAppointmentPlanned={isAppointmentPlanned}
          selectDate={selectDate}
        />

        <BookAppointmentBtn selectDate={selectedDate} handleBookAppointment={handleBookAppointment} />
      </div>

      <ScheduleSuccessModal
        popupIsOpen={successfullModal}
        closePopup={() => setSuccessfullModal(false)}
        date={selectedDate!}
      />
    </>
  );
}
