import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import MatrixCodeRain from './MatrixCodeRain';
import CalendlyModal from './CalendlyModal';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      
      floatingElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.05');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        (element as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="hero-gradient relative min-h-screen flex items-center justify-center pt-20 z-10 overflow-hidden"
    >
      {/* Matrix Code Rain Animation */}
      <div className="absolute inset-0 opacity-30">
        <MatrixCodeRain />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="floating-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-hbs-electric-purple/10 animate-float-slow blur-xl"
          data-speed="0.05"
        ></div>
        <div 
          className="floating-element absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-hbs-cyan/10 animate-float blur-xl"
          data-speed="0.08"
        ></div>
        <div 
          className="floating-element absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-hbs-neon-purple/10 animate-float-slower blur-xl"
          data-speed="0.03"
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto backdrop-blur-sm p-6 sm:p-10 rounded-2xl bg-hbs-black/30 border border-hbs-electric-purple/20"
        >
          <h1 className="text-gradient text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            AI SOLUTIONS FOR THE FUTURE
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8"
          >
            BUSINESS AUTOMATION TAILORED FOR YOU
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4"
          >
            <motion.button
              onClick={() => setIsCalendlyOpen(true)}
              className="btn-primary inline-flex items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(157, 0, 255, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="mr-2 h-5 w-5" /> Book a Consultation
            </motion.button>
            <motion.a
              href="#contact"
              className="btn-secondary inline-flex items-center justify-center mt-4 sm:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Code snippets floating animation */}
      <CodeSnippet
        text="{AI.analyze(data)}"
        position="top-1/4 left-20"
        delay={1.2}
        duration={3}
        color="text-hbs-cyan"
      />
      <CodeSnippet
        text="function automate() {"
        position="bottom-1/3 right-10"
        delay={0.8}
        duration={4}
        color="text-hbs-electric-purple"
      />
      <CodeSnippet
        text="const future = await AI.predict()"
        position="top-1/3 right-24"
        delay={1.5}
        duration={3.5}
        color="text-hbs-neon-purple"
      />
      <CodeSnippet
        text="while(business.growing) {"
        position="bottom-1/4 left-1/4"
        delay={0.5}
        duration={4.5}
        color="text-hbs-cyan"
      />

      {/* Calendly Modal */}
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </section>
  );
};

// Component for animated code snippets
interface CodeSnippetProps {
  text: string;
  position: string;
  delay: number;
  duration: number;
  color: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  text, 
  position, 
  delay, 
  duration,
  color
}) => {
  return (
    <motion.div
      className={`absolute ${position} hidden md:block`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0, 0.8, 0],
        y: [-20, 0, 20] 
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <div className={`${color} bg-hbs-black/30 px-4 py-2 rounded-md border border-current/30 font-mono text-sm backdrop-blur-sm`}>
        {text}
      </div>
    </motion.div>
  );
};

export default HeroSection;