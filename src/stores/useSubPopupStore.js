import { create } from 'zustand';

export const useSubPopupStore = create(set => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}));
