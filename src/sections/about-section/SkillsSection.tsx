import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getSkills } from "../../utils/dataUtils";
import { SkillCategory } from "../../types/staticData";

const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
  </div>
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
      <span className="text-zinc-200">Technical</span>
      <span className="text-cyan-400 ml-2">Skills</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>

    <div className="text-center mt-6 text-xs uppercase tracking-widest text-zinc-500">
      <span>Expertise</span>
      <span className="mx-2 text-cyan-500">//</span>
      <span>Proficiency</span>
    </div>
  </motion.div>
);

export const SkillsSection = ({ isInView }: { isInView: boolean }) => {
  const allSkills = getSkills() as SkillCategory[];
  const categories = allSkills.map((cat) => cat.category);
  const [activeTab, setActiveTab] = useState<string>(
    categories[0] || "Languages & Frameworks"
  );
  const prevTabRef = useRef(activeTab);
  const activeSkillCategory = allSkills.find(
    (category) => category.category === activeTab
  );
  const activeSkills = activeSkillCategory?.items || [];
  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) {
      prevTabRef.current = activeTab;
      setActiveTab(tab);
    }
  };
  
  const getDirection = () => {
    const currentIndex = categories.indexOf(activeTab);
    const prevIndex = categories.indexOf(prevTabRef.current);
    return currentIndex > prevIndex ? 1 : -1;
  };

  return (
    <div className="mt-16 w-full relative">
      <BackgroundEffects />
      <SectionTitle isInView={isInView} />
      <motion.div
        className="w-full mb-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="w-full grid grid-cols-4 p-1 bg-zinc-900/70 backdrop-blur-sm rounded-lg relative overflow-hidden border border-zinc-800">
          <motion.div
            className="absolute top-1 bottom-1 rounded-md bg-gradient-to-r from-cyan-600/90 via-blue-500/80 to-cyan-500/90 z-0 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            layoutId="activeTabBackground"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.2
            }}
            style={{
              width: `${100 / categories.length}%`,
              left: `${(100 / categories.length) * categories.indexOf(activeTab)}%`,
            }}
          />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              className="text-center py-2 z-10 relative focus:outline-none"
            >
              <motion.span
                className="px-2 py-1 text-sm font-medium relative"
                initial={{ color: "#d1d5db" }}
                animate={{ 
                  color: activeTab === category ? "#ffffff" : "#d1d5db",
                  scale: activeTab === category ? 1.1 : 1
                }}
                whileHover={{ y: -2 }}
                transition={{ 
                  color: { duration: 0.2 },
                  scale: { type: "spring", stiffness: 500, damping: 25, duration: 0.15 } 
                }}
              >
                {category}
              </motion.span>
            </button>
          ))}
          
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        </div>
      </motion.div>
      
      <div className="relative w-full overflow-visible" style={{ minHeight: "450px" }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 200 * getDirection(), opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200 * getDirection(), opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 400, damping: 30, duration: 0.15 },
              opacity: { duration: 0.1 }
            }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative pb-10"
          >
            {activeSkills.map((skill, index: number) => {
              const skillName = typeof skill === "string" ? skill : skill.name;
              const percentage =
                typeof skill === "string" ? 70 : skill.percentage;
              return (
                <motion.div
                  key={`${activeTab}-${skillName}`}
                  className="w-full"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.4 },
                    y: { type: "spring", stiffness: 300, damping: 25 },
                    delay: 0.1 + index * 0.08,
                  }}
                >
                  <div className="bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg border border-zinc-800 relative overflow-hidden group hover:border-cyan-900/50 transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
                    
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></div>
                        <span className="text-white">{skillName}</span>
                      </div>
                      <CountUp value={percentage} delay={0.1 + index * 0.08} />
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 + index * 0.08,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    <motion.div 
                      className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const CountUp = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const animation = animate(count, value, {
      duration: 0.6,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return animation.stop;
  }, [count, value, delay]);
  return <span className="text-cyan-400 font-medium">{displayValue}%</span>;
};
