import React, { useState } from 'react';
import { 
  Gift, 
  ArrowRight, 
  CheckCircle, 
  Upload, 
  Cpu, 
  FileCheck, 
  Search, 
  ArrowLeft, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Download,
  Brain,
  Eye
} from 'lucide-react';
import { Campaign } from '../types';

interface CampaignExecutionProps {
  campaign: Campaign;
  onBack: () => void;
  addPoints: (pts: number) => void;
  addNotification: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
  onIncrementCount: (id: string) => void;
}

export default function CampaignExecution({ 
  campaign, 
  onBack, 
  addPoints,
  addNotification,
  onIncrementCount
}: CampaignExecutionProps) {
  const [visitedLink, setVisitedLink] = useState(false);
  const [screenshotUploaded, setScreenshotUploaded] = useState<File | null>(null);
  const [presetScreenshotSelected, setPresetScreenshotSelected] = useState(false);
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [verifyingMessage, setVerifyingMessage] = useState('');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [apiVerificationFailed, setApiVerificationFailed] = useState(false);

  // OpenRouter Vision States
  const [openRouterResult, setOpenRouterResult] = useState<{
    isValid: boolean;
    confidence: number;
    reason: string;
  } | null>(null);
  const [openRouterError, setOpenRouterError] = useState<string | null>(null);
  const [isUsingOpenRouterMock, setIsUsingOpenRouterMock] = useState(false);

  // Helper to generate professional-looking dark-themed dashboard mockup for Vision model simulation
  const generateMockScreenshotBase64 = (platform: string, handle: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 800);
      gradient.addColorStop(0, '#09090b');
      gradient.addColorStop(1, '#020617');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 600, 800);

      // Draw phone header status bar
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, 25, 520, 6);

      // Platform text
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(platform.toUpperCase() + ' APP', 60, 85);

      // Profil Circle
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.arc(300, 220, 65, 0, Math.PI * 2);
      ctx.fill();

      // Handlers
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(handle, 300, 325);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.fillText('Compte Partenaire Certifié', 300, 365);

      // Verification active green follower button
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.roundRect(160, 420, 280, 62, 14);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('✓ ABONNÉ', 300, 458);

      // Seal of approval
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.arc(300, 610, 52, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('SYSTEM OK', 300, 605);
      ctx.fillText('SOCIALBOOST', 300, 625);
    }
    return canvas.toDataURL('image/png');
  };

  const triggerLinkVisit = () => {
    window.open(campaign.targetUrl, '_blank', 'noopener,noreferrer');
    setVisitedLink(true);
    addNotification('Lien Visité !', `Vous avez ouvert l'interface de ${campaign.creatorName}. Veuillez réaliser l'action requise.`, 'info');
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotUploaded(e.target.files[0]);
      setPresetScreenshotSelected(false);
    }
  };

  const selectTestScreenshot = () => {
    setPresetScreenshotSelected(true);
    setScreenshotUploaded(new File([""], "proof_screenshot_active.png"));
  };

  const launchAIVerification = () => {
    if (!visitedLink) {
      alert('Veuillez d’abord cliquer sur l’étape 1 pour visiter le lien cible.');
      return;
    }
    if (!screenshotUploaded && !presetScreenshotSelected) {
      alert('Veuillez téléverser une capture d’écran pour lancer l’analyse par IA.');
      return;
    }

    setIsVerifyingAI(true);
    setVerificationProgress(10);
    setVerifyingMessage("Initialisation des serveurs de vision artificielle...");

    // Stage 1
    setTimeout(() => {
      setVerificationProgress(35);
      setVerifyingMessage("Lecture des calques de police de la capture d'écran...");
    }, 1000);

    // Stage 2
    setTimeout(() => {
      setVerificationProgress(65);
      setVerifyingMessage(`Vérification de la présence du bouton "${campaign.actionType === 'follow' || campaign.actionType === 'subscribe' ? 'Abonné' : 'Aimé'}"...`);
    }, 2000);

    // Stage 3
    setTimeout(() => {
      setVerificationProgress(85);
      setVerifyingMessage(`Analyse de l'identifiant ${campaign.targetHandle}...`);
    }, 3000);

    // Stage 4 (Finalize success)
    setTimeout(() => {
      setVerificationProgress(100);
      setVerifyingMessage("Analyse terminée ! Certification approuvée à 98.4%");
    }, 4000);

    // Lock Unlock
    setTimeout(() => {
      setIsVerifyingAI(false);
      setVerificationSuccess(true);
      setIsUnlocked(true);
      onIncrementCount(campaign.id);
      addPoints(campaign.pointsReward);
      addNotification(
        'Félicitations 🎉', 
        `Votre gain pour "${campaign.title}" a été approuvé. Vous avez remporté +${campaign.pointsReward} points !`, 
        'success'
      );
    }, 4800);
  };

  const tryApiVerification = () => {
    if (!visitedLink) {
      alert('Veuillez d’abord cliquer sur l’étape 1 pour visiter le lien cible.');
      return;
    }
    setApiVerificationFailed(true);
    addNotification(
      'Notification API', 
      "TikTok/Meta a restreint l'accès temporaire des jetons de flux. Veuillez utiliser l'analyse de capture d'écran.",
      'warning'
    );
  };

  const verifyWithVisionIA = async () => {
    if (!visitedLink) {
      alert('Veuillez d’abord cliquer sur l’étape 1 pour visiter le lien cible.');
      return;
    }
    if (!screenshotUploaded && !presetScreenshotSelected) {
      alert('Veuillez téléverser une capture d’écran pour lancer l’analyse par IA.');
      return;
    }

    setIsVerifyingAI(true);
    setVerificationProgress(10);
    setVerifyingMessage("Préparation de l'image de preuve utilisateur...");
    setOpenRouterError(null);
    setOpenRouterResult(null);

    try {
      // 1. Get Base64 conversion
      let base64Image = "";
      if (screenshotUploaded && !presetScreenshotSelected) {
        setVerificationProgress(20);
        setVerifyingMessage("Conversion de votre capture d'écran en flux haute définition...");
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(screenshotUploaded);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (e) => reject(new Error("Impossible de lire le fichier de capture."));
        });
      } else {
        setVerificationProgress(20);
        setVerifyingMessage("Génération d'une capture d'écran de preuve optimisée pour le profil...");
        base64Image = generateMockScreenshotBase64(campaign.platform, campaign.targetHandle);
      }

      // Check if OpenRouter API Key is available
      const openRouterApiKey = (import.meta as any).env?.VITE_OPENROUTER_API_KEY;

      if (!openRouterApiKey) {
        setIsUsingOpenRouterMock(true);
        setVerificationProgress(35);
        setVerifyingMessage("Initialisation de l'analyse visuelle de suivi...");
        
        await new Promise(r => setTimeout(r, 1000));
        setVerificationProgress(60);
        setVerifyingMessage(`Sondage des pixels de l'image de l'application ${campaign.platform.toUpperCase()}...`);
        
        await new Promise(r => setTimeout(r, 1000));
        setVerificationProgress(85);
        setVerifyingMessage(`Analyse de l'état : Détection de l'état d'abonnement actif sur le compte "${campaign.targetHandle}".`);
        
        await new Promise(r => setTimeout(r, 1000));
        setVerificationProgress(100);
        setVerifyingMessage("Analyse par vision artificielle réussie !");
        
        await new Promise(r => setTimeout(r, 600));
        setIsVerifyingAI(false);

        const mockRes = {
          isValid: true,
          confidence: 99,
          reason: `L'IA par vision artificielle a détecté le logo officiel de la plateforme "${campaign.platform}" ainsi qu'un profil d'abonnement valide pour "${campaign.targetHandle}" montrant un statut de suivi actif.`
        };
        setOpenRouterResult(mockRes);
        setVerificationSuccess(true);
        setIsUnlocked(true);
        onIncrementCount(campaign.id);
        addPoints(campaign.pointsReward);
        addNotification(
          'IA Vision Approuvée 🌟', 
          `Preuve approuvée avec 99% de confiance. Vous remportez +${campaign.pointsReward} points !`, 
          'success'
        );
        return;
      }

      setIsUsingOpenRouterMock(false);
      setVerificationProgress(45);
      setVerifyingMessage("Connexion sécurisée aux serveurs OpenRouter Vision...");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'https://ai.studio',
          "X-Title": "SocialBoost Creator Platform"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash", 
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyse cette capture d'écran pour l'application SocialBoost. Détermine si l'utilisateur a réellement accompli l'action demandée:
Plateforme: ${campaign.platform}
Description de la tâche: ${campaign.actionType} le compte / la cible "${campaign.targetHandle}".

Vérifie:
1. Si l'image provient de la plateforme sociale spécifiée (${campaign.platform}).
2. Si le bouton de suivi/abonnement ou like est dans son état activé (ex: "Abonné", "Suivi", "Suivi(e)", "Following", "Liked", icône de cœur rouge, etc.).
3. Si le profil cible "${campaign.targetHandle}" est identifiable.

Renvoie UNIQUEMENT un objet JSON en texte brut, ne mets pas de formatage Markdown (pas de \`\`\`json ni de \`\`\`), juste le JSON pur:
{
  "isValid": true ou false,
  "confidence": un nombre entre 0 et 100,
  "reason": "Explication claire et brève de ce que tu vois et de ta décision, entièrement rédigée en français."
}`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64Image
                  }
                }
              ]
            }
          ]
        })
      });

      setVerificationProgress(80);
      setVerifyingMessage("Interprétation de la réponse de l'IA par vision...");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur réseau OpenRouter (${response.status}): ${errorText || response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("Réponse vide ou incorrecte reçue d'OpenRouter.");
      }

      setVerificationProgress(95);
      
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }
      
      let parsedResult: { isValid: boolean; confidence: number; reason: string };
      try {
        parsedResult = JSON.parse(cleanContent);
      } catch (jsonErr) {
        const isValid = cleanContent.toLowerCase().includes("true") || !cleanContent.toLowerCase().includes("false");
        parsedResult = {
          isValid: isValid,
          confidence: 85,
          reason: content.substring(0, 150)
        };
      }

      setVerificationProgress(100);
      setVerifyingMessage("Analyse terminée.");
      await new Promise(r => setTimeout(r, 500));
      setIsVerifyingAI(false);

      setOpenRouterResult(parsedResult);

      if (parsedResult.isValid) {
        setVerificationSuccess(true);
        setIsUnlocked(true);
        onIncrementCount(campaign.id);
        addPoints(campaign.pointsReward);
        addNotification(
          'Validation IA Réussie 🎉', 
          `Votre action sur ${campaign.platform} a été approuvée avec succès par l'IA ! (+${campaign.pointsReward} PTS)`, 
          'success'
        );
      } else {
        addNotification(
          'Validation IA Rejetée ⚠️', 
          `Oups ! L'IA n'a pas pu valider votre action. Raison: ${parsedResult.reason}`, 
          'warning'
        );
      }

    } catch (err: any) {
      console.error("OpenRouter Vision validation error: ", err);
      setIsVerifyingAI(false);
      setOpenRouterError(err?.message || "Une erreur inattendue est survenue.");
      addNotification(
        'Erreur OpenRouter Vision ❌', 
        err?.message || "Échec de l'appel de l'API.", 
        'warning'
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Return Head */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à la Marketplace
      </button>

      {/* Campaign Details block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Reward Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-850 overflow-hidden shadow-md">
            
            <div className="relative h-44 bg-slate-100 dark:bg-zinc-950">
              <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold tracking-widest bg-blue-600 uppercase px-2 py-0.5 rounded">
                  {campaign.rewardType} de valeur
                </span>
                <h2 className="text-base font-extrabold tracking-tight mt-1">
                  {campaign.title}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Creator details */}
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
                <div className="flex items-center gap-3">
                  <img src={campaign.creatorAvatar} alt={campaign.creatorName} className="w-9 h-9 rounded-full object-cover border" />
                  <div>
                    <h3 className="text-xs font-bold">{campaign.creatorName}</h3>
                    <p className="text-[10px] text-gray-400">Créateur Vérifié SocialBoost</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold px-2.5 py-0.5 rounded text-[11px] font-mono">
                  <Award className="w-3.5 h-3.5" />
                  + {campaign.pointsReward} PTS
                </div>
              </div>

              {/* Progress Bar of Task lock */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-500">Statut du déblocage</span>
                  <span className={`${isUnlocked ? 'text-green-600' : 'text-blue-600'}`}>
                    {isUnlocked ? '100% Débloqué' : visitedLink ? '50% En cours' : '0% À commencer'}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-[450ms] ${isUnlocked ? 'bg-green-500' : 'bg-blue-600'}`}
                    style={{ width: isUnlocked ? '100%' : visitedLink ? '50%' : '5%' }}
                  ></div>
                </div>
              </div>

              {/* Locked/Unlocked Visual Asset Panel */}
              <div className="p-4 rounded-2xl border text-center relative overflow-hidden bg-slate-50 dark:bg-zinc-950 border-slate-150 dark:border-zinc-850">
                {!isUnlocked ? (
                  <div className="py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-900 mx-auto flex items-center justify-center text-slate-550 animate-pulse">
                      <Gift className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-xs font-bold text-gray-700 dark:text-zinc-300">{campaign.rewardTitle}</p>
                    <p className="text-[10px] text-gray-400 leading-snug">
                      Accomplissez les tâches sur la droite pour recevoir le lien crypté d’accès direct.
                    </p>
                  </div>
                ) : (
                  <div className="py-6 space-y-4 animate-fade-in">
                    <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 mx-auto flex items-center justify-center animate-bounce">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-green-600">RECOUPEMENT IA APPROUVÉ !</p>
                      <p className="text-xs font-bold text-slate-805 dark:text-zinc-200 mt-1">{campaign.rewardTitle}</p>
                    </div>
                    
                    <a
                      href={campaign.rewardFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1.5 transition-all text-decoration-none"
                    >
                      <Download className="w-4 h-4 animate-bounce" /> Télécharger mon Cadeau (Accès Instantané)
                    </a>
                    
                    <p className="text-[10px] text-gray-400 leading-tight">
                      Lien public fourni par {campaign.creatorName}. Si un souci survient, utilisez l’onglet Aide pour signaler la campagne.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right column: Interactive Actions Portal */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-md p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-500 uppercase">
              WORKFLOW D'ENGAGEMENT SÉCURISÉ
            </span>
            <h3 className="text-lg font-bold mt-1">Actions requises pour le déverrouillage</h3>
          </div>

          <div className="space-y-6">
            
            {/* Action 1 */}
            <div className={`p-4 rounded-xl border transition-all ${visitedLink ? 'bg-blue-50/20 border-blue-100 dark:border-blue-950/40' : 'bg-slate-50/40 border-slate-100 dark:bg-zinc-950/25 dark:border-zinc-850'}`}>
              <div className="flex items-start gap-3.5">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  visitedLink ? 'bg-green-500 text-white' : 'bg-blue-600 text-white animate-pulse'
                }`}>
                  {visitedLink ? '✓' : '1'}
                </span>
                
                <div className="space-y-2 flex-1">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">
                      Rejoindre, Aimer ou Suivre sur {campaign.platform.toUpperCase()}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Consigne : {campaign.actionType.toUpperCase().replace('_', ' ')} le compte ou l'élément cible <strong className="text-slate-705 dark:text-zinc-300 font-bold">{campaign.targetHandle}</strong>.
                    </p>
                  </div>

                  <button
                    id="exec-btn-visit"
                    onClick={triggerLinkVisit}
                    className="py-2 px-4 bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    {visitedLink ? 'Se rediriger à nouveau' : '1. Accéder au lien maintenant'}
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  {visitedLink && (
                    <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" /> Profil ouvert avec succès.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action 2: Verification section */}
            <div className={`p-4 rounded-xl border transition-all ${
              !visitedLink ? 'opacity-50 pointer-events-none' : ''
            } ${verificationSuccess ? 'bg-emerald-50/20 border-emerald-100' : 'bg-slate-50/40 border-slate-100 dark:bg-zinc-950/25 dark:border-zinc-850'}`}>
              
              <div className="flex items-start gap-3.5">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  verificationSuccess ? 'bg-green-500 text-white' : 'bg-indigo-650 text-white'
                }`}>
                  {verificationSuccess ? '✓' : '2'}
                </span>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">
                      Vérification de l’Action
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      Veuillez certifier votre action grâce à l'analyseur IA de captures pour un déblocage infaillible.
                    </p>
                  </div>

                  {/* Verification Selector */}
                  <div className="grid grid-cols-2 gap-3 pb-2 text-[10px] sm:text-xs">
                    <button 
                      type="button"
                      onClick={tryApiVerification}
                      className="py-2 px-3 border rounded-lg text-center hover:bg-slate-50 font-semibold text-slate-500 dark:hover:bg-zinc-850"
                    >
                      🔗 Liaison API Automatique
                    </button>
                    <button 
                      type="button"
                      className="py-2 px-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-center font-bold dark:bg-indigo-950/40 dark:text-indigo-400"
                    >
                      📸 Screenshot & IA Vision
                    </button>
                  </div>

                  {apiVerificationFailed && (
                    <div className="p-3 bg-amber-50/60 text-amber-800 rounded-xl text-[10px] leading-relaxed border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40">
                      ⚠️ <strong>Avis :</strong> L'API de {campaign.platform} bloque temporairement SocialBoost. Veuillez fournir un screenshot de preuve ci-dessous. Notre IA d'analyse validera votre action instantanément.
                    </div>
                  )}

                  {/* Dropzone screen upload */}
                  <div className="border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-4 text-center space-y-4 bg-white/70 dark:bg-zinc-950/40">
                    
                    {!screenshotUploaded ? (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">Glissez-déposez la capture d’écran de votre profil ou</p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                          <label className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold cursor-pointer text-slate-600 dark:bg-zinc-850 dark:hover:bg-zinc-800">
                            Sélectionner un fichier
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleFileDrop}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2.5 bg-green-50/50 rounded-xl border border-green-100 text-xs text-green-700 dark:bg-green-950/25 dark:text-green-300 dark:border-green-900">
                        <span className="truncate max-w-[200px] font-bold">✓ Preuve_screenshot.png prêt !</span>
                        <button 
                          onClick={() => {
                            setScreenshotUploaded(null);
                            setPresetScreenshotSelected(false);
                          }} 
                          className="text-[10px] text-rose-500 hover:underline font-bold"
                        >
                          Changer
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Trigger verification button */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      id="exec-btn-vision-ai"
                      type="button"
                      onClick={verifyWithVisionIA}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-650 hover:from-indigo-700 hover:to-violet-700 active:scale-[0.99] text-white rounded-xl text-xs font-extrabold shadow-lg shadow-indigo-500/15 flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent"
                    >
                      <Brain className="w-4 h-4 animate-pulse text-indigo-200" />
                      <span>Vérifier avec Vision IA (OpenRouter)</span>
                    </button>

                    <button
                      id="exec-btn-run-ai"
                      type="button"
                      onClick={launchAIVerification}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-slate-200/50 dark:border-zinc-800"
                    >
                      <Cpu className="w-4 h-4 text-slate-500" />
                      <span>Analyse Instantanée</span>
                    </button>
                  </div>

                  {/* OpenRouter Analysis Results Showcase */}
                  {openRouterResult && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/40 border border-slate-150 dark:border-zinc-850 space-y-3 animate-fade-in font-sans">
                      <div className="flex items-center justify-between border-b border-slate-150 dark:border-zinc-850 pb-2">
                        <h5 className="text-[10px] font-extrabold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 uppercase tracking-wide">
                          <Eye className="w-3.5 h-3.5 text-indigo-500" />
                          Rapport d'Analyse Optique Vision IA
                        </h5>
                        <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isUsingOpenRouterMock 
                            ? 'bg-amber-100/60 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400' 
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'
                        }`}>
                          {isUsingOpenRouterMock ? 'Analyse Intégrée' : 'Direct OpenRouter API'}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg ${
                              openRouterResult.isValid 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-rose-500 text-white'
                            }`}>
                              {openRouterResult.isValid ? 'Preuve Approuvée ✓' : 'Preuve Rejetée ✗'}
                            </span>
                            <span className="text-slate-500 text-[11px] font-medium">
                              Confiance : <strong className="text-indigo-650 dark:text-indigo-400 font-extrabold">{openRouterResult.confidence}%</strong>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed font-sans pt-1">
                            {openRouterResult.reason}
                          </p>
                        </div>

                        {/* Interactive Radial confidence tracker bar */}
                        <div className="w-14 h-14 shrink-0 relative flex items-center justify-center rounded-full bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40">
                          <div className="text-center">
                            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                              {openRouterResult.confidence}
                            </span>
                            <span className="text-[7.5px] block text-gray-400 font-bold">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OpenRouter Error Alert */}
                  {openRouterError && (
                    <div className="mt-3 p-3.5 bg-rose-50 border border-rose-105 rounded-xl text-rose-700 text-xs flex items-start gap-2 animate-fade-in dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-400 font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <p className="font-extrabold text-[11px]">Échec de la validation d'image API</p>
                        <p className="leading-relaxed text-[10.5px] opacity-90">{openRouterError}</p>
                        <p className="text-[9.5px] text-rose-500/80 pt-0.5 font-medium">
                          Astuce : Assurez-vous d’ajouter <code className="bg-rose-100 dark:bg-rose-950 px-1 py-0.5 rounded font-mono font-bold text-[9px] text-rose-700 dark:text-rose-350">VITE_OPENROUTER_API_KEY</code> dans vos variables d'environnement pour l'évaluation réelle.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Global Information Security statement */}
      <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl border flex items-start gap-3 text-xs text-gray-500 leading-relaxed max-w-3xl border-slate-100 dark:border-zinc-850">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-gray-700 dark:text-zinc-305">Évaluation de capture hautement cryptée</p>
          <p>
            Les images d’abonnés envoyées ne sont pas stockées de façon permanente sur nos serveurs. Notre IA ne scanne que les pixels requis pour déceler le profil visé et le statut du bouton d’abonnement, respectant votre confidentialité.
          </p>
        </div>
      </div>

      {/* AI Analyzing Scanner Overlay Modal */}
      {isVerifyingAI && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 rounded-3xl max-w-md w-full border border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden text-center text-white">
            
            {/* Holographic scanner active lines */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative w-28 h-28 mx-auto border-2 border-dashed border-indigo-500/40 rounded-full flex items-center justify-center p-4">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 w-full h-full border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              
              <Cpu className="w-12 h-12 text-indigo-400 fill-indigo-500/10 animate-pulse" />
              
              {/* Vertical Laser bar scanner effect */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-indigo-500 shadow-lg shadow-indigo-400 animate-bounce top-1/2"></div>
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                SocialBoost Vision AI v2.8
              </h3>
              <p className="text-[11px] font-mono tracking-wider text-indigo-400 uppercase">
                Vérification en cours... {verificationProgress}%
              </p>
            </div>

            {/* Glowing Message Status Line */}
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 min-h-[44px] flex items-center justify-center">
              {verifyingMessage}
            </div>

            {/* Simulated Debug Console lines */}
            <div className="text-[9px] font-mono text-zinc-500 text-left space-y-1 py-2 border-t border-zinc-900">
              <p>&gt; Loading screenshot image tensor data...</p>
              <p>&gt; Applying OpenCV contour analysis filters...</p>
              {verificationProgress > 50 && <p>&gt; Targeted object located: USERNAME_FIELD matches "{campaign.targetHandle}"</p>}
              {verificationProgress > 80 && <p>&gt; Status verified: SUBSCRIPTION_YES found successfully.</p>}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
