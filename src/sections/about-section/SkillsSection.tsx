import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getSkills } from "../../utils/dataUtils";
import { SkillCategory } from "../../types/staticData";

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
    prevTabRef.current = activeTab;
    setActiveTab(tab);
  };
  const contentVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <div className="mt-16 w-full">
      <motion.h3
        className="text-2xl font-semibold text-cyan-400 mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Technical Skills
      </motion.h3>
      <motion.div
        className="w-full mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="w-full grid grid-cols-4 p-1 bg-gray-800 rounded-lg relative overflow-hidden">
          <motion.div
            className="absolute top-1 bottom-1 rounded-md bg-cyan-600 z-0"
            layoutId="activeTabBackground"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              width: `calc(100% / ${categories.length})`,
              left: `calc((100% / ${categories.length}) * ${categories.indexOf(
                activeTab
              )})`,
            }}
          />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              className="text-center py-2 z-10 relative"
            >
              <motion.span
                className={`px-2 py-1 text-sm font-medium ${
                  activeTab === category
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
                animate={
                  activeTab === category
                    ? { scale: 1.05, y: 0 }
                    : { scale: 1, y: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {category}
              </motion.span>
            </button>
          ))}
        </div>
      </motion.div>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "300px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.05 },
            }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 absolute"
          >
            {activeSkills.map((skill, index: number) => {
              const skillName = typeof skill === "string" ? skill : skill.name;
              const percentage =
                typeof skill === "string" ? 70 : skill.percentage;
              return (
                <motion.div
                  key={`${activeTab}-${skillName}`}
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: index * 0.01,
                  }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{skillName}</span>
                    <CountUp value={percentage} delay={index * 0.05} />
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.05 ,
                      }}
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
      duration: 1,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return animation.stop;
  }, [count, value, delay]);

  return <span className="text-cyan-400">{displayValue}%</span>;
};
