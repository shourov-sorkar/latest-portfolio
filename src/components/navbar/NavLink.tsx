import { motion, AnimatePresence } from "framer-motion";
import useNavbarAnimations from "../../hooks/useNavbarAnimations";
import { NavLinkProps } from "../../types/navbar";
export const NavLink: React.FC<NavLinkProps> = ({
  link,
  isActive,
  isChangingSection,
  onClick,
  isMobile = false,
  hoveredLink = null,
  onHover = null,
  custom,
}) => {
  const { indicatorVariants, linkVariants } = useNavbarAnimations();
  const handleClick = (event: React.MouseEvent) => {
    if (link.id === "home") {
      event.preventDefault();
      if ("scrollToTop" in window) {
        (window as unknown as { scrollToTop: () => void }).scrollToTop();
      } else {
        try {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } catch {
          window.scrollTo(0, 0);
        }
      }
      onClick(link.id);
      return;
    }
    onClick(link.id);
  };

  if (isMobile) {
    return (
      <button
        className={`group relative overflow-hidden py-5 px-5 my-2 rounded-md transition-all flex items-center
          ${isActive ? "text-cyan-400 font-semibold pl-8" : "text-white/90"}
          ${isChangingSection ? "pointer-events-none" : ""}
          ${hoveredLink === link.id ? "hover-active" : ""}`}
        onClick={handleClick}
        onMouseEnter={() => onHover && onHover(link.id)}
        onMouseLeave={() => onHover && onHover(null)}
        disabled={isChangingSection}
        style={
          isActive
            ? {
                textShadow: "0 0 10px rgba(34, 211, 238, 0.7)",
                color: "#22d3ee",
              }
            : {}
        }
      >
        {(isActive || hoveredLink === link.id) && (
          <div
            className="absolute inset-0 z-0 rounded-md"
            style={{
              opacity: isActive ? 0.2 : 0.05,
              background:
                "linear-gradient(135deg, rgba(8,145,178,0.5) 0%, rgba(14,116,144,0.1) 100%)",
            }}
          />
        )}

        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-400 via-cyan-400 to-blue-500 rounded-l-md" />
        )}

        <span
          className={`relative z-10 text-xl ${
            isActive ? "font-bold" : "font-medium"
          }`}
        >
          {link.name}
        </span>
        <span
          className={`ml-auto ${
            isActive
              ? "text-cyan-300"
              : "text-cyan-400/70 opacity-0 group-hover:opacity-100"
          } transition-all duration-300`}
        >
          →
        </span>
      </button>
    );
  }

  return (
    <motion.button
      custom={custom}
      variants={linkVariants}
      whileHover={{
        scale: 1.1,
        color: "#22d3ee",
        textShadow: "0 0 8px rgba(34, 211, 238, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className={`nav-link text-base relative px-2 py-1 transition-all duration-300 ${
        isActive ? "text-cyan-400 font-bold" : "text-white/90 font-medium"
      } ${isChangingSection ? "pointer-events-none" : ""}`}
      onClick={handleClick}
      disabled={isChangingSection}
      style={
        isActive
          ? {
              textShadow: "0 0 12px rgba(34, 211, 238, 0.8)",
              color: "#34eeff",
            }
          : {}
      }
    >
      <span className="relative z-10">{link.name}</span>
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
            layoutId="activeIndicator"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={indicatorVariants}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};
