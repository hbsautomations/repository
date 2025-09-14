import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 py-6 sm:p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-hbs-deep-purple/90 w-full max-w-4xl h-[80vh] sm:h-[85vh] rounded-xl shadow-2xl border border-hbs-electric-purple/50 overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-hbs-black/50 p-2 rounded-full text-white hover:text-hbs-cyan transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
              
              {/* Calendly Widget */}
              <div className="w-full h-full">
                <iframe
                  src="https://calendly.com/hbsautomations/new-meeting"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Schedule a meeting with HBS Automations"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;