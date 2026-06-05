import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  ArrowLeft, 
  Image as ImageIcon,
  Cpu,
  Zap,
  Globe,
  X
} from 'lucide-react';
import { Campaign, Platform, RewardType } from '../types';

interface CampaignBuilderProps {
  onAddCampaign: (campaign: Campaign) => void;
  setCurrentTab: (tab: string) => void;
}

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80'
];

const CAMPAIGN_PRESETS = [
  {
    id: 'ebook-promo',
    name: "Promotion d'Ebook & Leads",
    badge: "Leads +240% 🔥",
    icon: "📖",
    description: "Distribuez un livre blanc, guide d'expertise PDF ou checklist en échange d'un follow.",
    suggestedTitle: "Ebook Offert : 10 stratégies magiques de Growth Hacking pour 2026",
    suggestedDescription: "Abonnez-vous à mon profil d'expert sur Instagram pour déverrouiller immédiatement les 85 pages de ce livre blanc !",
    suggestedRewardType: 'pdf' as RewardType,
    suggestedRewardTitle: "Ebook_Growth_Hacking_Secrets_2026.pdf",
    suggestedRewardDescription: "Livre blanc hyper-structuré au format PDF contenant des scripts d'emails et tunnels de vente.",
    suggestedPlatform: 'instagram' as Platform,
    suggestedActionType: 'follow' as const,
    suggestedTargetUrl: 'https://instagram.com/votre_profil_socialboost',
    suggestedTargetHandle: '@votre_compte_insta',
    suggestedRewardFileUrl: 'https://socialboost.app/files/downloads/Ebook_Growth_Secrets_Secure_V1.pdf',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'product-launch',
    name: "Lancement de Produit E-com",
    badge: "Ventes +180% 🛍️",
    icon: "🚀",
    description: "Offrez un code promo massif ou bon d'achat pour booster la visibilité d'un lancement.",
    suggestedTitle: "Accès Privilégié & Code Promo 30% sur toute notre collection",
    suggestedDescription: "Partagez et repostez notre annonce officielle pour récupérer votre coupon VIP utilisable sans minimum.",
    suggestedRewardType: 'discount' as RewardType,
    suggestedRewardTitle: "CODE_PROMO_VIP_LAUNCH_30",
    suggestedRewardDescription: "Bon de réduction personnel de 30% valable sur l’intégralité de la boutique e-commerce.",
    suggestedPlatform: 'twitter' as Platform,
    suggestedActionType: 'repost' as const,
    suggestedTargetUrl: 'https://x.com/votre_compte/status/123456789',
    suggestedTargetHandle: '@votre_boutique_shopify',
    suggestedRewardFileUrl: 'https://votre-boutique-shopify.com/discount/applied_code_30',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'creator-growth',
    name: "Explosion d'Abonnés Chaine",
    badge: "Abonnés +350% ⚡",
    icon: "📺",
    description: "Proposez un tutoriel vidéo secret ou un canva template pour faire décoller votre audience.",
    suggestedTitle: "Tutoriel Vidéo Secret : Faire 1M de vues de façon organique en 15 jours",
    suggestedDescription: "Soutenez mon compte en vous abonnant à ma chaine YouTube pour débloquer ma masterclass d'une heure !",
    suggestedRewardType: 'video' as RewardType,
    suggestedRewardTitle: "Video_Masterclass_Abonnes_Explosion.mp4",
    suggestedRewardDescription: "Tutoriel vidéo complet avec fiches récapitulatives de scripts récurrents.",
    suggestedPlatform: 'youtube' as Platform,
    suggestedActionType: 'subscribe' as const,
    suggestedTargetUrl: 'https://youtube.com/c/VotreChaineGrandeur',
    suggestedTargetHandle: '@votre_chaine_officielle',
    suggestedRewardFileUrl: 'https://vimeo.com/private-video-stream-redirect-10928a',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'community-vip',
    name: "Communauté Privée VIP",
    badge: "Membres +290% 👥",
    icon: "💬",
    description: "Proposez un kit de prompts IA ou un outil No-code rare pour gonfler votre canal Telegram.",
    suggestedTitle: "Kit Ultime de 150+ Prompts ChatGPT-4 Master Copywriting",
    suggestedDescription: "Rejoignez notre canal public Telegram d'actualités industrielles pour obtenir ce kit de prompts d'élite !",
    suggestedRewardType: 'prompt' as RewardType,
    suggestedRewardTitle: "Prompts_ChatGPT_Copywriting_Deluxe.xlsx",
    suggestedRewardDescription: "Spreadshead structuré d’accroches publicitaires, structures d’e-mailing et prompts de relance.",
    suggestedPlatform: 'telegram' as Platform,
    suggestedActionType: 'join_channel' as const,
    suggestedTargetUrl: 'https://t.me/votre_canal_privilegie',
    suggestedTargetHandle: '@votre_canal_telegram',
    suggestedRewardFileUrl: 'https://notion.so/my_private_prompts_gobarits',
    coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=300&q=80'
  }
];

export default function CampaignBuilder({ onAddCampaign, setCurrentTab }: CampaignBuilderProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0]);
  const [customCover, setCustomCover] = useState('');
  const [rewardType, setRewardType] = useState<RewardType>('pdf');
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [rewardFileUrl, setRewardFileUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [actionType, setActionType] = useState<'follow' | 'subscribe' | 'like' | 'share' | 'repost' | 'join_group' | 'join_channel'>('follow');
  const [targetUrl, setTargetUrl] = useState('');
  const [targetHandle, setTargetHandle] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [expirationDate, setExpirationDate] = useState('2026-12-31');

  const handleApplyPreset = (preset: typeof CAMPAIGN_PRESETS[0]) => {
    setSelectedPreset(preset.id);
    setTitle(preset.suggestedTitle);
    setDescription(preset.suggestedDescription);
    setRewardType(preset.suggestedRewardType);
    setRewardTitle(preset.suggestedRewardTitle);
    setRewardDescription(preset.suggestedRewardDescription);
    setRewardFileUrl(preset.suggestedRewardFileUrl);
    setPlatform(preset.suggestedPlatform);
    setActionType(preset.suggestedActionType);
    setTargetUrl(preset.suggestedTargetUrl);
    setTargetHandle(preset.suggestedTargetHandle);
    setCoverImage(preset.coverImage);
    setCustomCover('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !rewardTitle || !targetUrl || !rewardFileUrl) {
      alert('Veuillez remplir les champs obligatoires (*)');
      return;
    }

    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      title,
      description: description || `Suivez notre consigne sur ${platform} pour débloquer ${rewardTitle} immédiatement !`,
      creatorName: 'Moi (Créateur)',
      creatorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      coverImage: customCover || coverImage,
      rewardType,
      rewardTitle,
      rewardDescription: rewardDescription || 'Récompense digitale instantanée vérifiée par IA.',
      rewardFileUrl,
      platform,
      actionType,
      targetUrl,
      targetHandle: targetHandle || `@mon_compte_${platform}`,
      participantsCount: 0,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
      expirationDate,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      pointsReward: 150
    };

    onAddCampaign(newCampaign);
    setCurrentTab('creator-campaigns');
  };

  const getPlatformLabel = (plat: Platform) => {
    switch (plat) {
      case 'tiktok': return 'TikTok';
      case 'youtube': return 'YouTube';
      case 'instagram': return 'Instagram';
      case 'telegram': return 'Telegram';
      case 'facebook': return 'Facebook (Meta)';
      case 'linkedin': return 'LinkedIn';
      case 'twitter': return 'X (Twitter)';
      default: return 'Réseau social';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Return Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setCurrentTab('creator-campaigns')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la liste
        </button>
        <span className="self-start sm:self-auto text-[10px] uppercase font-mono tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded dark:bg-indigo-950/40">
          Module de Planification de Campagne
        </span>
      </div>

      {/* Campaign Preset Templates Library Grid */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
              Bibliothèque de Modèles Prédéfinis
            </h3>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
            Configuration instantanée AI-Ready
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Choisissez un cas d'usage optimisé pour configurer en un clic les suggestions de types de récompenses appropriées et d'actions sociales requises.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {CAMPAIGN_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`minimal-card flex flex-col justify-between text-left p-4 rounded-xl border cursor-pointer select-none ${
                  isSelected 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/25 bg-indigo-50/5' 
                    : 'border-slate-100 dark:border-zinc-800 bg-slate-50/20 hover:border-indigo-400 dark:hover:border-zinc-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{preset.icon}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isSelected 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300'
                    }`}>
                      {preset.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-800 dark:text-zinc-200 line-clamp-1">{preset.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-400 leading-snug line-clamp-2">{preset.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-50 dark:border-zinc-850 flex items-center justify-between text-[9px] text-slate-405 dark:text-zinc-550 font-mono">
                  <span>Réseau: {preset.suggestedPlatform.toUpperCase()}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{preset.suggestedRewardType.toUpperCase()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPreset && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-900/40 rounded-lg text-xs text-emerald-800 dark:text-emerald-400 flex items-center justify-between gap-4 animate-fade-in select-none">
            <span className="font-semibold flex items-center gap-1.5 ">
              ✓ Modèle appliqué ! Les champs du formulaire ont été pré-remplis pour optimiser les conversions.
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedPreset(null);
              }}
              className="text-[10px] text-slate-400 hover:text-indigo-500 underline"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-50 dark:border-zinc-850 bg-gradient-to-tr from-blue-50/50 to-violet-50/50 dark:from-zinc-950/20 dark:to-zinc-950/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Créer une campagne SocialBoost</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Remplissez les informations ci-dessous pour configurer votre hub de distribution intelligent.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-600 border border-slate-200 dark:bg-zinc-800 dark:text-indigo-400 dark:border-zinc-700 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-750 transition-colors cursor-pointer"
            id="open-preset-modal-btn"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            Choisir un modèle
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Campaign details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 border-b pb-2 flex items-center gap-1.5 border-slate-150 dark:border-zinc-800">
              <span className="w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
              Informations générales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">
                  Titre public de la campagne *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Ebook Offert: Comment faire 12k de ventes sur Instagram"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 text-slate-800 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-900/50 rounded-lg shrink-0 transition-colors cursor-pointer"
                    id="choose-preset-title-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Choisir un modèle
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">
                  Description / Explication du cadeau
                </label>
                <input
                  type="text"
                  placeholder="Ex: Obtenez l'intégralité du livre blanc en échange de votre soutien social."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850"
                />
              </div>
            </div>

            {/* Cover Images Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-750 dark:text-zinc-350 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Image de couverture de page
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                {PRESET_COVERS.map((cov, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCoverImage(cov);
                      setCustomCover('');
                    }}
                    className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      coverImage === cov && !customCover ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={cov} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="pt-1.5">
                <input
                  type="url"
                  placeholder="Ou collez un lien URL d'image personnalisée (facultatif)"
                  value={customCover}
                  onChange={(e) => setCustomCover(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs bg-slate-50 border-slate-150 dark:bg-zinc-950 dark:border-zinc-850"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Core social conditions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 border-b pb-2 flex items-center gap-1.5 border-slate-150 dark:border-zinc-800">
              <span className="w-5 h-5 bg-violet-100 text-violet-800 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
              Quelles actions sociales demander ?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">Réseau Social Cible</label>
                <select
                  value={platform}
                  onChange={(e) => {
                    const val = e.target.value as Platform;
                    setPlatform(val);
                    // Adjust default matching actions
                    if (val === 'youtube') setActionType('subscribe');
                    else if (val === 'telegram') setActionType('join_channel');
                    else setActionType('follow');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-205 dark:bg-zinc-950 dark:border-zinc-850"
                >
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="telegram">Telegram</option>
                  <option value="twitter">X / Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">Action Requise</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-205 dark:bg-zinc-950 dark:border-zinc-850"
                >
                  {platform === 'youtube' ? (
                    <option value="subscribe">S’abonner à la chaine</option>
                  ) : platform === 'telegram' ? (
                    <>
                      <option value="join_channel">Rejoindre le canal public</option>
                      <option value="join_group">Rejoindre le groupe de discussion</option>
                    </>
                  ) : (
                    <>
                      <option value="follow">S'abonner au profil</option>
                      <option value="like">Aimer une publication</option>
                      <option value="share">Partager une publication / story</option>
                      {platform === 'twitter' && <option value="repost">Reposter (Retweeter)</option>}
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">Votre pseudo / nom d'affichage</label>
                <input
                  type="text"
                  placeholder="Ex: @thomas_crea ou Thomas Letellier"
                  value={targetHandle}
                  onChange={(e) => setTargetHandle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-855"
                />
              </div>

            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-gray-750 dark:text-zinc-350 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" /> URL complète de redirection (Profil / Publication) *
              </label>
              <input
                type="url"
                required
                placeholder="Ex: https://instagram.com/thomas_crea"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 font-mono text-gray-700 dark:text-zinc-300"
              />
              <p className="text-[10px] text-gray-400">
                La page de capture s'ouvrira d'abord sur cette URL pour que l'abonné réalise l'action requise.
              </p>
            </div>
          </div>

          {/* Section 3: The Reward definition */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 border-b pb-2 flex items-center gap-1.5 border-slate-150 dark:border-zinc-800">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
              Définir la Récompense Débloquée
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">Catégorie de récompense</label>
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value as RewardType)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850"
                >
                  <option value="pdf">Ebook PDF</option>
                  <option value="guide">Guide ou Plan mémo</option>
                  <option value="video">Tutoriel Vidéo exclusif</option>
                  <option value="template">Gabarit / Template Canva</option>
                  <option value="prompt">Kit de Prompts IA</option>
                  <option value="checklist">Checklist interactive Sheets</option>
                  <option value="software">Exécutable / Code ZIP</option>
                  <option value="discount">Réduction ou Coupon</option>
                  <option value="community">Accès Communauté VIP</option>
                  <option value="course">Accès Mini-formation</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">Nom exact du Bonus *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 50_Templates_Canva_Thomas.zip"
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 font-bold"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-750 dark:text-zinc-350">
                  Lien public de téléchargement / Redirection d'accès secret *
                </label>
                <input
                  type="url"
                  required
                  placeholder="Ex: https://canva.com/design/templates-vip-thomas_secret"
                  value={rewardFileUrl}
                  onChange={(e) => setRewardFileUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-200 dark:bg-zinc-950 dark:border-zinc-850 font-mono text-gray-700 dark:text-zinc-300"
                />
                <p className="text-[10px] text-gray-400">
                  N'ayez crainte ! Ce lien restera entièrement invisible et crypté pour le visiteur jusqu'à ce que l'IA confirme son action.
                </p>
              </div>

            </div>
          </div>

          {/* Section 4: Validation and constraints */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 border-b pb-2 flex items-center gap-1.5 border-slate-150 dark:border-zinc-800">
              <span className="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-[10px] font-bold">4</span>
              Limites & Expiration (Facultatif)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-400">Date de clôture / expiration</label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-150 dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-400">Nombre maximum d'accès (Quota)</label>
                <input
                  type="number"
                  placeholder="Ex: 500 (Laisser vide pour illimité)"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 border-slate-150 dark:bg-zinc-950"
                />
              </div>

            </div>

            <div className="p-4 rounded-xl border border-dashed border-indigo-150 bg-indigo-50/10 flex gap-3 text-xs">
              <Cpu className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-indigo-900 dark:text-indigo-400">Protection Antigraffe SocialBoost incluse</p>
                <p className="text-slate-500 dark:text-zinc-400">
                  Notre passerelle de rachat intègre des contrôles IP avancés pour bloquer les robots de rachat et les fausses soumissions d'images.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions footer */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setCurrentTab('creator-campaigns')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold hover:bg-slate-50 border dark:hover:bg-zinc-850"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-95 shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              Créer ma Page de Capture & QR Code
            </button>
          </div>

        </form>
      </div>

      {/* Modal de Sélection de Modèles */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="preset-modal" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl max-w-3xl w-full flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            id="preset-modal-content"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-tr from-slate-50 to-indigo-50/30 dark:from-zinc-950/40 dark:to-zinc-950/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">Choisir un modèle de campagne</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Sélectionnez un modèle prêt à l'emploi adapté à vos objectifs d'audience</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                id="close-preset-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Grid of presets) */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(85vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CAMPAIGN_PRESETS.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <div
                      key={preset.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/10 shadow-sm'
                          : 'border-slate-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-455 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Top icon and badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl p-2 bg-slate-50 dark:bg-zinc-850 rounded-xl">{preset.icon}</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                            {preset.badge}
                          </span>
                        </div>

                        {/* Info */}
                        <div>
                          <h4 className="font-bold text-sm text-slate-950 dark:text-zinc-100">{preset.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-1">{preset.description}</p>
                        </div>

                        {/* Configuration suggérée details */}
                        <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100 dark:border-zinc-850 space-y-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Configuration Proposée :</span>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-455 block text-[9px]">Action Demandée :</span>
                              <span className="font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1 mt-0.5">
                                {preset.suggestedPlatform.toUpperCase()} &bull; {preset.suggestedActionType}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-455 block text-[9px]">Récompense :</span>
                              <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-0.5">
                                {preset.suggestedRewardType.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleApplyPreset(preset);
                          setIsModalOpen(false);
                        }}
                        className="mt-5 w-full py-2 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" /> Appliquer ce Modèle
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
