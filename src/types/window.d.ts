// Global window type definitions
interface ScrollOptions {
  behavior?: ScrollBehavior;
  top?: number;
  duration?: number;
}

declare global {
  interface Window {
    isNavigating: boolean;
    scrollToTop?: (options?: ScrollOptions) => void;
    scrollToSection?: (sectionId: string, options?: ScrollOptions) => void;
    resizeTimer?: number;
  }
} 