import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

// Add Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
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
      <span className="text-zinc-200">Contact</span>
      <span className="text-cyan-400 ml-2">Me</span>
      <div className="absolute left-1/2 -bottom-3 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-1/2"></div>
    </h3>
    <div className="text-center mt-6 text-xs uppercase tracking-widest text-zinc-500">
      <span>Got a project or question</span>
      <span className="mx-2 text-cyan-500">?</span>
      <span>Let’s connect.</span>
    </div>
  </motion.div>
);
export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();
  useEffect(() => {
    const gradientStyles = `
      @keyframes gradient-xy {
        0% {
          background-position: 0% 0%;
        }
        25% {
          background-position: 100% 0%;
        }
        50% {
          background-position: 100% 100%;
        }
        75% {
          background-position: 0% 100%;
        }
        100% {
          background-position: 0% 0%;
        }
      }
      .animate-gradient-xy {
        background-size: 200% 200%;
        animation: gradient-xy 15s ease infinite;
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.textContent = gradientStyles;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Separate useEffect for Calendly initialization
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Check if script still exists in the document
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsLoading(true);
      setSubmitError(null);
      const serviceID = "";
      const templateID = "";
      const publicKey = "";
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        to_email: "",
        message: data.message,
      };
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );
      console.log("Email sent successfully:", result.text);
      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitError("Failed to send email. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-dark-400 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <BackgroundEffects />

      <div className="container relative z-10">
        <SectionTitle isInView={isInView} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 relative overflow-hidden group hover:border-cyan-900/50 transition-colors duration-300"
              whileHover={{
                boxShadow: "0 10px 25px -10px rgba(34, 211, 238, 0.15)",
              }}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
              <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              <h4 className="text-xl font-bold text-white mb-6">
                Send Me a Message
              </h4>
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiCheckCircle className="text-cyan-400 text-5xl mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-zinc-400">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-zinc-300 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full px-4 py-3 bg-zinc-800/70 border ${
                        errors.name ? "border-red-500" : "border-zinc-700"
                      } rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300`}
                      placeholder="Your name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-zinc-300 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 bg-zinc-800/70 border ${
                        errors.email ? "border-red-500" : "border-zinc-700"
                      } rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300`}
                      placeholder="your.email@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-zinc-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 bg-zinc-800/70 border ${
                        errors.message ? "border-red-500" : "border-zinc-700"
                      } rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-colors duration-300 resize-none`}
                      placeholder="Your message"
                      {...register("message", {
                        required: "Message is required",
                      })}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm mb-4">{submitError}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-10"
          >
            <h4 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h4>

            <div className="space-y-10">
              <p className="text-zinc-300">
                Feel free to reach out to me for collaboration, job
                opportunities, or just to say hello! I'm always open to
                discussing new projects and creative ideas.
              </p>

              <AnimatePresence mode="wait">
                {!showCalendar ? (
                  <motion.div
                    className="space-y-6"
                    key="contact-options"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href="mailto:monir@example.com"
                      className="flex items-center group bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 relative overflow-hidden hover:border-cyan-900/50 transition-colors duration-300"
                      whileHover={{
                        x: 5,
                        boxShadow: "0 5px 15px -5px rgba(34, 211, 238, 0.15)",
                      }}
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
                      <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/20">
                        <FiMail className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-zinc-400 text-sm">Email</p>
                        <p className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                          monir@example.com
                        </p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/monir-cse-1810/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center group bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 relative overflow-hidden hover:border-cyan-900/50 transition-colors duration-300"
                      whileHover={{
                        x: 5,
                        boxShadow: "0 5px 15px -5px rgba(34, 211, 238, 0.15)",
                      }}
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
                      <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                        <FiLinkedin className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="text-zinc-400 text-sm">LinkedIn</p>
                        <p className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                          linkedin.com/in/monir-cse-1810
                        </p>
                      </div>
                    </motion.a>

                    <motion.button
                      onClick={() => setShowCalendar(true)}
                      className="w-full flex items-center group bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 relative overflow-hidden hover:border-cyan-900/50 transition-colors duration-300"
                      whileHover={{
                        x: 5,
                        boxShadow: "0 5px 15px -5px rgba(34, 211, 238, 0.15)",
                      }}
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
                      <motion.div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none"></motion.div>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/20">
                        <FiCalendar className="text-white text-xl" />
                      </div>
                      <div className="text-left">
                        <p className="text-zinc-400 text-sm">
                          Schedule a Meeting
                        </p>
                        <p className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                          Book a 30-minute call
                        </p>
                      </div>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="calendar"
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 flex justify-between items-center border-b border-zinc-800">
                      <h5 className="text-white font-semibold flex items-center">
                        <FiCalendar className="mr-2 text-cyan-400" />
                        Schedule a 30-Minute Meeting
                      </h5>
                      <button
                        onClick={() => setShowCalendar(false)}
                        className="flex items-center text-zinc-400 hover:text-cyan-400 transition-colors p-2"
                      >
                        <FiArrowLeft className="mr-1" />
                        Back
                      </button>
                    </div>
                    <div className="h-[600px]">
                      <iframe
                        src="https://calendly.com/monir_/30min?embed=true&text_color=ffffff&primary_color=22d3ee"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Schedule a meeting"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
