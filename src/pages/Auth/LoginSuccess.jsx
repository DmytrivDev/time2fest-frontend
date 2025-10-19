import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isLoggedIn', 'true');

      // 🔹 Отримуємо профіль після входу
      api
        .get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/profile');
        })
        .catch(() => {
          navigate('/register');
        });
    } else {
      navigate('/register');
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}
