import { useRef, useCallback } from "react";

interface ScrollOptions {
  behavior?: ScrollBehavior;
  top?: number;
  duration?: number;
}
export const useSmoothScroll = (options: ScrollOptions = {}) => {
  const { duration = 1000 } = options;

  const scrollTimerRef = useRef<number | undefined>(undefined);
  const scrollToTop = useCallback(
    (scrollOptions: ScrollOptions = {}) => {
      try {
        window.isNavigating = true;
        if (scrollTimerRef.current) {
          window.clearTimeout(scrollTimerRef.current);
        }
        if (window.scrollY > 0) {
          window.scrollTo({
            top: scrollOptions.top ?? 0,
            behavior: scrollOptions.behavior ?? "smooth",
          });
        }
        scrollTimerRef.current = window.setTimeout(() => {
          window.isNavigating = false;
          scrollTimerRef.current = undefined;
        }, scrollOptions.duration ?? duration);
      } catch (error) {
        console.error("Scroll error:", error);
        window.scrollTo(0, 0);
        window.isNavigating = false;
      }
    },
    [duration]
  );
  const scrollToSection = useCallback(
    (sectionId: string, scrollOptions: ScrollOptions = {}) => {
      try {
        const section = document.getElementById(sectionId);
        if (section) {
          window.isNavigating = true;
          if (scrollTimerRef.current) {
            window.clearTimeout(scrollTimerRef.current);
          }
          section.scrollIntoView({
            behavior: scrollOptions.behavior ?? "smooth",
            block: "start",
          });
          scrollTimerRef.current = window.setTimeout(() => {
            window.isNavigating = false;
            scrollTimerRef.current = undefined;
          }, scrollOptions.duration ?? duration);
        }
      } catch (error) {
        console.error(`Error scrolling to section ${sectionId}:`, error);
        window.isNavigating = false;
      }
    },
    [duration]
  );

  const ensureSectionIds = useCallback((sectionIds: string[]) => {
    try {
      setTimeout(() => {
        sectionIds.forEach((id, index) => {
          if (!document.getElementById(id)) {
            const sectionElement = document.querySelector(
              `section:nth-of-type(${index + 1})`
            );
            if (sectionElement) {
              sectionElement.id = id;
            }
          }
        });
      }, 100);
    } catch (error) {
      console.error("Error ensuring section IDs:", error);
    }
  }, []);

  const setupHomeNavigation = useCallback(() => {
    try {
      (
        window as Window &
          typeof globalThis & {
            scrollToTop: typeof scrollToTop;
            scrollToSection: typeof scrollToSection;
          }
      ).scrollToTop = scrollToTop;
      (
        window as Window &
          typeof globalThis & {
            scrollToTop: typeof scrollToTop;
            scrollToSection: typeof scrollToSection;
          }
      ).scrollToSection = scrollToSection;
      setTimeout(() => {
        const homeNavLinks = document.querySelectorAll(
          'button.nav-link, button[aria-label="Home"]'
        );
        homeNavLinks.forEach((link) => {
          if (link.textContent?.includes("Home")) {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              scrollToTop();
            });
          }
        });
      }, 500);
    } catch (error) {
      console.error("Error setting up navigation:", error);
    }
  }, [scrollToTop, scrollToSection]);

  const cleanup = useCallback(() => {
    try {
      if (scrollTimerRef.current) {
        window.clearTimeout(scrollTimerRef.current);
      }
      const windowWithScrollHelpers = window as Window &
        typeof globalThis & {
          scrollToTop: typeof scrollToTop | undefined;
          scrollToSection: typeof scrollToSection | undefined;
        };
      windowWithScrollHelpers.scrollToTop = undefined;
      windowWithScrollHelpers.scrollToSection = undefined;
    } catch (error) {
      console.error("Error during scroll cleanup:", error);
    }
  }, []);

  return {
    scrollToTop,
    scrollToSection,
    ensureSectionIds,
    setupHomeNavigation,
    cleanup,
  };
};
