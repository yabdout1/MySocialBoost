import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  AlertTriangle, 
  Check, 
  X, 
  TrendingUp, 
  Settings, 
  Menu,
  ChevronRight,
  Database,
  Search,
  Bell
} from 'lucide-react';

interface PendingProof {
  id: string;
  userName: string;
  campaignTitle: string;
  platform: string;
  screenshotUrl: string;
  timestamp: string;
}

interface AdminPanelProps {
  onManualApprove: (pointsAdded: number) => void;
  addNotification: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
}

export default function AdminPanel({ onManualApprove, addNotification }: AdminPanelProps) {
  const [proofs, setProofs] = useState<PendingProof[]>([
    {
      id: 'proof-1',
      userName: 'Lucie Bernard',
      campaignTitle: 'Canva Premium Templates Book',
      platform: 'instagram',
      screenshotUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      timestamp: 'Il y a 5 min'
    },
    {
      id: 'proof-2',
      userName: 'Ismaël Koffi',
      campaignTitle: 'TikTok Secret Shorts Strategie PDF',
      platform: 'tiktok',
      screenshotUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=150&q=80',
      timestamp: 'Il y a 12 min'
    },
    {
      id: 'proof-3',
      userName: 'Jean-Luc V.',
      campaignTitle: '25 Prompts GPT-4 Master Expert Copy',
      platform: 'youtube',
      screenshotUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=150&q=80',
      timestamp: 'Il y a 22 min'
    }
  ]);

  const [platformConfig, setPlatformConfig] = useState({
    defaultPoints: 150,
    commissionRate: 30,
    allowManualReview: true,
    spamThreshold: 5
  });

  const [configSuccess, setConfigSuccess] = useState(false);

  const approveProof = (id: string, name: string) => {
    setProofs(proofs.filter(p => p.id !== id));
    onManualApprove(150);
    addNotification(
      'Validation Modérateur 🛡️', 
      `La capture d'écran de ${name} a été vérifiée et approuvée manuellement !`, 
      'success'
    );
  };

  const rejectProof = (id: string, name: string) => {
    setProofs(proofs.filter(p => p.id !== id));
    addNotification(
      'Rejet Modérateur ⚠️', 
      `La capture d'écran de ${name} a été jugée invalide par la modération. Accès révoqué.`, 
      'warning'
    );
  };

  const saveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSuccess(true);
    addNotification(
      'Paramètres Enregistrés ⚙️', 
      "Les paramètres de répartition de points et d'affiliation de SocialBoost ont été mis à jour.", 
      'success'
    );
    setTimeout(() => setConfigSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-100 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2 text-violet-600">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
            Console d'Administration SocialBoost v2.8
          </h1>
          <p className="text-xs text-slate-505 dark:text-zinc-400 mt-0.5">
            Centre de modération globale, gestion de quotas et validation de litiges de screenshots.
          </p>
        </div>
        <span className="text-[10px] font-mono bg-violet-50 text-violet-700 px-3 py-1 rounded dark:bg-violet-950/40">
          Super-Administrateur Privilèges
        </span>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Créateurs Enregistrés</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono">14,291</p>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">+42 ce jour</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Campagnes d'Engagement</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono">2,142</p>
            <span className="text-[10px] text-slate-400 font-mono">Active status</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-405 font-mono uppercase tracking-wider">Screenshot en attente</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono text-amber-500">{proofs.length}</p>
            <span className="text-[9px] text-amber-600 bg-amber-50 font-bold px-2 py-0.5 rounded">À trier</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-405 font-mono uppercase tracking-wider">Signalements / Plaintes</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono text-rose-500">2</p>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">0 critique</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Screenshot verification pipeline (Left) */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold">Screenshot de Preuve en attente d'approbation manuelle</h3>
            <p className="text-[10px] text-gray-400">Pour les cas litigieux rejetés par la reconnaissance visuelle IA.</p>
          </div>

          <div className="space-y-4">
            {proofs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                ✨ Bravo ! Tout a été trié avec succès par la modération globale.
              </div>
            ) : (
              proofs.map((proof) => (
                <div key={proof.id} className="p-4 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-zinc-850 bg-slate-50/50 dark:bg-zinc-950/20 text-xs text-slate-800 dark:text-zinc-200">
                  <div className="flex gap-3">
                    <img src={proof.screenshotUrl} alt="" className="w-16 h-12 rounded object-cover border shrink-0 bg-white" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100">{proof.userName}</h4>
                      <p className="text-[10px] text-slate-400">Campagne : <strong className="text-indigo-500">{proof.campaignTitle}</strong></p>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{proof.platform} • {proof.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id={`adm-reject-btn-${proof.id}`}
                      onClick={() => rejectProof(proof.id, proof.userName)}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold font-sans text-[11px] flex items-center justify-center gap-1 transition-all"
                    >
                      <X className="w-3.5 h-3.5" /> Rejeter
                    </button>
                    <button
                      id={`adm-approve-btn-${proof.id}`}
                      onClick={() => approveProof(proof.id, proof.userName)}
                      className="flex-1 sm:flex-initial px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold font-sans text-[11px] flex items-center justify-center gap-1 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" /> Approuver
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Platform Parameter Adjustment (Right) */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold">Réglages Globaux</h3>
            <p className="text-[10px] text-gray-400">Modifiez instantanément les constantes du SaaS.</p>
          </div>

          <form onSubmit={saveConfig} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-350">Gain de Points par défaut (Conversion)</label>
              <input
                type="number"
                value={platformConfig.defaultPoints}
                onChange={(e) => setPlatformConfig({ ...platformConfig, defaultPoints: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-350">Commissions d'Affiliation (%)</label>
              <input
                type="number"
                value={platformConfig.commissionRate}
                onChange={(e) => setPlatformConfig({ ...platformConfig, commissionRate: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950">
              <span className="font-semibold text-gray-750 dark:text-zinc-400">Review Modérateur Manuelle</span>
              <input
                type="checkbox"
                checked={platformConfig.allowManualReview}
                onChange={(e) => setPlatformConfig({ ...platformConfig, allowManualReview: e.target.checked })}
                className="accent-indigo-600 h-4 w-4"
              />
            </div>

            <button
              id="admin-btn-save-config"
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
            >
              Enregistrer les Modifs
            </button>

            {configSuccess && (
              <p className="text-center text-[10px] text-green-600 font-bold animate-pulse">✓ Configuration enregistrée !</p>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
