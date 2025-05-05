import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  parallaxDistance?: number;
  ease?: string;
  scrollDuration?: number;
  sectionSelector?: string;
  backgroundSelector?: string;
}
export const useGsapAnimations = (config: AnimationConfig = {}) => {
  const {
    parallaxDistance = 100,
    ease = "none",
    scrollDuration = 1000,
    sectionSelector = "section",
    backgroundSelector = ".absolute",
  } = config;

  const initialized = useRef<boolean>(false);
  const triggers = useRef<ScrollTrigger[]>([]);

  const initializeAnimations = useCallback(() => {
    try {
      const sections = document.querySelectorAll(sectionSelector);
      sections.forEach((section) => {
        const backgroundElements = section.querySelectorAll(backgroundSelector);

        backgroundElements.forEach((el) => {
          const trigger = gsap.to(el, {
            y: parallaxDistance,
            ease: ease,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              onUpdate: (self) => {
                if (window.isNavigating) {
                  self.disable();
                  setTimeout(() => self.enable(), scrollDuration);
                }
              },
            },
          }).scrollTrigger;

          if (trigger) {
            triggers.current.push(trigger);
          }
        });
      });
    } catch (error) {
      console.error("Error initializing GSAP animations:", error);
    }
  }, [
    parallaxDistance,
    ease,
    scrollDuration,
    sectionSelector,
    backgroundSelector,
  ]);

  const setupResizeObserver = useCallback(() => {
    try {
      let resizeTimer: number;
      const resizeObserver = new ResizeObserver(() => {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
        resizeTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      });
      resizeObserver.observe(document.body);

      return resizeObserver;
    } catch (error) {
      console.error("Error setting up resize observer:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    window.isNavigating = false;
    initializeAnimations();
    const resizeObserver = setupResizeObserver();
    return () => {
      try {
        triggers.current.forEach((trigger) => {
          if (trigger) trigger.kill();
        });
        triggers.current = [];
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      } catch (error) {
        console.error("Error cleaning up GSAP animations:", error);
      }
    };
  }, [initializeAnimations, setupResizeObserver]);

  return {
    refresh: () => ScrollTrigger.refresh(),
    update: initializeAnimations,
  };
};
