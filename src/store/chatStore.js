import { create } from 'zustand';

export const useChatStore = create((set,get) => ({

  question: '',
  setQuestion: (question) => set({ question }),

  selectedCountry: 'India',
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  conversation: [],
  setConversation: (conversation) => set({ conversation }),

  addMessage: (message) =>
    set((state) => ({
      conversation: [...state.conversation, message],
  })),

  history: [],
  setHistory: (history) => set({ history }),

  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),

  resetChat: () => set({
    question: '',
    selectedCountry:get().selectedCountry,
    conversation: [],
    history: [],
    conversationId: null,
  })
}));
