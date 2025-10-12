import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { getDynamicSeo } from '@/utils/getDynamicSeo';
import { SUPPORTED_LANGS } from '@/i18n/languages';

//
// --- Допоміжна функція: визначає базову сторінку з URL ---
//
function getPageFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && SUPPORTED_LANGS.includes(parts[0])) parts.shift();

  if (parts[0] === 'ambassadors' && parts[1] === 'list') return 'AmbassadorsList';
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

  // --- Визначення типу сторінки ---
  const isCountryPage = pathname.includes('/country/');
  const isAmbassadorPage = pathname.includes('/ambassadors/list/');
  const isDynamicPage = isCountryPage || isAmbassadorPage;

  // --- Маппінг назв сторінок до Strapi-компонентів ---
  let pageS = page;
  if (page === 'ambassadors') pageS = 'ambass';
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
    enabled: !isDynamicPage && !!pageS, // ❗ Не виконуємо запит для динамічних сторінок
    staleTime: 5 * 60 * 1000,
  });

  if (error) console.error('❌ SEO fetch error:', error);

  //
  // --- 🔹 Динамічні сторінки (країни та амбасадори) ---
  //
  if (isDynamicPage) {
    const hasCountryData = isCountryPage && !!dynamicData?.CountryName;
    const hasAmbassadorData =
      isAmbassadorPage && (!!dynamicData?.name || !!dynamicData?.country?.name);

    if (!hasCountryData && !hasAmbassadorData) return null;

    const dynamicSeo = getDynamicSeo(pathname, locale, dynamicData);
    if (!dynamicSeo) {
      console.warn('⚠️ No dynamic SEO data generated for:', pathname);
      return null;
    }

    return <SeoHelmet seoData={dynamicSeo} />;
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
// --- Підкомпонент Helmet ---
//
const SeoHelmet = ({ seoData, localizations = [] }) => {
  const locale = getValidLocale();

  // --- hreflang ---
  const hreflangs = [
    { locale, url: seoData.canonicalURL },
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
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="canonical" href={seoData.canonicalURL} />

      {/* --- hreflang --- */}
      {hreflangs.map(item => (
        <link
          key={item.locale}
          rel="alternate"
          hrefLang={item.locale}
          href={item.url}
        />
      ))}

      {/* --- Favicons --- */}
      <link rel="icon" type="image/png" href="/favicon-96x96.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* --- Open Graph --- */}
      <meta property="og:type" content={seoData.ogType || 'website'} />
      <meta property="og:title" content={seoData.title} />
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
          n.queue=[];
          t=b.createElement(e);t.async=!0;t.src=v;
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
