import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/useAuth';
import ForgetSection from '../../components/Auth/ForgetSection';

const ForgetPass = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const langPrefix = i18n.language === 'en' ? '' : `/${i18n.language}`;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(`${langPrefix}/profile`, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, langPrefix]);

  if (isLoading) return null;

  if (isAuthenticated) return null;

  return <ForgetSection />;
};

export default ForgetPass;
