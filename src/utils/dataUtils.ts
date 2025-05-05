import staticData from "../data/staticData.json";
import {
  StaticData,
  Personal,
  SkillCategory,
  Project,
  Experience,
  Education,
  SocialLinks,
  HeroSection,
} from "../types/staticData";
// Type assertion for the imported JSON
const typedData = staticData as unknown as StaticData;

/**
 * Get all static data
 * @returns {StaticData} The complete static data object
 */
export const getAllData = (): StaticData => {
  return typedData;
};

/**
 * Get personal information
 * @returns {Personal} Personal information including name, title, contact details, etc.
 */
export const getPersonalInfo = (): Personal => {
  return typedData.personal;
};

/**
 * Get skills by category or all skills
 * @param {string} [category] - Optional category name to filter skills by (e.g. "Frontend", "Backend")
 * @returns {SkillCategory[] | SkillCategory | null} Returns all skill categories as an array if no category is specified,
 * a single SkillCategory object if the category is found, or null if the specified category doesn't exist
 */
export const getSkills = (
  category?: string
): SkillCategory[] | SkillCategory | null => {
  if (category) {
    return (
      typedData.skills.find((skill) => skill.category === category) || null
    );
  }
  return typedData.skills;
};

/**
 * Get all projects or a specific project by ID
 * @param {number} [id] - Optional project ID to retrieve a specific project
 * @returns {Project[] | Project | null} Returns all projects as an array if no ID is specified,
 * a single Project object if the project with the specified ID is found, or null if no project matches the ID
 */
export const getProjects = (id?: number): Project[] | Project | null => {
  if (id) {
    return typedData.projects.find((project) => project.id === id) || null;
  }
  return typedData.projects;
};

/**
 * Get work experience information
 * @returns {Experience[]} Array of work experience entries
 */
export const getExperience = (): Experience[] => {
  return typedData.experience;
};

/**
 * Get education information
 * @returns {Education[]} Array of education entries
 */
export const getEducation = (): Education[] => {
  return typedData.education;
};

/**
 * Get social links
 * @returns {SocialLinks} Object containing social media profile URLs
 */
export const getSocialLinks = (): SocialLinks => {
  return typedData.socialLinks;
};

/**
 * Get hero section information
 * @returns {HeroSection} Hero section data including welcome text
 */
export const getHeroSection = (): HeroSection => {
  return typedData.heroSection;
};
