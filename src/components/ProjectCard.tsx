import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description?: string;
  image: string;
  technologies: string[];
  link: string;
  index: number;
}
const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  technologies,
  link,
}: {
  isOpen: boolean;
  onClose: () => void;
} & Omit<ProjectCardProps, "index">) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-[90%] max-h-[85vh]">
        <div className="absolute -inset-[1px] rounded-lg overflow-hidden z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-lg z-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
        </div>
        <motion.div
          className="relative bg-zinc-900 rounded-lg overflow-hidden z-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "85vh" }}
        >
          <button
            className="absolute top-4 right-4 z-30 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/70 p-2 rounded-full backdrop-blur-sm border border-zinc-700/50 hover:border-cyan-500/50 transition-all duration-300"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="max-h-[85vh] overflow-auto">
            <div className="relative w-full h-60 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center opacity-70"
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2322d3ee' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: "180px 180px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white mb-2 relative inline-block">
                  {title}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                </h2>
                <div className="flex items-center space-x-3">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Visit Project</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm uppercase text-zinc-400 mb-3 relative inline-block">
                  Technologies
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-zinc-800/90 text-zinc-300 px-3 py-1 rounded-md border-l-2 border-cyan-500 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm uppercase text-zinc-400 mb-3 relative inline-block">
                  About this project
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                </h3>
                <p className="text-zinc-300">
                  {description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
const ProjectCard = ({
  title,
  description = "",
  image,
  technologies,
  link,
  index,
}: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <motion.div
        className="portfolio-card relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover="hover"
      >
        <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-700 animate-pulse z-0"></div>
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
        >
          <motion.div
            className="absolute left-0 w-full h-[2px] bg-cyan-400/60"
            animate={{
              top: ["0%", "100%", "0%"],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
        <div className="relative overflow-hidden group rounded-lg border border-zinc-800 hover:border-transparent transition-colors duration-500 backdrop-filter z-20">
          <div className="aspect-video w-full bg-zinc-900 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75"
              variants={{
                hover: {
                  scale: 1.15,
                  filter: "hue-rotate(15deg) contrast(110%)",
                },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-zinc-900/80 opacity-90 group-hover:opacity-90 transition-all duration-300 backdrop-blur-sm">
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2322d3ee' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: "180px 180px",
              }}
            ></div>
          </div>
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-lg"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-lg"></div>
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-3 left-3 w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              hover: { opacity: 1 },
            }}
            initial={{ opacity: 0 }}
          >
            <motion.button
              onClick={openModal}
              className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-md text-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
              variants={{
                hover: { y: -5, scale: 1.05 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>View Project</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
            variants={{
              hover: { y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold mb-3 text-white relative overflow-hidden">
              <motion.span
                className="inline-block"
                variants={{
                  hover: { color: "#8be9fd" },
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.span>
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400"
                variants={{
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </h3>
            {description && (
              <motion.p
                className="text-sm text-zinc-300 mb-4 line-clamp-3"
                variants={{
                  hover: { opacity: 1 },
                }}
                initial={{ opacity: 0.8 }}
              >
                {description}
              </motion.p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, i) => (
                <motion.div
                  key={i}
                  className="text-xs bg-zinc-800/70 text-zinc-200 px-2.5 py-1 rounded-md"
                  variants={{
                    hover: {
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      boxShadow: "0 0 6px rgba(6, 182, 212, 0.3)",
                      borderLeft: "2px solid #06b6d4",
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        description={description}
        image={image}
        technologies={technologies}
        link={link}
      />
    </>
  );
};

export default ProjectCard;
