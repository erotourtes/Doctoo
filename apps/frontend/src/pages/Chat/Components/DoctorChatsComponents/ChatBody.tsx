import DayJS from 'dayjs';
import type { IChat, IMessage } from '@/dataTypes/Chat';
import ChatHeader from './ChatHeader';
import React, { useState } from 'react';
import MessageItem from './Message';
import InputChat from './InputChat';
import { useAppSelector } from '@/app/hooks';

type ChatBodyProps = {
  chat: IChat;
  chatMessages: IMessage[];
  handleMessageSend?: (text: string) => void;
};

const ChatBody = ({ chat, chatMessages = [], handleMessageSend }: ChatBodyProps) => {
  const [inputValue, setInputValue] = useState('');
  const me = useAppSelector(state => state.chat.me);

  const handleSend = () => {
    handleMessageSend!(inputValue);
    setInputValue('');
  };

  return (
    <div className='flex h-full flex-col overflow-hidden border-x border-x-grey-5 bg-white'>
      {/* Chat header */}
      <ChatHeader chat={chat} />

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
                sender={message.sender === me?.role ? 'me' : 'participant'}
              />
              <div className='self-center text-center text-sm text-grey-2'>
                {isDateDifferent && DayJS(currentDate).format('D MMMM')}
              </div>
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
  );
};

export default ChatBody;
