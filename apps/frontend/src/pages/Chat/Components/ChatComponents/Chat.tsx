import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ChatList from './ChatList/ChatList';
import { Fragment, useEffect, useState } from 'react';
import { handleNewChat, handleNewMessages } from '@/app/chat/ChatActions';
import { getChatAttachments, getChatMessages } from '@/app/chat/ChatThunks';
import { cn } from '@/utils/cn';
import useWindowWide from '@/hooks/useWindowWide';
import connectedSocket from '@/app/chat/socket';
import ChatBody from './ChatBody/ChatBody';
import { closeChat } from '@/app/chat/ChatSlice';
import AttachedFiles from './AttachedFiles/AttachedFiles';
import { Icon } from '@/components/UI';

const Chat = () => {
  const socket = connectedSocket();
  const dispatch = useAppDispatch();
  const w1024 = useWindowWide(1024);
  const w1280 = useWindowWide(1280);

  const me = useAppSelector(state => state.chat.me);
  const chats = useAppSelector(state => state.chat.chats);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const isOpenedChat = useAppSelector(state => state.chat.isOpenedChat);
  const chatMessages = useAppSelector(state => state.chat.chatMessages);
  const [openAttachedFiles, setAttachedFiles] = useState(false);

  useEffect(() => {
    if (me) {
      dispatch(handleNewChat(socket));
      dispatch(handleNewMessages(socket, chats.chats));
    }
  }, [me, chats]);

  useEffect(() => {
    if (openedChat) {
      dispatch(getChatMessages(openedChat.id));
      dispatch(getChatAttachments(openedChat.id));
    }
  }, [openedChat]);

  const chatAttachedFiles = useAppSelector(state => state.chat.chatAttachedFiles);

  useEffect(() => {
    if (w1280) {
      setAttachedFiles(false);
    }
  }, [w1280]);

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
    <div className='relative grid h-full max-w-full grid-cols-[minmax(250px,25%)_auto] overflow-hidden rounded-xl rounded-ss-none max-lg:grid-cols-[1fr]'>
      <ChatList chats={chats.chats} className={cn(!w1024 ? 'absolute inset-0 z-[1]' : '')} />

      <div className='relative flex w-full overflow-hidden'>
        {!openedChat ? (
          w1024 && (
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='italic'>Select a chat to messaging</div>
            </div>
          )
        ) : (
          <Fragment>
            <ChatBody
              chat={openedChat}
              chatMessages={chatMessages.messages}
              className={cn(
                'border-l border-l-grey-5 max-lg:border-l-0',
                !w1024
                  ? 'absolute inset-0 z-[1] translate-x-full transition-all ' + (isOpenedChat ? 'translate-x-0' : '')
                  : '',
              )}
              role={me?.role}
              showBackBtn={!w1024}
              showFilesBtn={!w1280}
              handleBackToChats={handleBackToChats}
              handleOpenAttachments={handleOpenAttachments}
            />

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
                'border-l border-l-grey-5 transition-all',
                !w1280 ? 'absolute inset-0 z-10 translate-x-full border-l-0' : 'max-w-64',
                openAttachedFiles ? 'translate-x-0' : '',
              )}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Chat;
