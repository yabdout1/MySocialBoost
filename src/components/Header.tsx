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
import { useLanguage } from '../context/LanguageContext';

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
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { language, setLanguage, t, languages } = useLanguage();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getBadgeName = (pts: number) => {
    if (pts >= 3000) return language === 'en' ? 'Audience Genius 🌟' : language === 'es' ? 'Genio de la Audiencia 🌟' : 'Génie d\'Audience 🌟';
    if (pts >= 1500) return language === 'en' ? 'Crazy Sharer ⚡' : language === 'es' ? 'Compartidor Loco ⚡' : 'Partageur Fou ⚡';
    if (pts >= 500) return language === 'en' ? 'Golden Initiate ⭐' : language === 'es' ? 'Iniciado de Oro ⭐' : 'Initié d\'Or ⭐';
    return language === 'en' ? 'Social Novice 🚀' : language === 'es' ? 'Novicio Social 🚀' : 'Novice Social 🚀';
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
                  {t.navHome}
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
                  {t.navMarketplace}
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
                  {t.navPricing}
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
                  {t.navBlog}
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
                  {t.navHelp}
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
                  {t.navDashboard}
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
                  {t.navMyCampaigns}
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
                  {t.navGiftsLibrary}
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
                  {t.navExploreCampaigns}
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
                  {t.navAffiliation}
                </button>
                <button
                  id="nav-logout-cr"
                  onClick={() => {
                    setUserRole('visitor');
                    setCurrentTab('home');
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-all text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-300"
                >
                  {t.logout}
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
                  {t.navAdminPanel}
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
                  {t.navExploreCampaigns}
                </button>
                <button
                  id="nav-help-ad"
                  onClick={() => setCurrentTab('help')}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  {t.navHelp}
                </button>
                <button
                  id="nav-logout-ad"
                  onClick={() => {
                    setUserRole('visitor');
                    setCurrentTab('home');
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-all text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-300"
                >
                  {t.logout}
                </button>
              </>
            )}
          </nav>

          {/* Quick Actions Panel */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Gamification Indicator */}
            {userRole !== 'admin' && (
              <div 
                onClick={() => {
                  setCurrentTab('marketplace');
                  setShowProfileMenu(false);
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-violet-100 bg-violet-50/50 hover:bg-violet-50 text-violet-700 cursor-pointer transition-all dark:border-violet-900/30 dark:bg-violet-950/20 dark:text-violet-300 dark:hover:bg-violet-950/40"
                title={language === 'en' ? 'Your SocialBoost engagement points' : language === 'es' ? 'Tus puntos de participación de SocialBoost' : "Vos points d'engagement SocialBoost"}
              >
                <Award className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-extrabold font-mono text-violet-800 dark:text-violet-200">
                  {userPoints}
                </span>
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notifications-bell"
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  setShowProfileMenu(false);
                  setShowLangMenu(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-500 dark:text-zinc-400 transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] flex items-center justify-center text-white font-bold leading-none animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white border border-gray-100 py-1.5 z-50 text-gray-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 animate-fade-in">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-50 dark:border-zinc-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={() => {
                          clearNotifications();
                          setShowNotifMenu(false);
                        }} 
                        className="text-[10px] font-semibold text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
                      >
                        {language === 'en' ? 'Mark all as read' : language === 'es' ? 'Marcar todo como leído' : 'Tout marquer lu'}
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-gray-400 dark:text-zinc-500">
                        {language === 'en' ? 'No new notifications' : language === 'es' ? 'No hay nuevas notificaciones' : 'Aucune nouvelle notification'}
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

            {/* Unified User Profile & Quick Preferences Dropdown */}
            <div className="relative">
              <button
                id="btn-user-profile-menu"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifMenu(false);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all dark:bg-zinc-900 dark:hover:bg-zinc-850 dark:text-zinc-300 dark:border-zinc-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                title={language === 'en' ? 'Account Preferences' : language === 'es' ? 'Ajustes de Cuenta' : 'Préférences du Compte'}
              >
                {/* Visual Avatar based on User's Active Role */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-sm bg-gradient-to-tr ${
                  userRole === 'visitor' 
                    ? 'from-blue-500 to-sky-500' 
                    : userRole === 'creator'
                    ? 'from-indigo-500 to-violet-500'
                    : 'from-fuchsia-500 to-purple-500'
                }`}>
                  {userRole === 'visitor' ? <User className="w-4 h-4" /> : userRole === 'creator' ? <Briefcase className="w-3.5 h-3.5" /> : <ShieldAlert className="w-4 h-4" />}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-700 dark:text-zinc-300 pr-1 select-none">
                  {userRole === 'visitor' ? t.visitor : userRole === 'creator' ? t.creator : t.admin}
                </span>
                <span className="hidden sm:inline text-[9px] text-slate-400 dark:text-zinc-500 pr-1.5">▼</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl shadow-xl bg-white border border-slate-100 py-3.5 z-50 text-slate-705 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 animate-fade-in divide-y divide-slate-100/80 dark:divide-zinc-800">
                  
                  {/* Section 1: User Profile & Points Status Header */}
                  <div className="px-4 pb-3">
                    <span className="text-[9px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider block uppercase mb-1.5">
                      {language === 'en' ? 'Social Identity Profile' : language === 'es' ? 'Perfil de Identidad' : 'Profil d\'Identité'}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold bg-gradient-to-tr ${
                        userRole === 'visitor' 
                          ? 'from-blue-500 to-sky-500' 
                          : userRole === 'creator'
                          ? 'from-indigo-500 to-violet-500'
                          : 'from-fuchsia-500 to-purple-500'
                      }`}>
                        {userRole === 'visitor' ? <User className="w-4 h-4" /> : userRole === 'creator' ? <Briefcase className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-800 dark:text-zinc-100 leading-none">
                          {userRole === 'visitor' ? t.visitor : userRole === 'creator' ? t.creator : t.admin}
                        </h4>
                        <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold tracking-wide mt-1 block leading-tight">
                          {userRole !== 'admin' ? getBadgeName(userPoints) : (language === 'en' ? 'Full Mod Console' : language === 'es' ? 'Consola Completa' : 'Contrôle Modérateur')}
                        </span>
                      </div>
                    </div>
                  </div>



                  {/* Section 3: Quick Preferences (Theme Switching & Language) */}
                  <div className="px-4 py-3 space-y-2.5">
                    <span className="text-[9px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider block uppercase">
                      ⚙️ {language === 'en' ? 'Quick Preferences' : language === 'es' ? 'Preferencias Rápidas' : 'Préférences de Profil'}
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {/* Theme switcher */}
                      <button
                        id="btn-toggle-theme"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-150 text-xs font-semibold hover:bg-slate-50 transition-colors bg-white text-slate-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
                        title={language === 'en' ? 'Toggle theme' : language === 'es' ? 'Cambiar tema' : 'Changer de thème'}
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                            <span>{language === 'en' ? 'Light' : language === 'es' ? 'Claro' : 'Clair'}</span>
                          </>
                        ) : (
                          <>
                            <Moon className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                            <span>{language === 'en' ? 'Dark' : language === 'es' ? 'Oscuro' : 'Sombre'}</span>
                          </>
                        )}
                      </button>

                      {/* Language selection trigger */}
                      <div className="relative">
                        <button
                          id="btn-language-selector"
                          onClick={() => setShowLangMenu(!showLangMenu)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-150 text-xs font-semibold hover:bg-slate-50 transition-colors bg-white text-slate-700 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-850 cursor-pointer"
                          title="Language / Idioma"
                        >
                          <span className="text-sm leading-none select-none">{languages.find(l => l.code === language)?.flag || '🇫🇷'}</span>
                          <span className="uppercase font-mono text-[10px] tracking-wide">{language}</span>
                          <span className="text-[8px] text-slate-400">▼</span>
                        </button>
                        
                        {showLangMenu && (
                          <div className="absolute top-full right-0 mt-1 w-32 rounded-xl shadow-lg bg-white border border-slate-100 py-1 z-50 text-slate-750 dark:bg-zinc-900 dark:border-zinc-805 dark:text-zinc-200 divide-y divide-slate-50 dark:divide-zinc-800">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                id={`btn-lang-${lang.code}`}
                                onClick={() => {
                                  setLanguage(lang.code);
                                  setShowLangMenu(false);
                                }}
                                className={`flex items-center gap-1.5 w-full px-2.5 py-1.5 text-xs text-left hover:bg-slate-50 dark:hover:bg-zinc-850 cursor-pointer ${language === lang.code ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''}`}
                              >
                                <span className="text-xs">{lang.flag}</span>
                                <span className="font-semibold">{lang.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Auth triggers login/logout */}
                  <div className="px-3 pt-3.5">
                    {userRole === 'visitor' ? (
                      <button
                        id="btn-login"
                        onClick={() => {
                          setAuthModal(true);
                          setShowProfileMenu(false);
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-sm transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Sign In / Connect' : language === 'es' ? 'Iniciar Sesión' : 'Se connecter'}</span>
                      </button>
                    ) : (
                      <button
                        id="btn-logout"
                        onClick={() => {
                          setUserRole('visitor');
                          setCurrentTab('home');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-red-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all dark:text-rose-450 dark:hover:bg-rose-950/20 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{language === 'en' ? 'Log Out Account' : language === 'es' ? 'Cerrar mi Cuenta' : 'Déconnecter la Session'}</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
