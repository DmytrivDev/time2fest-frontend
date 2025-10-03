import { useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { getValidLocale } from '../../utils/getValidLocale';
import { useAfterLoad } from '../../hooks/useAfterLoad';

import AboutHero from '../../components/AboutHero/AboutHero';
import AboutWhyWe from '../../components/AboutWhyWe/AboutWhyWe';
import AboutSteps from '../../components/AboutSteps/AboutSteps';
import AboutFree from '../../components/AboutFree/AboutFree';
import AboutPaid from '../../components/AboutPaid/AboutPaid';
import AmbassHero from '../../components/AmbassHero/AmbassHero';
import FaqSection from '../../components/FaqSection/FaqSection';
import AboutTech from '../../components/AboutTech/AboutTech';
import AboutWay from '../../components/AboutWay/AboutWay';

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

  const {
    data: ambassData,
    isLoading: isLoadingambass,
    error: errorambass,
  } = useQuery({
    queryKey: ['ambass-page-top', locale],
    queryFn: async () => {
      const res = await api.get(`/ambass-page-top?locale=${locale}`);
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
      <AmbassHero
        data={ambassData?.Hero}
        isLoading={isLoadingambass}
        error={errorambass}
      />
      <FaqSection />
      <AboutTech
        data={restData?.Technic}
        isLoading={isLoadingRest}
        error={errorRest}
      />
      <AboutWay
        data={restData?.Way}
        isLoading={isLoadingRest}
        error={errorRest}
      />
    </>
  );
};

export default AboutPage;
