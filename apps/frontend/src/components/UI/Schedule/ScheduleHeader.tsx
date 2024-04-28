import Icon from '../Icon/Icon';

type ScheduleHeader = {
  fullName: string;
  avatar: string;
  // rating: number;
  reviewsCount: number;
  specialization: string;
  payrate: number;
};

export default function ScheduleHeader({
  fullName,
  avatar,
  // rating,
  reviewsCount,
  specialization,
  payrate,
}: ScheduleHeader) {
  return (
    <div className='flex items-center gap-x-6'>
      <img width={112} height={112} src={avatar} alt={fullName} className='rounded-lg' />

      <div className='flex flex-1 flex-col gap-y-2'>
        <div className='flex justify-between'>
          <span className='text-2xl font-bold text-black'>{fullName}</span>
          <div>
            <span className='text-2xl font-bold text-main'>${payrate}</span>
            <span className='text-base font-medium text-grey-1'> / visit</span>
          </div>
        </div>

        <div className='flex flex-col gap-y-2'>
          <span className='text-base font-medium text-grey-1'>{specialization}</span>

          <div className='flex items-center gap-x-3'>
            <div className='flex cursor-pointer gap-x-1'>
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
              ))}
            </div>

            <a href='#' className='text-black underline'>
              {reviewsCount} reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
