import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import useNavbarAnimations from "../../hooks/useNavbarAnimations";
import { useScrollManager } from "../../hooks/useScrollManager";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DesktopNav, Logo, MobileMenu, MobileMenuButton } from ".";

export const Navbar = () => {
  const { navbarVariants } = useNavbarAnimations();
  const { scrolled, activeSection, isChangingSection, scrollToElement } =
    useScrollManager({
      trackSections: true, // Enable section tracking for navbar
    });
  const { isOpen, setIsOpen, toggleMenu } = useOutsideClick({
    elementIds: ["navbar", "mobile-menu"],
    initialState: false,
  });

  // Simple but effective smooth scroll to top function
  const smoothScrollToTop = useCallback(() => {
    console.log('Navbar: Simple smooth scroll to top');
    
    // Set GSAP navigation flag
    if (typeof window !== 'undefined' && 'isNavigating' in window) {
      window.isNavigating = true;
    }
    
    // Use the global helper if available
    if (window.scrollToTop) {
      window.scrollToTop();
      return;
    }
    
    // Fallback to native smooth scrolling
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      // For older browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
    
    // Reset navigation flag after animation is likely complete
    setTimeout(() => {
      if (typeof window !== 'undefined' && 'isNavigating' in window) {
        window.isNavigating = false;
      }
    }, 1000);
  }, []);

  const handleNavLinkClick = (sectionId: string) => {
    console.log(`Navbar: handleNavLinkClick called with section: ${sectionId}`);
    setIsOpen(false);
    
    // Special handling for Home section
    if (sectionId === 'home') {
      console.log('Navbar: Special home section handling');
      
      // Use our simplified smooth scroll function
      smoothScrollToTop();
      
      return; // Skip the regular scrollToElement for home
    }
    
    // For other sections, use the regular mechanism
    setTimeout(() => {
      console.log(`Navbar: Calling scrollToElement for section: ${sectionId}`);
      scrollToElement(sectionId);
    }, 10);
  };
  
  // Add direct event listeners for home link as a backup
  useEffect(() => {
    setTimeout(() => {
      const homeLinks = document.querySelectorAll('button.nav-link');
      homeLinks.forEach(link => {
        if (link.textContent?.includes('Home')) {
          console.log('Found Home link, adding backup click handler');
          link.addEventListener('click', (e) => {
            console.log('Navbar: Direct Home handler triggered');
            e.preventDefault();
            smoothScrollToTop();
          });
        }
      });
    }, 500);
  }, [smoothScrollToTop]);

  return (
    <>
      <motion.nav
        id="navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md 
          ${
            scrolled
              ? "bg-black/70 py-3 shadow-lg shadow-cyan-500/10"
              : "bg-transparent py-6"
          }
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <div className="container flex items-center justify-between px-6">
          <Logo isOpen={isOpen} />
          <DesktopNav
            activeSection={activeSection}
            isChangingSection={isChangingSection}
            handleScrollToSection={handleNavLinkClick}
          />
          <MobileMenuButton
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            isChangingSection={isChangingSection}
          />
        </div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activeSection={activeSection}
            isChangingSection={isChangingSection}
            handleScrollToSection={handleNavLinkClick}
          />
        )}
      </AnimatePresence>
    </>
  );
};
