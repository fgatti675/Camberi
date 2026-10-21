import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Header } from '../../components/Header';
import { ScrollSpine } from '../../components/ScrollSpine';
import { Hero } from '../../components/Hero';
import { LogoWall } from '../../components/LogoWall';
import { Agents } from '../../components/Agents';
import { Work } from '../../components/Work';
import { Engagements } from '../../components/Engagements';
import { Process } from '../../components/Process';
import { Team } from '../../components/Team';
import { Contact } from '../../components/Contact';
import { Footer } from '../../components/Footer';

/* The gradient lives inside the dark sections (Work, Process, Contact)
   rather than in bands between them, so the page reads as one flow with the
   hero as its single saturated moment. Each ribbon band has a light section
   on either side of it — two of them back to back read as the same slide
   twice.

   Section order is the story, and every product is told exactly once:

   1. The promise — software that does the work for you (Hero), and the
      teams already running on what we wrote (LogoWall).
   2. Why agents built by us hold up: the hard part is everything around
      the model (Agents).
   3. The proof: every product, once (Work).
   4. How to start (Engagements), and how it runs week to week (Process).
   5. The people you would be working with (Team), then the address
      (Contact), which closes on the question the hero opened.

   This is the only page with a hero, so it is the only one whose header
   starts transparent and the only one that carries the scroll spine — a
   running head needs sections to run past. */
export default function Home() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <ScrollSpine />
      <main className="bg-bg-main">
        <Hero />
        <LogoWall />
        <Agents />
        <Work />
        <Engagements />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
