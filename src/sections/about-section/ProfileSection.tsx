import { motion } from "framer-motion";
export const ProfileSection = ({ isInView }: { isInView: boolean }) => {
  return (
    <>
      <motion.h2
        className="section-heading text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div
          className="col-span-1 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden border-4 border-cyan-400/30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent z-10" />
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/300x300"
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
              I am a seasoned full-stack JavaScript developer specializing in a
              wide range of cutting-edge technologies, including React.js,
              Node.js, Express.js, NEXT.js, Angular, ASP.NET, TypeScript,
              Firebase, REST APIs, WebSockets, React Native, MongoDB, and MySQL.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              My expertise extends to cloud technologies, with hands-on
              experience in AWS (EC2, AWS Lambda, Amazon API Gateway, Amazon S3,
              Amazon Cognito), AWS Amplify, Amazon Route 53, and Azure's App
              Service.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              I have a proven track record of designing and developing diverse
              projects, from sophisticated web applications to polished mobile
              apps. My strong coding skills enable me to quickly conceptualize
              and validate user experiences, and I am dedicated to delivering
              pixel-perfect, high-performance products that excel on the
              internet.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
