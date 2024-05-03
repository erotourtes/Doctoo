import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getChats, getMe } from '@/app/chat/ChatThunks';
import PageHeader from '@/pages/PageHeader';
import ChatTabs from './Components/ChatComponents/ChatTabs';
import { VirtualAssistantChat } from './Components/VirtualAssistantChatComponents/VirtualAssistantChat';
import Chat from './Components/ChatComponents/Chat';

const ChatPage = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(state => state.chat.me);
  const chats = useAppSelector(state => state.chat.chats);

  const location = useLocation();
  const getSelected = (to: string) => {
    return location.pathname.startsWith('/chats' + to);
  };

  useEffect(() => {
    dispatch(getChats());
    dispatch(getMe());
  }, []);

  return (
    <div className='flex h-full flex-col'>
      <div className=''>
        <PageHeader iconVariant={'chats'} title='Chats' className='mb-0' />
      </div>
      <div className='section grid h-full grid-rows-[auto_1fr] pt-6'>
        <ChatTabs role={me?.role} countChats={chats.length} />

        {getSelected('/my') && <Chat />}
        {getSelected('/assistant') && <VirtualAssistantChat />}
      </div>
    </div>
  );
};

export default ChatPage;
