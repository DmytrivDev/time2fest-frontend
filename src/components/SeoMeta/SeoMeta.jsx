import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/i18n/languages';

function getPageFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);

  // якщо перший сегмент — мова → видаляємо
  if (parts[0] && SUPPORTED_LANGS.includes(parts[0])) {
    parts.shift();
  }

  // якщо після цього нічого не лишилось → home
  if (parts.length === 0) return 'home';

  // перший сегмент після мови — сторінка
  return parts[0];
}

const SeoMeta = () => {
  const locale = getValidLocale();
  const { pathname } = useLocation();
  const page = getPageFromPath(pathname);

  let pageS = page;
  if (page === 'ambassadors') {
    pageS = 'ambass';
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['seo', page, locale],
    queryFn: async () => {
      const res = await api.get(`/seo?page=${pageS}&locale=${locale}`);

      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!page,
  });

  if (error) {
    console.error('SEO fetch error:', error);
  }

  // Поки чекаємо — нічого не рендеримо, але не валимо все
  if (isLoading) return null;

  const componentKey = `${pageS.charAt(0).toUpperCase()}${pageS.slice(1)}SeoMeta`;

  const seo = data?.[componentKey];

  if (!seo) {
    console.warn(`SEO data not found for key "${componentKey}"`);
    return null;
  }

  const hreflangs = [
    { locale, url: seo.canonicalURL },
    ...(data.localizations || []).map(loc => ({
      locale: loc.locale,
      url: `${seo.canonicalURL.replace(/\/$/, '')}/${loc.locale}/`,
    })),
  ];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="canonical" href={seo.canonicalURL} />
      {hreflangs.map(item => (
        <link
          key={item.locale}
          rel="alternate"
          hrefLang={item.locale}
          href={item.url}
        />
      ))}

      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <link
        rel="preload"
        href="/fonts/Roboto/Roboto-Regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/fonts/Roboto/Roboto-Medium.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/fonts/Roboto/Roboto-Bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />

      <meta property="og:type" content={seo.ogType} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.shareImage?.url && (
        <meta property="og:image" content={seo.shareImage.url} />
      )}
      <meta name="twitter:card" content={seo.twitterCard} />
      {seo.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seo.structuredData)}
        </script>
      )}

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
              'https://www.threads.com/@time_2_fest',
              'https://www.linkedin.com/company/time2fest/',
              'https://x.com/Time2Fest',
            ],
          }),
        }}
      />

      <script
        defer
        src="https://analytics.time2fest.com/script.js"
        data-website-id="e317ffd8-2837-4a66-a6ad-6f9b2c34eed1"
      ></script>
    </Helmet>
  );
};

export default SeoMeta;
