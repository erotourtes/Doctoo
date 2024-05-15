import type { TAppointment } from '@/dataTypes/Appointment';
import dayjs from 'dayjs';
import ShortInfoCard from '../ShortInfoCard/ShortInfoCard';
import { cn } from '@/utils/cn';
import { useAppointmentPatientPopup } from '@/hooks/popups/useAppointmentPatientPopup';

type AppointmentCardProps = {
  appointments: TAppointment[];
};

export default function TodayAppointments({ appointments }: AppointmentCardProps) {
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.startedAt);
    const today = dayjs().format('YYYY-MM-DD');
    return appointmentDate.isSame(today, 'day');
  });

  const { openPopup } = useAppointmentPatientPopup();

  return (
    <div
      className={cn(
        'h-full min-h-[236px] w-full rounded-xl bg-white p-2 sm:p-6 lg:max-w-[302px]',
        appointments && appointments?.length > 0 ? 'flex min-h-0 flex-col gap-5' : 'grid',
      )}
    >
      <h3>{`Todays appointments (${todayAppointments.length})`}</h3>
      {appointments && appointments?.length > 0 ? (
        <div className='flex flex-col gap-5'>
          {todayAppointments.map((appointment: TAppointment, key: number) => {
            const appointmentPatient = appointment.patient;
            const appointmentType =
              appointment.type.charAt(0).toLocaleUpperCase() +
              appointment.type.slice(1).toLocaleLowerCase().replace('_', ' ');

            return (
              <ShortInfoCard
                fullName={`${appointmentPatient?.firstName + ' ' + appointmentPatient?.lastName}`}
                about={appointmentType}
                avatarKey={`${appointmentPatient?.avatarKey}`}
                eventTime={dayjs.utc(appointment.startedAt).format('h:mm A')}
                classNames='bg-background w-full rounded-xl cursor-pointer'
                key={key}
                onClick={() => {
                  openPopup(appointment);
                }}
              />
            );
          })}
        </div>
      ) : (
        <p className='text-center font-normal leading-6 lg:px-4'>Your doctors will be displayed here</p>
      )}
    </div>
  );
}
