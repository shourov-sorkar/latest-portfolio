import { motion } from "framer-motion";
import PROFILE_PIC from "../../assets/images/profile_pic.jpg";

const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
    <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
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
      <span className="text-zinc-200">About</span>
      <span className="text-cyan-400 ml-2">Me</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>
  </motion.div>
);

export const ProfileSection = ({ isInView }: { isInView: boolean }) => {
  return (
    <div className="relative">
      <BackgroundEffects />
      <SectionTitle isInView={isInView} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-5">
        <motion.div
          className="col-span-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden animate-neon-pulse shadow-[0_0_15px_5px_rgba(34,211,238,0.6),0_0_30px_10px_rgba(34,211,238,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent z-10" />
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <img
                src={PROFILE_PIC}
                alt="monir"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 relative overflow-hidden group hover:border-cyan-900/50 transition-colors duration-300">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
            <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <p className="text-zinc-300 leading-relaxed mb-6">
              I'm deeply enthusiastic about building things that matter. Creating scalable, user-focused web and mobile applications isn't just my job—it's something I genuinely enjoy. With a solid background in JavaScript and TypeScript, I work across the stack using technologies like React.js, NEXT.js, Angular, Node.js, Express.js, and ASP.NET. I take pride in crafting clean, maintainable code that powers real-world products.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              For mobile development, I turn to React Native to build high-quality, cross-platform applications that feel native and perform smoothly.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              From integrating REST APIs and WebSockets to managing data with PostgreSQL, MongoDB, and MySQL, I focus on performance and reliability. I'm also experienced in deploying secure, cloud-native solutions on AWS and Azure App Service.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              I care deeply about good architecture, developer experience, and delivering features that truly make an impact. Whether it's building from scratch or scaling existing systems, I aim to create solutions that are both efficient and elegant.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
