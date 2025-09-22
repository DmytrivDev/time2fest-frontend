import React, { useEffect } from 'react';
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

  // 1. Якщо код невалідний → редіректимо на /
  if (lang && !SUPPORTED_LANGS.includes(lang)) {
    return <Navigate to="/" replace />;
  }

  // 2. Якщо default_lang з префіксом → зрізаємо його і зберігаємо підшлях
  if (lang === DEFAULT_LANG) {
    const rest = pathname.replace(new RegExp(`^/${DEFAULT_LANG}`), '') || '/';
    return <Navigate to={`${rest}${search}${hash}`} replace />;
  }

  // 3. Синхронізація i18n
  useEffect(() => {
    const current = i18n.language.split('-')[0];
    if (lang && current !== lang) {
      i18n.changeLanguage(lang);
    }
    if (!lang && current !== DEFAULT_LANG) {
      i18n.changeLanguage(DEFAULT_LANG);
    }
  }, [lang]);

  return (
    <div className="wrapper">
      <LanguageHTMLUpdater />
      <SeoMeta />
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LanguageLayout;
