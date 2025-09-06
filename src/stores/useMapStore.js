import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useMapStore = create(
  persist(
    set => ({
      mode: 'map',
      selectedZone: null,
      selectedCountry: null,
      hasSelection: false,

      listLevel: 'zones',
      listZone: null,

      setMode: m => set({ mode: m }),

      setMapSelection: (zone, country) =>
        set({
          selectedZone: zone,
          selectedCountry:
            typeof country === 'string' && country
              ? country.toUpperCase()
              : null,
        }),

      setHasSelection: v => set({ hasSelection: v }),

      enterListCountries: zone =>
        set({ listLevel: 'countries', listZone: zone }),

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
    }
  )
);
