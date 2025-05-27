import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">À propos</h3>
            <p className="text-slate-300">
              Administrateur Système et Réseau spécialisé dans la gestion d'infrastructure, la sécurité et l'optimisation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-slate-300 hover:text-blue-400 transition-colors">Accueil</a></li>
              <li><a href="/projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projets</a></li>
              <li><a href="/tech-watch" className="text-slate-300 hover:text-blue-400 transition-colors">Veille Techno</a></li>
              <li><a href="/contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Me contacter</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@example.com" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 pt-6 text-center text-slate-400">
          <p>&copy; {currentYear} Portfolio AdminSys. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;