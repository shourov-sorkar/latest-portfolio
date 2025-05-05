import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Dummy project data
  const projects = [
    {
      title: 'Modern E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product management, cart functionality, payment processing, and order tracking.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      link: '#'
    },
    {
      title: 'Real-time Chat Application',
      description: 'A real-time messaging application with private and group chat capabilities. Built with React, Socket.io, and Express with a focus on performance and security.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
      link: '#'
    },
    {
      title: 'Task Management Dashboard',
      description: 'A comprehensive project management tool with task tracking, team collaboration, and analytics. Features drag-and-drop interfaces and real-time updates.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material UI', 'Chart.js'],
      link: '#'
    },
    {
      title: 'Mobile Fitness Application',
      description: 'A cross-platform mobile app for fitness tracking, workout plans, and nutrition management. Includes social sharing and achievement features.',
      image: 'https://via.placeholder.com/600x400',
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
      {/* Grid background for futuristic effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          My Portfolio
        </motion.h2>

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
              description={project.description}
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

export default PortfolioSection; 