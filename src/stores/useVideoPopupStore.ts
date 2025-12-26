import { create } from 'zustand';

type VideoPopupState = {
  isOpen: boolean;
  videoId: string | null;
  openPopup: (videoId: string) => void;
  closePopup: () => void;
};

export const useVideoPopupStore = create<VideoPopupState>(set => ({
  isOpen: false,
  videoId: null,

  openPopup: videoId =>
    set({
      isOpen: true,
      videoId,
    }),

  closePopup: () =>
    set({
      isOpen: false,
      videoId: null,
    }),
}));
