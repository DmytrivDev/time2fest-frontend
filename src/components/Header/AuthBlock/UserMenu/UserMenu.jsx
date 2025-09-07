import { useTranslation } from 'react-i18next';

const UserMenu = () => {
  const { t } = useTranslation('common');
  return <button className="btn_small">{t('log-in')}</button>;
};

export default UserMenu;
