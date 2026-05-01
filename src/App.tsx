import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";
import { useTranslation } from 'react-i18next';
import { 
  Paperclip, Search, Menu, X, Plus, ChevronRight, Filter, Clock, User, Tag, 
  Info as InfoIcon, Newspaper, BookOpen, ArrowRight, ArrowLeft, GraduationCap, 
  Globe2, Building2, Users, Home, Compass, PlusCircle, CircleUser, ShieldCheck, 
  Mic2, Tv2, Camera, Globe, ShoppingBag, Send, ChevronDown, Phone, Facebook, 
  Twitter, Instagram, Linkedin, Youtube, Play, Upload, Wallet, CheckCircle2, 
  AlertCircle, FileText, LayoutDashboard, Video, DollarSign, MoreVertical, 
  Download, XCircle, Calendar, Eye, CreditCard, Receipt, Package, AlertTriangle, 
  RefreshCw, Settings, Lock, Trash2, Edit 
} from 'lucide-react';

import { MOCK_INFOS, CATEGORIES, MOCK_PROFILES, MOCK_MARKETPLACE, EXCHANGE_RATES, MOCK_VIDEOS, TICKER_IMAGES, COUNTRIES, CITIES_BY_COUNTRY, TERMS_TEXT } from './constants';
import { InfoPost, Category, UserProfile, UserRole, OrderRequest, Currency } from './types';

// --- CONFIGURATION API ---
const API_URL = "https://collectinfos.onrender.com";

const generateContractPDF = (userName: string, userEmail: string, userRole: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('fr-FR');
  const transactionId = Math.random().toString(36).substring(7).toUpperCase();
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
  doc.setFont("helvetica", "bold");
  doc.text("ENTRE LES SOUSSIGNÉS :", 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text("La société Collectinfos.com (RCCM GN.TCC.2025.A.10149)", 20, 67);
  doc.text("ET", 20, 74);
  doc.text(`${userName.toUpperCase()} (${userRole}), email: ${userEmail},`, 20, 81);
  doc.text("ci-après désigné 'L'Utilisateur'.", 20, 88);

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
    doc.setTextColor(79, 70, 229);
    doc.text(art.title, 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(art.content, 20, y, { maxWidth: 170 });
    y += 12;
  });

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

// --- COMPONENTS ---
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

  const languages = [{ code: 'fr', label: 'Français', flag: '🇫🇷' }, { code: 'en', label: 'English', flag: '🇺🇸' }];
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-50 ${isScrolled ? 'py-3 shadow-sm' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div onClick={() => { setView('HOME'); setIsSidebarOpen(false); }} className="flex items-center gap-3 cursor-pointer hover:opacity-80">
            <img src="/uploads/collectinfo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-full transition-all group">
            <Menu size={24} className="group-hover:scale-110" />
          </button>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-slate-100">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Phone size={20} /></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium uppercase leading-none mb-1">Nous contacter</span>
              <span className="text-sm font-black text-slate-900 leading-none">+224 626 89 18 27</span>
            </div>
          </div>
          <button onClick={() => setView('AUTH')} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-full transition-colors group">
            <div className="w-10 h-10 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:border-indigo-500"><CircleUser size={24} /></div>
            <div className="flex flex-col items-start hidden lg:flex">
              <span className="text-[12px] font-bold text-slate-900">{t('auth.login')}</span>
              <span className="text-[11px] font-medium text-slate-500">{t('auth.signup')}</span>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 bottom-0 w-full max-w-[320px] bg-white z-[70] shadow-2xl overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src="/uploads/collectinfo.jpg" alt="Logo" className="w-8 h-8 rounded-lg" />
                    <span className="font-black text-slate-900 tracking-tighter">COLLECTINFOS</span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl"><X size={24} /></button>
                </div>
                <div className="flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <button key={idx} onClick={() => { setView(item.view); setIsSidebarOpen(false); }} className="flex items-center justify-between text-[13px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 px-6 py-4 rounded-xl transition-all">
                      {item.label}
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- HERO SECTION ---
const HeroSlider = ({ setView }: { setView: (v: AppView) => void }) => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[450px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/uploads/0BAC1.jpg" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="max-w-5xl">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-8xl font-black text-white tracking-widest mb-6">COLLECTINFOS</motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl font-bold text-white mb-10 leading-relaxed italic">"{t('hero.commitment')}<br />{t('hero.strength')}"</motion.p>
          <div className="flex flex-row items-center justify-center gap-4">
            <button onClick={() => setView('PROPOSE')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl transition-all"><Send size={20} /> {t('hero.propose')}</button>
            <button onClick={() => setView('BUY')} className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl transition-all"><ShoppingBag size={20} /> {t('hero.buy')}</button>
            <button onClick={() => setView('ORDER')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl backdrop-blur-md transition-all"><Camera size={20} /> {t('hero.order')}</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- AUTH FORM COMPONENT (MIXED & FIXED) ---
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
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', country: 'Guinée', city: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = authType === 'LOGIN' ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authType === 'LOGIN' ? { email: formData.email.trim().toLowerCase(), password: formData.password } : { ...formData, role })
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data);
        if (authType === 'SIGNUP') generateContractPDF(formData.name, formData.email, role);
        setSubmitted(true);
      } else {
        setError(data.error || "Erreur d'authentification");
      }
    } catch (err) {
      setError("Le serveur est injoignable. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardRedirect = () => {
    if (role === 'ADMIN') onNavigate('ADMIN_DASHBOARD');
    else if (role === 'MEDIAS') onNavigate('MEDIA_DASHBOARD');
    else onNavigate('CORRESPONDANT_DASHBOARD');
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600"><CheckCircle2 size={48} /></div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{authType === 'LOGIN' ? 'Connexion réussie' : 'Inscription reçue !'}</h2>
          <button onClick={handleDashboardRedirect} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 shadow-xl transition-all">Accéder au Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-24 animate-in fade-in">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border border-slate-50">
          <div className="text-center mb-10">
            <div className="hidden md:inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-3xl mb-6 shadow-inner ring-1 ring-slate-100">
              <CircleUser size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{authType === 'LOGIN' ? t('auth.login') : t('auth.signup')}</h3>
            <p className="text-slate-500 font-medium italic">CollectInfos : L'info brute, certifiée.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}
            <div className="space-y-4">
              {authType === 'SIGNUP' && (
                <input required className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Nom complet" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              )}
              <input required type="email" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input required type="password" className="w-full bg-slate-50 border border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Mot de passe" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 shadow-xl transition-all">
              {isLoading ? 'Traitement...' : 'Valider'}
            </button>
            <button type="button" onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} className="w-full text-center text-sm font-bold text-indigo-600 underline hover:text-indigo-800">
              {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const { t } = useTranslation();
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [appUsers, setAppUsers] = useState<any[]>([]);
  const [dbReports, setDbReports] = useState<any[]>([]);

  const formatPrice = (price: number) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const symbols: Record<Currency, string> = { EUR: '€', USD: '$', XOF: 'F CFA', GNF: 'GNF' };
    return `${new Intl.NumberFormat('fr-FR').format(price * rate)} ${symbols[currency]}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repRes, userRes] = await Promise.all([
          fetch(`${API_URL}/api/reports`),
          fetch(`${API_URL}/api/users`)
        ]);
        if (repRes.ok) setDbReports(await repRes.json());
        if (userRes.ok) setAppUsers(await userRes.json());
      } catch (err) { console.error("Initial fetch failed", err); }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'AUTH': return <AuthForm onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />;
      case 'PROPOSE': return <ProposalForm onCancel={() => setView('HOME')} user={user} />;
      case 'BUY': return <MarketplaceView onSelect={() => {}} formatPrice={formatPrice} />;
      case 'ADMIN_DASHBOARD': return <AdminDashboard onCancel={() => setView('HOME')} user={user} formatPrice={formatPrice} pendingReports={[]} setPendingReports={() => {}} />;
      case 'MEDIA_DASHBOARD': return <MediaDashboard onCancel={() => setView('HOME')} user={user} formatPrice={formatPrice} />;
      case 'CORRESPONDANT_DASHBOARD': return <CorrespondantDashboard onCancel={() => setView('HOME')} user={user} formatPrice={formatPrice} pendingReports={[]} setPendingReports={() => {}} />;
      case 'HOME':
      default:
        return (
          <>
            <HeroSlider setView={setView} />
            <ImageTicker />
            <section className="py-24 px-6 max-w-7xl mx-auto">
               <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter border-l-8 border-indigo-600 pl-6">Le Flux d'Informations</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_INFOS.slice(0, 8).map(info => (
                    <div key={info.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => setView('AUTH')}>
                      <div className="aspect-video relative"><img src={info.image} className="w-full h-full object-cover" /></div>
                      <div className="p-8">
                        <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">{info.category}</span>
                        <h3 className="text-xl font-black mt-2 leading-tight line-clamp-2">{info.title}</h3>
                        <p className="text-slate-500 text-sm mt-4 line-clamp-2 italic">"{info.description}"</p>
                      </div>
                    </div>
                  ))}
               </div>
            </section>
            <VideoSection formatPrice={formatPrice} />
            <ProfileSection profiles={appUsers} setSelectedProfile={() => {}} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-indigo-100">
      <Navbar onSearch={setSearchQuery} setView={setView} currency={currency} setCurrency={setCurrency} />
      <main className="pt-20">{renderContent()}</main>
      <BottomMenu setView={setView} />
      <footer className="py-24 bg-slate-900 text-white text-center mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-left">
           <div>
              <p className="font-black text-3xl mb-6 tracking-widest uppercase italic">COLLECTINFOS</p>
              <p className="text-slate-400 max-w-sm leading-relaxed">"Le premier réseau de correspondants locaux certifiés en temps réel."</p>
           </div>
           <div className="flex gap-10">
              <div className="space-y-4">
                 <p className="font-bold text-white uppercase text-xs tracking-widest">Navigation</p>
                 <ul className="text-slate-500 text-sm space-y-2">
                    <li className="hover:text-indigo-400 cursor-pointer">Accueil</li>
                    <li className="hover:text-indigo-400 cursor-pointer">Press Relation</li>
                    <li className="hover:text-indigo-400 cursor-pointer">Fact Checking</li>
                 </ul>
              </div>
           </div>
        </div>
        <p className="text-slate-600 text-[10px] uppercase font-black tracking-widest">© 2026 CollectInfos Media Group. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

// --- PLACEHOLDERS POUR COMPILATION ---
const AdminDashboardPlaceholder = () => <div className="py-20 text-center">Dashboard Admin en chargement...</div>;