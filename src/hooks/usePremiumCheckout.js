import { useState } from 'react';
import { userApi } from '@/utils/userApi';
import { decodeJwt } from '@/utils/jwtDecode';

export function usePremiumCheckout() {
  const [loading, setLoading] = useState(false);

  function getEmailFromToken() {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const decoded = decodeJwt(token);
    return decoded?.email || null;
  }

  async function startCheckout() {
    const email = getEmailFromToken();

    if (!email) {
      console.error('❌ Cannot start checkout — email missing');
      return;
    }

    try {
      setLoading(true);

      const { data } = await userApi.post('/payments/create-checkout', {
        email,
      });

      if (!data?.url) {
        console.error('Invalid Paddle checkout response:', data);
        return;
      }

      window.location.href = data.url;

    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  }

  return { startCheckout, loading };
}
