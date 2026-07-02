export type TabId = 'home' | 'about' | 'menu' | 'gallery' | 'reservations' | 'contact' | 'faq' | 'admin';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'breakfast' | 'pastries' | 'desserts';
  tags: string[]; // e.g. ['Vegan', 'Gluten-Free', 'Staff Pick', 'Hot', 'Iced']
  image: string;
  customizable?: boolean;
}

export interface CustomizationOption {
  name: string;
  choices: string[];
  additionalCost?: { [choice: string]: number };
}

export interface CartItem {
  id: string; // unique cart item id
  menuItem: MenuItem;
  customizations: {
    size?: 'Regular' | 'Large';
    milk?: 'Whole' | 'Oat' | 'Almond' | 'None';
    sweetness?: 'Regular' | 'Less' | 'None';
    extra?: string[];
  };
  quantity: number;
  price: number;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  x: number; // percentage coordinate on layout
  y: number; // percentage coordinate on layout
  type: 'booth' | 'window' | 'standard' | 'bar';
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequest?: string;
  tableId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  fact: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
