import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SUPPORTED_LANGS } from '../../i18n/languages';

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

  useEffect(() => {
    if (lang && !SUPPORTED_LANGS.includes(lang)) {
      window.location.replace('/');
    }

    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
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
