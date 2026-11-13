import Hero from '@/components/home/Hero';
import Pillars from '@/components/home/Pillars';
import Statement from '@/components/home/Statement';
import HowItWorks from '@/components/home/HowItWorks';
import BrandGrid from '@/components/home/BrandGrid';
import EventSpotlight from '@/components/home/EventSpotlight';
import CertBand from '@/components/home/CertBand';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <Statement />
      <HowItWorks />
      <BrandGrid />
      <EventSpotlight />
      <CertBand />
      <FAQ />
      <FinalCTA />
    </>
  );
}
