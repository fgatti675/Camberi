import { useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useToneFlow } from '../../hooks/useToneFlow';
import { Header } from '../../components/Header';
import { ScrollSpine } from '../../components/ScrollSpine';
import { Hero } from '../../components/Hero';
import { LogoWall } from '../../components/LogoWall';
import { Automations } from '../../components/Automations';
import { Agents } from '../../components/Agents';
import { Thesis } from '../../components/Thesis';
import { Work } from '../../components/Work';
import { Engagements } from '../../components/Engagements';
import { Process } from '../../components/Process';
import { OpenSource } from '../../components/OpenSource';
import { Team } from '../../components/Team';
import { Contact } from '../../components/Contact';
import { Footer } from '../../components/Footer';

/* The gradient lives inside the dark sections (Work, Process, Contact)
   rather than in bands between them, so the page reads as one flow with the
   hero as its single saturated moment. Around the agents section the page
   colour blends instead of cutting (`useToneFlow`); the ribbon bands keep
   their solid black and their hard edges.

   Section order is the story, told once and in order:

   1. The promise — software that does the work for you (Hero), and the
      teams already running on what we wrote (LogoWall).
   2. What we build — products that take a job off somebody's desk.
   3. Why it holds up — the hard part of an agent is everything around the
      model, which is what we have been building for a decade.
   4. Why us — we stay, and with AI that matters more; the numbers.
   5. The proof — products you can open (Work), then the code you can read
      (OpenSource), back to back so the evidence is never interrupted.
   6. The people you would be working with.
   7. How to start (Engagements), how it runs week to week (Process), and
      the address (Contact), which closes on the question the hero opened.

   This is the only page with a hero, so it is the only one whose header
   starts transparent and the only one that carries the scroll spine — a
   running head needs sections to run past. */
export default function Home() {
  useScrollAnimation();
  const mainRef = useRef<HTMLElement>(null);
  useToneFlow(mainRef);

  return (
    <>
      <Header />
      <ScrollSpine />
      <main ref={mainRef} className="bg-bg-main">
        <Hero />
        <LogoWall />
        <Automations />
        <Agents />
        <Thesis />
        <Work />
        <OpenSource />
        <Team />
        <Engagements />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
