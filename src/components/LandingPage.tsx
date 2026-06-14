import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Users, 
  TrendingUp, 
  Play, 
  Check, 
  ChevronDown, 
  Zap, 
  Gift, 
  Star,
  Award,
  BookOpen,
  MessageSquare,
  Globe,
  Plus
} from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../mockData';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
  setUserRole: (role: 'visitor' | 'creator' | 'admin') => void;
  setAuthModal: (open: boolean) => void;
}

export default function LandingPage({ setCurrentTab, setUserRole, setAuthModal }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState<number>(0);
  const { t, language } = useLanguage();

  const stats = [
    { label: t.statCampaigns, value: '14 291', icon: Zap, color: 'text-indigo-400' },
    { label: t.statEngagement, value: '1 489 202', icon: Users, color: 'text-pink-400' },
    { label: t.statRewards, value: '849 521', icon: Gift, color: 'text-emerald-400' },
    { label: t.statAiAccuracy, value: '99.4%', icon: Cpu, color: 'text-amber-400' }
  ];

  const demoSteps = [
    {
      title: t.step1Title,
      desc: t.step1Desc,
      detail: t.step1Detail,
      icon: Gift,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: t.step2Title,
      desc: t.step2Desc,
      detail: t.step2Detail,
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: t.step3Title,
      desc: t.step3Desc,
      detail: t.step3Detail,
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: t.step4Title,
      desc: t.step4Desc,
      detail: t.step4Detail,
      icon: Cpu,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const startAsCreator = () => {
    setUserRole('creator');
    setCurrentTab('creator-dashboard');
  };

  return (
    <div className="bg-slate-900 dark:bg-zinc-950 text-white min-h-screen transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      
      {/* 🚀 Reference Image 1 & 2 Style Premium Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 dark:bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content: Heavy Typographic Display List (Match Image 1 layout) */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">
            
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/65 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>{t.heroSlogan}</span>
            </div>

            {/* Slogans Title */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05] font-sans">
              {language === 'fr' ? (
                <>Essayez ces <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 font-extrabold">{t.heroTitleGradient}</span> pour booster votre trafic !</>
              ) : language === 'es' ? (
                <>¡Prueba estas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 font-extrabold">3 tácticas rápidas</span> para explotar tu tráfico!</>
              ) : (
                <>Try these <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 font-extrabold">3 quick tactics</span> to explode your traffic!</>
              )}
            </h1>

            <p className="text-slate-350 text-base max-w-xl leading-relaxed">
              {t.heroSub}
            </p>

            {/* Quick structured tactics layout (Direct matching reference style Image 1) */}
            <div className="space-y-4 pt-2 font-sans border-l-2 border-indigo-500/40 pl-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>{t.tactic1Title}</span>
                </div>
                <p className="text-xs text-slate-400 ml-6">
                  {t.tactic1Desc}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Plus className="w-4 h-4 text-pink-400" />
                  <span>{t.tactic2Title}</span>
                </div>
                <p className="text-xs text-slate-400 ml-6">
                  {t.tactic2Desc}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>{t.tactic3Title}</span>
                </div>
                <p className="text-xs text-slate-400 ml-6">
                  {t.tactic3Desc}
                </p>
              </div>
            </div>

            {/* Micro branding footer (Reference Style footer row) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-cta-get-started-v2"
                onClick={startAsCreator}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white shadow-xl shadow-indigo-500/10 transform active:scale-[0.98] transition-all gap-2 cursor-pointer"
              >
                {t.heroCtaStart}
                <ArrowRight className="w-4 h-4 text-indigo-200" />
              </button>
              
              <button
                id="hero-cta-marketplace-v2"
                onClick={() => setCurrentTab('marketplace')}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors gap-2 cursor-pointer"
              >
                {t.heroCtaBrowse}
                <BookOpen className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Support channels */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
              <span>{t.freeTrialOffer}</span>
              <span>•</span>
              <span className="text-indigo-400">{t.certifiedGrowth}</span>
            </div>

          </div>

          {/* Hero Right: 3D Astronaut Riding Rocket Graphic with overlay floating glassmorphic widgets (Image 1 & Comic elements) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Visual Neon Tube Background Ring */}
            <div className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full border-8 border-indigo-600/10 border-t-indigo-500/25 border-r-pink-500/25 animate-spin [animation-duration:40s] pointer-events-none"></div>
            
            <div className="relative max-w-md sm:max-w-lg z-10 group">
              {/* Main astronaut image generated to match request 1 */}
              <img 
                src="/src/assets/images/hero_astronaut_rocket_1780731074640.png" 
                alt="Astronaute SocialBoost sur sa fusée"
                referrerPolicy="no-referrer"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(79,110,229,0.35)] rounded-3xl object-cover transform group-hover:scale-105 transition-all duration-700"
              />

              {/* Floating Glassmorphic Badge 1 */}
              <div className="absolute top-10 -left-6 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-500/30 shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-indigo-300 font-mono">Gain Moyen</p>
                  <p className="text-sm font-black text-white">+ 480 abonnés / jour</p>
                </div>
              </div>

              {/* Floating Glassmorphic Badge 2 */}
              <div className="absolute bottom-12 -right-6 bg-slate-900/80 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-pink-500/30 shadow-2xl space-y-1 text-left animate-bounce [animation-duration:5.5s]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-pink-400">
                  <Cpu className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  <span>Vision IA</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">99.4% de taux de détection</p>
              </div>

              {/* Neon bottom platform bar resembling game store showcase layout */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-indigo-500/20 blur-xl"></div>
            </div>

          </div>

        </div>

        {/* Brand Integration Grid Floor */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 text-center">
          <p className="text-[10px] font-mono tracking-widest text-slate-450 uppercase mb-6">
            {t.brandTicker}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-80">
            {['TikTok', 'YouTube', 'Instagram', 'Twitter / X', 'Telegram', 'Facebook', 'LinkedIn'].map((plat, idx) => (
              <span key={idx} className="text-xs font-black tracking-wider text-slate-400 hover:text-cyan-400 font-sans cursor-pointer transition-colors duration-200">
                #{plat.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* 📊 Real-time Ticker Statistics with Neon Highlight Borders */}
      <section className="bg-slate-950 py-12 border-y border-slate-800/60 relative">
        <div className="absolute inset-0 bg-blue-500/[0.01] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="text-center space-y-2 p-5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/40 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="inline-flex items-center justify-center p-2.5 bg-indigo-950/40 rounded-xl mb-1 border border-indigo-500/10">
                    <IconComp className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-white font-mono tracking-tight leading-none">
                    {stat.value}
                  </h3>
                  <p className="text-[11.5px] text-slate-400 font-semibold uppercase tracking-wider font-mono">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⚙️ Interactive Demo Section (Uses newly generated image 2 for dashboard preview) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-950/40 border border-violet-500/30 text-violet-300">
            {t.demoPill}
          </div>
          <h2 className="text-3xl sm:text-4.5xl font-extrabold text-white tracking-tight">
            {t.demoTitle}
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            {t.demoSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Step Selectors (Glow interactive accordion cards) */}
          <div className="lg:col-span-5 space-y-4">
            {demoSteps.map((step, idx) => {
              const IconC = step.icon;
              const isActive = demoStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setDemoStep(idx)}
                  className={`p-5 rounded-2xl text-left cursor-pointer transition-all duration-350 border ${
                    isActive 
                      ? 'border-indigo-500/60 bg-indigo-950/40 shadow-xl shadow-indigo-500/10' 
                      : 'border-slate-800/40 bg-slate-900/20 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} text-white shrink-0 shadow-lg`}>
                      <IconC className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isActive ? 'text-indigo-350' : 'text-slate-300'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Simulated Computer Mockup featuring our second newly generated campaign glow dashboard card (Match reference image 5) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500"></div>
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-semibold">SOCIALBOOST_AI_DASHBOARD v2.8</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-305 border border-indigo-500/20 uppercase tracking-widest">
                {language === 'es' ? 'Paso Activo' : language === 'en' ? 'Active Step' : 'Étape Active'}
              </span>
            </div>

            {/* Neon Glowing Workspace with our generated Dashboard Mockup (Matching Style 4 & 5) */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col justify-between min-h-[350px]">
              
              {/* Overlay Interactive Mockup State card on top of background image */}
              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                <img 
                  src="/src/assets/images/campaign_glow_dashboard_1780731093436.png" 
                  alt="Analyse de données et vision artificielle" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Live interactive wizard elements overlay */}
              <div className="relative p-6 z-10 bg-slate-950/85 backdrop-blur-sm m-4 rounded-xl border border-slate-800 flex-1 flex flex-col justify-between">
                
                {demoStep === 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{t.giftCreationTitle}</span>
                      <span className="text-xs text-slate-400 font-mono font-bold">{t.giftFormat}</span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Gift className="w-5 h-5 text-indigo-400" />
                      🚀 {language === 'en' ? 'Ultimate Prompt Engineering Book' : 'Manuel Ultime de Prompts ChatGPT'} (6.4 MB)
                    </h3>
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-dashed border-indigo-500/30">
                      <p className="text-xs text-slate-450 leading-relaxed">
                        {t.giftDesc}
                      </p>
                    </div>
                    <p className="text-[10px] text-cyan-400 font-semibold italic">{t.readyToAttach}</p>
                  </div>
                )}

                {demoStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                      <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">{t.engagementRules}</span>
                      <span className="text-xs text-slate-400 font-mono font-bold">{t.socialBooster}</span>
                    </div>
                    
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-black font-mono border border-indigo-500/20">
                          т
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{t.rulesAction}</p>
                          <p className="text-[10px] text-slate-500 font-mono font-medium">@julien_growth_dev</p>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-indigo-950 text-indigo-305 border border-indigo-500/20 font-mono font-bold">{t.rulesBonus}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t.rulesDesc}
                    </p>
                  </div>
                )}

                {demoStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                       <span className="text-[10px] font-mono text-pink-400 uppercase font-bold">{t.captureTitle}</span>
                       <span className="text-xs text-slate-400 font-mono font-bold">{language === 'en' ? 'Link Generated' : 'Lien Généré'}</span>
                    </div>
                    <div className="p-4 bg-slate-905 rounded-xl border border-slate-800 text-center space-y-3">
                      <p className="text-xs font-bold text-slate-200">{t.captureReady}</p>
                      <div className="px-3 py-2 bg-slate-950 rounded text-[11px] font-mono text-cyan-400 select-all border border-slate-800 overflow-x-auto whitespace-nowrap text-left">
                        https://socialboost.app/c/pack-chatgpt-julien
                      </div>
                    </div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      {t.captureDesc}
                    </p>
                  </div>
                )}

                {demoStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{t.automatedUnlock}</span>
                      <span className="text-xs text-slate-400 font-mono font-bold">{language === 'es' ? 'Verificación de Prueba' : language === 'en' ? 'Proof Verification' : 'Vérification de Preuve'}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3.5 bg-emerald-950/25 border border-emerald-500/20 rounded-xl">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">{t.proofCertified}</p>
                        <p className="text-[10.5px] text-slate-450">{t.proofDetail}</p>
                      </div>
                    </div>

                    <button className="w-full py-3 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all">
                      <Gift className="w-4 h-4 animate-bounce" />
                      {t.downloadGift}
                    </button>
                  </div>
                )}

              </div>

            </div>

            {/* Simulated bar text */}
            <div className="mt-6 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium font-mono">
                {language === 'es' ? 'Paso' : language === 'en' ? 'Step' : 'Étape'} {demoStep + 1} {language === 'es' ? 'de' : 'of'} {demoSteps.length} — {demoSteps[demoStep].detail}
              </span>
              <button 
                onClick={() => setDemoStep((demoStep + 1) % demoSteps.length)}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {t.demoNextStep} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 🔮 Elegant Bento Feature Pitch Grid with glowing corners */}
      <section className="bg-slate-950 py-24 border-t border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">{t.landingBentoSecurity}</span>
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-white tracking-tight">
              {t.landingBentoAudience}
            </h2>
            <p className="text-slate-400 text-sm">
              {t.landingBentoAudienceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-indigo-500/30 transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white">{t.landingBento1Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landingBento1Desc}
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-indigo-500/30 transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center text-pink-400 shadow-inner">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.landingBento2Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landingBento2Desc}
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-indigo-500/30 transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.landingBento3Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landingBento3Desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ⭐ Gorgeous Testimonials Ticker (Similar to game store previews) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-extrabold text-pink-400 uppercase tracking-widest">{t.landingTestimonialsPill}</span>
          <h2 className="text-3xl sm:text-4.5xl font-extrabold text-white tracking-tight">
            {t.landingTestimonialsHeading}
          </h2>
          <p className="text-slate-400 text-sm">
            {t.landingTestimonialsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <p className="text-xs text-slate-350 leading-relaxed italic">
                "{test.quote}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-3">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-700" 
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono font-bold leading-relaxed">{test.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs font-black font-mono">
                  <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
                  {test.followersGained}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Accordion FAQ section with cyber elements */}
      <section className="bg-slate-950 py-24 border-t border-slate-800/50 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Des questions ? Nous y répondons.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-slate-250 hover:bg-slate-900 transition-all gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-450 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🚀 Reference Style Bottom CTA - Large Glowing Dashboard (Resembling full mockup layout) */}
      <section className="py-24 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden text-center px-4 sm:px-6 lg:px-8 border-t border-slate-850">
        <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-950/60 border border-cyan-505/20 text-cyan-400 font-mono">
            {t.landingBottomPill}
          </div>

          <h2 className="text-3xl sm:text-5.5xl font-black tracking-tight leading-[1.05]">
            {t.landingBottomHeadingMain}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 font-extrabold">{t.landingBottomHeadingGrad}</span>
          </h2>

          <p className="text-slate-350 text-base max-w-xl mx-auto leading-relaxed">
            {t.landingBottomSub}
          </p>

          <div className="pt-4">
            <button
               id="cta-bottom-creator-trial-v2"
               onClick={startAsCreator}
               className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 via-indigo-550 to-purple-600 hover:opacity-95 text-white px-8 py-4.5 rounded-xl text-sm font-black shadow-2xl shadow-indigo-500/20 active:scale-[0.99] transition-all font-sans cursor-pointer"
            >
              {t.landingBottomBtn}
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </button>
          </div>
          
          <p className="text-[11px] text-slate-500 font-mono tracking-wider font-bold">
            {t.landingBottomFooter}
          </p>

        </div>
      </section>

    </div>
  );
}
