import { useState } from 'react';
import { userApi } from '@/utils/userApi';

export function usePremiumCheckout() {
  const [loading, setLoading] = useState(false);

  function getEmailFromToken() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;

      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.email || null;
    } catch (e) {
      console.error("Failed to decode JWT:", e);
      return null;
    }
  }

  async function startCheckout() {
    const email = getEmailFromToken();

    if (!email) {
      console.error('❌ No email in token — user must be logged in');
      return;
    }

    try {
      setLoading(true);

      const { data } = await userApi.post('/payments/create-checkout', {
        email,
      });

      if (!data?.url) {
        console.error('Invalid Paddle checkout response', data);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  }

  return {
    startCheckout,
    loading,
  };
}
