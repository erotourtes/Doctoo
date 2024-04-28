import Tag from '@/components/UI/Tag/Tag';
import Icon from '@/components/UI/Icon/Icon';
import { fn } from '@storybook/test';
import { Button } from '@/components/UI/Button/Button';
import AppointmentDetailsPopup from '../Modals/AppointmentsDetailsModal';
import { useState } from 'react';
import type { Specialization } from '@/dataTypes/Doctor';

interface MyDoctorCardProps {
  avatarKey: string;
  name: string;
  specializations: Specialization[];
  tags: string[];
  reviewsNumber: number;
  rating: number;
  variant: 'withBookButton' | 'withBookPrice';
  bookButtonElement?: React.ReactNode;
  bookPrice: number;
  about?: string;
}

const MyDoctorCard = ({
  avatarKey,
  name,
  reviewsNumber = 0,
  specializations,
  tags,
  rating,
  variant,
  bookPrice,
  about,
}: MyDoctorCardProps) => {
  const blueStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) stars.push(<Icon variant={'star'} className='text-main-dark' />);
    return stars;
  };

  const greyStars = () => {
    const stars = [];
    for (let i = 0; i < 5 - rating; i++) stars.push(<Icon variant={'star'} className='text-grey-2' />);
    return stars;
  };

  const [isAppointmentsDetailsPopupOpen, setIsAppointmentsDetailsPopupOpen] = useState(false);

  function closeAppointmentsDetailsPopup() {
    setIsAppointmentsDetailsPopupOpen(false);
  }

  return (
    <>
      <div className='box-border flex min-w-[auto] gap-3 rounded-xl bg-white px-6 py-5'>
        <div>
          <div className='h-28 w-28'>
            {avatarKey ? (
              <img className='rounded-lg' src={avatarKey} alt='doctor avatar' />
            ) : (
              <div className='h-[100%] w-[100%] rounded-lg bg-grey-3'></div>
            )}
          </div>
        </div>
        <div className='flex shrink grow basis-[auto] flex-col items-start'>
          <h4 className='mb-2 text-lg font-semibold text-black'>{name}</h4>
          <div className='text-medium mb-2 text-base text-grey-1'>
            {specializations &&
              specializations.map(specialization => <span key={specialization.id}>{specialization.name}</span>)}
          </div>
          <div className='mb-4 flex gap-3'>
            {tags.map((tag, i) => (
              <Tag key={i} text={tag} icon={false} />
            ))}
          </div>
          <div className='flex items-center gap-3'>
            {rating >= 0 && rating <= 5 && (
              <div className='flex'>
                {blueStars()}
                {greyStars()}
              </div>
            )}

            <div className='text-grey-1 underline'>{reviewsNumber} reviews</div>
          </div>
        </div>
        <div>
          <div className='flex h-[100%] flex-col gap-2'>
            <div className='shrink grow basis-[100%] self-end'>
              {variant === 'withBookButton' ? (
                <Button type={'primary'} onClick={() => setIsAppointmentsDetailsPopupOpen(true)}>
                  Book
                </Button>
              ) : (
                <div>
                  <span className='text-2xl font-bold text-main'>${bookPrice}</span>
                  <span className='text-base font-medium text-grey-1'> / visit</span>
                </div>
              )}
            </div>
            {variant === 'withBookButton' && (
              <div className='cursor-pointer text-grey-1 hover:underline' onClick={fn()}>
                <Icon className='inline-block size-7' variant={'favorite-empty'} />
                <span>Remove from favorites</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AppointmentDetailsPopup
        closeAppointmentsDetailsPopup={closeAppointmentsDetailsPopup}
        isAppointmentsDetailsPopupOpen={isAppointmentsDetailsPopupOpen}
        avatarKey={avatarKey}
        name={name}
        specializations={specializations}
        tags={tags}
        reviewsNumber={reviewsNumber}
        rating={rating}
        bookPrice={bookPrice}
        about={about}
      />
    </>
  );
};

export default MyDoctorCard;
