import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../../i18n/languages';

import SeoMeta from '../../components/SeoMeta';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import LoginRequired from '@/components/Popups/LoginRequired';
import LoginSubRequired from '@/components/Popups/LoginSubRequired';
import SubRequired from '@/components/Popups/SubRequired';
import ReplaceCountryPopup from "@/components/Popups/ReplaceCountryPopup";
import VideoPopup  from "@/components/Popups/VideoPopup";

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
  const navigate = useNavigate();
  const [dynamicData, setDynamicData] = useState(null);
  const location = useLocation();
  const isProfile = location.pathname.includes('/profile');

  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      // якщо мова має суфікс (наприклад en-GB, fr-CA)
      const base = lang.split('-')[0];
      const isAllowed = SUPPORTED_LANGS.includes(base);

      if (!isAllowed) {
        // якщо не дозволена — редирект на головну
        navigate('/', { replace: true });
        return;
      }

      // якщо allowed і має суфікс → замінюємо URL на короткий
      if (lang.includes('-')) {
        const rest = pathname.replace(new RegExp(`^/${lang}`), base === DEFAULT_LANG ? '' : `/${base}`) || '/';
        navigate(`${rest}${search}${hash}`, { replace: true });
        return;
      }

      // якщо allowed і базова → просто синхронізуємо i18n
      if (i18n.language.split('-')[0] !== base) {
        i18n.changeLanguage(base);
      }
    } else {
      // якщо мова не задана, ставимо дефолтну
      if (i18n.language.split('-')[0] !== DEFAULT_LANG) {
        i18n.changeLanguage(DEFAULT_LANG);
      }
    }
  }, [lang, pathname, search, hash, navigate, i18n]);

  const outletContext = { setDynamicData, dynamicData };

  return (
    <div className="wrapper">
      <LanguageHTMLUpdater />
      <SeoMeta dynamicData={dynamicData} />
      {!isProfile && <Header />}
      <main className="main">
        <Outlet context={outletContext} />
      </main>
      <LoginRequired />
      <LoginSubRequired />
      <SubRequired />
      <ReplaceCountryPopup />
      <VideoPopup />
      {!isProfile && <Footer />}
    </div>
  );
};

export default LanguageLayout;
