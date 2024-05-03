import type { IAppointment } from '@/dataTypes/Appointment';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import { Button } from '@/components/UI/Button/Button';
import { useNavigate } from 'react-router';

type AppointmentCardProps = {
  appointments: IAppointment[];
};

export default function NearestAppointmentsComponent({ appointments }: AppointmentCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className='h-min-[306px] flex w-full flex-col gap-7 rounded-xl bg-white px-2 sm:p-6'>
        <h3 className='text-lg'>Nearest appointments</h3>
        {appointments?.length > 0 ? (
          appointments
            .filter(appointment => appointment.status === 'PLANNED')
            .map(currentAppointment => (
              <AppointmentCard
                appointment={currentAppointment}
                avatarKey={currentAppointment.doctor!.avatarKey}
                fullName={`Dr. ${currentAppointment.doctor?.firstName + ' ' + currentAppointment.doctor?.lastName}`}
                about={currentAppointment.doctor!.specializations.map(specialization => specialization.name).join(', ')}
                key={currentAppointment.id}
                withQuickNotes={false}
              />
            ))
        ) : (
          <div className='flex min-h-[250px] flex-col items-center justify-center gap-6'>
            <p className='text-center font-normal leading-6'>
              Seems like you don’t have any appointments. <br /> Let’s find a doctor and book one
            </p>
            <Button onClick={() => navigate('/doctors')} type='secondary'>
              Find a doctor
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
