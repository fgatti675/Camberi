import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Header } from '../../components/Header';
import { ScrollSpine } from '../../components/ScrollSpine';
import { Hero } from '../../components/Hero';
import { LogoWall } from '../../components/LogoWall';
import { Automations } from '../../components/Automations';
import { Thesis } from '../../components/Thesis';
import { Work } from '../../components/Work';
import { Engagements } from '../../components/Engagements';
import { Process } from '../../components/Process';
import { OpenSource } from '../../components/OpenSource';
import { Team } from '../../components/Team';
import { Contact } from '../../components/Contact';
import { Footer } from '../../components/Footer';
import type { Route } from '../../routes/types';

/* The gradient lives inside the dark sections (Work, Process, Contact)
   rather than in bands between them, so the page reads as one flow with the
   hero as its single saturated moment.

   Section order is an argument, in this order: here is what we build (and
   every one of them does somebody's work for them), here is why that makes
   us different, here is the proof you can go and click, here is how to buy
   it, here is how it runs, here is the code, here are the people, here is
   the address.

   This is the only page with a hero, so it is the only one whose header
   starts transparent and the only one that carries the scroll spine — a
   running head needs sections to run past. */
export function Home() {
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

export const route: Route = {
  path: '/',
  priority: 1,
  component: Home,
  locales: {
    en: {
      title: 'Camberi — the studio behind FireCMS, Rebase and medicalmotion',
      description:
        'A product engineering studio in Madrid. We build and run our own software — FireCMS, Rebase and Neat — and the technology behind medicalmotion.',
      ogDescription:
        "We don't hand it over and disappear. A product engineering studio that builds and runs its own software — and yours.",
    },
    es: {
      title: 'Camberi — el estudio detrás de FireCMS, Rebase y medicalmotion',
      description:
        'Estudio de ingeniería de producto en Madrid. Creamos y mantenemos nuestro propio software —FireCMS, Rebase, Neat— y la tecnología de medicalmotion.',
      ogDescription:
        'No lo entregamos y desaparecemos. Un estudio de ingeniería de producto que crea y mantiene su propio software, y el tuyo.',
    },
  },
};
