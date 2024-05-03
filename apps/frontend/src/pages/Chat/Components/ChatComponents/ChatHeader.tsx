import type { IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type ChatHeaderProps = {
  participant: IChatDoctor | IChatPatient | undefined;
  beforeChildren?: ReactNode;
  afterChildren?: ReactNode;
};

const ChatHeader = ({ participant, beforeChildren, afterChildren }: ChatHeaderProps) => {
  return (
    <div className='flex flex-shrink-0 items-center justify-between gap-2 p-5'>
      {beforeChildren}
      <div className='flex flex-1 flex-shrink-0 items-center gap-2'>
        <div
          className={cn(
            `avatar size-12 overflow-hidden rounded-lg max-md:size-10 max-sm:size-8 ${!participant ? 'bg-grey-1' : ''}`,
          )}
        >
          {participant ? <img src={participant?.avatar.url} alt={participant?.avatar.name} /> : null}
        </div>
        <div className='grid flex-1 gap-1'>
          <div className='truncate text-lg font-bold text-black max-md:text-base'>
            {participant ? `${participant?.firstName} ${participant?.lastName}` : `Participant`}
          </div>
          {participant && 'specializationName' in participant && participant.specializationName ? (
            <div className='truncate text-base font-normal text-black-2 max-md:text-sm'>
              {participant.specializationName}
            </div>
          ) : null}
        </div>
        {afterChildren}
      </div>
    </div>
  );
};

export default ChatHeader;
