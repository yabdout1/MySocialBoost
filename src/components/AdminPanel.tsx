import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  Server,
  ShieldAlert,
  Lock,
  Unlock,
  Info
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
  const { language, t } = useLanguage();
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

  const dbStatus = getSupabaseUrlAndKey();
  const [showSetupGuide, setShowSetupGuide] = useState(!dbStatus.configured);

  // Analyze active credentials safety (e.g. check for leaked service_role keys on client-side)
  const analyzeSecurity = () => {
    const rawUrl = dbStatus.url || '';
    const rawKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || '';
    
    let isServiceRole = false;
    let tokenRole = 'unknown';
    let isJwtValid = false;
    
    if (rawKey && rawKey.includes('.')) {
      try {
        const parts = rawKey.split('.');
        if (parts.length >= 2) {
          const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
          const decodedPayload = atob(payloadBase64);
          isJwtValid = true;
          if (decodedPayload.toLowerCase().includes('"service_role"')) {
            isServiceRole = true;
            tokenRole = 'service_role';
          } else if (decodedPayload.toLowerCase().includes('"anon"')) {
            tokenRole = 'anon';
          }
        }
      } catch (e) {
        // Fallback for non-compliant or encrypted keys
      }
    }

    return {
      url: rawUrl,
      maskedUrl: rawUrl ? rawUrl.replace(/https:\/\/([^.]+)\.supabase\.(co|net)/, 'https://$1-********.supabase.$2') : '',
      isServiceRole,
      tokenRole,
      isJwtValid,
      hasKey: !!rawKey
    };
  };

  const securityReport = analyzeSecurity();

  const handleRunDiagnostics = async () => {
    setIsTesting(true);
    try {
      const res = await testSupabase();
      setDiagnosticResult(res);
      if (res.success) {
        addNotification(
          language === 'en' ? 'Diagnostic Successful! ⚡' : language === 'es' ? '¡Diagnóstico Exitoso! ⚡' : 'Diagnostic Réussi ! ⚡',
          language === 'en' ? 'Connection to Supabase and all tested tables are operational.' : language === 'es' ? 'La conexión a Supabase y todas las tablas probadas funcionan.' : 'La connexion à Supabase et toutes les tables testées fonctionnent.',
          'success'
        );
      } else {
        addNotification(
          language === 'en' ? 'Test Result ⚠️' : language === 'es' ? 'Resultado del Test ⚠️' : 'Résultat du Test ⚠️',
          res.message,
          'warning'
        );
      }
    } catch (err: any) {
      addNotification(
        language === 'en' ? 'Connection Test Error ❌' : language === 'es' ? 'Error de Test de Conectividad ❌' : 'Erreur Test Connexion ❌',
        err?.message || String(err),
        'warning'
      );
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    addNotification(
      language === 'en' ? 'SQL Copied! 📋' : language === 'es' ? '¡SQL Copiado! 📋' : 'SQL Copié ! 📋',
      language === 'en' ? 'The database structure has been copied to your clipboard.' : language === 'es' ? 'La estructura de la base de datos ha sido copiada al portapapeles.' : 'La structure de base de données a été copiée dans votre presse-papiers.',
      'success'
    );
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const approveProof = (id: string, name: string) => {
    setProofs(proofs.filter(p => p.id !== id));
    onManualApprove(150);
    addNotification(
      language === 'en' ? 'Moderator Approval 🛡️' : language === 'es' ? 'Aprobación del Moderador 🛡️' : 'Validation Modérateur 🛡️', 
      language === 'en' ? `The screenshot from ${name} has been manually approved!` : language === 'es' ? `¡La captura de pantalla de ${name} ha sido aprobada manualmente!` : `La capture d'écran de ${name} a été vérifiée et approuvée manuellement !`, 
      'success'
    );
  };

  const rejectProof = (id: string, name: string) => {
    setProofs(proofs.filter(p => p.id !== id));
    addNotification(
      language === 'en' ? 'Moderator Rejection ⚠️' : language === 'es' ? 'Rechazo del Moderador ⚠️' : 'Rejet Modérateur ⚠️', 
      language === 'en' ? `The screenshot from ${name} was deemed invalid by moderation. Access revoked.` : language === 'es' ? `La captura de pantalla de ${name} fue considerada inválida por la moderación. Acceso revocado.` : `La capture d'écran de ${name} a été jugée invalide par la modération. Accès révoqué.`, 
      'warning'
    );
  };

  const saveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSuccess(true);
    addNotification(
      language === 'en' ? 'Settings Saved ⚙️' : language === 'es' ? 'Ajustes Guardados ⚙️' : 'Paramètres Enregistrés ⚙️', 
      language === 'en' ? "SocialBoost points distribution and affiliate settings have been updated." : language === 'es' ? "Los ajustes de distribución de puntos y afiliación de SocialBoost han sido actualizados." : "Les paramètres de répartition de points et d'affiliation de SocialBoost ont été mis à jour.", 
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
            {language === 'en' ? "SocialBoost Admin Console v2.8" : language === 'es' ? "Consola de Administración de SocialBoost v2.8" : "Console d'Administration SocialBoost v2.8"}
          </h1>
          <p className="text-xs text-slate-550 dark:text-zinc-400 mt-0.5">
            {language === 'en' 
              ? "Global moderation center, quota management, and manual screenshot dispute validation." 
              : language === 'es' 
                ? "Centro de moderación global, gestión de cuotas y validación de disputas de capturas de pantalla." 
                : "Centre de modération globale, gestion de quotas et validation de litiges de screenshots."}
          </p>
        </div>
        <span className="text-[10px] font-mono bg-violet-50 text-violet-700 px-3 py-1 rounded dark:bg-violet-950/40">
          {language === 'en' ? "Super-Admin Privileges" : language === 'es' ? "Privilegios de Superadministrador" : "Super-Administrateur Privilèges"}
        </span>
      </div>

      {/* Dynamic Security Vulnerability Alert Banner */}
      {securityReport.isServiceRole && (
        <div id="security-alert-card" className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-3 dark:bg-rose-950/20 dark:border-rose-900/40 transition-all duration-300">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-rose-950 dark:text-rose-400 text-sm tracking-tight flex items-center gap-1.5 leading-tight">
                {language === 'en' ? 'CRITICAL SECURITY VULNERABILITY: service_role admin bypass key leaked!' : language === 'es' ? 'VULNERABILIDAD CRÍTICA DE SEGURIDAD: llave de service_role filtrada' : 'VULNÉRABILITÉ DE SÉCURITÉ MAJEURE : Clé Administrateur service_role Exposée'}
              </h4>
              <p className="text-rose-800 dark:text-rose-300 text-[11px] leading-relaxed">
                {language === 'en' 
                  ? 'A "service_role" full-power credential was detected in VITE_SUPABASE_ANON_KEY inside browser scope. The service_role key completely bypasses Row-Level Security (RLS) policies. Anyone visiting your platform can inspect compilation artifacts to extract this key and completely access, edit, or wipe all user databases.'
                  : language === 'es'
                    ? 'Se ha detectado una clave "service_role" en variables visibles del cliente. Este token anula la seguridad RLS y expone todo el sistema a borrados.'
                    : 'Un token administrateur suprême "service_role" a été injecté dans vos variables d\'environnement publiques côté client. Ce jeton outrepasse TOUTES les politiques de protection RLS. N\'importe quel utilisateur malveillant peut inspecter le réseau ou le code source compilé pour extraire cette clé et lire, modifier ou détruire l\'intégralité des données.'}
              </p>
            </div>
          </div>
          <div className="p-3 bg-white/75 dark:bg-zinc-950/45 rounded-xl space-y-1.5 text-[10px] text-rose-900 dark:text-rose-200">
            <span className="font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              {language === 'en' ? 'Required Action / Remediation' : language === 'es' ? 'Acción Requerida' : 'Correction Recommandée'}
            </span>
            <ul className="list-disc list-inside space-y-1 text-rose-800 dark:text-rose-300">
              <li>{language === 'en' ? 'Open Supabase > Project Settings > API.' : language === 'es' ? 'Abra Supabase > Project Settings > API.' : 'Allez dans Supabase > Project Settings > API.'}</li>
              <li>{language === 'en' ? 'Copy the ANON PUBLIC key (do NOT copy the service_role key).' : language === 'es' ? 'Copie la ANON PUBLIC key (no service_role).' : 'Copiez la clé "anon public" uniquement (ne prenez jamais la clé service_role).'}</li>
              <li>{language === 'en' ? 'Navigate to Settings > Secrets inside Google AI Studio, insert the safe anon token, and redeploy.' : language === 'es' ? 'Configure la anon public en Google AI Studio.' : 'Mettez à jour le secret VITE_SUPABASE_ANON_KEY dans Google AI Studio et redéployez.'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            {language === 'en' ? 'Registered Creators' : language === 'es' ? 'Creadores Registrados' : 'Créateurs Enregistrés'}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono">14,291</p>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              {language === 'en' ? '+42 today' : language === 'es' ? '+42 hoy' : '+42 ce jour'}
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            {language === 'en' ? 'Engagement Campaigns' : language === 'es' ? 'Campañas de Compromiso' : "Campagnes d'Engagement"}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono">2,142</p>
            <span className="text-[10px] text-slate-400 font-mono">
              {language === 'en' ? 'Active status' : language === 'es' ? 'Estado activo' : 'Status Actif'}
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-405 font-mono uppercase tracking-wider">
            {language === 'en' ? 'Pending Screenshots' : language === 'es' ? 'Capturas Pendientes' : 'Screenshot en attente'}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono text-amber-500">{proofs.length}</p>
            <span className="text-[9px] text-amber-600 bg-amber-50 font-bold px-2 py-0.5 rounded">
              {language === 'en' ? 'To review' : language === 'es' ? 'Por revisar' : 'À trier'}
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <p className="text-[10px] text-gray-405 font-mono uppercase tracking-wider">
            {language === 'en' ? 'Reports / Complaints' : language === 'es' ? 'Reportes / Quejas' : 'Signalements / Plaintes'}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold font-mono text-rose-500">2</p>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              {language === 'en' ? '0 critical' : language === 'es' ? '0 crítico' : '0 critique'}
            </span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Screenshot verification pipeline (Left) */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold">
              {language === 'en' ? "Proof Screenshots Pending Manual Approval" : language === 'es' ? "Capturas de Pantalla de Prueba Pendientes de Aprobación Manual" : "Screenshot de Preuve en attente d'approbation manuelle"}
            </h3>
            <p className="text-[10px] text-gray-400">
              {language === 'en' ? "For disputed cases rejected by AI computer vision algorithm." : language === 'es' ? "Para los casos disputados rechazados por el reconocimiento visual de IA." : "Pour les cas litigieux rejetés par la reconnaissance visuelle IA."}
            </p>
          </div>

          <div className="space-y-4">
            {proofs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                {language === 'en' ? "✨ Great job! Everything was successfully sorted by moderation." : language === 'es' ? "¡Buen trabajo! Todo fue clasificado con éxito por moderación." : "✨ Bravo ! Tout a été trié avec succès par la modération globale."}
              </div>
            ) : (
              proofs.map((proof) => (
                <div key={proof.id} className="p-4 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:border-zinc-855 bg-slate-50/50 dark:bg-zinc-950/20 text-xs text-slate-800 dark:text-zinc-200">
                  <div className="flex gap-3">
                    <img src={proof.screenshotUrl} alt="" className="w-16 h-12 rounded object-cover border shrink-0 bg-white" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-zinc-100">{proof.userName}</h4>
                      <p className="text-[10px] text-slate-400">{language === 'en' ? 'Campaign:' : language === 'es' ? 'Campaña:' : 'Campagne :'} <strong className="text-indigo-500">{proof.campaignTitle}</strong></p>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{proof.platform} • {proof.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id={`adm-reject-btn-${proof.id}`}
                      onClick={() => rejectProof(proof.id, proof.userName)}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold font-sans text-[11px] flex items-center justify-center gap-1 transition-all"
                    >
                      <X className="w-3.5 h-3.5" /> {language === 'en' ? 'Reject' : language === 'es' ? 'Rechazar' : 'Rejeter'}
                    </button>
                    <button
                      id={`adm-approve-btn-${proof.id}`}
                      onClick={() => approveProof(proof.id, proof.userName)}
                      className="flex-1 sm:flex-initial px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold font-sans text-[11px] flex items-center justify-center gap-1 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" /> {language === 'en' ? 'Approve' : language === 'es' ? 'Aprobar' : 'Approuver'}
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
            <h3 className="text-sm font-bold">{language === 'en' ? 'Global Settings' : language === 'es' ? 'Ajustes Globales' : 'Réglages Globaux'}</h3>
            <p className="text-[10px] text-gray-400">{language === 'en' ? 'Modify instant SaaS constants.' : language === 'es' ? 'Modifica instantáneamente las constantes del SaaS.' : 'Modifiez instantanément les constantes du SaaS.'}</p>
          </div>

          <form onSubmit={saveConfig} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-300">
                {language === 'en' ? 'Default Point Gain (Conversion)' : language === 'es' ? 'Ganancia de puntos por defecto (Conversión)' : 'Gain de Points par défaut (Conversion)'}
              </label>
              <input
                type="number"
                value={platformConfig.defaultPoints}
                onChange={(e) => setPlatformConfig({ ...platformConfig, defaultPoints: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-zinc-300">
                {language === 'en' ? 'Affiliate Commissions (%)' : language === 'es' ? 'Comisiones de Afiliados (%)' : "Commissions d'Affiliation (%)"}
              </label>
              <input
                type="number"
                value={platformConfig.commissionRate}
                onChange={(e) => setPlatformConfig({ ...platformConfig, commissionRate: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950">
              <span className="font-semibold text-gray-700 dark:text-zinc-300">
                {language === 'en' ? 'Manual Moderator Review' : language === 'es' ? 'Revisión manual del moderador' : 'Review Modérateur Manuelle'}
              </span>
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
              {language === 'en' ? 'Save Changes' : language === 'es' ? 'Guardar Cambios' : 'Enregistrer les Modifs'}
            </button>

            {configSuccess && (
              <p className="text-center text-[10px] text-green-600 font-bold animate-pulse">
                {language === 'en' ? '✓ Settings saved!' : language === 'es' ? '✓ ¡Ajustes guardados!' : '✓ Configuration enregistrée !'}
              </p>
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
              {language === 'en' ? 'Supabase Backend Integration & Synclocker' : language === 'es' ? 'Integración y Sincronización Backend Supabase' : 'Intégration & Synchronisation Supabase Backend'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en' 
                ? 'Verify in real-time your PostgreSQL database connectivity and manage your tables state.' 
                : language === 'es' 
                  ? 'Verifique la conectividad en tiempo real de su base PostgreSQL y gestione la estructura de sus tablas.' 
                  : 'Vérifiez la connectivité en temps réel de votre base PostgreSQL et gérez la structure de vos tables.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {dbStatus.configured ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full animate-pulse border border-emerald-100/50 dark:border-emerald-900/40">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                ● {language === 'en' ? 'Supabase Connected & Active' : language === 'es' ? 'Supabase Conectado y Activo' : 'Supabase Connecté & Actif'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-955/40 dark:text-amber-400 rounded-full border border-amber-100/50 dark:border-amber-900/40">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                ● {language === 'en' ? 'Smart Local Mode (Sandbox Active)' : language === 'es' ? 'Modo Local Inteligente (Sandbox Activo)' : 'Mode Local Intelligent (Sécurité Active)'}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Step 1 & Diagnostics (Left) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/30 rounded-2xl border border-slate-100 dark:border-zinc-850 space-y-3">
              <h4 className="font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-500" />
                {language === 'en' ? 'Environment Variables Status' : language === 'es' ? 'Estado de las Variables de Entorno' : "Statut des Variables d'environnement"}
              </h4>
              
              <ul className="space-y-2 font-mono text-[10px]">
                <li className="flex flex-col gap-1 p-1.5 rounded bg-white dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">VITE_SUPABASE_URL</span>
                    {dbStatus.url ? (
                      <span className="text-emerald-500 font-bold">{language === 'en' ? 'Injected ✅' : language === 'es' ? 'Inyectado ✅' : 'Injecté ✅'}</span>
                    ) : (
                      <span className="text-rose-500 font-bold">{language === 'en' ? 'Not Found ❌' : language === 'es' ? 'No Detectado ❌' : 'Non Détecté ❌'}</span>
                    )}
                  </div>
                  {dbStatus.url && (
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wide select-all truncate">
                      {securityReport.maskedUrl}
                    </span>
                  )}
                </li>
                
                <li className="flex flex-col gap-1 p-1.5 rounded bg-white dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">VITE_SUPABASE_ANON_KEY</span>
                    {dbStatus.configured ? (
                      <span className="text-emerald-500 font-bold">{language === 'en' ? 'Injected ✅' : language === 'es' ? 'Inyectado ✅' : 'Injecté ✅'}</span>
                    ) : (
                      <span className="text-rose-500 font-bold">{language === 'en' ? 'Not Found ❌' : language === 'es' ? 'No Detectado ❌' : 'Non Détecté ❌'}</span>
                    )}
                  </div>
                  {dbStatus.configured && (
                    <div className="flex items-center justify-between mt-1 text-[9px] border-t border-slate-50 pt-1.5 dark:border-zinc-800">
                      <span className="text-slate-400 select-none flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" />
                        {language === 'en' ? 'Detected Role:' : language === 'es' ? 'Rol detectado:' : 'Rôle Détecté :'}
                      </span>
                      {securityReport.isServiceRole ? (
                        <span className="text-rose-600 font-mono font-bold uppercase bg-rose-50 px-1.5 py-0.5 rounded tracking-wide animate-pulse dark:bg-rose-950/20">
                          ⚠️ {securityReport.tokenRole} (High Risk)
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-mono font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded tracking-wide dark:bg-emerald-950/20">
                          ✓ {securityReport.tokenRole} (Secure Client Token)
                        </span>
                      )}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            {/* Live Database Prober / diagnosticResult */}
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/30 rounded-2xl border border-slate-100 dark:border-zinc-850 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-800 dark:text-zinc-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-500" />
                  {language === 'en' ? 'Supabase Tables Diagnostics' : language === 'es' ? 'Diagnóstico de Tablas Supabase' : 'Diagnostic des Tables Supabase'}
                </h4>
                <button
                  type="button"
                  id="btn-run-diag"
                  onClick={handleRunDiagnostics}
                  disabled={isTesting}
                  className="px-2.5 py-1 text-[9px] font-bold text-white bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                >
                  {isTesting ? (language === 'en' ? 'Probing...' : language === 'es' ? 'Sondeando...' : 'Sondage...') : (language === 'en' ? 'Test Tables' : language === 'es' ? 'Probar Tablas' : 'Tester les Tables')}
                </button>
              </div>

              {diagnosticResult ? (
                <div className="space-y-2 mt-2 font-sans">
                  <div className={`p-2.5 rounded-xl text-[10.5px] ${diagnosticResult.success ? 'bg-emerald-50 text-emerald-850 dark:bg-emerald-950/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-850 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                    <p className="font-semibold leading-normal">{diagnosticResult.message}</p>
                    <p className="text-[8px] mt-1 text-slate-405 font-mono">{language === 'en' ? 'Last test:' : language === 'es' ? 'Último test:' : 'Dernier test :'} {diagnosticResult.timestamp}</p>
                  </div>

                  <div className="divide-y divide-slate-105 dark:divide-zinc-850">
                    {diagnosticResult.tables.map(t => (
                      <div key={t.name} className="py-2 flex items-center justify-between font-mono text-[9px]">
                        <span className="text-gray-650 dark:text-zinc-400">{t.name}</span>
                        <div className="flex items-center gap-1.5">
                          {t.exists ? (
                            <>
                              <span className="text-emerald-500 font-bold text-[9px]">{language === 'en' ? 'Online ✅' : language === 'es' ? 'En Línea ✅' : 'En Ligne ✅'}</span>
                              <span className="text-slate-500 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[8px] font-bold">
                                {t.rowCount !== null ? (language === 'en' ? `${t.rowCount} rows` : language === 'es' ? `${t.rowCount} filas` : `${t.rowCount} lignes`) : '0 lines'}
                              </span>
                            </>
                          ) : (
                            <span className="text-rose-500 font-bold" title={t.error || ''}>{language === 'en' ? 'Missing ❌' : language === 'es' ? 'Faltante ❌' : 'Manquante ❌'}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-gray-400 italic font-sans class-name-diag">
                  {language === 'en' 
                    ? "Click on 'Test Tables' above to probe database schemas existence and retrieve live row counts." 
                    : language === 'es' 
                      ? "Haga clic en 'Probar Tablas' arriba para verificar la existencia de esquemas y obtener recuentos de filas en vivo." 
                      : "Cliquez sur 'Tester les Tables' ci-dessus pour sonder l'existence et récupérer le nombre de rangées de notre schéma public."}
                </p>
              )}
            </div>

            {/* Collapsible Connection Setup Guide: Hides unnecessary instructions by default if connected */}
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/30 rounded-2xl border border-slate-100 dark:border-zinc-850 space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShowSetupGuide(!showSetupGuide)}
              >
                <h4 className="font-bold text-slate-805 dark:text-zinc-200 text-[11px] flex items-center gap-1.5 uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-indigo-500" />
                  {language === 'en' ? 'How to connect Supabase?' : language === 'es' ? '¿Cómo conectar Supabase?' : 'Comment connecter Supabase ?'}
                </h4>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  {showSetupGuide ? (language === 'en' ? 'Hide ✕' : language === 'es' ? 'Ocultar ✕' : 'Masquer ✕') : (language === 'en' ? 'Show Guide ▽' : language === 'es' ? 'Mostrar guía ▽' : 'Afficher Guide ▽')}
                </span>
              </div>
              
              {showSetupGuide && (
                <ol className="list-decimal list-inside space-y-2 text-slate-500 dark:text-zinc-400 mt-2 text-[10.5px] leading-relaxed">
                  {language === 'en' ? (
                    <>
                      <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-550 underline">supabase.com</a>.</li>
                      <li>Click on <strong>Project Settings &gt; API</strong> to copy your Project URL and public ANON key.</li>
                      <li>Open the <strong>Secrets Settings</strong> in Google AI Studio.</li>
                      <li>Configure these two environment keys:
                        <div className="p-1.5 font-mono text-[9px] bg-slate-105 dark:bg-zinc-950 text-indigo-650 rounded my-1 select-all dark:text-indigo-400">
                          VITE_SUPABASE_URL = "your_project_url"<br/>
                          VITE_SUPABASE_ANON_KEY = "your_anon_public_key"
                        </div>
                      </li>
                      <li>Run the SQL setup script on the right inside your Supabase <strong>SQL Editor</strong>.</li>
                    </>
                  ) : language === 'es' ? (
                    <>
                      <li>Cree un proyecto gratuito ingresando a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-505 underline">supabase.com</a>.</li>
                      <li>Haga clic en <strong>Project Settings &gt; API</strong> para copiar la URL y la clave ANON pública.</li>
                      <li>Abra los <strong>Ajustes de Secretos</strong> de Google AI Studio.</li>
                      <li>Configure las dos variables de clave correspondientes:
                        <div className="p-1.5 font-mono text-[9px] bg-slate-105 dark:bg-zinc-950 text-indigo-650 rounded my-1 select-all dark:text-indigo-400">
                          VITE_SUPABASE_URL = "tu_url_de_proyecto_supabase"<br/>
                          VITE_SUPABASE_ANON_KEY = "tu_clave_anon_publica"
                        </div>
                      </li>
                      <li>Pegue el script SQL (a la derecha) en la pestaña <strong>SQL Editor</strong> de Supabase y ejecútelo.</li>
                    </>
                  ) : (
                    <>
                      <li>Créez un projet gratuit en allant sur <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">supabase.com</a>.</li>
                      <li>Cliquez sur <strong>Project Settings &gt; API</strong> pour copier l'URL et la clé ANON publique.</li>
                      <li>Ouvrez le menu <strong>Secrets (Settings)</strong> de Google AI Studio.</li>
                      <li>Configurez les deux variables de clé :
                        <div className="p-1.5 font-mono text-[9px] bg-slate-100 dark:bg-zinc-950 text-indigo-600 rounded my-1 select-all dark:text-indigo-400">
                          VITE_SUPABASE_URL = "votre_url_de_projet_supabase"<br/>
                          VITE_SUPABASE_ANON_KEY = "votre_cle_anon_publique"
                        </div>
                      </li>
                      <li>Collez le script SQL (à droite) dans l'onglet <strong>SQL Editor</strong> de Supabase et exécutez-le.</li>
                    </>
                  )}
                </ol>
              )}
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
                    {language === 'en' ? 'Copied!' : language === 'es' ? '¡Copiado!' : 'Copié !'}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-indigo-500" />
                    {language === 'en' ? 'Copy SQL code' : language === 'es' ? 'Copiar código SQL' : 'Copier le code SQL'}
                  </>
                )}
              </button>
            </div>
            
            <div className="relative">
              <pre className={`p-4 bg-slate-900 border border-slate-800 text-zinc-300 font-mono text-[9px] rounded-b-xl overflow-x-auto select-all transition-all duration-300 ${showFullSql ? 'max-h-[500px]' : 'max-h-[224px]'}`}>
                {SUPABASE_SQL_SETUP}
              </pre>
              
              {!showFullSql && (
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-2">
                  <button
                    type="button"
                    onClick={() => setShowFullSql(true)}
                    className="px-3 py-1 text-[9px] font-bold text-indigo-300 bg-slate-850 hover:bg-slate-800 border border-indigo-900/50 rounded-full transition-colors cursor-pointer mb-1 shadow-sm"
                  >
                    {language === 'en' ? 'Expand Full Script' : language === 'es' ? 'Expandir script completo' : 'Développer le script complet'}
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
                    {language === 'en' ? 'Collapse Script' : language === 'es' ? 'Contraer script' : 'Réduire le script'}
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
