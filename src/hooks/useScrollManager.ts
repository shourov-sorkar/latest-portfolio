import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    isNavigating: boolean;
  }
}
interface IScrollManagerOptions {
  trackSections?: boolean;
  sectionIds?: string[];
  scrollThreshold?: number;
  homeThreshold?: number;
  scrollOffset?: number;
  animationDuration?: number;
}

interface IScrollManagerResult {
  scrolled: boolean;
  activeSection: string;
  isChangingSection: boolean;
  scrollToElement: (elementId: string) => void;
}

export const useScrollManager = (
  options: IScrollManagerOptions = {}
): IScrollManagerResult => {
  const {
    trackSections = false,
    sectionIds = ["home", "about", "portfolio", "contact"],
    scrollThreshold = 50,
    homeThreshold = 100,
    scrollOffset = 100,
    animationDuration = 800,
  } = options;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isChangingSection, setIsChangingSection] = useState(false);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const observersRef = useRef<{ [key: string]: IntersectionObserver }>({});
  const isBrowser = typeof window !== "undefined";
  const resetScrollState = useCallback(() => {
    isScrollingRef.current = false;
    setIsChangingSection(false);
    if (isBrowser) {
      window.isNavigating = false;
    }
  }, [isBrowser]);

  const findElement = useCallback(
    (elementId: string): HTMLElement | null => {
      if (!isBrowser) return null;

      let element = document.getElementById(elementId);
      if (!element) {
        element = document.querySelector(`section#${elementId}`) as HTMLElement;
      }
      return element;
    },
    [isBrowser]
  );

  const scrollToElement = useCallback(
    (elementId: string) => {
      if (!isBrowser) return;
      if (trackSections) {
        if (activeSection === elementId && elementId !== "home") {
          return;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsChangingSection(true);
        isScrollingRef.current = true;
        setActiveSection(elementId);
      }
      window.isNavigating = true;
      if (elementId === "home") {
        try {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(() => {
            if (window.pageYOffset > 0) {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          }, 100);

          const homeSection = findElement("home");
          if (homeSection) {
            setTimeout(() => {
              homeSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 50);
          }
        } catch (error) {
          console.error("Error scrolling to home:", error);
        } finally {
          if (trackSections) {
            timeoutRef.current = window.setTimeout(
              resetScrollState,
              animationDuration
            );
          }
        }
        return;
      }
      const targetElement = findElement(elementId);
      if (targetElement) {
        setTimeout(() => {
          try {
            const offset = targetElement.offsetTop;
            window.scrollTo({
              top: offset - scrollOffset,
              behavior: "smooth",
            });
          } catch (error) {
            console.error("Error during scroll:", error);
            try {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } catch (nestedError) {
              console.error("Fallback scroll also failed:", nestedError);
            }
          } finally {
            if (trackSections) {
              timeoutRef.current = window.setTimeout(
                resetScrollState,
                animationDuration
              );
            }
          }
        }, 50);
      } else {
        console.error(`Element with id "${elementId}" not found`);
        if (trackSections) {
          timeoutRef.current = window.setTimeout(resetScrollState, 100);
        }
      }
    },
    [
      activeSection,
      trackSections,
      scrollOffset,
      animationDuration,
      findElement,
      resetScrollState,
      isBrowser,
    ]
  );

  useEffect(() => {
    if (!trackSections || !isBrowser) return;
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const offset = window.scrollY;
      setScrolled(offset > scrollThreshold);
      if (offset < homeThreshold) {
        setActiveSection("home");
        return;
      }
      const contactSection = findElement("contact");
      if (contactSection) {
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;
        const isContactInView =
          window.scrollY + window.innerHeight / 2 > contactSection.offsetTop;

        if (isAtBottom || isContactInView) {
          if (activeSection !== "contact") {
            setActiveSection("contact");
          }
          return;
        }
      }
      for (const section of [...sectionIds].reverse()) {
        if (section === "contact") continue;

        const element = findElement(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          if (activeSection !== section) {
            setActiveSection(section);
          }
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    activeSection,
    trackSections,
    scrollThreshold,
    homeThreshold,
    sectionIds,
    findElement,
    isBrowser,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (isBrowser) {
        window.isNavigating = false;
      }
      Object.values(observersRef.current).forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [isBrowser]);

  useEffect(() => {
    if (!trackSections || !isBrowser) return;
    const createObserver = (options: IntersectionObserverInit) => {
      return new IntersectionObserver((entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              entry.target.classList.add("section-animated");
            } catch (error) {
              console.error("Failed to add section-animated class:", error);
            }
            if (
              entry.target.id === "contact" &&
              entry.intersectionRatio > 0.3
            ) {
              setActiveSection("contact");
            }
            try {
              const children =
                entry.target.querySelectorAll(".animate-on-scroll");
              children.forEach((child, index) => {
                setTimeout(() => {
                  (child as HTMLElement).classList.add("animated");
                }, 100 * index);
              });
            } catch (error) {
              console.error("Failed to animate children:", error);
            }
          }
        });
      }, options);
    };
    const sectionObserver = createObserver({
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    });
    observersRef.current.section = sectionObserver;
    const contactObserver = createObserver({
      root: null,
      rootMargin: "0px",
      threshold: [0.1, 0.5],
    });
    observersRef.current.contact = contactObserver;
    sectionIds.forEach((sectionId) => {
      const element = findElement(sectionId);
      if (element) {
        sectionObserver.observe(element);
        if (sectionId === "contact") {
          contactObserver.observe(element);
        }
      }
    });
    return () => {
      sectionIds.forEach((sectionId) => {
        const element = findElement(sectionId);
        if (element) {
          sectionObserver.unobserve(element);
          if (sectionId === "contact") {
            contactObserver.unobserve(element);
          }
        }
      });
    };
  }, [trackSections, sectionIds, findElement, isBrowser]);

  return {
    scrolled,
    activeSection,
    isChangingSection,
    scrollToElement,
  };
};
