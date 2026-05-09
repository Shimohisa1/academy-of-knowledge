export interface Course {
  id: string;
  title: string;
  category: string;
  hours: number;
  rating: number;
  students: number;
  instructor: string;
  price: number;
  monthlyPrice: number;
  format: 'Полностью дистанционно' | 'Очно-заочно';
  document: string;
  image: string;
  description: string;
  instructorFullName: string;
  instructorTitle: string;
  instructorExperience: string;
  modules: Module[];
  benefits: string[];
  months: number;
  tags: string[];
}

export interface Module {
  number: number;
  title: string;
  topics: string[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
}

export interface Term {
  term: string;
  category: string;
  definition: string;
}

export interface Webinar {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  image: string;
  videoId: string;
}

export interface Question {
  id: number;
  question: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
}
