import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  DollarSign, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  Award, 
  TrendingDown, 
  HelpCircle,
  Briefcase,
  Check,
  Share2
} from 'lucide-react';
import { INITIAL_AFFILIATE_LOGS } from '../mockData';

export default function Affiliation() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [estimateReferred, setEstimateReferred] = useState<number>(15);
  const [estimatePlan, setEstimatePlan] = useState<'starter' | 'pro' | 'business'>('pro');

  const referralCode = "REF-849XBT-SB";
  const referralUrl = `${window.location.origin}/?ref=${referralCode}`;

  const copyRefLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getPlanPrice = () => {
    if (estimatePlan === 'starter') return 19.50;
    if (estimatePlan === 'pro') return 39.00;
    return 79.00;
  };

  const commissionPercent = 30; // 30%
  const monthlyEarningsEstimate = (estimateReferred * getPlanPrice() * (commissionPercent / 100)).toFixed(2);
  const annualEarningsEstimate = (parseFloat(monthlyEarningsEstimate) * 12).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Intro Bannler header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider">
            PREMIUM AMBASSADOR PROGRAM
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gagnez 30% de commission récurrente à vie
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 italic">
            Partagez SocialBoost à d’autres créateurs, agences ou boutiques Shopify. Chaque abonnement souscrit par vôtres filleuls vous rapporte de l'argent chaque mois.
          </p>
        </div>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">Filleuls Visiteurs</p>
          <p className="text-2xl font-bold font-mono mt-1 text-slate-800 dark:text-white">514</p>
          <p className="text-[10px] text-gray-500 mt-1">Nombre d'ouvertures de lien</p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">Comptes Inscrits</p>
          <p className="text-2xl font-bold font-mono mt-1 text-slate-800 dark:text-white">41</p>
          <p className="text-[10px] text-indigo-500 font-semibold mt-1">Conversion: ~ 7.9%</p>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">Commissions Payées</p>
          <p className="text-2xl font-bold font-mono mt-1 text-green-600 dark:text-green-400">140.40 €</p>
          <p className="text-[10px] text-gray-500 mt-1">Transférées automatiquement</p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">En cours d'approbation</p>
          <p className="text-2xl font-bold font-mono mt-1 text-purple-600 dark:text-purple-400">23.70 €</p>
          <p className="text-[10px] text-gray-500 mt-1">Validées sous 5 jours ouvrés</p>
        </div>

      </div>

      {/* Copy link section & calculations widget splits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Copy Referral link Card (Left) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-805 shadow-sm space-y-5">
          <div>
            <span className="text-[10px] font-bold font-mono text-indigo-500 uppercase">IDENTIFIANT UNIQUE</span>
            <h3 className="text-base font-bold mt-0.5">Votre lien d'affiliation personnalisé</h3>
            <p className="text-xs text-slate-400 mt-1 leading-snug">
              Intégrez ce lien de parrainage dans vos publications, vidéos de formation ou newsletters. Nous déposons un cookie persistant de 90 jours sur le navigateur des visiteurs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-dashed border-indigo-150 space-y-2">
              <span className="text-[9px] font-bold text-gray-400 font-mono">LIEN DE PARRAINAGE EXCLUSIF</span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-indigo-600 truncate select-all">
                  {referralUrl}
                </span>
                
                <button
                  id="affiliate-btn-copy"
                  onClick={copyRefLink}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs shrink-0 flex items-center gap-1 transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copier
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-4 p-3.5 border rounded-xl bg-slate-50/50 dark:bg-zinc-950/25 text-xs text-slate-500 dark:border-zinc-850">
              <Users className="w-6 h-6 text-indigo-500 shrink-0" />
              <p className="leading-snug">
                Vous recevrez vos gains automatiquement à partir de <strong>20.00 €</strong> accumulés via PayPal, FedaPay ou Mobile Money le 5 de chaque mois.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Estimator Slider tool (Right) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-100 dark:border-zinc-805 shadow-sm space-y-5">
          <div className="border-b border-slate-50 dark:border-zinc-850 pb-3">
            <span className="text-[10px] font-bold font-mono text-purple-500 uppercase">CALCULATEUR INTERACTIF</span>
            <h3 className="text-base font-bold mt-0.5">Estimez vos revenus mensuels récurrents</h3>
          </div>

          <div className="space-y-5 text-xs">
            
            {/* Range slider input */}
            <div className="space-y-2.5">
              <div className="flex justify-between font-bold">
                <span className="text-gray-700 dark:text-zinc-350">Filleuls abonnés référés :</span>
                <span className="text-indigo-600 font-mono text-sm">{estimateReferred} créateurs actifs</span>
              </div>
              <input
                id="affiliate-slider"
                type="range"
                min="1"
                max="100"
                value={estimateReferred}
                onChange={(e) => setEstimateReferred(parseInt(e.target.value))}
                className="w-full accent-indigo-650 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800"
              />
            </div>

            {/* Plan tier selector */}
            <div className="space-y-1.5 pb-2">
              <label className="font-bold text-gray-750 dark:text-zinc-350">Formule souscrite par vos prospects référencés :</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setEstimatePlan('starter')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                    estimatePlan === 'starter' 
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40' 
                      : 'border-slate-150 text-slate-500 bg-transparent hover:bg-slate-50'
                  }`}
                >
                  Starter (€19.50)
                </button>
                <button
                  type="button"
                  onClick={() => setEstimatePlan('pro')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                    estimatePlan === 'pro' 
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40' 
                      : 'border-slate-150 text-slate-500 bg-transparent hover:bg-slate-50'
                  }`}
                >
                  Pro Plan (€39.00)
                </button>
                <button
                  type="button"
                  onClick={() => setEstimatePlan('business')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                    estimatePlan === 'business' 
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40' 
                      : 'border-slate-150 text-slate-500 bg-transparent hover:bg-slate-50'
                  }`}
                >
                  Business (€79.00)
                </button>
              </div>
            </div>

            {/* Results output */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-dashed border-slate-150 dark:border-zinc-850">
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Revenus / Mois</p>
                <p className="text-xl font-mono font-extrabold text-slate-900 dark:text-indigo-400 mt-1">{monthlyEarningsEstimate} €</p>
              </div>
              <div className="text-center border-l">
                <p className="text-[10px] text-gray-400">Revenus / An</p>
                <p className="text-xl font-mono font-extrabold text-blue-600 dark:text-blue-400 mt-1">{annualEarningsEstimate} €</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Historical Referred Logs list table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-sm">Suivi détaillé de vos commissions d'ambassadeur</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400 uppercase font-mono">
                <th className="py-2.5">Date</th>
                <th className="py-2.5">Adresse email filleul</th>
                <th className="py-2.5">Abonnement Réglé</th>
                <th className="py-2.5">Statut de Commission</th>
                <th className="py-2.5 text-right font-bold text-slate-800">Votre Gain (30%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-850 text-slate-700 dark:text-zinc-300">
              {INITIAL_AFFILIATE_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-850/30">
                  <td className="py-3 font-mono font-medium text-slate-400">{log.date}</td>
                  <td className="py-3 font-semibold text-slate-900 dark:text-zinc-150">{log.referredEmail}</td>
                  <td className="py-3 text-slate-400">{log.plan}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                      log.status === 'commission_paid' 
                        ? 'bg-green-50 text-green-700 dark:bg-green-950/20' 
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-950/20'
                    }`}>
                      {log.status === 'commission_paid' ? 'Payée' : 'En attente'}
                    </span>
                  </td>
                  <td className="py-3 text-right font-bold text-slate-900 dark:text-zinc-150 font-mono">
                    + {log.commissionAmount.toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
