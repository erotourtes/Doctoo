import Icon from '@/components/UI/Icon/Icon';

type PopupBodyProps = { fullName: string; avatarKey: string };

export default function PopupBody({ fullName, avatarKey }: PopupBodyProps) {
  return (
    <div className='flex h-32 justify-start gap-x-6'>
      <img src={avatarKey} alt={fullName} className='max-h-28 max-w-28 rounded-lg' />

      <div className='flex w-full flex-col'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex h-6 flex-row justify-between text-lg'>
            <span className='font-medium text-black'>
              Appointment with <span className='font-semibold text-main'>{fullName}</span>
            </span>

            <div className='flex cursor-pointer items-end justify-center gap-x-1'>
              <Icon variant='edit' className='h-[18px] w-[18px] text-grey-1' />
              <span className='h-5 text-sm font-medium text-grey-1'>Reschedule</span>
            </div>
          </div>

          <span className='text-base font-medium text-grey-1'>{'placeholder'}</span>
        </div>

        <div className='my-4 flex h-fit w-fit items-center justify-center rounded-2xl bg-main-light px-3 py-1 pb-1'>
          <span className='select-none text-sm font-normal text-main-dark'>Top doctor placeholder</span>
        </div>

        <div className='flex items-center gap-x-3'>
          <div className='flex cursor-pointer gap-x-1'>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
            ))}
          </div>

          <a href='#' className='text-black underline'>
            128 reviews (placeholder)
          </a>
        </div>
      </div>
    </div>
  );
}
