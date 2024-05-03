import type { IAppointment } from '@/dataTypes/Appointment';
import dayjs from 'dayjs';
import ShortInfoCard from '../ShortInfoCard/ShortInfoCard';
import type { TPatient } from '@/dataTypes/Patient';

type AppointmentCardProps = {
  appointments: IAppointment[];
  patients: TPatient[];
};

export default function TodayAppointments({ appointments, patients }: AppointmentCardProps) {
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = dayjs(appointment.startedAt);
    const today = dayjs().format('YYYY-MM-DD');
    return appointmentDate.isSame(today, 'day');
  });

  return (
    <>
      <div
        className={`h-full min-h-[236px] w-full rounded-xl bg-white p-2 sm:p-6 lg:max-w-[302px] ${appointments && appointments?.length > 0 ? 'flex flex-col gap-6' : 'grid'} `}
      >
        <h3>{`Todays appointments (${todayAppointments.length})`}</h3>

        {appointments && appointments?.length > 0 ? (
          <div className='flex flex-col'>
            {todayAppointments.map((appointment: IAppointment, key: number) => {
              const appointmentPatient = patients.find((patient: TPatient) => patient.id === appointment.patientId);
              return (
                <ShortInfoCard
                  fullName={`${appointmentPatient?.firstName + ' ' + appointmentPatient?.lastName}`}
                  about={appointment.notes}
                  avatarKey={`${appointmentPatient?.avatarKey}`}
                  eventTime={dayjs(appointment.startedAt).format('h:mm A')}
                  classNames='bg-background w-full rounded-xl mb-[14px]'
                  key={key}
                />
              );
            })}
          </div>
        ) : (
          <p className='text-center font-normal leading-6 lg:px-4'>Your doctors will be displayed here</p>
        )}
      </div>
    </>
  );
}
