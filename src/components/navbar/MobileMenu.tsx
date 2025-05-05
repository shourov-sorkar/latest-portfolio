import { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import useNavbarAnimations from "../../hooks/useNavbarAnimations";
import { MobileMenuProps, navLinks } from "./types";
import { Logo } from ".";
import { NavLink } from "./NavLink";

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  setIsOpen, 
  activeSection, 
  isChangingSection, 
  handleScrollToSection 
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { borderGlowVariants } = useNavbarAnimations();
  
  if (!isOpen) return null;
  
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        id="mobile-menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "80%",
          maxWidth: "24rem",
          margin: 0,
          padding: 0,
          zIndex: 50,
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(16px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <motion.div
          className="border-b border-zinc-800/50 px-6 py-3"
          style={{ margin: 0 }}
          variants={borderGlowVariants}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-cyan-400 bg-zinc-800/70 hover:bg-zinc-800 p-2 rounded-full border border-zinc-700/50 hover:border-cyan-500/50 transition-all duration-300 focus:outline-none"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center px-6 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              link={link}
              isActive={activeSection === link.id}
              isChangingSection={isChangingSection}
              onClick={handleScrollToSection}
              isMobile={true}
              hoveredLink={hoveredLink}
              onHover={setHoveredLink}
            />
          ))}
        </div>

        <div className="p-6 mt-auto">
          <div className="text-sm text-zinc-400 border-t border-zinc-800/50 pt-4">
            <p className="text-center">© {new Date().getFullYear()} MONIR</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};
