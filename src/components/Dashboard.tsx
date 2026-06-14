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
  ArrowRight,
  BarChart2,
  PieChart as PieIcon,
  Activity,
  Flame,
  X,
  Printer,
  Download,
  Sliders,
  Palette,
  RefreshCw
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  BarChart, 
  Bar, 
  Cell,
  LineChart, 
  Line,
  PieChart as RechartsPieChart,
  Pie
} from 'recharts';
import { Campaign, LeaderboardUser } from '../types';
import { LEADERBOARD } from '../mockData';
import { useLanguage } from '../context/LanguageContext';
import { Tooltip as MyTooltip } from './Tooltip';

interface DashboardProps {
  campaigns: Campaign[];
  setCurrentTab: (tab: string) => void;
  userPoints: number;
  addPoints: (pts: number) => void;
  setUpgradeModalPlan: (plan: string | null) => void;
  leaderboard?: LeaderboardUser[];
  isLoading?: boolean;
}

export default function Dashboard({ 
  campaigns, 
  setCurrentTab, 
  userPoints, 
  addPoints,
  setUpgradeModalPlan,
  leaderboard = LEADERBOARD,
  isLoading
}: DashboardProps) {
  const { t, language } = useLanguage();
  const [localLoading, setLocalLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTooltipText = (action: 'qr' | 'copy') => {
    const dict = {
      qr: {
        fr: "QR Code intelligent & partage de liens",
        en: "Smart QR Code & link sharing",
        es: "Código QR inteligente y compartir enlaces"
      },
      copy: {
        fr: "Copier le lien public de de capture",
        en: "Copy public opt-in link",
        es: "Copiar enlace público de captura"
      }
    };
    return dict[action][language] || dict[action]['en'];
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
      setIsRefreshing(false);
    }, 750);
  };

  const loading = isLoading !== undefined ? isLoading : localLoading;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPlanPeriod, setSelectedPlanPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [trendsMode, setTrendsMode] = useState<'daily' | 'hourly'>('daily');
  const [performanceMetric, setPerformanceMetric] = useState<'conversions' | 'fillRate'>('conversions');
  const [pointsView, setPointsView] = useState<'donut' | 'tier'>('donut');

  // QR Code Customizer parameters
  const [selectedShareCamp, setSelectedShareCamp] = useState<Campaign | null>(null);
  const [qrFgColor, setQrFgColor] = useState('#4f46e5');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [qrLevel, setQrLevel] = useState<'L' | 'M' | 'Q' | 'H'>('Q');
  const [qrIncludeMargin, setQrIncludeMargin] = useState(true);
  const [qrLogoOption, setQrLogoOption] = useState<'none' | 'platform' | 'star'>('platform');

  const totalVisitors = campaigns.reduce((acc, c) => acc + c.participantsCount * 1.5, 0) + 214;
  const totalConversions = campaigns.reduce((acc, c) => acc + c.participantsCount, 0);
  const conversionRate = totalVisitors > 0 ? ((totalConversions / totalVisitors) * 100).toFixed(1) : '0';
  const pointsToNextBadge = Math.max(0, 3000 - userPoints);
  const progressPercent = Math.min(100, Math.round((userPoints / 3000) * 100));

  // Generate data for the last 7 days of campaign participants
  const chartData = React.useMemo(() => {
    const data = [];
    const now = new Date();
    
    // Distribution vectors matching a typical weekly curve
    const percentageSplit = [0.08, 0.11, 0.13, 0.12, 0.16, 0.18, 0.22];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', { day: '2-digit', month: 'short' });
      
      // Compute participants for this specific day based on total Conversions
      const dailyConversionsFactor = percentageSplit[6 - i];
      const directParticipants = Math.max(1, Math.round(totalConversions * dailyConversionsFactor));
      // Estimate visitor flow for conversions on that day
      const visitorsCount = Math.round(directParticipants * 1.5 + (i * 2) + 3);
      
      data.push({
        date: label,
        'Participants': directParticipants,
        'Visiteurs': visitorsCount,
      });
    }
    return data;
  }, [totalConversions]);

  const engagementTrendsData = React.useMemo(() => {
    if (trendsMode === 'daily') {
      const data = [];
      const now = new Date();
      const dailySplits = [0.08, 0.12, 0.15, 0.11, 0.18, 0.16, 0.20];
      
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const dateLabel = d.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US', { day: '2-digit', month: 'short' });
        
        const conversions = Math.max(2, Math.round(totalConversions * dailySplits[6 - i]));
        const views = Math.round(conversions * 1.5 + (i * 3) + 5);
        const rewards = conversions * 150;
        
        data.push({
          label: dateLabel,
          Conversions: conversions,
          'Page Views': views,
          'Rewards (pts)': rewards,
        });
      }
      return data;
    } else {
      const hourlyBlocks = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
      const hourlySplits = [0.05, 0.10, 0.25, 0.30, 0.20, 0.10];
      return hourlyBlocks.map((hour, index) => {
        const factor = hourlySplits[index];
        const conversions = Math.max(1, Math.round(totalConversions * factor * 0.4));
        const views = Math.round(conversions * 2.2 + 8);
        const rewards = conversions * 150;
        return {
          label: hour,
          Conversions: conversions,
          'Page Views': views,
          'Rewards (pts)': rewards,
        };
      });
    }
  }, [totalConversions, trendsMode, language]);

  const campaignPerformanceData = React.useMemo(() => {
    if (!campaigns || campaigns.length === 0) return [];
    return campaigns.map(c => {
      const max = c.maxParticipants || 1000;
      const current = c.participantsCount;
      const fillRate = Math.round((current / max) * 100);
      return {
        name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
        fullName: c.title,
        Conversions: current,
        Goal: max,
        'Fill Rate (%)': fillRate,
        platform: c.platform || 'instagram'
      };
    });
  }, [campaigns]);

  const pointsPieData = React.useMemo(() => {
    if (!leaderboard || leaderboard.length === 0) return [];
    
    if (pointsView === 'donut') {
      return leaderboard.slice(0, 5).map((user, index) => ({
        name: user.name,
        value: user.points,
        contributions: user.contributions,
        badge: user.badge,
        color: ['#6366f1', '#8b5cf6', '#d946ef', '#f59e0b', '#10b981'][index % 5]
      }));
    } else {
      return [
        { name: language === 'en' ? 'Legendary Tier' : language === 'es' ? 'Nivel de Leyenda' : 'Rang Légendes 👑', value: 8450 + 7200, color: '#f59e0b' },
        { name: language === 'en' ? 'Expert Tier' : language === 'es' ? 'Nivel Experto' : 'Rang Experts ⚡', value: 6950 + 5800, color: '#8b5cf6' },
        { name: language === 'en' ? 'Initiated/Gold Tier' : language === 'es' ? 'Nivel Oro' : 'Rang Initiés ⭐', value: 5120, color: '#10b981' }
      ];
    }
  }, [leaderboard, pointsView, language]);

  const totalDistributedPoints = React.useMemo(() => {
    return leaderboard ? leaderboard.slice(0, 5).reduce((acc, u) => acc + u.points, 0) : 0;
  }, [leaderboard]);

  const copyCampaignLink = (id: string) => {
    const url = `${window.location.origin}/#campaign-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('dashboard-qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    const cleanTitle = selectedShareCamp ? selectedShareCamp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'campaign';
    a.download = `qrcode-${cleanTitle}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Mock revenue calculation
  const mockRevenue = campaigns.length * 24.50;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-100">
      
      {/* Top Banner Greeting */}
      {loading && !isRefreshing ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-200 to-slate-250 dark:from-zinc-800 dark:to-zinc-800/80 rounded-3xl text-white shadow-xs relative overflow-hidden animate-pulse">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-3 w-full max-w-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 bg-slate-300 dark:bg-zinc-700 rounded-full w-24"></span>
            </div>
            <div className="h-7 bg-slate-350 dark:bg-zinc-700/80 rounded-lg w-5/6"></div>
            <div className="h-3.5 bg-slate-350/50 dark:bg-zinc-700/50 rounded w-1/2"></div>
          </div>
          <div className="h-10 bg-slate-300 dark:bg-zinc-700 rounded-xl w-32 shrink-0"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
                {t.dashActivePlan}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.dashGreeting}
            </h2>
            <p className="text-sm text-blue-100/90 mt-1">
              {t.dashSub.replace('{count}', totalConversions.toString())}
            </p>
          </div>
          
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={handleManualRefresh}
              className={`p-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all outline-none cursor-pointer ${isRefreshing ? 'opacity-80' : ''}`}
              title={language === 'en' ? 'Refresh' : language === 'es' ? 'Actualizar' : 'Rafraîchir'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {language === 'en' ? 'Refresh' : language === 'es' ? 'Actualizar' : 'Rafraîchir'}
            </button>

            <button
              id="dash-btn-create"
              onClick={() => setCurrentTab('create-campaign')}
              className="bg-white text-blue-700 hover:bg-slate-50 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> {t.dashNewCampaign}
            </button>
          </div>
        </div>
      )}

      {/* Grid Indicators KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-3.5 bg-slate-200 dark:bg-zinc-800 rounded w-28"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-150 dark:bg-zinc-850"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6.5 bg-slate-200 dark:bg-zinc-800 rounded w-16"></div>
                <div className="h-3 bg-slate-150 dark:bg-zinc-850/70 rounded w-36"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            {/* KPI 1 */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">{t.dashActiveCampaigns}</span>
                <span className="p-2 bg-blue-50 dark:bg-zinc-950 text-blue-600 rounded-lg">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {campaigns.length}
                </h3>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
                  {t.dashCampaignsDetail.replace('{count}', campaigns.length.toString())}
                </p>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">{t.dashUniqueVisitors}</span>
                <span className="p-2 bg-violet-50 dark:bg-zinc-950 text-violet-600 rounded-lg">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {Math.round(totalVisitors)}
                </h3>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
                  {t.dashVisitorsDetail}
                </p>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">{t.dashConversions}</span>
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
                  {t.dashConversionsDetail.replace('{count}', conversionRate)}
                </p>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">{t.dashValueGenerated}</span>
                <span className="p-2 bg-amber-50 dark:bg-zinc-950 text-amber-500 rounded-lg">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {mockRevenue.toFixed(2)} €
                </h3>
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
                  {t.dashValueDetail}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Charts & Gamification progress split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Dynamic Analytics Visual Recharts Area Chart (Left & Middle spanning) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5 font-sans">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                {t.dashPerformanceTitle}
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">{t.dashPerformanceSub}</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-300">
              {t.dashPerformancePill}
            </span>
          </div>
          
          {/* Recharts Component Container */}
          <div className="h-64 pt-2">
            {loading ? (
              <div className="h-full flex flex-col justify-between animate-pulse px-2 py-4">
                {/* Fake grid lines and pulsing values */}
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="h-3 bg-slate-150 dark:bg-zinc-800 rounded w-8"></span>
                      <span className="h-px bg-slate-100 dark:bg-zinc-800/40 w-full mx-4"></span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                  {['01 Jun', '02 Jun', '03 Jun', '04 Jun', '05 Jun', '06 Jun', '07 Jun'].map((item, idx) => (
                    <span key={idx} className="h-3 bg-slate-150 dark:bg-zinc-800 rounded w-10"></span>
                  ))}
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorVisiteurs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.08)" />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.95)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#f3f4f6',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    itemStyle={{ color: '#e5e7eb' }}
                    labelStyle={{ fontWeight: 'bold', color: '#a5b4fc', marginBottom: '4px' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 500 }}
                  />
                  <Area 
                    name={t.dashAnalyticsParticipants}
                    type="monotone" 
                    dataKey="Participants" 
                    stroke="#6366f1" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorParticipants)" 
                  />
                  <Area 
                    name={t.dashAnalyticsVisitors}
                    type="monotone" 
                    dataKey="Visiteurs" 
                    stroke="#8b5cf6" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorVisiteurs)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Gamification Indicator Progress Card (Right) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-5">
          {loading ? (
            <div className="space-y-5 animate-pulse">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3">
                <span className="h-4 bg-slate-205 dark:bg-zinc-850 rounded w-28"></span>
                <span className="h-5 bg-slate-150 dark:bg-zinc-850 rounded-full w-16"></span>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6 bg-slate-50/50 dark:bg-zinc-950/40 rounded-xl flex flex-col items-center">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-zinc-850 rounded-full mb-3"></div>
                  <span className="h-3.5 bg-slate-200 dark:bg-zinc-850 rounded w-24 mb-1"></span>
                  <span className="h-6 bg-slate-150 dark:bg-zinc-850 rounded w-16 mt-1"></span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="h-3 bg-slate-205 dark:bg-zinc-850 rounded w-12"></span>
                    <span className="h-3 bg-slate-205 dark:bg-zinc-850 rounded w-20"></span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full"></div>
                  <span className="h-3 bg-slate-150 dark:bg-zinc-850 rounded w-44 mx-auto mt-2"></span>
                </div>
                <div className="h-8.5 bg-slate-150 dark:bg-zinc-850 rounded-lg w-full"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3">
                <h3 className="text-sm font-bold">{t.dashLoyaltyLevel}</h3>
                <span className="text-[10px] bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-305 font-bold px-2 py-0.5 rounded-full">
                  Gold Tier
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-violet-50/50 dark:bg-zinc-950/40 rounded-xl relative overflow-hidden text-gray-850 dark:text-zinc-200">
                  <Award className="w-12 h-12 text-amber-500 fill-amber-400 mx-auto mb-2 animate-bounce animate-duration-[3s]" />
                  <p className="text-xs font-bold text-gray-800 dark:text-zinc-200">{t.dashLevelName}</p>
                  <p className="text-lg font-mono font-extrabold text-indigo-700 dark:text-indigo-400 mt-1">{t.dashPoints.replace('{count}', userPoints.toString())}</p>
                </div>

                {/* Progression Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">{t.dashTarget}</span>
                    <span className="font-semibold text-indigo-650 dark:text-indigo-400">{userPoints} / 3000 pts</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-violet-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">
                    {t.dashTargetDetail.replace('{count}', pointsToNextBadge.toString())}
                  </p>
                </div>


              </div>
            </>
          )}       </div>

      </div>

      {/* Advanced Creator Analytics & Data Visualization Hub */}
      <div id="advanced-analytics-hub" className="space-y-6 pt-4">
        
        {/* Hub Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-850 pb-4">
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2 text-indigo-650 dark:text-indigo-400">
              <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
              {language === 'en' ? 'Advanced Creator Analytics' : language === 'es' ? 'Centro de Análisis del Creador' : "Analyses Avancées du Créateur"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              {language === 'en' ? 'Interactive trends tracking, campaign standings, and audience point distributions' : language === 'es' ? 'Seguimiento de tendencias interactivo, rendimiento de campañas y pool de puntos de la audiencia' : "Suivi des tendances interactives, de la complétion des objectifs et de la répartition des scores"}
            </p>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/40">
            {language === 'en' ? 'Live Analytics' : language === 'es' ? 'Datos en vivo' : 'Statistiques Live'}
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Engagement & Traffic Trends (Line Chart) */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  {language === 'en' ? 'Engagement Trends' : language === 'es' ? 'Tendencias de Participación' : "Tendances de l'Engagement"}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {language === 'en' ? 'Chronological interaction waves' : language === 'es' ? 'Gráfico de interacciones cronológico' : 'Flux chronologiques d\'interactions'}
                </p>
              </div>
              
              {/* Toggle controls */}
              <div className="inline-flex bg-slate-50 dark:bg-zinc-950 p-1 rounded-lg border dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setTrendsMode('daily')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${trendsMode === 'daily' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? '7 Days' : language === 'es' ? '7 Días' : '7 jours'}
                </button>
                <button
                  type="button"
                  onClick={() => setTrendsMode('hourly')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${trendsMode === 'hourly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? 'Hourly' : language === 'es' ? 'Por Hora' : 'Horaire'}
                </button>
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-48 pt-2">
              {loading ? (
                <div className="h-full flex flex-col justify-between pt-1 animate-pulse">
                  <div className="space-y-4 py-2">
                    <div className="h-3 bg-slate-150 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-zinc-800/70 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-150 dark:bg-zinc-800 rounded w-2/3"></div>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-zinc-800 pt-2 text-[10px]">
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day, idx) => (
                      <span key={idx} className="h-3 bg-slate-150 dark:bg-zinc-800 rounded w-8"></span>
                    ))}
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTrendsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.06)" />
                    <XAxis 
                      dataKey="label" 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 9, fontFamily: 'JetBrains Mono' }} 
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 9, fontFamily: 'JetBrains Mono' }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(31, 41, 55, 0.95)',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '12px',
                        fontSize: '11px',
                        color: '#f3f4f6',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      itemStyle={{ color: '#e5e7eb' }}
                    />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px', pt: 8 }} />
                    <Line 
                      name={language === 'en' ? 'Conversions' : language === 'es' ? 'Conversiones' : 'Conversions'} 
                      type="monotone" 
                      dataKey="Conversions" 
                      stroke="#6366f1" 
                      strokeWidth={2.5} 
                      dot={{ strokeWidth: 1.5, r: 2.5 }}
                      activeDot={{ r: 5 }} 
                    />
                    <Line 
                      name={language === 'en' ? 'Page Views' : language === 'es' ? 'Vistas' : 'Vues'} 
                      type="monotone" 
                      dataKey="Page Views" 
                      stroke="#a855f7" 
                      strokeWidth={1.5} 
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
 
          {/* Card 2: Campaign Performance & Target Limits (Bar Chart) */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <BarChart2 className="w-4 h-4 text-violet-500" />
                  {language === 'en' ? 'Campaign Standings' : language === 'es' ? 'Clasificación de Campaña' : 'Performance Campagnes'}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {language === 'en' ? 'Conversions vs limits comparison' : language === 'es' ? 'Comparación de conversiones y límites' : 'Portée par rapport aux quotas'}
                </p>
              </div>
 
              {/* Toggle controls */}
              <div className="inline-flex bg-slate-50 dark:bg-zinc-950 p-1 rounded-lg border dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setPerformanceMetric('conversions')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${performanceMetric === 'conversions' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? 'Count' : language === 'es' ? 'Cantidad' : 'Score'}
                </button>
                <button
                  type="button"
                  onClick={() => setPerformanceMetric('fillRate')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${performanceMetric === 'fillRate' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? 'Fill %' : language === 'es' ? '% Llenado' : 'Remplissage %'}
                </button>
              </div>
            </div>
 
            {/* Bar Chart */}
            <div className="h-48 pt-2">
              {loading ? (
                <div className="h-full flex items-end justify-between px-3 pt-3 animate-pulse">
                  <span className="w-8 bg-slate-150 dark:bg-zinc-800 rounded-t h-1/4"></span>
                  <span className="w-8 bg-slate-200 dark:bg-zinc-850 rounded-t h-1/2"></span>
                  <span className="w-8 bg-slate-150 dark:bg-zinc-800 rounded-t h-3/4"></span>
                  <span className="w-8 bg-slate-200 dark:bg-zinc-850 rounded-t h-2/3"></span>
                  <span className="w-8 bg-slate-150 dark:bg-zinc-800 rounded-t h-1/3"></span>
                </div>
              ) : campaignPerformanceData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-400/80 italic font-sans animate-pulse">
                  {language === 'en' ? 'No active campaigns' : language === 'es' ? 'Sin campañas activas' : 'Aucune campagne active'}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={campaignPerformanceData} 
                    margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.06)" />
                    <XAxis 
                      dataKey="name" 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 8, fontFamily: 'Inter' }} 
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 9, fontFamily: 'JetBrains Mono' }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(31, 41, 55, 0.95)',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '12px',
                        fontSize: '11px',
                        color: '#f3f4f6',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      itemStyle={{ color: '#e5e7eb' }}
                    />
                    <Bar 
                      name={performanceMetric === 'conversions' ? (language === 'en' ? 'Conversions' : language === 'es' ? 'Conversiones' : 'Conversions') : (language === 'en' ? 'Fill Rate %' : language === 'es' ? 'Cumplimiento %' : 'Taux de remplissage %')}
                      dataKey={performanceMetric === 'conversions' ? 'Conversions' : 'Fill Rate (%)'} 
                      radius={[4, 4, 0, 0]}
                    >
                      {campaignPerformanceData.map((entry, index) => {
                        let barColor = '#6366f1';
                        if (entry.platform === 'instagram') barColor = '#d946ef';
                        else if (entry.platform === 'tiktok') barColor = '#f43f5e';
                        else if (entry.platform === 'youtube') barColor = '#ef4444';
                        else if (entry.platform === 'telegram') barColor = '#0ea5e9';
                        else if (entry.platform === 'twitter') barColor = '#64748b';
                        return <Cell key={`cell-${index}`} fill={barColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
 
          {/* Card 3: User Points Distribution (Donut Chart) */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <PieIcon className="w-4 h-4 text-emerald-500" />
                  {language === 'en' ? 'Points Ledger' : language === 'es' ? 'Pool de Puntos' : "Ledger des Points"}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {language === 'en' ? 'Points allocated across tiers' : language === 'es' ? 'Distribución del pozo de recompensa' : 'Distribution des points du leaderboard'}
                </p>
              </div>
 
              {/* Toggle controls */}
              <div className="inline-flex bg-slate-50 dark:bg-zinc-950 p-1 rounded-lg border dark:border-zinc-855">
                <button
                  type="button"
                  onClick={() => setPointsView('donut')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${pointsView === 'donut' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? 'Users' : language === 'es' ? 'Usuarios' : 'Membres'}
                </button>
                <button
                  type="button"
                  onClick={() => setPointsView('tier')}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${pointsView === 'tier' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800'}`}
                >
                  {language === 'en' ? 'Tiers' : language === 'es' ? 'Rangos' : 'Niveaux'}
                </button>
              </div>
            </div>
 
            {/* Donut Chart Container */}
            <div className="relative h-44 flex items-center justify-center">
              {loading ? (
                <div className="w-28 h-28 rounded-full border-8 border-dashed border-slate-200 dark:border-zinc-800 flex items-center justify-center animate-pulse">
                  <div className="flex flex-col items-center">
                    <span className="h-4 bg-slate-200 dark:bg-zinc-850 rounded w-12 mb-1"></span>
                    <span className="h-2.5 bg-slate-150 dark:bg-zinc-850 rounded w-10"></span>
                  </div>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(31, 41, 55, 0.95)',
                          border: '1px solid rgba(75, 85, 99, 0.5)',
                          borderRadius: '12px',
                          fontSize: '11px',
                          color: '#f3f4f6',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        itemStyle={{ color: '#e5e7eb' }}
                      />
                      <Pie
                        data={pointsPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pointsPieData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  
                  {/* Absolute centered label */}
                  <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-sm font-mono font-black text-slate-800 dark:text-zinc-100">
                      {pointsView === 'donut' ? totalDistributedPoints.toLocaleString() : (pointsPieData.reduce((acc, curr) => acc + curr.value, 0)).toLocaleString()}
                    </span>
                    <span className="text-[7.5px] text-slate-400 dark:text-zinc-500 font-bold tracking-wider uppercase font-sans">
                      {language === 'en' ? 'Total Pts' : language === 'es' ? 'Pts Totales' : 'Pts Totaux'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Custom Legend / Value list */}
            <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-50 dark:border-zinc-850">
              {pointsPieData.slice(0, 4).map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-slate-500 dark:text-zinc-400 truncate max-w-[70px]" title={entry.name}>{entry.name}</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-zinc-300 ml-auto">{entry.value}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Campaigns list & Platform subscription selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table of active user campaigns (Left & middle spanning) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{t.dashOverviewTitle}</h3>
            <button 
              onClick={() => setCurrentTab('creator-campaigns')} 
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {t.dashManageAll.replace('{count}', campaigns.length.toString())}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                  <th className="py-2">{t.dashTableCampaign}</th>
                  <th className="py-2">{t.dashTableNetwork}</th>
                  <th className="py-2">{t.dashTableGift}</th>
                  <th className="py-2">{t.dashTableRedirects}</th>
                  <th className="py-2">{t.dashTableRules}</th>
                  <th className="py-2 text-right">{t.dashTableLink}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850 text-xs">
                {loading ? (
                  Array.from({ length: 3 }).map((_, rIdx) => (
                    <tr key={rIdx} className="animate-pulse">
                      <td className="py-3">
                        <div className="h-4 bg-slate-150 dark:bg-zinc-800 rounded w-36"></div>
                      </td>
                      <td className="py-3">
                        <div className="h-3.5 bg-slate-100 dark:bg-zinc-850 rounded w-16"></div>
                      </td>
                      <td className="py-3">
                        <div className="h-3.5 bg-slate-100 dark:bg-zinc-850 rounded w-24"></div>
                      </td>
                      <td className="py-3 font-mono font-bold">
                        <div className="h-4 bg-slate-150 dark:bg-zinc-800 rounded-full w-10"></div>
                      </td>
                      <td className="py-3">
                        <div className="h-3.5 bg-slate-100 dark:bg-zinc-850 rounded w-12"></div>
                      </td>
                      <td className="py-3 text-right">
                        <div className="h-3.5 bg-slate-150 dark:bg-zinc-800 rounded w-8 ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      {t.dashTableEmpty}
                    </td>
                  </tr>
                ) : (
                  campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-855/30">
                      <td className="py-3 font-semibold text-slate-800 dark:text-zinc-200">
                        {camp.title}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 uppercase">
                          {camp.platform}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 dark:text-zinc-400">
                        {camp.rewardTitle}
                      </td>
                      <td className="py-3 font-mono font-bold text-slate-700 dark:text-zinc-300">
                        {camp.participantsCount}
                      </td>
                      <td className="py-3 text-[11px] text-indigo-500 font-medium">
                        {camp.actionType === 'follow' ? t.dashTableActionAbonnement : camp.actionType === 'subscribe' ? t.dashTableActionAbonner : t.dashTableActionPartager}
                      </td>
                      <td className="py-3 text-right flex items-center justify-end gap-1.5 h-full">
                        <MyTooltip content={getTooltipText('qr')} position="top">
                          <button
                            id={`dash-qr-btn-${camp.id}`}
                            onClick={() => setSelectedShareCamp(camp)}
                            className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer flex items-center justify-center"
                            aria-label={getTooltipText('qr')}
                          >
                            <QrCode className="w-3 h-3" />
                          </button>
                        </MyTooltip>
                        
                        <MyTooltip content={getTooltipText('copy')} position="top">
                          <button
                            id={`dash-copy-btn-${camp.id}`}
                            onClick={() => copyCampaignLink(camp.id)}
                            className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer inline-flex items-center justify-center min-h-[22px]"
                            aria-label={getTooltipText('copy')}
                          >
                            {copiedId === camp.id ? (
                              <span className="text-[10px] text-green-500 font-bold px-0.5">{t.dashTableCopied}</span>
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </MyTooltip>
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
            <h3 className="text-sm font-bold">{t.dashLeaderboardTitle}</h3>
            <p className="text-[10px] text-gray-400">{t.dashLeaderboardSub}</p>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user, idx) => (
              <div key={user.rank} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-855 text-xs transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-5 text-center font-bold font-mono ${idx < 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                    #{user.rank}
                  </span>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover animate-duration-[3s]" />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[9px] text-indigo-505">{user.badge}</p>
                  </div>
                </div>
                <div className="text-right font-mono font-semibold">
                  <p className="text-slate-800 dark:text-zinc-200">{user.points} pts</p>
                  <p className="text-[9px] text-slate-400">{user.contributions} {t.dashLeaderboardCamps}{user.contributions > 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Marketplace redirection panel */}
      <div className="p-6 bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="text-sm font-bold">{t.dashExploreCampsTitle}</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {t.dashExploreCampsSub}
          </p>
        </div>
        <button 
          onClick={() => setCurrentTab('marketplace')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer inline-flex items-center gap-1"
        >
          {t.dashSeeMarketplace} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* QR Code and Share Sheet Modal Overlay */}
      {selectedShareCamp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-hidden relative animate-fade-in text-gray-900 dark:text-zinc-150">
            
            {/* Header portion */}
            <div className="border-b border-slate-100 dark:border-zinc-800 p-6 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-955/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-55 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <QrCode className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-800 dark:text-zinc-200">
                    {language === 'en' ? 'Dynamic QR Code Customizer' : language === 'es' ? 'Personalizador de Código QR Dinámico' : 'Générateur de QR Code Dynamique'}
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500 font-sans mt-0.5">
                    {language === 'en' ? 'Configure colors, levels and export custom branded codes' : language === 'es' ? 'Configure colores, niveles y exporte códigos corporativos' : 'Configurez les couleurs, marges et logos de vos campagnes'}
                  </p>
                </div>
              </div>
              <button
                id="dashboard-share-modal-close"
                onClick={() => setSelectedShareCamp(null)}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-650 dark:bg-zinc-950 dark:hover:bg-zinc-850"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column: Live Card Preview & Details */}
              <div className="p-6 bg-slate-50 dark:bg-zinc-950/40 flex flex-col items-center justify-between border-r border-slate-100 dark:border-zinc-800 min-h-[420px]">
                
                {/* Visual Export Ticket Frame */}
                <div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-150 dark:border-zinc-800 shadow-sm space-y-4 text-center">
                  <div className="text-left flex justify-between items-start border-b border-slate-100 dark:border-zinc-805 pb-2.5">
                    <div>
                      <span className="text-[8.5px] font-mono tracking-widest text-indigo-550 dark:text-indigo-400 uppercase font-bold text-slate-400">SOCIALBOOST HQ</span>
                      <p className="text-xs font-bold truncate text-slate-800 dark:text-zinc-150 mt-0.5 max-w-[180px]">{selectedShareCamp.title}</p>
                    </div>
                    <span className="text-[9px] font-extrabold font-mono uppercase bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-zinc-400">
                      {selectedShareCamp.platform}
                    </span>
                  </div>

                  {/* Dynamic Canvas rendering */}
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950/10 rounded-xl inline-flex items-center justify-center border border-slate-100 dark:border-zinc-855/30 shadow-inner">
                    <QRCodeCanvas
                      id="dashboard-qr-canvas"
                      value={`${window.location.origin}/#campaign-${selectedShareCamp.id}`}
                      size={qrSize}
                      bgColor={qrBgColor}
                      fgColor={qrFgColor}
                      level={qrLevel}
                      includeMargin={qrIncludeMargin}
                      style={{ width: '150px', height: '150px' }}
                      imageSettings={
                        qrLogoOption === 'star'
                          ? {
                              src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f59e0b"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
                              height: 32,
                              width: 32,
                              excavate: true
                            }
                          : qrLogoOption === 'platform'
                          ? {
                              src: selectedShareCamp.platform === 'instagram'
                                ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23d946ef"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>`
                                : selectedShareCamp.platform === 'youtube'
                                ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ef4444"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" fill="currentColor"/><path d="M9.5 8.5l7 3.5-7 3.5v-7z" fill="white"/></svg>`
                                : selectedShareCamp.platform === 'tiktok'
                                ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2318181b"><path d="M12.53.02C13.84 0 15 1 15 2.3c0 2.4 1.5 4.1 3.5 4.5l-.2 2.6c-1.8.1-3.3-.6-4.3-1.8v6.2c0 3.5-2.8 6.2-6.3 6.2s-6.2-2.8-6.2-6.3c0-3.3 2.5-6.1 5.8-6.3l.2 2.6c-2 .1-3.4 1.7-3.4 3.7c0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6V.02h1.66z" fill="currentColor"/></svg>`
                                : `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230ea5e9"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M17 9l-7 7-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
                              height: 32,
                              width: 32,
                              excavate: true
                            }
                          : undefined
                      }
                    />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-700 dark:text-zinc-300 font-mono">
                      {selectedShareCamp.rewardTitle}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono tracking-widest block uppercase">
                      ID: SB-{selectedShareCamp.id.toUpperCase().substring(0, 8)}
                    </span>
                  </div>
                </div>

                {/* Copier link component */}
                <div className="w-full space-y-2 mt-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block text-left">
                    {language === 'en' ? 'Direct Public Link' : language === 'es' ? 'Enlace Público de Campaña' : 'Lien Public Direct'}
                  </span>
                  <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-xl">
                    <input 
                      readOnly
                      type="text" 
                      value={`${window.location.origin}/#campaign-${selectedShareCamp.id}`} 
                      className="text-[11px] font-mono select-all bg-transparent border-0 outline-none text-slate-500 w-full px-2"
                    />
                    <button
                      id="dashboard-qr-copy-sub-link-btn"
                      onClick={() => copyCampaignLink(selectedShareCamp.id)}
                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg dark:bg-zinc-800 dark:hover:bg-zinc-750 shrink-0 transition-colors"
                      title="Copier"
                    >
                      {copiedId === selectedShareCamp.id ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
              
              {/* Right Column: Customizer Controls */}
              <div className="p-6 space-y-5 flex flex-col justify-between">
                
                {/* Visual Section: Colors */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-sans">
                    <Palette className="w-4 h-4 text-violet-500" />
                    {language === 'en' ? 'Point Colors & Style' : language === 'es' ? 'Estilo y Color de Puntos' : 'Style & Palette de Couleurs'}
                  </label>
                  
                  {/* Preset foreground circles */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Primary Foreground Color:' : language === 'es' ? 'Color de Frente/Puntos:' : 'Couleur des modules (Foreground):'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { hex: '#4f46e5', label: 'Indigo' },
                        { hex: '#ff007f', label: 'Rose' },
                        { hex: '#10b981', label: 'Emerald' },
                        { hex: '#f59e0b', label: 'Amber' },
                        { hex: '#18181b', label: 'Dark' },
                        { hex: '#d946ef', label: 'Insta' },
                      ].map(preset => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setQrFgColor(preset.hex)}
                          style={{ backgroundColor: preset.hex }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${qrFgColor === preset.hex ? 'border-white ring-2 ring-indigo-500 scale-105' : 'border-transparent'}`}
                          title={preset.label}
                        />
                      ))}
                      
                      {/* Advanced input color picker */}
                      <input 
                        type="color"
                        value={qrFgColor}
                        onChange={(e) => setQrFgColor(e.target.value)}
                        className="w-7 h-7 bg-transparent border-0 outline-none p-0 cursor-pointer rounded-lg overflow-hidden shrink-0"
                        title="Custom Color"
                      />
                    </div>
                  </div>

                  {/* Background Presets */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Background Fill Color:' : language === 'es' ? 'Fondo del Código:' : 'Arrière-plan (Background):'}
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { hex: '#ffffff', label: 'White' },
                        { hex: '#f8fafc', label: 'Slate' },
                        { hex: '#fef3c7', label: 'Ivory' },
                      ].map(preset => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setQrBgColor(preset.hex)}
                          style={{ backgroundColor: preset.hex }}
                          className={`px-2.5 py-1 text-[10px] rounded-lg border font-semibold transition-all cursor-pointer ${qrBgColor === preset.hex ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold dark:bg-zinc-800 dark:border-zinc-700' : 'bg-white text-slate-600 dark:bg-zinc-950 dark:border-zinc-800'}`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Section Selection: Logos and Centers */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-4 h-4 text-indigo-550" />
                    {language === 'en' ? 'Sub-logo Badge overlay' : language === 'es' ? 'Logotipo central de la red' : 'Logo central de marque'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { option: 'none', label: language === 'en' ? 'None' : language === 'es' ? 'Ninguno' : 'Sans logo' },
                      { option: 'platform', label: language === 'en' ? 'Platform' : language === 'es' ? 'Red Social' : 'Réseau' },
                      { option: 'star', label: language === 'en' ? 'Premium Star' : language === 'es' ? 'Estrella' : 'Étoile' },
                    ].map(item => (
                      <button
                        key={item.option}
                        type="button"
                        onClick={() => setQrLogoOption(item.option as any)}
                        className={`py-2 text-[10px] rounded-xl border font-bold transition-all text-center cursor-pointer ${qrLogoOption === item.option ? 'bg-slate-900 border-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-slate-50 text-slate-600 hover:bg-slate-105 border-transparent dark:bg-zinc-950 dark:text-zinc-400'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing & Borders */}
                <div className="space-y-3.5 pt-1.5 border-t border-slate-100 dark:border-zinc-800/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-sans">
                      <Sliders className="w-4 h-4 text-emerald-505" />
                      {language === 'en' ? 'QR Code Margin & Resolution' : language === 'es' ? 'Margen y Resolución del QR' : 'Marge et Résolution d\'Image'}
                    </label>
                  </div>

                  {/* Checkbox include border */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={qrIncludeMargin}
                      onChange={(e) => setQrIncludeMargin(e.target.checked)}
                      className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-505"
                    />
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-405">
                      {language === 'en' ? 'Add white safety border margin' : language === 'es' ? 'Añadir margen de zona de seguridad' : 'Inclure une marge blanche de protection'}
                    </span>
                  </label>

                  {/* Export Resolution preset range slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>{language === 'en' ? 'Resolution' : language === 'es' ? 'Resolución' : 'Fichier Export'}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{qrSize} x {qrSize} px (PNG)</span>
                    </div>
                    <input 
                      type="range"
                      min={128}
                      max={768}
                      step={64}
                      value={qrSize}
                      onChange={(e) => setQrSize(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1 bg-slate-100 dark:bg-zinc-950 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Download and Share Button */}
                <div className="pt-3 flex gap-2.5">
                  <button
                    id="dashboard-qr-btn-download-trigger"
                    onClick={downloadQRCode}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'en' ? 'Generate & Save PNG' : language === 'es' ? 'Generar y Guardar PNG' : 'Générer & Télécharger PNG'}
                  </button>

                  <button
                    onClick={() => {
                      alert(language === 'en' ? "Flyer configuration ready! Initiating secure print workflow on your device..." : language === 'es' ? "¡Configuración de folleto lista! Iniciando flujo de impresión directa en su dispositivo." : "Configuration du prospectus prête ! Lancement du protocole d'impression sur votre appareil...");
                      window.print();
                    }}
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-950 text-slate-700 dark:text-zinc-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Print Flyer"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
