import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userApi } from '@/utils/userApi';

export const useGraphStore = create(
  persist(
    (set, get) => ({
      countries: [],
      isLoading: false,

      fetchSchedule: async () => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.get('/user-schedule');
          const serverCountries = data?.countries || [];
          const localCountries = get().countries;

          let finalCountries = localCountries;

          if (serverCountries.length > 0) {
            finalCountries = serverCountries;
          } else if (localCountries.length > 0) {
            try {
              await userApi.patch('/user-schedule', {
                countries: localCountries,
              });
            } catch (err) {
              console.warn(
                '⚠️ Не вдалося синхронізувати локальні дані на сервері:',
                err
              );
            }
          }

          set({ countries: finalCountries, isLoading: false });
        } catch (err) {
          console.error('❌ Не вдалося отримати графік користувача:', err);
          set({ isLoading: false });
        }
      },

      // ---- Додавання ----
      addCountry: async country => {
        const current = get().countries;

        const exists = current.some(
          c => c.slug === country.slug && c.zone === country.zone
        );
        if (exists) return;

        const updated = [...current, country];
        set({ countries: updated });

        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося зберегти країну на сервері:', err);
        }
      },

      // ---- Видалення ----
      removeCountry: async (slug, zone) => {
        const updated = get().countries.filter(
          c => !(c.slug === slug && c.zone === zone)
        );

        set({ countries: updated });

        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося оновити графік на сервері:', err);
        }
      },

      // ---- Очищення ----
      clearCountries: async () => {
        set({ countries: [] });

        try {
          await userApi.patch('/user-schedule', { countries: [] });
        } catch (err) {
          console.warn('⚠️ Не вдалося очистити графік на сервері:', err);
        }
      },
    }),
    {
      name: 'user-schedule',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
