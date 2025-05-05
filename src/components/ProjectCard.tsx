import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description?: string;
  image: string;
  technologies: string[];
  link: string;
  index: number;
}

const ProjectCard = ({ title, description = "", image, technologies, link, index }: ProjectCardProps) => {
  return (
    <motion.div 
      className="portfolio-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative overflow-hidden group">
        <div className="aspect-video w-full bg-zinc-800 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300"
          whileHover={{ y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-cyan-400">{title}</h3>
          {description && <p className="text-sm text-zinc-300 mb-4 line-clamp-3">{description}</p>}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, i) => (
              <span key={i} className="text-xs bg-zinc-800/80 text-cyan-300 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-4 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-lg text-sm transition-colors duration-300 hover:bg-cyan-500/40"
          >
            View Project
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 