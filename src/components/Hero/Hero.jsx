import { useEffect, useState } from 'react';
import { getHeroBlock } from '../../api/hero';


export const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHeroBlock().then((data) => {
      console.log('✅ Hero data received:', data);
      setHero(data);
    });
  }, []);

  if (!hero) {
    console.log('⌛ Waiting for hero...');
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>{hero.title}</h2>
      <p>{hero.subtitle}</p>
    </section>
  );
};
