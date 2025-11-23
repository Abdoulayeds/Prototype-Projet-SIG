import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl text-white text-3xl font-bold mb-4 shadow-lg shadow-emerald-600/30">
              F
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Projet FIER II</h1>
            <p className="text-slate-500 mt-2 text-sm">Système d'Information Géographique</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email professionnel</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="nom@fier2.ml"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Mot de passe oublié ?</a>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all
                ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? 'Connexion...' : 'Accéder à la plateforme'}
              {!isLoading && <ArrowRight size={18} />}
            </button>

            {/* Hint for prototype */}
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs flex gap-2 items-start">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <p>Ceci est un prototype. Entrez n'importe quel email pour vous connecter.</p>
            </div>
          </form>
          
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">© 2023 FIER II / FIDA / Gouvernement du Mali</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
