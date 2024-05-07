import type { RootState } from '@/app/store';
import type { GetChatsResponse, GetMessagesResponse, IAttachment, IChat, IMessage } from '@/dataTypes/Chat';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { TUser } from '@/dataTypes/User';

interface chatData {
  me: TUser | null;
  chats: GetChatsResponse;
  openedChat: IChat | null;
  isOpenedChat: boolean;
  chatMessages: GetMessagesResponse;
  chatAttachedFiles: IAttachment[];
}

const initialState: chatData = {
  me: null,
  chats: {
    chats: [],
    totalChats: 0,
  },
  openedChat: null,
  isOpenedChat: false,
  chatMessages: {
    messages: [],
    totalMessages: 0,
  },
  chatAttachedFiles: [],
};

export const chatSlice = createAppSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<TUser>) => {
      state.me = action.payload;
    },

    setChats: (state, action: PayloadAction<GetChatsResponse>) => {
      state.chats = action.payload;
    },

    setNewChat: (state, action: PayloadAction<IChat>) => {
      const foundedChat = state.chats.chats.find(chat => chat.id === action.payload.id);
      if (!foundedChat) {
        state.chats = {
          chats: [action.payload, ...state.chats.chats],
          totalChats: state.chats.totalChats + 1,
        };
      }
    },

    openChat: (state, action: PayloadAction<{ chatId: string }>) => {
      state.chats.chats.forEach(chat => {
        if (chat.id === action.payload.chatId) {
          state.openedChat = chat || null;
          state.isOpenedChat = true;
        }
      });
    },

    closeChat: state => {
      state.isOpenedChat = false;
    },

    setChatMessages: (state, action: PayloadAction<GetMessagesResponse>) => {
      state.chatMessages = action.payload;
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      const foundedMessage = state.chatMessages.messages.find(message => message.id === action.payload.id);

      if (!foundedMessage && state.openedChat?.id === action.payload.chatId) {
        state.chatMessages.messages = [action.payload, ...state.chatMessages.messages];
        state.chatMessages.totalMessages = state.chatMessages.totalMessages + 1;
      }

      const chatIndex = state.chats.chats.findIndex(chat => chat.id === action.payload.chatId);
      if (chatIndex !== -1) {
        state.chats.chats[chatIndex].lastMessage = {
          sender: action.payload.sender,
          sentAt: action.payload.sentAt,
          text: action.payload.text,
        };
      }

      state.chats.chats.sort((a, b) => {
        const lastMessageA = a.lastMessage ? a.lastMessage.sentAt : new Date(0);
        const lastMessageB = b.lastMessage ? b.lastMessage.sentAt : new Date(0);
        return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
      });

      if (action.payload.attachments && action.payload.attachments.length > 0) {
        state.chatAttachedFiles = [...action.payload.attachments, ...state.chatAttachedFiles];
      }
    },

    setChatAttachments: (state, action: PayloadAction<IAttachment[]>) => {
      state.chatAttachedFiles = action.payload;
    },
  },
});

export const { setMe, setChats, setNewChat, openChat, closeChat, setChatMessages, addMessage, setChatAttachments } =
  chatSlice.actions;

export const chats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
