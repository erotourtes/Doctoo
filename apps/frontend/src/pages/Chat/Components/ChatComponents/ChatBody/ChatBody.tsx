import DayJS from 'dayjs';
import { Fragment } from 'react/jsx-runtime';
import MessageItem from './Message';
import { cn } from '@/utils/cn';
import ChatHeader from './ChatHeader';
import type { Role } from '@/dataTypes/User';
import { Icon } from '@/components/UI';
import InputChat from '../InputChat/InputChat';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { sendMessage } from '@/app/chat/ChatThunks';
import type { TChat, TMessage } from '@/dataTypes/Chat';
import AppointmentMessage from './AppointmentMessage';
import { useEffect, useState } from 'react';
import { getAppointment } from '@/app/appointment/AppointmentThunks';
import ChatAppointmentPopup from '../Popups/ChatAppointmentPopup';

type ChatBodyProps = {
  chat: TChat;
  chatMessages: TMessage[];
  className?: string;
  role?: string | Role;
  showBackBtn?: boolean;
  handleBackToChats?: () => void;
  showFilesBtn?: boolean;
  handleOpenAttachments?: () => void;
};

const ChatBody = ({
  chat,
  chatMessages,
  className,
  role,
  showBackBtn = false,
  handleBackToChats = () => {},
  showFilesBtn = false,
  handleOpenAttachments = () => {},
}: ChatBodyProps) => {
  const dispatch = useAppDispatch();
  const [openedAppointmentId, setOpenedAppointmentId] = useState<string | null>(null);
  const [openedAppointmentDetails, setOpenedAppointmentDetails] = useState(false);
  const openedAppointment = useAppSelector(state => state.appointment.appointment);

  useEffect(() => {
    if (openedAppointmentId) {
      dispatch(getAppointment(openedAppointmentId));
    }
  }, [openedAppointmentId]);

  useEffect(() => {
    if (chatMessages.length) {
      const message = chatMessages.find(m => m.appointment?.id === openedAppointmentId);
      if (message && openedAppointmentId) {
        dispatch(getAppointment(openedAppointmentId));
      }
    }
  }, [chatMessages]);

  const handleSend = (formData: FormData) => {
    let success = true;
    if (chat) {
      dispatch(sendMessage({ chatId: chat.id, messageData: formData })).then(res => {
        if ('error' in res) {
          success = false;
        }
      });
    }
    return success;
  };

  return (
    <div className='h-full flex-1'>
      <div className={cn('flex h-full flex-1 flex-col overflow-hidden bg-white ', className)}>
        {/* Chat header */}
        <ChatHeader
          participant={chat.participant}
          beforeChildren={
            showBackBtn && (
              <button type='button' onClick={handleBackToChats}>
                <Icon
                  variant='arrow-right'
                  className='size-10 rotate-180 text-grey-1 transition-all hover:text-dark-grey'
                />
              </button>
            )
          }
          afterChildren={
            showFilesBtn && (
              <button type='button' onClick={handleOpenAttachments} className='rounded-md bg-main p-2 text-white'>
                <Icon variant='file' className='size-6 text-white' />
              </button>
            )
          }
        />

        {/* Body messages */}
        <div className='flex flex-grow flex-col-reverse items-start gap-4 overflow-y-auto bg-background px-5 py-3'>
          {chatMessages && chatMessages.length ? (
            chatMessages.map((message: TMessage, index) => {
              const currentDate = new Date(message.sentAt);
              const isFirstMessage = index === chatMessages.length - 1;
              const previousMessageDate = isFirstMessage ? null : new Date(chatMessages[index + 1].sentAt);
              const isDateDifferent =
                DayJS(currentDate).format('YYYY-MM-DD') !== DayJS(previousMessageDate).format('YYYY-MM-DD');

              return (
                <Fragment key={message.id}>
                  {!message.appointment ? (
                    <MessageItem
                      text={message.text}
                      sentAt={message.sentAt}
                      sender={message.sender === role || message.sender === role ? 'me' : 'participant'}
                      attaches={message.attachments}
                    />
                  ) : (
                    <AppointmentMessage
                      appointment={message.appointment}
                      className='self-center pb-4'
                      onClickViewDetails={a => {
                        setOpenedAppointmentId(a);
                        setOpenedAppointmentDetails(true);
                      }}
                    />
                  )}
                  {isDateDifferent && (
                    <div className='self-center text-center text-sm text-grey-2'>
                      {DayJS(currentDate).format('D MMMM')}
                    </div>
                  )}
                </Fragment>
              );
            })
          ) : (
            <span className='w-full text-center italic'>No messages here yet.</span>
          )}
        </div>

        {/* Input */}
        <div className='flex-shrink-0'>
          <InputChat
            onSend={formData => {
              return handleSend(formData);
            }}
          />
        </div>
      </div>

      <ChatAppointmentPopup
        isOpen={openedAppointmentDetails}
        onClose={() => setOpenedAppointmentDetails(false)}
        appointment={openedAppointment}
      />
    </div>
  );
};

export default ChatBody;
