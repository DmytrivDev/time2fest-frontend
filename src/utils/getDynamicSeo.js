// utils/getDynamicSeo.js
import { t } from 'i18next';

export function getDynamicSeo(pathname, locale, dynamicData) {
   console.log(pathname, dynamicData)

  if (!dynamicData || typeof dynamicData !== 'object') return null;
  // --- КРАЇНА ---
  if (pathname.includes('/country/') && dynamicData?.CountryName) {
    const countryName = dynamicData.CountryName;
    const countrySlug = dynamicData.slug?.toLowerCase();
    const countryDesc =
      dynamicData.CountryDesc ||
      t('seo.countryDefaultDesc', { country: countryName, lng: locale });

    return {
      title: t('seo.countryTitle', {
        country: countryName,
        lng: locale,
        defaultValue: `New Year in ${countryName} — Time2Fest`,
      }),
      description: t('seo.countryDescription', {
        country: countryName,
        desc: countryDesc.slice(0, 200),
        lng: locale,
        defaultValue: `New Year in ${countryName} by local time. Celebrate with Time2Fest and discover the country’s traditions and festive spirit!`,
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
    const countryName =
      dynamicData.country?.name ||
      t('seo.unknownCountry', { lng: locale, defaultValue: 'Unknown Country' });

    return {
      title: t('seo.ambassadorTitle', {
        name,
        country: countryName,
        lng: locale,
        defaultValue: `Ambassador ${name} (${countryName}) — Time2Fest`,
      }),
      description: t('seo.ambassadorDescription', {
        name,
        country: countryName,
        lng: locale,
        defaultValue: `Our ambassador ${name} will show how New Year is celebrated in ${countryName}. Discover fascinating traditions together with Time2Fest.`,
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
