import dayjs from 'dayjs';
import { useAppSelector } from '@/app/hooks';
import Icon from '@/components/UI/Icon/Icon';
import Tag from '@/components/UI/Tag/Tag';

export const Checkout = () => {
  const { date, doctorSpecialization, doctorName, appointmentDuration, pricePerHour } = useAppSelector(
    state => state.payment.data,
  );

  const formattedDate = dayjs(date).format('MMM D, h:mm a');

  return (
    <>
      <div className='grid w-full justify-items-start gap-2 rounded-xl bg-white p-6 text-black'>
        <div className='flex items-center gap-2'>
          <Icon variant='date' className='text-main' />
          <p className='text-lg font-semibold leading-6'>{formattedDate}</p>
        </div>
        <p className='mb-2 font-medium'>{`${doctorName} (${doctorSpecialization})`}</p>
        <Tag icon={false} text='Completed' />
      </div>

      <div className='grid w-full gap-2'>
        <p className=' flex items-center justify-between gap-2 font-medium text-text'>
          {appointmentDuration} hour
          <span>${pricePerHour}</span>
        </p>
        <div className='grid grid-cols-2 grid-rows-[2px_27px] items-center justify-between gap-2 text-black before:col-start-1 before:col-end-3 before:h-px before:w-full before:bg-grey-4 before:content-[""]'>
          <p className='row-start-2 row-end-3 text-lg font-medium'>Total</p>
          <p className='row-2 justify-self-end text-lg font-medium'>${pricePerHour * appointmentDuration}</p>
        </div>
      </div>
    </>
  );
};
