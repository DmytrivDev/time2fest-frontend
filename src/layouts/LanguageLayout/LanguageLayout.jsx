import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../../i18n/languages';

import SeoMeta from '../../components/SeoMeta';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';

const LanguageHTMLUpdater = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
};

const LanguageLayout = () => {
  const { lang } = useParams();
  const { pathname, search, hash } = useLocation();
  const [dynamicData, setDynamicData] = useState(null);
  const location = useLocation();

  const isProfile = location.pathname.includes('/profile');

  // --- Валідність мови ---
  if (lang && !SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to="/" replace />;
  }

  // --- Зайвий префікс мови ---
  if (lang === DEFAULT_LANG) {
    const rest = pathname.replace(new RegExp(`^/${DEFAULT_LANG}`), '') || '/';
    return <Navigate to={`${rest}${search}${hash}`} replace />;
  }

  // --- Синхронізація мови ---
  useEffect(() => {
    const current = i18n.language.split('-')[0];
    if (lang && current !== lang) {
      i18n.changeLanguage(lang);
    }
    if (!lang && current !== DEFAULT_LANG) {
      i18n.changeLanguage(DEFAULT_LANG);
    }
  }, [lang]);

  // --- Передача контексту вниз (через Outlet) ---
  const outletContext = { setDynamicData, dynamicData };

  return (
    <div className="wrapper">
      <LanguageHTMLUpdater />

      {/* ⬇️ ТУТ SEOMeta рендериться стабільно для всіх сторінок */}
      <SeoMeta dynamicData={dynamicData} />

      {!isProfile && <Header />}
      <main className="main">
        <Outlet context={outletContext} />
      </main>
      {!isProfile && <Footer />}
    </div>
  );
};

export default LanguageLayout;