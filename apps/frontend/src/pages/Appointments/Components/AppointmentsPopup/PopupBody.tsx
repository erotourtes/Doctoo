import Icon from '@/components/UI/Icon/Icon';
import StarsRating from '@/components/UI/StarsRating/StarsRating';
type PopupBodyProps = {
  fullName: string;
  avatarKey: string;
  openReschedule: () => void;
  doctorId: string;
  rating: number;
  reviewsCount: number;
};

export default function PopupBody({
  fullName,
  avatarKey,
  openReschedule,
  doctorId,
  rating,
  reviewsCount,
}: PopupBodyProps) {
  return (
    <>
      <div className='flex h-32 justify-start gap-x-6'>
        <img src={avatarKey} alt={fullName} className='max-h-28 max-w-28 rounded-lg' />

        <div className='flex w-full flex-col'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex h-6 flex-row justify-between text-lg'>
              <span className='font-medium text-black'>
                Appointment with <span className='font-semibold text-main'>{fullName}</span>
              </span>

              <div className='flex cursor-pointer items-end justify-center gap-x-1' onClick={openReschedule}>
                <Icon variant='edit' className='h-[18px] w-[18px] text-grey-1' />
                <span className='h-5 text-sm font-medium text-grey-1'>Reschedule</span>
              </div>
            </div>

            <span className='text-base font-medium text-grey-1'>{'placeholder'}</span>
          </div>

          <div className='my-4 flex h-fit w-fit items-center justify-center rounded-2xl bg-main-light px-3 py-1 pb-1'>
            <span className='select-none text-sm font-normal text-main-dark'>Top doctor placeholder</span>
          </div>

          <StarsRating doctorId={doctorId} doctorRating={rating} doctorReviewsCount={reviewsCount} />
        </div>
      </div>
    </>
  );
}
