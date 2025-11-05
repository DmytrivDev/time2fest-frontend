import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userApi } from '@/utils/userApi';

export const useGraphStore = create(
  persist(
    (set, get) => ({
      countries: [],
      isLoading: false,

      // 🔹 Завантаження графіка користувача із сервера
      fetchSchedule: async () => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.get('/user-schedule');
          const serverCountries = data?.countries || [];
          const localCountries = get().countries;

          // Якщо на сервері порожньо, а локально є — синхронізуємо
          if (localCountries.length > 0 && serverCountries.length === 0) {
            try {
              await userApi.patch('/user-schedule', {
                countries: localCountries,
              });
            } catch (syncErr) {
              console.warn(
                '⚠️ Не вдалося синхронізувати локальні дані:',
                syncErr
              );
            }
          }

          // Обираємо актуальні дані
          const finalCountries =
            serverCountries.length > 0 ? serverCountries : localCountries;

          set({ countries: finalCountries, isLoading: false });
        } catch (err) {
          console.error('❌ Помилка отримання графіка:', err);
          set({ isLoading: false });
        }
      },

      // 🔹 Додавання країни (slug + zone)
      addCountry: async country => {
        const current = get().countries;

        // уникаємо дублікатів по slug + zone
        const exists = current.some(
          c =>
            c.country?.toLowerCase?.() === country.country?.toLowerCase?.() &&
            String(c.zone).trim() === String(country.zone).trim()
        );

        if (exists) return;

        const updated = [...current, country];
        set({ countries: updated });

        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося зберегти на сервері:', err);
        }
      },

      // 🔹 Видалення по slug + zone
      removeCountry: async (slug, zone) => {
        const updated = get().countries.filter(
          c =>
            !(
              c.country?.toLowerCase?.() === slug?.toLowerCase?.() &&
              String(c.zone).trim() === String(zone).trim()
            )
        );

        set({ countries: updated });

        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося оновити бекенд:', err);
        }
      },

      // 🔹 Повне очищення графіка
      clearCountries: async () => {
        set({ countries: [] });
        try {
          await userApi.patch('/user-schedule', { countries: [] });
        } catch (err) {
          console.warn('⚠️ Не вдалося очистити на сервері:', err);
        }
      },
    }),
    {
      name: 'user-schedule',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
