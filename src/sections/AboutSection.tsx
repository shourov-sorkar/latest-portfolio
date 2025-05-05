import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Skills array
  const skills = [
    'React.js', 'Node.js', 'Express.js', 'NEXT.js', 'Angular', 
    'ASP.NET', 'TypeScript', 'Firebase', 'REST APIs', 'WebSockets', 
    'React Native', 'MongoDB', 'MySQL', 'AWS', 'Azure', 'AWS Amplify'
  ];

  // Education data
  const education = [
    {
      institution: 'University of Science and Technology',
      degree: 'Bachelor of Science, Computer Science and Engineering',
      year: '2018 - 2022'
    },
    {
      institution: 'Software Engineering Academy',
      degree: 'Advanced Certification in Full-Stack Development',
      year: '2022'
    }
  ];

  // Experience data
  const experience = [
    {
      company: 'Dummy Company',
      position: 'Senior Full-Stack Developer',
      duration: '2021 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and AWS services. Managed team of 5 developers and mentored junior engineers.'
    },
    {
      company: 'Dummy Company',
      position: 'Full-Stack Developer',
      duration: '2019 - 2021',
      description: 'Developed responsive web applications and RESTful APIs. Implemented authentication systems and database solutions using MongoDB and MySQL.'
    },
    {
      company: 'Dummy Company',
      position: 'Frontend Developer',
      duration: '2018 - 2019',
      description: 'Created interactive UI components using React and Angular. Collaborated with designers to implement pixel-perfect interfaces.'
    }
  ];

  useEffect(() => {
    const skills = skillsRef.current?.querySelectorAll('.skill-badge');
    
    if (skills && skills.length > 0) {
      gsap.to(skills, {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-dark-400 relative overflow-hidden"
    >
      {/* Grid background for futuristic effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container relative z-10">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Image */}
          <motion.div 
            className="col-span-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden border-4 border-cyan-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent z-10" />
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                {/* Placeholder profile image */}
                <img 
                  src="https://via.placeholder.com/300x300" 
                  alt="monir" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <p className="text-zinc-300 leading-relaxed mb-6">
                I am a seasoned full-stack JavaScript developer specializing in a wide range of cutting-edge technologies, including React.js, Node.js, Express.js, NEXT.js, Angular, ASP.NET, TypeScript, Firebase, REST APIs, WebSockets, React Native, MongoDB, and MySQL.
              </p>
              <p className="text-zinc-300 leading-relaxed mb-6">
                My expertise extends to cloud technologies, with hands-on experience in AWS (EC2, AWS Lambda, Amazon API Gateway, Amazon S3, Amazon Cognito), AWS Amplify, Amazon Route 53, and Azure's App Service.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                I have a proven track record of designing and developing diverse projects, from sophisticated web applications to polished mobile apps. My strong coding skills enable me to quickly conceptualize and validate user experiences, and I am dedicated to delivering pixel-perfect, high-performance products that excel on the internet.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="mt-16" ref={skillsRef}>
          <motion.h3 
            className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Technical Skills
          </motion.h3>
          
          <div className="flex flex-wrap justify-center">
            {skills.map((skill, index) => (
              <div key={index} className="skill-badge">{skill}</div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-16">
          <motion.h3 
            className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Education
          </motion.h3>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              >
                <h4 className="text-xl font-semibold text-white">{edu.institution}</h4>
                <p className="text-cyan-400">{edu.degree}</p>
                <p className="text-zinc-400 text-sm">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16">
          <motion.h3 
            className="text-2xl font-semibold text-cyan-400 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Professional Experience
          </motion.h3>
          
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div 
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{exp.position}</h4>
                    <p className="text-cyan-400">{exp.company}</p>
                  </div>
                  <p className="text-zinc-400 text-sm px-3 py-1 bg-zinc-800 rounded-full">{exp.duration}</p>
                </div>
                <p className="text-zinc-300 mt-3">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 