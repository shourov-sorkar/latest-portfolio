import { motion, AnimatePresence } from "framer-motion";
import { getEducation } from "../../utils/dataUtils";
import { useState } from "react";

const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
  </div>
);

const SectionTitle = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="mb-8 relative"
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
      <span className="text-zinc-200">Education</span>
      <span className="text-cyan-400 ml-2">Path</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>
    <div className="text-center mt-6 text-xs uppercase tracking-widest text-zinc-500">
      <span>Knowledge</span>
      <span className="mx-2 text-cyan-500">&</span>
      <span>Qualifications</span>
    </div>
  </motion.div>
);

const DescriptionItem = ({
  item,
  index,
  isVisible
}: {
  item: string;
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
    <span>{item}</span>
  </motion.li>
);

export const EducationSection = ({ isInView }: { isInView: boolean }) => {
  const education = getEducation();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  
  const toggleDescription = (index: number) => {
    setExpandedIds(prevIds => 
      prevIds.includes(index) 
        ? prevIds.filter(id => id !== index) 
        : [...prevIds, index]
    );
  };

  return (
    <div className="mt-16 relative">
      <BackgroundEffects />
      <SectionTitle isInView={isInView} />

      <div className="space-y-6 relative">
        {education.map((edu, index: number) => {
          const isExpanded = expandedIds.includes(index);
          
          return (
          <motion.div
            key={index}
            className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 group hover:border-cyan-900/50 transition-colors duration-300 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
            <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            
            <h4 className="text-xl font-semibold text-white">
              {edu.institution}
            </h4>
            <p className="text-cyan-400 mt-2">{edu.degree}</p>
            <div className="flex items-center mt-3">
              <div className="h-[1px] w-4 bg-cyan-500/30"></div>
              <p className="text-zinc-400 text-sm mx-2 italic">{edu.year}</p>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
            </div>
            
            <AnimatePresence>
              {isExpanded && edu.description && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pl-3 border-l border-cyan-700/50"
                >
                  <h5 className="text-cyan-400 text-sm font-semibold mb-2">
                    Details:
                  </h5>
                  <ul className="space-y-1.5">
                    {Array.isArray(edu.description) 
                      ? edu.description.map((item, itemIndex) => (
                          <DescriptionItem
                            key={itemIndex}
                            item={item}
                            index={itemIndex}
                            isVisible={isExpanded}
                          />
                        ))
                      : (
                        <DescriptionItem
                          item={edu.description}
                          index={0}
                          isVisible={isExpanded}
                        />
                      )
                    }
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            {edu.description && (
              <motion.button
                onClick={() => toggleDescription(index)}
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
                  className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.button>
            )}
          </motion.div>
        )})}
      </div>
    </div>
  );
};
