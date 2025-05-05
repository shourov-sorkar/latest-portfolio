import { motion } from "framer-motion";
import { getExperience } from "../../utils/dataUtils";

export const ExperienceSection = ({ isInView }: { isInView: boolean }) => {
  const experience = getExperience();
  return (
    <div className="mt-16">
      <motion.h3
        className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Professional Experience
      </motion.h3>
      <div className="space-y-6">
        {experience.map((exp, index: number) => (
          <motion.div
            key={index}
            className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          >
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h4 className="text-xl font-semibold text-white">
                  {exp.position}
                </h4>
                <p className="text-cyan-400">{exp.company}</p>
              </div>
              <p className="text-zinc-400 text-sm px-3 py-1 bg-zinc-800 rounded-full">
                {exp.duration}
              </p>
            </div>
            <p className="text-zinc-300 mt-3">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
