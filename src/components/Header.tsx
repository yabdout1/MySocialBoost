import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  User, 
  ShieldAlert, 
  Cpu, 
  LogOut, 
  Check, 
  Briefcase, 
  Layers, 
  MessageSquare,
  Award
} from 'lucide-react';
import { AlertNotification } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'visitor' | 'creator' | 'admin';
  setUserRole: (role: 'visitor' | 'creator' | 'admin') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  userPoints: number;
  notifications: AlertNotification[];
  clearNotifications: () => void;
  setAuthModal: (open: boolean) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  isDarkMode,
  setIsDarkMode,
  userPoints,
  notifications,
  clearNotifications,
  setAuthModal
}: HeaderProps) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getBadgeName = (pts: number) => {
    if (pts >= 3000) return 'Génie d\'Audience 🌟';
    if (pts >= 1500) return 'Partageur Fou ⚡';
    if (pts >= 500) return 'Initié d\'Or ⭐';
    return 'Novice Social 🚀';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 bg-white/80 border-gray-100 text-gray-900 dark:bg-zinc-950/80 dark:border-zinc-800 dark:text-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 shadow-md shadow-violet-500/20 text-white">
              <Sparkles className="w-5.5 h-5.5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-950 animate-ping"></span>
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                SocialBoost
              </span>
              <span className="hidden sm:block text-[10px] font-mono tracking-wider uppercase text-gray-400 dark:text-zinc-500 leading-none">
                GROWTH PLATFORM
              </span>
            </div>
          </div>

          {/* Core Navigation - Context dependent */}
          <nav className="hidden md:flex items-center gap-1">
            {userRole === 'visitor' ? (
              <>
                <button
                  id="nav-home"
                  onClick={() => setCurrentTab('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'home' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Accueil
                </button>
                <button
                  id="nav-marketplace"
                  onClick={() => setCurrentTab('marketplace')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'marketplace' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Marketplace Securisée
                </button>
                <button
                  id="nav-pricing"
                  onClick={() => setCurrentTab('pricing')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'pricing' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Tarifs SaaS
                </button>
                <button
                  id="nav-blog"
                  onClick={() => setCurrentTab('blog')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'blog' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Blog
                </button>
                <button
                  id="nav-help"
                  onClick={() => setCurrentTab('help')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'help' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Aide
                </button>
              </>
            ) : userRole === 'creator' ? (
              <>
                <button
                  id="nav-creator-dashboard"
                  onClick={() => setCurrentTab('creator-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'creator-dashboard' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Tableau de bord
                </button>
                <button
                  id="nav-creator-campaigns"
                  onClick={() => setCurrentTab('creator-campaigns')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'creator-campaigns' || currentTab === 'create-campaign'
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Mes Campagnes
                </button>
                <button
                  id="nav-rewards-library"
                  onClick={() => setCurrentTab('rewards-library')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'rewards-library' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Bibliothèque de Cadeaux
                </button>
                <button
                  id="nav-marketplace-cr"
                  onClick={() => setCurrentTab('marketplace')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'marketplace' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Explorer les Campagnes
                </button>
                <button
                  id="nav-affiliate-cr"
                  onClick={() => setCurrentTab('affiliation')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'affiliation' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Affiliation
                </button>
              </>
            ) : (
              <>
                <button
                  id="nav-admin-dashboard"
                  onClick={() => setCurrentTab('admin-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'admin-dashboard' 
                      ? 'bg-violet-50 text-violet-600 dark:bg-zinc-900 dark:text-violet-400 font-semibold' 
                      : 'text-gray-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-zinc-250'
                  }`}
                >
                  Console de Modération AI
                </button>
                <button
                  id="nav-marketplace-ad"
                  onClick={() => setCurrentTab('marketplace')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentTab === 'marketplace' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-zinc-900 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Voir la Marketplace
                </button>
                <button
                  id="nav-help-ad"
                  onClick={() => setCurrentTab('help')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Centre d'aide
                </button>
              </>
            )}
          </nav>

          {/* Quick Actions Panel */}
          <div className="flex items-center gap-3">
            
            {/* Gamification Indicator */}
            {userRole !== 'admin' && (
              <div 
                onClick={() => setCurrentTab('marketplace')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-100 bg-violet-50/50 hover:bg-violet-50 text-violet-700 cursor-pointer transition-all dark:border-violet-900/30 dark:bg-violet-950/20 dark:text-violet-300 dark:hover:bg-violet-950/40"
                title="Vos points d'engagement SocialBoost"
              >
                <Award className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span className="text-xs font-bold font-mono text-violet-800 dark:text-violet-300">
                  {userPoints} pts
                </span>
                <span className="hidden md:inline text-[10px] text-violet-600/80 dark:text-violet-300/80 font-medium">
                  ({getBadgeName(userPoints)})
                </span>
              </div>
            )}

            {/* Persona Simulator Dropdown - Extremely useful for viewing all page features */}
            <div className="relative">
              <button
                id="btn-persona-selector"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-800"
                title="Changer de compte d'évaluation"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-500" />
                <span>Simuler: {userRole === 'visitor' ? 'Visiteur' : userRole === 'creator' ? 'Créateur SaaS' : 'Admin'}</span>
              </button>
              
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-gray-100 py-1 z-50 text-gray-700 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200">
                  <div className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-zinc-800 dark:text-zinc-500">
                    Changer de Personnage
                  </div>
                  
                  <button
                    id="btn-set-role-visitor"
                    onClick={() => {
                      setUserRole('visitor');
                      setCurrentTab('home');
                      setShowRoleMenu(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs text-left hover:bg-gray-50 dark:hover:bg-zinc-850 ${userRole === 'visitor' ? 'font-bold bg-blue-50/50 text-blue-600 dark:bg-zinc-950/40 dark:text-blue-400' : ''}`}
                  >
                    <span>👥 Visiteur (Accéder / Racheter)</span>
                    {userRole === 'visitor' && <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                  </button>
                  
                  <button
                    id="btn-set-role-creator"
                    onClick={() => {
                      setUserRole('creator');
                      setCurrentTab('creator-dashboard');
                      setShowRoleMenu(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs text-left hover:bg-gray-50 dark:hover:bg-zinc-850 ${userRole === 'creator' ? 'font-bold bg-blue-50/50 text-blue-600 dark:bg-zinc-950/40 dark:text-blue-400' : ''}`}
                  >
                    <span>💼 Créateur SaaS (Créer des campagnes)</span>
                    {userRole === 'creator' && <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                  </button>
                  
                  <button
                    id="btn-set-role-admin"
                    onClick={() => {
                      setUserRole('admin');
                      setCurrentTab('admin-dashboard');
                      setShowRoleMenu(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs text-left hover:bg-gray-50 dark:hover:bg-zinc-850 ${userRole === 'admin' ? 'font-bold bg-violet-50/50 text-violet-600 dark:bg-zinc-950/40 dark:text-violet-400' : ''}`}
                  >
                    <span>🛡️ Administrateur SocialBoost</span>
                    {userRole === 'admin' && <Check className="w-3 h-3 text-violet-600 dark:text-violet-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Button */}
            <button
              id="btn-toggle-theme"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-500 dark:text-zinc-400 transition-colors"
              title="Changer de thème"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notifications-bell"
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-500 dark:text-zinc-400 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] flex items-center justify-center text-white font-bold leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white border border-gray-100 py-1.5 z-50 text-gray-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-50 dark:border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={() => {
                          clearNotifications();
                          setShowNotifMenu(false);
                        }} 
                        className="text-[10px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Tout marquer lu
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-gray-400 dark:text-zinc-500">
                        Aucune nouvelle notification
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notif) => (
                        <div key={notif.id} className="px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50/50 last:border-0 dark:hover:bg-zinc-850 dark:border-zinc-800/50 text-xs">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-gray-900 dark:text-zinc-100">{notif.title}</span>
                            <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-gray-500 dark:text-zinc-400 leading-snug">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sign in button for simulator / login simulation button */}
            {userRole === 'visitor' ? (
              <button
                id="btn-login"
                onClick={() => setAuthModal(true)}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-sm transition-all"
              >
                Connexion
              </button>
            ) : (
              <button
                id="btn-logout"
                onClick={() => {
                  setUserRole('visitor');
                  setCurrentTab('home');
                }}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg dark:hover:bg-rose-950/20 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
