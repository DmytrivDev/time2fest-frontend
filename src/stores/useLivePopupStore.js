// src/stores/useLivePopupStore.js

import { create } from 'zustand';

export const useLivePopupStore = create(set => ({
  isOpen: false,
  playbackId: null,
  trstatus: null,
  documentId: null,

  openPopup: ({ playbackId, trstatus, documentId }) =>
    set({
      isOpen: true,
      playbackId,
      trstatus,
      documentId,
    }),

  closePopup: () =>
    set({
      isOpen: false,
      playbackId: null,
      trstatus: null,
      documentId: null,
    }),
}));
