import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === 'undefined') return;

   const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const lang = params.get('lang') || 'en';

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isLoggedIn', 'true');

      api
        .get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate(`/${lang !== 'en' ? lang + '/profile' : 'profile'}`);
        })
        .catch(() => {
          navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
        });
    } else {
      navigate(`/${lang !== 'en' ? lang + '/register' : 'register'}`);
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}
