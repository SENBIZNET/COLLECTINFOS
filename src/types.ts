export type Currency = 'EUR' | 'USD' | 'XOF' | 'GNF';

export interface ExchangeRates {
  [key: string]: number;
}

export interface InfoPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image?: string;
  videoUrl?: string;
  duration?: string;
  price?: number;
  status: 'published' | 'pending' | 'draft' | 'sold';
  tags: string[];
}

export type Category = 'Experts' | 'Médias' | 'Organisations' | 'Particuliers';

export type UserRole = 'ADMIN' | 'JOURNALISTE' | 'CORRESPONDANT' | 'PIGISTE' | 'MEDIAS' | 'VISITEUR';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  bio: string;
  wallet?: {
    balance: number;
    pendingPayouts: number;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface OrderRequest {
  id: string;
  clientId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}
