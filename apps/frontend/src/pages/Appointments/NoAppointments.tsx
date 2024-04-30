import { Button } from '@/components/UI';

type NoAppointmentsProps = { findDoctor: () => void };

export default function NoAppointments({ findDoctor }: NoAppointmentsProps) {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-y-4 bg-white'>
      <div className='text-center'>
        <p className='text-base font-normal text-text'>Seems like you don’t have any appointments.</p>
        <p className='text-base font-normal text-text'>Let’s find a doctor and book one </p>
      </div>

      <Button type='secondary' btnType='button' onClick={findDoctor}>
        Find a doctor
      </Button>
    </div>
  );
}
