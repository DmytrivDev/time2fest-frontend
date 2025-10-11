import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

import CountryDetail from '../../components/CountryDetail/CountryDetail';
import CountryAmbassadorList from '../../components/CountryAmbassadorList/CountryAmbassadorList';
import CountryAdding from '../../components/CountryAdding/CountryAdding';

const CountryPage = () => {
  const { slug, lang } = useParams();
  const [searchParams] = useSearchParams();
  const locale = lang || 'en';
  const tzParam = searchParams.get('tz');

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

  const country = countryData?.[0] || null;
  const zones = country?.time_zones || [];
  const ambassadors = country?.ambassadors || [];
  const gallery = country?.Gallery || [];
  const countryDesc = country?.CountryDesc || '';

  const tzExists =
    tzParam && zones.some(z => z.code?.toUpperCase() === tzParam.toUpperCase());
  const effectiveTz = tzExists ? tzParam : getPrimaryTimeZone(zones);

  const ambassadorsByTz = Array.isArray(ambassadors)
    ? ambassadors.filter(a => a.time_zone === effectiveTz)
    : [];

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
          name={countryData[0].CountryName}
          code={countryData[0].CountryCode}
          isLoading={isLoading}
          error={error}
        />
      )}

      {Array.isArray(gallery) && gallery.length > 0 && (
        <CountryAdding
          gallery={gallery}
          description={countryDesc}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};

export default CountryPage;
