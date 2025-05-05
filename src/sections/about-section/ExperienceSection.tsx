import { motion, AnimatePresence } from "framer-motion";
import { getExperience } from "../../utils/dataUtils";
import { useState } from "react";
const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
  </div>
);
const HorizontalDivider = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="absolute left-1/2 top-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
    initial={{ width: 0 }}
    animate={isInView ? { width: "80%" } : { width: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{ transform: "translateX(-50%)" }}
  />
);
const SectionTitle = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="mb-14 relative"
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center justify-center gap-3 mb-2">
      <div className="h-[1px] w-6 bg-cyan-500"></div>
      <motion.div
        className="w-3 h-3 rounded-sm bg-zinc-900 border border-cyan-500 relative rotate-45"
        animate={{ rotate: [45, 225, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-cyan-500/20 blur-sm"></div>
      </motion.div>
      <div className="h-[1px] w-6 bg-cyan-500"></div>
    </div>

    <h3 className="text-3xl font-bold text-center relative">
      <span className="text-zinc-200">Professional</span>
      <span className="text-cyan-400 ml-2">Experience</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>

    <div className="text-center mt-6 text-xs uppercase tracking-widest text-zinc-500">
      <span>Career</span>
      <span className="mx-2 text-cyan-500">//</span>
      <span>Timeline</span>
    </div>
  </motion.div>
);
const TimelineVerticalLine = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="absolute left-[22px] top-10 bottom-4 w-1 bg-gradient-to-b from-cyan-500 via-cyan-400/50 to-blue-600/30 rounded-full overflow-hidden"
    initial={{ height: 0 }}
    animate={isInView ? { height: "auto" } : { height: 0 }}
    transition={{ duration: 1.2, delay: 0.4 }}
  >
    <motion.div
      className="absolute w-full h-24 bg-gradient-to-b from-transparent via-white/30 to-transparent"
      initial={{ top: "-20%" }}
      animate={{ top: "120%" }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  </motion.div>
);
const TimelineNode = ({
  isInView,
  index,
}: {
  isInView: boolean;
  index: number;
}) => (
  <div className="absolute -left-16 top-2 flex items-center">
    <motion.div
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.3)] z-10"
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
    >
      <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </motion.div>
    <motion.div
      className="h-[2px] bg-gradient-to-r from-cyan-500 to-transparent w-5"
      initial={{ width: 0 }}
      animate={isInView ? { width: 20 } : { width: 0 }}
      transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
    />
  </div>
);
const ResponsibilityItem = ({
  responsibility,
  index,
  isVisible,
}: {
  responsibility: string;
  index: number;
  isVisible: boolean;
}) => (
  <motion.li
    className="text-zinc-300 text-sm flex items-start gap-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{
      duration: 0.2,
      delay: isVisible ? index * 0.1 : 0,
      exit: { delay: 0 },
    }}
  >
    <span className="text-cyan-500 mt-1">▹</span>
    <span>{responsibility}</span>
  </motion.li>
);

const ExperienceCard = ({
  experience,
  index,
  isInView,
  isExpanded,
  onToggle,
}: {
  experience: {
    position: string;
    company: string;
    duration: string;
    description: string;
    responsibilities: string[];
  };
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
  >
    <TimelineNode isInView={isInView} index={index} />

    <motion.div
      className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 relative overflow-hidden group hover:border-cyan-900/50 transition-colors duration-300"
      whileHover={{
        boxShadow: "0 10px 25px -10px rgba(34, 211, 238, 0.15)",
      }}
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>

      <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></div>
            <h4 className="text-xl font-bold text-white">
              {experience.position}
            </h4>
          </div>
          <p className="text-cyan-400 mt-1.5 pl-3.5">{experience.company}</p>
        </div>

        <div className="px-3 py-1 bg-zinc-800/90 rounded-md border border-zinc-700/50 flex items-center">
          <span className="text-cyan-300 text-sm mr-2">[</span>
          <p className="text-cyan-300 text-sm">{experience.duration}</p>
          <span className="text-cyan-300 text-sm ml-2">]</span>
        </div>
      </div>
      <div className="relative pl-3 border-l border-zinc-700/50">
        <p className="text-zinc-300 text-sm">{experience.description}</p>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-4 pl-3 border-l border-cyan-700/50"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-cyan-400 text-sm font-semibold mb-2">
              Responsibilities:
            </h5>
            <ul className="space-y-1.5">
              {experience.responsibilities.map((resp, respIndex) => (
                <ResponsibilityItem
                  key={respIndex}
                  responsibility={resp}
                  index={respIndex}
                  isVisible={isExpanded}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={onToggle}
        className="mt-4 px-3 py-1 text-xs rounded-md border border-cyan-500/30 text-cyan-400 flex items-center gap-1 hover:bg-cyan-500/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isExpanded ? "Show Less" : "Show More"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.button>
      <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
    </motion.div>
  </motion.div>
);

export const ExperienceSection = ({ isInView }: { isInView: boolean }) => {
  const experience = getExperience();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const toggleResponsibilities = (index: number) => {
    setExpandedIds((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mt-16 relative">
      <BackgroundEffects />
      <HorizontalDivider isInView={isInView} />
      <SectionTitle isInView={isInView} />

      <div className="relative">
        <TimelineVerticalLine isInView={isInView} />

        <div className="space-y-12 ml-12 mt-14">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              isInView={isInView}
              isExpanded={expandedIds.includes(index)}
              onToggle={() => toggleResponsibilities(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
