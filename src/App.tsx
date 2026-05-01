import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";
import { useTranslation } from 'react-i18next';

const generateContractPDF = (userName: string, userEmail: string, userRole: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('fr-FR');
  const transactionId = Math.random().toString(36).substring(7).toUpperCase();

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("CONTRAT DE PRESTATION ET D'UTILISATION", 105, 20, { align: "center" });
  doc.setFontSize(14);
  doc.text("COLLECTINFOS.COM", 105, 28, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Date de signature : ${date}`, 20, 40);
  doc.text(`Identifiant Contrat : #${transactionId}`, 20, 45);
  doc.setLineWidth(0.5);
  doc.line(20, 50, 190, 50);

  // Parties
  doc.setFont("helvetica", "bold");
  doc.text("ENTRE LES SOUSSIGNÉS :", 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text("La société Collectinfos.com (RCCM GN.TCC.2025.A.10149)", 20, 67);
  doc.text("ET", 20, 74);
  doc.text(`${userName.toUpperCase()} (${userRole}), email: ${userEmail},`, 20, 81);
  doc.text("ci-après désigné 'L'Utilisateur'.", 20, 88);

  // Articles
  const articles = [
    { title: "Article 1 – Objet du service", content: "Mise en relation pour vente de contenus vidéo originaux." },
    { title: "Article 3 – Propriété Intellectuelle", content: "Garantie de titularité exclusive des droits d'auteur." },
    { title: "Article 6 – Commission", content: "Prélèvement de 30% sur le montant brut de chaque vente." },
    { title: "Article 7 – Déontologie", content: "Respect des règles éthiques. Interdiction des Fake News." },
    { title: "Article 9 – Licence d’utilisation", content: "Octroi d'une licence d'exploitation lors de l'achat." },
    { title: "Article 11 – Paiement", content: "Sécurisation des fonds via le système de la Plateforme." },
    { title: "Article 16 – Droit Applicable", content: "Soumis au droit de la République de Guinée (Tribunaux de Conakry)." }
  ];

  let y = 100;
  articles.forEach(art => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text(art.title, 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(art.content, 20, y, { maxWidth: 170 });
    y += 12;
  });

  // Signatures
  y += 10;
  if (y > 270) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURE ÉLECTRONIQUE (LU ET APPROUVÉ)", 20, y);
  y += 10;
  doc.setFont("helvetica", "italic");
  doc.text(`Signé numériquement le ${date} par l'Utilisateur`, 20, y);
  doc.text(`Traçabilité : ${userEmail} | ID: ${transactionId}`, 20, y + 5);

  doc.save(`Contrat_CollectInfos.pdf`);
};
import { 
  Paperclip,
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
  ChevronDown,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Play,
  Upload,
  Wallet,
  CheckCircle2,
  AlertCircle,
  FileText,
  LayoutDashboard,
  Video,
  DollarSign,
  MoreVertical,
  Download,
  XCircle,
  Calendar,
  Eye,
  CreditCard,
  Receipt,
  Package,
  AlertTriangle,
  RefreshCw,
  Settings,
  Lock,
  Trash2,
  Edit
} from 'lucide-react';
import { MOCK_INFOS, CATEGORIES, MOCK_PROFILES, MOCK_MARKETPLACE, EXCHANGE_RATES, MOCK_VIDEOS, TICKER_IMAGES, COUNTRIES, CITIES_BY_COUNTRY, TERMS_TEXT } from './constants';
import { InfoPost, Category, UserProfile, UserRole, OrderRequest, Currency } from './types';

type AppView = 'HOME' | 'PROPOSE' | 'BUY' | 'ORDER' | 'DASHBOARD' | 'AUTH' | 'ADMIN_DASHBOARD' | 'ADMIN_AUTH' | 'SIGNUP' | 'CATEGORY_EXPLORER' | 'CHAT' | 'PAYMENT' | 'MEDIA_DASHBOARD' | 'CORRESPONDANT_DASHBOARD' | 'PRESS' | 'FACT_CHECKING' | 'COLLABORATION' | 'CONTACT' | 'ARTICLE_DETAIL';

// Components
const Navbar = ({ onSearch, setView, currency, setCurrency }: { 
  onSearch: (val: string) => void, 
  setView: (v: AppView) => void,
  currency: Currency,
  setCurrency: (c: Currency) => void
}) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const navItems = [
    { label: t('nav.home'), view: 'HOME' as AppView },
    { label: t('nav.press'), view: 'PRESS' as AppView },
    { label: t('nav.fact-checking'), view: 'FACT_CHECKING' as AppView },
    { label: t('nav.contact'), view: 'CONTACT' as AppView },
    { label: t('nav.collaboration'), view: 'COLLABORATION' as AppView }
  ];

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-50 ${
      isScrolled ? 'py-3 shadow-sm' : 'py-5'
    }`}>
      {/* Hidden container for Google Translate */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => {
              setView('HOME');
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src="/uploads/collectinfo.jpg" 
              alt="CollectInfos Logo" 
              className="w-10 h-10 object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-full transition-all group"
          >
            <Menu size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-100 ring-1 ring-slate-200/50"
            >
              <span className="text-xl leading-none">{currentLang.flag}</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{currentLang.label}</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden"
                >
                  <div className="flex flex-col gap-1 p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
                          i18n.language === lang.code 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm font-black' 
                            : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 font-bold'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-[11px] uppercase tracking-widest">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={t('common.search')}
              className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm border-none focus:ring-2 focus:ring-indigo-500/20 w-32 xl:w-48 transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 border-x border-slate-200 ml-2">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#1877F2] transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-black transition-all"><Twitter size={18} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#E4405F] transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#0A66C2] transition-all"><Linkedin size={18} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#FF0000] transition-all"><Youtube size={18} /></a>
          </div>

          <div className="hidden lg:flex items-center gap-3 ml-2 pl-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <Phone size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium leading-none mb-1 uppercase tracking-tight">Nous contacter</span>
              <span className="text-sm font-black text-slate-900 leading-none">+224 626 89 18 27</span>
            </div>
          </div>

          <div className="relative group cursor-pointer hidden sm:block">
            <div className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <ShoppingBag size={24} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#548CA8] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">0</span>
            </div>
          </div>

          <button 
            onClick={() => setView('AUTH')}
            className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-full transition-colors group"
          >
            <div className="w-10 h-10 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-all">
              <CircleUser size={24} />
            </div>
            <div className="flex flex-col items-start hidden lg:flex">
              <span className="text-[12px] font-bold text-slate-900 leading-tight">{t('auth.login')}</span>
              <span className="text-[11px] font-medium text-slate-500 leading-tight">{t('auth.signup')}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Sliding Sidebar Menu */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[320px] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src="/uploads/collectinfo.jpg" alt="Logo" className="w-8 h-8 rounded-lg" referrerPolicy="no-referrer" />
                    <span className="font-black text-slate-900 tracking-tighter">COLLECTINFOS</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rechercher..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                      onChange={(e) => onSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-auto">
                  {navItems.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setView(item.view);
                        setIsSidebarOpen(false);
                      }} 
                      className="flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 px-6 py-4 rounded-xl transition-all text-left"
                    >
                      {item.label}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <Phone size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Nous contacter</span>
                      <span className="text-base font-black text-slate-900">+224 626 89 18 27</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-[#1877F2] transition-all"><Facebook size={20} /></a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-black transition-all"><Twitter size={20} /></a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-[#E4405F] transition-all"><Instagram size={20} /></a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-[#FF0000] transition-all"><Youtube size={20} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
  const { t } = useTranslation();
  return (
    <section className="relative h-[450px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/uploads/0BAC1.jpg" 
          alt="Journalist with camera"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-start pt-20 md:pt-32 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl px-6"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-8xl font-black text-white tracking-widest mb-6"
          >
            COLLECTINFOS
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed italic"
          >
            "{t('hero.commitment')}<br />
            {t('hero.strength')}"
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row items-center justify-center gap-2 md:gap-4 w-full mt-10"
          >
            <button 
              onClick={() => setView('PROPOSE')}
              className="w-24 md:w-36 aspect-square bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-2 md:gap-2.5 border border-white/20 shadow-xl text-xs md:text-lg group"
            >
              <Send size={24} className="md:w-9 md:h-9 group-hover:scale-110 transition-transform" />
              {t('hero.propose')}
            </button>
            <button 
              onClick={() => setView('BUY')}
              className="w-24 md:w-36 aspect-square bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-2 md:gap-2.5 border border-white/20 shadow-xl text-xs md:text-lg group"
            >
              <ShoppingBag size={24} className="md:w-9 md:h-9 group-hover:scale-110 transition-transform" />
              {t('hero.buy')}
            </button>
            <button 
              onClick={() => setView('ORDER')}
              className="w-24 md:w-36 aspect-square bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-2 md:gap-2.5 border border-white/20 shadow-xl text-xs md:text-lg group"
            >
              <Camera size={24} className="md:w-9 md:h-9 group-hover:scale-110 transition-transform" />
              {t('hero.order')}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFDFF] to-transparent" />
    </section>
  );
};

const MarketplaceView = ({ onSelect, formatPrice }: { onSelect: (i: InfoPost) => void, formatPrice: (p: number) => string }) => {
  const { t } = useTranslation();
  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">{t('marketplace.title')}</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{t('marketplace.subtitle')}</h3>
          <p className="text-slate-500 max-w-2xl">{t('marketplace.description')}</p>
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
                    Achetez
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

const ProposalForm = ({ onCancel, user }: { onCancel: () => void, user?: any }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    media: '',
    title: '',
    description: '',
    category: CATEGORIES[0],
    location: '',
    duration: '',
    tags: '',
    language: 'Français',
    price: 300
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          author_id: user?.id || null,
          price: 300 // default or from state
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const contentType = response.headers.get('content-type');
        let errorMsg = 'Erreur lors de la soumission de l\'article';
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } else {
          errorMsg = `Erreur serveur (${response.status}): Le serveur n'a pas renvoyé de réponse JSON valide.`;
        }
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">{t('order.success_title')}</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">{t('order.success_desc')}</p>
          <button 
            onClick={onCancel}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            {t('order.home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-slate-50">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 mb-8"
              >
                <AlertCircle size={18} className="shrink-0" />
                <p className="text-sm font-bold leading-tight">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-12">
            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">{t('dashboard.correspondant.title')}</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{t('dashboard.correspondant.new_report')}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('auth.name')}</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="Votre nom" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('auth.email')}</label>
                <input 
                  required 
                  type="email" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="jean@media.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Téléphone</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="+33 6 12 34 56 78" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Média / Agence</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="Indépendant, AFP, etc." 
                  value={formData.media}
                  onChange={(e) => setFormData({...formData, media: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Titre de l'article</label>
              <input 
                required 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                placeholder="Un titre accrocheur..." 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description / Synopsis</label>
              <textarea 
                required 
                rows={4} 
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none font-bold" 
                placeholder="Décrivez votre contenu en quelques lignes..." 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('common.category')}</label>
                <select 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{t(`common.categories.${c}`)}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Lieu</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="Paris, France" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Durée (Vidéo)</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold" 
                  placeholder="Ex: 05:30" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
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
                disabled={isLoading}
                className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Soumettre l'article"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const TermsModal = ({ isOpen, onClose, onAccept }: { isOpen: boolean, onClose: () => void, onAccept: () => void }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const isEmpty = canvasRef.current.toDataURL() === document.createElement('canvas').toDataURL();
      if (!isEmpty) setHasSigned(true);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    if (e.type === 'mousedown' || e.type === 'touchstart') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasSigned(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative bg-white w-full max-w-4xl h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Termes & Conditions</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Veuillez lire attentivement jusqu'au bas de la page</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-10 prose prose-slate prose-headings:text-indigo-600 prose-h3:text-indigo-600 prose-h3:font-black prose-h3:uppercase prose-h3:tracking-tighter prose-h3:mt-8 max-w-none text-slate-600 font-medium"
            >
              <div className="markdown-body">
                <ReactMarkdown>{TERMS_TEXT}</ReactMarkdown>
              </div>

              {/* Signatures Section */}
              <div className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Collect Infos Side */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pour Collect Infos</p>
                  <div className="h-40 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                    <img src="https://storage.googleapis.com/test-media-653e.appspot.com/b16e456d-e461-460d-8532-671c667cbe5f/64478f77-de70-4fd2-850d-df03ad6b7139.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 object-contain" alt="Cachet Officiel" />
                    <div className="text-center relative z-10 hidden">
                      <p className="font-['Playfair_Display'] text-2xl text-slate-900 -rotate-3">La Direction</p>
                      <div className="w-12 h-0.5 bg-indigo-600 mx-auto mt-2" />
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold italic">Signature électronique certifiée</p>
                </div>

                {/* User Side */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Votre Signature</p>
                    <button onClick={clearSignature} className="text-[9px] font-black text-indigo-600 uppercase hover:underline">Effacer</button>
                  </div>
                  <div className="h-40 bg-indigo-50/30 rounded-3xl border-2 border-dashed border-indigo-100 relative group cursor-crosshair">
                    <canvas 
                      ref={canvasRef}
                      width={350}
                      height={160}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="absolute inset-0 w-full h-full"
                    />
                    {!hasSigned && !isDrawing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                         <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Signez ici avec votre souris ou doigt</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold italic">En signant, vous attestez avoir pris connaissance des termes.</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
              <button
                disabled={!hasScrolledToBottom || !hasSigned}
                onClick={onAccept}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl ${
                  (hasScrolledToBottom && hasSigned)
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {!hasScrolledToBottom ? "Veuillez lire l'intégralité" : !hasSigned ? "Votre signature est requise" : "J'ai lu et j'accepte"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AuthForm = ({ type = 'LOGIN', defaultRole, onCancel, onNavigate, onLogin }: { 
  type?: 'LOGIN' | 'SIGNUP', 
  defaultRole?: UserRole, 
  onCancel: () => void, 
  onNavigate: (v: AppView) => void,
  onLogin: (user: any) => void
}) => {
  const { t } = useTranslation();
  const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>(type);
  const [role, setRole] = useState<UserRole>(defaultRole || 'JOURNALISTE');
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: 'Guinée',
    city: '',
    mediaName: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (authType === 'SIGNUP' && !hasReadTerms) {
      setIsTermsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
const endpoint = authType === 'LOGIN' 
  ? 'https://collectinfos.onrender.com/api/auth/login' 
  : 'https://collectinfos.onrender.com/api/auth/register      const body = authType === 'LOGIN' 
        ? { email: formData.email, password: formData.password }
        : { ...formData, role };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData);
        if (authType === 'SIGNUP') {
          generateContractPDF(formData.name, formData.email, role);
        }
        setSubmitted(true);
      } else {
        let errorMessage = 'Une erreur est survenue';
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          errorMessage = `Erreur serveur (${response.status}): Le serveur n'a pas renvoyé de réponse JSON valide.`;
        }
        
        // Aide spécifique pour l'erreur de permission d'hôte
        if (errorMessage.includes('not allowed to connect')) {
          errorMessage = "Accès refusé par votre serveur MySQL. Dans votre interface ISPConfig (votre capture d'écran) : 1. COCHEZ la case 'Remote Access'. 2. L'IP 34.96.39.77 est déjà bien saisie. 3. Cliquez sur 'Save'.";
        }
        
        setError(errorMessage);
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      if (err.message === 'Failed to fetch') {
        setError('Le serveur est inaccessible. Vérifiez que votre VPS autorise les connexions (Remote Access) et que le port 3306 est ouvert.');
      } else {
        setError(err.message || 'Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardRedirect = () => {
    if (role === 'ADMIN' || authType === 'LOGIN') {
      let path = '/';
      if (role === 'JOURNALISTE') {
        path = '/correspondant';
        onNavigate('CORRESPONDANT_DASHBOARD');
      } else if (role === 'MEDIAS') {
        path = '/media';
        onNavigate('MEDIA_DASHBOARD');
      } else {
        path = '/admin';
        onNavigate('ADMIN_DASHBOARD');
      }
      window.history.pushState({}, '', path);
    } else {
      onCancel();
    }
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
          <div className="space-y-4 mb-8">
            <p className="text-slate-500 leading-relaxed">
              {authType === 'LOGIN' 
                ? 'Bienvenue sur votre espace personnel. Vous allez être redirigé.' 
                : `Votre compte en tant que ${role === 'JOURNALISTE' ? 'correspondant' : role === 'MEDIAS' ? 'média' : 'staff'} est prêt. Bienvenue sur Collect Infos !`}
            </p>
            {authType === 'SIGNUP' && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Send size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Contrat généré</p>
                  <p className="text-[11px] text-slate-500 font-medium">Votre contrat au format PDF a été généré et téléchargé.</p>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={handleDashboardRedirect}
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
        <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border border-slate-50 relative overflow-visible">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center mb-10">
            <div className="hidden md:inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-3xl mb-6 shadow-inner ring-1 ring-slate-100">
              <CircleUser size={32} className={role === 'ADMIN' ? "text-slate-900" : "text-indigo-600"} />
            </div>
            <h3 className="hidden md:block text-3xl font-black text-slate-900 tracking-tight mb-2">
              {role === 'ADMIN' ? t('auth.staff') : authType === 'LOGIN' ? t('auth.login') : t('auth.signup')}
            </h3>
            <p className="hidden md:block text-slate-500 font-medium italic">CollectInfos : L'info brute, certifiée.</p>
          </div>

          <div className="hidden md:flex p-1.5 bg-slate-100/50 rounded-2xl mb-8 overflow-x-auto no-scrollbar gap-1 border border-slate-100">
            {(['JOURNALISTE', 'MEDIAS', 'ADMIN'] as UserRole[])
              .filter(r => authType === 'LOGIN' || r !== 'ADMIN')
              .map((r) => (
              <button 
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-wider ${role === r ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100/50 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {r === 'JOURNALISTE' ? t('auth.correspondant') : r === 'MEDIAS' ? t('auth.media') : t('auth.staff')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 mb-6"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-xs font-bold leading-tight">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={authType === 'SIGNUP' ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" : "space-y-5"}>
              <AnimatePresence mode="wait">
                {authType === 'SIGNUP' ? (
                  <motion.div
                    key="signup-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
                  >
                    <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                      {role === 'MEDIAS' ? t('auth.media_name') : t('auth.name')}
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

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('auth.country')}</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                          className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium text-left flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {formData.country ? (
                              <>
                                <img 
                                  src={`https://flagcdn.com/w40/${COUNTRIES.find(c => c.name === formData.country)?.code.toLowerCase()}.png`}
                                  alt=""
                                  className="w-5 h-auto rounded-sm"
                                />
                                <span className="text-slate-900">{formData.country}</span>
                              </>
                            ) : (
                              <span className="text-slate-400 font-normal">{t('auth.country')}</span>
                            )}
                          </div>
                          <Globe2 size={18} className="text-slate-400" />
                        </button>

                        <AnimatePresence>
                          {isCountryMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 p-2 max-h-[300px] flex flex-col"
                            >
                              <div className="relative p-2">
                                <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                  type="text"
                                  placeholder={t('auth.find_country')}
                                  className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20"
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              <div className="overflow-y-auto no-scrollbar flex-1">
                                {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ 
                                        ...formData, 
                                        country: c.name, 
                                        city: '', 
                                        phone: c.dialCode || '' 
                                      });
                                      setIsCountryMenuOpen(false);
                                      setCountrySearch('');
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left"
                                  >
                                    <img 
                                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                                      alt=""
                                      className="w-5 h-auto rounded-sm"
                                    />
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">{c.name}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('auth.city')}</label>
                      {CITIES_BY_COUNTRY[formData.country] ? (
                        <select 
                          required 
                          className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium cursor-pointer" 
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        >
                          <option value="" disabled>{t('auth.select_city')}</option>
                          {CITIES_BY_COUNTRY[formData.country].map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          required 
                          className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                          placeholder="Ville"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Téléphone</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                          {formData.country && COUNTRIES.find(c => c.name === formData.country) ? (
                            <img 
                              src={`https://flagcdn.com/w40/${COUNTRIES.find(c => c.name === formData.country)?.code.toLowerCase()}.png`}
                              alt=""
                              className="w-5 h-auto rounded-sm"
                            />
                          ) : (
                            <span className="text-slate-400 text-sm">📱</span>
                          )}
                        </div>
                        <input 
                          required 
                          type="tel"
                          className="w-full bg-slate-50 border border-transparent rounded-2xl pl-16 pr-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-100 transition-all font-medium" 
                          placeholder="+..."
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

            </div>

            {authType === 'SIGNUP' && (
              <div className="space-y-4">
                <label className="flex items-start gap-3 px-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    required 
                    readOnly
                    checked={acceptTerms}
                    onClick={(e) => {
                      if (!hasReadTerms) {
                        e.preventDefault();
                        setIsTermsModalOpen(true);
                      }
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30" 
                  />
                  <span className="text-[11px] text-slate-500 leading-tight group-hover:text-slate-900 transition-colors">
                    En créant mon compte, je certifie que les informations fournies sont exactes et j'accepte les <button type="button" onClick={() => setIsTermsModalOpen(true)} className="text-indigo-600 font-bold decoration-indigo-200 underline">Termes & Conditions</button>.
                  </span>
                </label>
                {!hasReadTerms && (
                  <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest px-4 italic">Lecture obligatoire des Termes & Conditions avant signature</p>
                )}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-slate-900 text-white py-4 rounded-[1.8rem] font-black hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-100 mt-6 uppercase tracking-[0.15em] text-sm overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {authType === 'LOGIN' ? t('auth.access') : 'Lancer l\'inscription'}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
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

          <TermsModal 
            isOpen={isTermsModalOpen}
            onClose={() => setIsTermsModalOpen(false)}
            onAccept={() => {
              setHasReadTerms(true);
              setAcceptTerms(true);
              setIsTermsModalOpen(false);
            }}
          />

          <button 
            onClick={onCancel}
            className="hidden md:block absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const MediaDashboard = ({ onCancel, formatPrice, user }: { onCancel: () => void, formatPrice: (p: number) => string, user: any }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PURCHASES' | 'ORDERS' | 'WALLET'>('OVERVIEW');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const mediaProfile = user || { 
    name: 'Utilisateur', 
    avatar: 'https://picsum.photos/seed/user/200', 
    role: 'MEDIAS', 
    stats: { posts: 0, followers: 0, following: 0 },
    wallet: { balance: 0, pendingPayouts: 0 }
  };

  const orders = [
    { id: 'ORD-2024-001', title: 'Impact du Simandou sur les communautés locales', date: '12 Mars 2024', status: 'En tournage', budget: 1500, progress: 65, color: 'indigo-600', description: "Reportage approfondi sur les retombées sociales et environnementales du projet minier de Simandou.", journalist: "Mamadou Diallo", deadline: "30 Avril 2024" },
    { id: 'ORD-2024-002', title: 'Crise de l\'eau à Sonfonia : Enquête de terrain', date: '15 Mars 2024', status: 'Montage', budget: 850, progress: 85, color: 'emerald-600', description: "Enquête sur les pénuries d'eau récurrentes dans le quartier de Sonfonia et les solutions locales.", journalist: "Fatoumata Camara", deadline: "10 Avril 2024" },
    { id: 'ORD-2024-003', title: 'Portrait : Les femmes artisanes de Kindia', date: '18 Mars 2024', status: 'Brief validé', budget: 1200, progress: 20, color: 'amber-600', description: "Série de portraits sur les femmes qui dynamisent l'artisanat local à Kindia.", journalist: "Abdoulaye Soumah", deadline: "15 Mai 2024" },
    { id: 'ORD-2024-004', title: 'Économie : Le boom du numérique à Conakry', date: '22 Mars 2024', status: 'Casting', budget: 2000, progress: 10, color: 'slate-400', description: "Analyse de la croissance du secteur technologique et des startups en Guinée.", journalist: "Mariama Barry", deadline: "20 Juin 2024" }
  ];

  return (
    <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={mediaProfile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(mediaProfile.name)}&background=random`} alt={mediaProfile?.name} className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg ring-4 ring-white">
                <Building2 size={20} />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-[0.1em] text-indigo-600 mb-1 uppercase">Espace Média</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{mediaProfile.name}</h3>
              <p className="text-slate-500 font-medium italic mt-1">Groupe Média Partenaire</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => setActiveTab('ORDERS')}
               className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all"
             >
               <Plus size={20} /> Passer une Commande
             </button>
             <button onClick={onCancel} className="px-8 py-4 bg-white text-slate-900 border border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">
               Déconnexion
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Achats Totaux', value: mediaProfile.stats?.purchases || 0, icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Orders en cours', value: mediaProfile.stats?.activeOrders || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Solde Portefeuille', value: formatPrice(mediaProfile.wallet?.balance || 0), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Licences Actives', value: mediaProfile.stats?.licenses || 0, icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex p-1.5 bg-slate-200/50 rounded-[1.8rem] mb-12 gap-1 border border-slate-200/50 max-w-2xl">
          {[
            { id: 'OVERVIEW', label: t('dashboard.media.tabs.inventory') },
            { id: 'PURCHASES', label: t('dashboard.media.tabs.inventory') }, // reusing for now
            { id: 'ORDERS', label: t('dashboard.media.tabs.orders') },
            { id: 'WALLET', label: t('dashboard.media.tabs.suggest') } // reusing for now
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 px-6 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-xl shadow-slate-200 scale-[1.02]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 min-h-[500px]">
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                 <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6 uppercase tracking-tight">Vidéos Récents</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {MOCK_MARKETPLACE.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 transition-all group">
                          <div className="w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2 py-1 bg-indigo-50 rounded-lg">{item.category}</span>
                              <span className="text-[10px] font-bold text-slate-400">#ACQ-2024-{i+1}</span>
                            </div>
                            <h5 className="text-lg font-black text-slate-900 leading-snug mb-2">{item.title}</h5>
                            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                              <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>
                              <span className="flex items-center gap-1"><Calendar size={14} /> {new Date().toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <button className="p-4 bg-white text-slate-900 rounded-2xl shadow-sm border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all">
                              <Download size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Solde Crédits</h4>
                    <div className="text-4xl font-black mb-6">4,250.00 <span className="text-lg text-slate-400">FG</span></div>
                    <button className="w-full bg-indigo-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">Recharger le compte</button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                  <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest mb-6">Commandes en cours</h4>
                  <div className="space-y-6">
                    {[
                      { title: "Reportage Port Boulbinet", status: "En tournage", progress: 65 },
                      { title: "Interview Ministre Mines", status: "Brief envoyé", progress: 15 }
                    ].map((order, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-slate-900">{order.title}</span>
                          <span className="text-indigo-600 font-bold">{order.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600" style={{ width: `${order.progress}%` }}></div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{order.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PURCHASES' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_MARKETPLACE.map((item, i) => (
                <div key={i} className="group bg-slate-50 rounded-[2rem] overflow-hidden border border-transparent hover:border-indigo-100 hover:bg-white transition-all shadow-sm hover:shadow-xl">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">MP4 HD</div>
                  </div>
                  <div className="p-6">
                    <h5 className="font-black text-slate-900 mb-4 line-clamp-2">{item.title}</h5>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{item.author}</span>
                      <button className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                        <Download size={14} /> Télécharger HD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ORDERS' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-50">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Vos Commandes</h4>
                  <p className="text-slate-500 text-sm">Gérez vos demandes de reportages exclusifs</p>
                </div>
                <button 
                  onClick={() => setIsBriefModalOpen(true)}
                  className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all"
                >
                  <Plus size={18} /> Créer un nouveau brief
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-slate-50 rounded-[2.5rem] p-8 border border-transparent hover:border-indigo-100 hover:bg-white transition-all shadow-sm hover:shadow-xl group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.id}</span>
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white border border-slate-100 shadow-sm`} style={{ color: order.color }}>
                               {order.status}
                             </span>
                          </div>
                          <h5 className="text-xl font-black text-slate-900 mb-4">{order.title}</h5>
                          <div className="flex items-center gap-6">
                             <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <Calendar size={16} /> {order.date}
                             </div>
                             <div className="flex items-center gap-2 text-slate-900 text-sm font-black italic">
                                <DollarSign size={16} className="text-emerald-500" /> {formatPrice(order.budget)}
                             </div>
                          </div>
                       </div>
                       
                       <div className="w-full md:w-64 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Progression</span>
                            <span className="font-black text-indigo-600">{order.progress}%</span>
                          </div>
                          <div className="h-3 bg-slate-200/50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${order.progress}%` }}
                              className="h-full bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"
                            />
                          </div>
                       </div>

                       <div>
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center gap-2 bg-white text-slate-900 px-6 py-4 rounded-2xl border border-slate-100 font-bold hover:bg-slate-50 transition-all group-hover:border-indigo-200 shadow-sm"
                          >
                             Détails <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'WALLET' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                   <div className="relative z-10">
                      <CreditCard className="text-indigo-400 mb-6" size={40} />
                      <h5 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Compte principal</h5>
                      <div className="text-4xl font-black tracking-tighter mb-8">45.000,00 <span className="text-lg opacity-40 font-bold">FG</span></div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/10">
                        <ArrowRight size={14} className="-rotate-45" /> +2.4% ce mois
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="md:col-span-2 bg-slate-50 border border-slate-100 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex-1">
                      <h5 className="text-slate-900 text-lg font-black uppercase tracking-tight mb-2">Module de Facturation Automatisé</h5>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-sm italic">Toutes vos factures sont générées automatiquement après la validation de chaque reportage livré.</p>
                   </div>
                   <div className="flex gap-4">
                      <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        Éditer mes infos
                      </button>
                      <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                        Télécharger relevé
                      </button>
                   </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight border-b border-slate-100 pb-6 flex items-center gap-3">
                  <Receipt className="text-indigo-600" /> Historique de Facturation
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                      <tr>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Facture #</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objet</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'INV-2024-042', date: '20 Mars 2024', subject: 'Pack Médias - Simandou', amount: 1250, status: 'Payée' },
                        { id: 'INV-2024-038', date: '15 Mars 2024', subject: 'Reportage Exclusif Kindia', amount: 840, status: 'Payée' },
                        { id: 'INV-2024-025', date: '08 Mars 2024', subject: 'Abonnement Annuel Pro', amount: 4500, status: 'Payée' },
                        { id: 'INV-2024-012', date: '01 Mars 2024', subject: 'Droits Diffusion - Sonfonia', amount: 120, status: 'Payée' }
                      ].map((inv) => (
                        <tr key={inv.id} className="bg-slate-50 group hover:bg-white transition-all shadow-sm hover:shadow-xl hover:ring-1 hover:ring-indigo-100">
                          <td className="px-8 py-6 rounded-l-[1.5rem] font-bold text-slate-500">{inv.id}</td>
                          <td className="px-8 py-6 text-sm font-medium text-slate-400">{inv.date}</td>
                          <td className="px-8 py-6 font-black text-slate-900">{inv.subject}</td>
                          <td className="px-8 py-6 font-black text-indigo-600">{formatPrice(inv.amount)}</td>
                          <td className="px-8 py-6">
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 rounded-r-[1.5rem] text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                onClick={() => setSelectedInvoice(inv)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                              >
                                <Eye size={14} /> Voir
                              </button>
                              <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100">
                                <Download size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Package size={14} /> {selectedOrder.id}
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-8">
                   <h3 className="text-3xl font-black text-slate-900 mb-4">{selectedOrder.title}</h3>
                   <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-slate-50 border border-slate-100`} style={{ color: selectedOrder.color }}>
                     {selectedOrder.status}
                   </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informations Logistiques</h5>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-indigo-600" />
                            <div>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Commande effectuée</p>
                               <p className="font-bold text-slate-900">{selectedOrder.date}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <Clock size={18} className="text-emerald-500" />
                            <div>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deadline prévue</p>
                               <p className="font-bold text-slate-900">{selectedOrder.deadline}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Équipe & Budget</h5>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <User size={18} className="text-amber-500" />
                            <div>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Journaliste assigné</p>
                               <p className="font-bold text-slate-900">{selectedOrder.journalist}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <DollarSign size={18} className="text-emerald-600" />
                            <div>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Budget investi</p>
                               <p className="font-bold text-slate-900">{formatPrice(selectedOrder.budget)}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mb-10">
                   <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Description du Brief</h5>
                   <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-3xl border border-slate-100 italic">
                     "{selectedOrder.description}"
                   </p>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm mb-2">
                     <span className="font-black text-slate-900 uppercase tracking-widest text-[10px]">État d'avancement</span>
                     <span className="font-black text-indigo-600">{selectedOrder.progress}%</span>
                   </div>
                   <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${selectedOrder.progress}%` }}
                       className="h-full bg-indigo-600 rounded-full shadow-lg shadow-indigo-100"
                     />
                   </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button className="flex-1 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                     Messagerie avec l'équipe
                   </button>
                   <button className="flex items-center justify-center w-16 h-16 bg-slate-50 text-slate-400 rounded-[1.5rem] hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-200">
                     <FileText size={24} />
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                   <div className="bg-indigo-600 text-white p-3 rounded-2xl">
                      <Receipt size={24} />
                   </div>
                   <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900">
                      <X size={20} />
                   </button>
                </div>

                <div className="mb-10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{selectedInvoice.id}</p>
                   <h3 className="text-2xl font-black text-slate-900">{selectedInvoice.subject}</h3>
                </div>

                <div className="space-y-6 mb-10">
                   <div className="flex justify-between pb-4 border-b border-slate-50">
                      <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Date d'émission</span>
                      <span className="text-slate-900 font-black">{selectedInvoice.date}</span>
                   </div>
                   <div className="flex justify-between pb-4 border-b border-slate-50">
                      <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Statut du paiement</span>
                      <span className="text-emerald-500 font-black uppercase text-[10px] tracking-widest px-3 py-1 bg-emerald-50 rounded-lg">{selectedInvoice.status}</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl">
                      <span className="text-slate-900 font-black uppercase text-xs tracking-widest">Montant Total</span>
                      <span className="text-2xl font-black text-indigo-600">{formatPrice(selectedInvoice.amount)}</span>
                   </div>
                </div>

                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-3">
                   <Download size={18} /> Télécharger la facture PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create New Brief Modal */}
      <AnimatePresence>
        {isBriefModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBriefModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Nouveau Brief</h3>
                      <p className="text-slate-500 text-sm italic">Commandez un reportage sur-mesure</p>
                   </div>
                   <button onClick={() => setIsBriefModalOpen(false)} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900">
                      <X size={20} />
                   </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsBriefModalOpen(false); }}>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Titre du reportage</label>
                      <input type="text" placeholder="Ex: Impact de la sécheresse à Faranah" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-900" />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Budget Estimé (FG)</label>
                         <input type="number" placeholder="5000000" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-900" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Deadline souhaitée</label>
                         <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-900" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Description détaillée & Brief</label>
                      <textarea rows={5} placeholder="Décrivez précisément ce que vous attendez du reportage..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold text-slate-900 resize-none"></textarea>
                   </div>

                   <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
                      <div className="bg-indigo-600 text-white p-2 rounded-xl">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="text-xs text-indigo-900 leading-relaxed font-medium">
                        Votre commande sera analysée par notre rédaction. Une fois validée, un journaliste correspondant sera assigné et vous pourrez suivre l'évolution en temps réel.
                      </div>
                   </div>

                   <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                      Soumettre la demande de reportage
                   </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PressRelationView = ({ onCancel }: { onCancel: () => void }) => (
  <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center">
      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600">
        <Newspaper size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Relation Presse</h2>
      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
        Notre service de Relation Presse facilite la communication entre les organisations et les médias. 
        Nous assurons la diffusion de vos communiqués et la gestion de votre image médiatique.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">Diffusion de Communiqués</h4>
          <p className="text-sm text-slate-500 font-medium">Envoyez vos actualités à notre réseau de plus de 500 rédactions certifiées.</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">Veille Médiatique</h4>
          <p className="text-sm text-slate-500 font-medium">Suivez en temps réel l'impact de vos annonces et votre présence dans les médias.</p>
        </div>
      </div>
      <button onClick={onCancel} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
        Retour à l'accueil
      </button>
    </div>
  </section>
);

const FactCheckingView = ({ onCancel }: { onCancel: () => void }) => (
  <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
        <ShieldCheck size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Fact Checking</h2>
      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
        La lutte contre la désinformation est au cœur de notre mission. Nos experts certifient l'authenticité 
        des informations et des contenus multimédias circulant sur la plateforme.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-4 bg-emerald-50 rounded-2xl">
          <div className="text-2xl font-black text-emerald-600 mb-1">100%</div>
          <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Vérifié</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl">
          <div className="text-2xl font-black text-emerald-600 mb-1">IA + Humain</div>
          <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Méthodologie</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-2xl">
          <div className="text-2xl font-black text-emerald-600 mb-1">Blockchain</div>
          <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Traçabilité</div>
        </div>
      </div>
      <button onClick={onCancel} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
        Retour à l'accueil
      </button>
    </div>
  </section>
);

const CollaborationView = ({ onCancel }: { onCancel: () => void }) => (
  <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 text-center">
      <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-8 text-purple-600">
        <Users size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Collaboration</h2>
      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
        CollectInfos encourage les partenariats stratégiques entre médias, institutions et contributeurs indépendants. 
        Développons ensemble des projets éditoriaux d'envergure.
      </p>
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white text-left mb-12">
        <h4 className="text-xl font-black mb-4 uppercase tracking-tight">Pourquoi collaborer ?</h4>
        <ul className="space-y-4 text-slate-400">
          <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400" size={18} /> Accès à un réseau international de correspondants</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400" size={18} /> Mutualisation des ressources de production</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400" size={18} /> Échanges d'expertises et de technologies</li>
        </ul>
      </div>
      <button onClick={onCancel} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl">
        Nous Rejoindre
      </button>
    </div>
  </section>
);

const ContactView = ({ onCancel }: { onCancel: () => void }) => (
  <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
        <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">Contactez-nous</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message envoyé !"); onCancel(); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Nom</label>
            <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold" placeholder="Votre nom" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Email</label>
            <input required type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold" placeholder="votre@email.com" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Message</label>
            <textarea required rows={5} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold resize-none" placeholder="Comment pouvons-nous vous aider ?" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
            Envoyer le Message
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center space-y-10">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 shrink-0">
            <Phone size={28} />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Téléphone</h4>
            <p className="text-2xl font-black text-slate-900">+224 626 89 18 27</p>
            <p className="text-sm text-slate-500 font-medium italic">Service disponible 24/7</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 shrink-0">
            <Send size={28} />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email</h4>
            <p className="text-2xl font-black text-slate-900">contact@collectinfos.com</p>
            <p className="text-sm text-slate-500 font-medium italic">Réponse sous 24h</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 shrink-0">
            <Building2 size={28} />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Siège Social</h4>
            <p className="text-2xl font-black text-slate-900">Conakry, Guinée</p>
            <p className="text-sm text-slate-500 font-medium italic">Kaloum Business Center</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AdminDashboard = ({ user, onCancel, pendingReports, setPendingReports, formatPrice, onRefreshPublicFeed }: { 
  user: any,
  onCancel: () => void, 
  pendingReports: any[], 
  setPendingReports: React.Dispatch<React.SetStateAction<any[]>>,
  formatPrice: (p: number) => string,
  onRefreshPublicFeed?: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CONTENT' | 'MEMBERS' | 'PAYMENTS' | 'NEWSLETTER' | 'SETTINGS'>('OVERVIEW');
  const [selectedInfo, setSelectedInfo] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [adminPasswords, setAdminPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [loadingReports, setLoadingReports] = useState(false);
  const [adminStats, setAdminStats] = useState({
    users: 0,
    pendingReports: 0,
    monthlySales: 0,
    alerts: 0
  });

  useEffect(() => {
    fetchAdminStats();
    if (activeTab === 'MEMBERS') {
      fetchUsers();
    }
    if (activeTab === 'CONTENT') {
      fetchPendingReports();
    }
  }, [activeTab]);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setAdminStats(data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    }
  };

  const fetchPendingReports = async () => {
    setLoadingReports(true);
    try {
      const response = await fetch('/api/reports?status=PENDING');
      if (response.ok) {
        const data = await response.json();
        // Format to match existing UI expectation if needed
        const formattedData = data.map((r: any) => ({
          ...r,
          id: String(r.id),
          author: r.author_name || 'Anonyme',
          date: new Date(r.created_at).toLocaleDateString('fr-FR'),
          mediaCount: (r.media_photos ? JSON.parse(r.media_photos).length : 0) + 
                      (r.media_videos ? JSON.parse(r.media_videos).length : 0) + 
                      (r.media_docs ? JSON.parse(r.media_docs).length : 0),
          photos: r.media_photos ? JSON.parse(r.media_photos) : [],
          videos: r.media_videos ? JSON.parse(r.media_videos) : [],
          docs: r.media_docs ? JSON.parse(r.media_docs) : []
        }));
        setPendingReports(formattedData);
      }
    } catch (err) {
      console.error('Error fetching pending reports:', err);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          console.error('Error fetching users:', errData.error);
        } else {
          console.error(`Erreur serveur (${response.status}) lors de la récupération des utilisateurs`);
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cet adhérent ?')) return;
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (adminPasswords.new !== adminPasswords.confirm) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    if (adminPasswords.new.length < 6) {
      setPasswordError('Le nouveau mot de passe doit faire au moins 6 caractères');
      return;
    }

    try {
      const response = await fetch('/api/admin/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user?.email, 
          newPassword: adminPasswords.new 
        })
      });

      if (response.ok) {
        setPasswordSuccess('Mot de passe mis à jour avec succès');
        setAdminPasswords({ current: '', new: '', confirm: '' });
      } else {
        setPasswordError('Erreur lors de la mise à jour');
      }
    } catch (err) {
      setPasswordError('Erreur de connexion au serveur');
    }
  };

  const handleUpdateStatus = async (userId: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
      }
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  const handleResetSystem = async () => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser TOUT le système ? Cela supprimera tous les reportages et toutes les commandes.')) return;
    try {
      const response = await fetch('/api/admin/reset-system', { method: 'POST' });
      if (response.ok) {
        alert('Système réinitialisé avec succès !');
        setPendingReports([]);
      }
    } catch (err) {
      alert('Erreur lors de la réinitialisation');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'VALIDATED' })
      });
      if (response.ok) {
        setPendingReports(prev => prev.filter(r => r.id !== id));
        if (selectedInfo?.id === id) setSelectedInfo(null);
        if (onRefreshPublicFeed) onRefreshPublicFeed();
        fetchAdminStats();
        alert('Reportage validé et publié avec succès !');
      }
    } catch (err) {
      console.error('Error approving report:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' })
      });
      if (response.ok) {
        setPendingReports(prev => prev.filter(r => r.id !== id));
        if (selectedInfo?.id === id) setSelectedInfo(null);
        fetchAdminStats();
        alert('Reportage rejeté.');
      }
    } catch (err) {
      console.error('Error rejecting report:', err);
    }
  };

  return (
    <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Admin Left Sidebar */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-8 order-2 lg:order-1">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">État des Serveurs</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">API</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Opérationnel
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Base de données</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Opérationnel
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">CDN</span>
                <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Opérationnel
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Événements récents</h4>
            <div className="space-y-6">
              {[
                { type: 'LOGIN', text: 'Admin s\'est connecté', time: 'À l\'instant', color: 'bg-indigo-50 text-indigo-500' },
                { type: 'BACKUP', text: 'Sauvegarde effectuée', time: 'Il y a 30 min', color: 'bg-emerald-50 text-emerald-500' },
                { type: 'UPDATE', text: 'Mise à jour système', time: 'Il y a 2h', color: 'bg-amber-50 text-amber-500' }
              ].map((ev, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-lg ${ev.color} flex items-center justify-center shrink-0`}>
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800 leading-tight">{ev.text}</p>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-lg font-black mb-2">Sécurité maximale</h4>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">Toutes les transactions et accès sont chiffrés de bout en bout.</p>
            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
              Journal de sécurité
            </button>
          </div>
        </aside>

        <div className="flex-1 order-1 lg:order-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Supervision</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Panneau d'Administration</h3>
            </div>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={() => setActiveTab('OVERVIEW')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'OVERVIEW' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  Vue d'ensemble
                </button>
                <button 
                  onClick={() => setActiveTab('MEMBERS')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'MEMBERS' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  Adhérents
                </button>
                <button onClick={onCancel} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl">
                  Quitter
                </button>
              </div>
          </div>

        {activeTab === 'OVERVIEW' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {[
                { label: 'Utilisateurs', value: adminStats.users, icon: Users, color: 'bg-blue-50 text-blue-600' },
                { label: 'Infos en attente', value: adminStats.pendingReports, icon: Clock, color: 'bg-amber-50 text-amber-600' },
                { label: 'Ventes du mois', value: formatPrice(adminStats.monthlySales), icon: Wallet, color: 'bg-emerald-50 text-emerald-600' },
                { label: 'Signalements', value: adminStats.alerts, icon: AlertCircle, color: 'bg-red-50 text-red-600' }
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
                    { user: 'Nouveau Membre', action: 'a soumis un nouveau reportage', time: 'Il y a 5 min' },
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

              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-900/20">
                <h4 className="text-xl font-black mb-8">Actions Rapides</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Modérer les contenus', icon: ShieldCheck, tab: 'CONTENT' as const },
                    { label: 'Gérer les adhérents', icon: Users, tab: 'MEMBERS' as const },
                    { label: 'Gérer les paiements', icon: DollarSign, tab: 'PAYMENTS' as const },
                    { label: 'Envoyer newsletter', icon: Send, tab: 'NEWSLETTER' as const },
                    { label: 'Paramètres système', icon: LayoutDashboard, tab: 'SETTINGS' as const }
                  ].map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveTab(action.tab)}
                      className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left border border-white/5 group"
                    >
                      <div className="p-2 transition-transform group-hover:scale-110">
                        <action.icon size={20} className="text-indigo-400" />
                      </div>
                      <span className="text-sm font-bold">{action.label}</span>
                      <ChevronRight size={16} className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'OVERVIEW' && (
          <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-4 mb-10">
              <button 
                onClick={() => setActiveTab('OVERVIEW')}
                className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <h4 className="text-2xl font-black text-slate-900">
                {activeTab === 'CONTENT' && 'Modération des contenus'}
                {activeTab === 'PAYMENTS' && 'Gestion des paiements'}
                {activeTab === 'NEWSLETTER' && 'Envoi de newsletter'}
                {activeTab === 'MEMBERS' && 'Gestion des adhérents'}
                {activeTab === 'SETTINGS' && 'Paramètres système'}
              </h4>
            </div>
            
              {activeTab === 'CONTENT' && (
                <div className="space-y-6">
                   {pendingReports.length > 0 ? pendingReports.map((item) => (
                     <div key={item.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all gap-6 shadow-sm">
                       <div className="flex items-center gap-6 flex-1">
                         <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black">
                           {item.author?.[0] || 'U'}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.category}</span>
                              <span className="text-[10px] text-slate-400 font-bold">• {item.date}</span>
                            </div>
                            <h5 className="text-lg font-black text-slate-900">{item.title}</h5>
                            <p className="text-xs text-slate-500">Soumis par <span className="font-bold text-indigo-600">{item.author}</span></p>
                         </div>
                       </div>
                       <div className="flex gap-3">
                         <button 
                           onClick={() => setSelectedInfo(item)}
                           className="px-6 py-3 bg-white text-slate-600 rounded-xl font-bold border border-slate-100 hover:bg-slate-50 hover:text-indigo-600 transition-all flex items-center gap-2"
                         >
                           <Eye size={18} /> Voir
                         </button>
                         <button 
                           onClick={() => handleReject(item.id)}
                           className="px-6 py-3 bg-white text-slate-400 rounded-xl font-bold border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-2"
                         >
                           <XCircle size={18} /> Rejeter
                         </button>
                         <button 
                           onClick={() => handleApprove(item.id)}
                           className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2"
                         >
                           <CheckCircle2 size={18} /> Approuver & Publier
                         </button>
                       </div>
                     </div>
                   )) : (
                     <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem]">
                       <ShieldCheck size={48} className="text-slate-200 mb-4" />
                       <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Tous les contenus ont été traités</p>
                     </div>
                   )}
                </div>
              )}

              {activeTab === 'PAYMENTS' && (
                <div className="space-y-8">
                  <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Total Commissions à reverser (70%)</p>
                      <h5 className="text-3xl font-black text-slate-900">{formatPrice(0)}</h5>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Revenus CollectInfos (30%)</p>
                      <h5 className="text-xl font-black text-indigo-600">{formatPrice(0)}</h5>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <p className="text-xs font-bold text-amber-800 leading-relaxed">
                      <span className="font-black uppercase tracking-wider">Règle de répartition :</span> Le producteur (Journaliste/Correspondant) perçoit <span className="font-black">70%</span> du montant HT de la vente. CollectInfos perçoit une commission de <span className="font-black">30%</span> pour les frais de plateforme.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Bénéficiaire & Production</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Vente Totale</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-emerald-600">Part Journaliste (70%)</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-indigo-600">Part Collect (30%)</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Statut</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Régler</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[].map((pay, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6">
                              <div>
                                <p className="text-sm font-bold text-slate-900">{pay.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{pay.prod}</p>
                              </div>
                            </td>
                            <td className="px-8 py-6 font-bold text-slate-400">{formatPrice(pay.total)}</td>
                            <td className="px-8 py-6 font-black text-emerald-600">{formatPrice(pay.total * 0.7)}</td>
                            <td className="px-8 py-6 font-black text-indigo-600">{formatPrice(pay.total * 0.3)}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${pay.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'}`}>
                                {pay.status === 'PAID' ? 'Payé' : 'En attente'}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              {pay.status === 'PENDING' && (
                                <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-slate-900 transition-all">
                                  <DollarSign size={16} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'NEWSLETTER' && (
                <div className="max-w-2xl mx-auto py-10">
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                    <div className="mb-10 text-center">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                        <Send size={28} className="text-indigo-600" />
                      </div>
                      <h5 className="text-2xl font-black text-slate-900 mb-2">Diffuser une annonce</h5>
                      <p className="text-sm text-slate-500">Envoyez une notification à tout l'écosystème CollectInfos</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Newsletter envoyée avec succès !'); }}>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-4">Cibles</label>
                        <select className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option>Tous les utilisateurs (1)</option>
                          <option>Journalistes & Correspondants (0)</option>
                          <option>Clients Médias (0)</option>
                          <option>Visiteurs occasionnels</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-4">Objet de l'annonce</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Mise à jour des tarifs de commission"
                          className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-4">Message</label>
                        <textarea 
                          rows={6}
                          placeholder="Rédigez votre message ici..."
                          className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                      </div>

                      <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 mt-4">
                        Envoyer maintenant
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'MEMBERS' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                  {loadingUsers ? (
                    <div className="flex justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : users.length > 0 ? (
                    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Utilisateur</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Rôle</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Statut</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-600">
                                    {String(user.name).charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 
                                  user.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 
                                  'bg-red-50 text-red-600'
                                }`}>
                                  {user.status === 'ACTIVE' ? 'Activé' : 
                                   user.status === 'PENDING' ? 'En attente' : 
                                   user.status === 'REJECTED' ? 'Refusé' : 'Bloqué'}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex gap-2 justify-end">
                                  {/* Bouton Voir */}
                                  <button 
                                    onClick={() => setSelectedInfo({ ...user, type: 'USER_DETAIL' })}
                                    className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                    title="Voir"
                                  >
                                    <Eye size={18} />
                                  </button>

                                  {/* Bouton Activer/Bloquer */}
                                  <button 
                                    onClick={() => handleUpdateStatus(user.id, user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE')}
                                    className={`p-2 rounded-xl transition-all shadow-sm ${
                                      user.status === 'ACTIVE' 
                                        ? 'bg-slate-50 text-slate-400 hover:bg-slate-600 hover:text-white' 
                                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                    }`}
                                    title={user.status === 'ACTIVE' ? 'Bloquer' : 'Activer'}
                                  >
                                    {user.status === 'ACTIVE' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                                  </button>

                                  {/* Bouton Supprimer */}
                                  {user.role !== 'ADMIN' && (
                                    <button 
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                      title="Supprimer"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem]">
                      <Users size={48} className="text-slate-200 mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Aucun utilisateur trouvé</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'SETTINGS' && (
                <div className="max-w-2xl mx-auto py-10">
                  <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm mb-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <Lock size={24} />
                      </div>
                      <h5 className="text-xl font-black text-slate-900">Sécurité du compte Admin</h5>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-6">
                      {passwordError && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-widest">{passwordError}</div>}
                      {passwordSuccess && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold uppercase tracking-widest">{passwordSuccess}</div>}
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Nouveau mot de passe</label>
                        <input 
                          type="password" 
                          value={adminPasswords.new}
                          onChange={(e) => setAdminPasswords({...adminPasswords, new: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Confirmer le nouveau mot de passe</label>
                        <input 
                          type="password" 
                          value={adminPasswords.confirm}
                          onChange={(e) => setAdminPasswords({...adminPasswords, confirm: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
                      >
                        Mettre à jour mon mot de passe
                      </button>
                    </form>
                  </div>
                  <div className="bg-red-50 border border-red-100 p-10 rounded-[3rem] mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                        <AlertTriangle size={24} />
                      </div>
                      <h5 className="text-xl font-black text-red-900">Zone de danger</h5>
                    </div>
                    <p className="text-sm text-red-800 mb-8 leading-relaxed">
                      La réinitialisation supprimera toutes les données de test (reportages et commandes) pour préparer la plateforme à la production. Les comptes utilisateurs seront conservés.
                    </p>
                    <button 
                      onClick={handleResetSystem}
                      className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center gap-3"
                    >
                      <RefreshCw size={18} /> Réinitialiser pour la production
                    </button>
                  </div>
                  <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                    <div className="text-center text-slate-300">
                      <Settings size={32} className="mx-auto mb-2 opacity-20" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Autres paramètres à venir</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
        )}
        </div>
      </div>

      {selectedInfo && (
        <Modal 
          info={selectedInfo} 
          onClose={() => setSelectedInfo(null)} 
          formatPrice={formatPrice} 
        />
      )}
    </section>
  );
};

const CorrespondantDashboard = ({ onCancel, formatPrice, pendingReports, setPendingReports, user, onRefreshPublicFeed }: { 
  onCancel: () => void, 
  formatPrice: (p: number) => string,
  pendingReports: any[],
  setPendingReports: React.Dispatch<React.SetStateAction<any[]>>,
  user: any,
  onRefreshPublicFeed?: () => void
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CREATE' | 'ARTICLES' | 'FOLLOWERS'>('OVERVIEW');
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [editingReport, setEditingReport] = useState<any | null>(null);

  const correspondent = user || { 
    name: 'Utilisateur', 
    avatar: 'https://picsum.photos/seed/user/200', 
    role: 'CORRESPONDANT', 
    stats: { posts: 0, followers: 0, following: 0 },
    wallet: { balance: 0, pendingPayouts: 0 }
  };
  
  const [dbArticles, setDbArticles] = useState<any[]>([]);

  useEffect(() => {
    if (correspondent?.id) {
      fetch(`/api/reports?author_id=${correspondent.id}`)
        .then(res => res.json())
        .then(data => setDbArticles(data))
        .catch(err => console.error("Error fetching articles:", err));
    }
  }, [correspondent?.id]);

  const myArticles = useMemo(() => {
    const mock = MOCK_INFOS.filter(info => info.author.includes('Rédaction') || info.author.includes(correspondent?.name || ''));
    // Map DB articles to match the expected format if necessary
    const formattedDb = dbArticles.map(art => {
      let mainImage = 'https://picsum.photos/seed/article/800/600';
      if (art.media_photos) {
        try {
          const photos = JSON.parse(art.media_photos);
          if (Array.isArray(photos) && photos.length > 0) {
            mainImage = photos[0];
          }
        } catch (e) { console.error(e); }
      }

      return {
        ...art,
        id: String(art.id),
        author: art.author_name || correspondent?.name,
        author_avatar: art.author_avatar || correspondent?.avatar,
        image: mainImage,
        date: new Date(art.created_at).toLocaleDateString('fr-FR'),
        type: art.category,
        badge: art.status === 'VALIDATED' ? 'Exclusif' : 'En attente',
        photos: art.media_photos ? JSON.parse(art.media_photos) : [],
        videos: art.media_videos ? JSON.parse(art.media_videos) : [],
        docs: art.media_docs ? JSON.parse(art.media_docs) : []
      };
    });
    return [...formattedDb, ...mock];
  }, [correspondent?.name, dbArticles]);

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.querySelector('input[placeholder="Entrez un titre choc..."]') as HTMLInputElement;
    const categorySelect = form.querySelector('select') as HTMLSelectElement;
    const priceInput = form.querySelector('input[type="number"]') as HTMLInputElement;
    const contentTextarea = form.querySelector('textarea') as HTMLTextAreaElement;
    
    // UI Feedback: Show loading
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Traitement des fichiers...";

    try {
      // Convert all media to base64
      let photoB64 = photos.length > 0 ? await Promise.all(photos.map(p => toBase64(p))) : (editingReport?.photos || []);
      let videoB64 = videos.length > 0 ? await Promise.all(videos.map(v => toBase64(v))) : (editingReport?.videos || []);
      let docB64 = documents.length > 0 ? await Promise.all(documents.map(d => toBase64(d))) : (editingReport?.docs || []);

      const newReportData = {
        title: titleInput.value,
        description: titleInput.value,
        content: contentTextarea.value,
        price: priceInput.value ? parseFloat(priceInput.value) : 0,
        category: categorySelect.value,
        author_id: correspondent?.id,
        photos: photoB64,
        videos: videoB64,
        docs: docB64
      };

      let response;
      if (editingReport && !String(editingReport.id).startsWith('mock-')) {
        const reportId = String(editingReport.id).replace('db-', '');
        response = await fetch(`/api/reports/${reportId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReportData)
        });
      } else {
        response = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReportData)
        });
      }

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      if (editingReport) {
        // Update local state for DB articles if needed
        fetch(`/api/reports?author_id=${correspondent.id}`)
          .then(res => res.json())
          .then(data => setDbArticles(data));
      } else {
        const savedReport = await response.json();
        const newReportForState = {
          ...newReportData,
          id: savedReport.id || Math.random().toString(36).substr(2, 9),
          author: correspondent?.name || 'Anonyme',
          date: new Date().toLocaleDateString('fr-FR'),
          status: 'PENDING',
          mediaCount: photos.length + videos.length + documents.length,
        };
        setPendingReports([newReportForState, ...pendingReports]);
        if (user && user.stats) {
          user.stats.posts = (user.stats.posts || 0) + 1;
        }
      }

      // Refresh public feed if needed
      if (onRefreshPublicFeed) onRefreshPublicFeed();

      setActiveTab('ARTICLES');
      setEditingReport(null);
      form.reset();
      setPhotos([]);
      setVideos([]);
      setDocuments([]);
      
      console.log('✅ Report saved to database');
    } catch (err) {
      console.error('❌ Error saving report:', err);
      alert('Erreur lors de la sauvegarde du reportage. Vérifiez la taille de vos fichiers.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalBtnText;
    }
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File[]>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setter(Array.from(e.target.files));
    }
  };

  return (
    <section className="py-24 px-6 animate-in fade-in duration-700 bg-[#FDFDFF] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={correspondent?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(correspondent.name)}&background=random`} alt={correspondent?.name} className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg ring-4 ring-white">
                <Camera size={20} />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-1 uppercase">Tableau de Bord</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{correspondent.name}</h3>
              <p className="text-slate-500 font-medium italic mt-1">Correspondant Certifié</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={() => setActiveTab('CREATE')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-slate-900 transition-all active:scale-[0.98]"
             >
               <Plus size={20} /> Nouveau Reportage
             </button>
             <button onClick={onCancel} className="px-8 py-4 bg-white text-slate-900 border border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
               Déconnexion
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: t('dashboard.correspondant.stats.articles'), value: correspondent.stats?.posts || 0, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: t('dashboard.correspondant.stats.followers'), value: correspondent.stats?.followers || 0, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: t('dashboard.correspondant.stats.balance'), value: formatPrice(correspondent.wallet?.balance || 0), icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: t('dashboard.correspondant.stats.pending_gain'), value: formatPrice(correspondent.wallet?.pendingPayouts || 0), icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex p-1.5 bg-slate-100/50 rounded-[1.8rem] mb-12 gap-1 border border-slate-100 max-w-2xl">
          {[
            { id: 'OVERVIEW', label: t('dashboard.correspondant.tabs.overview') },
            { id: 'CREATE', label: t('dashboard.correspondant.tabs.create') },
            { id: 'ARTICLES', label: t('dashboard.correspondant.tabs.archives') },
            { id: 'FOLLOWERS', label: t('dashboard.correspondant.tabs.network') }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-100/30 scale-[1.03]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'OVERVIEW' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Suivi des publications</h4>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">30 derniers jours</span>
                  </div>
                  <div className="h-64 flex items-end gap-3 px-4">
                    {[65, 45, 80, 50, 90, 70, 40, 85, 30, 95, 60, 75].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-100 rounded-t-xl relative group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05 + 0.3 }}
                          className="w-full bg-indigo-600/20 group-hover:bg-indigo-600 transition-all rounded-t-xl" 
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h} vues
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest px-4 font-mono">
                    <span>Jan</span>
                    <span>Déc</span>
                  </div>
                </div>

                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50">
                  <h4 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Dernières interactions</h4>
                  <div className="space-y-6">
                     {[
                       { type: 'LIKE', text: 'Un lecteur a aimé votre reportage sur Titan', time: '5m' },
                       { type: 'SALE', text: 'TV5 Monde a acheté une licence de diffusion', time: '2h', bonus: '+240€' },
                       { type: 'FOLLOW', text: 'Alpha News vous suit désormais', time: '1d' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between py-2">
                         <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'SALE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                              {item.type === 'SALE' ? <DollarSign size={18} /> : item.type === 'LIKE' ? <Play size={18} /> : <User size={18} />}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-700 leading-snug">{item.text}</p>
                              <p className="text-[10px] font-black text-slate-300 uppercase mt-1 tracking-wider">{item.time} ago</p>
                           </div>
                         </div>
                         {item.bonus && <span className="text-emerald-500 font-black text-sm">{item.bonus}</span>}
                       </div>
                     ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-900/10 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Wallet className="text-indigo-400" size={20} />
                    Retrait de Gains
                  </h4>
                  <div className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Disponible</p>
                    <div className="text-4xl font-black tracking-tighter mb-1">{formatPrice(1220)}</div>
                    <p className="text-xs text-slate-400 font-medium">Prochain virement automatique : 01 Mai</p>
                  </div>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-slate-950/20 active:scale-95">
                    Demander un virement
                  </button>
                </div>

                <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-200/20">
                   <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Compass className="text-indigo-200" size={20} />
                    Mission en cours
                  </h4>
                  <div className="p-6 bg-white/10 rounded-[2rem] border border-white/10">
                    <h5 className="font-bold text-sm mb-2">Reportage Marché Madina</h5>
                    <p className="text-xs text-indigo-100 leading-relaxed mb-4">Besoin d'une interview de commerçants sur l'inflation.</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Budget: 350€</span>
                       <span className="text-[10px] px-2 py-1 bg-white/20 rounded-md font-bold">2J restants</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'CREATE' && (
            <motion.div 
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100"
            >
               <div className="mb-12 flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Rédaction Article</h3>
                    <p className="text-slate-500 font-medium italic">Votre contenu sera soumis à l'approbation de l'administration avant publication.</p>
                  </div>
                  <button onClick={() => setActiveTab('OVERVIEW')} className="p-4 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 rounded-2xl transition-all">
                    <X size={20} />
                  </button>
               </div>

               <form key={editingReport?.id || 'new'} onSubmit={handleCreateReport} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Titre de l'Information</label>
                        <input required defaultValue={editingReport?.title || ''} className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.8rem] px-8 py-5 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-bold text-lg" placeholder="Entrez un titre choc..." />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Catégorie</label>
                          <select defaultValue={editingReport?.category || CATEGORIES[0]} className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.4rem] px-6 py-4 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-bold">
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Prix de vente (€)</label>
                          <input type="number" defaultValue={editingReport?.price || ''} className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.4rem] px-6 py-4 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-bold" placeholder="Facultatif" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Contenu de l'article</label>
                        <textarea required defaultValue={editingReport?.content || ''} rows={8} className="w-full bg-slate-50/50 border border-slate-100 rounded-[2rem] px-8 py-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all font-medium leading-relaxed resize-none" placeholder="Rédigez votre reportage ici..." />
                      </div>
                    </div>

                    <div className="space-y-8">
                       <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                         <Upload size={14} /> Médias et Documents
                       </h5>
                       
                       <div className="grid grid-cols-2 gap-6">
                         <label className={`relative aspect-square rounded-[2.5rem] ${photos.length > 0 ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200'} border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white hover:border-indigo-400 group transition-all`}>
                            <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange(setPhotos)} />
                            <div className={`w-16 h-16 ${photos.length > 0 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'} rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}>
                              <Camera size={32} />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{photos.length > 0 ? `${photos.length} Photo(s)` : 'Photos'}</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-black">{photos.length > 0 ? photos.map(p => p.name).join(', ').slice(0, 20) + '...' : 'JPG, PNG'}</span>
                         </label>

                         <label className={`relative aspect-square rounded-[2.5rem] ${videos.length > 0 ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200'} border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white hover:border-indigo-400 group transition-all`}>
                            <input type="file" className="hidden" multiple accept="video/*" onChange={handleFileChange(setVideos)} />
                            <div className={`w-16 h-16 ${videos.length > 0 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'} rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}>
                              <Video size={32} />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{videos.length > 0 ? `${videos.length} Vidéo(s)` : 'Vidéos'}</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-black">{videos.length > 0 ? videos.map(v => v.name).join(', ').slice(0, 20) + '...' : 'MP4, MOV'}</span>
                         </label>

                         <label className={`relative aspect-square rounded-[2.5rem] ${documents.length > 0 ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200'} border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white hover:border-indigo-400 group transition-all`}>
                            <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx" onChange={handleFileChange(setDocuments)} />
                            <div className={`w-16 h-16 ${documents.length > 0 ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'} rounded-3xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}>
                              <FileText size={32} />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{documents.length > 0 ? `${documents.length} Doc(s)` : 'Documents'}</span>
                            <span className="text-[10px] text-slate-400 mt-1 uppercase font-black">{documents.length > 0 ? documents.map(d => d.name).join(', ').slice(0, 20) + '...' : 'PDF, DOC'}</span>
                         </label>

                         <div className="relative aspect-square rounded-[2.5rem] bg-indigo-50/50 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center p-6 text-center group transition-all">
                            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-90 transition-transform">
                               <Plus size={24} />
                            </div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-4">Plus de slots</p>
                         </div>
                       </div>

                       <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
                          <div className="flex items-start gap-4">
                             <AlertCircle className="text-amber-500 shrink-0 mt-1" size={20} />
                             <p className="text-sm text-amber-900/60 leading-relaxed font-medium italic">
                               "Assurez-vous que vos fichiers ne dépassent pas 500MB par upload pour une performance optimale. Les vidéos brutes sont fortement appréciées par les acheteurs."
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Brouillon sauvé il y a 2 minutes</p>
                    <div className="flex gap-4">
                      <button type="button" className="px-10 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-[0.98]">
                        Sauvegarder Brouillon
                      </button>
                      <button type="submit" className="px-12 py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-200 active:scale-[0.98]">
                        Publier l'Information
                      </button>
                    </div>
                  </div>
               </form>
            </motion.div>
          )}

          {activeTab === 'FOLLOWERS' && (
            <motion.div 
              key="followers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50"
            >
               <div className="flex items-center justify-between mb-12">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight">Mon Réseau</h4>
                    <p className="text-slate-500 font-medium italic">Personnes et médias qui suivent votre actualité</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-black shadow-sm uppercase tracking-widest">Followers</button>
                    <button className="px-4 py-2 text-slate-400 hover:text-slate-600 rounded-lg text-xs font-black uppercase tracking-widest">Suivis</button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MOCK_PROFILES.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all">
                      <img src={p?.avatar} alt={p?.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white" />
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 mb-0.5 group-hover:text-indigo-600 transition-colors">{p.name}</h5>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.role}</p>
                      </div>
                      <button className="p-3 bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                 ))}
                 {/* Fill some fake data */}
                 {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`f-${i}`} className="flex items-center gap-4 p-5 bg-slate-100/50 rounded-[2rem] border border-slate-100">
                      <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                        <User size={24} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 mb-0.5">Utilisateur #{823 + i}</h5>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{i % 2 === 0 ? 'Lecteur Passionné' : 'Journaliste'}</p>
                      </div>
                      <button className="p-3 bg-white text-slate-300 rounded-xl">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                 ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'ARTICLES' && (
            <motion.div 
              key="articles"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight italic">Journal de Bord</h4>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-xl text-sm font-medium w-48 md:w-64" placeholder="Filtrer mes archives..." />
                    </div>
                    <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                      <Filter size={18} />
                    </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {pendingReports.map((report) => (
                    <div key={report.id} className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-4 animate-pulse">
                         <Clock size={24} />
                       </div>
                       <h5 className="font-bold text-slate-600 text-sm mb-1 line-clamp-1 italic px-4">"{report.title}"</h5>
                       <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">En cours de validation</p>
                    </div>
                 ))}
                 {myArticles.map((article) => (
                    <motion.div 
                      layout
                      whileHover={{ scale: 1.02 }}
                      key={article.id}
                      className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col group h-full"
                    >
                      <div className="aspect-video relative overflow-hidden shrink-0">
                         <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                         <div className="absolute top-4 left-4">
                            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest italic">
                               {article.category}
                            </span>
                         </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                         <div>
                            <h5 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-2 line-clamp-2">{article.title}</h5>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                               <Clock size={12} /> {article.date}
                            </div>
                         </div>
                         <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                             <div className={`flex items-center gap-1 font-black text-xs italic ${
                               article.status === 'VALIDATED' ? 'text-emerald-500' : 
                               article.status === 'REJECTED' ? 'text-red-500' : 'text-amber-500'
                             }`}>
                                {article.status === 'VALIDATED' ? <CheckCircle2 size={14} /> : 
                                 article.status === 'REJECTED' ? <XCircle size={14} /> : <Clock size={14} />}
                                {article.status === 'VALIDATED' ? 'Validé' : 
                                 article.status === 'REJECTED' ? 'Refusé' : 'En attente'}
                            </div>
                            <button 
                              onClick={() => {
                                setEditingReport(article);
                                setActiveTab('CREATE');
                              }}
                              className="text-indigo-600 hover:text-slate-900 transition-colors p-2 bg-indigo-50 rounded-xl"
                            >
                               <Edit size={18} />
                            </button>
                         </div>
                      </div>
                    </motion.div>
                 ))}
                 {/* Actual pending state used above */}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const OrderForm = ({ onCancel }: { onCancel: () => void }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">{t('order.success_title')}</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">{t('order.success_desc')}</p>
          <button 
            onClick={onCancel}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
          >
            {t('order.home')}
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
            <h2 className="text-sm font-black tracking-[0.2em] text-emerald-600 mb-4 uppercase">{t('order.subtitle')}</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{t('order.title')}</h3>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.company')}</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Media Group SA" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.manager')}</label>
                <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Sarah Smith" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.project_title')}</label>
              <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Ex: Reportage Innovation Dakar" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.budget')}</label>
                <input required type="number" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="Ex: 5000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.deadline')}</label>
                <input required type="date" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('order.details')}</label>
               <textarea required rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none" placeholder="Objectifs, public cible, contraintes techniques..." />
            </div>

            <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:border-emerald-200 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:text-emerald-600 transition-colors">
                <FileText size={32} />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">{t('order.attach')}</p>
              <p className="text-xs text-slate-400">{t('order.attach_desc')}</p>
              <input type="file" className="hidden" />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all"
              >
                {t('order.cancel')}
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
              >
                {t('order.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const ProfileModal = ({ profile, onClose, formatPrice, onOpenChat }: { profile: UserProfile; onClose: () => void, formatPrice: (p: number) => string, onOpenChat: (p: UserProfile) => void }) => {
  const { t } = useTranslation();
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
            <img src={profile?.avatar} alt={profile?.name} className="w-32 h-32 rounded-[2rem] object-cover ring-8 ring-slate-50 shadow-xl" />
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
              <div className="text-2xl font-black text-slate-900">{profile.stats?.posts || 0}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Publications</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{((profile.stats?.followers || 0) / 1000).toFixed(1)}k</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Abonnés</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{profile.stats?.following || 0}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Suivis</div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              {t('common.subscribe')}
            </button>
            <button 
              onClick={() => onOpenChat(profile)}
              className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all"
            >
              {t('common.message')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExpertChat = ({ activeProfile, onCancel }: { activeProfile: UserProfile | null, onCancel: () => void }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: 1, text: t('chat.welcome'), sender: 'expert', time: '10:00' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ai = useMemo(() => new GoogleGenerativeAI(process.env.GEMINI_API_KEY!), []);
  const model = useMemo(() => ai.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: t('chat.system')
  }), [ai, t]);
  
  const chatSession = useMemo(() => model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Bonjour, j'ai besoin d'aide." }],
      },
      {
        role: "model",
        parts: [{ text: t('chat.welcome') }],
      },
    ],
  }), [model, t]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = { 
      id: Date.now(), 
      text: inputText, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(inputText);
      const response = result.response;
      const text = response.text();

      const aiMessage = {
        id: Date.now() + 1,
        text: text || t('chat.error'),
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: t('chat.error'),
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[700px]">
        {/* Chat Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
              <ArrowLeft size={20} />
            </button>
            <div className="relative">
              <img src={activeProfile?.avatar || "https://picsum.photos/seed/chat/100"} alt="Avatar" className="w-12 h-12 rounded-2xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h4 className="font-black text-slate-900">{activeProfile?.name || t('chat.expert')}</h4>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{t('chat.online')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all">
              <Camera size={18} />
            </button>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-5 rounded-3xl text-sm font-medium shadow-sm ${
                msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                <div className="markdown-body">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-300'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-slate-50">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <div className="flex-1 relative">
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? t('chat.loading') : t('chat.placeholder')} 
                className="w-full bg-slate-50 border-none rounded-2xl pl-6 pr-12 py-4 focus:ring-4 focus:ring-indigo-500/5 transition-all font-medium disabled:opacity-50"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600">
                <PlusCircle size={20} />
              </button>
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !inputText.trim()}
              className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const BankTransferPayment = ({ item, onCancel, formatPrice }: { item: InfoPost; onCancel: () => void; formatPrice: (p: number) => string }) => {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50">
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={onCancel}
            className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{t('payment.title')}</h3>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] mb-8 space-y-4 border border-slate-100">
          <div className="flex justify-between items-center">
             <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">{t('payment.amount')}</span>
             <span className="text-2xl font-black text-indigo-600">{formatPrice(item.price || 0)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
             <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">{t('payment.ref')}</span>
             <span className="font-mono text-sm font-bold text-slate-900 bg-white px-3 py-1 rounded-lg shadow-sm">REF-{item.id.toUpperCase().slice(0, 8)}</span>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {t('payment.desc')}
          </p>
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white font-mono text-xs space-y-4 shadow-xl">
             <div className="space-y-1">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] text-left">{t('payment.holder')}</p>
                <p className="text-sm font-bold">COLLECT-INFOS MEDIA GROUP</p>
             </div>
             <div className="space-y-1">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] text-left">IBAN</p>
                <p className="text-sm font-bold tracking-wider">FR76 3000 6000 0112 3456 7890 123</p>
             </div>
             <div className="space-y-1">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] text-left">BIC / SWIFT</p>
                <p className="text-sm font-bold uppercase">COLINFOPARXX</p>
             </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tighter text-left">
              {t('payment.warning')}
            </p>
          </div>
        </div>

        <button 
          onClick={onCancel} 
          className="w-full bg-indigo-600 text-white py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-200 active:scale-[0.98]"
        >
          {t('payment.confirm')}
        </button>
      </div>
    </section>
  );
};

const ProductModal = ({ item, onClose, formatPrice, onPurchase }: { item: InfoPost; onClose: () => void, formatPrice: (p: number) => string, onPurchase: (item: InfoPost) => void }) => {
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
            <button 
              onClick={() => {
                onPurchase(item);
                onClose();
              }}
              className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-[0.15em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} />
              ACHETEZ LA LICENCE ET PAYER PAR VIREMENT BANCAIRE
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const VideoSection = ({ formatPrice }: { formatPrice: (p: number) => string }) => {
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const videosPerPage = 4;

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
            <p className="hidden md:block text-slate-400 text-lg">Découvrez les derniers reportages de nos envoyés spéciaux</p>
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8"
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
                <div className="p-4 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="hidden md:block text-slate-400 text-sm line-clamp-2 mb-6 opacity-80 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 md:pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <User size={12} className="text-indigo-400 md:w-3.5 md:h-3.5" />
                      </div>
                      <div className="text-[9px] md:text-xs">
                        <p className="font-bold text-slate-200">{video.author.split(' ')[0]}</p>
                        <p className="text-slate-500 hidden md:block">{formatDate(video.date)}</p>
                      </div>
                    </div>
                    {video.price && (
                      <div className="bg-indigo-600/20 text-indigo-400 px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-sm font-black border border-indigo-500/20">
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

const ProfileSection = ({ profiles, setSelectedProfile }: { profiles: any[], setSelectedProfile: (p: UserProfile) => void }) => {
  const { t } = useTranslation();
  // Use real profiles if available, otherwise filter from MOCK_PROFILES
  const displayProfiles = profiles.length > 0 ? profiles : MOCK_PROFILES.filter(p => ['JOURNALISTE', 'CORRESPONDANT', 'PIGISTE'].includes(p.role));

  return (
    <section className="hidden md:block py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-600 mb-4 uppercase">Rôles certifiés</h2>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Nos Journalistes & Correspondants</h3>
          </div>
          <div className="hidden md:block">
            <button className="text-slate-500 font-bold hover:text-indigo-600 transition-colors flex items-center gap-2">
              Voir tout le réseau <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProfiles
            .slice(0, 4)
            .map((profile) => (
            <motion.div 
              key={profile.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img src={profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`} alt={profile?.name} className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50" />
                  <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-xl shadow-lg ${
                    profile.role === 'JOURNALISTE' ? 'bg-amber-500' : 
                    profile.role === 'CORRESPONDANT' ? 'bg-emerald-500' : 'bg-blue-500'
                  } text-white`}>
                    {profile.role === 'JOURNALISTE' ? <Mic2 size={14} /> : 
                     profile.role === 'CORRESPONDANT' ? <Camera size={14} /> : <FileText size={14} />}
                  </div>
                </div>
                <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full border mb-4 ${
                   profile.role === 'JOURNALISTE' ? 'text-amber-600 bg-amber-50 border-amber-100' : 
                   profile.role === 'CORRESPONDANT' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                   'text-blue-600 bg-blue-50 border-blue-100'
                }`}>
                  {profile.role}
                </span>
                <h4 className="text-xl font-black text-slate-900 mb-2 text-center">{profile.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 text-center">
                  {profile.bio || 'Journaliste certifié sur la plateforme CollectInfos.'}
                </p>
              </div>


              <button 
                onClick={() => setSelectedProfile(profile)}
                className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all"
              >
                {t('common.view_profile')}
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
        {info.price && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-base font-black uppercase tracking-tight shadow-xl border border-white/20">
              {formatPrice(info.price)}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 md:p-6">
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3 text-[9px] md:text-[11px] text-slate-400 font-medium">
          <span className="text-indigo-600 font-bold uppercase tracking-wider">
            {info.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock size={10} className="md:w-3 md:h-3" />
            {info.date}
          </div>
        </div>
        <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-indigo-600 transition-colors leading-tight line-clamp-2">
          {info.title}
        </h3>
      </div>
    </motion.div>
  );
};

const Modal = ({ info, onClose, formatPrice }: { info: any; onClose: () => void, formatPrice: (p: number) => string }) => {
  const isUserDetail = info.type === 'USER_DETAIL';

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

        <div className="md:w-1/2 h-64 md:h-auto shrink-0 relative bg-slate-100 flex items-center justify-center">
          {isUserDetail ? (
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-8xl font-black text-indigo-600 shadow-xl border-8 border-indigo-50">
              {String(info.name).charAt(0)}
            </div>
          ) : (
            <>
              <img 
                src={info.image} 
                alt={info.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </>
          )}
        </div>

        <div className="p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar">
          {isUserDetail ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                 <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Détails de l'adhérent
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {info.name}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Email</label>
                  <p className="text-lg font-bold text-slate-700">{info.email}</p>
                </div>
                <div className="flex gap-12">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Rôle</label>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {info.role}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Statut</label>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      info.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-red-50 text-red-600'
                    }`}>
                      {info.status === 'ACTIVE' ? 'Activé' : 'Bloqué'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Biographie / Infos</label>
                  <p className="text-slate-600 leading-relaxed italic">
                    {info.bio || "Aucune information supplémentaire disponible pour cet utilisateur."}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
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
                <div className="text-sm text-slate-500 space-y-4 whitespace-pre-wrap">
                  {info.content || "Contenu détaillé en cours de chargement..."}
                </div>
              </div>

              {(info.photos?.length > 0 || info.videos?.length > 0 || info.docs?.length > 0) && (
                <div className="mt-10 pt-10 border-t border-slate-100">
                  <h3 className="text-sm font-black uppercase text-slate-900 tracking-widest mb-6">Fichiers joints</h3>
                  
                  {info.photos?.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                       {info.photos.map((url: string, i: number) => (
                         <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform hover:scale-105">
                           <img src={url} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                    </div>
                  )}

                  {info.videos?.length > 0 && (
                    <div className="space-y-4 mb-8">
                       {info.videos.map((url: string, i: number) => (
                         <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-4">
                           <video src={url} controls className="w-full max-h-96 rounded-xl" />
                         </div>
                       ))}
                    </div>
                  )}

                  {info.docs?.length > 0 && (
                    <div className="space-y-2">
                       {info.docs.map((url: string, i: number) => (
                         <a 
                           key={i} 
                           href={url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-100 group"
                         >
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                             <FileText size={20} />
                           </div>
                           <div className="text-left">
                             <span className="text-sm font-bold block text-slate-900">Document {i + 1}</span>
                             <span className="text-[10px] text-slate-400 font-medium">Cliquer pour ouvrir</span>
                           </div>
                           <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                             <PlusCircle size={18} className="text-slate-400" />
                           </div>
                         </a>
                       ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {info.price && (
                    <div className="text-3xl font-black text-indigo-600">
                      {formatPrice(info.price)}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImageTicker = () => {
  return (
    <div className="hidden md:block py-20 bg-slate-50 overflow-hidden border-y border-slate-100">
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
  const { t } = useTranslation();
  const [view, setView] = useState<AppView>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<InfoPost | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<InfoPost | null>(null);
  const [activeProfileForChat, setActiveProfileForChat] = useState<UserProfile | null>(null);
  const [payingItem, setPayingItem] = useState<InfoPost | null>(null);
  const [user, setUser] = useState<any>(null);
  const [dbReports, setDbReports] = useState<any[]>([]);
  const [appUsers, setAppUsers] = useState<any[]>([]);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingReports, setPendingReports] = useState<any[]>([
    { 
      id: '1', 
      author: 'Sékou Damaro', 
      title: 'Crise de l\'eau à Sonfonia', 
      date: 'Aujourd\'hui, 10:20', 
      category: 'Société',
      description: 'Les habitants de Sonfonia font face à une pénurie d\'eau sans précédent depuis plus d\'une semaine. Les points d\'eau tarissent et les prix des camions citernes s\'envolent.',
      content: 'Contenu détaillé de l\'article sur la crise de l\'eau...',
      image: 'https://images.unsplash.com/photo-1541830826426-c5672df58ea3?auto=format&fit=crop&q=80&w=1200',
      status: 'pending',
      tags: ['Guinée', 'Eau', 'Conakry'],
      price: 150
    },
    { 
      id: '2', 
      author: 'Mamadou Bhoye', 
      title: 'Interview exclusive : Le futur du Simandou', 
      date: 'Hier, 18:45', 
      category: 'Économie',
      description: 'Entretien avec les responsables du projet Simandou sur les avancées de la voie ferrée et des installations minières.',
      content: 'Contenu détaillé de l\'interview sur Simandou...',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?auto=format&fit=crop&q=80&w=1200',
      status: 'pending',
      tags: ['Simandou', 'Mines', 'Économie'],
      price: 500
    },
    { 
      id: '3', 
      author: 'Mariama Sylla', 
      title: 'Sport : Les enjeux du tournoi scolaire', 
      date: 'Hier, 14:15', 
      category: 'Sport',
      description: 'Le tournoi inter-scolaire de cette année promet d\'être le plus disputé avec une participation record de 50 établissements.',
      content: 'Contenu détaillé sur le sport scolaire...',
      image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1200',
      status: 'pending',
      tags: ['Football', 'Éducation', 'Jeunesse'],
      price: 50
    }
  ]);
  const itemsPerPage = 8;

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (response.ok) {
        const data = await response.json();
        setDbReports(data);
      }
    } catch (error) {
      console.error('Failed to fetch reports from DB:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setAppUsers(data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      // Secret access via URL parameter: ?access=admin_portal_2026
      if (params.get('access') === 'admin_portal_2026') {
        setView('ADMIN_DASHBOARD');
        return;
      }

      if (path === '/admin') setView('ADMIN_DASHBOARD');
      else if (path === '/admin/auth/login') setView('ADMIN_AUTH');
      else if (path === '/correspondant') setView('CORRESPONDANT_DASHBOARD');
      else if (path === '/media') setView('MEDIA_DASHBOARD');
      else if (path === '/') setView('HOME');
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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

  const allReports = useMemo(() => {
    const formattedDbReports = dbReports
      .filter(r => r.status === 'VALIDATED')
      .map(r => {
      let mainImage = r.image;
      if (!mainImage && r.media_photos) {
        try {
          const photos = JSON.parse(r.media_photos);
          if (Array.isArray(photos) && photos.length > 0) {
            mainImage = photos[0];
          }
        } catch (e) {
          console.error('Error parsing media_photos:', e);
        }
      }
      
      return {
        ...r,
        id: `db-${r.id}`,
        author: r.author_name || 'Correspondant',
        date: new Date(r.created_at).toLocaleDateString(),
        image: mainImage || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=1200',
        photos: r.media_photos ? JSON.parse(r.media_photos) : [],
        videos: r.media_videos ? JSON.parse(r.media_videos) : [],
        docs: r.media_docs ? JSON.parse(r.media_docs) : []
      };
    });
    return [...formattedDbReports, ...MOCK_INFOS];
  }, [dbReports]);

  const filteredInfos = useMemo(() => {
    return allReports.filter(info => {
      const matchCategory = selectedCategory === 'All' || info.category === selectedCategory;
      const matchSearch = info.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          info.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allReports, selectedCategory, searchQuery]);

  const paginatedInfos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInfos.slice(start, start + itemsPerPage);
  }, [filteredInfos, currentPage]);

  const totalPages = Math.ceil(filteredInfos.length / itemsPerPage);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    [...allReports, ...MOCK_MARKETPLACE].forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, [allReports]);

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
        return <AdminDashboard user={user} onCancel={() => setView('HOME')} pendingReports={pendingReports} setPendingReports={setPendingReports} formatPrice={formatPrice} onRefreshPublicFeed={fetchReports} />;
      case 'ADMIN_AUTH':
        return <AuthForm type="LOGIN" defaultRole="ADMIN" onCancel={() => setView('HOME')} onNavigate={(v) => setView(v)} onLogin={setUser} />;
      case 'AUTH':
        return <AuthForm type="LOGIN" onCancel={() => setView('HOME')} onNavigate={(v) => setView(v)} onLogin={setUser} />;
      case 'SIGNUP':
        return <AuthForm type="SIGNUP" onCancel={() => setView('HOME')} onNavigate={(v) => setView(v)} onLogin={setUser} />;
      case 'PROPOSE':
        return <ProposalForm onCancel={() => setView('HOME')} user={user} />;
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
             
             <div className="max-w-7xl mx-auto py-12 md:py-24 px-6">
                <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-slate-100 pb-12">
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

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                  <AnimatePresence mode="popLayout">
                    {paginatedInfos.map((info) => (
                      <InfoCard 
                        key={info.id} 
                        info={info} 
                        onClick={() => {
                          setSelectedInfo(info);
                          setView('ARTICLE_DETAIL');
                        }}
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
      case 'ARTICLE_DETAIL':
        return selectedInfo ? (
          <div className="bg-white min-h-screen pt-32 pb-24 px-6 scale-in duration-700">
             <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setView('HOME')}
                  className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
                >
                  <ArrowLeft size={18} /> Retour au flux
                </button>
                <div className="mb-10">
                  <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest italic mb-6 inline-block">
                    {selectedInfo.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
                    {selectedInfo.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <img src={selectedInfo.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedInfo.author)}`} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="text-slate-900 font-bold">{selectedInfo.author}</p>
                      <p className="text-slate-400 text-xs font-medium">{selectedInfo.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-indigo-100">
                  <img src={selectedInfo.image} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 border-l-4 border-indigo-600 pl-8 py-2 italic bg-indigo-50/50 rounded-r-3xl">
                    {selectedInfo.description}
                  </p>
                  <div className="text-lg text-slate-700 whitespace-pre-wrap leading-relaxed space-y-6">
                    {selectedInfo.content || "Le contenu complet de cet article est réservé aux abonnés..."}
                  </div>
                </div>

                {(selectedInfo.photos?.length > 0 || selectedInfo.videos?.length > 0 || selectedInfo.docs?.length > 0) && (
                  <div className="mt-16 pt-16 border-t border-slate-100">
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-widest mb-8 flex items-center gap-3">
                      <Paperclip size={18} className="text-indigo-600" />
                      Médias supplémentaires
                    </h3>
                    
                    {selectedInfo.photos?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                         {selectedInfo.photos.map((url: string, i: number) => (
                           <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform hover:scale-[1.03]">
                             <img src={url} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                           </div>
                         ))}
                      </div>
                    )}

                    {selectedInfo.videos?.length > 0 && (
                      <div className="space-y-6 mb-12">
                         {selectedInfo.videos.map((url: string, i: number) => (
                           <div key={i} className="rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 p-4">
                             <video src={url} controls className="w-full max-h-[500px] rounded-2xl" />
                           </div>
                         ))}
                      </div>
                    )}

                    {selectedInfo.docs?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {selectedInfo.docs.map((url: string, i: number) => (
                           <a 
                             key={i} 
                             href={url} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl text-slate-600 hover:bg-slate-100 transition-all border border-slate-100 group"
                           >
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                               <FileText size={24} />
                             </div>
                             <div className="text-left">
                               <span className="text-sm font-bold block text-slate-900">Document {i + 1}</span>
                               <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Voir le fichier</span>
                             </div>
                             <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                               <PlusCircle size={20} className="text-slate-400" />
                             </div>
                           </a>
                         ))}
                      </div>
                    )}
                  </div>
                )}
             </div>
          </div>
        ) : null;
      case 'PAYMENT':
        return <BankTransferPayment item={payingItem!} onCancel={() => setView('HOME')} formatPrice={formatPrice} />;
      case 'ORDER':
        return <OrderForm onCancel={() => setView('HOME')} />;
      case 'CORRESPONDANT_DASHBOARD':
      case 'DASHBOARD':
        return <CorrespondantDashboard onCancel={() => setView('HOME')} formatPrice={formatPrice} pendingReports={pendingReports} setPendingReports={setPendingReports} user={user} onRefreshPublicFeed={fetchReports} />;
      case 'MEDIA_DASHBOARD':
        return <MediaDashboard onCancel={() => setView('HOME')} formatPrice={formatPrice} user={user} />;
      case 'PRESS':
        return <PressRelationView onCancel={() => setView('HOME')} />;
      case 'FACT_CHECKING':
        return <FactCheckingView onCancel={() => setView('HOME')} />;
      case 'COLLABORATION':
        return <CollaborationView onCancel={() => setView('HOME')} />;
      case 'CONTACT':
        return <ContactView onCancel={() => setView('HOME')} />;
      case 'CHAT':
        return <ExpertChat activeProfile={activeProfileForChat} onCancel={() => setView('HOME')} />;
      default:
        return (
          <>
            <HeroSlider setView={setView} />
            
            {/* Information Categories Section */}
            <section className="pt-12 md:pt-[71px] pb-12 md:pb-24 px-4 md:px-6 bg-slate-50/50">
              <div className="max-w-7xl mx-auto">
                <div className="mb-10 md:mb-16 text-center px-2">
                  <h3 className="text-lg md:text-4xl font-black text-slate-900 tracking-tight uppercase whitespace-nowrap">NOS SECTIONS D'INFORMATION</h3>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-12">
                  {[
                    { title: t('common.categories.Experts'), image: '/uploads/EXPERTS.jpg', color: 'indigo-500' },
                    { title: t('common.categories.Particuliers'), image: '/uploads/PARTICULIER.jpg', color: 'slate-500' },
                    { title: t('common.categories.Médias'), image: '/uploads/MEDIAS.jpg', color: 'slate-500' },
                    { title: t('common.categories.Organisations'), image: '/uploads/Organisations.jpg', color: 'indigo-500' }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      onClick={() => handleCategorySelect(item.title as Category)}
                      className="flex flex-col items-center group cursor-pointer bg-white border border-slate-200/60 rounded-3xl md:rounded-[3.5rem] p-2 md:p-10 hover:border-indigo-600/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] transition-all duration-500"
                    >
                      <div className="relative w-14 h-14 md:w-56 md:h-56 mb-3 md:mb-8 shrink-0">
                        {/* Notification Badge (Red Pastille) */}
                        <div className="absolute -top-1 -right-1 md:top-1 md:right-1 bg-red-600 text-white w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[8px] md:text-sm font-black border-2 md:border-4 border-white shadow-lg transition-transform group-hover:scale-110 z-20">
                          {categoryStats[item.title] || 0}
                        </div>

                        {/* Animated Logo-Color Border (Blue-Grey) */}
                        <div className="absolute inset-0 rounded-full border-2 md:border-4 border-slate-200 group-hover:border-indigo-600 transition-colors duration-500" />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1 rounded-full border border-dashed border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {/* Circle Image Container */}
                        <div className="absolute inset-1 md:inset-2 bg-white rounded-full overflow-hidden shadow-inner ring-2 md:ring-4 ring-white ring-offset-1 md:ring-offset-2 ring-offset-slate-100 group-hover:ring-offset-indigo-50 transition-all duration-500">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Floating Badge (Logo Grey) */}
                        <div className="absolute -bottom-1 right-1 md:-bottom-2 md:right-4 bg-slate-800 text-white p-1 md:p-1.5 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform delay-100">
                          <ArrowRight size={10} className="md:w-[14px] md:h-[14px]" />
                        </div>
                      </div>
                      
                      <h3 className="text-[10px] md:text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors text-center break-words">
                        {item.title}
                      </h3>
                      <div className="w-4 h-0.5 md:w-8 md:h-1 bg-slate-200 group-hover:w-16 md:group-hover:w-24 group-hover:bg-indigo-600 transition-all duration-500 mt-2 md:mt-4 rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            {/* Video Insights Section */}
            <VideoSection formatPrice={formatPrice} />

            <ProfileSection profiles={appUsers.filter(u => ['JOURNALISTE', 'CORRESPONDANT', 'PIGISTE'].includes(u.role))} setSelectedProfile={setSelectedProfile} />
            <section ref={contentRef} className="py-12 px-6 scroll-mt-24">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                  <div>
                    <h2 className="text-sm font-black tracking-[0.3em] text-indigo-600 mb-4 uppercase">{t('sections.feed_subtitle')}</h2>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{t('sections.feed_title')}</h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                    <div className="flex bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                      <button 
                        onClick={() => setSelectedCategory('All')}
                        className={`px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === 'All' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {t('common.all')}
                      </button>
                      {CATEGORIES.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          {t(`common.categories.${cat}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                  <AnimatePresence mode="popLayout">
                    {paginatedInfos.map((info) => (
                      <InfoCard 
                        key={info.id} 
                        info={info} 
                        onClick={() => {
                          setSelectedInfo(info);
                          setView('ARTICLE_DETAIL');
                        }}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-20 flex justify-center items-center gap-4">
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 disabled:opacity-30 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            contentRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-16 h-16 rounded-2xl text-lg font-black transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-400'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 disabled:opacity-30 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center"
                    >
                      <ArrowRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-slate-900 py-24 relative overflow-hidden group mt-12">
              <div className="absolute top-0 right-0 w-[50%] h-full bg-indigo-600/10 blur-[100px] rounded-full translate-x-1/2 group-hover:bg-indigo-600/20 transition-all duration-700" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter uppercase whitespace-nowrap">{t('newsletter.title1')}<br />{t('newsletter.title2')}</h3>
                  <p className="text-slate-400 text-lg md:text-xl mb-12 italic">{t('newsletter.description')}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder={t('newsletter.placeholder')} 
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-indigo-600/20">
                      {t('newsletter.button')}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <ShieldCheck size={64} className="text-indigo-600 mx-auto mb-8" />
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">{t('cta.title1')}<br />{t('cta.title2')}</h3>
                <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto">{t('cta.description')}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={() => setView('AUTH')}
                    className="bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:scale-105 transition-all shadow-2xl"
                  >
                    {t('cta.button_primary')}
                  </button>
                  <button className="bg-white text-slate-900 border border-slate-200 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                    {t('cta.button_secondary')}
                  </button>
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
      {!['ADMIN_DASHBOARD', 'CORRESPONDANT_DASHBOARD', 'MEDIA_DASHBOARD', 'DASHBOARD'].includes(view) && <BottomMenu setView={setView} />}

      <main className="pt-20">
        {renderContent()}
      </main>

      {/* Footer */}
      {!['ADMIN_DASHBOARD', 'CORRESPONDANT_DASHBOARD', 'MEDIA_DASHBOARD', 'DASHBOARD'].includes(view) && (
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
              {t('footer.description')}
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
            <h4 className="font-bold text-slate-900 mb-6">{t('footer.platform.title')}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.platform.discover')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.platform.trends')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.platform.news')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.platform.contribute')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t('footer.company.title')}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.company.about')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.company.team')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.company.privacy')}</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">{t('footer.company.contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 text-center text-slate-400 text-xs">
          {t('footer.copyright')}
        </div>
      </footer>
      )}

      {/* Modals */}
      <AnimatePresence>
        {selectedProfile && (
          <ProfileModal 
            profile={selectedProfile} 
            onClose={() => setSelectedProfile(null)} 
            formatPrice={formatPrice} 
            onOpenChat={(p) => {
              setActiveProfileForChat(p);
              setSelectedProfile(null);
              setView('CHAT');
            }}
          />
        )}
        {selectedProduct && (
          <ProductModal 
            item={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            formatPrice={formatPrice} 
            onPurchase={(item) => {
              handlePurchase(item.id);
              setPayingItem(item);
              setView('PAYMENT');
            }}
          />
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
        
        /* Hide scrollbars on mobile */
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
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
