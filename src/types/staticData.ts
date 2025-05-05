export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  shortDescription: string;
  shortName: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  category: string;
  items: Skill[] | string[]; // Support both old and new format
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}
export interface HeroSection {
  welcomeText: string;
}
export interface StaticData {
  personal: Personal;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLinks;
  heroSection: HeroSection;
}
