import { create } from 'zustand';
import { useGraphStore } from '@/stores/useGraphStore';

export const useReplaceCountryPopupStore = create((set, get) => ({
  isOpen: false,
  isClosing: false,
  oldCountry: null,
  newCountry: null,
  zone: null,

  openPopup: (oldCountry, newCountry, zone) =>
    set({
      isOpen: true,
      isClosing: false,
      oldCountry,
      newCountry,
      zone,
    }),

  closePopup: () => {
    set({ isClosing: true });
    setTimeout(() => {
      set({
        isOpen: false,
        isClosing: false,
        oldCountry: null,
        newCountry: null,
        zone: null,
      });
    }, 250);
  },

  replace: () => {
    const { newCountry, oldCountry, zone } = get();
    const remove = useGraphStore.getState().removeCountry;
    const add = useGraphStore.getState().addCountry;

    if (oldCountry) remove(oldCountry.slug, zone);
    if (newCountry) add(newCountry);

    get().closePopup();
  },
}));
