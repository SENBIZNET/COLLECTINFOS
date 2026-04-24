import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Menu, 
  X, 
  Plus, 
  ChevronRight, 
  Filter, 
  Clock, 
  User, 
  Tag,
  Info as InfoIcon,
  Newspaper,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Globe2,
  Building2,
  Users,
  Home,
  Compass,
  PlusCircle,
  CircleUser,
  ShieldCheck,
  Mic2,
  Tv2,
  Camera,
  Globe,
  ShoppingBag,
  Send,
  Play,
  Upload,
  Wallet,
  CheckCircle2,
  AlertCircle,
  FileText,
  LayoutDashboard,
  Video,
  DollarSign
} from 'lucide-react';
import { MOCK_INFOS, CATEGORIES, MOCK_PROFILES, MOCK_MARKETPLACE, EXCHANGE_RATES, MOCK_VIDEOS, TICKER_IMAGES } from './constants';
import { InfoPost, Category, UserProfile, UserRole, OrderRequest, Currency } from './types';

type AppView = 'HOME' | 'PROPOSE' | 'BUY' | 'ORDER' | 'DASHBOARD' | 'AUTH' | 'ADMIN_DASHBOARD' | 'SIGNUP' | 'CATEGORY_EXPLORER';

// Components
const Navbar = ({ onSearch, setView, currency, setCurrency }: { 
  onSearch: (val: string) => void, 
  setView: (v: AppView) => void,
  currency: Currency,
  setCurrency: (c: Currency) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-50 ${
      isScrolled ? 'py-3 shadow-sm' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/uploads/collectinfo.jpg" 
            alt="CollectInfos Logo" 
            className="w-10 h-10 object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">CollectInfos</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Découvrir</a>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Devise: <span className="font-black text-indigo-600">{currency}</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {(Object.keys(EXCHANGE_RATES) as Currency[]).map((c) => (
                <button 
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors ${currency === c ? 'text-indigo-600' : 'text-slate-500'}`}
                >
                  {c} {c === 'EUR' ? '(Base)' : ''}
                </button>
              ))}
            </div>
          </div>
          <a href="#" className="hover:text-indigo-600 transition-colors">À propos</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher une info..."
              className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm border-none focus:ring-2 focus:ring-indigo-500/20 w-48 lg:w-64 transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setView('AUTH')}
            className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all px-4"
          >
            Connexion
          </button>
          <button 
            onClick={() => setView('SIGNUP')}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </nav>
  );
};

const BottomMenu = ({ setView }: { setView: (v: AppView) => void }) => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-full p-2 flex items-center justify-around shadow-2xl shadow-slate-900/40">
        <button 
          onClick={() => setView('HOME')}
          className="flex flex-col items-center gap-1 p-2 text-white"
        >
          <Home size={20} />
          <span className="text-[10px] font-bold">Accueil</span>
        </button>
        <button 
          onClick={() => setView('BUY')}
          className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Compass size={20} />
          <span className="text-[10px] font-bold">Explorer</span>
        </button>
        <div className="relative -mt-10">
          <button 
            onClick={() => setView('PROPOSE')}
            className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 border-4 border-[#FDFDFF]"
          >
            <PlusCircle size={28} />
          </button>
        </div>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white transition-colors">
          <Search size={20} />
          <span className="text-[10px] font-bold">Recherche</span>
        </button>
        <button 
          onClick={() => setView('DASHBOARD')}
          className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <CircleUser size={20} />
          <span className="text-[10px] font-bold">Profil</span>
        </button>
      </div>
    </div>
  );
};

const HeroSlider = ({ setView }: { setView: (v: AppView) => void }) => {
  return (
    <section className="relative h-[600px] md:h-[750px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/uploads/0BAC1.jpg" 
          alt="Journalist with camera"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-sky-500/50 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-white/20 max-w-4xl shadow-2xl"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-widest mb-6"
          >
            COLLECTINFOS
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed italic"
          >
            "L'information, notre engagement.<br />
            Les journalistes, notre force."
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => setView('PROPOSE')}
              className="bg-indigo-600/80 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <Send size={18} />
              Proposez
            </button>
            <button 
              onClick={() => setView('BUY')}
              className="bg-indigo-600/80 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <ShoppingBag size={18} />
              Acheter
            </button>
            <button 
              onClick={() => setView('ORDER')}
              className="bg-indigo-600/80 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/20 shadow-lg"
            >
              <Camera size={18} />
              Commandez
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFDFF] to-transparent" />
    </section>
  );
};

const MarketplaceView = ({ onSelect, formatPrice }: { onSelect: (i: InfoPost) => void, formatPrice: (p: number) => string }) => {
  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Marché des Médias</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Contenus Disponibles</h3>
          <p className="text-slate-500 max-w-2xl">Parcourez les derniers reportages exclusifs, interviews et vidéos brutes disponibles à l'achat immédiat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_MARKETPLACE.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -8 }}
              onClick={() => onSelect(item)}
              className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase">
                    {item.duration}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-slate-900 uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <User size={14} />
                  {item.author}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="text-xl font-black text-indigo-600">{formatPrice(item.price || 0)}</div>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all">
                    Acheter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProposalForm = ({ onCancel }: { onCancel: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">Soumission Réussie !</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Votre contenu a été envoyé pour validation. L'administrateur a été notifié par email.</p>
          <button 
            onClick={onCancel}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-slate-50">
          <div className="mb-12">
            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Espace Journaliste</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Soumettre un Article</h3>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nom complet</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Jean Reporter" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email professionnel</label>
                <input required type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="jean@media.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Téléphone</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="+33 6 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Média / Agence</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Indépendant, AFP, etc." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Titre de l'article</label>
              <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Un titre accrocheur..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description / Synopsis</label>
              <textarea required rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" placeholder="Décrivez votre contenu en quelques lignes..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Catégorie</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Lieu</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Paris, France" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Durée (Vidéo)</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Ex: 05:30" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mots-clés</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Ex: politique, élection, Dakar" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Langue</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Français, Anglais, Wolof..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-2 group-hover:text-indigo-600 transition-colors">
                  <Video size={24} />
                </div>
                <p className="text-xs font-bold text-slate-900">Vidéo Brute</p>
                <input type="file" className="hidden" />
              </div>
              <div className="p-6 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-2 group-hover:text-indigo-600 transition-colors">
                  <Camera size={24} />
                </div>
                <p className="text-xs font-bold text-slate-900">Miniature</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <div className="flex items-center gap-3 py-4">
              <input type="checkbox" required className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500/20" />
              <p className="text-sm text-slate-500 font-medium tracking-tight leading-relaxed">
                Je certifie être l'auteur original de ce contenu et détenir l'intégralité des droits d'exploitation.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
              >
                Soumettre l'article
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const AuthForm = ({ type = 'LOGIN', onCancel, onNavigate }: { type?: 'LOGIN' | 'SIGNUP', onCancel: () => void, onNavigate: (v: AppView) => void }) => {
  const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>(type);
  const [role, setRole] = useState<UserRole>('JOURNALISTE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    mediaName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            {authType === 'LOGIN' ? 'Connexion réussie' : 'Inscription reçue !'}
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            {authType === 'LOGIN' 
              ? 'Bienvenue sur votre espace personnel. Vous allez être redirigé.' 
              : `Votre compte en tant que ${role === 'JOURNALISTE' ? 'correspondant' : role === 'MEDIAS' ? 'média' : 'staff'} est en attente de validation par nos équipes.`}
          </p>
          <button 
            onClick={() => {
              if (role === 'ADMIN' || authType === 'LOGIN') {
                onNavigate('ADMIN_DASHBOARD');
              } else {
                onCancel();
              }
            }}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            {authType === 'LOGIN' ? 'Accéder au Dashboard' : 'Retourner à l\'accueil'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-3xl mb-6 shadow-inner ring-1 ring-slate-100">
              <CircleUser size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {authType === 'LOGIN' ? 'Bon Retour' : 'Ouvrir un Compte'}
            </h3>
            <p className="text-slate-500 font-medium italic">CollectInfos : L'info brute, certifiée.</p>
          </div>

          <div className="flex p-1.5 bg-slate-100/50 rounded-2xl mb-8 overflow-x-auto no-scrollbar gap-1 border border-slate-100">
            {(['JOURNALISTE', 'MEDIAS', 'ADMIN'] as UserRole[]).map((r) => (
              <button 
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-wider ${role === r ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100/50 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {r === 'JOURNALISTE' ? 'Correspondant' : r === 'MEDIAS' ? 'Média' : 'Staff'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {authType === 'SIGNUP' ? (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                      {role === 'MEDIAS' ? 'Nom du Média / Organisation' : 'Nom & Prénom'}
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required 
                        className="w-full bg-slate-50 border border-transparent rounded-2xl pl-14 pr-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                        placeholder={role === 'MEDIAS' ? "ex: Agence 224" : "ex: Mamadou Diallo"} 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ville</label>
                      <input 
                        required 
                        className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                        placeholder="Ville"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Téléphone</label>
                      <input 
                        required 
                        type="tel"
                        className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                        placeholder="+224..."
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Identifiant (Email)</label>
              <div className="relative">
                <Send size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  required 
                  type="email" 
                  className="w-full bg-slate-50 border border-transparent rounded-2xl pl-14 pr-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mot de Passe</label>
              <div className="relative">
                <ShieldCheck size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  required 
                  type="password" 
                  className="w-full bg-slate-50 border border-transparent rounded-2xl pl-14 pr-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                  placeholder="Minimum 8 caractères"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {authType === 'SIGNUP' && (
              <label className="flex items-start gap-3 px-4 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30" />
                <span className="text-[11px] text-slate-500 leading-tight group-hover:text-slate-900 transition-colors">
                  En créant mon compte, je certifie que les informations fournies sont exactes et j'accepte les <span className="text-indigo-600 font-bold decoration-indigo-200 underline">CGU</span>.
                </span>
              </label>
            )}

            <button className="relative w-full bg-slate-900 text-white py-4 rounded-[1.8rem] font-black hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-100 mt-6 uppercase tracking-[0.15em] text-sm overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {authType === 'LOGIN' ? 'Accéder' : 'Lancer l\'inscription'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>

            <div className="pt-6 border-t border-slate-50">
              <button 
                type="button"
                onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                className="w-full text-center py-2 group"
              >
                <span className="text-sm text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                  {authType === 'LOGIN' ? "Pas encore de compte ?" : "Déjà membre ?"}
                </span>
                <span className="ml-2 text-sm text-indigo-600 font-black decoration-indigo-200 group-hover:underline transition-all">
                  {authType === 'LOGIN' ? "Inscrivez-vous" : "Connectez-vous"}
                </span>
              </button>
            </div>
          </form>

          <button 
            onClick={onCancel}
            className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const AdminDashboard = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <section className="py-24 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Supervision</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Panneau d'Administration</h3>
          </div>
          <button onClick={onCancel} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            Quitter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Utilisateurs', value: '2,845', icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Infos en attente', value: '42', icon: Clock, color: 'bg-amber-50 text-amber-600' },
            { label: 'Ventes du mois', value: '12,450 €', icon: Wallet, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Signalements', value: '3', icon: AlertCircle, color: 'bg-red-50 text-red-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon size={24} />
              </div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 p-10">
            <h4 className="text-xl font-black text-slate-900 mb-8">Dernières Activités</h4>
            <div className="space-y-6">
              {[
                { user: 'Jean Reporter', action: 'a soumis un nouveau reportage', time: 'Il y a 5 min' },
                { user: 'Globe News', action: 'a acheté une interview exclusive', time: 'Il y a 12 min' },
                { user: 'Marie Legrand', action: 'a mis à jour son profil expert', time: 'Il y a 45 min' },
                { user: 'Thomas Dev', action: 'a retiré ses gains (450 €)', time: 'Il y a 1h' }
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-xs uppercase">
                      {act.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{act.user} <span className="font-medium text-slate-400">{act.action}</span></p>
                      <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">{act.time}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white">
            <h4 className="text-xl font-black mb-8">Actions Rapides</h4>
            <div className="space-y-4">
              {[
                { label: 'Modérer les contenus', icon: ShieldCheck },
                { label: 'Gérer les paiements', icon: DollarSign },
                { label: 'Envoyer newsletter', icon: Send },
                { label: 'Paramètres système', icon: LayoutDashboard }
              ].map((action, i) => (
                <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left">
                  <action.icon size={20} className="text-indigo-400" />
                  <span className="text-sm font-bold">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderForm = ({ onCancel }: { onCancel: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">Commande Envoyée !</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Votre demande de reportage a été transmise à notre équipe. Une copie vous a été envoyée par email.</p>
          <button 
            onClick={onCancel}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-slate-50">
          <div className="mb-12">
            <h2 className="text-sm font-black tracking-[0.2em] text-emerald-600 mb-4 uppercase">Commandes Médias</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Commander un Reportage</h3>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nom Entreprise</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Media Group SA" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Responsable Projet</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Sarah Smith" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Titre du Projet</label>
              <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Ex: Reportage Innovation Dakar" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Budget Estimé (€)</label>
                <input required type="number" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Ex: 5000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Deadline de Livraison</label>
                <input required type="date" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-black uppercase tracking-widest text-slate-400">Détails de la mission</label>
               <textarea required rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none" placeholder="Objectifs, public cible, contraintes techniques..." />
            </div>

            <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:border-emerald-200 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:text-emerald-600 transition-colors">
                <FileText size={32} />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Joindre des documents</p>
              <p className="text-xs text-slate-400">PDF, DOCX (Cahier des charges...)</p>
              <input type="file" className="hidden" />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
              >
                Envoyer la commande
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const ProfileModal = ({ profile, onClose, formatPrice }: { profile: UserProfile; onClose: () => void, formatPrice: (p: number) => string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative bg-white w-full max-w-2xl overflow-hidden rounded-[2.5rem] shadow-2xl p-8 md:p-12"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-slate-50 rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-[2rem] object-cover ring-8 ring-slate-50 shadow-xl" />
            <div className={`absolute -bottom-2 -right-2 p-2.3 rounded-2xl shadow-xl ${
              profile.role === 'JOURNALISTE' ? 'bg-amber-500' : 
              profile.role === 'CORRESPONDANT' ? 'bg-emerald-500' : 'bg-blue-500'
            } text-white`}>
              {profile.role === 'JOURNALISTE' ? <Mic2 size={20} /> : 
               profile.role === 'CORRESPONDANT' ? <Camera size={20} /> : <FileText size={20} />}
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-2">{profile.name}</h2>
          <span className={`text-xs font-black tracking-widest px-4 py-1.5 rounded-full border mb-6 uppercase ${
             profile.role === 'JOURNALISTE' ? 'text-amber-600 bg-amber-50 border-amber-100' : 
             profile.role === 'CORRESPONDANT' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
             'text-blue-600 bg-blue-50 border-blue-100'
          }`}>
            {profile.role}
          </span>
          
          <p className="text-slate-500 text-lg leading-relaxed max-w-md mb-6">
            {profile.bio}
          </p>

          {profile.wallet && (
            <div className="bg-slate-900 text-white p-6 rounded-3xl w-full max-w-sm mb-10 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Solde Portefeuille</p>
              <div className="text-3xl font-black tracking-tight">{formatPrice(profile.wallet.balance)}</div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8 w-full max-w-sm py-8 border-y border-slate-50 mb-10">
            <div>
              <div className="text-2xl font-black text-slate-900">{profile.stats.posts}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Publications</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{(profile.stats.followers / 1000).toFixed(1)}k</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{profile.stats.following}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Suivis</div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              S'abonner
            </button>
            <button className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all">
              Message
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductModal = ({ item, onClose, formatPrice }: { item: InfoPost; onClose: () => void, formatPrice: (p: number) => string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative bg-white w-full max-w-5xl overflow-hidden rounded-[3rem] shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="md:w-3/5 bg-slate-900 relative flex items-center justify-center group">
          <video 
            src={item.videoUrl} 
            poster={item.image}
            controls
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute top-1/4 left-1/4 -rotate-12 text-white font-black text-4xl select-none uppercase">
              COLLECTINFOS SECURE
            </div>
            <div className="absolute bottom-1/4 right-1/4 -rotate-12 text-white font-black text-2xl select-none">
              ID: USER_7823_W
            </div>
          </div>
        </div>

        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border border-indigo-100 italic">
                {item.category}
              </span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} />
                {item.duration}
              </span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h2>
            <div className="flex items-center gap-3 text-slate-500 mb-8 border-b border-slate-50 pb-6">
              <img src="https://picsum.photos/seed/reporter/40" className="w-8 h-8 rounded-xl object-cover" />
              <div className="text-sm">
                <p className="font-bold text-slate-900">{item.author}</p>
                <p className="text-xs">{item.date}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8">
              {item.description}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} className="text-emerald-500" />
                Droit de diffusion TV inclus
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} className="text-emerald-500" />
                Fichiers RAW disponibles
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} className="text-emerald-500" />
                Licence à vie
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-6 border-t border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Prix Total</span>
              <span className="text-4xl font-black text-indigo-600">{formatPrice(item.price || 0)}</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3">
              <ShoppingBag size={22} />
              Acheter la licence
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const VideoSection = ({ formatPrice }: { formatPrice: (p: number) => string }) => {
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const videosPerPage = 3;

  const sortedVideos = useMemo(() => {
    return [...MOCK_VIDEOS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const totalVideoPages = Math.ceil(sortedVideos.length / videosPerPage);
  const paginatedVideos = useMemo(() => {
    const start = (currentVideoPage - 1) * videosPerPage;
    return sortedVideos.slice(start, start + videosPerPage);
  }, [sortedVideos, currentVideoPage]);

  // Format date correctly for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Exclusivités Vidéo
            </div>
            <h2 className="text-4xl font-black text-white mb-2">L'actu en images</h2>
            <p className="text-slate-400 text-lg">Découvrez les derniers reportages de nos envoyés spéciaux</p>
          </div>

          {totalVideoPages > 1 && (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentVideoPage(p => Math.max(1, p - 1))}
                disabled={currentVideoPage === 1}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all group"
              >
                <ChevronRight size={20} className="rotate-180 transition-transform group-hover:-translate-x-1" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalVideoPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentVideoPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      currentVideoPage === i + 1 
                      ? 'bg-indigo-600 text-white shadow-lg scale-110 shadow-indigo-500/20' 
                      : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentVideoPage(p => Math.min(totalVideoPages, p + 1))}
                disabled={currentVideoPage === totalVideoPages}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-20 hover:bg-white/10 transition-all group"
              >
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {paginatedVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
                className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] overflow-hidden flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.image} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform transition-transform group-hover:scale-110 shadow-lg">
                      <Play className="text-white fill-white ml-1" size={32} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                      {video.category}
                    </span>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                      <Clock size={10} />
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-6 opacity-80 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <User size={14} className="text-indigo-400" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-200">{video.author}</p>
                        <p className="text-slate-500">{formatDate(video.date)}</p>
                      </div>
                    </div>
                    {video.price && (
                      <div className="bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-xl text-sm font-black border border-indigo-500/20">
                        {formatPrice(video.price)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProfileSection = ({ setSelectedProfile }: { setSelectedProfile: (p: UserProfile) => void }) => {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Rôles certifiés</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Nos Types de Profils</h3>
          </div>
          <div className="hidden md:block">
            <button className="text-slate-500 font-bold hover:text-indigo-600 transition-colors flex items-center gap-2">
              Voir tout le réseau <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PROFILES
            .filter(p => ['JOURNALISTE', 'CORRESPONDANT', 'PIGISTE'].includes(p.role))
            .map((profile) => (
            <motion.div 
              key={profile.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-slate-50" />
                  <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-xl shadow-lg ${
                    profile.role === 'JOURNALISTE' ? 'bg-amber-500' : 
                    profile.role === 'CORRESPONDANT' ? 'bg-emerald-500' : 'bg-blue-500'
                  } text-white`}>
                    {profile.role === 'JOURNALISTE' ? <Mic2 size={14} /> : 
                     profile.role === 'CORRESPONDANT' ? <Camera size={14} /> : <FileText size={14} />}
                  </div>
                </div>
                <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full border ${
                   profile.role === 'JOURNALISTE' ? 'text-amber-600 bg-amber-50 border-amber-100' : 
                   profile.role === 'CORRESPONDANT' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                   'text-blue-600 bg-blue-50 border-blue-100'
                }`}>
                  {profile.role}
                </span>
              </div>
              
              <h4 className="text-xl font-black text-slate-900 mb-2">{profile.name}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {profile.bio}
              </p>
              
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-50">
                <div className="text-center">
                  <div className="text-sm font-black text-slate-900">{profile.stats.posts}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Infos</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-black text-slate-900">{(profile.stats.followers / 1000).toFixed(1)}k</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Follow</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-black text-slate-900">{profile.stats.following}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Suivis</div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProfile(profile)}
                className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all"
              >
                Voir le profil
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ info, onClick, formatPrice }: { info: InfoPost; onClick: () => void; formatPrice: (p: number) => string; key?: string }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={info.image} 
          alt={info.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm w-fit">
            {info.category}
          </span>
        </div>
        {info.price && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-base font-black uppercase tracking-tight shadow-xl border border-white/20">
              {formatPrice(info.price)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {info.date}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <User size={12} />
            {info.author}
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
          {info.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {info.description}
        </p>
      </div>
    </motion.div>
  );
};

const Modal = ({ info, onClose, formatPrice }: { info: InfoPost; onClose: () => void, formatPrice: (p: number) => string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        <div className="md:w-1/2 h-64 md:h-auto shrink-0 relative">
          <img 
            src={info.image} 
            alt={info.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>

        <div className="p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {info.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            {info.title}
          </h2>
          <div className="flex items-center gap-6 mb-8 text-xs text-slate-400 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <User size={14} className="text-slate-500" />
              </div>
              <span className="font-semibold text-slate-700">{info.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{info.date}</span>
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              {info.description}
            </p>
            <p className="text-slate-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            <p className="text-slate-500 leading-relaxed mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div>
              {info.price && (
                <div className="text-3xl font-black text-indigo-600">
                  {formatPrice(info.price)}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImageTicker = () => {
  return (
    <div className="py-20 bg-slate-50 overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Nos Partenaires & Media</h3>
          <p className="text-slate-500">Les dernières publications et collaborations</p>
        </div>
      </div>
      
      <div className="flex relative items-center">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...TICKER_IMAGES, ...TICKER_IMAGES].map((img, i) => (
            <div 
              key={i} 
              className="w-48 h-24 flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center hover:shadow-xl transition-all hover:-translate-y-1 grayscale hover:grayscale-0"
            >
              <img 
                src={img} 
                alt={`Media ${i}`} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<AppView>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<InfoPost | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<InfoPost | null>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handlePurchase = (id: string) => {
    setPurchasedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const formatPrice = useMemo(() => (price: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = price * rate;
    
    const symbols: Record<Currency, string> = {
      EUR: '€',
      USD: '$',
      XOF: 'F CFA',
      GNF: 'GNF'
    };

    const formatted = new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: currency === 'XOF' || currency === 'GNF' ? 0 : 2
    }).format(converted);

    return `${formatted} ${symbols[currency]}`;
  }, [currency]);

  const filteredInfos = useMemo(() => {
    return MOCK_INFOS.filter(info => {
      const matchCategory = selectedCategory === 'All' || info.category === selectedCategory;
      const matchSearch = info.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          info.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const paginatedInfos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInfos.slice(start, start + itemsPerPage);
  }, [filteredInfos, currentPage]);

  const totalPages = Math.ceil(filteredInfos.length / itemsPerPage);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    [...MOCK_INFOS, ...MOCK_MARKETPLACE].forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: Category | 'All') => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setView('CATEGORY_EXPLORER');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (view) {
      case 'ADMIN_DASHBOARD':
        return <AdminDashboard onCancel={() => setView('HOME')} />;
      case 'AUTH':
        return <AuthForm type="LOGIN" onCancel={() => setView('HOME')} onNavigate={(v) => setView(v)} />;
      case 'SIGNUP':
        return <AuthForm type="SIGNUP" onCancel={() => setView('HOME')} onNavigate={(v) => setView(v)} />;
      case 'PROPOSE':
        return <ProposalForm onCancel={() => setView('HOME')} />;
      case 'BUY':
        return <MarketplaceView onSelect={setSelectedProduct} formatPrice={formatPrice} />;
      case 'CATEGORY_EXPLORER':
        return (
          <div className="bg-white min-h-screen">
             <div className="bg-slate-900 py-32 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                   <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500 blur-[150px] rounded-full" />
                   <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500 blur-[150px] rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                   <motion.button 
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     onClick={() => setView('HOME')}
                     className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-12 font-bold bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"
                   >
                     <ArrowLeft size={18} /> Retour à l'accueil
                   </motion.button>
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                   >
                     <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
                       {selectedCategory === 'All' ? 'Toutes les infos' : selectedCategory}
                     </h1>
                     <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed">
                       Bienvenue dans votre espace dédié aux {selectedCategory === 'All' ? 'actualités générales' : selectedCategory.toLowerCase()}. 
                       Retrouvez ici toute l'expertise et les reportages exclusifs de notre rédaction.
                     </p>
                   </motion.div>
                </div>
             </div>
             
             <div className="max-w-7xl mx-auto py-24 px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-slate-100 pb-12">
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                         <Newspaper size={32} />
                      </div>
                      <div>
                         <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Flux de publications</h2>
                         <p className="text-slate-500 font-medium">{filteredInfos.length} archive{filteredInfos.length > 1 ? 's' : ''} disponible{filteredInfos.length > 1 ? 's' : ''}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-[1.5rem]">
                       <button 
                         onClick={() => setSelectedCategory('All')}
                         className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
                           selectedCategory === 'All' 
                           ? 'bg-white text-slate-900 shadow-sm' 
                           : 'text-slate-500 hover:text-slate-900'
                         }`}
                       >
                         Tout voir
                       </button>
                       {CATEGORIES.map(cat => (
                         <button 
                           key={cat}
                           onClick={() => setSelectedCategory(cat)}
                           className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
                             selectedCategory === cat 
                             ? 'bg-white text-indigo-600 shadow-sm' 
                             : 'text-slate-500 hover:text-slate-900'
                           }`}
                         >
                           {cat}
                         </button>
                       ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <AnimatePresence mode="popLayout">
                    {paginatedInfos.map((info) => (
                      <InfoCard 
                        key={info.id} 
                        info={info} 
                        onClick={() => setSelectedInfo(info)}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <div className="mt-24 flex justify-center items-center gap-4">
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="w-14 h-14 rounded-[1.25rem] bg-white border border-slate-200 text-slate-900 disabled:opacity-30 hover:shadow-2xl hover:border-indigo-600 transition-all flex items-center justify-center group"
                    >
                      <ArrowLeft size={24} className="transition-transform group-hover:-translate-x-1" />
                    </button>
                    <div className="flex gap-3">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-14 h-14 rounded-[1.25rem] text-base font-black transition-all ${
                            currentPage === i + 1 
                            ? 'bg-slate-900 text-white shadow-2xl scale-110' 
                            : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-400'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-14 h-14 rounded-[1.25rem] bg-white border border-slate-200 text-slate-900 disabled:opacity-30 hover:shadow-2xl hover:border-indigo-600 transition-all flex items-center justify-center group"
                    >
                      <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
             </div>
          </div>
        );
      case 'ORDER':
        return <OrderForm onCancel={() => setView('HOME')} />;
      case 'DASHBOARD':
        return <div className="p-20 text-center py-40">
          <LayoutDashboard size={48} className="mx-auto mb-6 text-slate-300" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard Journaliste</h2>
          <p className="text-slate-500">Accédez à vos revenus et gérez vos publications.</p>
          <button onClick={() => setView('HOME')} className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">Retour</button>
        </div>;
      default:
        return (
          <>
            <HeroSlider setView={setView} />
            
            {/* Information Categories Section */}
            <section className="pt-[71px] pb-24 px-6 bg-slate-50/50">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase">NOS SECTIONS D'INFORMATION</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                  {[
                    { title: 'Experts', image: '/uploads/EXPERTS.jpg', color: 'indigo-500' },
                    { title: 'Particuliers', image: '/uploads/PARTICULIER.jpg', color: 'slate-500' },
                    { title: 'Médias', image: '/uploads/MEDIAS.jpg', color: 'slate-500' },
                    { title: 'Organisations', image: '/uploads/Organisations.jpg', color: 'indigo-500' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      onClick={() => handleCategorySelect(item.title as Category)}
                      className="flex flex-col items-center group cursor-pointer bg-white border border-slate-200/60 rounded-[3.5rem] p-8 sm:p-10 hover:border-indigo-600/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] transition-all duration-500"
                    >
                      <div className="relative w-40 h-40 sm:w-56 sm:h-56 mb-8 shrink-0">
                        {/* Notification Badge (Red Pastille) */}
                        <div className="absolute -top-1 -right-1 sm:top-1 sm:right-1 bg-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-black border-4 border-white shadow-lg transition-transform group-hover:scale-110 z-20">
                          {categoryStats[item.title] || 0}
                        </div>

                        {/* Animated Logo-Color Border (Blue-Grey) */}
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200 group-hover:border-indigo-600 transition-colors duration-500" />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1 rounded-full border-2 border-dashed border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {/* Circle Image Container */}
                        <div className="absolute inset-2 bg-white rounded-full overflow-hidden shadow-inner ring-4 ring-white ring-offset-2 ring-offset-slate-100 group-hover:ring-offset-indigo-50 transition-all duration-500">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Floating Badge (Logo Grey) */}
                        <div className="absolute -bottom-2 right-4 bg-slate-800 text-white p-1.5 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform delay-100">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                      
                      <h3 className="text-base sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors text-center">
                        {item.title}
                      </h3>
                      <div className="w-8 h-1 bg-slate-200 group-hover:w-24 group-hover:bg-indigo-600 transition-all duration-500 mt-4 rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            {/* Video Insights Section */}
            <VideoSection formatPrice={formatPrice} />

            <ProfileSection setSelectedProfile={setSelectedProfile} />
            <section ref={contentRef} className="py-12 px-6 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar no-scrollbar">
                    <button 
                      onClick={() => handleCategorySelect('All')}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        selectedCategory === 'All' 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      Tout voir
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                          selectedCategory === cat 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium shrink-0">
                     <Filter size={16} />
                     <span>{filteredInfos.length} résultat{filteredInfos.length > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Info Grid */}
                {paginatedInfos.length > 0 ? (
                  <>
                    <motion.div 
                      layout
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      <AnimatePresence mode="popLayout">
                        {paginatedInfos.map(info => (
                          <InfoCard 
                            key={info.id} 
                            info={info} 
                            onClick={() => setSelectedInfo(info)}
                            formatPrice={formatPrice}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                      <div className="mt-16 flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                          <ChevronRight className="rotate-180" size={20} />
                        </button>
                        
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                              currentPage === i + 1 
                              ? 'bg-slate-900 text-white shadow-lg scale-110' 
                              : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun résultat trouvé</h3>
                    <p className="text-slate-500">Essayez d'ajuster votre recherche ou vos filtres.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Contribution Banner */}
            <section className="py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl shadow-indigo-200">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 opacity-30" />
                  
                  <div className="z-10 max-w-xl text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                      Partagez l'information qui compte.
                    </h2>
                    <p className="text-indigo-100 text-lg mb-8 opacity-90">
                      Vous avez trouvé une information précieuse ? Contribuez à notre base de données et aidez la communauté à rester informée.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="bg-indigo-500/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-sm font-medium">10k+ contributeurs</span>
                      </div>
                      <div className="bg-indigo-500/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
                        <BookOpen size={16} />
                        <span className="text-sm font-medium">Curation vérifiée</span>
                      </div>
                    </div>
                  </div>

                  <div className="z-10 group shrink-0">
                     <button className="bg-white text-indigo-600 w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center font-bold text-lg hover:scale-110 transition-transform shadow-xl">
                       <Plus size={32} className="mb-2" />
                       <span>Ajouter</span>
                       <ArrowRight size={18} className="mt-2 group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-24 md:pb-0">
    <Navbar 
      onSearch={(q) => {
        setSearchQuery(q);
        setCurrentPage(1);
      }} 
      setView={setView} 
      currency={currency} 
      setCurrency={setCurrency} 
    />
      <BottomMenu setView={setView} />

      <main className="pt-20">
        {renderContent()}
      </main>

      <ImageTicker />

      {/* Footer */}
      <footer className="hidden md:block bg-white border-t border-slate-100 py-20 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/uploads/collectinfo.jpg" 
                alt="CollectInfos Logo" 
                className="w-8 h-8 object-contain rounded-md"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-bold tracking-tight text-slate-900">CollectInfos</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
              Une plateforme dédiée à la centralisation de l'information utile. Curation intelligente pour un monde complexe.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="text-slate-600 font-bold">𝕏</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="text-slate-600 font-bold">f</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="text-slate-600 font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Plateforme</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Découvrir</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Tendances</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Actualités</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contribuer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Compagnie</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Équipe</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 text-center text-slate-400 text-xs">
          © 2026 CollectInfos. Tous droits réservés. Designé avec passion.
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedInfo && (
          <Modal info={selectedInfo} onClose={() => setSelectedInfo(null)} formatPrice={formatPrice} />
        )}
        {selectedProfile && (
          <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} formatPrice={formatPrice} />
        )}
        {selectedProduct && (
          <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} formatPrice={formatPrice} />
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d1eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #indigo-200;
        }
      `}</style>
    </div>
  );
}
