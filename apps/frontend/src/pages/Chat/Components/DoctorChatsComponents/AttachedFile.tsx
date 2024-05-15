import Icon from '@/components/UI/Icon/Icon';

type AttachedFileProps = {
  fileName: string;
};

const AttachedFile = ({ fileName }: AttachedFileProps) => {
  return (
    <div className='flex w-full items-center gap-2 rounded-lg bg-background p-2'>
      <div className='inline-flex shrink-0 rounded-md bg-main p-1'>
        <Icon variant='file' className='text-white' />
      </div>
      <span className='break-all text-sm text-black'>{fileName}</span>
    </div>
  );
};

export default AttachedFile;
