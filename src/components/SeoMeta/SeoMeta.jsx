import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { getValidLocale } from '@/utils/getValidLocale';
import { api } from '@/utils/api';
import { useLocation } from 'react-router-dom';

function getPageFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  // parts[0] — мова, parts[1] — сторінка
  if (!parts[1]) return 'home'; // fallback для головної
  return parts[1];
}

export default function SeoMeta() {
  const locale = getValidLocale();
  const { pathname } = useLocation();
  const page = getPageFromPath(pathname);

  const { data, error, isLoading } = useQuery({
    queryKey: ['seo', page, locale],
    queryFn: async () => {
      const res = await api.get(`/seo?page=${page}&locale=${locale}`);
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

  const componentKey = `${page.charAt(0).toUpperCase()}${page.slice(1)}SeoMeta`;
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
      <link rel="canonical" href={seo.canonicalURL} />
      {hreflangs.map(item => (
        <link
          key={item.locale}
          rel="alternate"
          hrefLang={item.locale}
          href={item.url}
        />
      ))}
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
        async
        src="https://analytics.time2fest.com/script.js"
        data-website-id="0bbff623-9a64-40fd-be10-03d5e5dcda66м"
      ></script>
    </Helmet>
  );
}
