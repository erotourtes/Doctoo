import type { RootState } from '@/app/store';
import type { IAttachment, IChat, IMessage } from '@/dataTypes/Chat';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import type { TUser } from '@/dataTypes/User';

interface chatData {
  me: TUser | null;
  chats: IChat[];
  openedChat: IChat | null;
  chatMessages: IMessage[];
  chatAttachedFiles: IAttachment[];
}

const initialState: chatData = {
  me: null,
  chats: [],
  openedChat: null,
  chatMessages: [],
  chatAttachedFiles: [],
};

export const chatSlice = createAppSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<TUser>) => {
      state.me = action.payload;
    },

    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
    },

    updateChat: (state, action: PayloadAction<IChat>) => {
      const index = state.chats.findIndex(chat => chat.id === action.payload.id);
      state.chats[index] = action.payload;
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
    },

    setNewChat: (state, action: PayloadAction<IChat>) => {
      state.chats.push(action.payload);
    },

    openChat: (state, action: PayloadAction<{ chatId: string }>) => {
      state.chats.forEach(chat => {
        if (chat.id === action.payload.chatId) {
          state.openedChat = chat || null;
        }
      });
    },

    setChatMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.chatMessages = action.payload;

      action.payload.forEach(message => {
        if (message.attachments.length > 0) {
          state.chatAttachedFiles = [...state.chatAttachedFiles, ...message.attachments];
        }
      });
    },

    deleteChatMessages: state => {
      state.chatMessages = [];
      state.chatAttachedFiles = [];
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      const foundedMessage = state.chatMessages.find(message => message.id === action.payload.id);

      if (!foundedMessage && state.openedChat?.id === action.payload.chatId) {
        state.chatMessages = [action.payload, ...state.chatMessages];
      }

      const chatIndex = state.chats.findIndex(chat => chat.id === action.payload.chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = {
          sender: action.payload.sender,
          sentAt: action.payload.sentAt,
          text: action.payload.text,
        };
      }

      state.chats.sort((a, b) => {
        const lastMessageA = a.lastMessage ? a.lastMessage.sentAt : new Date(0);
        const lastMessageB = b.lastMessage ? b.lastMessage.sentAt : new Date(0);
        return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
      });
    },
  },
});

export const {
  setMe,
  setChats,
  updateChat,
  deleteChat,
  setNewChat,
  openChat,
  setChatMessages,
  addMessage,
  deleteChatMessages,
} = chatSlice.actions;

export const chats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
