import { Badge } from '@/components/UI';
import Icon from '@/components/UI/Icon/Icon';
import StarsRating from '@/components/UI/StarsRating/StarsRating';
import { IDoctor } from '@/dataTypes/Doctor';
type PopupBodyProps = {
  openReschedule: () => void;
  doctorId: string;
  status: string;
  doctor: IDoctor;
};

export default function PopupBody({ openReschedule, doctorId, status, doctor }: PopupBodyProps) {
  const { firstName, lastName, avatarKey, rating, reviewsCount, specializations } = doctor;
  const fullName = `Dr. ${firstName} ${lastName}`;

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

              {(status === 'PLANNED' || status === 'PENDING_PAYMENT') && (
                <div className='flex cursor-pointer items-end justify-center gap-x-1' onClick={openReschedule}>
                  <Icon variant='edit' className='h-[18px] w-[18px] text-grey-1' />
                  <span className='h-5 text-sm font-medium text-grey-1'>Reschedule</span>
                </div>
              )}
            </div>

            <span className='text-base font-medium text-grey-1'>{specializations[0].name}</span>
          </div>

          <Badge badgeColor='bg-main-light' labelColor='text-main'>
            Top doctor
          </Badge>

          <StarsRating doctorId={doctorId} doctorRating={rating} doctorReviewsCount={reviewsCount} />
        </div>
      </div>
    </>
  );
}
