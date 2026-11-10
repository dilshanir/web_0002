import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Quote from './components/Quote';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import PartnerCTA from './components/PartnerCTA';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Hero />
      <main>
        <Marquee />
        <Quote />
        <Pricing />
        <Testimonials />
        <Projects />
        <PartnerCTA />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
