import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-hbs-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>
      
      <div className="relative z-10 pt-8 pb-16">
        {/* Header with Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link to="/">
            <motion.div 
              className="flex items-center text-hbs-cyan mb-8"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="mr-2" size={20} />
              <span>Back to Home</span>
            </motion.div>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Terms of Service
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto px-6"
        >
          <div className="bg-gradient-to-br from-hbs-black/90 to-hbs-deep-purple/30 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-hbs-electric-purple/20 text-gray-300">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="mb-6 text-gray-300">
                By accessing or using HBS Automations' services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Services</h2>
              <p className="mb-6 text-gray-300">
                HBS Automations provides AI-powered automation solutions for businesses, including but not limited to AI-Powered Process Automation, Smart Data Management, Predictive Analytics, Machine Learning Solutions, Advanced SEO Campaigns, and Website Creation services. The specific features and functionalities of our services may change over time.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">3. User Accounts and Responsibilities</h2>
              <p className="mb-3 text-gray-300">
                To access certain services, you may need to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-300">
                <li className="mb-2">Maintaining the confidentiality of your account credentials</li>
                <li className="mb-2">All activities that occur under your account</li>
                <li className="mb-2">Ensuring that the information you provide is accurate and up-to-date</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-white">4. Fees and Payment</h2>
              <p className="mb-6 text-gray-300">
                Some of our services require payment. By subscribing to a paid service, you agree to pay the fees indicated for that service. We may modify our fees at any time, but we will provide notice of any fee changes in advance. Fees are non-refundable except as required by law or as expressly stated in these terms.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">5. Intellectual Property</h2>
              <p className="mb-6 text-gray-300">
                All content, software, and technology that is part of our services is owned by HBS Automations and is protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our explicit permission.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">6. User Content</h2>
              <p className="mb-6 text-gray-300">
                You retain ownership of any content you submit to our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and display that content in connection with providing our services to you.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">7. Termination</h2>
              <p className="mb-6 text-gray-300">
                We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason. You may terminate your use of our services at any time.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">8. Limitation of Liability</h2>
              <p className="mb-6 text-gray-300">
                To the maximum extent permitted by law, HBS Automations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">9. Changes to Terms</h2>
              <p className="mb-6 text-gray-300">
                We may modify these Terms of Service at any time. We will notify you of any significant changes by posting a notice on our website or sending you an email. Your continued use of our services after such modifications will constitute your acknowledgment of the modified Terms and agreement to abide by them.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">10. Governing Law</h2>
              <p className="mb-6 text-gray-300">
                These Terms of Service shall be governed by the laws of the United Kingdom, without regard to its conflict of law provisions. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in the United Kingdom.
              </p>

              <div className="bg-hbs-electric-purple/10 p-6 rounded-lg border border-hbs-electric-purple/20 mt-8 mb-4">
                <h3 className="text-xl font-semibold mb-3 text-white">Contact Us</h3>
                <p className="text-gray-300">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-hbs-cyan mt-2">hbsautomations@gmail.com</p>
              </div>

              <p className="text-sm text-gray-400 mt-8">
                Last updated: October 1, 2025
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="container mx-auto px-6 mt-12 pt-6 border-t border-hbs-electric-purple/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-xs sm:text-sm">© 2025 HBS Automations. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-hbs-cyan transition-colors duration-300 text-xs sm:text-sm">Home</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-hbs-cyan transition-colors duration-300 text-xs sm:text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-hbs-cyan transition-colors duration-300 text-xs sm:text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;