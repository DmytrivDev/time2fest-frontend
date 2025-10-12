import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { api } from '@/utils/api';

import CountryDetail from '../../components/CountryDetail/CountryDetail';
import CountryAmbassadorList from '../../components/CountryAmbassadorList/CountryAmbassadorList';
import CountryAdding from '../../components/CountryAdding/CountryAdding';

const CountryPage = () => {
  const { slug, lang } = useParams();
  const [searchParams] = useSearchParams();
  const locale = lang || 'en';
  const tzParam = searchParams.get('tz');

  // 🔹 Отримуємо функцію з Layout для SEO
  const { setDynamicData } = useOutletContext();

  // --- Запит на дані країни ---
  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['country', slug, locale],
    queryFn: async () => {
      const res = await api.get(`/countries?slug=${slug}&locale=${locale}`);
      return res?.data || [];
    },
    enabled: !!slug,
  });

  // --- Витягуємо перший елемент (країну) ---
  const country = countryData?.[0] || null;

  // --- Вираховуємо часові зони ---
  const parseOffset = code => {
    if (!code || typeof code !== 'string') return 0;
    const match = code.match(/UTC([+-]?\d{1,2})/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getPrimaryTimeZone = zones => {
    if (!Array.isArray(zones) || zones.length === 0) return 'UTC+0';
    if (zones.length === 1) return zones[0].code || 'UTC+0';
    const sorted = [...zones].sort(
      (a, b) => parseOffset(b.code) - parseOffset(a.code)
    );
    return sorted[0].code || 'UTC+0';
  };

  const zones = country?.time_zones || [];
  const ambassadors = country?.ambassadors || [];
  const gallery = country?.Gallery || [];
  const countryDesc = country?.CountryDesc || '';

  // --- Визначення активного часового поясу ---
  const tzExists =
    tzParam && zones.some(z => z.code?.toUpperCase() === tzParam.toUpperCase());
  const effectiveTz = tzExists ? tzParam : getPrimaryTimeZone(zones);

  // --- Амбасадори для активного часового поясу ---
  const ambassadorsByTz = useMemo(() => {
    if (!Array.isArray(ambassadors)) return [];
    return ambassadors.filter(a => a.time_zone === effectiveTz);
  }, [ambassadors, effectiveTz]);

  // --- 🔹 Передаємо дані у Layout для SEO ---
  useEffect(() => {
    if (country?.CountryName) {
      setDynamicData?.(country);
    }
  }, [country?.CountryName, setDynamicData]);

  // --- Рендер ---
  if (isLoading) return null;
  if (error || !country) return null;

  return (
    <>
      <CountryDetail
        data={countryData}
        isLoading={isLoading}
        error={error}
        tzParam={effectiveTz}
      />

      {ambassadorsByTz.length > 0 && (
        <CountryAmbassadorList
          data={ambassadorsByTz}
          name={country.CountryName}
          sec={country.CountrySec}
          code={country.CountryCode}
          isLoading={isLoading}
          error={error}
        />
      )}

      {Array.isArray(gallery) && gallery.length > 0 && (
        <CountryAdding
          gallery={gallery}
          description={countryDesc}
          nameSec={country?.CountrySec || country?.CountryName}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};

export default CountryPage;
