import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
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
      <span className="text-zinc-200">My</span>
      <span className="text-cyan-400 ml-2">Portfolio</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>

    <div className="text-center mt-6 text-xs uppercase tracking-widest text-zinc-500">
      <span>Projects</span>
      <span className="mx-2 text-cyan-500">//</span>
      <span>Showcase</span>
    </div>
  </motion.div>
);
export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const projects = [
    {
      title: 'Modern E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, cart functionality, payment processing, and order tracking.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=3908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      link: '#'
    },
    {
      title: 'Real-time Chat Application',
      description: 'A real-time messaging application with private and group chat capabilities. Built with React, Socket.io, and Express with a focus on performance and security.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=3908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
      link: '#'
    },
    {
      title: 'Task Management Dashboard',
      description: 'A comprehensive project management tool with task tracking, team collaboration, and analytics. Features drag-and-drop interfaces and real-time updates.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=3908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material UI', 'Chart.js'],
      link: '#'
    },
    {
      title: 'Mobile Fitness Application',
      description: 'A cross-platform mobile app for fitness tracking, workout plans, and nutrition management. Includes social sharing and achievement features.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=3908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['React Native', 'Redux', 'Firebase', 'Health API', 'Node.js'],
      link: '#'
    }
  ];

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark-400 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      <BackgroundEffects />
      <div className="container relative z-10">
        <SectionTitle isInView={isInView} />
        <motion.p 
          className="text-center text-zinc-400 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of my recent projects showcasing my skills and expertise in
          full-stack development.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              title={project.title}
              image={project.image}
              technologies={project.technologies}
              link={project.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

