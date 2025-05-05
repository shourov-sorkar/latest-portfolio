import { motion } from "framer-motion";
import useNavbarAnimations from "../../hooks/useNavbarAnimations";
import { LogoProps } from "./types";

export const Logo: React.FC<LogoProps> = ({ isOpen = false }) => {
  const { logoVariants } = useNavbarAnimations();
  return (
    <motion.div
      className="text-2xl font-bold text-cyan-400 tracking-wider"
      whileHover={{ scale: 1.05 }}
      variants={logoVariants}
      initial="initial"
      animate="animate"
    >
      {!isOpen ? (
        <span className="relative">
          MONIR
          <span className="absolute -inset-1 rounded-lg blur opacity-30 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
        </span>
      ) : null}
    </motion.div>
  );
};
