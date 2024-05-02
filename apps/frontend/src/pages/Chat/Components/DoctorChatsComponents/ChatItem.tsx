import { openChat } from '@/app/chat/ChatSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { IChat, IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
import DayJS from 'dayjs';
import { Link, useLocation } from 'react-router-dom';

type ChatItemProps = {
  chat: IChat;
  active?: boolean;
};

const ChatItem = ({ chat, active = false }: ChatItemProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const getSelected = (to: string) => {
    return location.pathname.startsWith(to);
  };

  const user = useAppSelector(state => state.user.data);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  active = openedChat?.id === chat.id && !getSelected('/chats/my');

  const formattedDate = chat.lastMessage ? formatDate(chat.lastMessage.sentAt) : null;
  let participant: IChatDoctor | IChatPatient = chat.doctor;
  if (user.role === Role.DOCTOR) {
    participant = chat.patient;
  }

  const handleOnClick = () => {
    dispatch(openChat({ chatId: chat.id }));
  };

  return (
    <Link
      onClick={handleOnClick}
      to={'/chats/' + chat.id}
      className={`flex items-start gap-2 px-6 py-2 no-underline transition-all ${!active ? 'bg-white' : 'bg-background'}`}
    >
      <div className='avatar size-8 shrink-0 overflow-hidden rounded-lg bg-main'>
        <img src={participant.avatar.url} alt={participant.avatar.name} />
      </div>
      <div className='grid flex-1 gap-1'>
        <div className='text-base font-bold text-black'>{`Dr. ${participant?.firstName} ${participant?.lastName}`}</div>
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
    </Link>
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
