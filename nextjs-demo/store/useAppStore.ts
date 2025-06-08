import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  counter: number;
  filters: {
    threshold: number;
    category: string;
  };
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setFilters: (filters: { threshold: number; category: string }) => void;
  addMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;
  clearMessages: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      counter: 0,
      filters: { threshold: 50, category: 'All' },
      messages: [],
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
      reset: () => set({ counter: 0 }),
      setFilters: (filters) => set({ filters }),
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] })
    }),
    {
      name: 'nextjs-demo-store',
      partialize: (state) => ({ 
        counter: state.counter,
        filters: state.filters 
      })
    }
  )
);