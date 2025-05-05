import { motion } from "framer-motion";
import { getSkills } from "../../utils/dataUtils";
import { SkillCategory } from "../../types/staticData";
export const SkillsSection = ({ isInView }: { isInView: boolean }) => {
  const allSkills = getSkills();
  const skills = Array.isArray(allSkills)
    ? allSkills.flatMap((category: SkillCategory) => category.items)
    : [];
    return (
        <div className="mt-16">
        <motion.h3
          className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Technical Skills
        </motion.h3>

        <div className="flex flex-wrap justify-center">
          {skills.map((skill: string, index: number) => (
            <div key={index} className="skill-badge">
              {skill}
            </div>
          ))}
        </div>
      </div>
    )
};