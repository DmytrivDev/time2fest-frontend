import Hero from '../components/Hero/Hero';
import Map from '../components/Map/Map';
import AboutSection from '../components/AboutSection/AboutSection';
import BecomeSection from '../components/BecomeSection/BecomeSection';
import FaqSection from '../components/FaqSection/FaqSection';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div className="main">
      <Hero />
      <Map />
      <AboutSection />
      <BecomeSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default HomePage;
HomePage;
