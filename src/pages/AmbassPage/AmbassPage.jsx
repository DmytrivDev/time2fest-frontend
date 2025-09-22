import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import AmbassHero from '../../components/AmbassHero/AmbassHero';
import AmbassWork from '../../components/AmbassWork/AmbassWork';

const AmbassPage = () => {
  const locale = getValidLocale();
  const pageLoaded = useAfterLoad();

  // Запит на верхній блок (Hero)
  const {
    data: topData,
    isLoading: isLoadingTop,
    error: errorTop,
  } = useQuery({
    queryKey: ['ambass-page-top', locale],
    queryFn: async () => {
      const res = await api.get(`/ambass-page-top?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Запит на решту (WhatDo)
  const {
    data: restData,
    isLoading: isLoadingRest,
    error: errorRest,
  } = useQuery({
    queryKey: ['ambass-page-rest', locale],
    queryFn: async () => {
      const res = await api.get(`/ambass-page-rest?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: pageLoaded,
  });

  return (
    <>
      <AmbassHero
        data={topData?.Hero}
        isLoading={isLoadingTop}
        error={errorTop}
      />
      <AmbassWork
        data={restData?.WhatDo}
        isLoading={isLoadingRest}
        error={errorRest}
      />
    </>
  );
};

export default AmbassPage;
