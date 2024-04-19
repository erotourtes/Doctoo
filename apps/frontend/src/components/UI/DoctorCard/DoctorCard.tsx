import Icon from '../../icons/Icon';
import { Button } from '../Button/Button';
import { ButtonTypes } from '../Button/ButtonTypes';
import Tag from '../Tag/Tag';

interface DoctorCardProps {
  avatarUrl: string;
  name: string;
  specialization: string;
  reviews: number;
  tags: string[];
  buttons: string[];
  isBookMode: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  avatarUrl,
  name,
  specialization,
  tags,
  reviews,
  buttons,
  isBookMode,
}) => {
  return (
    <div className='flex h-[176px] w-[697px] rounded-xl'>
      <div className='m-6 flex w-full justify-between'>
        <div className='flex flex-row items-start space-x-2'>
          <img src={avatarUrl} className='h-full rounded-lg' alt='DOCTOR_AVATAR' />

          <div className='space-y-3'>
            <div>
              <h1 className='text-xl font-semibold'>{name}</h1>
              <h2 className='font-semibold text-main-dark'>{specialization}</h2>
            </div>

            <div className='flex space-x-2'>
              {tags.map((tag, i) => (
                <Tag key={i} text={tag} icon={false} />
              ))}
            </div>

            <div className='flex items-center space-x-2 text-main-medium'>
              <Icon variant='star' />
              <Icon variant='star' />
              <Icon variant='star' />
              <Icon variant='star' />
              <Icon variant='star' />

              <span className='ml-2 cursor-pointer text-black underline'>{reviews} reviews</span>
            </div>
          </div>
        </div>

        {isBookMode && (
          <Button type={ButtonTypes.SECONDARY} className='w-28' onClick={() => {}} disabled={false}>
            Book
          </Button>
        )}

        {!isBookMode && (
          <div className='flex flex-col justify-between'>
            <p className='text-right'>
              <span className='text-xl font-semibold'>$75</span>/visit
            </p>

            <div className='grid grid-cols-2 grid-rows-2 gap-2'>
              {buttons.map((button, i) => (
                <Button key={i} type={ButtonTypes.SECONDARY} className='w-28' onClick={() => {}} disabled={false}>
                  {button}
                </Button>
              ))}

              <Button type={ButtonTypes.SECONDARY} className='w-28' onClick={() => {}} disabled={false}>
                More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
