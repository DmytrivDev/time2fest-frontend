import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import AboutHero from '../../components/AboutHero/AboutHero';
import AboutWhyWe from '../../components/AboutWhyWe/AboutWhyWe';
import AboutSteps from '../../components/AboutSteps/AboutSteps';
import AboutFree from '../../components/AboutFree/AboutFree';
import AboutPaid from '../../components/AboutPaid/AboutPaid';

const AboutPage = () => {
  const locale = getValidLocale();
  const pageLoaded = useAfterLoad();

  // Запит на верхній блок (Hero)
  const {
    data: topData,
    isLoading: isLoadingTop,
    error: errorTop,
  } = useQuery({
    queryKey: ['about-page-top', locale],
    queryFn: async () => {
      const res = await api.get(`/about-page-top?locale=${locale}`);
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
    queryKey: ['about-page-rest', locale],
    queryFn: async () => {
      const res = await api.get(`/about-page-rest?locale=${locale}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <AboutHero
        data={topData?.HeroAbout}
        isLoading={isLoadingTop}
        error={errorTop}
      />
      <AboutWhyWe
        data={restData?.WhyWe}
        isLoading={isLoadingRest}
        error={errorRest}
      />
      <AboutSteps
        data={restData?.Steps}
        isLoading={isLoadingRest}
        error={errorRest}
      />
      <AboutFree
        data={restData?.FreePlan}
        isLoading={isLoadingRest}
        error={errorRest}
      />
      <AboutPaid
        data={restData?.PaidPlan}
        dataFree={restData?.FreePlan}
        isLoading={isLoadingRest}
        error={errorRest}
      />
    </>
  );
};

export default AboutPage;
