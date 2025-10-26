import Hero from '../../components/Hero/Hero';
import MapBlock from '../../components/MapBlock/MapBlock';
import AboutSection from '../../components/AboutSection/AboutSection';
import BecomeSection from '../../components/BecomeSection/BecomeSection';
import FaqSection from '../../components/FaqSection/FaqSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <MapBlock />
      <AboutSection />
      <BecomeSection />
      <FaqSection />
    </>
  );
};

export default HomePage;
