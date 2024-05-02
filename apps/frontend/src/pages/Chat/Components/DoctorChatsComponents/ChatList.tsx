import React, { useState } from 'react';
import { InputSearch } from '@/components/UI';
import ChatItem from './ChatItem';
import type { IChat } from '@/dataTypes/Chat';
import { useAppSelector } from '@/app/hooks';
import { useLocation } from 'react-router';

type ChatListProps = {
  chats?: IChat[];
};

const ChatList = ({ chats }: ChatListProps) => {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const getSelected = (to: string) => {
    return location.pathname.startsWith(to);
  };
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const active = openedChat && !getSelected('/chats/my');

  return (
    <div className='relative max-h-full overflow-y-auto'>
      <div className={`flex flex-col self-start bg-white pb-6 ${active ? 'rounded-es-xl' : 'rounded-b-xl'}`}>
        <div className='sticky top-0 bg-white p-6'>
          <InputSearch
            value={searchText}
            setValue={value => {
              setSearchText(value);
            }}
            variant='grey'
            placeholder='Search'
            className='w-full'
          />
        </div>
        <div className='list flex flex-col gap-3'>
          {chats
            ? chats.map((chatItem: IChat, index) => {
                return (
                  <React.Fragment key={'chat' + index}>
                    <ChatItem chat={chatItem} />
                    {index < chats.length - 1 ? <span className='block h-px bg-grey-5'></span> : null}
                  </React.Fragment>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
