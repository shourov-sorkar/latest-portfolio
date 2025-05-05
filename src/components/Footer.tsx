import { FiLinkedin, FiMail, FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-black relative overflow-hidden">
      {/* Grid background for futuristic effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 glow-text">MONIR</h3>
            <p className="text-zinc-400 mt-2">Full-Stack JavaScript Developer</p>
          </motion.div>

          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 hover:border-cyan-400 transition-colors duration-300"
            >
              <FiGithub className="text-cyan-400" />
            </a>
            <a 
              href="https://www.linkedin.com/in/monir-cse-1810/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 hover:border-cyan-400 transition-colors duration-300"
            >
              <FiLinkedin className="text-cyan-400" />
            </a>
            <a 
              href="mailto:monir@example.com" 
              className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 hover:border-cyan-400 transition-colors duration-300"
            >
              <FiMail className="text-cyan-400" />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} monir. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 