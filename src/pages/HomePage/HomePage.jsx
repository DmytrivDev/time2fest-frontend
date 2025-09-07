import Hero from '../../components/Hero/Hero';
import Map from '../../components/Map/Map';
import AboutSection from '../../components/AboutSection/AboutSection';
import BecomeSection from '../../components/BecomeSection/BecomeSection';
import FaqSection from '../../components/FaqSection/FaqSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <Map /> */}
      <AboutSection />
      <BecomeSection />
      <FaqSection />
    </>
  );
};

export default HomePage;
