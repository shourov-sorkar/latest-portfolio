import { useEffect, RefObject } from "react";
import gsap from "gsap";

export const useTypewriterEffect = (
  textRef: RefObject<HTMLHeadingElement | null>,
  text: string,
  isVisible: boolean
) => {
  useEffect(() => {
    const element = textRef.current;

    if (element && isVisible) {
      // Reset text content
      element.innerText = "";

      // Create a new timeline for the typing animation
      const tl = gsap.timeline();

      // Fade in the element
      tl.to(element, { opacity: 1, duration: 0.3 });

      // Type the text character by character
      for (let i = 0; i < text.length; i++) {
        tl.to(element, {
          innerText: text.substring(0, i + 1),
          duration: 0.05,
          ease: "none",
        });
      }
    }
  }, [textRef, text, isVisible]); // Re-run when visibility changes
}; 