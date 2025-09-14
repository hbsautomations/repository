// Type definitions for the application

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  message: string;
}