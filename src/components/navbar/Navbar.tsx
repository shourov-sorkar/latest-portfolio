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
      trackSections: true, 
    });
  const { isOpen, setIsOpen, toggleMenu } = useOutsideClick({
    elementIds: ["navbar", "mobile-menu"],
    initialState: false,
  });
  const smoothScrollToTop = useCallback(() => {
    if (typeof window !== 'undefined' && 'isNavigating' in window) {
      window.isNavigating = true;
    }
    if ('scrollToTop' in window) {
      (window as unknown as { scrollToTop: () => void }).scrollToTop();
      return;
    }

    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      if (typeof window !== 'undefined' && 'isNavigating' in window) {
        window.isNavigating = false;
      }
    }, 1000);
  }, []);

  const handleNavLinkClick = (sectionId: string) => {
    setIsOpen(false);
    if (sectionId === 'home') {
      smoothScrollToTop();
      return; 
    }
    setTimeout(() => {
      scrollToElement(sectionId);
    }, 10);
  };
  
  useEffect(() => {
    setTimeout(() => {
      const homeLinks = document.querySelectorAll('button.nav-link');
      homeLinks.forEach(link => {
        if (link.textContent?.includes('Home')) {
          link.addEventListener('click', (e) => {
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
        <div className="w-full flex items-center justify-between px-8">
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
