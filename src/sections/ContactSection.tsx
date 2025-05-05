import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section 
      id="contact" 
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

      {/* Background glow effect */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]" />

      <div className="container relative z-10">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-800"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
            
            {isSubmitted ? (
              <motion.div 
                className="flex flex-col items-center justify-center text-center p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheckCircle className="text-cyan-400 text-5xl mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-zinc-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-zinc-300 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-700'} rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300`}
                    placeholder="Your name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-zinc-300 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300`}
                    placeholder="your.email@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-zinc-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${errors.message ? 'border-red-500' : 'border-zinc-700'} rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300 resize-none`}
                    placeholder="Your message"
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center transition-all duration-300 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>Send Message</span>
                      <FiSend className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </button>
              </form>
            )}
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-10">
              <p className="text-zinc-300 mb-8">
                Feel free to reach out to me for collaboration, job opportunities, or just to say hello!
                I'm always open to discussing new projects and creative ideas.
              </p>
              
              <div className="space-y-6">
                <motion.a
                  href="mailto:monir@example.com"
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mr-4 border border-zinc-700 group-hover:border-cyan-400 transition-colors duration-300">
                    <FiMail className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Email</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors duration-300">monir@example.com</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/monir-cse-1810/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mr-4 border border-zinc-700 group-hover:border-cyan-400 transition-colors duration-300">
                    <FiLinkedin className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">LinkedIn</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors duration-300">linkedin.com/in/monir-cse-1810</p>
                  </div>
                </motion.a>
              </div>
              
              <div className="mt-12 bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
                <h4 className="text-xl font-semibold text-white mb-4">Working Hours</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Monday - Friday:</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Saturday:</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Sunday:</span>
                    <span className="text-white">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 