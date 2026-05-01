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

// Configuration API
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
    { title: "Article 11 – Paiement", content: "Sécurisation des fonds via le système de la Plateforme." },
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

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURE ÉLECTRONIQUE (LU ET APPROUVÉ)", 20, y);
  doc.save(`Contrat_CollectInfos.pdf`);
};

// --- Components ---
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

        <div className="hidden md:flex items-center gap-8">
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xl">{currentLang.flag}</span>
              <span className="text-[11px] font-black uppercase text-slate-700">{currentLang.label}</span>
              <ChevronDown size={14} className={`text-slate-400 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full px-4 py-3 flex items-center gap-3 ${i18n.language === lang.code ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}>
                      <span>{lang.flag}</span>
                      <span className="text-[11px] uppercase tracking-widest">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setView('AUTH')} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-full transition-colors group">
            <div className="w-10 h-10 border-2 border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:border-indigo-500">
              <CircleUser size={24} />
            </div>
            <div className="flex flex-col items-start hidden lg:flex">
              <span className="text-[12px] font-bold text-slate-900">{t('auth.login')}</span>
              <span className="text-[11px] font-medium text-slate-500">{t('auth.signup')}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSlider = ({ setView }: { setView: (v: AppView) => void }) => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[450px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/uploads/0BAC1.jpg" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl md:text-8xl font-black text-white tracking-widest mb-6 uppercase">COLLECTINFOS</motion.h1>
        <p className="text-xl md:text-2xl font-bold text-white mb-10 italic leading-relaxed">"{t('hero.commitment')}<br />{t('hero.strength')}"</p>
        <div className="flex flex-row items-center justify-center gap-4">
          <button onClick={() => setView('PROPOSE')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all">
            <Send size={20} /> {t('hero.propose')}
          </button>
          <button onClick={() => setView('BUY')} className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all">
            <ShoppingBag size={20} /> {t('hero.buy')}
          </button>
        </div>
      </div>
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
          <h3 className="text-4xl font-black text-slate-900 mb-4">{t('marketplace.subtitle')}</h3>
          <p className="text-slate-500 max-w-2xl">{t('marketplace.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_MARKETPLACE.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -8 }} onClick={() => onSelect(item)} className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={32} />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600">{item.title}</h4>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{item.description}</p>
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="text-xl font-black text-indigo-600">{formatPrice(item.price || 0)}</div>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold">Achetez</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', country: 'Guinée', city: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (authType === 'SIGNUP' && !hasReadTerms) {
      setIsTermsModalOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const endpoint = authType === 'LOGIN' ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authType === 'LOGIN' ? { email: formData.email, password: formData.password } : { ...formData, role })
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
      setError("Erreur de connexion au serveur");
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
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600"><CheckCircle2 size={48} /></div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{authType === 'LOGIN' ? 'Connexion réussie' : 'Inscription reçue !'}</h2>
          <button onClick={handleDashboardRedirect} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all">Accéder au Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 animate-in fade-in">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-50">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{authType === 'LOGIN' ? t('auth.login') : t('auth.signup')}</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold">{error}</div>}
            {authType === 'SIGNUP' && (
              <input required className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold" placeholder="Nom complet" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            )}
            <input required type="email" className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input required type="password" className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold" placeholder="Mot de passe" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-5 rounded-[1.8rem] font-black uppercase hover:bg-indigo-600 disabled:opacity-50 transition-all">
              {isLoading ? 'Chargement...' : 'Valider'}
            </button>
          </form>
          <div className="pt-6 text-center">
            <button onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} className="text-sm font-bold text-indigo-600 underline">
              {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Connectez-vous"}
            </button>
          </div>
        </div>
      </div>
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} onAccept={() => { setHasReadTerms(true); setIsTermsModalOpen(false); }} />
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const { t } = useTranslation();
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<InfoPost | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<InfoPost | null>(null);
  const [activeProfileForChat, setActiveProfileForChat] = useState<UserProfile | null>(null);
  const [payingItem, setPayingItem] = useState<InfoPost | null>(null);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [appUsers, setAppUsers] = useState<any[]>([]);
  const [dbReports, setDbReports] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/reports`).then(res => res.json()).then(setDbReports).catch(console.error);
    fetch(`${API_URL}/api/users`).then(res => res.json()).then(setAppUsers).catch(console.error);
  }, []);

  const formatPrice = useMemo(() => (price: number) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const symbols: any = { EUR: '€', USD: '$', XOF: 'F CFA', GNF: 'GNF' };
    return `${new Intl.NumberFormat('fr-FR').format(price * rate)} ${symbols[currency]}`;
  }, [currency]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-indigo-100">
      <Navbar onSearch={setSearchQuery} setView={setView} currency={currency} setCurrency={setCurrency} />
      
      <main className="pt-20">
        {view === 'HOME' && (
          <>
            <HeroSlider setView={setView} />
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter border-l-8 border-indigo-600 pl-6">Le Flux d'Infos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_INFOS.slice(0, 8).map(info => (
                  <InfoCard key={info.id} info={info} formatPrice={formatPrice} onClick={() => { setSelectedInfo(info); setView('ARTICLE_DETAIL'); }} />
                ))}
              </div>
            </section>
            <VideoSection formatPrice={formatPrice} />
            <ProfileSection profiles={appUsers} setSelectedProfile={setSelectedProfile} />
          </>
        )}
        {view === 'AUTH' && <AuthForm onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />}
        {view === 'ARTICLE_DETAIL' && selectedInfo && (
           <div className="max-w-4xl mx-auto py-24 px-6">
              <button onClick={() => setView('HOME')} className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"><ArrowLeft size={18} /> Retour</button>
              <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{selectedInfo.title}</h1>
              <img src={selectedInfo.image} className="w-full rounded-[2.5rem] shadow-2xl mb-12" alt={selectedInfo.title} />
              <p className="text-xl text-slate-600 leading-relaxed italic">{selectedInfo.description}</p>
           </div>
        )}
        {/* Intégration des dashboards ici si connecté */}
      </main>

      <footer className="py-20 bg-slate-900 text-white text-center mt-20">
        <p className="font-black text-2xl mb-4 tracking-widest uppercase">COLLECTINFOS</p>
        <p className="text-slate-500 text-sm">© 2026 CollectInfos Media Group. L'information certifiée.</p>
      </footer>

      {selectedProfile && <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} formatPrice={formatPrice} onOpenChat={(p) => { setActiveProfileForChat(p); setView('CHAT'); }} />}
      {selectedProduct && <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} formatPrice={formatPrice} onPurchase={(item) => { setPayingItem(item); setView('PAYMENT'); }} />}
    </div>
  );
}

// Components manquants pour la compilation
const CheckCircle2Icon = () => <CheckCircle2 size={48} className="text-emerald-600" />;