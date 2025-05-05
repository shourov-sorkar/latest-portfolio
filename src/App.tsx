import { useEffect, useRef, Component, ReactNode, ErrorInfo } from "react";

import Navbar from "./components/navbar";
import { Footer } from "./components/Footer";
import {
  HeroSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
} from "./sections";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
export const App = () => {
  const initialized = useRef<boolean>(false);
  const config = {
    scrollDuration: 1000,
    animationSettings: {
      parallaxDistance: 100,
      ease: "none",
    },
    sectionIds: ["home", "about", "portfolio", "contact"],
  };

  const {
    ensureSectionIds,
    setupHomeNavigation,
    cleanup: cleanupScroll,
  } = useSmoothScroll({ duration: config.scrollDuration });

  const { update: updateAnimations } = useGsapAnimations({
    parallaxDistance: config.animationSettings.parallaxDistance,
    ease: config.animationSettings.ease,
    scrollDuration: config.scrollDuration,
  });

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    window.isNavigating = false;
    document.documentElement.style.scrollBehavior = "smooth";
    updateAnimations();
    ensureSectionIds(config.sectionIds);
    setupHomeNavigation();
    return () => {
      cleanupScroll();
    };
  }, [
    updateAnimations,
    ensureSectionIds,
    setupHomeNavigation,
    cleanupScroll,
    config.sectionIds,
  ]);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <ErrorBoundary
        fallback={
          <div className="p-4">Something went wrong with the navigation</div>
        }
      >
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Unable to load content
          </div>
        }
      >
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div className="p-4">Footer unavailable</div>}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
