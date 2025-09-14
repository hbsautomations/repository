import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const PrivacyPolicy: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
        
        {/* Key Privacy Features */}
        <div className="container mx-auto px-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PrivacyFeatureCard 
              icon={<Shield className="h-10 w-10 text-hbs-cyan" />}
              title="Data Protection" 
              description="We implement robust security measures to protect your data from unauthorized access."
            />
            <PrivacyFeatureCard 
              icon={<Lock className="h-10 w-10 text-hbs-electric-purple" />}
              title="Secure Processing" 
              description="All data processing follows strict security protocols and industry best practices."
            />
            <PrivacyFeatureCard 
              icon={<UserCheck className="h-10 w-10 text-hbs-neon-purple" />}
              title="User Control" 
              description="You maintain control over your data with options to access, modify, or delete your information."
            />
          </div>
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
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <p className="mb-3 text-gray-300">
                At HBS Automations, we collect different types of information to provide and improve our services:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-300">
                <li className="mb-2"><span className="text-white font-medium">Personal Information:</span> Name, email address, phone number, and company information when you create an account or contact us.</li>
                <li className="mb-2"><span className="text-white font-medium">Usage Data:</span> Information about how you interact with our services, including access times, pages viewed, and the referring website.</li>
                <li className="mb-2"><span className="text-white font-medium">Device Information:</span> Details about the device you use to access our services, including hardware model, operating system, unique device identifiers, and mobile network information.</li>
                <li><span className="text-white font-medium">Business Data:</span> Information you provide for us to process as part of our AI automation services.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <p className="mb-3 text-gray-300">
                We use the information we collect for various purposes:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-300">
                <li className="mb-2">To provide, maintain, and improve our services</li>
                <li className="mb-2">To process and complete transactions</li>
                <li className="mb-2">To send you technical notices, updates, security alerts, and support messages</li>
                <li className="mb-2">To respond to your comments, questions, and requests</li>
                <li className="mb-2">To develop new products and services</li>
                <li>To personalize your experience by delivering content and product offerings relevant to your interests</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-white">3. Information Sharing and Disclosure</h2>
              <p className="mb-3 text-gray-300">
                We do not sell your personal information to third parties. We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-300">
                <li className="mb-2"><span className="text-white font-medium">With Service Providers:</span> We may share your information with third-party vendors who provide services on our behalf, such as hosting, data analysis, and customer service.</li>
                <li className="mb-2"><span className="text-white font-medium">For Legal Reasons:</span> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li className="mb-2"><span className="text-white font-medium">Business Transfers:</span> If HBS Automations is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><span className="text-white font-medium">With Your Consent:</span> We may share your information with third parties when you have given us your consent to do so.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
              <p className="mb-6 text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">5. Your Data Rights</h2>
              <p className="mb-3 text-gray-300">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-300">
                <li className="mb-2">The right to access your personal information</li>
                <li className="mb-2">The right to rectify inaccurate personal information</li>
                <li className="mb-2">The right to request deletion of your personal information</li>
                <li className="mb-2">The right to restrict processing of your personal information</li>
                <li className="mb-2">The right to data portability</li>
                <li>The right to object to processing of your personal information</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-white">6. Cookies and Similar Technologies</h2>
              <p className="mb-6 text-gray-300">
                We use cookies and similar tracking technologies to collect and use information about you and your device. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, some parts of our services may not function properly without cookies.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">7. Children's Privacy</h2>
              <p className="mb-6 text-gray-300">
                Our services are not directed at individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete that information.
              </p>

              <h2 className="text-2xl font-semibold mb-4 text-white">8. Changes to This Privacy Policy</h2>
              <p className="mb-6 text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <div className="bg-hbs-electric-purple/10 p-6 rounded-lg border border-hbs-electric-purple/20 mt-8 mb-4">
                <h3 className="text-xl font-semibold mb-3 text-white">Contact Us</h3>
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at:
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

// Component for privacy feature cards
interface PrivacyFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PrivacyFeatureCard: React.FC<PrivacyFeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-hbs-black to-hbs-deep-purple p-6 rounded-xl shadow-lg backdrop-blur-sm border border-hbs-electric-purple/30 flex flex-col items-center text-center"
    >
      <div className="mb-4 p-3 bg-hbs-black/40 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-sm sm:text-base">{description}</p>
    </motion.div>
  );
};

export default PrivacyPolicy;