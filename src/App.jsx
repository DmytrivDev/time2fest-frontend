import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from './i18n';
import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import SeoMeta from './components/SeoMeta';
import HomePage from './pages/HomePage';
import Header from './components/Header';

const LanguageHTMLUpdater = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
};

function LanguageLayout() {
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
    <>
      <LanguageHTMLUpdater />
      <SeoMeta />
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  const { i18n, ready } = useTranslation();

  if (!ready) return null; // або показати <Loader />

  const detectedLang = i18n.language;
  const isSupported = SUPPORTED_LANGS.includes(detectedLang);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            isSupported && detectedLang !== DEFAULT_LANG ? (
              <Navigate to={`/${detectedLang}`} replace />
            ) : (
              <LanguageLayout />
            )
          }
        >
          <Route index element={<HomePage />} />
        </Route>

        <Route path={`/${DEFAULT_LANG}/*`} element={<Navigate to="/" replace />} />

        <Route path="/:lang/*" element={<LanguageLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
