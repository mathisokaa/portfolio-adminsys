import { motion } from 'framer-motion';
import { ArrowRight, Server, Shield, Database, Network, Monitor, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import Card from '../common/Card';
import Button from '../common/Button';
import SectionDivider from '../common/SectionDivider';
import ProgressBar from '../common/ProgressBar';

const Home = () => {
  const skills = [
    { name: 'Network Infrastructure', percentage: 95 },
    { name: 'Linux Administration', percentage: 90 },
    { name: 'Windows Server', percentage: 85 },
    { name: 'Cloud Services (AWS, Azure)', percentage: 80 },
    { name: 'Cybersecurity', percentage: 88 },
    { name: 'Virtualization', percentage: 92 },
    { name: 'Automation & Scripting', percentage: 75 },
    { name: 'Disaster Recovery', percentage: 85 }
  ];

  const services = [
    {
      icon: <Server className="w-10 h-10 text-blue-600" />,
      title: 'Server Management',
      description: 'Expert management of Windows and Linux servers, ensuring optimal performance and reliability.'
    },
    {
      icon: <Network className="w-10 h-10 text-blue-600" />,
      title: 'Network Infrastructure',
      description: 'Design, implementation, and maintenance of robust network infrastructures.'
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: 'Security Solutions',
      description: 'Comprehensive security solutions to protect your systems and data from threats.'
    },
    {
      icon: <Database className="w-10 h-10 text-blue-600" />,
      title: 'Data Management',
      description: 'Efficient data management solutions, including backup, recovery, and storage optimization.'
    },
    {
      icon: <Monitor className="w-10 h-10 text-blue-600" />,
      title: 'System Monitoring',
      description: 'Proactive monitoring of systems to prevent issues before they impact your business.'
    },
    {
      icon: <Cpu className="w-10 h-10 text-blue-600" />,
      title: 'Virtualization',
      description: 'Implementation of virtualization solutions to maximize hardware efficiency and flexibility.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.div 
        className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              System & Network <span className="text-blue-400">Administration</span> Expert
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-slate-200"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Building robust, secure, and scalable infrastructure solutions for modern enterprises.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/projects">
                <Button size="lg" variant="primary">View My Projects</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "loop" }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <Section id="about" className="bg-slate-50 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              With over 8 years of experience in system and network administration, I specialize in designing, implementing, and maintaining robust IT infrastructure solutions for businesses of all sizes.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              My expertise spans across Windows and Linux environments, virtualization technologies, network security, cloud services, and automation. I'm passionate about implementing efficient systems that enhance business operations while ensuring maximum security and reliability.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              I believe in staying ahead of the technology curve, continuously learning and adapting to new tools and methodologies to provide the best solutions for modern business challenges.
            </p>
            <Link to="/contact">
              <Button variant="primary" icon={<ArrowRight size={16} />}>
                Get in Touch
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <ProgressBar
                  key={skill.name}
                  label={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
      
      <SectionDivider />
      
      {/* Services Section */}
      <Section 
        title="Services" 
        subtitle="Comprehensive system and network solutions to optimize your business infrastructure"
        className="bg-white dark:bg-slate-800"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      <SectionDivider />
      
      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to optimize your IT infrastructure?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how my system and network administration expertise can help your business thrive in today's digital landscape.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-100">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default Home;