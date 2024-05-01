import type { IAppointment } from '@/dataTypes/Appointment';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import { Button } from '@/components/UI/Button/Button';

type AppointmentCardProps = {
  appointments: IAppointment[];
};

export default function NearestAppointmentsComponent({ appointments }: AppointmentCardProps) {
  return (
    <>
      <div className='w-min-[694px] h-min-[306px] flex  w-[694px] flex-col gap-7 rounded-xl bg-[#ffffff] p-[24px]'>
        <h3>Nearest appointments</h3>
        {appointments?.length > 0 ? (
          appointments.map(currentAppointment => (
            <AppointmentCard appointment={currentAppointment} key={currentAppointment.id} withQuickNotes={false} />
          ))
        ) : (
          <div
            className='flex
            flex-col items-center'
          >
            <p className='font-normal leading-6'>Seems like you don’t have any appointments.</p>
            <p className='mb-[24px] font-normal leading-6'>Let’s find a doctor and book one</p>
            <Button type={'secondary'}>Find a doctor</Button>
          </div>
        )}
      </div>
    </>
  );
}
