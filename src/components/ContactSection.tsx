import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { sendContactForm } from '../lib/emailjs';
import { contactSubmissions, newsletterSubscribers, checkLocalStorageAvailable } from '../lib/localStorageDb';

const ContactSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [isStorageAvailable, setIsStorageAvailable] = useState(true);

  // Check local storage availability on component mount
  useEffect(() => {
    const storageAvailable = checkLocalStorageAvailable();
    setIsStorageAvailable(storageAvailable);
    if (!storageAvailable) {
      console.warn("Local storage is not available. Some features may not work properly.");
    }
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Always try to send data to webhook first
      const webhookResult = await sendContactForm({
        name: formState.name,
        email: formState.email,
        company: formState.company,
        message: formState.message,
      });

      if (!webhookResult.success) {
        throw new Error('Unable to send your message. Please try again later or contact us directly.');
      }

      // If local storage is available, also save there
      if (isStorageAvailable) {
        const { error: storageError } = contactSubmissions.insert({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          message: formState.message,
        });

        if (storageError) {
          console.warn('Failed to save contact submission locally:', storageError);
          // Continue with success flow since webhook succeeded
        }
      }

      setFormSubmitted(true);
      setFormState({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFormError(
        error instanceof Error 
          ? error.message 
          : 'There was an error submitting your message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterError(null);

    if (!isStorageAvailable) {
      setNewsletterError('Newsletter subscription is currently unavailable. Please try again later.');
      setIsNewsletterSubmitting(false);
      return;
    }

    try {
      // Check if email already exists
      const { exists, error: checkError } = newsletterSubscribers.emailExists(newsletterEmail);
      
      if (checkError) {
        console.error('Error checking existing email:', checkError);
        throw checkError;
      }

      if (exists) {
        setNewsletterError('This email is already subscribed to our newsletter.');
        setIsNewsletterSubmitting(false);
        return;
      }

      // Insert newsletter subscription
      const { error } = newsletterSubscribers.insert(newsletterEmail);

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterError(
        error instanceof Error 
          ? error.message 
          : 'There was an error subscribing. Please try again.'
      );
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-b from-hbs-black via-hbs-deep-purple to-hbs-black">
      <div 
        ref={ref}
        className="container mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get In Touch
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            Ready to transform your business with AI? Contact our team to discuss your automation needs and discover how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col bg-hbs-black/60 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-hbs-electric-purple/20"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h3>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="flex items-center">
                <div className="bg-hbs-deep-purple/50 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-hbs-cyan" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                  <p className="text-white text-sm sm:text-base">hbsautomations@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-hbs-deep-purple/50 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-hbs-cyan" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Phone</p>
                  <p className="text-white text-sm sm:text-base">07956244108</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-hbs-deep-purple/50 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-hbs-cyan" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Address</p>
                  <p className="text-white text-sm sm:text-base">UK/USA</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-auto">
              <h4 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">Connect With Us</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-hbs-deep-purple/50 p-2 sm:p-3 rounded-full text-hbs-electric-purple hover:text-hbs-cyan transition-colors duration-300"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-hbs-deep-purple/50 p-2 sm:p-3 rounded-full text-hbs-electric-purple hover:text-hbs-cyan transition-colors duration-300"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 sm:mt-10">
              <h4 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">Subscribe to Our Newsletter</h4>
              {newsletterSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-hbs-cyan text-sm sm:text-base"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <p>Thank you for subscribing!</p>
                </motion.div>
              ) : (
                <>
                  <form onSubmit={handleNewsletterSubmit} className="flex">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-grow p-2 sm:p-3 bg-hbs-black/70 border border-hbs-electric-purple/30 rounded-l-lg focus:outline-none focus:border-hbs-cyan transition-all duration-300 text-sm sm:text-base"
                      required
                      disabled={isNewsletterSubmitting || !isStorageAvailable}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-hbs-electric-purple text-white p-2 sm:p-3 rounded-r-lg disabled:opacity-50"
                      disabled={isNewsletterSubmitting || !isStorageAvailable}
                    >
                      {isNewsletterSubmitting ? (
                        <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      ) : (
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </motion.button>
                  </form>
                  {newsletterError && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {newsletterError}
                    </p>
                  )}
                  {!isStorageAvailable && !newsletterError && (
                    <p className="text-amber-400 text-xs mt-2 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Storage unavailable. Please try again later.
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-br from-hbs-black/90 to-hbs-deep-purple/70 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-hbs-electric-purple/20"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-6 sm:py-10"
              >
                <div className="bg-hbs-electric-purple/20 p-4 sm:p-5 rounded-full mb-4 sm:mb-6">
                  <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-hbs-cyan" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Message Sent Successfully!</h3>
                <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">Thank you for reaching out. Our team will contact you shortly.</p>
                <motion.button
                  onClick={() => setFormSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm sm:text-base"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Send Us a Message</h3>
                {!isStorageAvailable && (
                  <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-amber-400 font-medium">Local storage unavailable</p>
                        <p className="text-amber-300/70 text-sm mt-1">
                          Local storage features are currently unavailable. Your message will still be sent through our backup system.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleContactSubmit} className="contact-form space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleContactChange}
                        placeholder="John Doe"
                        className="text-sm sm:text-base"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleContactChange}
                        placeholder="john@example.com"
                        className="text-sm sm:text-base"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleContactChange}
                      placeholder="Your Company"
                      className="text-sm sm:text-base"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleContactChange}
                      placeholder="How can we help you?"
                      className="w-full p-3 bg-transparent border border-hbs-electric-purple border-opacity-50 rounded-lg outline-none focus:border-hbs-cyan transition-all duration-300 text-sm sm:text-base"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  {formError && (
                    <div className="text-red-400 text-sm flex items-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>{formError}</p>
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 0 15px rgba(157, 0, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full text-sm sm:text-base flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    ) : null}
                    Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-12 sm:mt-20 pt-6 sm:pt-10 border-t border-hbs-electric-purple/30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4 md:mb-0"
          >
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">© 2025 HBS Automations. All rights reserved.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center md:justify-end gap-4 sm:space-x-6"
          >
            <Link to="/privacy-policy" className="text-gray-400 hover:text-hbs-cyan transition-colors duration-300 text-xs sm:text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-hbs-cyan transition-colors duration-300 text-xs sm:text-sm">Terms of Service</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;