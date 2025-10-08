import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';

import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import LanguageLayout from './layouts/LanguageLayout/LanguageLayout';
import HomePage from './pages/HomePage/HomePage';

// 💤 Lazy сторінки
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const AmbassPage = lazy(() => import('./pages/AmbassPage/AmbassPage'));
const FormPage = lazy(() => import('./pages/FormPage/FormPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage/PrivacyPage'));
const AgreementPage = lazy(() => import('./pages/AgreementPage/AgreementPage'));
const ResponsibilityPage = lazy(
  () => import('./pages/ResponsibilityPage/ResponsibilityPage')
);
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'));
const AmbassadorsListPage = lazy(
  () => import('./pages/AmbassadorsListPage/AmbassadorsListPage')
);
const AmbassadorDetailPage = lazy(
  () => import('./pages/AmbassadorDetailPage/AmbassadorDetailPage')
);

// 🧩 Мінімальний Layout для амбасадорів
const AmbassLayout = lazy(() => import('./layouts/AmbassLayout/AmbassLayout'));

// 📜 Скрол до верху при зміні сторінки
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const { i18n, ready } = useTranslation();

  if (!ready) return null;

  const detectedLang = i18n.language.split('-')[0];
  const isSupported = SUPPORTED_LANGS.includes(detectedLang);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />

            <Route path="ambassadors" element={<AmbassLayout />}>
              <Route index element={<AmbassPage />} />
              <Route path="list" element={<AmbassadorsListPage />} />
              <Route path="list/:slug" element={<AmbassadorDetailPage />} />
            </Route>

            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>

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

          <Route path="/:lang/*" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />

            <Route path="ambassadors" element={<AmbassLayout />}>
              <Route index element={<AmbassPage />} />
              <Route path="list" element={<AmbassadorsListPage />} />
              <Route path="list/:slug" element={<AmbassadorDetailPage />} />
            </Route>

            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
