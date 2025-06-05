import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../common/Section';
import Card from '../common/Card';
import Button from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  date: string;
  link?: string;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const { t } = useLanguage();
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Network Overhaul',
      description: 'Complete redesign and implementation of network infrastructure for a 500+ employee company, including routing, switching, and security enhancements.',
      image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
      category: ['networking', 'security'],
      date: 'June 2023'
    },
    {
      id: 2,
      title: 'Cloud Migration Project',
      description: 'Migration of on-premises infrastructure to AWS, including server virtualization, storage solutions, and implementing a hybrid cloud architecture.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      category: ['cloud', 'virtualization'],
      date: 'March 2023'
    },
    {
      id: 3,
      title: 'Automated Backup System',
      description: 'Development of an automated backup and disaster recovery system using scripts and cloud storage, ensuring business continuity and data protection.',
      image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg',
      category: ['automation', 'security'],
      date: 'November 2022'
    },
    {
      id: 4,
      title: 'Security Infrastructure Enhancement',
      description: 'Implementation of comprehensive security measures including firewall configuration, intrusion detection systems, and employee security training.',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      category: ['security'],
      date: 'August 2022'
    },
    {
      id: 5,
      title: 'Virtualization Infrastructure',
      description: 'Design and deployment of VMware virtualization environment, resulting in 40% reduction in hardware costs and improved resource utilization.',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
      category: ['virtualization', 'optimization'],
      date: 'May 2022'
    },
    {
      id: 6,
      title: 'Server Monitoring System',
      description: 'Implementation of comprehensive monitoring solution using open-source tools to provide real-time insights into server performance and health.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      category: ['monitoring', 'automation'],
      date: 'February 2022'
    }
  ];
  
  const categories = [
    { id: 'all', name: t('projects.allProjects') },
    { id: 'networking', name: t('category.networking') },
    { id: 'security', name: t('category.security') },
    { id: 'cloud', name: t('category.cloud') },
    { id: 'virtualization', name: t('category.virtualization') },
    { id: 'automation', name: t('category.automation') },
    { id: 'monitoring', name: t('category.monitoring') },
    { id: 'optimization', name: t('category.optimization') }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(filter));
  
  return (
    <>
      <Section
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        className="pt-32 bg-slate-50 dark:bg-slate-900"
      >
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <Card className="h-full flex flex-col">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">{project.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.category.slice(0, 2).map((cat) => (
                        <div 
                          key={`${project.id}-${cat}`}
                          className="flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {t(`category.${cat}`)}
                        </div>
                      ))}
                      {project.category.length > 2 && (
                        <div className="text-xs bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                          +{project.category.length - 2} more
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/projects/${project.id}`} className="flex-grow">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="w-full justify-center"
                        >
                          {t('projects.viewDetails')}
                        </Button>
                      </Link>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl text-slate-600 dark:text-slate-300">{t('projects.noProjects')}</h3>
            <Button 
              variant="primary"
              onClick={() => {
                setFilter('all');
              }}
              className="mt-4"
            >
              {t('projects.resetFilters')}
            </Button>
          </div>
        )}
      </Section>
    </>
  );
};

export default Projects;