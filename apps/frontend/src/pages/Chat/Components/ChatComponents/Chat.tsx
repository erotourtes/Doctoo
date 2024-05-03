import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ChatList from './ChatList';
import { useEffect } from 'react';
import { handleNewChat, handleNewMessages, joinChat, sendMessage } from '@/app/chat/ChatActions';
import { deleteChatMessages } from '@/app/chat/ChatSlice';
import { getChatMessages } from '@/app/chat/ChatThunks';
import ChatBody from './ChatBody';
import { cn } from '@/utils/cn';
import useWindowWide from '@/hooks/useWindowWide';

const Chat = () => {
  const dispatch = useAppDispatch();
  const w1024 = useWindowWide(1024);

  const me = useAppSelector(state => state.chat.me);
  const chats = useAppSelector(state => state.chat.chats);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const isOpenedChat = useAppSelector(state => state.chat.isOpenedChat);
  const chatMessages = useAppSelector(state => state.chat.chatMessages);

  const handleMessageSend = (text: string) => {
    if (openedChat && me) {
      dispatch(sendMessage({ userId: me.id, chatId: openedChat.id, message: text }));
    }
  };

  useEffect(() => {
    if (me) {
      dispatch(joinChat(me.id));
      dispatch(handleNewChat());
      dispatch(handleNewMessages(chats));
    }
  }, [me, chats]);

  useEffect(() => {
    if (openedChat) {
      dispatch(deleteChatMessages());
      dispatch(getChatMessages({ id: openedChat.id }));
    }
  }, [openedChat]);

  return (
    <div className='relative grid h-full max-w-full grid-cols-[minmax(250px,25%)_auto] overflow-hidden rounded-xl rounded-ss-none max-lg:grid-cols-[1fr]'>
      <ChatList chats={chats} className={cn(!w1024 ? 'absolute inset-0 z-[1]' : '')} />
      <ChatBody
        chat={openedChat}
        chatMessages={chatMessages}
        handleMessageSend={text => {
          handleMessageSend(text);
        }}
        className={cn(
          'border-l border-l-grey-5 max-lg:border-l-0 ' +
            (!w1024
              ? 'absolute inset-0 z-[1] translate-x-full transition-all ' + (isOpenedChat ? 'translate-x-0' : '')
              : ''),
        )}
      />
    </div>
  );
};

export default Chat;
