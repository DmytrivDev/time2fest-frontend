import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import LanguageLayout from './layouts/LanguageLayout/LanguageLayout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

const App = () => {
  const { i18n, ready } = useTranslation();

  if (!ready) return null; // або показати <Loader />

  const detectedLang = i18n.language;
  const isSupported = SUPPORTED_LANGS.includes(detectedLang);

  return (
    <Routes>
      {/* Кореневий маршрут */}
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

      {/* Якщо явно вказали default_lang — редіректимо */}
      <Route
        path={`/${DEFAULT_LANG}/*`}
        element={<Navigate to="/" replace />}
      />

      {/* Інші мови */}
      <Route path="/:lang/*" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* 404 → редірект на головну */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
