import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  HelpCircle, 
  Award, 
  DollarSign, 
  Layers, 
  Sparkles, 
  QrCode, 
  Bell, 
  Copy, 
  ExternalLink, 
  Plus, 
  Zap,
  Check,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Campaign, LeaderboardUser } from '../types';
import { LEADERBOARD } from '../mockData';

interface DashboardProps {
  campaigns: Campaign[];
  setCurrentTab: (tab: string) => void;
  userPoints: number;
  addPoints: (pts: number) => void;
  setUpgradeModalPlan: (plan: string | null) => void;
}

export default function Dashboard({ 
  campaigns, 
  setCurrentTab, 
  userPoints, 
  addPoints,
  setUpgradeModalPlan 
}: DashboardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const totalVisitors = campaigns.reduce((acc, c) => acc + c.participantsCount * 1.5, 0) + 214;
  const totalConversions = campaigns.reduce((acc, c) => acc + c.participantsCount, 0);
  const conversionRate = totalVisitors > 0 ? ((totalConversions / totalVisitors) * 100).toFixed(1) : '0';
  const pointsToNextBadge = Math.max(0, 3000 - userPoints);
  const progressPercent = Math.min(100, Math.round((userPoints / 3000) * 100));

  const copyCampaignLink = (id: string) => {
    const url = `${window.location.origin}/#campaign-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mock revenue calculation
  const mockRevenue = campaigns.length * 24.50;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-100">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
              ABONNÉ PRO PLAN (ACTIF)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ravi de vous revoir, Créateur !
          </h2>
          <p className="text-sm text-blue-100/90 mt-1">
            Vos campagnes de redirection ont généré <strong className="text-white">+{totalConversions} abonnés qualifiés</strong> ce mois-ci.
          </p>
        </div>
        
        <button
          id="dash-btn-create"
          onClick={() => setCurrentTab('create-campaign')}
          className="bg-white text-blue-700 hover:bg-slate-50 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-sm flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nouvelle Campagne
        </button>
      </div>

      {/* Grid Indicators KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Campagnes Actives</span>
            <span className="p-2 bg-blue-50 dark:bg-zinc-950 text-blue-600 rounded-lg">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
              {campaigns.length}
            </h3>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
              Sur {campaigns.length} disponibles dans votre bibliothèque
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Visiteurs Uniques</span>
            <span className="p-2 bg-violet-50 dark:bg-zinc-950 text-violet-600 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
              {Math.round(totalVisitors)}
            </h3>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
              Générés de vos bio-sociales & QR codes
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Conversions Validées IA</span>
            <span className="p-2 bg-emerald-50 dark:bg-zinc-950 text-emerald-600 rounded-lg">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
              {totalConversions}
            </h3>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Taux: {conversionRate}%
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Valeur Générée</span>
            <span className="p-2 bg-amber-50 dark:bg-zinc-950 text-amber-500 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
              {mockRevenue.toFixed(2)} €
            </h3>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
              Économie estimée vs publicités payantes CP
            </p>
          </div>
        </div>

      </div>

      {/* Main Charts & Gamification progress split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Dynamic Analytics Visual Sparkline (Left & Middle spanning) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
            <div>
              <h3 className="text-sm font-bold">Performances du Trafic Direct</h3>
              <p className="text-[10px] text-gray-400">Courbe journalière de croissances cumulées (10 derniers jours)</p>
            </div>
            <select className="px-2.5 py-1 text-xs border rounded bg-slate-50 text-slate-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>

          {/* SVG Vector Analytics Line Graph */}
          <div className="relative pt-4 h-64 flex flex-col justify-between">
            <svg viewBox="0 0 500 200" className="w-full h-48 text-indigo-500 overflow-visible">
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(156,163,175,0.1)" strokeDasharray="3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(156,163,175,0.1)" strokeDasharray="3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(156,163,175,0.1)" strokeDasharray="3" />
              
              {/* Chart Line Path */}
              <path 
                d="M 0,160 L 50,140 Q 75,120 100,105 T 150,110 T 200,80 T 250,90 T 300,55 T 350,45 T 400,25 T 450,15 T 500,10" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="20" 
                className="opacity-15"
              />
              <path 
                d="M 0,160 L 50,140 Q 75,120 100,105 T 150,110 T 200,80 T 250,90 T 300,55 T 350,45 T 400,25 T 450,15 T 500,10" 
                fill="none" 
                stroke="rgb(99, 102, 241)" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />

              {/* Glowing Interactive Node points */}
              <circle cx="200" cy="80" r="5" fill="rgb(99,102,241)" stroke="white" strokeWidth="2" className="animate-pulse" />
              <circle cx="400" cy="25" r="5" fill="rgb(99,102,241)" stroke="white" strokeWidth="2" />
              <circle cx="500" cy="10" r="6" fill="rgb(139, 92, 246)" stroke="white" strokeWidth="2.5" />
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-2 pt-2 border-t border-slate-50 dark:border-zinc-850">
              <span>26 Mai</span>
              <span>28 Mai</span>
              <span>30 Mai</span>
              <span>01 Juin</span>
              <span>03 Juin</span>
              <span>Aujourd'hui (05 Juin)</span>
            </div>
          </div>
        </div>

        {/* Gamification Indicator Progress Card (Right) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3">
            <h3 className="text-sm font-bold">Votre Niveau Fidélité</h3>
            <span className="text-[10px] bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-305 font-bold px-2 py-0.5 rounded-full">
              Gold Tier
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-violet-50/50 dark:bg-zinc-950/40 rounded-xl relative overflow-hidden text-gray-850 dark:text-zinc-200">
              <Award className="w-12 h-12 text-amber-500 fill-amber-400 mx-auto mb-2 animate-bounce animate-duration-[3s]" />
              <p className="text-xs font-bold text-gray-800 dark:text-zinc-200">Niveau: Partageur Fou ⚡</p>
              <p className="text-lg font-mono font-extrabold text-indigo-700 dark:text-indigo-400 mt-1">{userPoints} points</p>
            </div>

            {/* Progression Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-400">Objectif: Génie d\'Audience 🌟</span>
                <span className="font-semibold text-indigo-650 dark:text-indigo-400">{userPoints} / 3000 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-violet-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Plus que <strong className="font-mono">{pointsToNextBadge} points</strong> pour doubler vos quotas d'exports CSV !
              </p>
            </div>

            {/* Add point booster button */}
            <button
              id="dash-btn-points-booster"
              onClick={() => {
                addPoints(250);
              }}
              className="text-[11px] w-full py-2 border border-dashed border-violet-300 text-violet-700 bg-violet-50/20 hover:bg-violet-50 rounded-lg text-center transition-all flex items-center justify-center gap-1 cursor-pointer font-semibold dark:border-violet-900/60 dark:text-violet-300 dark:hover:bg-violet-950/40"
            >
              🚀 Simuler une conversion (+250 points)
            </button>
          </div>
        </div>

      </div>

      {/* Campaigns list & Platform subscription selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table of active user campaigns (Left & middle spanning) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Aperçu rapide de vos Campagnes Actives</h3>
            <button 
              onClick={() => setCurrentTab('creator-campaigns')} 
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Gérer tout ({campaigns.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                  <th className="py-2">Campagne</th>
                  <th className="py-2">Réseau</th>
                  <th className="py-2">Cadeau</th>
                  <th className="py-2">Redirections</th>
                  <th className="py-2">Règles</th>
                  <th className="py-2 text-right">Lien direct</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850 text-xs">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Aucune campagne active. Cliquez sur "Nouvelle Campagne" pour commencer.
                    </td>
                  </tr>
                ) : (
                  campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-850/30">
                      <td className="py-3 font-semibold text-slate-800 dark:text-zinc-200">
                        {camp.title}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-350 uppercase">
                          {camp.platform}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 dark:text-zinc-400">
                        {camp.rewardTitle}
                      </td>
                      <td className="py-3 font-mono font-bold text-slate-750 dark:text-zinc-300">
                        {camp.participantsCount}
                      </td>
                      <td className="py-3 text-[11px] text-indigo-500 font-medium">
                        {camp.actionType === 'follow' ? 'Abonnement' : camp.actionType === 'subscribe' ? 'S’abonner' : 'Partager'}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          id={`dash-copy-btn-${camp.id}`}
                          onClick={() => copyCampaignLink(camp.id)}
                          className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                          title="Copier le lien public"
                        >
                          {copiedId === camp.id ? (
                            <span className="text-[10px] text-green-500 font-bold">Copié !</span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Leaderboard widgets (Right column) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="border-b border-slate-50 dark:border-zinc-850 pb-3">
            <h3 className="text-sm font-bold">Classement des Créateurs</h3>
            <p className="text-[10px] text-gray-400">Palmarès communautaire de la saison 2026</p>
          </div>

          <div className="space-y-3">
            {LEADERBOARD.map((user, idx) => (
              <div key={user.rank} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-855 text-xs transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center font-bold font-mono ${idx < 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                    #{user.rank}
                  </span>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[9px] text-indigo-500">{user.badge}</p>
                  </div>
                </div>
                <div className="text-right font-mono font-semibold">
                  <p className="text-slate-800 dark:text-zinc-200">{user.points} pts</p>
                  <p className="text-[9px] text-slate-400">{user.contributions} campagne{user.contributions > 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Marketplace redirection panel */}
      <div className="p-6 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-sm font-bold">Explorer d’autres campagnes de croissance ?</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Rejoignez-les et accumulez des points en accomplissant des actions pour débloquer de superbes ressources.
          </p>
        </div>
        <button 
          onClick={() => setCurrentTab('marketplace')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer inline-flex items-center gap-1"
        >
          Voir la Marketplace <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
