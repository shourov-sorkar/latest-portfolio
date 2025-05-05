import { Variants } from "framer-motion";

const useNavbarAnimations = () => {
  const navbarVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const logoVariants: Variants = {
    initial: { textShadow: "0 0 8px rgba(34, 211, 238, 0.3)" },
    animate: {
      textShadow: [
        "0 0 8px rgba(34, 211, 238, 0.3)",
        "0 0 20px rgba(34, 211, 238, 0.8)",
        "0 0 8px rgba(34, 211, 238, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const borderGlowVariants: Variants = {
    initial: { boxShadow: "0 1px 0 rgba(34, 211, 238, 0.1)" },
    animate: {
      boxShadow: [
        "0 1px 0 rgba(34, 211, 238, 0.1)",
        "0 1px 6px rgba(34, 211, 238, 0.4)",
        "0 1px 0 rgba(34, 211, 238, 0.1)",
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const indicatorVariants: Variants = {
    initial: { width: 0, opacity: 0 },
    animate: {
      width: "100%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return {
    navbarVariants,
    linkVariants,
    logoVariants,
    borderGlowVariants,
    indicatorVariants
  };
};

export default useNavbarAnimations; 