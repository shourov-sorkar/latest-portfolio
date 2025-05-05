import React from 'react';
import { getProjects } from '../utils/dataUtils';
import { Project } from '../types/staticData';

const ProjectsSection: React.FC = () => {
  const projects = getProjects() as Project[];

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer">Live Demo</a>
              <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection; 