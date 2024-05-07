import { openChat } from '@/app/chat/ChatSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Icon } from '@/components/UI';
import type { IChat, IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
import { cn } from '@/utils/cn';
import DayJS from 'dayjs';
import { useEffect, useState } from 'react';

type ChatItemProps = {
  chat: IChat;
  active?: boolean;
};

const ChatItem = ({ chat, active = false }: ChatItemProps) => {
  const dispatch = useAppDispatch();
  const [imageLoaded, setImageLoaded] = useState(true);

  const user = useAppSelector(state => state.user.data);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const isOpenedChat = useAppSelector(state => state.chat.isOpenedChat);

  const formattedDate = chat.lastMessage ? formatDate(chat.lastMessage.sentAt) : null;
  let participant: IChatDoctor | IChatPatient = chat.doctor;
  if (user.role === Role.DOCTOR) {
    participant = chat.patient;
  }

  useEffect(() => {
    active = openedChat?.id === chat.id && isOpenedChat;
  }, [openedChat, isOpenedChat]);

  const handleOnClick = () => {
    dispatch(openChat({ chatId: chat.id }));
  };

  return (
    <button
      type='button'
      onClick={handleOnClick}
      className={cn(
        `flex items-center gap-2 bg-white px-6 py-2 text-left no-underline transition-all hover:bg-background ${active ? 'bg-background' : ''}`,
      )}
    >
      <div className='avatar size-8 shrink-0 overflow-hidden rounded-lg'>
        {participant.avatarKey && imageLoaded ? (
          <img
            src={`${import.meta.env.VITE_S3_BASE_URL}/${participant.avatarKey}`}
            alt={participant.avatarKey}
            className='size-full object-cover'
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        ) : (
          <Icon variant='account' className='size-full text-main' />
        )}
      </div>
      <div className='flex flex-1 items-start gap-2'>
        <div className='grid flex-1 gap-1'>
          <div className='truncate text-base font-bold text-black'>{`${user.role === Role.PATIENT ? 'Dr.' : ''} ${participant.firstName} ${participant.lastName}`}</div>
          <div className='truncate text-sm font-normal text-black-2'>{chat.lastMessage?.text}</div>
        </div>
        <div className='flex shrink-0 flex-col items-end gap-1'>
          <div className='text-sm font-normal text-grey-3'>{formattedDate}</div>
          {/* {chat.countNewMessage ?
          <div className="flex items-center justify-center size-6 bg-main rounded-full text-sm text-center text-white">
          {chat.countNewMessage}
          </div>
        : null} */}
        </div>
      </div>
    </button>
  );
};

const formatDate = (date: Date): string => {
  const currentDay = DayJS().startOf('day');
  const messageDay = DayJS(date).startOf('day');
  const isToday = currentDay.isSame(messageDay);
  const isThisWeek = currentDay.diff(messageDay, 'days') < 7;

  if (isToday) {
    return DayJS(date).format('HH:mm');
  } else if (isThisWeek) {
    return DayJS(date).format('ddd');
  } else {
    return DayJS(date).format('DD.MM.YYYY');
  }
};

export default ChatItem;
