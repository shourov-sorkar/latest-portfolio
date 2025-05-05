import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/navbar';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import { HeroSection, AboutSection } from './sections';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Flag to enable scroll logging
const DEBUG_SCROLL = false;

function App() {
  const initialized = useRef(false);
  
  // Simpler but more reliable smooth scroll function
  const smoothScrollToTop = useCallback(() => {
    console.log('App: Using simplified smooth scroll to top');
    
    // Temporarily disable GSAP animations
    window.isNavigating = true;
    
    // First try with browser's native smooth scroll
    try {
      // Scroll behavior is set to smooth in CSS for better performance
      // Create a wrapper to ensure the scroll event is triggered even if already near top
      if (window.scrollY > 0) {
        // Set a slight timeout to ensure event listeners are ready
        setTimeout(() => {
          console.log('App: Executing scroll to top');
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 10);
      }
    } catch (error) {
      console.error('Error during smooth scroll:', error);
      // Fallback to instant scroll if smooth scroll fails
      window.scrollTo(0, 0);
    }
    
    // Reset navigation flag after animation is likely complete
    setTimeout(() => {
      window.isNavigating = false;
    }, 1000);
  }, []);

  useEffect(() => {
    // Make sure we only initialize once
    if (initialized.current) return;
    initialized.current = true;

    // Set up a flag to disable ScrollTrigger during programmatic navigation
    window.isNavigating = false;

    // Add smooth scrolling behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';

    // First, check if section elements exist
    console.log('Checking sections on mount:');
    ['home', 'about', 'portfolio', 'contact'].forEach(id => {
      const element = document.getElementById(id);
      console.log(`- Section ${id}: ${element ? 'Found' : 'NOT FOUND'}`);
    });

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
            onUpdate: (self) => {
              // Skip updates during programmatic navigation
              if (window.isNavigating) {
                self.disable();
                setTimeout(() => self.enable(), 1000);
              }
            }
          }
        });
      });
    });
    
    // Add scroll listener to debug
    const scrollListener = () => {
      console.log(`Scroll position: ${window.scrollY}`);
    };
    
    // Only add if debugging is enabled
    if (DEBUG_SCROLL) {
      window.addEventListener('scroll', scrollListener);
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (DEBUG_SCROLL) {
        window.removeEventListener('scroll', scrollListener);
      }
    };
  }, []);

  // Explicitly ensure all section IDs are present by adding them as data attributes
  useEffect(() => {
    // Double-check section IDs after mount
    setTimeout(() => {
      const homeSection = document.querySelector('section#home');
      const aboutSection = document.querySelector('section#about');
      const portfolioSection = document.querySelector('section#portfolio');
      const contactSection = document.querySelector('section#contact');
      
      // First section should be home
      if (!homeSection) {
        console.warn('Home section ID missing, fixing...');
        const firstSection = document.querySelector('section:first-of-type');
        if (firstSection) {
          console.log('Setting first section ID to "home"');
          firstSection.id = 'home';
        }
      }
      
      if (!aboutSection) {
        console.warn('About section ID missing, fixing...');
        const possibleAboutSection = document.querySelector('section:nth-of-type(2)');
        if (possibleAboutSection) {
          possibleAboutSection.id = 'about';
        }
      }
      
      if (!portfolioSection) {
        console.warn('Portfolio section ID missing, fixing...');
        const possiblePortfolioSection = document.querySelector('section:nth-of-type(3)');
        if (possiblePortfolioSection) {
          possiblePortfolioSection.id = 'portfolio';
        }
      }
      
      if (!contactSection) {
        console.warn('Contact section ID missing, fixing...');
        const possibleContactSection = document.querySelector('section:nth-of-type(4)');
        if (possibleContactSection) {
          possibleContactSection.id = 'contact';
        }
      }
      
      console.log('Section IDs after fix attempt:');
      ['home', 'about', 'portfolio', 'contact'].forEach(id => {
        const element = document.getElementById(id);
        console.log(`- Section ${id}: ${element ? 'Now found' : 'STILL MISSING'}`);
      });
    }, 100);
  }, []);

  // Add helper for scrolling to top
  useEffect(() => {
    // Register a global helper for scrolling to the top using our enhanced function
    window.scrollToTop = smoothScrollToTop;
    
    // Initialize a click handler directly on the Home nav link
    setTimeout(() => {
      const homeNavLinks = document.querySelectorAll('button.nav-link, button[aria-label="Home"]');
      homeNavLinks.forEach(link => {
        if (link.textContent?.includes('Home')) {
          console.log('Found Home link, adding direct click handler');
          link.addEventListener('click', (e) => {
            console.log('Direct Home click handler triggered');
            e.preventDefault(); // Prevent default behavior
            smoothScrollToTop();
          });
        }
      });
    }, 500);
    
    return () => {
      // Use type assertion to fix the delete operator error
      window.scrollToTop = undefined;
    };
  }, [smoothScrollToTop]);

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

// Add type definition for window object
declare global {
  interface Window {
    isNavigating: boolean;
    scrollToTop?: () => void; // Make scrollToTop optional
  }
}

export default App;
