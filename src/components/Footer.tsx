import { FiLinkedin, FiMail, FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const generateBinary = () => {
    return Array(20)
      .fill(0)
      .map(() => Math.round(Math.random()))
      .join("");
  };
  const circuitNodes = [
    { x: "10%", y: "20%" },
    { x: "30%", y: "50%" },
    { x: "70%", y: "30%" },
    { x: "85%", y: "60%" },
    { x: "50%", y: "80%" },
    { x: "20%", y: "70%" },
  ];
  return (
    <footer className="py-5 bg-black w-full relative overflow-hidden border-t border-cyan-500/30">
      <motion.div
        className="absolute inset-0 opacity-20 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 10%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 90%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div className="absolute inset-0 z-0 opacity-10">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute text-[10px] font-mono text-cyan-500 whitespace-nowrap"
              style={{
                left: `${i * 15}%`,
                top: 0,
                writingMode: "vertical-rl",
              }}
              initial={{ y: -100 }}
              animate={{ y: "100vh" }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              {generateBinary()}
            </motion.div>
          ))}
      </div>
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {circuitNodes.slice(0, 4).map((node, i) => (
          <div
            key={`node-${i}`}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34, 211, 238, 0.8)",
                  "0 0 10px rgba(34, 211, 238, 0.8)",
                  "0 0 0px rgba(34, 211, 238, 0.8)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
            />
            <motion.div
              className="absolute top-0.5 left-0.5 w-[70px] h-[1px] bg-gradient-to-r from-cyan-400 to-transparent"
              style={{
                transformOrigin: "0 0",
                rotate: `${(i * 60) % 360}deg`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
              }}
            />
          </div>
        ))}
      </div>
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/5 filter blur-[80px]"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
        style={{ height: "200%", top: "-50%" }}
        animate={{ y: ["0%", "50%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="w-full px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <motion.div className="relative">
              <motion.h3
                className="text-2xl font-bold text-cyan-400 mr-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                MONIR
              </motion.h3>
              <motion.div
                className="absolute -inset-1 rounded-lg opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                  boxShadow: [
                    "0 0 0px rgba(34, 211, 238, 0)",
                    "0 0 10px rgba(34, 211, 238, 0.5)",
                    "0 0 0px rgba(34, 211, 238, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.div>
            <div className="relative hidden sm:block h-6 mx-3">
              <div className="absolute inset-0 w-px h-full bg-cyan-400/20" />
              <motion.div
                className="absolute inset-0 w-px h-full bg-cyan-400"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
            <p className="text-zinc-400 text-sm italic tracking-wider">
              Sr. Software Engineer
            </p>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <p className="hidden md:flex items-center mr-6 text-zinc-500 text-xs">
              <motion.span
                className="inline-block h-1 w-1 rounded-full bg-cyan-400 mr-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>&copy; {currentYear}</span>
            </p>
            <div className="flex space-x-3">
              {[
                {
                  icon: <FiGithub className="text-cyan-400 w-4 h-4" />,
                  href: "https://github.com",
                },
                {
                  icon: <FiLinkedin className="text-cyan-400 w-4 h-4" />,
                  href: "https://www.linkedin.com/in/monir-cse-1810/",
                },
                {
                  icon: <FiMail className="text-cyan-400 w-4 h-4" />,
                  href: "mailto:monir@example.com",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-zinc-900/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-800 hover:border-cyan-400 transition-colors duration-300 group relative"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)",
                  }}
                >
                  {item.icon}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] flex justify-between overflow-hidden">
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <motion.div
                key={`data-line-${i}`}
                className="h-full w-[20px] bg-cyan-400/30"
                initial={{ x: -20 }}
                animate={{ x: "100vw" }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
                style={{ left: `${i * 5}%` }}
              />
            ))}
        </div>
      </div>
    </footer>
  );
};
