import DayJS from 'dayjs';
import AttachedFile from './AttachedFile';

type MessageItemProps = {
  sender: 'me' | 'participant';
  text: string;
  sentAt: Date | string;
  attaches?: any[];
};

const MessageItem = ({ text, sender = 'participant', sentAt, attaches }: MessageItemProps) => {
  return (
    <div className={`${sender !== 'participant' ? 'text-white max-[1440px]:self-end' : 'max-[1440px]:self-start'}`}>
      <div
        className={`mb-2 flex max-w-80 flex-col gap-4 rounded-lg p-5 ${sender !== 'participant' ? 'bg-main' : 'bg-white'}`}
      >
        <div className='text'>{text}</div>
        {attaches
          ? attaches.map((attach, index) => {
              console.log(attach);
              return <AttachedFile fileName='Results_James_Anderson.pdf' key={index} />;
            })
          : null}
      </div>
      <span className='text-xs text-grey-2'>{DayJS(sentAt).format('HH:mm a')}</span>
    </div>
  );
};

export default MessageItem;
