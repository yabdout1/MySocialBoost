import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  X, 
  Lock, 
  LogIn, 
  CreditCard,
  Cpu
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CampaignBuilder from './components/CampaignBuilder';
import CampaignList from './components/CampaignList';
import CampaignExecution from './components/CampaignExecution';
import Marketplace from './components/Marketplace';
import RewardLibrary from './components/RewardLibrary';
import Affiliation from './components/Affiliation';
import SupportPages from './components/SupportPages';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';

import { Campaign, RewardFile, AlertNotification, LeaderboardUser } from './types';
import { INITIAL_CAMPAIGNS, DEFAULT_REWARDS_LIBRARY, LEADERBOARD } from './mockData';
import { 
  isSupabaseConfigured, 
  dbFetchCampaigns, 
  dbInsertCampaign, 
  dbDeleteCampaign, 
  dbIncrementParticipants,
  dbFetchFiles,
  dbInsertFile,
  dbDeleteFile,
  dbFetchUsers
} from './supabase';

export default function App() {
  // Theme Manager
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // States
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<'visitor' | 'creator' | 'admin'>('visitor');
  const [userPoints, setUserPoints] = useState<number>(750);
  const [activeExecCampaign, setActiveExecCampaign] = useState<Campaign | null>(null);

  // Modals & Overlay triggers
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [shouldShakeEmail, setShouldShakeEmail] = useState<boolean>(false);
  
  const [upgradeModalPlan, setUpgradeModalPlan] = useState<string | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<'fedapay' | 'paypal'>('fedapay');
  const [fedaPayPhone, setFedaPayPhone] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [fedaPayCheckoutUrl, setFedaPayCheckoutUrl] = useState<string>('');
  const [fedaPayTxId, setFedaPayTxId] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string>('');

  // Databases (Saved to client side localStorage)
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [files, setFiles] = useState<RewardFile[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [notifications, setNotifications] = useState<AlertNotification[]>([
    {
      id: 'not-1',
      title: 'Bienvenue sur SocialBoost ! 🚀',
      message: 'Développez votre trafic organique grâce au rachat par récompense digitale.',
      time: 'À l\'instant',
      read: false,
      type: 'success'
    },
    {
      id: 'not-2',
      title: 'Mise à niveau Vision IA approuvée 🛡️',
      message: 'Le système de vérification automatique de screenshots est actif.',
      time: 'Il y a 10m',
      read: false,
      type: 'info'
    }
  ]);

  // Read URL hashes if visitor opens campaign directly (Ex: /#campaign-1)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#campaign-')) {
        const id = hash.replace('#campaign-', '');
        const targetCamp = campaigns.find(c => c.id === id);
        if (targetCamp) {
          setActiveExecCampaign(targetCamp);
          setCurrentTab('marketplace'); // Stay in a context where they see the support card
        }
      }
    };

    if (campaigns.length > 0) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [campaigns]);

  // Load from Supabase (if configured) or fallback to LocalStorage/mock defaults
  useEffect(() => {
    async function loadData() {
      const configured = isSupabaseConfigured();
      
      // Load user points from local storage
      const localPoints = localStorage.getItem('socialboost_points');
      if (localPoints) {
        setUserPoints(parseInt(localPoints));
      } else {
        setUserPoints(750);
        localStorage.setItem('socialboost_points', '750');
      }

      if (configured) {
        addNotification('Connexion Supabase ⚡', 'Tentative de synchronisation en temps réel avec le backend Supabase...', 'info');
        
        // 1. Load Campaigns
        const dbCamps = await dbFetchCampaigns();
        if (dbCamps) {
          setCampaigns(dbCamps);
          localStorage.setItem('socialboost_campaigns', JSON.stringify(dbCamps));
          addNotification('Synchronisation Réussie 💎', `${dbCamps.length} campagnes récupérées de Supabase.`, 'success');
        } else {
          // Fallback to local files if Supabase is connected but tables are empty/erroring
          const localCamps = localStorage.getItem('socialboost_campaigns');
          const campsToInstall = localCamps ? JSON.parse(localCamps) : INITIAL_CAMPAIGNS;
          setCampaigns(campsToInstall);
          localStorage.setItem('socialboost_campaigns', JSON.stringify(campsToInstall));
        }

        // 2. Load FILES
        const dbRewardFiles = await dbFetchFiles();
        if (dbRewardFiles) {
          setFiles(dbRewardFiles);
          localStorage.setItem('socialboost_files', JSON.stringify(dbRewardFiles));
        } else {
          const localFiles = localStorage.getItem('socialboost_files');
          const filesToInstall = localFiles ? JSON.parse(localFiles) : DEFAULT_REWARDS_LIBRARY;
          setFiles(filesToInstall);
          localStorage.setItem('socialboost_files', JSON.stringify(filesToInstall));
        }

        // 3. Load LEADERBOARD / USERS
        const dbUsers = await dbFetchUsers();
        if (dbUsers) {
          setLeaderboard(dbUsers);
          localStorage.setItem('socialboost_leaderboard', JSON.stringify(dbUsers));
        } else {
          const localLeaderboard = localStorage.getItem('socialboost_leaderboard');
          const leaderboardToInstall = localLeaderboard ? JSON.parse(localLeaderboard) : LEADERBOARD;
          setLeaderboard(leaderboardToInstall);
          localStorage.setItem('socialboost_leaderboard', JSON.stringify(leaderboardToInstall));
        }
      } else {
        // Fallback to standard offline behavior
        const localCamps = localStorage.getItem('socialboost_campaigns');
        if (localCamps) {
          setCampaigns(JSON.parse(localCamps));
        } else {
          setCampaigns(INITIAL_CAMPAIGNS);
          localStorage.setItem('socialboost_campaigns', JSON.stringify(INITIAL_CAMPAIGNS));
        }

        const localFiles = localStorage.getItem('socialboost_files');
        if (localFiles) {
          setFiles(JSON.parse(localFiles));
        } else {
          setFiles(DEFAULT_REWARDS_LIBRARY);
          localStorage.setItem('socialboost_files', JSON.stringify(DEFAULT_REWARDS_LIBRARY));
        }

        const localLeaderboard = localStorage.getItem('socialboost_leaderboard');
        if (localLeaderboard) {
          setLeaderboard(JSON.parse(localLeaderboard));
        } else {
          setLeaderboard(LEADERBOARD);
          localStorage.setItem('socialboost_leaderboard', JSON.stringify(LEADERBOARD));
        }
      }
    }

    loadData();
  }, []);

  // Sync state modifications automatically
  const addCampaign = async (camp: Campaign) => {
    const updated = [camp, ...campaigns];
    setCampaigns(updated);
    localStorage.setItem('socialboost_campaigns', JSON.stringify(updated));
    addNotification(
      'Campagne Publiée ! 🎉', 
      `Votre lien de distribution pour "${camp.title}" est généré et actif.`, 
      'success'
    );

    if (isSupabaseConfigured()) {
      const ok = await dbInsertCampaign(camp);
      if (ok) {
        addNotification('Base de données Supabase ⚡', 'Nouvelle campagne persistée avec succès.', 'success');
      } else {
        addNotification('Erreur de synchro ⚠️', 'Impossible d\'écrire dans Supabase. Vérifiez les tables ou les permissions RLS.', 'warning');
      }
    }
  };

  const deleteCampaign = async (id: string) => {
    const updated = campaigns.filter(c => c.id !== id);
    setCampaigns(updated);
    localStorage.setItem('socialboost_campaigns', JSON.stringify(updated));
    addNotification('Campagne Archivée 📂', 'La page d’atterrissage est suspendue.', 'info');

    if (isSupabaseConfigured()) {
      const ok = await dbDeleteCampaign(id);
      if (ok) {
        addNotification('Base de données Supabase ⚡', 'La campagne a été retirée de Supabase.', 'info');
      }
    }
  };

  const updateCampaign = async (camp: Campaign) => {
    const updated = campaigns.map(c => c.id === camp.id ? camp : c);
    setCampaigns(updated);
    localStorage.setItem('socialboost_campaigns', JSON.stringify(updated));
    addNotification(
      'Campagne mise à jour ! 🛡️',
      `Les paramètres de "${camp.title}" ont été mis à jour de manière sécurisée.`,
      'success'
    );

    if (isSupabaseConfigured()) {
      const ok = await dbInsertCampaign(camp);
      if (ok) {
        addNotification('Base de données Supabase ⚡', 'Modifications de campagne propagées.', 'success');
      }
    }
  };

  const incrementCampaignParticipants = async (id: string) => {
    let nextCount = 0;
    const updated = campaigns.map(c => {
      if (c.id === id) {
        nextCount = c.participantsCount + 1;
        return { ...c, participantsCount: nextCount };
      }
      return c;
    });
    setCampaigns(updated);
    localStorage.setItem('socialboost_campaigns', JSON.stringify(updated));

    if (isSupabaseConfigured() && nextCount > 0) {
      await dbIncrementParticipants(id, nextCount);
    }
  };

  const addFile = async (file: RewardFile) => {
    const updated = [file, ...files];
    setFiles(updated);
    localStorage.setItem('socialboost_files', JSON.stringify(updated));
    addNotification('Double Enregistrement 📤', 'La ressource est prête dans votre médiathèque.', 'success');

    if (isSupabaseConfigured()) {
      const ok = await dbInsertFile(file);
      if (ok) {
        addNotification('Fichier synchronisé ⚡', 'Surgardé avec succès dans Supabase.', 'success');
      }
    }
  };

  const deleteFile = async (id: string) => {
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    localStorage.setItem('socialboost_files', JSON.stringify(updated));
    addNotification('Fichier Supprimé', 'La ressource a été retirée de votre bibliothèque.', 'warning');

    if (isSupabaseConfigured()) {
      const ok = await dbDeleteFile(id);
      if (ok) {
        addNotification('Fichier synchronisé ⚡', 'Supprimé de la table Supabase.', 'warning');
      }
    }
  };

  const addPoints = (pts: number) => {
    const nextVal = userPoints + pts;
    setUserPoints(nextVal);
    localStorage.setItem('socialboost_points', nextVal.toString());
  };

  // Notification engine helper
  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newNotif: AlertNotification = {
      id: `not-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications([newNotif, ...notifications]);
  };

  const clearNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@') || authPassword.length < 6) {
      // Trigger temporary shake state
      setShouldShakeEmail(true);
      setTimeout(() => setShouldShakeEmail(false), 550);
      addNotification(
        'Erreur de Connexion ⚠️',
        'Veuillez entrer une adresse e-mail valide et un mot de passe de 6 caractères minimum.',
        'warning'
      );
      return;
    }
    setUserRole('creator');
    setAuthModalOpen(false);
    setCurrentTab('creator-dashboard');
    addNotification('Connexion Réussie 👋', `Content de vous revoir en tant que ${authEmail}!`, 'success');
  };

  // Real integrated FedaPay checkout logic (Mobile Money & Card)
  const executePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');
    setFedaPayCheckoutUrl('');
    setFedaPayTxId('');

    if (selectedGateway === 'fedapay' && !fedaPayPhone) {
      alert('Veuillez renseigner votre numéro de téléphone.');
      return;
    }

    setIsPaying(true);
    setPaymentSuccess(false);
    setPaymentStep("Initialisation de la transaction cryptée...");

    // Conversion: 1 EUR ~ 655.957 XOF. FedaPay works in XOF.
    const amountXof = upgradeModalPlan === 'Starter Plan' ? 5900 : upgradeModalPlan === 'Pro Plan' ? 19000 : 38700;

    try {
      if (selectedGateway === 'fedapay') {
        const response = await fetch('/api/fedapay/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountXof,
            planName: upgradeModalPlan,
            email: authEmail || "createur@socialboost.app",
            firstname: "Créateur",
            lastname: "SocialBoost",
            phone: fedaPayPhone,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Une erreur est survenue lors de l'appel du serveur FedaPay.");
        }

        const data = await response.json();
        console.log("[FedaPay Backend Response]:", data);

        setFedaPayCheckoutUrl(data.checkoutUrl);
        setFedaPayTxId(data.id);

        if (data.isSimulated) {
          setPaymentStep("Simulation FedaPay: Session fictive initialisée avec succès !");
          addNotification(
            'Mode Simulation FedaPay 💡',
            'Aucune clé API FedaPay installée. Double-cliquez ci-après pour valider fictivement.',
            'info'
          );
        } else {
          setPaymentStep("Session de paiement FedaPay créée ! Redirection vers le portail officiel...");
        }

        addNotification(
          'FedaPay Checkout ⚡', 
          'Redirection vers le portail de paiement mobile (MTN, Moov, Orange, Wave).', 
          'info'
        );

        // Auto redirect within 2 seconds
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 2200);

      } else {
        // Paypal route simulated
        setPaymentStep("Connexion sécurisée aux serveurs de PayPal...");
        setTimeout(() => {
          setPaymentStep("Transaction PayPal autorisée ! Activation de l'offre...");
          setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
            addNotification(
              'Souscription Activée 💎',
              `Bienvenue dans l'offre SocialBoost ${upgradeModalPlan} ! Vos quotas d'exports de trafic sont doublés.`,
              'success'
            );
          }, 1000);
        }, 1500);
      }
    } catch (err: any) {
      console.error("[Checkout error]", err);
      setPaymentError(err.message || "Erreur de connexion avec le serveur de paiement.");
      setIsPaying(false);
      addNotification('Erreur de paiement ❌', err.message || "La transaction a échoué.", 'warning');
    }
  };

  // Check payment status from FedaPay endpoint helper
  const verifyFedaPayStatus = async () => {
    if (!fedaPayTxId) return;
    setPaymentStep("Vérification en cours avec le serveur de paiement FedaPay...");
    
    try {
      const resp = await fetch(`/api/fedapay/status/${fedaPayTxId}`);
      if (resp.ok) {
        const result = await resp.json();
        // Check for success or simulation
        if (result.status === "approved" || result.status === "success" || result.isSimulated) {
          setIsPaying(false);
          setPaymentSuccess(true);
          addNotification(
            'Abonnement premium Activé 🎉', 
            `Paiement FedaPay reçu avec succès ! Bienvenue dans l'offre SocialBoost ${upgradeModalPlan}.`, 
            'success'
          );
        } else {
          addNotification(
            'FedaPay Statut ⏳', 
            `Statut de la transaction : "${result.status || 'En attente'}". Veuillez confirmer le code PIN sur votre mobile.`, 
            'warning'
          );
        }
      } else {
        throw new Error("Impossible de contacter l'API de vérification.");
      }
    } catch (err: any) {
      console.error("Status check fail", err);
      addNotification('Vérification échouée ⚠️', 'La vérification a échoué, veuillez refaire.', 'warning');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="min-h-screen bg-white text-slate-800 dark:bg-zinc-950 dark:text-zinc-150 transition-colors duration-200 font-sans flex flex-col justify-between">
        
        {/* Core Layout Header navigation bar */}
        <Header 
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setActiveExecCampaign(null); // Clear execution when navigating away
            window.location.hash = ''; // Clear hashed URI params
          }}
          userRole={userRole}
          setUserRole={setUserRole}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          userPoints={userPoints}
          notifications={notifications}
          clearNotifications={clearNotifications}
          setAuthModal={(open) => {
            if (open) {
              setCurrentTab('login');
              setActiveExecCampaign(null);
            }
          }}
        />

        {/* Central main router screen */}
        <main className="flex-grow pb-12">
          
          {/* Active campaign execution delivery page panel (Overrules other views if set) */}
          {activeExecCampaign ? (
            <CampaignExecution
              campaign={activeExecCampaign}
              onBack={() => {
                setActiveExecCampaign(null);
                window.location.hash = '';
              }}
              addPoints={addPoints}
              addNotification={addNotification}
              onIncrementCount={incrementCampaignParticipants}
            />
          ) : (
            <>
              {/* DEDICATED LOGIN / REGISTER PAGE */}
              {currentTab === 'login' && (
                <LoginPage 
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  userRole={userRole}
                  setUserRole={setUserRole}
                  addNotification={addNotification}
                />
              )}

              {/* LANDING PAGE / UNLOGGED VISITOR VIEW */}
              {currentTab === 'home' && (
                <LandingPage 
                  setCurrentTab={setCurrentTab} 
                  setUserRole={setUserRole}
                  setAuthModal={setAuthModalOpen}
                />
              )}

              {/* TARIFFS SAAS PLAN CARD SCREEN */}
              {currentTab === 'pricing' && (
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">FORMULES SAAS</span>
                    <h2 className="text-3xl font-extrabold tracking-tight">Des plans adaptés à votre croissance</h2>
                    <p className="text-xs sm:text-sm text-slate-500">Commencez gratuitement, puis passez à la vitesse supérieure pour maximiser votre volume d'engagement et personnaliser vos capture templates.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-zinc-900 border p-5 rounded-2xl border-slate-100 dark:border-zinc-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 px-2.5 py-1 rounded">Basique</span>
                          <h3 className="font-extrabold text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider mt-2">Plan Free</h3>
                        </div>
                        <p className="text-3xl font-mono font-extrabold">0 € <span className="text-xs text-gray-400 font-sans font-medium">/ à vie</span></p>
                        <p className="text-xs text-slate-400">Pour tester l'impact immédiat du rachat par récompense sur votre audience.</p>
                        <ul className="space-y-2.5 text-xs pt-4 border-t border-slate-50 dark:border-zinc-850">
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ 1 Campagne active</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Hébergement Cloud 50 MB</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Analyse de capture IA</li>
                          <li className="text-slate-300 dark:text-zinc-650 flex items-center gap-1.5">✗ Export de contacts CSV</li>
                          <li className="text-slate-300 dark:text-zinc-650 flex items-center gap-1.5">✗ QR Codes vectoriels</li>
                        </ul>
                      </div>
                      <button 
                        onClick={() => {
                          setUserRole('creator');
                          setCurrentTab('creator-dashboard');
                          addNotification('Plan Actif 💎', 'Vous êtes actuellement sur le Plan Découverte Gratuit.', 'info');
                        }}
                        className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-850 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-800 dark:text-zinc-200 transition-colors"
                      >
                        Sélectionner l'offre
                      </button>
                    </div>

                    {/* Starter Plan */}
                    <div className="bg-white dark:bg-zinc-900 border p-5 rounded-2xl border-slate-100 dark:border-zinc-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        PROMO -50%
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-1 rounded">Lancement</span>
                          <h3 className="font-extrabold text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider mt-2">Plan Starter</h3>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                            9 € <span className="text-xs text-gray-400 font-sans font-medium">/ mois</span>
                          </p>
                          <p className="text-[10px] text-slate-400 line-through">Au lieu de 19 €/mois</p>
                        </div>
                        <p className="text-xs text-slate-400">Pour les créateurs émergents voulant diversifier et fidéliser leur audience.</p>
                        <ul className="space-y-2.5 text-xs pt-4 border-t border-slate-50 dark:border-zinc-850">
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ 3 Campagnes actives</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Hébergement Cloud 2 GB</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Analyse de capture IA</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Export complet CSV</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ QR Codes personnalisés</li>
                        </ul>
                      </div>
                      <button 
                        onClick={() => setUpgradeModalPlan('Starter Plan')}
                        className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-850 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-800 dark:text-zinc-200 transition-colors"
                      >
                        S'abonner à l'offre
                      </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-zinc-900 border-2 border-indigo-500 p-5 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden">
                      <span className="absolute -top-1 right-2 bg-indigo-500 text-white text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest shadow">
                        RECOMMANDÉ 🔥
                      </span>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 px-2.5 py-1 rounded">Populaire</span>
                          <h3 className="font-extrabold text-sm text-indigo-500 uppercase tracking-wider mt-2">Plan Pro</h3>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                            29 € <span className="text-xs text-gray-400 font-sans font-medium">/ mois</span>
                          </p>
                          <p className="text-[10px] text-indigo-500 line-through">Au lieu de 49 €/mois</p>
                        </div>
                        <p className="text-xs text-slate-400">L'arme absolue des influenceurs, créateurs No-Code et boutiques Shopify.</p>
                        <ul className="space-y-2.5 text-xs pt-4 border-t border-indigo-50 dark:border-zinc-850">
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ <strong>Campagnes illimitées</strong></li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Hébergement Cloud 10 GB</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Double Validation instantanée</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Domaines d'accès personnalisés</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ templates & branding VIP</li>
                        </ul>
                      </div>
                      <button 
                        onClick={() => setUpgradeModalPlan('Pro Plan')}
                        className="w-full mt-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold hover:opacity-95 shadow cursor-pointer transition-all"
                      >
                        S'abonner avec FedaPay / PayPal
                      </button>
                    </div>

                    {/* Business/Agency Plan */}
                    <div className="bg-white dark:bg-zinc-900 border p-5 rounded-2xl border-slate-100 dark:border-zinc-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        PROMO OFFRE
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase bg-amber-50 text-amber-705 dark:bg-amber-950/40 dark:text-amber-400 px-2.5 py-1 rounded">Équipe & Agence</span>
                          <h3 className="font-extrabold text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider mt-2">Plan Business</h3>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                            59 € <span className="text-xs text-gray-400 font-sans font-medium">/ mois</span>
                          </p>
                          <p className="text-[10px] text-slate-400 line-through">Au lieu de 99 €/mois</p>
                        </div>
                        <p className="text-xs text-slate-400">Pour les agences de marketing social, les marques ou les labels d'élite.</p>
                        <ul className="space-y-2.5 text-xs pt-4 border-t border-slate-50 dark:border-zinc-850">
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Tout en illimité premium</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Hébergement Cloud 100 GB</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Automatisation Discord & CRM</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ 5 Comptes d'équipe / Staff</li>
                          <li className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">✓ Support client VIP 24h/7d</li>
                        </ul>
                      </div>
                      <button 
                        onClick={() => setUpgradeModalPlan('Business Plan')}
                        className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-850 text-xs font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-slate-800 dark:text-zinc-200 transition-colors"
                      >
                        S'abonner à l'offre
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* MARKETPLACE EXPLORE PAGE */}
              {currentTab === 'marketplace' && (
                <Marketplace 
                  campaigns={campaigns} 
                  onSelectCampaign={setActiveExecCampaign} 
                />
              )}

              {/* CREATOR MAIN DASHBOARD TAB */}
              {currentTab === 'creator-dashboard' && (
                <Dashboard 
                  campaigns={campaigns}
                  setCurrentTab={setCurrentTab}
                  userPoints={userPoints}
                  addPoints={addPoints}
                  setUpgradeModalPlan={setUpgradeModalPlan}
                  leaderboard={leaderboard}
                />
              )}

              {/* CREATOR CAMPAIGN DIRECTORY TAB */}
              {currentTab === 'creator-campaigns' && (
                <CampaignList 
                  campaigns={campaigns}
                  onDeleteCampaign={deleteCampaign}
                  onUpdateCampaign={updateCampaign}
                  setCurrentTab={setCurrentTab}
                  onSelectCampaign={setActiveExecCampaign}
                />
              )}

              {/* CREATOR NEW CAMPAIGN SCHEDULER TAB */}
              {currentTab === 'create-campaign' && (
                <CampaignBuilder 
                  onAddCampaign={addCampaign} 
                  setCurrentTab={setCurrentTab}
                />
              )}

              {/* FILE STORAGE LOCKER TAB */}
              {currentTab === 'rewards-library' && (
                <RewardLibrary 
                  files={files}
                  onAddFile={addFile}
                  onDeleteFile={deleteFile}
                  addNotification={addNotification}
                />
              )}

              {/* AMBASSADOR AFFILIATE TAB */}
              {currentTab === 'affiliation' && (
                <Affiliation />
              )}

              {/* BLOG ARTICLES / FAQS / TERMS SUPPORT HUB */}
              {(currentTab === 'blog' || currentTab === 'help' || currentTab === 'contact' || currentTab === 'terms' || currentTab === 'privacy') && (
                <SupportPages initialSubTab={currentTab as any} />
              )}

              {/* ADMIN PANEL PLATFORM TAB */}
              {currentTab === 'admin-dashboard' && (
                <AdminPanel 
                  onManualApprove={(pts) => addPoints(pts)}
                  addNotification={addNotification}
                />
              )}
            </>
          )}

        </main>

        {/* Global SaaS Footer column */}
        <Footer setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setActiveExecCampaign(null);
          window.location.hash = '';
        }} />

        {/* ================= MODAL DIALOGS ================= */}

        {/* 1. Sign In Simulation modal portal */}
        <AnimatePresence>
          {authModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setAuthModalOpen(false);
              }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 12 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.12 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl max-w-sm w-full border border-slate-100 dark:border-zinc-800 shadow-2xl p-6 relative text-gray-900 dark:text-zinc-150 text-xs"
              >
                
                <button
                  id="auth-modal-close"
                  onClick={() => setAuthModalOpen(false)}
                  className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center space-y-3">
                  <div className="w-10 h-10 bg-indigo-50/50 rounded-xl mx-auto flex items-center justify-center text-indigo-650 animate-bounce">
                    <Sparkles className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight text-gray-950 dark:text-white">Créer mon compte SocialBoost</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Rejoignez 14,000+ créateurs d'Elite.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <button 
                      onClick={() => {
                        setUserRole('creator');
                        setAuthModalOpen(false);
                        setCurrentTab('creator-dashboard');
                        addNotification('Connexion Google ✅', 'Inscrit avec succès via Google OAuth v2.', 'success');
                      }}
                      type="button" 
                      className="py-2.5 border rounded-lg hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-850"
                    >
                      Google OAuth
                    </button>
                    <button 
                      onClick={() => {
                        setUserRole('creator');
                        setAuthModalOpen(false);
                        setCurrentTab('creator-dashboard');
                        addNotification('Connexion Facebook ✅', 'Inscrit avec succès via Facebook Secure SDK.', 'success');
                      }}
                      type="button" 
                      className="py-2.5 border rounded-lg hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-850"
                    >
                      Facebook Link
                    </button>
                  </div>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-zinc-800"></div></div>
                    <span className="relative bg-white dark:bg-zinc-900 px-3 text-[9px] text-gray-400 uppercase font-bold">OU PAR ADRESSE EMAIL</span>
                  </div>

                  <form onSubmit={handleSimulatedLogin} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700 dark:text-zinc-300">Adresse e-mail de connexion *</label>
                      <input
                        type="email"
                        required
                        placeholder="crea@studio_growth.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 check_email transition-all duration-150 ${
                          shouldShakeEmail ? 'animate-shake border-rose-500 ring-2 ring-rose-500/20' : ''
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-700 dark:text-zinc-300">Mot de passe *</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 rounded-lg border dark:border-zinc-800"
                      />
                    </div>

                    <button
                      id="auth-btn-signin-modal"
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-violet-650 text-white shadow hover:opacity-95 text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" /> Créer mon Espace Créateur SaaS
                    </button>
                  </form>

                  <p className="text-[9px] text-gray-400 leading-tight">
                    En continuant, vous acceptez les conditions d'utilisation CGU et la charte de confidentialité conforme au RGPD.
                  </p>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Billing Upgrade checkout Portal simulated with FedaPay & PayPal */}
        {upgradeModalPlan && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full border border-slate-100 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 relative animate-fade-in text-gray-900 dark:text-zinc-150 text-xs text-left">
              
              <button
                id="billing-upgrade-close"
                onClick={() => {
                  setUpgradeModalPlan(null);
                  setIsPaying(false);
                  setPaymentSuccess(false);
                }}
                className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950 dark:hover:bg-zinc-850 rounded-full text-zinc-400 hover:text-zinc-650 border border-transparent"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded font-bold uppercase tracking-wider dark:bg-indigo-950/40 dark:text-indigo-305">
                    SOUSCRIPTION SÉCURISÉE
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    Mise à niveau vers SocialBoost : <strong className="text-indigo-600 dark:text-indigo-400">{upgradeModalPlan}</strong>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Débloquez instantanément votre volume d'engagement illimité et l’exportation de contacts CSV.
                  </p>
                </div>

                {!paymentSuccess ? (
                  <form onSubmit={executePayment} className="space-y-4">
                    
                    {/* Gateway selection input panels */}
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700 dark:text-zinc-300">Mode de paiement instantané</label>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        
                        <button
                          type="button"
                          onClick={() => setSelectedGateway('fedapay')}
                          className={`p-3 border rounded-xl flex items-center justify-center gap-1.5 transition-all outline-none ${
                            selectedGateway === 'fedapay' 
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950/40 dark:text-indigo-400' 
                              : 'border-slate-200 text-slate-400 bg-transparent hover:bg-slate-50/50'
                          }`}
                        >
                          💸 FedaPay (Mobile Money)
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedGateway('paypal')}
                          className={`p-3 border rounded-xl flex items-center justify-center gap-1.5 transition-all outline-none ${
                            selectedGateway === 'paypal' 
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950/40 dark:text-indigo-400' 
                              : 'border-slate-150 text-slate-400 bg-transparent hover:bg-slate-50/50'
                          }`}
                        >
                          💳 PayPal / Carte Bleue
                        </button>

                      </div>
                    </div>

                    {/* GATEWAY-SPECIFIC FIELDS */}

                    {selectedGateway === 'fedapay' ? (
                      <div className="space-y-3 p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-850">
                        <span className="text-[9px] font-mono tracking-widest text-emerald-500 font-bold uppercase block mb-1">Passerelle FedaPay Afrique de l'Ouest</span>
                        
                        <div className="space-y-1">
                          <label className="font-bold text-gray-700 dark:text-zinc-300">Saisissez votre numéro de Mobile Money *</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ex: +229 97 00 00 00"
                            value={fedaPayPhone}
                            onChange={(e) => setFedaPayPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 text-slate-800 rounded-lg border text-sm font-mono tracking-wider dark:text-zinc-100"
                          />
                        </div>

                        <p className="text-[10px] text-gray-400 leading-snug">
                          Marques éligibles : <strong>MTN Mobile Money, Moov Flooz, Orange Money, Wave Pay</strong>.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-150 dark:border-zinc-850">
                        <span className="text-[9px] font-mono tracking-widest text-indigo-500 font-bold uppercase block mb-1">Passerelle Paypal International SECURE</span>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          La transaction s'ouvrira en une popup cryptée SSL. Facturé mensuellement en toute transparence, sans engagement.
                        </p>
                      </div>
                    )}

                    {paymentError && (
                      <div className="p-3 bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40 rounded-xl text-[11px] leading-relaxed">
                        ⚠️ {paymentError}
                      </div>
                    )}

                    {/* Trigger upgrade */}
                    {!fedaPayCheckoutUrl && (
                      <button
                        id="pricing-btn-pay-modal"
                        type="submit"
                        disabled={isPaying}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        {isPaying ? (
                          <>
                            <Cpu className="w-4 h-4 animate-spin" strokeWidth={2.5} /> Traitement de l'abonnement...
                          </>
                        ) : (
                          <>Valider et Activer la formule ({upgradeModalPlan === 'Starter Plan' ? '9.00' : upgradeModalPlan === 'Pro Plan' ? '29.00' : '59.00'} €/Mo)</>
                        )}
                      </button>
                    )}

                    {isPaying && (
                      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center font-mono text-[10px] text-zinc-400 space-y-2">
                        <div>🔍 ETAPE : {paymentStep}</div>
                      </div>
                    )}

                    {fedaPayCheckoutUrl && (
                      <div className="pt-2 space-y-3">
                        <a
                          href={fedaPayCheckoutUrl}
                          target="_top"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 transition-all text-center block"
                        >
                          🚀 Ouvrir le guichet FedaPay (Mobile Money) XOF
                        </a>
                        <button
                          type="button"
                          onClick={verifyFedaPayStatus}
                          className="w-full py-2.5 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-850 text-slate-800 dark:text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                        >
                          🔄 Vérifier le statut de mon paiement
                        </button>
                        <p className="text-[10px] text-slate-400 text-center leading-snug">
                          Une fois le paiement effectué sur votre téléphone, cliquez sur <strong>Vérifier le statut</strong> ci-dessus pour activer vos privilèges premium.
                        </p>
                      </div>
                    )}

                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4 animate-fade-in text-slate-800 dark:text-zinc-200">
                    <div className="w-12 h-12 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 mx-auto rounded-full flex items-center justify-center animate-bounce">
                      ✓
                    </div>
                    
                    <div>
                      <p className="text-sm font-extrabold text-green-600 uppercase tracking-widest">TRANSACTION VALIDÉE ET APPROUVÉE</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto text-center leading-relaxed">
                        Félicitations ! Les barrières de quotas sont levées. Vous êtes désormais sur le module de redirection PRO SocialBoost.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserRole('creator');
                        setCurrentTab('creator-dashboard');
                        setUpgradeModalPlan(null);
                        setPaymentSuccess(false);
                      }}
                      className="w-full py-2.5 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-semibold hover:bg-slate-800 dark:hover:bg-zinc-200 cursor-pointer"
                    >
                      Aller sur votre nouveau Tableau de bord Pro
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
