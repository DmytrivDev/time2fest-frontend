// src/components/SeoMeta/SeoMeta.jsx
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { getDynamicSeo } from '@/utils/getDynamicSeo';
import { SUPPORTED_LANGS } from '@/i18n/languages';
import { useTranslation } from 'react-i18next';

//
// --- Визначає базову сторінку з URL ---
//
function getPageFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && SUPPORTED_LANGS.includes(parts[0])) parts.shift();

  if (parts[0] === 'ambassadors' && parts[1] === 'list')
    return 'AmbassadorsList';
  if (parts[0] === 'country' && parts[1]) return 'country';

  return parts.length === 0 ? 'home' : parts[0];
}

//
// --- Основний компонент SEO ---
//
const SeoMeta = ({ dynamicData = null }) => {
  const locale = getValidLocale();
  const { pathname } = useLocation();
  const page = getPageFromPath(pathname);
  const { t } = useTranslation('common');

  // --- Типи сторінок ---
  const isCountryDetail = pathname.match(/\/country\/[^/]+$/);
  const isAmbassadorDetail = pathname.match(/\/ambassadors\/list\/[^/]+$/);
  const isDynamicPage = isCountryDetail || isAmbassadorDetail;

  const isProfilePage = pathname.startsWith('/profile/');
  const isProfileCountry = pathname.match(/\/profile\/countries\/[^/]+$/);
  const isProfileAmbassador = pathname.match(/\/profile\/ambassadors\/[^/]+$/);

  const authPages = ['register', 'login', 'forget-password', 'reset-password'];
  const isAuthPage = authPages.includes(page);

  // --- Маппінг назв сторінок до Strapi-компонентів ---
  let pageS = page;
  if (page === 'ambassadors') pageS = 'ambass';
  if (page === 'AmbassadorsList') pageS = 'AmbassadorsList';
  if (page === 'become-ambassador') pageS = 'Form';
  if (page === 'privacy') pageS = 'polict';
  if (page === 'disclaimer') pageS = 'responsibility';

  //
  // --- SEO для статичних сторінок (Strapi) ---
  //
  const { data, error, isLoading } = useQuery({
    queryKey: ['seo', pageS, locale],
    queryFn: async () => {
      const res = await api.get(`/seo?page=${pageS}&locale=${locale}`);
      return res.data;
    },
    enabled: !!pageS && !isDynamicPage && !isProfilePage && !isAuthPage,
    staleTime: 5 * 60 * 1000,
  });

  if (error) console.error('❌ SEO fetch error:', error);

  //
  // --- 🔹 Публічні динамічні сторінки (країни / амбасадори) ---
  //
  if (isDynamicPage) {
    const hasCountryData = isCountryDetail && !!dynamicData?.CountryName;
    const hasAmbassadorData =
      isAmbassadorDetail &&
      (!!dynamicData?.name || !!dynamicData?.country?.name);

    if (!hasCountryData && !hasAmbassadorData) return null;

    const dynamicSeo = getDynamicSeo(pathname, locale, dynamicData);
    if (!dynamicSeo) return null;

    return <SeoHelmet seoData={dynamicSeo} />;
  }

  //
  // --- 🔹 Профільні сторінки ---
  //
  if (isProfilePage) {
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    const canonicalUrl = `https://time2fest.com${localePrefix}/profile/`;

    // --- Динамічні профільні сторінки ---
    if (isProfileCountry || isProfileAmbassador) {
      let title = t('profile.profile'); // "Мій профіль"

      if (isProfileAmbassador && dynamicData?.name) {
        title += ` — ${t('nav.ambassador')} ${dynamicData.name}`;
      } else if (
        isProfileCountry &&
        (dynamicData?.CountryName || dynamicData?.country?.name)
      ) {
        const countryName =
          dynamicData?.CountryName || dynamicData?.country?.name;
        title += ` — ${countryName}`;
      }

      const profileDynamicSeo = {
        title,
        description: '',
        canonicalURL: canonicalUrl,
        ogType: 'profile',
        noIndex: true,
      };

      return <SeoHelmet seoData={profileDynamicSeo} />;
    }

    // --- Звичайні підсторінки профілю ---
    const parts = pathname.split('/').filter(Boolean);
    const subPage = parts[parts.length - 1];

    const titleKeys = {
      profile: 'profile',
      timezones: 'zoneMap',
      countries: 'ctrTtl',
      ambassadors: 'ambassTtl',
      subscription: 'subTtl',
      payments: 'payTtl',
    };

    const titleKey = titleKeys[subPage] || 'profile';
    const title = `${t('profile.profile')} — ${t(`profile.${titleKey}`)}`;

    const profileSeo = {
      title,
      description: '',
      canonicalURL: canonicalUrl,
      ogType: 'profile',
      noIndex: true,
    };

    return <SeoHelmet seoData={profileSeo} />;
  }

  //
  // --- 🔹 Auth сторінки ---
  //
  if (isAuthPage) {
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    const canonicalUrl = `https://time2fest.com${localePrefix}/`;

    const titleKeys = {
      register: 'registerTitle',
      login: 'loginTitle',
      'forget-password': 'resetTitle',
      'reset-password': 'newPasswordTitle',
    };

    const titleKey = titleKeys[page] || 'loginTitle';
    const title = `Time2Fest — ${t(`auth.${titleKey}`)}`;

    const authSeo = {
      title,
      description: '',
      canonicalURL: canonicalUrl,
      ogType: 'website',
      noIndex: true,
    };

    return <SeoHelmet seoData={authSeo} />;
  }

  //
  // --- 🔹 Статичні сторінки ---
  //
  if (isLoading) return null;

  const componentKey = `${pageS.charAt(0).toUpperCase()}${pageS.slice(1)}SeoMeta`;
  const seoData = data?.[componentKey];

  if (!seoData) {
    console.warn(`⚠️ No static SEO data for "${componentKey}"`);
    return null;
  }

  return <SeoHelmet seoData={seoData} localizations={data?.localizations} />;
};

export default SeoMeta;

//
// --- Helmet-компонент із підтримкою пагінації ---
//
const SeoHelmet = ({ seoData, localizations = [] }) => {
  const locale = getValidLocale();
  const { pathname, search } = useLocation();

  const params = new URLSearchParams(search);
  const pageParam = params.get('page');
  const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;

  // --- Перевірка пагінації ---
  const isCountryList = /\/(uk|en|es|fr)?\/?country\/?$/.test(pathname);
  const isAmbassadorsList = /\/(uk|en|es|fr)?\/?ambassadors\/list\/?$/.test(
    pathname
  );
  const isPaginatedPage = isCountryList || isAmbassadorsList;

  const fullTitle = isPaginatedPage
    ? `${seoData.title} ${pageNumber && pageNumber > 1 ? pageNumber : ' 1'}`
    : seoData.title;

  const canonicalUrl =
    isPaginatedPage && pageNumber > 1
      ? `${seoData.canonicalURL.replace(/\/$/, '')}?page=${pageNumber}`
      : seoData.canonicalURL;

  const prevUrl =
    isPaginatedPage && pageNumber > 1
      ? `${seoData.canonicalURL.replace(/\/$/, '')}?page=${pageNumber - 1}`
      : null;

  const nextUrl = isPaginatedPage
    ? `${seoData.canonicalURL.replace(/\/$/, '')}?page=${pageNumber + 1}`
    : null;

  const hreflangs = [
    { locale, url: canonicalUrl },
    ...(Array.isArray(localizations)
      ? localizations.map(loc => ({
          locale: loc.locale,
          url: `${seoData.canonicalURL.replace(/\/$/, '')}/${loc.locale}/`,
        }))
      : []),
  ];

  return (
    <Helmet>
      {/* --- Основні теги --- */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoData.description} />
      {seoData.noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* --- hreflang --- */}
      {hreflangs.map(item => (
        <link
          key={item.locale}
          rel="alternate"
          hrefLang={item.locale}
          href={item.url}
        />
      ))}

      {/* --- Prev/Next --- */}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      {/* --- Open Graph --- */}
      <meta property="og:type" content={seoData.ogType || 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoData.description} />
      {seoData.shareImage?.url && (
        <meta property="og:image" content={seoData.shareImage.url} />
      )}
      <meta
        name="twitter:card"
        content={seoData.twitterCard || 'summary_large_image'}
      />

      {/* --- Structured Data --- */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      )}

      {/* --- Organization Schema --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Time2Fest',
            url: 'https://time2fest.com',
            logo: 'https://time2fest.com/logo.svg',
            sameAs: [
              'https://www.facebook.com/profile.php?id=61574092427016',
              'https://www.instagram.com/time_2_fest/',
              'https://www.threads.net/@time_2_fest',
              'https://www.linkedin.com/company/time2fest/',
              'https://x.com/Time2Fest',
            ],
          }),
        }}
      />

      {/* --- Аналітика Umami --- */}
      <script
        defer
        src="https://analytics.time2fest.com/script.js"
        data-website-id="ffa2346f-7a21-40bd-9cfd-76e6e1cfdd9f"
      ></script>

      {/* --- Meta Pixel --- */}
      <script>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1794148484534982');
          fbq('track', 'PageView');
        `}
      </script>

      <noscript>
        {`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=1794148484534982&ev=PageView&noscript=1" />`}
      </noscript>
    </Helmet>
  );
};
