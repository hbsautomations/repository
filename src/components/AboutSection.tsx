import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Bot, 
  Database, 
  BarChart4, 
  Brain, 
  Users, 
  LineChart,
  Globe,
  Clock,
  Search,
  Instagram,
  MessageSquare,
  SendHorizontal,
  Facebook,
  Video,
  Mail,
  UserRound,
  LinkedinIcon,
  TwitterIcon,
  PhoneCall,
  CalendarClock,
  ThumbsUp,
  Code,
  Laptop
} from 'lucide-react';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const serviceCards = [
    {
      title: "Cold Email Automation",
      description: "Personalized cold email campaigns that generate leads while you sleep. Our automation tools handle the entire outreach process.",
      icon: <Mail className="h-12 w-12 text-hbs-cyan" />,
      delay: 0.1,
    },
    {
      title: "LinkedIn Outreach",
      description: "Connect with high-value prospects through automated yet personalized LinkedIn messaging and connection requests.",
      icon: <LinkedinIcon className="h-12 w-12 text-hbs-electric-purple" />,
      delay: 0.3,
    },
    {
      title: "Instagram Lead Generation",
      description: "Leverage Instagram's massive audience with targeted outreach and engagement automation to drive qualified leads.",
      icon: <Instagram className="h-12 w-12 text-hbs-neon-purple" />,
      delay: 0.5,
    },
    {
      title: "Twitter Engagement",
      description: "Automated conversation starters and engagement tactics that put your brand in front of the right audience.",
      icon: <TwitterIcon className="h-12 w-12 text-hbs-cyan" />,
      delay: 0.7,
    },
    {
      title: "Multi-Channel Campaigns",
      description: "Coordinate outreach across email, social media, and messaging platforms for maximum impact and conversion.",
      icon: <Globe className="h-12 w-12 text-hbs-electric-purple" />,
      delay: 0.2,
    },
    {
      title: "Virtual Assistant Management",
      description: "Our AI-powered virtual assistants handle your inbound and outbound communications 24/7 with human-like interactions.",
      icon: <UserRound className="h-12 w-12 text-hbs-neon-purple" />,
      delay: 0.4,
    },
    {
      title: "Meeting Scheduler",
      description: "Automated booking systems that eliminate the back-and-forth of scheduling, converting more leads into meetings.",
      icon: <CalendarClock className="h-12 w-12 text-hbs-cyan" />,
      delay: 0.6,
    },
    {
      title: "WhatsApp Business Automation",
      description: "Engage prospects on WhatsApp with automated yet conversational messages that feel personal and drive results.",
      icon: <MessageSquare className="h-12 w-12 text-hbs-electric-purple" />,
      delay: 0.8,
    },
    {
      title: "Facebook Messenger Bots",
      description: "Intelligent conversation flows that qualify leads, answer questions, and book meetings without human intervention.",
      icon: <Facebook className="h-12 w-12 text-hbs-neon-purple" />,
      delay: 0.3,
    },
    {
      title: "Call Center Automation",
      description: "AI-powered phone outreach that scales your sales team's capacity while maintaining personalized conversations.",
      icon: <PhoneCall className="h-12 w-12 text-hbs-cyan" />,
      delay: 0.5,
    },
    {
      title: "Lead Qualification Automation",
      description: "Smart systems that qualify leads through automated conversations before passing them to your sales team.",
      icon: <ThumbsUp className="h-12 w-12 text-hbs-electric-purple" />,
      delay: 0.7,
    },
    {
      title: "24-Hour Website Creation",
      description: "Get a professional, conversion-optimized website designed and launched within 24 hours. Perfect for businesses that need to move fast.",
      icon: <Code className="h-12 w-12 text-hbs-neon-purple" />,
      delay: 0.4,
    },
    {
      title: "AI Chatbots",
      description: "Custom AI chatbots that engage visitors, answer questions, and qualify leads on your website 24/7, even when you're not available.",
      icon: <Bot className="h-12 w-12 text-hbs-cyan" />,
      delay: 0.6,
    },
  ];

  const stats = [
    { value: 100, suffix: "+", label: "Active Clients", delay: 0.2 },
    { value: 92, suffix: "%", label: "Client Retention", delay: 0.4 },
    { value: 500, suffix: "K+", label: "Saved Work Hours", delay: 0.6 },
    { value: 4, suffix: "X", label: "Average ROI", delay: 0.8 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      },
    }),
  };

  const countingAnimation = (value: number) => {
    return {
      initial: { count: 0 },
      animate: { count: value },
      transition: { duration: 2, ease: "easeOut" }
    };
  };

  return (
    <section id="about" className="section-gradient py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Automated Outreach Solutions
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
            At HBS Automations, we power your business growth with cutting-edge outreach automation and virtual assistant solutions that generate leads and nurture relationships 24/7.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-20"
        >
          {serviceCards.map((card, index) => (
            <motion.div
              key={index}
              custom={card.delay}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(138, 43, 226, 0.4)"
              }}
              className="bg-gradient-to-br from-hbs-black to-hbs-deep-purple p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-sm border border-hbs-electric-purple/30 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-hbs-black/40 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-300">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Outreach Automation Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-hbs-deep-purple to-hbs-black rounded-2xl p-6 sm:p-8 mb-10 sm:mb-16 backdrop-blur-md border border-hbs-electric-purple/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-2 sm:p-3 bg-hbs-black/40 rounded-full mr-3 sm:mr-4">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-hbs-cyan" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Cold Email Automation</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our advanced cold email automation combines AI-driven personalization with proven sequences to help you connect with prospects at scale without sounding robotic or spammy.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Hyper-personalized outreach that feels hand-written
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Multi-touch sequences with intelligent follow-ups
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Real-time performance tracking and optimization
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="p-2 sm:p-3 bg-hbs-black/40 rounded-full mr-3 sm:mr-4">
                  <UserRound className="h-6 w-6 sm:h-8 sm:w-8 text-hbs-cyan" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Virtual Assistant</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Our AI-powered virtual assistants handle both inbound and outbound communication, qualifying leads, booking meetings, and maintaining relationships 24/7 without human intervention.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Natural conversation flows that feel human
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Seamless calendar integration and meeting scheduling
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-hbs-electric-purple mr-2"></div>
                  Lead qualification and handoff to sales team
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="bg-hbs-black/60 rounded-2xl p-6 sm:p-8 backdrop-blur-md border border-hbs-electric-purple/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Impact</h3>
            <div className="w-16 sm:w-20 h-1 bg-hbs-electric-purple mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={stat.delay}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                className="text-center"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  {index % 2 === 0 ? (
                    <Users className="h-8 w-8 sm:h-10 sm:w-10 text-hbs-cyan" />
                  ) : (
                    <LineChart className="h-8 w-8 sm:h-10 sm:w-10 text-hbs-electric-purple" />
                  )}
                </div>
                <motion.h4 
                  className="text-3xl sm:text-4xl font-bold mb-2 text-white"
                  {...countingAnimation(stat.value)}
                >
                  {inView ? stat.value : 0}{stat.suffix}
                </motion.h4>
                <p className="text-sm sm:text-base text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;