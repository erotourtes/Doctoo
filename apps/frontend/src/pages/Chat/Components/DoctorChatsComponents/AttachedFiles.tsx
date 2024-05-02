import { Button } from '@/components/UI';
import type { IAttachment } from '@/dataTypes/Chat';
import AttachedFile from './AttachedFile';

type AttachedFilesProps = {
  chatAttachedFiles?: IAttachment[];
};

const AttachedFiles = ({ chatAttachedFiles }: AttachedFilesProps) => {
  return (
    <div className='relative col-span-1 h-full overflow-y-auto rounded-r-lg bg-white'>
      <h3 className='sticky top-0 bg-white p-6 pb-3 text-lg font-medium text-black'>Attached files</h3>

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
