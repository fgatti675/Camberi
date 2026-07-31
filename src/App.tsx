import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LogoWall } from './components/LogoWall';
import { Thesis } from './components/Thesis';
import { Work } from './components/Work';
import { Engagements } from './components/Engagements';
import { Process } from './components/Process';
import { OpenSource } from './components/OpenSource';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/* The gradient lives inside the dark sections now (Work, Process, Contact)
   rather than in bands between them, so the page reads as one flow with the
   hero as its single saturated moment. */
function App() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <main className="bg-bg-main">
        <Hero />
        <LogoWall />
        <Thesis />
        <Work />
        <Engagements />
        <Process />
        <OpenSource />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
