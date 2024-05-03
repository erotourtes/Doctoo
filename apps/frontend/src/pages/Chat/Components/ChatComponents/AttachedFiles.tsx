import { Button } from '@/components/UI';
import type { IAttachment } from '@/dataTypes/Chat';
import AttachedFile from './AttachedFile';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type AttachedFilesProps = {
  chatAttachedFiles?: IAttachment[];
  className?: string;
  beforeChildren?: ReactNode;
};

const AttachedFiles = ({ chatAttachedFiles, className = '', beforeChildren }: AttachedFilesProps) => {
  return (
    <div className={cn('relative col-span-1 h-full overflow-y-auto rounded-r-lg bg-white ' + className)}>
      <div className='sticky top-0 flex flex-shrink-0 items-center gap-2 p-6 pb-3'>
        {beforeChildren}
        <h3 className='bg-white text-lg font-medium text-black'>Attached files</h3>
      </div>

      {chatAttachedFiles && chatAttachedFiles.length > 0 ? (
        <div className='list flex flex-col gap-6 px-6'>
          <AttachedFile fileName='Results_James_Anderson.pdf' />
        </div>
      ) : null}
      <div className='sticky bottom-0 bg-white p-6'>
        <Button btnType='button' type='primary' className='w-full'>
          Book appointment
        </Button>
      </div>
    </div>
  );
};

export default AttachedFiles;
