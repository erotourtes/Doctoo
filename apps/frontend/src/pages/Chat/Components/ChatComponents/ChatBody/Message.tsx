import DayJS from 'dayjs';
import AttachedFile from '../AttachedFiles/AttachedFile';
import type { IAttachment } from '@/dataTypes/Chat';
import { cn } from '@/utils/cn';

type MessageItemProps = {
  sender: 'me' | 'participant';
  text: string;
  sentAt: Date | string;
  attaches?: IAttachment[];
};

const MessageItem = ({ text, sender = 'participant', sentAt, attaches }: MessageItemProps) => {
  return (
    <div className={cn(sender !== 'participant' ? 'text-white max-[1440px]:self-end' : 'max-[1440px]:self-start')}>
      <div
        className={cn(
          'flex max-w-80 flex-col gap-4 rounded-lg p-5 max-sm:p-3',
          sender !== 'participant' ? 'bg-main' : 'bg-white',
        )}
      >
        <pre className='text font-sans text-base'>{text}</pre>
        {attaches && attaches.length > 0 && (
          <div className='grid gap-2'>
            {attaches.map((attach, index) => {
              return (
                <div key={index}>
                  {attach.attachmentKey.toLowerCase().endsWith('.jpg') ||
                  attach.attachmentKey.toLowerCase().endsWith('.png') ||
                  attach.attachmentKey.toLowerCase().endsWith('.gif') ? (
                    <img
                      className='max-w-full object-contain'
                      src={`${import.meta.env.VITE_S3_BASE_URL}/${attach.attachmentKey}`}
                      alt={`Image ${index}`}
                    />
                  ) : (
                    <AttachedFile fileName={attach.attachmentKey} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <span className='text-xs text-grey-2'>{DayJS(sentAt).format('HH:mm a')}</span>
    </div>
  );
};

export default MessageItem;
