import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import CalendlyModal from './CalendlyModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'bg-hbs-black/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="/assets/hbs_logo (2).jpg" 
                alt="HBS Automations Logo" 
                className="h-8 w-8 rounded-full object-cover" 
              />
              <span className="text-lg sm:text-xl font-bold text-white">HBS<span className="text-hbs-electric-purple">Automations</span></span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
              <div className="flex flex-col items-center text-[10px] text-white font-light tracking-wide">
                <span>United Kingdom</span>
                <span>United States</span>
              </div>
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About Us</NavLink>
              <NavLink href="#about">Services</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setIsCalendlyOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-xs sm:text-sm flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-1" /> Book Now
                </motion.button>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-xs sm:text-sm"
                >
                  Get Started
                </motion.a>
                <span className="flex space-x-2 ml-2">
                  <img 
                    src="/assets/gbflag copy.png" 
                    alt="UK flag" 
                    className="h-5 sm:h-6 w-auto object-contain" 
                  />
                  <img 
                    src="/assets/USAflag copy.jpg" 
                    alt="USA flag" 
                    className="h-5 sm:h-6 w-auto object-contain" 
                  />
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-hbs-deep-purple/95 backdrop-blur-md shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex flex-col items-center text-[10px] text-white font-light tracking-wide mb-2">
              <span>United Kingdom</span>
              <span>United States</span>
            </div>
            <MobileNavLink href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
            <div className="flex flex-col space-y-4 pt-2">
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalendlyOpen(true);
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-center flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" /> Book Now
              </motion.button>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </motion.a>
              <div className="flex items-center space-x-2 justify-center">
                <img 
                  src="/assets/gbflag copy.png" 
                  alt="UK flag" 
                  className="h-6 w-auto object-contain" 
                />
                <img 
                  src="/assets/USAflag copy.jpg" 
                  alt="USA flag" 
                  className="h-6 w-auto object-contain" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Calendly Modal */}
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <motion.a
      href={href}
      className="text-white hover:text-hbs-cyan transition-colors duration-300 text-sm lg:text-base"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

const MobileNavLink: React.FC<{ href: string; onClick: () => void; children: React.ReactNode }> = ({ 
  href, 
  onClick, 
  children 
}) => {
  return (
    <motion.a
      href={href}
      className="text-white text-base sm:text-lg py-2 block border-b border-hbs-electric-purple/30"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.a>
  );
};

export default Navbar;