import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Header } from './components/Header';
import { ScrollSpine } from './components/ScrollSpine';
import { Hero } from './components/Hero';
import { LogoWall } from './components/LogoWall';
import { Automations } from './components/Automations';
import { Thesis } from './components/Thesis';
import { Work } from './components/Work';
import { Engagements } from './components/Engagements';
import { Process } from './components/Process';
import { OpenSource } from './components/OpenSource';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/* The gradient lives inside the dark sections (Work, Process, Contact)
   rather than in bands between them, so the page reads as one flow with the
   hero as its single saturated moment.

   Section order is an argument, in this order: here is what we build (and
   every one of them does somebody's work for them), here is why that makes
   us different, here is the proof you can go and click, here is how to buy
   it, here is how it runs, here is the code, here are the people, here is
   the address. */
function App() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <ScrollSpine />
      <main className="bg-bg-main">
        <Hero />
        <LogoWall />
        <Automations />
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
