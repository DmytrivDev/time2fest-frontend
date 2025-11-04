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
              await userApi.patch('/user-schedule', { countries: localCountries });
            } catch (syncErr) {
              console.warn(
                '⚠️ Не вдалося синхронізувати локальні дані:',
                syncErr
              );
            }
          }

          // Оновлюємо стан (бере серверні, або залишає локальні, якщо сервер пустий)
          const finalCountries =
            serverCountries.length > 0 ? serverCountries : localCountries;

          set({ countries: finalCountries, isLoading: false });
        } catch (err) {
          console.error('❌ Помилка отримання графіка:', err);
          set({ isLoading: false });
        }
      },

      // 🔹 Додавання країни
      addCountry: async country => {
        const current = get().countries;
        const updated = [...current, country];
        set({ countries: updated });

        // асинхронне збереження на сервері
        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося зберегти на сервері:', err);
        }
      },

      // 🔹 Видалення країни
      removeCountry: async code => {
        const updated = get().countries.filter(c => c.code !== code);
        set({ countries: updated });

        try {
          await userApi.patch('/user-schedule', { countries: updated });
        } catch (err) {
          console.warn('⚠️ Не вдалося оновити бекенд:', err);
        }
      },
    }),
    {
      name: 'user-schedule', // ключ у localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
