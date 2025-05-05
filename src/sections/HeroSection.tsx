import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const HeroSection = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bg = bgRef.current;

    if (bg) {
      // GSAP animation for background
      gsap.to(bg, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Setup intersection observer to detect when hero section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('home');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const text = textRef.current;

    if (text && isVisible) {
      // Store the full text content
      const fullText = 'monir — Full-Stack JavaScript Developer';
      
      // Reset text content
      text.innerText = '';
      
      // Create a new timeline for the typing animation
      const tl = gsap.timeline();
      
      // Fade in the element
      tl.to(text, { opacity: 1, duration: 0.3 });
      
      // Type the text character by character
      for (let i = 0; i < fullText.length; i++) {
        tl.to(text, {
          innerText: fullText.substring(0, i + 1),
          duration: 0.05,
          ease: 'none'
        });
      }
    }
  }, [isVisible]); // Re-run when visibility changes

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with animation */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, rgba(0, 0, 0, 0) 70%), linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(17, 24, 39, 1) 100%)',
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%'
        }}
      />

      {/* Grid lines for futuristic effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-400/10 filter blur-xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-cyan-400/5 filter blur-xl animate-float" />

      {/* Content */}
      <div className="container z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 text-xl mb-4">Hi, I'm </p>
        </motion.div>

        <motion.h1
          ref={textRef}
          className="text-4xl md:text-6xl font-bold mb-6 glow-text"
          initial={{ opacity: 0 }}
        >
         monir — Full-Stack JavaScript Developer
        </motion.h1>

        <motion.p
          className="text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building modern web experiences with cutting-edge technologies
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary relative group"
          >
            <span>Explore My Work</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>

      {/* Animated arrow indicating scroll */}
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

export default HeroSection; 