import { useState } from 'react';
import { userApi } from '@/utils/userApi';

export function usePremiumCheckout() {
  const [loading, setLoading] = useState(false);

  function getUserEmail() {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return null;
      const user = JSON.parse(raw);
      return user?.email || null;
    } catch (e) {
      return null;
    }
  }

  async function startCheckout() {
    const email = getUserEmail();

    if (!email) {
      console.error('❌ No user email found — user must be logged in');
      return;
    }

    try {
      setLoading(true);

      // 🟦 виклик бекенду
      const { data } = await userApi.post('/payments/create-checkout', {
        email,
      });

      if (!data?.url) {
        console.error('❌ Invalid Paddle checkout response', data);
        return;
      }

      // 🟧 редирект на Paddle
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
