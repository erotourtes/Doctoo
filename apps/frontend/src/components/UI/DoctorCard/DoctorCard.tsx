import Icon from '@UI/Icon/Icon';
import { Button } from '../Button/Button';
import Tag from '../Tag/Tag';
import type { Specialization } from '../../../dataTypes/Doctor';
import type React from 'react';
import { cn } from '../../../utils/cn';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../../app/hooks';
import { addDoctorToFavorites, removeDoctorFromFavorites } from '../../../app/doctor/DoctorThunks';

const DoctorCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-auto grid-cols-[max-content_1fr] rounded-xl bg-white p-6 sm:grid-cols-[max-content_1fr_max-content] md:grid-rows-4 lg:h-[176px]',
        className,
      )}
    >
      {children}
    </div>
  );
};

DoctorCard.Image = Image;
DoctorCard.ImageWithFavorite = ImageWithFavorite;
DoctorCard.Name = Name;
DoctorCard.Specializations = Specializations;
DoctorCard.Tags = Tags;
DoctorCard.Rating = Rating;
DoctorCard.BookButton = BookButton;
DoctorCard.TimeSlots = TimeSlots;
DoctorCard.PayrateLabel = PayrateLabel;

type ImageProps = {
  url: string;
  className?: string;
};

function Image({ url, className }: ImageProps) {
  return (
    <img
      src={url}
      className={cn('col-span-1 row-span-3 aspect-square h-[80px] rounded-lg sm:row-span-4 sm:h-[112px]', className)}
      alt='DOCTOR_AVATAR'
    />
  );
}

type ImageWithFavoriteProps = {
  doctorId: string;
  url: string;
  isFavorite: boolean;
};

function ImageWithFavorite({ doctorId, url, isFavorite }: ImageWithFavoriteProps) {
  const dispatch = useAppDispatch();
  return (
    <div className='group relative col-span-1 row-span-3 aspect-square h-[80px] sm:row-span-4 sm:h-[112px]'>
      <img src={url} className='rounded-lg' alt='DOCTOR_AVATAR' />
      <div className='absolute left-0 top-0 flex h-full w-full items-end justify-end rounded-lg bg-semi-transparent opacity-0 transition duration-300 group-hover:opacity-100'>
        <button
          className='mb-1 mr-1 rounded-lg bg-white hover:bg-grey-5'
          onClick={() =>
            isFavorite ? dispatch(removeDoctorFromFavorites(doctorId)) : dispatch(addDoctorToFavorites(doctorId))
          }
        >
          <Icon variant={isFavorite ? 'favorite-filled' : 'favorite-empty'} />
        </button>
      </div>
    </div>
  );
}

type NameProps = { children: React.ReactNode; className?: string };

function Name({ children, className }: NameProps) {
  return (
    <h1 className={cn('col-start-2 row-span-1 px-2 text-lg font-semibold md:col-span-1', className)}>{children}</h1>
  );
}

type SpecializationsProps = { specializations: Specialization[]; className?: string };

function Specializations({ specializations, className }: SpecializationsProps) {
  return (
    <h2
      className={cn(
        'col-span-1 col-start-2 row-span-1 row-start-2 whitespace-break-spaces px-2 text-base font-medium text-grey-1',
        className,
      )}
    >
      {specializations.map(spec => spec.name).join(', ')}
    </h2>
  );
}

type TagsProps = { tags: string[]; tagClassName?: string };

function Tags({ tags, tagClassName }: TagsProps) {
  return (
    <div className='col-span-full col-start-1 row-span-1 my-1 whitespace-pre-wrap sm:col-start-2 sm:px-2 md:col-span-1 md:col-start-2 md:row-start-3 md:flex md:space-x-2'>
      {tags.map((tag, i) => (
        <Tag key={i} text={tag} icon={false} className={cn('max-sm:mr-2 max-sm:mt-1', tagClassName)} />
      ))}
    </div>
  );
}

type RatingProps = { rating: number; reviewsCount: number; starClassName?: string };

function Rating({ rating, reviewsCount, starClassName }: RatingProps) {
  const getRatingStars = () => {
    const stars = [];
    for (let i = 0; i <= 4; i++) {
      if (rating < i + 0.5) stars.push(<Icon variant='star' className={cn('text-grey-3', starClassName)} />);
      else if (rating > i + 0.5) stars.push(<Icon variant='star' className={cn('text-main', starClassName)} />);
      else stars.push(<Icon variant='star-half' className={cn('text-main', starClassName)} />);
    }
    return stars;
  };
  return (
    <div className='col-span-full row-span-1 flex items-center space-x-2 whitespace-pre-line px-2 text-main-medium sm:col-span-1 sm:col-start-2'>
      <span className='flex'>{getRatingStars()}</span>

      <span className='ml-2 text-black underline sm:whitespace-nowrap'>{reviewsCount} reviews</span>
    </div>
  );
}

type BookButtonProps = { onClick: () => void; disabled?: boolean; className?: string };

function BookButton({ className, disabled, onClick }: BookButtonProps) {
  return (
    <Button
      type='primary'
      className={cn(
        'col-span-full row-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:w-28 lg:justify-self-end',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      Book
    </Button>
  );
}

type TimeSlotsProps = { timestamps: string[] | Date[]; onClickSlot: (index: number) => void; onClickMore: () => void };

function TimeSlots({ timestamps, onClickSlot, onClickMore }: TimeSlotsProps) {
  let countToShow = 0;
  if (timestamps.length <= 3) countToShow = timestamps.length;
  else if (timestamps.length === 4) countToShow = timestamps.length;
  else countToShow = 3;
  const timestampToHoursMinutes = (timestamp: string | Date) => {
    return dayjs(timestamp).format('hh:mm a');
  };
  return (
    <div className='col-span-full col-start-1 mt-1 md:row-auto lg:col-start-3 lg:row-start-2 lg:row-end-4 lg:mt-0'>
      <div className={`grid ${timestamps.length > 1 ? 'grid-cols-2 grid-rows-2' : ''} gap-2 whitespace-nowrap`}>
        {timestamps.slice(0, countToShow).map((timestamp, i) => (
          <Button
            key={i}
            type='secondary'
            className='min-w-fit px-0 sm:min-w-16 lg:w-28'
            onClick={() => onClickSlot(i)}
            disabled={false}
          >
            {timestampToHoursMinutes(timestamp)}
          </Button>
        ))}

        {timestamps.length > 4 ? (
          <Button
            type='secondary'
            className='min-w-fit px-0 sm:min-w-16 lg:w-28'
            onClick={onClickMore}
            disabled={false}
          >
            More times
          </Button>
        ) : null}
      </div>
    </div>
  );
}

type PayrateLabelProps = { payrate: number; numberClassName?: string };

function PayrateLabel({ payrate, numberClassName }: PayrateLabelProps) {
  return (
    <p className='col-start-2 row-span-1 row-start-3 px-2 sm:col-start-3 sm:row-start-1 md:row-start-1 md:text-right'>
      <span className={cn('text-lg', numberClassName)}>${payrate}</span>
      <span className='text-sm text-grey-1'> / visit</span>
    </p>
  );
}

export default DoctorCard;
