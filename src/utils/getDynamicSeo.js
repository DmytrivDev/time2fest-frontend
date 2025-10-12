// utils/getDynamicSeo.js
import { t } from 'i18next';

export function getDynamicSeo(pathname, locale, dynamicData) {
  if (!dynamicData || typeof dynamicData !== 'object') return null;
  // --- КРАЇНА ---
  if (pathname.includes('/country/') && dynamicData?.CountryName) {
    const countryName = dynamicData.CountryName;
    const countrySec = dynamicData.CountrySec || countryName;
    const countrySlug = dynamicData.slug?.toLowerCase();
    const countryDesc =
      dynamicData.CountryDesc ||
      t('seo.countryDefaultDesc', { country: countryName, countrySec, lng: locale });

    return {
      title: t('seo.countryTitle', {
        country: countrySec,
        lng: locale,
        defaultValue: `New Year in ${countrySec} — Time2Fest`,
      }),
      description: t('seo.countryDescription', {
        country: countrySec,
        desc: countryDesc.slice(0, 200),
        lng: locale,
        defaultValue: `New Year in ${countrySec} by local time. Celebrate with Time2Fest and discover the country’s traditions and festive spirit!`,
      }),
      canonicalURL: `https://time2fest.com/${locale}/country/${countrySlug}`,
      shareImage: dynamicData.Background
        ? { url: dynamicData.Background.url }
        : { url: 'https://time2fest.com/logo.svg' },
      ogType: 'article',
      twitterCard: 'summary_large_image',
    };
  }

  // --- AMBASSADOR ---
  if (pathname.includes('/ambassadors/list/') && dynamicData?.name) {
    const name = dynamicData.name;
    const slug =
      dynamicData.slug?.toLowerCase() ||
      dynamicData.id?.toString() ||
      'unknown';
    const countryName = dynamicData.country?.name;
    const countrySec = dynamicData.country?.sec || countryName;

    return {
      title: t('seo.ambassadorTitle', {
        name,
        country: countryName,
        lng: locale,
        defaultValue: `Ambassador ${name} (${countryName}) — Time2Fest`,
      }),
      description: t('seo.ambassadorDescription', {
        name,
        country: countrySec,
        lng: locale,
        defaultValue: `Our ambassador ${name} will show how New Year is celebrated in ${countrySec}. Discover fascinating traditions together with Time2Fest.`,
      }),
      canonicalURL: `https://time2fest.com/${locale}/ambassadors/list/${slug}`,
      shareImage: dynamicData.photo
        ? { url: dynamicData.photo }
        : { url: 'https://time2fest.com/logo.svg' },
      ogType: 'profile',
      twitterCard: 'summary_large_image',
    };
  }

  return null;
}
