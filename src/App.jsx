import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANG, SUPPORTED_LANGS } from './i18n/languages';
import LanguageLayout from './layouts/LanguageLayout/LanguageLayout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AmbassPage = lazy(() => import('./pages/AmbassPage/AmbassPage'));

const App = () => {
  const { i18n, ready } = useTranslation();

  if (!ready) return null; // або <Loader />

  const detectedLang = i18n.language.split('-')[0];
  const isSupported = SUPPORTED_LANGS.includes(detectedLang);

  return (
    <Routes>
      {/* Корінь без префікса (default lang) */}
      <Route path="/" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ambassadors" element={<AmbassPage />} />
      </Route>

      {/* Якщо явно вказали default_lang → редіректимо, але зберігаємо підшлях */}
      <Route
        path={`/${DEFAULT_LANG}/*`}
        element={<Navigate to={window.location.pathname.replace(`/${DEFAULT_LANG}`, '') || '/'} replace />}
      />

      {/* Інші мови */}
      <Route path="/:lang/*" element={<LanguageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ambassadors" element={<AmbassPage />} />
      </Route>

      {/* 404 → редірект на головну */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
