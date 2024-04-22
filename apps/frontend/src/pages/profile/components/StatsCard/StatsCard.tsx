import Icon from '@UI/Icon/Icon';
import type { IconVariant } from '@UI/Icon/types';
import { useState } from 'react';

type StatsCardProps = {
  title: string;
  value: string;
  iconVariant: IconVariant;
};

const StatsCard = ({ title, value, iconVariant }: StatsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [inputValue, setInputValue] = useState(value);

  return (
    <div className='flex w-full justify-between gap-4 rounded-lg bg-white p-7 pb-4 text-start'>
      <div className='flex flex-col gap-4'>
        <p className='w-full text-grey-1'>{title}</p>
        <p className='group flex w-fit items-center  text-black'>
          <input
            className={`w-fit bg-white font-medium outline-none`}
            disabled={isEditing}
            defaultValue={value}
            size={1}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Icon
            onClick={() => setIsEditing(!isEditing)}
            variant='edit'
            className='cursor-pointer text-lg text-grey-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          />
        </p>
      </div>
      <div className='h-fit rounded-lg bg-background p-2 text-grey-1 '>
        <Icon variant={iconVariant} className='h-7 w-7' />
      </div>
    </div>
  );
};

export default StatsCard;
