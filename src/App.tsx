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

// CONFIGURATION DE L'URL API (RENDER)
const API_BASE_URL = "https://collectinfos.onrender.com";

type AppView = 'HOME' | 'PROPOSE' | 'BUY' | 'ORDER' | 'DASHBOARD' | 'AUTH' | 'ADMIN_DASHBOARD' | 'ADMIN_AUTH' | 'SIGNUP' | 'CATEGORY_EXPLORER' | 'CHAT' | 'PAYMENT' | 'MEDIA_DASHBOARD' | 'CORRESPONDANT_DASHBOARD' | 'PRESS' | 'FACT_CHECKING' | 'COLLABORATION' | 'CONTACT' | 'ARTICLE_DETAIL';

// --- FONCTIONS UTILITAIRES ---

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
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURE ÉLECTRONIQUE", 20, y);
  y += 10;
  doc.setFont("helvetica", "italic");
  doc.text(`Signé numériquement le ${date} par ${userEmail}`, 20, y);

  doc.save(`Contrat_CollectInfos.pdf`);
};

// --- COMPOSANTS INTERFACE ---

const Navbar = ({ onSearch, setView, currency, setCurrency }: any) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-50 ${isScrolled ? 'py-3 shadow-sm' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('HOME')}>
          <img src="/uploads/collectinfo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
          <span className="font-black text-slate-900 hidden md:block">COLLECTINFOS</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setView('AUTH')} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition-all">
            <CircleUser size={18} /> {t('auth.login')}
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- COMPOSANT D'AUTHENTIFICATION (CORRIGÉ) ---

const AuthForm = ({ type = 'LOGIN', onCancel, onNavigate, onLogin }: any) => {
  const { t } = useTranslation();
  const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>(type);
  const [role, setRole] = useState<UserRole>('JOURNALISTE');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'JOURNALISTE' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // CORRECTION ICI : Construction propre de l'URL pour Render
    const endpoint = authType === 'LOGIN' 
      ? `${API_BASE_URL}/api/auth/login` 
      : `${API_BASE_URL}/api/auth/register`;

    const body = authType === 'LOGIN' 
      ? { email: formData.email, password: formData.password }
      : { ...formData, role };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
        if (authType === 'SIGNUP') generateContractPDF(formData.name, formData.email, role);
        
        // Redirection selon le rôle
        if (role === 'ADMIN' || data.role === 'ADMIN') onNavigate('ADMIN_DASHBOARD');
        else if (role === 'MEDIAS') onNavigate('MEDIA_DASHBOARD');
        else onNavigate('CORRESPONDANT_DASHBOARD');
      } else {
        setError(data.error || "Erreur d'authentification");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur Render. Vérifiez votre connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 flex justify-center">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-50 w-full max-w-md">
        <h3 className="text-3xl font-black text-center mb-8">
          {authType === 'LOGIN' ? 'Connexion' : 'Inscription'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold">{error}</div>}
          
          {authType === 'SIGNUP' && (
            <input 
              required 
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" 
              placeholder="Nom complet" 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          )}
          
          <input 
            required 
            type="email" 
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" 
            placeholder="Email" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          
          <input 
            required 
            type="password" 
            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" 
            placeholder="Mot de passe" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Chargement...' : 'Valider'}
          </button>
        </form>

        <button 
          onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
          className="w-full text-center mt-6 text-sm font-bold text-indigo-600 hover:underline"
        >
          {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Connectez-vous"}
        </button>
      </div>
    </section>
  );
};

// --- COMPOSANT PRINCIPAL ---

export default function App() {
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);

  const renderContent = () => {
    switch (view) {
      case 'AUTH':
        return <AuthForm onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />;
      case 'ADMIN_DASHBOARD':
        return <div className="py-20 text-center"><h2 className="text-4xl font-black">Dashboard Admin</h2><button onClick={() => setView('HOME')}>Retour</button></div>;
      default:
        return (
          <div className="py-40 text-center">
            <h1 className="text-6xl font-black text-slate-900 mb-6">COLLECTINFOS</h1>
            <p className="text-xl text-slate-500 mb-12">L'info brute, certifiée en temps réel.</p>
            <button onClick={() => setView('AUTH')} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-slate-900 transition-all">
              COMMENCER ICI
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans">
      <Navbar setView={setView} />
      <main>{renderContent()}</main>
    </div>
  );
}