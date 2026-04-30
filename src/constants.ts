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
];export const MOCK_VIDEOS: InfoPost[] = [
  {
    id: 'v1',
    title: 'Immersion : Au cœur d\'une rédaction en direct',
    description: 'Vibrez au rythme d\'une info qui tombe. Les coulisses de l\'info.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    content: '',
    duration: '04:20',
    author: 'Rédaction CollectInfos',
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
    content: '',
    duration: '12:15',
    author: 'Rédaction CollectInfos',
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
    content: '',
    duration: '08:45',
    author: 'M. SOUARÉ',
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
    content: '',
    duration: '05:30',
    author: 'Rédaction CollectInfos',
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
    description: 'Rencontre avec la nouvelle génération de développeurs à Conakry.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    content: '',
    duration: '07:15',
    author: 'Rédaction CollectInfos',
    date: '2026-04-16T11:00:00Z',
    image: 'https://picsum.photos/seed/tech1/800/450',
    category: 'Technologie',
    status: 'published',
    price: 220,
    tags: ['Tech', 'Innovation', 'Guinée']
  },
  {
    id: 'v6',
    title: 'Culture : Le retour des masques sacrés',
    description: 'Un reportage exclusif sur les traditions ancestrales en forêt.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    content: '',
    duration: '10:45',
    author: 'M. SOUARÉ',
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
    content: '',
    duration: '14:20',
    author: 'Rédaction CollectInfos',
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
    content: '',
    duration: '09:15',
    author: 'Service Sport',
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
    content: '',
    duration: '06:40',
    author: 'M. SOUARÉ',
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
    content: '',
    duration: '11:20',
    author: 'Rédaction CollectInfos',
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
    content: '',
    duration: '13:50',
    author: 'Rédaction CollectInfos',
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
    content: '',
    duration: '05:15',
    author: 'Rédaction CollectInfos',
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
    id: 'u4',
    name: 'Média Partenaire',
    role: 'MEDIAS',
    avatar: 'https://picsum.photos/seed/media/200',
    bio: 'Diffuseur de contenus audiovisuels certifiés sur CollectInfos.',
    stats: { posts: 120, followers: 5000, following: 45 }
  },
  {
    id: 'c1',
    name: 'Moussa Sylla',
    role: 'CORRESPONDANT',
    avatar: 'https://picsum.photos/seed/moussa/200',
    bio: 'Correspondant passionné basé à Kankan, couvrant l\'actualité régionale.',
    stats: { posts: 34, followers: 850, following: 120 }
  },
  {
    id: 'c2',
    name: 'Fatima Camara',
    role: 'JOURNALISTE',
    avatar: 'https://picsum.photos/seed/fatima/200',
    bio: 'Journaliste d\'investigation spécialisée dans les questions sociales et environnementales.',
    stats: { posts: 56, followers: 1200, following: 230 }
  },
  {
    id: 'c3',
    name: 'Moussa Camara',
    role: 'PIGISTE',
    avatar: 'https://picsum.photos/seed/moussa2/200',
    bio: 'Reporter d\'images indépendant, toujours au cœur de l\'action.',
    stats: { posts: 12, followers: 450, following: 80 }
  },
  {
    id: 'u5',
    name: 'M. SOUARÉ',
    role: 'ADMIN',
    avatar: 'https://picsum.photos/seed/admin/200',
    bio: 'Administrateur de la plateforme CollectInfos.',
    stats: { posts: 0, followers: 0, following: 0 }
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
  author: ['Rédaction', 'M. SOUARÉ', 'Equipe CollectInfos', 'Rédaction'][i % 4],
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

export const COUNTRIES = [
  { name: 'Afrique du Sud', emoji: '🇿🇦', code: 'ZA', dialCode: '+27' },
  { name: 'Algérie', emoji: '🇩🇿', code: 'DZ', dialCode: '+213' },
  { name: 'Angola', emoji: '🇦🇴', code: 'AO', dialCode: '+244' },
  { name: 'Bénin', emoji: '🇧🇯', code: 'BJ', dialCode: '+229' },
  { name: 'Botswana', emoji: '🇧🇼', code: 'BW', dialCode: '+267' },
  { name: 'Burkina Faso', emoji: '🇧🇫', code: 'BF', dialCode: '+226' },
  { name: 'Burundi', emoji: '🇧🇮', code: 'BI', dialCode: '+257' },
  { name: 'Cameroun', emoji: '🇨🇲', code: 'CM', dialCode: '+237' },
  { name: 'Cap-Vert', emoji: '🇨🇻', code: 'CV', dialCode: '+238' },
  { name: 'Comores', emoji: '🇰🇲', code: 'KM', dialCode: '+269' },
  { name: 'Congo-Brazzaville', emoji: '🇨🇬', code: 'CG', dialCode: '+242' },
  { name: 'Congo-Kinshasa', emoji: '🇨🇩', code: 'CD', dialCode: '+243' },
  { name: 'Côte d’Ivoire', emoji: '🇨🇮', code: 'CI', dialCode: '+225' },
  { name: 'Djibouti', emoji: '🇩🇯', code: 'DJ', dialCode: '+253' },
  { name: 'Égypte', emoji: '🇪🇬', code: 'EG', dialCode: '+20' },
  { name: 'Érythrée', emoji: '🇪🇷', code: 'ER', dialCode: '+291' },
  { name: 'Eswatini', emoji: '🇸🇿', code: 'SZ', dialCode: '+268' },
  { name: 'Éthiopie', emoji: '🇪🇹', code: 'ET', dialCode: '+251' },
  { name: 'Gabon', emoji: '🇬🇦', code: 'GA', dialCode: '+241' },
  { name: 'Gambie', emoji: '🇬🇲', code: 'GM', dialCode: '+220' },
  { name: 'Ghana', emoji: '🇬🇭', code: 'GH', dialCode: '+233' },
  { name: 'Guinée', emoji: '🇬🇳', code: 'GN', dialCode: '+224' },
  { name: 'Guinée équatoriale', emoji: '🇬🇶', code: 'GQ', dialCode: '+240' },
  { name: 'Guinée-Bissau', emoji: '🇬🇼', code: 'GW', dialCode: '+245' },
  { name: 'Kenya', emoji: '🇰🇪', code: 'KE', dialCode: '+254' },
  { name: 'Lesotho', emoji: '🇱🇸', code: 'LS', dialCode: '+266' },
  { name: 'Libéria', emoji: '🇱🇷', code: 'LR', dialCode: '+231' },
  { name: 'Libye', emoji: '🇱🇾', code: 'LY', dialCode: '+218' },
  { name: 'Madagascar', emoji: '🇲🇬', code: 'MG', dialCode: '+261' },
  { name: 'Malawi', emoji: '🇲🇼', code: 'MW', dialCode: '+265' },
  { name: 'Mali', emoji: '🇲🇱', code: 'ML', dialCode: '+223' },
  { name: 'Maroc', emoji: '🇲🇦', code: 'MA', dialCode: '+212' },
  { name: 'Maurice', emoji: '🇲🇺', code: 'MU', dialCode: '+230' },
  { name: 'Mauritanie', emoji: '🇲🇷', code: 'MR', dialCode: '+222' },
  { name: 'Mozambique', emoji: '🇲🇿', code: 'MZ', dialCode: '+258' },
  { name: 'Namibie', emoji: '🇳🇦', code: 'NA', dialCode: '+264' },
  { name: 'Niger', emoji: '🇳🇪', code: 'NE', dialCode: '+227' },
  { name: 'Nigéria', emoji: '🇳🇬', code: 'NG', dialCode: '+234' },
  { name: 'Ouganda', emoji: '🇺🇬', code: 'UG', dialCode: '+256' },
  { name: 'République centrafricaine', emoji: '🇨🇫', code: 'CF', dialCode: '+236' },
  { name: 'Rwanda', emoji: '🇷🇼', code: 'RW', dialCode: '+250' },
  { name: 'São Tomé-et-Principe', emoji: '🇸🇹', code: 'ST', dialCode: '+239' },
  { name: 'Sénégal', emoji: '🇸🇳', code: 'SN', dialCode: '+221' },
  { name: 'Seychelles', emoji: '🇸🇨', code: 'SC', dialCode: '+248' },
  { name: 'Sierra Leone', emoji: '🇸🇱', code: 'SL', dialCode: '+232' },
  { name: 'Somalie', emoji: '🇸🇴', code: 'SO', dialCode: '+252' },
  { name: 'Soudan', emoji: '🇸🇩', code: 'SD', dialCode: '+249' },
  { name: 'Soudan du Sud', emoji: '🇸🇸', code: 'SS', dialCode: '+211' },
  { name: 'Tanzanie', emoji: '🇹🇿', code: 'TZ', dialCode: '+255' },
  { name: 'Tchad', emoji: '🇹🇩', code: 'TD', dialCode: '+235' },
  { name: 'Togo', emoji: '🇹🇬', code: 'TG', dialCode: '+228' },
  { name: 'Tunisie', emoji: '🇹🇳', code: 'TN', dialCode: '+216' },
  { name: 'Zambie', emoji: '🇿🇲', code: 'ZM', dialCode: '+260' },
  { name: 'Zimbabwe', emoji: '🇿🇼', code: 'ZW', dialCode: '+263' }
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'Afrique du Sud': ['Johannesburg', 'Le Cap', 'Durban', 'Pretoria', 'Port Elizabeth'],
  'Algérie': ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Sétif'],
  'Angola': ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'],
  'Bénin': ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  'Botswana': ['Gaborone', 'Francistown', 'Molepolole', 'Selebi-Phikwe'],
  'Burkina Faso': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora'],
  'Burundi': ['Gitega', 'Bujumbura', 'Muyinga', 'Ngozi'],
  'Cameroun': ['Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Garoua', 'Maroua'],
  'Cap-Vert': ['Praia', 'Mindelo', 'Santa Maria'],
  'Comores': ['Moroni', 'Mutsamudu', 'Fomboni'],
  'Congo-Brazzaville': ['Brazzaville', 'Pointe-Noire', 'Dolisie'],
  'Congo-Kinshasa': ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Goma', 'Kananga', 'Kisangani'],
  'Côte d’Ivoire': ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'Korhogo', 'San-Pédro', 'Gagnoa'],
  'Djibouti': ['Djibouti', 'Ali Sabieh', 'Tadjourah'],
  'Égypte': ['Le Caire', 'Alexandrie', 'Gizeh', 'Choubra El Kheima', 'Port-Saïd'],
  'Érythrée': ['Asmara', 'Assab', 'Massaoua'],
  'Eswatini': ['Mbabane', 'Manzini'],
  'Éthiopie': ['Addis-Abeba', 'Dire Dawa', 'Adama', 'Gondar', 'Mekele'],
  'Gabon': ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem'],
  'Gambie': ['Banjul', 'Serekunda', 'Brikama'],
  'Ghana': ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  'Guinée': ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé', 'Mamou', 'Guéckédou', 'Faranah', 'Coyah', 'Boké', 'Siguiri', 'Pita', 'Dalaba', 'Gaoual', 'Koundara', 'Lola', 'Yomou', 'Beyla', 'Macenta', 'Dinguiraye', 'Dabola', 'Kouroussa', 'Kerouane', 'Mandiana', 'Kissidougou', 'Tougué', 'Mali', 'Koubia', 'Lélouma', 'Télimélé', 'Boffa', 'Fria', 'Dubreka', 'Forécariah'],
  'Guinée équatoriale': ['Malabo', 'Bata', 'Ebebiyín'],
  'Guinée-Bissau': ['Bissau', 'Bafatá', 'Gabú'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  'Lesotho': ['Maseru', 'Teyateyaneng'],
  'Libéria': ['Monrovia', 'Gbarnga', 'Kakata'],
  'Libye': ['Tripoli', 'Benghazi', 'Misrata', 'Al Bayda'],
  'Madagascar': ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'],
  'Malawi': ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba'],
  'Mali': ['Bamako', 'Sikasso', 'Kayes', 'Ségou', 'Mopti', 'Koutiala', 'Gao'],
  'Maroc': ['Casablanca', 'Fès', 'Tanger', 'Marrakech', 'Salé', 'Rabat', 'Meknès', 'Oujda', 'Agadir'],
  'Maurice': ['Port-Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix'],
  'Mauritanie': ['Nouakchott', 'Nouadhibou', 'Kiffa'],
  'Mozambique': ['Maputo', 'Matola', 'Beira', 'Nampula'],
  'Namibie': ['Windhoek', 'Walvis Bay', 'Swakopmund'],
  'Niger': ['Niamey', 'Zinder', 'Maradi', 'Tahoua', 'Agadez'],
  'Nigéria': ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt', 'Benin City', 'Kaduna'],
  'Ouganda': ['Kampala', 'Nansana', 'Kira', 'Ssabagabo'],
  'République centrafricaine': ['Bangui', 'Bimbo', 'Berbérati'],
  'Rwanda': ['Kigali', 'Butare', 'Gisenyi'],
  'São Tomé-et-Principe': ['São Tomé', 'Trindade'],
  'Sénégal': ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack', 'Mbour', 'Saint-Louis', 'Ziguinchor'],
  'Seychelles': ['Victoria'],
  'Sierra Leone': ['Freetown', 'Kenema', 'Bo'],
  'Somalie': ['Mogadiscio', 'Hargeisa', 'Berbera'],
  'Soudan': ['Khartoum', 'Omdurman', 'Nyala', 'Port-Soudan'],
  'Soudan du Sud': ['Juba', 'Yei', 'Wau'],
  'Tanzanie': ['Dar es Salam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  'Tchad': ['N\'Djaména', 'Moundou', 'Sarh', 'Abéché'],
  'Togo': ['Lomé', 'Sokodé', 'Kara', 'Atakpamé'],
  'Tunisie': ['Tunis', 'Sfax', 'Sousse', 'Ettadhamen', 'Kairouan'],
  'Zambie': ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe'],
  'Zimbabwe': ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare']
};

export const TERMS_TEXT = `
# CONTRAT DE PRESTATION DE SERVICES ET D’UTILISATION – COLLECTINFOS.COM

### ENTRE LES SOUSSIGNÉS :

**La société Collectinfos.com**, au capital de 5 000 €, immatriculée au Registre du Commerce et des Sociétés de Conakry sous le numéro RCCM GN.TCC.2025.A.10149, dont le siège social est situé à Sonfonia, représentée par Mamadou Mouctar SOUARÉ en sa qualité de CEO, exploitant la plateforme « collectinfos.com ».

Ci-après désignée « collectinfos.com »,

**D’UNE PART**,

**ET :**

**L’Utilisateur**, agissant soit en qualité de Journaliste (Vendeur), soit en qualité de Média (Acheteur), tel qu'identifié lors de sa demande d'inscription et de la création de son compte personnel sur le site collectinfos.com.

Ci-après désigné « l’Utilisateur »,

**D’AUTRE PART**.

---

### PRÉAMBULE
La plateforme collectinfos.com est un espace numérique sécurisé de mise en relation dont l'objet est de permettre aux journalistes de commercialiser des contenus vidéo auprès de diffuseurs médias. Le présent contrat définit les conditions techniques, financières et juridiques de cette collaboration.

**IL A ÉTÉ ARRÊTÉ ET CONVENU CE QUI SUIT :**

---

## TITRE I : CONDITIONS APPLICABLES AUX JOURNALISTES (VENDEURS)

### Article 1 – Objet du service
La Plateforme permet aux journalistes indépendants ou professionnels de publier, promouvoir et vendre des contenus vidéo originaux à des entités médiatiques.

### Article 2 – Inscription et Identité
Le Journaliste s’engage à fournir des informations exactes et actualisées (identité, statut professionnel, coordonnées). Il est seul responsable de la sécurité et de la confidentialité de ses identifiants d’accès.

### Article 3 – Propriété Intellectuelle et Garanties
Le Journaliste garantit être le titulaire exclusif des droits d'auteur sur les vidéos publiées. Il garantit que ses contenus ne violent aucun droit de tiers (droit à l'image, vie privée) et sont conformes aux lois en vigueur.

### Article 4 – Licence accordée à la Plateforme
Pour les besoins du service, le Journaliste accorde à la Plateforme une licence non exclusive d'hébergement, de reproduction technique et de promotion des contenus sur le site collectinfos.com.

### Article 5 – Commercialisation et Prix
Le Journaliste fixe le prix de vente de ses contenus ou accepte la grille tarifaire proposée par la Plateforme. Il peut proposer des contenus finalisés ou répondre à des commandes spécifiques.

### Article 6 – Commission
En contrepartie de ses services de mise en relation et d'outils techniques, la Plateforme prélève une commission de 30 % sur le montant brut de chaque vente réalisée.

### Article 7 – Obligations Déontologiques
Le Journaliste s’engage à fournir des contenus vérifiés, authentiques et à respecter les règles éthiques du journalisme. Toute diffusion délibérée de fausses informations est strictement interdite.

---

## TITRE II : CONDITIONS APPLICABLES AUX MÉDIAS (ACHETEURS)

### Article 8 – Objet de l’accès
La Plateforme permet aux Médias d’acquérir des droits de diffusion sur des vidéos existantes ou de commander des reportages spécifiques auprès des Journalistes inscrits.

### Article 9 – Licence d’utilisation
L’achat d’un contenu via la Plateforme confère au Média une licence d’exploitation. Les paramètres de cette licence (durée, territoire, exclusivité) doivent être expressément définis lors de la transaction.

### Article 10 – Commandes Personnalisées
Le Média peut publier des appels d'offres. Les conditions de réalisation (prix, délai, format) doivent faire l'objet d'un accord mutuel entre le Média et le Journaliste avant le début de l'exécution.

### Article 11 – Modalités de Paiement
Les transactions sont effectuées via le systeme de paiement sécurisé de la Plateforme. Les fonds peuvent être bloqués jusqu'à la livraison effective du contenu et libérés après validation par le Média.

### Article 12 – Responsabilité Éditoriale
Le Média est seul responsable de l'usage et de la diffusion des contenus acquis. Il lui incombe de vérifier la conformité du contenu avec la réglementation relative à la communication audiovisuelle avant toute diffusion.

---

## TITRE III : DISPOSITIONS COMMUNES

### Article 13 – Responsabilité de la Plateforme
La Plateforme agit en tant que simple intermédiaire technique. Sa responsabilité ne saurait être engagée quant au contenu des vidéos, à l'exactitude des informations transmises ou au non-respect des engagements contractuels entre le Journaliste et le Média.

### Article 14 – Retrait de Contenu et Modération
La Plateforme se réserve le droit de retirer sans préavis tout contenu illégal, diffamatoire, trompeur ou portant atteinte aux droits de propriété intellectuelle.

### Article 15 – Résiliation et Suspension
Tout manquement aux présentes obligations (fraude, non-paiement, violation des droits de tiers, diffusion de contenus illicites) pourra entraîner la suspension immédiate ou la fermeture définitive du compte de l'Utilisateur.

### Article 16 – Droit Applicable et Litiges
Le présent contrat est soumis au droit de la République de Guinée. En cas de litige, et après tentative de médiation par la Plateforme, les tribunaux de Conakry seront seuls compétents.

---

**Fait à Conakry, le 25 Avril 2026**

*(Signature précédée de la mention "Lu et approuvé" pour l'Utilisateur lors de son inscription numérique)*
`;
