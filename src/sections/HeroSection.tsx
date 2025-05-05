import { useRef } from "react";
import { motion } from "framer-motion";
import { useBackgroundAnimation } from "../hooks/useBackgroundAnimation";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriterEffect } from "../hooks/useTypewriterEffect";
import { useScrollManager } from "../hooks/useScrollManager";

export const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useIntersectionObserver("home");
  
  useTypewriterEffect(textRef, "Monir Hossain Showrav", isVisible);
  useBackgroundAnimation(bgRef);
  const { scrollToElement } = useScrollManager();

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, rgba(0, 0, 0, 0) 70%), linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(17, 24, 39, 1) 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
        }}
      />
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
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
          <p className="text-cyan-400 text-xl mb-4">Hi! I'm</p>
        </motion.div>
        <motion.h1
          ref={textRef}
          className="text-5xl md:text-7xl  font-bold mb-6 glow-text max-w-7xl"
          initial={{ opacity: 0 }}
        >
          Monir
        </motion.h1>

        <motion.p
          className="text-zinc-300 text-md md:text-xl max-w-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          An architect of logic building bridges between ideas and code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => scrollToElement("portfolio")}
            className="relative group px-8 py-3 text-lg font-medium text-white overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{
              background:
                "linear-gradient(45deg, rgba(0,0,0,0.9), rgba(17, 24, 39, 0.9))",
              boxShadow: "0 0 10px rgba(34, 211, 238, 0.1)",
            }}
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
