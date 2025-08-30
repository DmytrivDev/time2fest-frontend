import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Mode = 'map' | 'list';
type ListLevel = 'zones' | 'countries';

type MapState = {
  mode: Mode;
  selectedZone: string | null;
  selectedCountry: string | null;
  hasSelection: boolean;

  listLevel: ListLevel;
  listZone: string | null;

  setMode: (m: Mode) => void;

  setMapSelection: (zone: string | null, country?: string | null) => void;
  setHasSelection: (v: boolean) => void;

  enterListCountries: (zone: string) => void;
  backToListZones: () => void;

  resetAll: () => void;
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      mode: 'map',
      selectedZone: null,
      selectedCountry: null,
      hasSelection: false,

      listLevel: 'zones',
      listZone: null,

      setMode: (m) => set({ mode: m }),

      // ⬇️ Явні типи + безпечний аппер-кейс
      setMapSelection: (zone: string | null, country?: string | null) =>
        set({
          selectedZone: zone,
          selectedCountry: typeof country === 'string' && country ? country.toUpperCase() : null,
        }),

      setHasSelection: (v) => set({ hasSelection: v }),

      enterListCountries: (zone) => set({ listLevel: 'countries', listZone: zone }),

      backToListZones: () => set({ listLevel: 'zones', listZone: null }),

      resetAll: () =>
        set({
          mode: 'map',
          selectedZone: null,
          selectedCountry: null,
          hasSelection: false,
          listLevel: 'zones',
          listZone: null,
        }),
    }),
    {
      name: 't2f-map-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
