import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import { 
  CircleUser, 
  CheckCircle2 
} from 'lucide-react';

// --- TYPES ---
type AppView = 'HOME' | 'AUTH' | 'DASHBOARD' | 'ADMIN_DASHBOARD';
type UserRole = 'JOURNALISTE' | 'MEDIAS' | 'STAFF' | 'ADMIN';

// --- CONFIGURATION ---
const API_URL = "https://collectinfos.onrender.com";

// --- UTILITAIRES ---
const generateContractPDF = (userName: string, userEmail: string, userRole: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('fr-FR');
  doc.setFontSize(18);
  doc.text("CONTRAT COLLECTINFOS", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Signé par : ${userName} (${userEmail})`, 20, 40);
  doc.text(`Rôle : ${userRole}`, 20, 50);
  doc.text(`Date : ${date}`, 20, 60);
  doc.save(`Contrat_${userName}.pdf`);
};

// --- COMPOSANT AUTH ---
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
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
            {error}
          </div>
        )}
        {authType === 'SIGNUP' && (
          <input 
            className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" 
            placeholder="Nom complet" 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
        )}
        <input 
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" 
          type="email" 
          placeholder="Email" 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold" 
          type="password" 
          placeholder="Mot de passe" 
          onChange={e => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full p-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Chargement...' : 'Valider'}
        </button>
      </form>
      <button 
        onClick={() => setAuthType(authType === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} 
        className="w-full mt-4 text-sm font-bold text-indigo-600 hover:underline"
      >
        {authType === 'LOGIN' ? "Créer un compte" : "Déjà membre ? Connectez-vous"}
      </button>
      <button 
        onClick={onCancel} 
        className="w-full mt-2 text-xs text-slate-400 font-bold uppercase hover:text-slate-600"
      >
        Annuler
      </button>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function App() {
  const [view, setView] = useState<AppView>('HOME');
  const [user, setUser] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('HOME')}
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">CI</div>
            <span className="font-black tracking-tighter text-xl">COLLECTINFOS</span>
          </div>
          <button 
            onClick={() => setView('AUTH')} 
            className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-600 transition-colors"
          >
            ACCÈS STAFF
          </button>
        </div>
      </nav>

      {/* Contenu Principal */}
      <main className="pt-32 pb-20 px-6">
        {view === 'AUTH' ? (
          <AuthForm 
            onCancel={() => setView('HOME')} 
            onNavigate={setView} 
            onLogin={setUser} 
          />
        ) : view === 'ADMIN_DASHBOARD' || view === 'DASHBOARD' ? (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">Bienvenue, {user?.name || 'Administrateur'}</h2>
            <p className="text-slate-500 mb-8 text-lg">Votre espace de gestion est prêt et sécurisé.</p>
            <div className="flex flex-col gap-3">
               <button 
                onClick={() => setView('HOME')} 
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg"
              >
                Accéder au Dashboard
              </button>
              <button 
                onClick={() => { setUser(null); setView('HOME'); }} 
                className="text-slate-400 font-bold text-sm uppercase tracking-widest"
              >
                Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
              L'info brute,<br/>
              <span className="text-indigo-600">certifiée.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 italic max-w-2xl mx-auto">
              "Le premier réseau de correspondants locaux en temps réel pour une information sans filtre."
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setView('AUTH')} 
                className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black shadow-2xl hover:bg-indigo-600 hover:-translate-y-1 transition-all"
              >
                DÉMARRER MAINTENANT
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}