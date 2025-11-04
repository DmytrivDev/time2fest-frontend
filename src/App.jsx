import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

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

const ProfileLayout = lazy(
  () => import('./layouts/ProfileLayout/ProfileLayout')
);
const ProfileInfo = lazy(() => import('./pages/ProfilePage/ProfileInfo'));
const ProfileMap = lazy(() => import('./pages/ProfilePage/ProfileMap'));
const ProfileCountries = lazy(() => import('./pages/ProfilePage/ProfileCountries'));
const ProfileCountryDetail = lazy(() => import('./pages/ProfilePage/ProfileCountryDetail'));
const ProfileAmbassadors = lazy(() => import('./pages/ProfilePage/ProfileAmbassadors'));
const ProfileAmbassadorDetail = lazy(() => import('./pages/ProfilePage/ProfileAmbassadorDetail'));
const ProfileSubscribe = lazy(() => import('./pages/ProfilePage/ProfileSubscribe'));
const ProfilePayments = lazy(() => import('./pages/ProfilePage/ProfilePayments'));
const ProfileSchedule = lazy(() => import('./pages/ProfilePage/ProfileSchedule'));

const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const LoginSuccess = lazy(() => import('./pages/Auth/LoginSuccess'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const ForgetPass = lazy(() => import('./pages/Auth/ForgetPass'));
const ResetPass = lazy(() => import('./pages/Auth/ResetPass'));

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
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<Navigate to="info" replace />} />
              <Route path="info" element={<ProfileInfo />} />
              <Route path="timezones" element={<ProfileMap />} />
              <Route path="countries" element={<ProfileCountries />} />
              <Route path="countries/:slug" element={<ProfileCountryDetail />} />
              <Route path="ambassadors" element={<ProfileAmbassadors />} />
              <Route path="ambassadors/:slug" element={<ProfileAmbassadorDetail />} />
              <Route path="subscription" element={<ProfileSubscribe />} />
              <Route path="payments" element={<ProfilePayments />} />
              <Route path="schedule" element={<ProfileSchedule />} />
            </Route>
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forget-password" element={<ForgetPass />} />
            <Route path="reset-password" element={<ResetPass />} />
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
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<Navigate to="info" replace />} />
              <Route path="info" element={<ProfileInfo />} />
              <Route path="timezones" element={<ProfileMap />} />
              <Route path="countries" element={<ProfileCountries />} />
              <Route path="countries/:slug" element={<ProfileCountryDetail />} />
              <Route path="ambassadors" element={<ProfileAmbassadors />} />
              <Route path="ambassadors/:slug" element={<ProfileAmbassadorDetail />} />
              <Route path="subscription" element={<ProfileSubscribe />} />
              <Route path="payments" element={<ProfilePayments />} />
              <Route path="schedule" element={<ProfileSchedule />} />
            </Route>
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forget-password" element={<ForgetPass />} />
            <Route path="reset-password" element={<ResetPass />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          className: 'time2fest-toast',
          success: {
            className: 'time2fest-toast time2fest-toast--success',
          },
          error: {
            className: 'time2fest-toast time2fest-toast--error',
          },
          loading: {
            className: 'time2fest-toast time2fest-toast--loading',
          },
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default App;
