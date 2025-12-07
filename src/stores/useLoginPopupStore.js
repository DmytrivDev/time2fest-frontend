import { create } from 'zustand';

export const useLoginPopupStore = create(set => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}));
