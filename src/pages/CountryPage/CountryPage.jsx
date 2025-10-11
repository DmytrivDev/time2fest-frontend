import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

import CountryDetail from '../../components/CountryDetail/CountryDetail';

const CountryPage = () => {
  const { slug, lang } = useParams();
  const [searchParams] = useSearchParams();
  const locale = lang || 'en';
  const tzParam = searchParams.get('tz'); // Наприклад: UTC+1

  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['country', slug, locale],
    queryFn: async () => {
      const res = await api.get(`/countries?slug=${slug}&locale=${locale}`);
      return res?.data || null;
    },
    enabled: !!slug,
  });

  // --- Допоміжна функція для парсингу UTC-коду ---
  const parseOffset = code => {
    if (!code || typeof code !== 'string') return 0;
    const match = code.match(/UTC([+-]?\d{1,2})/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // --- Визначення головної (основної) зони ---
  const getPrimaryTimeZone = zones => {
    if (!Array.isArray(zones) || zones.length === 0) return 'UTC+0';
    if (zones.length === 1) return zones[0].code || 'UTC+0';
    const sorted = [...zones].sort(
      (a, b) => parseOffset(b.code) - parseOffset(a.code)
    );
    return sorted[0].code || 'UTC+0';
  };

  // --- Отримуємо список зон ---
  const zones = countryData?.[0]?.time_zones || [];

  // --- Перевірка валідності tzParam ---
  const tzExists =
    tzParam && zones.some(z => z.code?.toUpperCase() === tzParam.toUpperCase());

  // --- Визначаємо фінальний часовий пояс ---
  const effectiveTz = tzExists ? tzParam : getPrimaryTimeZone(zones);

  return (
    <>
      <CountryDetail
        data={countryData}
        isLoading={isLoading}
        error={error}
        tzParam={effectiveTz}
      />
    </>
  );
};

export default CountryPage;
