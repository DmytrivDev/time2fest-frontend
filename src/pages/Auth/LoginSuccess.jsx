import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { useTranslation } from 'react-i18next';

export default function LoginSuccess() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Безпечна перевірка на клієнті
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (!accessToken || !refreshToken) {
          // Нема токенів — редірект на реєстрацію
          const lang = getLangFromCookie() || i18n?.language || 'en';
          // навігацію робимо асинхронно щоб уникнути "update during render" проблем
          setTimeout(
            () =>
              navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`),
            0
          );
          return;
        }

        // Зберігаємо токени
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isLoggedIn', 'true');

        // Отримуємо профіль (обгортка з таймаутом для безпечної навігації)
        let profile;
        try {
          const res = await api.get('/auth/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          profile = res.data;
          localStorage.setItem('user', JSON.stringify(profile));
        } catch (err) {
          console.error('Profile fetch error:', err);
          // Якщо неможливо отримати профіль — продовжимо і відправимо на register
        }

        const lang = getLangFromCookie() || i18n?.language || 'en';
        // Навігація — асинхронно
        setTimeout(() => {
          if (profile) {
            navigate(`/${lang !== 'en' ? lang + '/profile' : 'profile'}`);
          } else {
            navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
          }
        }, 0);
      } catch (err) {
        console.error('LoginSuccess unexpected error:', err);
        const lang = getLangFromCookie() || i18n?.language || 'en';
        setTimeout(
          () => navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`),
          0
        );
      }
    })();

    // helper: читає login_lang куку
    function getLangFromCookie() {
      if (typeof document === 'undefined') return null;
      const m = document.cookie.match(/(?:^|;\s*)login_lang=([^;]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    }
  }, [navigate, i18n]);

  return <div>Logging in...</div>;
}
