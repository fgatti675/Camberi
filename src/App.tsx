import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LogoBar } from './components/LogoBar';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { WhyUs } from './components/WhyUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { Stats } from './components/Stats';
import { OpenSource } from './components/OpenSource';
import { Testimonials } from './components/Testimonials';
import { Team } from './components/Team';
import { DIVIDER_A_CONFIG, DIVIDER_B_CONFIG, DIVIDER_C_CONFIG } from './components/neatConfigs';

function App() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <main className="bg-bg-main">
        <Hero />
        <LogoBar />
        <Stats />
        <SectionDivider config={DIVIDER_A_CONFIG} />
        <Services />
        <Portfolio />
        <OpenSource />
        <SectionDivider config={DIVIDER_B_CONFIG} />
        <Process />
        <Testimonials />
        <WhyUs />
        <Team />
        <SectionDivider config={DIVIDER_C_CONFIG} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
