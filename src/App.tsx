import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Enable smooth scrolling
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      // Create a parallax effect for background elements
      const backgroundElements = section.querySelectorAll('.absolute');
      
      backgroundElements.forEach((el) => {
        gsap.to(el, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
