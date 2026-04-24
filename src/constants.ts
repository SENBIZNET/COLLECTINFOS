import { InfoPost, Category, UserProfile } from './types';

export const CATEGORIES: Category[] = ['Experts', 'Particuliers', 'Médias', 'Organisations'];

export const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.957,
  GNF: 9300
};

export const TICKER_IMAGES = [
  '/uploads/NT.jpeg',
  '/uploads/Star.jpeg',
  '/uploads/Jolibatv.jpeg',
  '/uploads/Media-Afrique.jpeg',
  '/uploads/Kabak.jpeg',
  '/uploads/RTG.jpeg',
  '/uploads/rtgb.jpg',
  '/uploads/telemaroc.jpg',
  '/uploads/itv.png',
  '/uploads/rts.jpg',
  '/uploads/logo1.png'
];
export const MOCK_VIDEOS = [
  {
    id: 'v1',
    title: 'Immersion : Au cœur d\'une rédaction en direct',
    description: 'Vibrez au rythme d\'une info qui tombe. Les coulisses de l\'info.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: 'Equipe Rédaction',
    date: '2026-04-20T10:00:00Z',
    image: 'https://picsum.photos/seed/live1/800/450',
    category: 'Actualités',
    status: 'published',
    price: 350,
    tags: ['Direct', 'Coulisses', 'Journalisme']
  },
  {
    id: 'v2',
    title: 'Reportage : Les secrets de la ville interdite',
    description: 'Une enquête exclusive sur les lieux inaccessibles au public.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    author: 'Jean Reporter',
    date: '2026-04-19T14:30:00Z',
    image: 'https://picsum.photos/seed/reportage1/800/450',
    category: 'Reportages',
    status: 'published',
    price: 490,
    tags: ['Enquête', 'Exclusif', 'Mystère']
  },
  {
    id: 'v3',
    title: 'Analyse : L\'impact du climat sur l\'économie',
    description: 'Le point avec nos experts sur les nouveaux défis mondiaux.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    author: 'Marie Expert',
    date: '2026-04-18T09:15:00Z',
    image: 'https://picsum.photos/seed/climat1/800/450',
    category: 'Experts',
    status: 'published',
    price: 250,
    tags: ['Climat', 'Economie', 'Analyse']
  },
  {
    id: 'v4',
    title: 'Santé : Vers un vaccin contre le paludisme ?',
    description: 'Les avancées scientifiques majeures observées dans la sous-région.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    author: 'Dr. Keita',
    date: '2026-04-17T16:45:00Z',
    image: 'https://picsum.photos/seed/health1/800/450',
    category: 'Science',
    status: 'published',
    price: 180,
    tags: ['Santé', 'Science', 'Afrique']
  },
  {
    id: 'v5',
    title: 'Tech : Les talents du code guinéen',
    description: 'Rencontre avec les développeurs qui façonnent le futur numérique.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    author: 'Amadou Tech',
    date: '2026-04-16T11:00:00Z',
    image: 'https://picsum.photos/seed/techcode/800/450',
    category: 'Technologie',
    status: 'published',
    price: 320,
    tags: ['Tech', 'Coding', 'Guinée']
  },
  {
    id: 'v6',
    title: 'Culture : Le retour des masques sacrés',
    description: 'Un reportage exclusif sur les traditions ancestrales en forêt.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    author: 'Fatoumata Culture',
    date: '2026-04-15T13:20:00Z',
    image: 'https://picsum.photos/seed/culture1/800/450',
    category: 'Culture',
    status: 'published',
    price: 200,
    tags: ['Tradition', 'Art', 'Culture']
  },
  {
    id: 'v7',
    title: 'Économie : Le boom minier en Haute-Guinée',
    description: 'Analyse des nouvelles zones d\'exploitation aurifère.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: 'Moussa Eco',
    date: '2026-04-14T10:00:00Z',
    image: 'https://picsum.photos/seed/mine1/800/450',
    category: 'Économie',
    status: 'published',
    price: 550,
    tags: ['Mines', 'Or', 'Guinée']
  },
  {
    id: 'v8',
    title: 'Sport : Préparation du Syli pour la CAN',
    description: 'Dans les vestiaires de l\'équipe nationale avant le grand tournoi.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    author: 'Alpha Sport',
    date: '2026-04-13T17:00:00Z',
    image: 'https://picsum.photos/seed/syli1/800/450',
    category: 'Sport',
    status: 'published',
    price: 450,
    tags: ['Foot', 'Syli', 'CAN']
  },
  {
    id: 'v9',
    title: 'Environnement : Alerte sur la mangrove',
    description: 'Les dangers de l\'urbanisation sauvage sur le littoral de Conakry.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    author: 'Mariam Vert',
    date: '2026-04-12T08:30:00Z',
    image: 'https://picsum.photos/seed/mangrove/800/450',
    category: 'Environnement',
    status: 'published',
    price: 300,
    tags: ['Nature', 'Climat', 'Littoral']
  },
  {
    id: 'v10',
    title: 'Société : Les femmes du port de Boulbinet',
    description: 'Une journée avec les fumeuses de poisson de la capitale.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    author: 'Hadja Camara',
    date: '2026-04-11T09:00:00Z',
    image: 'https://picsum.photos/seed/port/800/450',
    category: 'Société',
    status: 'published',
    price: 150,
    tags: ['Social', 'Femmes', 'Métier']
  },
  {
    id: 'v11',
    title: 'Infrastructure : Les défis du trans-forestier',
    description: 'L\'avancement du projet rail Simandou-Conakry.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    author: 'Oumar Rail',
    date: '2026-04-10T12:00:00Z',
    image: 'https://picsum.photos/seed/rail/800/450',
    category: 'Infrastructure',
    status: 'published',
    price: 600,
    tags: ['Rail', 'Logistique', 'Projet']
  },
  {
    id: 'v12',
    title: 'Politique : Dialogue national en vue',
    description: 'Les enjeux des prochaines assises de la réconciliation.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    author: 'Politico GN',
    date: '2026-04-09T18:00:00Z',
    image: 'https://picsum.photos/seed/polity/800/450',
    category: 'Politique',
    status: 'published',
    price: 280,
    tags: ['Politique', 'État', 'Union']
  }
];

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'u1',
    name: 'Jean Reporter',
    role: 'JOURNALISTE',
    avatar: 'https://picsum.photos/seed/journalist/200',
    bio: 'Journaliste d\'investigation spécialisé en technologies émergentes.',
    wallet: { balance: 1250.50, pendingPayouts: 450.00 },
    stats: { posts: 89, followers: 3400, following: 120 }
  },
  {
    id: 'u2',
    name: 'Moussa Sylla',
    role: 'CORRESPONDANT',
    avatar: 'https://picsum.photos/seed/correspondent/200',
    bio: 'Correspondant régional basé à Conakry, couvrant l\'actualité politique.',
    stats: { posts: 45, followers: 850, following: 30 }
  },
  {
    id: 'u3',
    name: 'Fatima Camara',
    role: 'PIGISTE',
    avatar: 'https://picsum.photos/seed/freelance/200',
    bio: 'Journaliste pigiste passionnée par les enjeux environnementaux et sociaux.',
    stats: { posts: 12, followers: 420, following: 15 }
  }
];

export const MOCK_INFOS: InfoPost[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `info-${i + 1}`,
  title: [
    'L\'IA Générative en 2026 : Au-delà du Texte',
    'Exploration Spatiale : Cap sur Titan',
    'Biodiversité : Les forêts de Guinée protégées',
    'Économie : Nouveau record pour l\'exportation de bauxite',
    'Culture : Le Nimba fête ses 100 ans',
    'Sport : Infrastructures en marche pour la CAN',
    'Santé : Campagne nationale de vaccination',
    'Éducation : Numérisation des diplômes d\'État',
    'Infrastructure : Pont de Tanéné, les travaux avancent',
    'Météo : Prévisions saisonnières pour l\'hivernage',
    'Social : Les aides aux jeunes entrepreneurs',
    'Tourisme : Découvrez les îles de Loos'
  ][i % 12] + (i >= 12 ? ' (Suite)' : ''),
  description: i % 3 === 0 
    ? 'Une analyse profonde sur les transformations actuelles.' 
    : 'Les points clés à retenir pour comprendre les enjeux de demain.',
  content: 'Contenu détaillé de l\'article...',
  category: ['Experts', 'Organisations', 'Particuliers', 'Médias'][i % 4] as Category,
  author: ['Admin Principal', 'Jean Reporter', 'Equipe Rédaction', 'Marie Legrand'][i % 4],
  date: `${15 + (i % 10)} Avril 2026`,
  image: `https://picsum.photos/seed/info${i}/800/450`,
  price: i % 5 === 0 ? 15 : undefined,
  status: 'published',
  tags: [['AI', 'Innovation'], ['Espace', 'Science'], ['Nature', 'Ecologie'], ['Economie', 'Bourse']][i % 4]
}));

export const MOCK_MARKETPLACE: InfoPost[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `m${i + 1}`,
  title: [
    'Crise de l\'eau au Cap : Les solutions',
    'Le futur de la Blockchain en Afrique',
    'Crash Test : Nouvel Avion Electrique',
    'Agriculture : Drones et IA',
    'Économie : La montée du Franc Guinéen',
    'Santé : La télémédecine en zone rurale',
    'Sport : Les espoirs du Syli National',
    'Culture : Festival des Arts de Guinée',
    'Énergie : Le solaire domestique décolle',
    'Éducation : Le code à l\'école primaire',
    'Justice : Réforme du système judiciaire',
    'Transport : Les nouveaux bus de Conakry'
  ][i % 12] + (i >= 12 ? ' (Partie 2)' : ''),
  description: i % 2 === 0 
    ? 'Une enquête approfondie sur les changements majeurs de cette année.' 
    : 'Documentaire exclusif avec des témoignages inédits sur le terrain.',
  content: '',
  category: ['Particuliers', 'Médias', 'Experts', 'Organisations'][i % 4] as Category,
  author: ['Marie Legrand', 'Thomas Dev', 'Luc Sky', 'Dr. Diallo'][i % 4],
  date: `${10 + (i % 10)} Avril 2026`,
  image: `https://picsum.photos/seed/market${i}/800/600`,
  status: 'published',
  videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  duration: `${Math.floor(Math.random() * 15) + 3}:45`,
  price: (Math.floor(Math.random() * 80) + 20) * 10,
  tags: [['Impact', 'Social'], ['Tech', 'Innovation'], ['Economie', 'Finance'], ['Culture', 'Tradition']][i % 4]
}));
