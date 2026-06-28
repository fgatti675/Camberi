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
import './App.css';

function App() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
