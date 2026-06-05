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
  MessageSquare
} from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../mockData';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
  setUserRole: (role: 'visitor' | 'creator' | 'admin') => void;
  setAuthModal: (open: boolean) => void;
}

export default function LandingPage({ setCurrentTab, setUserRole, setAuthModal }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState<number>(0);

  const stats = [
    { label: 'Campagnes Lancées', value: '14 291', icon: Zap, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Actions d\'engagement', value: '1 489 202', icon: Users, color: 'text-violet-600 dark:text-violet-400' },
    { label: 'Récompenses débloquées', value: '849 521', icon: Gift, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Fiabilité de l\'IA', value: '99.4%', icon: Cpu, color: 'text-amber-500' }
  ];

  const demoSteps = [
    {
      title: "1. Créez votre cadeau",
      desc: "Téléchargez un ebook, intégrez un lien Notion ou donnez accès à un groupe privé. Offrez de la valeur solide.",
      detail: "Vous déterminez les règles d’accès (ex: réservé aux 500 premiers).",
      icon: Gift,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "2. Choisissez les actions",
      desc: "Sélectionnez vos besoins de croissance : s'abonner sur TikTok, relayer un post X, rejoindre un canal Telegram, etc.",
      detail: "Vous pouvez combiner plusieurs réseaux sociaux pour une seule récompense.",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "3. Partagez le lien d'accès",
      desc: "SocialBoost génère une page de capture magnifique avec un QR code à partager en bio ou dans vos publications.",
      detail: "Optimisé à 100% pour les smartphones des vôtres abonnés.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "4. L'IA valide et livre le bonus",
      desc: "Notre IA de vision artificielle analyse instantanément les captures des abonnés pour débloquer le téléchargement.",
      detail: "Zéro travail manuel, croissance organique en pilote automatique garanti !",
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
    <div className="bg-slate-50/50 dark:bg-zinc-950 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Slogan Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          <span>Nouveau : Analyse des screenshots instantanée par IA v2.8</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6 font-sans">
          Développez votre audience grâce à{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
            la valeur que vous offrez.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Publiez des récompenses numériques (Ebooks, Prompts IA, Templates Canva, Codes réduc) débloquées par des actions sociales concrètes sur vos réseaux préférés.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="hero-cta-get-started"
            onClick={startAsCreator}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:opacity-95 text-white shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all gap-2"
          >
            Lancer ma première campagne
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            id="hero-cta-marketplace"
            onClick={() => setCurrentTab('marketplace')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-850 transition-colors gap-2"
          >
            Soutenir et Gagner des Cadeaux
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        {/* Social Badges Grid */}
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-zinc-900">
          <p className="text-[11px] font-mono tracking-widest text-slate-400 dark:text-zinc-500 uppercase mb-5">
            CROISSANCE INTÉGRÉE POUR TOUTES LES PLATEFORMES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85">
            {['TikTok', 'YouTube', 'Instagram', 'Twitter / X', 'Telegram', 'Facebook', 'LinkedIn'].map((plat, idx) => (
              <span key={idx} className="text-sm font-semibold text-slate-500 dark:text-zinc-400 font-sans hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {plat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Ticker Statistics */}
      <section className="bg-white dark:bg-zinc-950 py-10 border-y border-slate-150 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="text-center space-y-2 p-4 rounded-xl hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                  <div className="inline-flex items-center justify-center p-2.5 bg-blue-50/50 dark:bg-zinc-900 rounded-xl mb-1">
                    <IconComp className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Presentation Selector */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Comment fonctionne SocialBoost ?
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-base">
            Oubliez les processus manuels fastidieux de vérification. Notre solution est entièrement automatisée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Step Selector Tab Panels (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {demoSteps.map((step, idx) => {
              const IconC = step.icon;
              const isActive = demoStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setDemoStep(idx)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-350 ${
                    isActive 
                      ? 'border-indigo-200 bg-white shadow-md shadow-indigo-100 dark:border-zinc-805 dark:bg-zinc-900' 
                      : 'border-transparent bg-transparent hover:bg-white/40 dark:hover:bg-zinc-900/20'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} text-white shrink-0`}>
                      <IconC className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-base font-bold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-zinc-350'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Graphical Simulated Sandbox (Right) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-500"></div>
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-semibold">SOCIALBOOST_SIMULATOR_ENV v1.2</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 uppercase tracking-widest">
                Étape Active
              </span>
            </div>

            {/* Simulated UI Content */}
            <div className="bg-slate-50 dark:bg-zinc-950 p-6 rounded-2xl border border-slate-150 dark:border-zinc-850 relative min-h-[220px] flex flex-col justify-between">
              
              {demoStep === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">1. Créateur</span>
                    <span className="text-xs text-slate-400 font-medium">Nouveau Cadeau</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-850 dark:text-white">🚀 Manuel Ultime de Prompts ChatGPT</h3>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-indigo-200">
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Un PDF hébergé qui contient 40 prompts optimisés pour le commerce électronique et la rédaction web.
                    </p>
                  </div>
                  <p className="text-[11px] text-indigo-500 italic">Prêt à attacher à une contrepartie d'engagement d'abonnement.</p>
                </div>
              )}

              {demoStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-600 uppercase font-bold">2. Règles d'engagement</span>
                    <span className="text-xs text-slate-400">TikTok Growth</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                        т
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">Suivre mon compte TikTok</p>
                        <p className="text-[10px] text-slate-400">Handle cible: @julien_growth_dev</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-300 font-mono font-bold">+ 150 pts</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    L'abonné devra s'abonner pour pouvoir valider l'obtention du PDF.
                  </p>
                </div>
              )}

              {demoStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-pink-600 uppercase font-bold">3. Page de Téléchargement</span>
                    <span className="text-xs text-slate-400">Lien Généré</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 text-center space-y-2">
                    <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300">🎉 Page de capture optimisée mobile</p>
                    <div className="px-3 py-1.5 bg-slate-50 dark:bg-zinc-950 rounded text-[11px] font-mono text-slate-500 select-all border text-left overflow-x-auto whitespace-nowrap">
                      https://socialboost.app/c/pack-chatgpt-julien
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-xs text-indigo-500 underline cursor-pointer hover:text-indigo-600">Simuler la page de capture en situation réelle</span>
                  </div>
                </div>
              )}

              {demoStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">4. Déblocage Automatisé IA</span>
                    <span className="text-xs text-slate-400">Vérification de Preuve</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">Preuve Certifiée par Vision SocialBoost IA !</p>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400">Le bouton d'abonnement a bien été identifié sur l'image.</p>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all">
                    <Gift className="w-4 h-4 animate-bounce" />
                    Télécharger "Manuel Ultime de Prompts" (6.4 MB)
                  </button>
                </div>
              )}

            </div>

            <div className="mt-6 flex justify-between items-center text-xs">
              <span className="text-slate-400 leading-none">
                Étape {demoStep + 1} de {demoSteps.length} — {demoSteps[demoStep].detail}
              </span>
              <button 
                onClick={() => setDemoStep((demoStep + 1) % demoSteps.length)}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-bold flex items-center gap-1.5 transition-colors"
              >
                Étape Suivante <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Elegant Bento Feature Pitch Grid */}
      <section className="bg-white dark:bg-zinc-950 py-20 border-t border-slate-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">PROPULSÉ POUR LE SAAS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
              Bâtissez l'audience de vos rêves
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">
              Donnez vie à vos campagnes avec des fonctionnalités conçues pour l'efficacité et la sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-zinc-850 dark:bg-zinc-900 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-zinc-950 flex items-center justify-center text-blue-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hébergement Fichiers Sécurisé</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Uploadez vos PDF, archives, vidéos ou intégrez vos liens Notion/Canva de façon protégée. Nous ne délivrons le cadeau qu'après vérification absolue.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-zinc-850 dark:bg-zinc-900 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-zinc-950 flex items-center justify-center text-violet-600">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">QR Code & Liens de Bio</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Toutes vos campagnes génèrent de superbes pages d'atterrissage optimisées mobile avec un code QR vectoriel instantané pour les stories et bio Instagram.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-zinc-850 dark:bg-zinc-900 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-zinc-950 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Anti-Spam & Anti-Désabonnement</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Algorithmes de surveillance pour détecter les fraudeurs qui suppriment l'abonnement ou téléchargent plusieurs fois via différentes adresses e-mails.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Ticker */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-violet-600 uppercase tracking-widest">RÉSULTATS PROUVEZ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Ils cartonnent avec SocialBoost
          </h2>
          <p className="text-slate-500 dark:text-zinc-450 text-sm">
            Vos collègues économisent des milliers d'euros en publicité payante grâce à la conversion de leur audience naturelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6">
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                "{test.quote}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-zinc-850">
                <div className="flex items-center gap-3">
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-200">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-550">{test.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-300 px-2 py-1 rounded text-xs font-bold font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {test.followersGained}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion FAQ section */}
      <section className="bg-white dark:bg-zinc-950 py-20 border-t border-slate-150 dark:border-zinc-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
              Des questions ? Nous y répondons.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="border border-slate-100 dark:border-zinc-850 rounded-xl overflow-hidden transition-all bg-slate-50/30 dark:bg-zinc-900/40"
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm text-slate-800 dark:text-zinc-200 hover:bg-slate-100/40 dark:hover:bg-zinc-850/40 transition-all gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-850/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-tr from-blue-700 via-indigo-600 to-violet-700 text-white relative overflow-hidden text-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            N'achetez plus d'abonnés de mauvaise qualité. Offrez de la valeur !
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto leading-relaxed">
            Profitez de notre formule d'évaluation gratuite pour faire l'expérience du pilote automatique. Rejoignez aujourd'hui plus de 14 000 créateurs de premier plan.
          </p>
          <div className="pt-4">
            <button
              id="cta-bottom-creator-trial"
              onClick={startAsCreator}
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl text-sm font-bold shadow-xl transition-all font-sans"
            >
              Lancer mon compte gratuit immédiatement
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-blue-200 font-mono">
            Gratuit pour toujours avec 1 campagne active • Pas de carte bancaire requise
          </p>
        </div>
      </section>

    </div>
  );
}
