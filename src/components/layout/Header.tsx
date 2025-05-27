import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Server, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/projects', label: 'Projets' },
    { to: '/tech-watch', label: 'Veille Techno' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white shadow-md dark:bg-slate-800' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Server className={`w-8 h-8 ${isScrolled || theme === 'dark' ? 'text-blue-600' : 'text-white'}`} />
          <span className={`text-xl font-bold ${
            isScrolled 
              ? 'text-slate-800 dark:text-white' 
              : location.pathname === '/' 
                ? 'text-white dark:text-white' 
                : 'text-slate-800 dark:text-white'
          }`}>
            AdminSys
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-slate-600 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400' 
                  : location.pathname === '/' 
                    ? 'text-white hover:text-blue-300 dark:text-white dark:hover:text-blue-300' 
                    : 'text-slate-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-300'
              } ${location.pathname === link.to ? 'border-b-2 border-blue-500' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
        
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleMenu}
            className={`${
              isScrolled 
                ? 'text-slate-800 dark:text-white' 
                : location.pathname === '/' 
                  ? 'text-white' 
                  : 'text-slate-800 dark:text-white'
            }`}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-slate-800 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-2 px-4 font-medium rounded-md transition-colors duration-300 ${
                    location.pathname === link.to 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;