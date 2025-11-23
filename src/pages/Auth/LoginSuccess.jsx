import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { useTranslation } from 'react-i18next';
import SuccessSection from '../../components/Auth/SuccessSection';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    // 🔹 Спочатку беремо мову з localStorage (якщо була)
    const savedLang = localStorage.getItem('preferredLang');
    const lang = savedLang || i18n.language || 'en';

    // 🔹 Встановлюємо її у i18n (щоб синхронізувалась з інтерфейсом)
    if (savedLang) i18n.changeLanguage(savedLang);

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isLoggedIn', 'true');

      api
        .get('/auth/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate(`/${lang !== 'en' ? lang + '/profile' : 'profile'}`);
          localStorage.removeItem('preferredLang');
        })
        .catch(() => {
          navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
          localStorage.removeItem('preferredLang');
        });
    } else {
      navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
      localStorage.removeItem('preferredLang');
    }
  }, [navigate, i18n]);

  return <SuccessSection />;
}
