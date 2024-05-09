import type { TAttachment } from '@/dataTypes/Chat';
import AttachedFile from './AttachedFile';
import { cn } from '@/utils/cn';
import { type ReactNode } from 'react';
import BookAppointmentBtn from './BookAppointmentBtn';

export type AttachedFilesProps = {
  chatAttachedFiles: TAttachment[];
  className?: string;
  beforeChildren?: ReactNode;
};

const AttachedFiles = ({ chatAttachedFiles, className = '', beforeChildren }: AttachedFilesProps) => {
  return (
    <>
      <div className={cn('relative col-span-1 flex h-full flex-col overflow-y-auto rounded-r-lg bg-white ', className)}>
        <div className='sticky top-0 flex flex-shrink-0 items-center gap-2 bg-white p-6 pb-3'>
          {beforeChildren}
          <h3 className='text-lg font-medium text-black'>Attached files</h3>
        </div>

        {chatAttachedFiles.length > 0 ? (
          <div className='list flex flex-1 flex-col gap-3 px-6'>
            {chatAttachedFiles.map((attach, index) => (
              <AttachedFile key={index} fileName={attach.attachmentKey} />
            ))}
          </div>
        ) : null}

        <BookAppointmentBtn />
      </div>
    </>
  );
};

export default AttachedFiles;
