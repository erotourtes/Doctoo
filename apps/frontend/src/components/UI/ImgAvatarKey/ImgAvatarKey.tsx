import { useState, type FC } from 'react';
import Icon from '../Icon/Icon';
import { cn } from '../../../utils/cn';

const ImgAvatarKey: FC<{
  avatarKey?: string | null;
  className?: string;
}> = ({ avatarKey, className }) => {
  const [error, setError] = useState(false);
  const url = avatarKey !== '' ? `${import.meta.env.VITE_S3_BASE_URL}/${avatarKey}` : null;

  if (url && !error)
    return (
      <img
        src={url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          setError(true);
        }}
        alt='avatar'
        className={cn('h-full w-full object-contain', className)}
      />
    );
  return <Icon variant='account' className={cn('h-full w-full text-main', className)} />;
};

export default ImgAvatarKey;
