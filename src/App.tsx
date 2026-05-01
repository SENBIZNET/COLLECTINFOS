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

// URL de votre serveur sur Render
const API_URL = "https://collectinfos.onrender.com";

const generateContractPDF = (userName: string, userEmail: string, userRole: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('fr-FR');
  const transactionId = Math.random().toString(36).substring(7).toUpperCase();
  doc.setFontSize(18);
  doc.text("CONTRAT COLLECTINFOS", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Signé par : ${userName} (${userEmail})`, 20, 40);
  doc.text(`Rôle : ${userRole}`, 20, 50);
  doc.text(`Date : ${date}`, 20, 60);
  doc.save(`Contrat_${userName}.pdf`);
};

// --- COMPOSANT AUTH (CORRIGÉ POUR ÉVITER L'ERREUR 405) ---
const AuthForm = ({ type = 'LOGIN', onCancel, onNavigate, onLogin }: any) => {
  const [authType, setAuthType] = useState<'LOGIN' | 'SIGNUP'>(type);
  const [role, setRole] = useState<UserRole>('JOURNALISTE');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = authType === 'LOGIN' 
      ? `${API_URL}/api/auth/login` 
      : `${API_URL}/api/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authType === 'LOGIN' 
          ? { email: formData.email, password: formData.password }
          : { ...formData, role })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
        if (authType === 'SIGNUP') generateContractPDF(formData.name, formData.email, role);
        onNavigate(data.role === 'ADMIN' ? 'ADMIN_DASHBOARD' : 'DASHBOARD');
      } else {
        setError(data.error || "Erreur lors de la connexion");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez que votre backend sur Render est 'Live'.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
      <h2 className="text-2xl font-black text-center mb-8 uppercase tracking-tight">
        {authType === 'LOGIN' ? 'Connexion Staff' : 'Inscription'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">{error}</div>}
        {authType === 'SIGNUP' && (
          <input className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" placeholder="Nom complet" onChange={e => setFormData({...formData, name: e.target.value})} required />
        )}
        <input className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" type="password" placeholder="Mot de passe" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" disabled={isLoading} className="w-full p-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
          {isLoading ? 'Chargement...' : 'Valider'}
        </button>
      </form>
      <button onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} className="w-full mt-4 text-sm font-bold text-indigo-600">
        {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Connectez-vous"}
      </button>
      <button onClick={onCancel} className="w-full mt-2 text-xs text-slate-400 font-bold uppercase">Annuler</button>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function App() {
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('HOME')}>
            <img src="/uploads/collectinfo.jpg" className="w-8 h-8 rounded" alt="logo" />
            <span className="font-black tracking-tighter text-xl">COLLECTINFOS</span>
          </div>
          <button onClick={() => setView('AUTH')} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm">
            ACCÈS STAFF
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        {view === 'AUTH' ? (
          <AuthForm onCancel={() => setView('HOME')} onNavigate={setView} onLogin={setUser} />
        ) : view === 'ADMIN_DASHBOARD' || view === 'DASHBOARD' ? (
          <div className="text-center py-20">
            <h2 className="text-4xl font-black mb-4">Bienvenue, {user?.name || 'Utilisateur'}</h2>
            <p className="text-slate-500 mb-8">Votre espace de gestion est prêt.</p>
            <button onClick={() => setView('HOME')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold">Retour à l'accueil</button>
          </div>
        ) : (
          <div className="text-center py-20 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter uppercase">L'info brute,<br/><span className="text-indigo-600">certifiée.</span></h1>
            <p className="text-xl text-slate-500 mb-12 italic">"Le premier réseau de correspondants locaux en temps réel."</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setView('AUTH')} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black shadow-xl hover:bg-indigo-600 transition-all">DÉMARRER</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}