import { motion, AnimatePresence } from "framer-motion";
import useNavbarAnimations from "../../hooks/useNavbarAnimations";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DesktopNav, Logo, MobileMenu, MobileMenuButton } from ".";
export const Navbar = () => {
  const { navbarVariants } = useNavbarAnimations();
  const { scrolled, activeSection, isChangingSection, scrollToSection } =
    useScrollAnimation();
  const { isOpen, setIsOpen, toggleMenu } = useOutsideClick({
    elementIds: ["navbar", "mobile-menu"],
    initialState: false,
  });
  const handleScrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    scrollToSection(sectionId);
  };

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
            handleScrollToSection={handleScrollToSection}
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
            handleScrollToSection={handleScrollToSection}
          />
        )}
      </AnimatePresence>
    </>
  );
};
