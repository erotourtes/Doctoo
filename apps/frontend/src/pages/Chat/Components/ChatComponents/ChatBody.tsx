import DayJS from 'dayjs';
import type { IChat, IMessage } from '@/dataTypes/Chat';
import ChatHeader from './ChatHeader';
import React, { useEffect, useState } from 'react';
import MessageItem from './Message';
import InputChat from './InputChat';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/UI';
import useWindowWide from '@/hooks/useWindowWide';
import { closeChat } from '@/app/chat/ChatSlice';
import AttachedFiles from './AttachedFiles';
import { Role } from '@/dataTypes/User';

type ChatBodyProps = {
  chat: IChat | null;
  chatMessages: IMessage[];
  role?: Role | string;
  handleMessageSend?: (text: string) => void;
  className?: string;
};

const ChatBody = ({ chat, chatMessages = [], handleMessageSend, className = '', role }: ChatBodyProps) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [openAttachedFiles, setAttachedFiles] = useState(false);
  const me = useAppSelector(state => state.chat.me);
  const chatAttachedFiles = useAppSelector(state => state.chat.chatAttachedFiles);
  const w1024 = useWindowWide(1024);
  const w1280 = useWindowWide(1280);

  useEffect(() => {
    if (w1280) {
      setAttachedFiles(false);
    }
  }, [w1280]);

  const handleSend = () => {
    handleMessageSend!(inputValue);
    setInputValue('');
  };

  const handleBackToChats = () => {
    dispatch(closeChat());
  };

  const handleBackToChat = () => {
    setAttachedFiles(false);
  };

  const handleOpenAttachments = () => {
    setAttachedFiles(true);
  };

  return (
    <div className='relative flex w-full overflow-hidden pb-8'>
      {!chat ? (
        w1024 && (
          <div className='flex flex-1 flex-col items-center justify-center'>
            <div className='italic'>Select a chat to messaging</div>
          </div>
        )
      ) : (
        <>
          <div className={cn('flex h-full flex-1 flex-col overflow-hidden bg-white ' + className)}>
            {/* Chat header */}
            <ChatHeader
              participant={me?.role === Role.PATIENT || role === Role.PATIENT ? chat.doctor : chat.patient}
              beforeChildren={
                !w1024 && (
                  <button type='button' onClick={handleBackToChats}>
                    <Icon
                      variant='arrow-right'
                      className='size-10 rotate-180 text-grey-1 transition-all hover:text-dark-grey'
                    />
                  </button>
                )
              }
              afterChildren={
                !w1280 && (
                  <button type='button' onClick={handleOpenAttachments} className='rounded-md bg-main p-2 text-white'>
                    <Icon variant='file' className='size-6 text-white' />
                  </button>
                )
              }
            />

            {/* Body messages */}
            <div className='flex flex-grow flex-col-reverse items-start gap-4 overflow-y-auto bg-background px-5 py-3'>
              {chatMessages.map((message: IMessage, index) => {
                const currentDate = new Date(message.sentAt);
                const isFirstMessage = index === chatMessages.length - 1;
                const previousMessageDate = isFirstMessage ? null : new Date(chatMessages[index + 1].sentAt);
                const isDateDifferent =
                  DayJS(currentDate).format('YYYY-MM-DD') !== DayJS(previousMessageDate).format('YYYY-MM-DD');

                return (
                  <React.Fragment key={message.id}>
                    <MessageItem
                      text={message.text}
                      sentAt={message.sentAt}
                      sender={message.sender === me?.role || message.sender === role ? 'me' : 'participant'}
                    />
                    {isDateDifferent && (
                      <div className='self-center text-center text-sm text-grey-2'>
                        {DayJS(currentDate).format('D MMMM')}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Input */}
            <div className='flex-shrink-0'>
              <InputChat
                className=''
                inputValue={inputValue}
                onSend={handleSend}
                handleChange={e => {
                  setInputValue(e.target.value);
                }}
              />
            </div>
          </div>

          <AttachedFiles
            beforeChildren={
              !w1280 && (
                <button type='button' onClick={handleBackToChat}>
                  <Icon
                    variant='arrow-right'
                    className='size-10 rotate-180 text-grey-1 transition-all hover:text-dark-grey'
                  />
                </button>
              )
            }
            chatAttachedFiles={chatAttachedFiles}
            className={cn(
              `border-l border-l-grey-5 transition-all ${!w1280 ? 'absolute inset-0 z-10 translate-x-full border-l-0' : ''} ${openAttachedFiles ? 'translate-x-0' : ''}`,
            )}
          />
        </>
      )}
    </div>
  );
};

export default ChatBody;
