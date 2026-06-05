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
  Bell,
  Copy,
  Terminal,
  Server
} from 'lucide-react';
import { 
  isSupabaseConfigured, 
  SUPABASE_SQL_SETUP, 
  getSupabaseUrlAndKey,
  testSupabase,
  SupabaseTestResult
} from '../supabase';

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
  const [copiedSql, setCopiedSql] = useState(false);
  const [showFullSql, setShowFullSql] = useState(false);
  
  const [diagnosticResult, setDiagnosticResult] = useState<SupabaseTestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleRunDiagnostics = async () => {
    setIsTesting(true);
    try {
      const res = await testSupabase();
      setDiagnosticResult(res);
      if (res.success) {
        addNotification('Diagnostic Réussi ! ⚡', 'La connexion à Supabase et toutes les tables testées fonctionnent.', 'success');
      } else {
        addNotification('Résultat du Test ⚠️', res.message, 'warning');
      }
    } catch (err: any) {
      addNotification('Erreur Test Connexion ❌', err?.message || String(err), 'warning');
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    addNotification('SQL Copié ! 📋', 'La structure de base de données a été copiée dans votre presse-papiers.', 'success');
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const dbStatus = getSupabaseUrlAndKey();

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

      {/* NEW: Supabase Live Synclocker Terminal and PostgreSQL Editor (Bento Span) */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-md p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4 border-slate-50 dark:border-zinc-850">
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Database className="w-5 h-5 text-indigo-500" />
              Intégration &amp; Synchronisation Supabase Backend
            </h3>
            <p className="text-xs text-slate-400">
              Vérifiez la connectivité en temps réel de votre base PostgreSQL et gérez la structure de vos tables.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {dbStatus.configured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full animate-pulse border border-emerald-100/50 dark:border-emerald-900/40">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ● Supabase Connecté &amp; Actif
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 rounded-full border border-amber-100/50 dark:border-amber-900/40">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                ● Mode Local Intelligent (Sécurité Active)
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Step 1 &amp; Diagnostics (Left) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/30 rounded-2xl border border-slate-100 dark:border-zinc-850 space-y-3">
              <h4 className="font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-500" />
                Statut des Variables d'environnement
              </h4>
              
              <ul className="space-y-2 font-mono text-[10px]">
                <li className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900">
                  <span className="text-slate-400">VITE_SUPABASE_URL</span>
                  {dbStatus.url ? (
                    <span className="text-emerald-500 font-bold">Injecté ✅</span>
                  ) : (
                    <span className="text-rose-500 font-bold">Non Détecté ❌</span>
                  )}
                </li>
                <li className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-zinc-900">
                  <span className="text-slate-400">VITE_SUPABASE_ANON_KEY</span>
                  {dbStatus.configured ? (
                    <span className="text-emerald-500 font-bold">Injecté ✅</span>
                  ) : (
                    <span className="text-rose-500 font-bold">Non Détecté ❌</span>
                  )}
                </li>
              </ul>
            </div>

            {/* Live Database Prober / diagnosticResult */}
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/30 rounded-2xl border border-slate-100 dark:border-zinc-850 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-500" />
                  Diagnostic des Tables Supabase
                </h4>
                <button
                  type="button"
                  id="btn-run-diag"
                  onClick={handleRunDiagnostics}
                  disabled={isTesting}
                  className="px-2.5 py-1 text-[9px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                >
                  {isTesting ? 'Sondage...' : 'Tester les Tables'}
                </button>
              </div>

              {diagnosticResult ? (
                <div className="space-y-2 mt-2 font-sans">
                  <div className={`p-2.5 rounded-xl text-[10.5px] ${diagnosticResult.success ? 'bg-emerald-50 text-emerald-850 dark:bg-emerald-950/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-850 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                    <p className="font-semibold leading-normal">{diagnosticResult.message}</p>
                    <p className="text-[8px] mt-1 text-slate-400 font-mono">Dernier test : {diagnosticResult.timestamp}</p>
                  </div>

                  <div className="divide-y divide-slate-105 dark:divide-zinc-850">
                    {diagnosticResult.tables.map(t => (
                      <div key={t.name} className="py-2 flex items-center justify-between font-mono text-[9px]">
                        <span className="text-gray-600 dark:text-zinc-400">{t.name}</span>
                        <div className="flex items-center gap-1.5">
                          {t.exists ? (
                            <>
                              <span className="text-emerald-500 font-bold text-[9px]">En Ligne ✅</span>
                              <span className="text-slate-500 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[8px] font-bold">
                                {t.rowCount !== null ? `${t.rowCount} lignes` : '0 lignes'}
                              </span>
                            </>
                          ) : (
                            <span className="text-rose-500 font-bold" title={t.error || ''}>Manquante ❌</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-gray-400 italic font-sans class-name-diag">
                  Cliquez sur "Tester les Tables" ci-dessus pour sonder l'existence et récupérer le nombre de rangées de notre schéma public.
                </p>
              )}
            </div>

            <div className="space-y-3 p-1.5">
              <h4 className="font-bold text-slate-800 dark:text-zinc-200">Comment connecter votre base de données Supabase ?</h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-500">
                <li>Créez un projet gratuit en allant sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">supabase.com</a>.</li>
                <li>Cliquez sur <strong>Project Settings &gt; API</strong> pour copier l'URL et la clé ANON publique.</li>
                <li>Ouvrez le menu <strong>Secrets  (Settings)</strong> de Google AI Studio.</li>
                <li>Configurez les deux variables de clé :
                  <div className="p-1.5 font-mono text-[9px] bg-slate-100 dark:bg-zinc-950 text-indigo-600 rounded my-1 select-all dark:text-indigo-400">
                    VITE_SUPABASE_URL = "votre_url_de_projet_supabase"<br/>
                    VITE_SUPABASE_ANON_KEY = "votre_cle_anon_publique"
                  </div>
                </li>
                <li>Collez le script SQL (à droite) dans l'onglet <strong>SQL Editor</strong> de Supabase et exécutez-le.</li>
              </ol>
            </div>
          </div>

          {/* SQL Editor script box (Right) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-center bg-slate-100 dark:bg-zinc-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-200 dark:border-zinc-850">
              <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                structure_socialboost.sql
              </span>
              <button
                type="button"
                id="copy-supabase-sql-btn"
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-white hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 rounded transition-colors cursor-pointer"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-indigo-500" />
                    Copier le code SQL
                  </>
                )}
              </button>
            </div>
            
            <div className="relative">
              <pre className={`p-4 bg-slate-900 border border-slate-800 text-zinc-300 font-mono text-[9px] rounded-b-xl overflow-x-auto select-all transition-all duration-300 ${showFullSql ? 'max-h-[500px]' : 'max-h-[220px]'}`}>
                {SUPABASE_SQL_SETUP}
              </pre>
              
              {!showFullSql && (
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-2">
                  <button
                    type="button"
                    onClick={() => setShowFullSql(true)}
                    className="px-3 py-1 text-[9px] font-bold text-indigo-300 bg-slate-850 hover:bg-slate-800 border border-indigo-900/50 rounded-full transition-colors cursor-pointer mb-1 shadow-sm"
                  >
                    Développer le script complet
                  </button>
                </div>
              )}

              {showFullSql && (
                <div className="flex justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => setShowFullSql(false)}
                    className="px-3 py-1 text-[9px] font-bold text-indigo-300 bg-slate-800 hover:bg-slate-750 border border-indigo-900/50 rounded-full transition-colors cursor-pointer"
                  >
                    Réduire le script
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
