import { useRef } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useTypewriterEffect } from "../../hooks/useTypewriterEffect";
import { useBackgroundAnimation } from "../../hooks/useBackgroundAnimation";
import { useScrollManager } from "../../hooks/useScrollManager";
import { getHeroSection, getPersonalInfo } from "../../utils/dataUtils";

export const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useIntersectionObserver("home");
  const personalInfo = getPersonalInfo();
  const hereSectionInfo = getHeroSection();

  useTypewriterEffect(textRef, personalInfo.name, isVisible);
  useBackgroundAnimation(bgRef);
  const { scrollToElement } = useScrollManager();

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-gradient-to-tr from-black to-gray-900 bg-[length:200%_200%] bg-[0%_0%]"
      />
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-400/10 filter blur-xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-cyan-400/5 filter blur-xl animate-float" />
      <div className="container z-10 px-4 md:px-8 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-cyan-400 text-xl mb-4">
            {hereSectionInfo.welcomeText}
          </p>
        </motion.div>
        <motion.h1
          ref={textRef}
          className="text-5xl md:text-7xl font-bold mb-6 animate-glow max-w-7xl"
          initial={{ opacity: 0 }}
        >
          {personalInfo.shortName}
        </motion.h1>

        <motion.p
          className="text-zinc-300 text-md md:text-xl max-w-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {personalInfo.shortDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => scrollToElement("portfolio")}
            className="relative group px-8 py-3 text-lg font-medium text-white overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-tr from-black/90 to-gray-900/90 shadow-[0_0_5px_rgba(34,211,238,0.1)] hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <span className="relative z-10">My Works</span>
          </button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
