import Icon from '@UI/Icon/Icon';

type AppointmentPopupHeaderProps = { appointmentTime: string; appointmentStatus: string };

export default function AppointmentPopupHeader({ appointmentTime, appointmentStatus }: AppointmentPopupHeaderProps) {
  return (
    <div className='mt-5 flex h-9 items-end justify-between'>
      <div className='flex items-center gap-3'>
        <Icon variant='date' className='h-10 w-10 rounded-full bg-background p-[6px] pb-2  text-main' />
        <span className='h-6 text-xl font-semibold  text-black'>{appointmentTime}</span>
      </div>

      <div className='flex h-fit w-fit items-center justify-center rounded-2xl bg-orange-light px-3 py-1'>
        <span className='select-none text-sm font-normal  text-orange'>{appointmentStatus}</span>
      </div>
    </div>
  );
}
