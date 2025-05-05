import { useEffect, RefObject } from "react";
import gsap from "gsap";

export const useBackgroundAnimation = (
  bgRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const bg = bgRef.current;

    if (bg) {
      // GSAP animation for background
      gsap.to(bg, {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [bgRef]);
}; 