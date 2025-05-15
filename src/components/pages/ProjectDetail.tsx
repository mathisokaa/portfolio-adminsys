import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, FileText, Link as LinkIcon, Download } from 'lucide-react';
import Section from '../common/Section';
import Button from '../common/Button';
import Card from '../common/Card';

interface ProjectDoc {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'procedure' | 'documentation';
  pdfUrl: string; // Added PDF URL field
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  date: string;
  documentation?: ProjectDoc[];
  technicalDetails?: string;
  challenges?: string[];
  solutions?: string[];
  tools?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Enterprise Network Overhaul',
    description: 'Complete redesign and implementation of network infrastructure for a 500+ employee company.',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    category: ['networking', 'security'],
    date: 'June 2023',
    documentation: [
      {
        id: 'net-proc-1',
        title: 'Network Segmentation Implementation',
        content: `# Network Segmentation Procedure

1. Initial Assessment
   - Document current network topology
   - Identify critical systems and data flows
   - Map security requirements

2. Planning Phase
   - Design new network segments
   - Define access control lists
   - Plan implementation schedule

3. Implementation Steps
   - Configure VLANs on core switches
   - Update firewall rules
   - Implement access controls
   - Test connectivity

4. Verification
   - Validate segmentation
   - Test inter-segment communication
   - Verify security policies`,
        date: '2023-06-15',
        type: 'procedure',
        pdfUrl: '/procedures/network-segmentation.pdf'
      },
      {
        id: 'net-doc-1',
        title: 'Network Architecture Documentation',
        content: `# Network Architecture Overview

## Core Infrastructure
- Cisco Catalyst 9300 Core Switches
- Palo Alto PA-5250 Firewalls
- Cisco ISR 4451 Routers

## Network Segments
1. User Access Network (10.1.0.0/16)
2. Server Farm (10.2.0.0/16)
3. DMZ (172.16.0.0/16)
4. Management Network (10.0.0.0/16)

## Security Measures
- 802.1X Authentication
- NAC Implementation
- IDS/IPS Deployment`,
        date: '2023-06-20',
        type: 'documentation',
        pdfUrl: '/documentation/network-architecture.pdf'
      }
    ],
    technicalDetails: 'Implementation of Cisco SD-WAN solution with redundant links and automated failover.',
    challenges: [
      'Legacy system integration',
      'Minimal downtime requirement',
      'Complex security requirements'
    ],
    solutions: [
      'Phased migration approach',
      'Parallel network deployment',
      'Automated testing procedures'
    ],
    tools: [
      'Cisco DNA Center',
      'Palo Alto Panorama',
      'SolarWinds NPM',
      'Ansible for automation'
    ]
  }
  // Add more projects as needed
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id || '0'));

  if (!project) {
    return (
      <Section className="pt-32 bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Project Not Found</h2>
          <Link to="/projects">
            <Button variant="primary">Back to Projects</Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-32 bg-slate-50 dark:bg-slate-900">
      <Link to="/projects">
        <Button variant="outline" size="sm" className="mb-6" icon={<ArrowLeft size={16} />}>
          Back to Projects
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          <div 
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
          
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-2" />
                <span className="text-slate-600 dark:text-slate-300">{project.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.category.map((cat) => (
                  <span 
                    key={cat}
                    className="flex items-center text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">{project.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">{project.description}</p>

            {project.technicalDetails && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Technical Overview</h2>
                <p className="text-slate-600 dark:text-slate-300">{project.technicalDetails}</p>
              </div>
            )}

            {project.tools && project.tools.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Tools & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.challenges || project.solutions) && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {project.challenges && (
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Challenges</h2>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.solutions && (
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">Solutions</h2>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {project.documentation && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Documentation & Procedures</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.documentation.map((doc) => (
                    <Card key={doc.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{doc.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{doc.date}</p>
                          </div>
                        </div>
                        <a 
                          href={doc.pdfUrl}
                          download
                          className="flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          title={`Download ${doc.type === 'procedure' ? 'Procedure' : 'Documentation'} PDF`}
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </div>
                      <div className="prose dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          {doc.content}
                        </pre>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {project.link && (
              <div className="mt-8">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <LinkIcon className="w-5 h-5 mr-2" />
                  View Project Resources
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default ProjectDetail;