import { useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SkillsSection,
  EducationSection,
  ExperienceSection,
  ProfileSection,
} from ".";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-dark-400 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[size:50px_50px] bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)]" />
      </div>
      <div className="container relative z-10">
        <ProfileSection isInView={isInView} />
        <SkillsSection isInView={isInView} />
        <ExperienceSection isInView={isInView} />
        <EducationSection isInView={isInView} />
      </div>
    </section>
  );
};
