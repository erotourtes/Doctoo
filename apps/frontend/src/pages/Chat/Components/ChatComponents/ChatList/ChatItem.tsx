import { openChat } from '@/app/chat/ChatSlice';
import { fetchReadMessages } from '@/app/chat/ChatThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Icon } from '@/components/UI';
import type { TChat } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
import { cn } from '@/utils/cn';
import { formatDateChat } from '@/utils/formatDateChat';
import { useEffect, useState } from 'react';

type ChatItemProps = {
  chat: TChat;
  active?: boolean;
};

const ChatItem = ({ chat, active = false }: ChatItemProps) => {
  const dispatch = useAppDispatch();
  const [imageLoaded, setImageLoaded] = useState(true);

  const role = useAppSelector(state => state.user.data.role);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const isOpenedChat = useAppSelector(state => state.chat.isOpenedChat);

  const recipient = role === Role.DOCTOR ? 'missedMessagesDoctor' : 'missedMessagesPatient';
  let missedMessages = chat[recipient];

  const formattedDate = chat.lastMessage ? formatDateChat(chat.lastMessage.sentAt) : null;
  const participant = chat.participant;

  useEffect(() => {
    active = openedChat?.id === chat.id && isOpenedChat;
  }, [openedChat, isOpenedChat]);

  useEffect(() => {
    if (openedChat && chat[recipient] > 0) {
      dispatch(fetchReadMessages(openedChat.id)).then(res => {
        if (!('error' in res)) {
          missedMessages = 0;
        }
      });
    }
  }, [chat[recipient], openedChat]);

  const handleOnClick = () => {
    dispatch(openChat({ chatId: chat.id }));
    dispatch(fetchReadMessages(chat.id));
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
          <div className='truncate text-base font-bold text-black'>{`${role === Role.PATIENT ? 'Dr.' : ''} ${participant.firstName} ${participant.lastName}`}</div>
          <div className='truncate text-sm font-normal text-black-2'>
            {chat.lastMessage?.appointment
              ? `Appointment at ${formatDateChat(chat.lastMessage.appointment.startedAt, true)}`
              : chat.lastMessage?.text}
          </div>
        </div>
        <div className='flex shrink-0 flex-col items-end gap-1'>
          <div className='text-sm font-normal text-grey-3'>{formattedDate}</div>
          {missedMessages > 0 && (
            <div className='flex size-6 items-center justify-center rounded-full bg-main text-center text-sm text-white'>
              {missedMessages}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatItem;
