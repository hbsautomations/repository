import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "How can AI automation benefit my business?",
      answer: "AI automation can transform your business operations by streamlining workflows, reducing manual tasks, minimizing errors, and providing valuable insights from your data. Our clients typically see efficiency improvements of 30-50% in automated processes, significant cost savings, and enhanced decision-making capabilities through predictive analytics."
    },
    {
      question: "What industries do you specialize in?",
      answer: "HBS Automations provides tailored AI solutions for a wide range of industries including finance, healthcare, manufacturing, retail, logistics, and professional services. Our team has deep domain expertise across multiple sectors, allowing us to customize our solutions to your specific industry challenges and compliance requirements."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timelines vary based on the complexity of the solution and the scale of deployment. Simple process automations can be implemented in as little as 2-4 weeks, while enterprise-wide intelligent systems might take 3-6 months. We work with you to establish a phased approach that delivers value at each stage of the implementation process."
    },
    {
      question: "Do I need extensive technical knowledge to use your solutions?",
      answer: "No. Our solutions are designed with user-friendliness in mind. While they leverage sophisticated AI technology, the interfaces are intuitive and require minimal technical knowledge. We provide comprehensive training and ongoing support to ensure your team can effectively utilize and manage the solutions."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "Data security and privacy are paramount in all our implementations. We employ enterprise-grade security measures including encryption, secure authentication, regular security audits, and compliance with industry-specific regulations (GDPR, HIPAA, etc.). All our solutions are built with privacy-by-design principles, and we provide clear data governance frameworks."
    },
    {
      question: "What ongoing support do you provide after implementation?",
      answer: "We offer comprehensive support packages including 24/7 technical assistance, regular maintenance updates, performance optimization, and continuous training. Our client success teams conduct quarterly reviews to ensure your solution continues to deliver maximum value and can evolve as your business needs change."
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-hbs-black">
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            Find answers to common questions about our AI automation solutions and how they can transform your business operations.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
              }}
              className="mb-4 sm:mb-6"
            >
              <motion.div 
                className={`
                  p-4 sm:p-5 rounded-lg cursor-pointer flex justify-between items-center
                  ${activeIndex === index 
                    ? 'bg-gradient-to-r from-hbs-deep-purple to-hbs-black border-l-4 border-hbs-electric-purple' 
                    : 'bg-hbs-black/50 hover:bg-hbs-deep-purple/30 transition-all duration-300 border border-hbs-electric-purple/30'}
                `}
                onClick={() => toggleAccordion(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-base sm:text-xl font-medium text-white pr-2">{item.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-hbs-electric-purple flex-shrink-0"
                >
                  {activeIndex === index ? (
                    <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </motion.div>
              </motion.div>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 bg-hbs-deep-purple/20 border-l-4 border-hbs-cyan rounded-b-lg text-gray-300 text-sm sm:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;