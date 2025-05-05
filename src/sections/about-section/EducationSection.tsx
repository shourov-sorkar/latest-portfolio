import { motion } from "framer-motion";
import { getEducation } from "../../utils/dataUtils";
export const EducationSection = ({ isInView }: { isInView: boolean }) => {
  const education = getEducation();

  return (
    <div className="mt-16">
      <motion.h3
        className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Education
      </motion.h3>

      <div className="space-y-6">
        {education.map((edu, index: number) => (
          <motion.div
            key={index}
            className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <h4 className="text-xl font-semibold text-white">
              {edu.institution}
            </h4>
            <p className="text-cyan-400">{edu.degree}</p>
            <p className="text-zinc-400 text-sm">{edu.year}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
