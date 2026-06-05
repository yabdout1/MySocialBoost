import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Loader2, 
  ShieldCheck, 
  Database,
  Cpu,
  Tv,
  Users,
  CheckCircle,
  HelpCircle,
  Chrome
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  isSupabaseConfigured, 
  authSignIn, 
  authSignUp, 
  authSignInWithGoogle, 
  authSetSession 
} from '../supabase';

interface LoginPageProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'visitor' | 'creator' | 'admin';
  setUserRole: (role: 'visitor' | 'creator' | 'admin') => void;
  addNotification: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
  onSuccessRedirect?: () => void;
}

export default function LoginPage({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  addNotification,
  onSuccessRedirect
}: LoginPageProps) {
  // Modes: 'signin' | 'signup' | 'forgot'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabaseConfigured = isSupabaseConfigured();

  // Listen for the OAUTH_AUTH_SUCCESS message sent from the popup
  useEffect(() => {
    const handleOAuthMessage = async (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }

      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const hash = event.data.hash || '';
        const params = new URLSearchParams(hash.substring(1)); // strip '#'
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          setIsLoading(true);
          try {
            const { data, error } = await authSetSession(accessToken, refreshToken);
            if (error) {
              setErrorMessage("Échec de l'association de session Google : " + error.message);
              addNotification("Google Auth ⚠️", error.message, "warning");
            } else if (data?.user) {
              setUserRole('creator');
              addNotification('Connexion Google 🎉', `Authentification réussie via Google pour ${data.user.email} !`, 'success');
              if (onSuccessRedirect) {
                onSuccessRedirect();
              } else {
                setCurrentTab('creator-dashboard');
              }
            }
          } catch (err: any) {
            setErrorMessage(err?.message || "Erreur lors de la configuration de la session.");
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [setCurrentTab, setUserRole, addNotification, onSuccessRedirect]);

  const handleGoogleSignIn = async () => {
    if (!supabaseConfigured) {
      // Offline mode simulation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setUserRole('creator');
        addNotification(
          'Simulation Google ✅', 
          `Connecté via Google (simulé) sous google.test@socialboost.io. Configurez votre VITE_SUPABASE_URL pour la connexion réelle !`, 
          'success'
        );
        if (onSuccessRedirect) {
          onSuccessRedirect();
        } else {
          setCurrentTab('creator-dashboard');
        }
      }, 800);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await authSignInWithGoogle();
      if (error) {
        setErrorMessage(error.message);
        addNotification('Erreur Authentification 🎉', error.message, 'warning');
        setIsLoading(false);
      } else if (data?.url) {
        // Open authorization URL directly in popup
        const authWindow = window.open(
          data.url,
          'supabase_oauth_popup',
          'width=600,height=700,status=no,resizable=yes,scrollbars=yes'
        );
        if (!authWindow) {
          addNotification(
            'Bloqueur de pop-ups ⚠️',
            'Veuillez autoriser les fenêtres pop-up pour cette page afin de vous connecter avec Google.',
            'warning'
          );
          setIsLoading(false);
        }
        // State remains loading while waiting for the message event
      } else {
        setErrorMessage("L'URL d'authentification Google n'a pas pu être construite.");
        setIsLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Erreur de connexion inattendue avec Google.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setErrorMessage(null);

    if (supabaseConfigured) {
      try {
        if (authMode === 'signup') {
          const { data, error } = await authSignUp(email, password);
          if (error) {
            setErrorMessage(error.message);
            addNotification('Échec Inscription ⚠️', error.message, 'warning');
          } else {
            addNotification(
              'Compte créé ! 🎉', 
              `Un email de confirmation a été envoyé à ${email}. Vous pouvez vous connecter.`, 
              'success'
            );
            setAuthMode('signin');
          }
        } else {
          const { data, error } = await authSignIn(email, password);
          if (error) {
            setErrorMessage(error.message);
            addNotification('Échec Connexion ⚠️', error.message, 'warning');
          } else if (data?.user) {
            setUserRole('creator');
            addNotification('Connexion Securisée ⚡', `Authentification réussie via Supabase pour ${email}!`, 'success');
            if (onSuccessRedirect) {
              onSuccessRedirect();
            } else {
              setCurrentTab('creator-dashboard');
            }
          }
        }
      } catch (err: any) {
        setErrorMessage(err?.message || "Erreur réseau innatendue.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Simulate real auth offline flow
      setTimeout(() => {
        setIsLoading(false);
        setUserRole('creator');
        addNotification(
          'Simulation Connexion ✅', 
          `Connecté localement sous ${email}. Configurez votre VITE_SUPABASE_URL pour activer l'authentification durable !`, 
          'success'
        );
        if (onSuccessRedirect) {
          onSuccessRedirect();
        } else {
          setCurrentTab('creator-dashboard');
        }
      }, 900);
    }
  };

  const loginAsDemo = (role: 'creator' | 'admin', demoEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUserRole(role);
      addNotification(
        'Espace Démonstration Débloqué ⭐', 
        `Bienvenue dans le rôle ${role === 'admin' ? 'Administrateur' : 'Créateur'} (${demoEmail}) !`, 
        'success'
      );
      if (role === 'admin') {
        setCurrentTab('admin-dashboard');
      } else {
        setCurrentTab('creator-dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50 dark:bg-zinc-950 text-gray-950 dark:text-zinc-100 transition-colors duration-200">
      
      {/* Container main card */}
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-805 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Left Column: Visual branding and value propositions */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-750 via-blue-600 to-indigo-800 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Ambient geometric backgrounds */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-15 -ml-20 -mb-20"></div>

          {/* Top content */}
          <div className="relative space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-300 fill-indigo-300" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight">SocialBoost</span>
                <p className="text-[9px] font-mono tracking-wider opacity-60 leading-none">GROWTH SAAS</p>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight leading-none text-white/95">
                Faites exploser l'engagement de votre audience d'un simple clic.
              </h2>
              <p className="text-xs text-blue-105 opacity-80 leading-relaxed font-sans">
                Offrez instantanément des guides, PDFs, codes d'accès et vidéos exclusives en échange d'interactions vérifiées par notre assistant IA breveté.
              </p>
            </div>
          </div>

          {/* Mid content: Features checklist */}
          <div className="relative space-y-3 pt-4 sm:pt-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-blue-200">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-305" />
              </div>
              <span className="text-xs font-semibold">Preuves sociales automatisées</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-blue-200">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-305" />
              </div>
              <span className="text-xs font-semibold">Redirections et tunnels configurables</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-blue-200">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-305" />
              </div>
              <span className="text-xs font-semibold">Exportation CSV & statistiques en direct</span>
            </div>
          </div>

          {/* Bottom layout info */}
          <div className="relative pt-6 border-t border-white/10 mt-6 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border border-blue-600" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="avatar" />
                <img className="w-6 h-6 rounded-full border border-blue-600" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="avatar" />
                <img className="w-6 h-6 rounded-full border border-blue-600" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="avatar" />
              </div>
              <p className="text-[10px] text-indigo-150 italic leading-snug">
                Rejoint par <strong>+14 200 créateurs</strong> cette semaine dans toute la francophonie.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Interaction authorization form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          
          <div>
            {/* Supabase Status Banner */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-855 border border-slate-100 dark:border-zinc-800 mb-6 text-[11px]">
              <div className="flex items-center gap-2">
                <Database className={`w-4 h-4 ${supabaseConfigured ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`} />
                <span className="font-semibold text-gray-700 dark:text-zinc-300">
                  Mode Base : {supabaseConfigured ? 'Supabase Connecté ⚡' : 'Simulation Locale Active (Hors-ligne/Bac-à-sable)'}
                </span>
              </div>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help hover:text-gray-600" />
                <span className="pointer-events-none absolute bottom-6 right-0 w-64 bg-slate-900 border border-slate-850 text-[10px] text-white rounded-xl p-2.5 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed shadow-xl z-50">
                  {supabaseConfigured 
                    ? "Les identifiants d'accès s'enregistrent directement dans votre base Supabase Auth réelle." 
                    : "Votre application est en mode hors-ligne simulé. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY pour lier vos comptes."}
                </span>
              </div>
            </div>

            {/* Mode Toggle Header */}
            <div className="flex border-b border-gray-100 dark:border-zinc-800 pb-3 mb-6 items-center justify-between">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage(null);
                  }}
                  className={`text-sm font-bold pb-2 relative transition-all ${
                    authMode === 'signin' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:text-zinc-500'
                  }`}
                >
                  Se connecter
                  {authMode === 'signin' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMessage(null);
                  }}
                  className={`text-sm font-bold pb-2 relative transition-all ${
                    authMode === 'signup' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:text-zinc-500'
                  }`}
                >
                  Créer un compte
                  {authMode === 'signup' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                CRÉATEUR PORTAL
              </span>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
              
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 font-medium">
                  {errorMessage}
                </div>
              )}

              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-zinc-350">Nom du Créateur ou Entreprise</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Dupuis Studio"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-350">Adresse e-mail</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="createur@socialboost.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-700 dark:text-zinc-350">Mot de passe</label>
                  {authMode === 'signin' && (
                    <button 
                      type="button"
                      onClick={() => addNotification('Réinitialisation 🔮', 'Formulaire de mot de passe oublié simulé. Un email fictif serait envoyé.', 'info')}
                      className="text-[10px] font-semibold text-blue-500 hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed transition-all relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Vérification en cours...</span>
                  </span>
                ) : (
                  <>
                    {authMode === 'signin' ? 'Se connecter à SocialBoost' : "Créer mon Espace de Croissance"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4 flex items-center justify-center">
                <hr className="w-full border-gray-155 dark:border-zinc-800" />
                <span className="absolute bg-white dark:bg-zinc-900 px-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">ou</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-semibold border border-slate-200 dark:border-zinc-800 bg-white hover:bg-slate-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 active:scale-[0.99] text-gray-700 dark:text-zinc-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed transition-all"
              >
                <Chrome className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>Continuer avec Google</span>
              </button>

            </form>
          </div>

          {/* Quick Sandbox Access Panel */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 space-y-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Passerelles d'évaluation rapide (Sans Inscription)</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemo('creator', 'demo.crea@socialboost.io')}
                className="flex items-center justify-between p-2 rounded-xl border border-blue-105 bg-blue-50/20 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:bg-zinc-850 text-left cursor-pointer transition-all"
              >
                <div>
                  <p className="font-extrabold text-[10px] text-gray-800 dark:text-zinc-200">💼 Compte Créateur</p>
                  <p className="text-[9px] text-gray-400">Gérer mes campagnes</p>
                </div>
                <Users className="w-4 h-4 text-blue-500 opacity-60" />
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('admin', 'moderation.ai@socialboost.io')}
                className="flex items-center justify-between p-2 rounded-xl border border-violet-105 bg-violet-50/20 hover:bg-violet-50/50 dark:border-zinc-800 dark:hover:bg-zinc-850 text-left cursor-pointer transition-all"
              >
                <div>
                  <p className="font-extrabold text-[10px] text-violet-750 dark:text-violet-400">🛡️ Admin Modération</p>
                  <p className="text-[9px] text-gray-400">Inspecter les captures IA</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-violet-500 opacity-60" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
