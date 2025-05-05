import { useState, useEffect, useRef } from "react";

interface ScrollAnimationHook {
  scrolled: boolean;
  activeSection: string;
  isChangingSection: boolean;
  isScrollingRef: React.RefObject<boolean>;
  timeoutRef: React.RefObject<number | null>;
  scrollToSection: (sectionId: string) => void;
}

const useScrollAnimation = (): ScrollAnimationHook => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isChangingSection, setIsChangingSection] = useState(false);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll handling during programmatic scrolling
      if (isScrollingRef.current) return;

      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
        
        // If we're at the top of the page, set home as active section
        if (offset < 100) {
          setActiveSection("home");
          return;
        }
      }

      // Determine active section for nav highlighting
      const sections = ["home", "about", "portfolio", "contact"];

      // Special case for the contact section (last section)
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        // Check if we're at or near the bottom of the page
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;

        // If near bottom of page or contact section is in upper half of viewport, activate it
        if (
          isAtBottom ||
          window.scrollY + window.innerHeight / 2 > contactSection.offsetTop
        ) {
          if (activeSection !== "contact") {
            setActiveSection("contact");
          }
          return;
        }
      }

      // Handle other sections
      for (const section of [...sections].reverse()) {
        if (section === "contact") continue; // Skip contact since we handled it already

        const element = document.getElementById(section);
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
  }, [activeSection]);

  // Clear any lingering timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Setup intersection observers for sections
  useEffect(() => {
    const sections = ["home", "about", "portfolio", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      // Skip during programmatic scrolling to avoid flashing
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class when section comes into view
          entry.target.classList.add("section-animated");

          // Special handling for contact section to ensure it gets highlighted
          if (entry.target.id === "contact" && entry.intersectionRatio > 0.3) {
            setActiveSection("contact");
          }

          // Animate children with staggered delay
          const children = entry.target.querySelectorAll(".animate-on-scroll");
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animated");
            }, 100 * index);
          });
        }
      });
    }, observerOptions);

    // Special observer just for the contact section with different threshold
    const contactObserver = new IntersectionObserver(
      (entries) => {
        // Skip during programmatic scrolling
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          // If contact section is at least 10% visible, activate it
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setActiveSection("contact");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.5],
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        sectionObserver.observe(element);

        // Add contact section to special observer
        if (sectionId === "contact") {
          contactObserver.observe(element);
        }
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          sectionObserver.unobserve(element);
          if (sectionId === "contact") {
            contactObserver.unobserve(element);
          }
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      // No need to scroll if already on the section
      return;
    }

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set flags to prevent blink
    setIsChangingSection(true);
    isScrollingRef.current = true;

    // Update active section immediately to update the UI
    setActiveSection(sectionId);

    // Remove exit/enter classes from all sections to avoid conflicts
    document.querySelectorAll(".section-exit, .section-enter").forEach((el) => {
      el.classList.remove("section-exit", "section-enter");
    });

    // Get the target section
    const targetSection = document.getElementById(sectionId);

    // Scroll to section smoothly without additional animations
    if (targetSection) {
      // Small delay to ensure the menu is closed first on mobile
      timeoutRef.current = window.setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Reset flags after scroll animation completes
        timeoutRef.current = window.setTimeout(() => {
          isScrollingRef.current = false;
          setIsChangingSection(false);
        }, 800); // Slightly longer than the CSS transition
      }, 50);
    } else {
      // Reset flags if section not found
      isScrollingRef.current = false;
      setIsChangingSection(false);
    }
  };

  return {
    scrolled,
    activeSection,
    isChangingSection,
    isScrollingRef,
    timeoutRef,
    scrollToSection
  };
};

export default useScrollAnimation; 