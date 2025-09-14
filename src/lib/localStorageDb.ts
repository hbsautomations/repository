// Local storage database implementation to replace Supabase

// Generic type for our collections
type Collection<T> = {
  items: T[];
  nextId: number;
};

// Collection types matching our previous Supabase tables
type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at: string;
};

type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

// Initialize collections in local storage if they don't exist
const initializeCollection = <T>(collectionName: string): Collection<T> => {
  const existingCollection = localStorage.getItem(collectionName);
  if (!existingCollection) {
    const newCollection: Collection<T> = { items: [], nextId: 1 };
    localStorage.setItem(collectionName, JSON.stringify(newCollection));
    return newCollection;
  }
  return JSON.parse(existingCollection);
};

// Helper to save collection back to local storage
const saveCollection = <T>(collectionName: string, collection: Collection<T>): void => {
  localStorage.setItem(collectionName, JSON.stringify(collection));
};

// Generate UUID-like IDs
const generateId = (): string => {
  return 'id-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Contact submissions collection operations
export const contactSubmissions = {
  // Insert a new contact submission
  insert: (data: Omit<ContactSubmission, 'id' | 'created_at'>): { error: Error | null } => {
    try {
      const collection = initializeCollection<ContactSubmission>('contactSubmissions');
      
      // Create new submission with ID and timestamp
      const newSubmission: ContactSubmission = {
        id: generateId(),
        ...data,
        created_at: new Date().toISOString(),
      };
      
      // Add to collection
      collection.items.push(newSubmission);
      collection.nextId++;
      
      // Save back to local storage
      saveCollection('contactSubmissions', collection);
      
      return { error: null };
    } catch (error) {
      console.error('Error inserting contact submission:', error);
      return { error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  // Get all contact submissions
  getAll: (): { data: ContactSubmission[], error: Error | null } => {
    try {
      const collection = initializeCollection<ContactSubmission>('contactSubmissions');
      return { data: collection.items, error: null };
    } catch (error) {
      console.error('Error getting contact submissions:', error);
      return { data: [], error: error instanceof Error ? error : new Error('Unknown error') };
    }
  }
};

// Newsletter subscribers collection operations
export const newsletterSubscribers = {
  // Check if an email already exists
  emailExists: (email: string): { exists: boolean, error: Error | null } => {
    try {
      const collection = initializeCollection<NewsletterSubscriber>('newsletterSubscribers');
      const exists = collection.items.some(item => item.email.toLowerCase() === email.toLowerCase());
      return { exists, error: null };
    } catch (error) {
      console.error('Error checking newsletter subscriber:', error);
      return { exists: false, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  // Insert a new newsletter subscriber
  insert: (email: string): { error: Error | null } => {
    try {
      // First check if email already exists
      const { exists, error } = newsletterSubscribers.emailExists(email);
      if (error) throw error;
      if (exists) {
        return { error: new Error('Email already subscribed') };
      }
      
      const collection = initializeCollection<NewsletterSubscriber>('newsletterSubscribers');
      
      // Create new subscriber with ID and timestamp
      const newSubscriber: NewsletterSubscriber = {
        id: generateId(),
        email,
        created_at: new Date().toISOString(),
      };
      
      // Add to collection
      collection.items.push(newSubscriber);
      collection.nextId++;
      
      // Save back to local storage
      saveCollection('newsletterSubscribers', collection);
      
      return { error: null };
    } catch (error) {
      console.error('Error inserting newsletter subscriber:', error);
      return { error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  // Get all newsletter subscribers
  getAll: (): { data: NewsletterSubscriber[], error: Error | null } => {
    try {
      const collection = initializeCollection<NewsletterSubscriber>('newsletterSubscribers');
      return { data: collection.items, error: null };
    } catch (error) {
      console.error('Error getting newsletter subscribers:', error);
      return { data: [], error: error instanceof Error ? error : new Error('Unknown error') };
    }
  }
};

// Function to check if local storage is available
export const checkLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test_storage__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};