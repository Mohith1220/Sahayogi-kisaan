export interface Society {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  inventory: InventoryItem[];
  rating?: number;
  reviewCount?: number;
  schemes?: GovernmentScheme[];
  weatherInfo?: WeatherInfo;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  lastUpdated: string;
  inStock: boolean;
  subsidyPrice?: number;
  subsidies?: {
    amount: number;
    percentage: number;
    description: string;
  }[];
}

export interface Review {
  id: string;
  societyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  lastDate: string;
  documentationRequired: string[];
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temperature: number;
  condition: string;
  rainfall: number;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
  likes: number;
  comments: ForumComment[];
  tags: string[];
}

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  userName: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferredLanguage: 'en' | 'hi' | 'kn';
  phone?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  manufacturer: string;
}