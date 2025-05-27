import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.techWatch': 'Veille Techno',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.title': 'Expert en Administration Système & Réseau',
    'home.subtitle': 'Construction d\'infrastructures robustes, sécurisées et évolutives pour les entreprises modernes.',
    'home.cta.projects': 'Voir mes projets',
    'home.cta.contact': 'Me contacter',
    'home.about.title': 'À propos',
    'home.about.description1': 'Avec plus de 8 ans d\'expérience en administration système et réseau, je suis spécialisé dans la conception, l\'implémentation et la maintenance de solutions d\'infrastructure IT pour entreprises de toutes tailles.',
    'home.about.description2': 'Mon expertise couvre les environnements Windows et Linux, les technologies de virtualisation, la sécurité réseau, les services cloud et l\'automatisation. Je suis passionné par la mise en place de systèmes efficaces qui améliorent les opérations tout en garantissant une sécurité et une fiabilité maximales.',
    'home.about.description3': 'Je crois en l\'importance de rester à la pointe de la technologie, en apprenant continuellement et en m\'adaptant aux nouveaux outils et méthodologies pour fournir les meilleures solutions aux défis des entreprises modernes.',
    'home.services.title': 'Services',
    'home.services.subtitle': 'Solutions complètes pour optimiser votre infrastructure',
    'home.cta.ready': 'Prêt à optimiser votre infrastructure IT ?',
    'home.cta.discuss': 'Discutons de la façon dont mon expertise peut aider votre entreprise à prospérer dans le paysage numérique actuel.',
    
    // Skills
    'skills.title': 'Compétences Techniques',
    
    // Services
    'services.serverManagement': 'Gestion de Serveurs',
    'services.serverManagementDesc': 'Gestion experte des serveurs Windows et Linux, assurant performance et fiabilité optimales.',
    'services.networkInfra': 'Infrastructure Réseau',
    'services.networkInfraDesc': 'Conception, implémentation et maintenance d\'infrastructures réseau robustes.',
    'services.security': 'Solutions de Sécurité',
    'services.securityDesc': 'Solutions de sécurité complètes pour protéger vos systèmes et données contre les menaces.',
    'services.dataManagement': 'Gestion des Données',
    'services.dataManagementDesc': 'Solutions efficaces de gestion des données, incluant sauvegarde, récupération et optimisation du stockage.',
    'services.monitoring': 'Surveillance Système',
    'services.monitoringDesc': 'Surveillance proactive des systèmes pour prévenir les problèmes avant qu\'ils n\'impactent votre activité.',
    'services.virtualization': 'Virtualisation',
    'services.virtualizationDesc': 'Implémentation de solutions de virtualisation pour maximiser l\'efficacité et la flexibilité du matériel.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.techWatch': 'Tech Watch',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.title': 'System & Network Administration Expert',
    'home.subtitle': 'Building robust, secure, and scalable infrastructure solutions for modern enterprises.',
    'home.cta.projects': 'View My Projects',
    'home.cta.contact': 'Contact Me',
    'home.about.title': 'About',
    'home.about.description1': 'With over 8 years of experience in system and network administration, I specialize in designing, implementing, and maintaining IT infrastructure solutions for businesses of all sizes.',
    'home.about.description2': 'My expertise spans across Windows and Linux environments, virtualization technologies, network security, cloud services, and automation. I\'m passionate about implementing efficient systems that enhance business operations while ensuring maximum security and reliability.',
    'home.about.description3': 'I believe in staying ahead of the technology curve, continuously learning and adapting to new tools and methodologies to provide the best solutions for modern business challenges.',
    'home.services.title': 'Services',
    'home.services.subtitle': 'Comprehensive solutions to optimize your infrastructure',
    'home.cta.ready': 'Ready to optimize your IT infrastructure?',
    'home.cta.discuss': 'Let\'s discuss how my expertise can help your business thrive in today\'s digital landscape.',
    
    // Skills
    'skills.title': 'Technical Skills',
    
    // Services
    'services.serverManagement': 'Server Management',
    'services.serverManagementDesc': 'Expert management of Windows and Linux servers, ensuring optimal performance and reliability.',
    'services.networkInfra': 'Network Infrastructure',
    'services.networkInfraDesc': 'Design, implementation, and maintenance of robust network infrastructures.',
    'services.security': 'Security Solutions',
    'services.securityDesc': 'Comprehensive security solutions to protect your systems and data from threats.',
    'services.dataManagement': 'Data Management',
    'services.dataManagementDesc': 'Efficient data management solutions, including backup, recovery, and storage optimization.',
    'services.monitoring': 'System Monitoring',
    'services.monitoringDesc': 'Proactive monitoring of systems to prevent issues before they impact your business.',
    'services.virtualization': 'Virtualization',
    'services.virtualizationDesc': 'Implementation of virtualization solutions to maximize hardware efficiency and flexibility.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'fr' ? 'en' : 'fr'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};