import { create } from 'zustand';

export const useLoginSubPopupStore = create(set => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}));
