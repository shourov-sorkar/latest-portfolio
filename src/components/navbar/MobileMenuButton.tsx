import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MobileMenuButtonProps } from "./types";

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isOpen, 
  toggleMenu, 
  isChangingSection 
}) => {
  return (
    <motion.div
      className="md:hidden z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        onClick={toggleMenu}
        className="text-2xl bg-zinc-800/50 rounded-full p-2 border border-zinc-700 focus:outline-none hover:border-cyan-500 transition-all duration-300"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        disabled={isChangingSection}
      >
        {isOpen ? <FiX className="text-cyan-400" /> : <FiMenu />}
      </button>
    </motion.div>
  );
};