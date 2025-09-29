import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';

import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import LanguageLayout from './layouts/LanguageLayout/LanguageLayout';

import HomePage from './pages/HomePage/HomePage';

// Lazy-сторінки
const AmbassPage = lazy(() => import('./pages/AmbassPage/AmbassPage'));
const FormPage = lazy(() => import('./pages/FormPage/FormPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage/PrivacyPage'));
const AgreementPage = lazy(() => import('./pages/AgreementPage/AgreementPage'));
const ResponsibilityPage = lazy(
  () => import('./pages/ResponsibilityPage/ResponsibilityPage')
);
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'));

// Компонент для скролу нагору при зміні маршруту
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { i18n, ready } = useTranslation();

  if (!ready) return null; // або <Loader />

  const detectedLang = i18n.language.split('-')[0];
  const isSupported = SUPPORTED_LANGS.includes(detectedLang);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Корінь без префікса (default lang) */}
          <Route path="/" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="ambassadors" element={<AmbassPage />} />
            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          {/* Якщо явно вказали default_lang → редіректимо без префікса */}
          <Route
            path={`/${DEFAULT_LANG}/*`}
            element={
              <Navigate
                to={
                  window.location.pathname.replace(`/${DEFAULT_LANG}`, '') ||
                  '/'
                }
                replace
              />
            }
          />

          {/* Інші мови */}
          <Route path="/:lang/*" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="ambassadors" element={<AmbassPage />} />
            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

          {/* 404 → редірект на головну */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
