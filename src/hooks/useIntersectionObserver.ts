import { useEffect, useState } from "react";

type IntersectionOptions = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
};

export const useIntersectionObserver = (
  elementId: string,
  options: IntersectionOptions = { threshold: 0.3 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      options
    );

    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementId, options.threshold, options.root, options.rootMargin, options]);

  return isVisible;
}; 