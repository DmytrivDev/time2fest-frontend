import { useState } from 'react';
import { userApi } from '@/utils/userApi';

export function usePremiumCheckout() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    try {
      setLoading(true);

      const { data } = await userApi.post('/payments/create-paypro-link');

      if (!data?.url) {
        console.error('❌ Invalid PayPro response:', data);
        return;
      }

      // 🔁 Redirect to PayPro hosted checkout
      window.location.href = data.url;

    } catch (err) {
      console.error('❌ PayPro checkout error:', err);
    } finally {
      setLoading(false);
    }
  }

  return { startCheckout, loading };
}
