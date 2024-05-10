import type { RootState } from '@/app/store';
import type { TAttachment, TChat, TChats, TMessage, TMessages } from '@/dataTypes/Chat';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';

interface chatData {
  chats: TChats;
  openedChat: TChat | null;
  isOpenedChat: boolean;
  chatMessages: TMessages;
  chatAttachedFiles: TAttachment[];
}

const initialState: chatData = {
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
    setChats: (state, action: PayloadAction<TChats>) => {
      state.chats = action.payload;
    },

    setNewChat: (state, action: PayloadAction<TChat>) => {
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

    setChatMessages: (state, action: PayloadAction<TMessages>) => {
      state.chatMessages = action.payload;
    },

    addMessage: (state, action: PayloadAction<TMessage>) => {
      const foundedMessage = state.chatMessages.messages.find(message => message.id === action.payload.id);

      if (!foundedMessage && state.openedChat?.id === action.payload.chatId) {
        state.chatMessages.messages = [action.payload, ...state.chatMessages.messages];
        state.chatMessages.totalMessages = state.chatMessages.totalMessages + 1;
      }

      const chatIndex = state.chats.chats.findIndex(chat => chat.id === action.payload.chatId);
      if (chatIndex !== -1) {
        state.chats.chats[chatIndex].lastMessage = action.payload;
      }

      state.chats.chats.sort((a, b) => {
        const lastMessageA = a.lastMessage ? a.lastMessage.sentAt : new Date(0);
        const lastMessageB = b.lastMessage ? b.lastMessage.sentAt : new Date(0);
        return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
      });

      if (action.payload.attachments && action.payload.attachments.length > 0) {
        action.payload.attachments.forEach(attachment => {
          const foundedAttachemt = state.chatAttachedFiles.findIndex(a => a.id === attachment.id);
          if (!foundedAttachemt) {
            state.chatAttachedFiles = [attachment, ...state.chatAttachedFiles];
          }
        });
      }
    },

    updateMessage: (state, action: PayloadAction<TMessage>) => {
      const foundedMessageIndex = state.chatMessages.messages.findIndex(message => message.id === action.payload.id);
      if (foundedMessageIndex !== -1) {
        const updatedMessages = [
          ...state.chatMessages.messages.slice(0, foundedMessageIndex),
          action.payload,
          ...state.chatMessages.messages.slice(foundedMessageIndex + 1),
        ];

        state.chatMessages.messages = updatedMessages;
      }

      const chatIndex = state.chats.chats.findIndex(chat => chat.id === action.payload.chatId);
      if (chatIndex !== -1 && state.chats.chats[chatIndex].lastMessage?.id === action.payload.id) {
        state.chats.chats[chatIndex].lastMessage = action.payload;
      }

      state.chatAttachedFiles = state.chatAttachedFiles.filter(a => a.messageId !== action.payload.id);
      if (action.payload.attachments && action.payload.attachments.length > 0) {
        action.payload.attachments.forEach(attachment => {
          const foundedAttachemt = state.chatAttachedFiles.findIndex(a => a.id === attachment.id);
          if (!foundedAttachemt) {
            state.chatAttachedFiles = [attachment, ...state.chatAttachedFiles];
          }
        });
      }
    },

    setChatAttachments: (state, action: PayloadAction<TAttachment[]>) => {
      state.chatAttachedFiles = action.payload;
    },

    readMessages: (state, action: PayloadAction<any>) => {
      const foundedChat = state.chats.chats.find(chat => chat.id === action.payload.chatId);
      if (foundedChat) {
        if ('missedMessagesDoctor' in action.payload) {
          foundedChat.missedMessagesDoctor = action.payload.missedMessagesDoctor;
        }
        if ('missedMessagesPatient' in action.payload) {
          foundedChat.missedMessagesPatient = action.payload.missedMessagesPatient;
        }
      }
    },
  },
});

export const {
  setChats,
  setNewChat,
  openChat,
  closeChat,
  setChatMessages,
  addMessage,
  updateMessage,
  setChatAttachments,
  readMessages,
} = chatSlice.actions;

export const chats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
