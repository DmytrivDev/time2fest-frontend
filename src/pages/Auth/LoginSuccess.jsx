import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/utils/userApi';
import { useTranslation } from 'react-i18next';
import SuccessSection from '../../components/Auth/SuccessSection';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    const savedLang = localStorage.getItem('preferredLang');
    const lang = savedLang || i18n.language || 'en';

    if (savedLang) i18n.changeLanguage(savedLang);

    // ❌ Якщо токенів нема — на реєстрацію
    if (!accessToken || !refreshToken) {
      navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
      localStorage.removeItem('preferredLang');
      return;
    }

    // ✅ Зберігаємо токени
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // ❗ Після логіну — одразу отримати user через /auth/me
    userApi
      .get('/auth/me')
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));

        navigate(`/${lang !== 'en' ? lang + '/profile' : 'profile'}`);

        localStorage.removeItem('preferredLang');
      })
      .catch(() => {
        navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
        localStorage.removeItem('preferredLang');
      });
  }, [navigate, i18n]);

  return <SuccessSection />;
}
