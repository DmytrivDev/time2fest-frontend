import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import LanguageLayout from './layouts/LanguageLayout/LanguageLayout';
import HomePage from './pages/HomePage/HomePage';

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
const CountriesPage = lazy(() => import('./pages/CountriesPage/CountriesPage'));
const CountryPage = lazy(() => import('./pages/CountryPage/CountryPage'));
const AmbassLayout = lazy(() => import('./layouts/AmbassLayout/AmbassLayout'));
const CountriesLayout = lazy(
  () => import('./layouts/CountriesLayout/CountriesLayout')
);
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const LoginSuccess = lazy(() => import('./pages/Auth/LoginSuccess'));

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />

            <Route path="country" element={<CountriesLayout />}>
              <Route index element={<CountriesPage />} />
              <Route path=":slug" element={<CountryPage />} />
            </Route>

            <Route path="ambassadors" element={<AmbassLayout />}>
              <Route index element={<AmbassPage />} />
              <Route path="list" element={<AmbassadorsListPage />} />
              <Route path="list/:slug" element={<AmbassadorDetailPage />} />
            </Route>

            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login-success" element={<LoginSuccess />} />м
          </Route>

          {/* redirect default lang */}
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

            <Route path="country" element={<CountriesLayout />}>
              <Route index element={<CountriesPage />} />
              <Route path=":slug" element={<CountryPage />} />
            </Route>

            <Route path="ambassadors" element={<AmbassLayout />}>
              <Route index element={<AmbassPage />} />
              <Route path="list" element={<AmbassadorsListPage />} />
              <Route path="list/:slug" element={<AmbassadorDetailPage />} />
            </Route>

            <Route path="become-ambassador" element={<FormPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="agreement" element={<AgreementPage />} />
            <Route path="disclaimer" element={<ResponsibilityPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login-success" element={<LoginSuccess />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default App;
