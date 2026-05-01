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

// --- TYPES ---
type AppView = 'HOME' | 'PROPOSE' | 'BUY' | 'ORDER' | 'DASHBOARD' | 'AUTH' | 'ADMIN_DASHBOARD' | 'ADMIN_AUTH' | 'SIGNUP' | 'CATEGORY_EXPLORER' | 'CHAT' | 'PAYMENT' | 'MEDIA_DASHBOARD' | 'CORRESPONDANT_DASHBOARD' | 'PRESS' | 'FACT_CHECKING' | 'COLLABORATION' | 'CONTACT' | 'ARTICLE_DETAIL';

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
    { title: "Article 6 – Commission", content: "Prélèvement de 30% sur le montant brut de chaque vente." },
    { title: "Article 16 – Droit Applicable", content: "Soumis au droit de la République de Guinée." }
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

  doc.save(`Contrat_CollectInfos.pdf`);
};

// --- NAVIGATION COMPONENT ---
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
  const changeLanguage = (langCode: string) => { i18n.changeLanguage(langCode); setIsLangOpen(false); };

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
          <div onClick={() => { setView('HOME'); setIsSidebarOpen(false); }} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/uploads/collectinfo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-full transition-all group">
            <Menu size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-100 ring-1 ring-slate-200/50">
              <span className="text-xl leading-none">{currentLang.flag}</span>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{currentLang.label}</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 overflow-hidden">
                  <div className="flex flex-col gap-1 p-2">
                    {languages.map((lang) => (
                      <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${i18n.language === lang.code ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 font-bold'}`}>
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
            <input type="text" placeholder={t('common.search')} className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm border-none focus:ring-2 focus:ring-indigo-500/20 w-32 xl:w-48 transition-all" onChange={(e) => onSearch(e.target.value)} />
          </div>
          <div className="hidden lg:flex items-center gap-3 ml-2 pl-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Phone size={20} /></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium leading-none mb-1 uppercase tracking-tight">Nous contacter</span>
              <span className="text-sm font-black text-slate-900 leading-none">+224 626 89 18 27</span>
            </div>
          </div>
          <button onClick={() => setView('AUTH')} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-full transition-colors group">
            <div className="w-10 h-10 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-all"><CircleUser size={24} /></div>
            <div className="flex flex-col items-start hidden lg:flex">
              <span className="text-[12px] font-bold text-slate-900 leading-tight">{t('auth.login')}</span>
              <span className="text-[11px] font-medium text-slate-500 leading-tight">{t('auth.signup')}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', country: 'Guinée', city: '', mediaName: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (authType === 'SIGNUP' && !hasReadTerms) { setIsTermsModalOpen(true); return; }

    setIsLoading(true);
    try {
      const endpoint = authType === 'LOGIN' ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
      const body = authType === 'LOGIN' ? { email: formData.email.trim().toLowerCase(), password: formData.password } : { ...formData, role };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
        if (authType === 'SIGNUP') generateContractPDF(formData.name, formData.email, role);
        setSubmitted(true);
      } else {
        setError(data.error || "Une erreur est survenue lors de l'authentification.");
      }
    } catch (err: any) {
      setError("Le serveur Render ne répond pas. Vérifiez que votre backend est 'Live'.");
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
          <p className="text-slate-500 mb-8 italic">Votre accès sécurisé est prêt.</p>
          <button onClick={handleDashboardRedirect} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 shadow-xl transition-all">Accéder au Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-50 relative">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{authType === 'LOGIN' ? t('auth.login') : t('auth.signup')}</h3>
            <p className="text-slate-500 font-medium italic">CollectInfos : L'info brute, certifiée.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}
            {authType === 'SIGNUP' && (
              <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" placeholder="Nom complet" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            )}
            <input required type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input required type="password" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" placeholder="Mot de passe" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-4 rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50">
              {isLoading ? 'Chargement...' : authType === 'LOGIN' ? 'Se Connecter' : 'S\'inscrire'}
            </button>
          </form>
          <button onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} className="w-full mt-6 text-sm font-bold text-indigo-600 underline">
            {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Se connecter"}
          </button>
        </div>
      </div>
    </section>
  );
};

// --- ADMIN DASHBOARD (MIXED & FIXED) ---
const AdminDashboard = ({ onCancel, formatPrice }: any) => {
  const [stats, setStats] = useState({ users: 0, pendingReports: 0, monthlySales: 0, alerts: 0 });
  const [pendingReports, setPendingReports] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, reportsRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/stats`),
          fetch(`${API_URL}/api/reports?status=PENDING`)
        ]);
        if (statsRes.ok) setStats(await statsRes.json());
        if (reportsRes.ok) setPendingReports(await reportsRes.json());
      } catch (err) { console.error("Admin fetch error", err); }
    };
    fetchAdminData();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/api/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'VALIDATED' })
      });
      if (res.ok) {
        setPendingReports(prev => prev.filter(r => r.id !== id));
        alert("Reportage approuvé !");
      }
    } catch (e) { alert("Erreur serveur"); }
  };

  return (
    <section className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">ADMINISTRATION</h2>
          <button onClick={onCancel} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg">Quitter</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Utilisateurs</p>
            <h4 className="text-3xl font-black text-slate-900">{stats.users}</h4>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">En Attente</p>
            <h4 className="text-3xl font-black text-amber-500">{pendingReports.length}</h4>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Ventes (Mois)</p>
            <h4 className="text-3xl font-black text-indigo-600">{formatPrice(stats.monthlySales)}</h4>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2">Alertes</p>
            <h4 className="text-3xl font-black text-red-500">{stats.alerts}</h4>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 border shadow-2xl">
          <h3 className="text-xl font-black mb-8 border-b pb-4 uppercase tracking-widest">Modération du Flux</h3>
          <div className="space-y-4">
            {pendingReports.length > 0 ? pendingReports.map(r => (
              <div key={r.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all">
                <div>
                  <p className="font-black text-lg text-slate-900 mb-1">{r.title}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Par {r.author_name || 'Anonyme'} • {new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleApprove(r.id)} className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-900 transition-all">Approuver</button>
                  <button className="bg-white text-red-500 border border-red-100 px-6 py-2 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-red-50">Refuser</button>
                </div>
              </div>
            )) : <p className="text-center text-slate-400 font-bold italic py-10">Aucun contenu en attente de modération.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');

  const formatPrice = (price: number) => {
    const rate = EXCHANGE_RATES[currency];
    const converted = price * rate;
    const symbols: Record<Currency, string> = { EUR: '€', USD: '$', XOF: 'F CFA', GNF: 'GNF' };
    return `${new Intl.NumberFormat('fr-FR').format(converted)} ${symbols[currency]}`;
  };

  const renderContent = () => {
    switch (view) {
      case 'ADMIN_DASHBOARD': return <AdminDashboard onCancel={() => setView('HOME')} formatPrice={formatPrice} />;
      case 'AUTH': return <AuthForm onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />;
      case 'SIGNUP': return <AuthForm type="SIGNUP" onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />;
      case 'HOME':
      default:
        return (
          <>
            <HeroSlider setView={setView} />
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase border-l-8 border-indigo-600 pl-6 italic">Le Fil d'Infos Direct</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_INFOS.slice(0, 6).map(info => (
                  <motion.div whileHover={{ y: -10 }} key={info.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer" onClick={() => setView('AUTH')}>
                    <div className="aspect-video relative"><img src={info.image} className="w-full h-full object-cover" /></div>
                    <div className="p-8">
                      <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em]">{info.category}</span>
                      <h3 className="text-xl font-black mt-2 mb-4 leading-tight line-clamp-2">{info.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-3 mb-6 italic">"{info.description}"</p>
                      <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{info.date}</span>
                        <ArrowRight size={18} className="text-indigo-600" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans">
      <Navbar onSearch={() => {}} setView={setView} currency={currency} setCurrency={setCurrency} />
      <main className="pt-20">{renderContent()}</main>
      <footer className="py-20 bg-slate-900 text-white text-center mt-20">
        <p className="font-black text-2xl mb-4 tracking-widest uppercase italic">COLLECTINFOS</p>
        <p className="text-slate-500 text-sm font-medium tracking-tight">© 2026 CollectInfos Media Group. L'information certifiée à la source.</p>
        <div className="flex justify-center gap-6 mt-8 opacity-40">
           <Facebook size={20} /> <Twitter size={20} /> <Instagram size={20} />
        </div>
      </footer>
    </div>
  );
}