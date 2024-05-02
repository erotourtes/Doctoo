import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { handleNewChat, handleNewMessages, joinChat, sendMessage } from '@/app/chat/ChatActions';
import { getChatMessages, getChatsForPatient, getMe } from '@/app/chat/ChatThunks';
import { deleteChatMessages, openChat } from '@/app/chat/ChatSlice';

import PageHeader from '@/pages/PageHeader';
import ChatTabs from './Components/ChatTabs';
import ChatList from './Components/ChatList';
import ChatBody from './Components/ChatBody';
import AttachedFiles from './Components/AttachedFiles';

const ChatPage = () => {
  const me = useAppSelector(state => state.chat.me);
  const chats = useAppSelector(state => state.chat.chats);
  const openedChat = useAppSelector(state => state.chat.openedChat);

  const chatMessages = useAppSelector(state => state.chat.chatMessages);
  const chatAttachedFiles = useAppSelector(state => state.chat.chatAttachedFiles);
  const dispatch = useAppDispatch();
  const { chatId } = useParams();

  const location = useLocation();
  const getSelected = (to: string) => {
    return location.pathname.startsWith('/chats' + to);
  };

  useEffect(() => {
    dispatch(getChatsForPatient());
    dispatch(getMe());
  }, []);

  useEffect(() => {
    if (chatId) {
      dispatch(openChat({ chatId }));
    }
  }, [chatId]);

  useEffect(() => {
    if (me) {
      dispatch(joinChat(me.id));
      dispatch(handleNewChat());
      dispatch(handleNewMessages(chats));
    }
  }, [me, chats]);

  useEffect(() => {
    if (openedChat && openedChat.id === chatId) {
      dispatch(deleteChatMessages());
      dispatch(getChatMessages({ id: openedChat.id }));
    }
  }, [openedChat]);

  const handleMessageSend = (text: string) => {
    if (openedChat && me) {
      dispatch(sendMessage({ userId: me.id, chatId: openedChat.id, message: text }));
    }
  };

  return (
    <div className='flex h-full flex-col pb-8'>
      <div className=''>
        <PageHeader iconVariant={'chats'} title='Chats' className='mb-0' />
      </div>
      <div className='section grid h-full grid-rows-[auto_1fr] pt-6'>
        <ChatTabs role={me?.role} countChats={chats.length} />

        {!getSelected('/assistant') ? (
          <div className='grid h-full max-w-full grid-cols-[300px_auto_minmax(0,256px)] overflow-hidden'>
            {/* Chat list */}
            <ChatList chats={chats} />
            {chatId && openedChat ? (
              <>
                {/* Body messages */}
                <ChatBody
                  chat={openedChat}
                  chatMessages={chatMessages}
                  handleMessageSend={text => {
                    handleMessageSend(text);
                  }}
                />

                {/* Attached files */}
                <AttachedFiles chatAttachedFiles={chatAttachedFiles} />
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatPage;
