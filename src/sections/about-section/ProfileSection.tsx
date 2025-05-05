import { motion } from "framer-motion";
import PROFILE_PIC from "../../assets/images/profile_pic.jpg";
export const ProfileSection = ({ isInView }: { isInView: boolean }) => {
  return (
    <>
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
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
          <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
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
    </>
  );
};
