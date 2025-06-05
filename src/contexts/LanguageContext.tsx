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
    
    // Projects
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Découvrez mes réalisations en administration système et réseau',
    'projects.viewDetails': 'Voir les détails',
    'projects.allProjects': 'Tous les projets',
    'projects.categories': 'Catégories',
    'projects.noProjects': 'Aucun projet trouvé dans cette catégorie.',
    'projects.resetFilters': 'Réinitialiser les filtres',
    
    // Categories
    'category.networking': 'Réseau',
    'category.security': 'Sécurité',
    'category.cloud': 'Cloud',
    'category.virtualization': 'Virtualisation',
    'category.automation': 'Automatisation',
    'category.monitoring': 'Surveillance',
    'category.optimization': 'Optimisation',
    
    // Tech Watch
    'techWatch.title': 'Veille Technologique',
    'techWatch.subtitle': 'Restez informé des dernières tendances en administration système et réseau',
    'techWatch.searchPlaceholder': 'Rechercher des articles...',
    'techWatch.readMore': 'Lire la suite',
    'techWatch.backToList': 'Retour à la liste',
    'techWatch.relatedArticles': 'Articles connexes',
    'techWatch.noArticles': 'Aucun article trouvé.',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Discutons de vos besoins en infrastructure IT',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.success': 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
    'contact.info.title': 'Informations de contact',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Téléphone',
    'contact.info.location': 'Localisation',
    'contact.businessHours': 'Horaires d\'ouverture',
    'contact.businessHours.weekdays': 'Lundi - Vendredi',
    'contact.businessHours.saturday': 'Samedi',
    'contact.businessHours.sunday': 'Dimanche',
    'contact.businessHours.appointment': 'Sur rendez-vous',
    'contact.businessHours.closed': 'Fermé'
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
    
    // Projects
    'projects.title': 'My Projects',
    'projects.subtitle': 'Explore my system and network administration achievements',
    'projects.viewDetails': 'View Details',
    'projects.allProjects': 'All Projects',
    'projects.categories': 'Categories',
    'projects.noProjects': 'No projects found in this category.',
    'projects.resetFilters': 'Reset Filters',
    
    // Categories
    'category.networking': 'Networking',
    'category.security': 'Security',
    'category.cloud': 'Cloud',
    'category.virtualization': 'Virtualization',
    'category.automation': 'Automation',
    'category.monitoring': 'Monitoring',
    'category.optimization': 'Optimization',
    
    // Tech Watch
    'techWatch.title': 'Tech Watch',
    'techWatch.subtitle': 'Stay informed about the latest trends in system and network administration',
    'techWatch.searchPlaceholder': 'Search articles...',
    'techWatch.readMore': 'Read More',
    'techWatch.backToList': 'Back to List',
    'techWatch.relatedArticles': 'Related Articles',
    'techWatch.noArticles': 'No articles found.',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Let\'s discuss your IT infrastructure needs',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Thank you for your message! I\'ll get back to you as soon as possible.',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.businessHours': 'Business Hours',
    'contact.businessHours.weekdays': 'Monday - Friday',
    'contact.businessHours.saturday': 'Saturday',
    'contact.businessHours.sunday': 'Sunday',
    'contact.businessHours.appointment': 'By appointment',
    'contact.businessHours.closed': 'Closed'
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