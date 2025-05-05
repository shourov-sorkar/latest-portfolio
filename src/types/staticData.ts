export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
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

export interface StaticData {
  personal: Personal;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLinks;
} 