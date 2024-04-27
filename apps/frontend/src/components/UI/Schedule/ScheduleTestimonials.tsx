import Icon from '../Icon/Icon';

type ScheduleTestimonials = {
  review: string;
  patientName: string;
};

export default function ScheduleTestimonials({ review, patientName }: ScheduleTestimonials) {
  return (
    <div className='flex w-full flex-col gap-y-4'>
      <span className='text-lg font-semibold leading-6 text-black'>Testimonials</span>

      <div className='flex flex-col gap-y-3 rounded-xl bg-background p-4'>
        <div className='flex items-center gap-x-3'>
          <div className='flex cursor-pointer gap-x-1'>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
            ))}
          </div>

          <a href='#' className='text-black underline'>
            128 reviews
          </a>
        </div>

        {review}

        {patientName}
      </div>

      <div className='flex flex-col gap-y-3 rounded-xl bg-background p-4'>
        <div className='flex items-center gap-x-3'>
          <div className='flex cursor-pointer gap-x-1'>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
            ))}
          </div>

          <a href='#' className='text-black underline'>
            128 reviews
          </a>
        </div>

        {review}

        {patientName}
      </div>

      <a href='#' className='text-base font-medium text-main underline'>
        See more
      </a>
    </div>
  );
}
