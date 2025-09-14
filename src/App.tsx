import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import ParticlesBackground from './components/ParticlesBackground';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { checkLocalStorageAvailable } from './lib/localStorageDb';

// Main homepage component
const HomePage = () => {
  const [isStorageAvailable, setIsStorageAvailable] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check local storage availability
    const checkStorage = () => {
      try {
        const available = checkLocalStorageAvailable();
        setIsStorageAvailable(available);
        setShowBanner(!available);
      } catch (error) {
        console.error("Error checking storage:", error);
        setIsStorageAvailable(false);
        setShowBanner(true);
      }
    };
    
    checkStorage();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
        {showBanner && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-96 bg-amber-900/80 backdrop-blur-md p-4 rounded-lg border border-amber-500/50 shadow-lg z-50">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-amber-300">Storage Unavailable</p>
                <p className="mt-1 text-sm text-amber-200/80">
                  Local storage is unavailable. Contact form submissions will still work through our backup system.
                </p>
              </div>
              <button 
                className="ml-4 text-amber-300 hover:text-amber-100"
                onClick={() => setShowBanner(false)}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <div className="relative min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;