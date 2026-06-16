import React, { useState } from 'react';
import { 
  Layers, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Plus, 
  QrCode, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  X,
  Printer,
  ChevronRight,
  Sparkles,
  Search,
  Check,
  Download,
  Sliders,
  Palette,
  Shield,
  RefreshCw,
  Share2,
  Smartphone
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Campaign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Tooltip } from './Tooltip';
import AlertDialog from './AlertDialog';

interface CampaignListProps {
  campaigns: Campaign[];
  onDeleteCampaign: (id: string) => void;
  onUpdateCampaign: (camp: Campaign) => void;
  setCurrentTab: (tab: string) => void;
  onSelectCampaign: (camp: Campaign) => void;
  isLoading?: boolean;
}

export default function CampaignList({ 
  campaigns, 
  onDeleteCampaign, 
  onUpdateCampaign,
  setCurrentTab,
  onSelectCampaign,
  isLoading
}: CampaignListProps) {
  const { t, language } = useLanguage();
  const [localLoading, setLocalLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTooltipText = (action: 'test' | 'share' | 'edit' | 'delete') => {
    const dict = {
      test: {
        fr: "Accéder à la page de capture de la campagne",
        en: "Access the campaign's opt-in capture page",
        es: "Acceder a la página de captura de la campaña"
      },
      share: {
        fr: "Générer le QR Code & copier les liens",
        en: "Generate QR Code & copy links",
        es: "Generar código QR y copiar enlaces"
      },
      edit: {
        fr: "Modifier les paramètres & la sécurité",
        en: "Tweak settings & security controls",
        es: "Modificar ajustes y controles de seguridad"
      },
      delete: {
        fr: "Supprimer définitivement la campagne",
        en: "Permanently delete this campaign",
        es: "Eliminar permanentemente la campaña"
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
  const [selectedShareCamp, setSelectedShareCamp] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Campaign Editing & Verification States
  const [editingCamp, setEditingCamp] = useState<Campaign | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTargetUrl, setEditTargetUrl] = useState('');
  const [editTargetHandle, setEditTargetHandle] = useState('');
  const [editRewardTitle, setEditRewardTitle] = useState('');
  const [editRewardFileUrl, setEditRewardFileUrl] = useState('');
  const [editExpirationDate, setEditExpirationDate] = useState('');
  const [editMaxParticipants, setEditMaxParticipants] = useState('');
  const [editEmailVerification, setEditEmailVerification] = useState(false);
  const [editEmailForVerification, setEditEmailForVerification] = useState('');

  // 2FA Security Code Verification States for sensitive modification
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [pendingUpdateCamp, setPendingUpdateCamp] = useState<Campaign | null>(null);
  const [resentCodeCount, setResentCodeCount] = useState(0);

  // Deletion Secure Verification States
  const [deletingCampId, setDeletingCampId] = useState<string | null>(null);
  const [deleteVerificationRequired, setDeleteVerificationRequired] = useState(false);
  const [deleteVerificationCode, setDeleteVerificationCode] = useState('');
  const [deleteUserInputCode, setDeleteUserInputCode] = useState('');
  const [deleteVerificationError, setDeleteVerificationError] = useState('');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);

  // Float simulation alert HUD for incoming email (to make verification testable)
  const [simulationEmailAlert, setSimulationEmailAlert] = useState<{
    show: boolean;
    to: string;
    code: string;
  } | null>(null);

  const sendVerificationCodeSimulation = (toEmail: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulationEmailAlert({ show: true, to: toEmail, code });
    // Automatically dismiss the simulating alert box after 20 seconds
    setTimeout(() => {
      setSimulationEmailAlert(prev => prev && prev.code === code ? { ...prev, show: false } : prev);
    }, 20000);
    return code;
  };

  const handleStartEdit = (camp: Campaign) => {
    setEditingCamp(camp);
    setEditTitle(camp.title);
    setEditDescription(camp.description);
    setEditTargetUrl(camp.targetUrl);
    setEditTargetHandle(camp.targetHandle);
    setEditRewardTitle(camp.rewardTitle);
    setEditRewardFileUrl(camp.rewardFileUrl);
    setEditExpirationDate(camp.expirationDate || '');
    setEditMaxParticipants(camp.maxParticipants ? camp.maxParticipants.toString() : '');
    setEditEmailVerification(!!camp.emailVerificationEnabled);
    setEditEmailForVerification(camp.emailForVerification || 'etsvictoria11@gmail.com');

    // Clear verification states
    setVerificationRequired(false);
    setUserInputCode('');
    setVerificationError('');
    setPendingUpdateCamp(null);
  };

  const checkIsSensitiveChange = (camp: Campaign) => {
    const isFileChanged = camp.rewardFileUrl !== editRewardFileUrl;
    const isTargetUrlChanged = camp.targetUrl !== editTargetUrl;
    const isTargetHandleChanged = camp.targetHandle !== editTargetHandle;
    const isSecurityToggled = !!camp.emailVerificationEnabled !== editEmailVerification;
    const isSecurityEmailChanged = camp.emailForVerification !== editEmailForVerification;

    return isFileChanged || isTargetUrlChanged || isTargetHandleChanged || isSecurityToggled || isSecurityEmailChanged;
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamp) return;

    if (!editTitle || !editRewardTitle || !editTargetUrl || !editRewardFileUrl) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    const updatedCamp: Campaign = {
      ...editingCamp,
      title: editTitle,
      description: editDescription,
      targetUrl: editTargetUrl,
      targetHandle: editTargetHandle,
      rewardTitle: editRewardTitle,
      rewardFileUrl: editRewardFileUrl,
      expirationDate: editExpirationDate,
      maxParticipants: editMaxParticipants ? parseInt(editMaxParticipants) : undefined,
      emailVerificationEnabled: editEmailVerification,
      emailForVerification: editEmailVerification ? editEmailForVerification : undefined,
    };

    const currentlyVerifying = !!editingCamp.emailVerificationEnabled;
    const isSensitive = checkIsSensitiveChange(editingCamp);

    if (currentlyVerifying && isSensitive) {
      // Security verification is turned ON: ask for verification email code
      const targetEmail = editingCamp.emailForVerification || 'etsvictoria11@gmail.com';
      const code = sendVerificationCodeSimulation(targetEmail);
      setVerificationCode(code);
      setPendingUpdateCamp(updatedCamp);
      setVerificationRequired(true);
      setUserInputCode('');
      setVerificationError('');
    } else {
      // Save directly
      onUpdateCampaign(updatedCamp);
      setEditingCamp(null);
    }
  };

  const handleVerifyCodeAndSave = () => {
    if (userInputCode.trim() === verificationCode) {
      if (pendingUpdateCamp) {
        onUpdateCampaign(pendingUpdateCamp);
      }
      setVerificationRequired(false);
      setEditingCamp(null);
      setPendingUpdateCamp(null);
      setUserInputCode('');
    } else {
      setVerificationError('Le code de sécurité saisi est incorrect. Veuillez vérifier la notification d’autorisation reçue.');
    }
  };

  const handleResendCode = () => {
    const targetEmail = editingCamp?.emailForVerification || 'etsvictoria11@gmail.com';
    const code = sendVerificationCodeSimulation(targetEmail);
    setVerificationCode(code);
    setResentCodeCount(prev => prev + 1);
    setVerificationError('');
  };

  // Custom Deletion that respects 2FA if active
  const handleDeleteButtonClick = (camp: Campaign) => {
    setCampaignToDelete(camp);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!campaignToDelete) return;
    const camp = campaignToDelete;
    
    if (camp.emailVerificationEnabled) {
      setDeletingCampId(camp.id);
      const targetEmail = camp.emailForVerification || 'etsvictoria11@gmail.com';
      const code = sendVerificationCodeSimulation(targetEmail);
      setDeleteVerificationCode(code);
      setDeleteVerificationRequired(true);
      setDeleteUserInputCode('');
      setDeleteVerificationError('');
    } else {
      onDeleteCampaign(camp.id);
    }
    setCampaignToDelete(null);
  };

  const handleVerifyDeleteCode = () => {
    if (deleteUserInputCode.trim() === deleteVerificationCode) {
      if (deletingCampId) {
        onDeleteCampaign(deletingCampId);
      }
      setDeleteVerificationRequired(false);
      setDeletingCampId(null);
      setDeleteUserInputCode('');
    } else {
      setDeleteVerificationError('Code de sécurité incorrect. Autorisation de suppression rejetée.');
    }
  };

  // QR Code Customizer State Properties
  const [qrFgColor, setQrFgColor] = useState('#4f46e5');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [qrLevel, setQrLevel] = useState<'L' | 'M' | 'Q' | 'H'>('Q');
  const [qrIncludeMargin, setQrIncludeMargin] = useState(true);
  const [qrLogoOption, setQrLogoOption] = useState<'none' | 'platform' | 'star' | 'custom'>('platform');
  const [qrCustomLabel, setQrCustomLabel] = useState('');
  const [qrCustomEmoji, setQrCustomEmoji] = useState('🎁');

  React.useEffect(() => {
    if (selectedShareCamp) {
      setQrCustomLabel(selectedShareCamp.rewardTitle || '');
    }
  }, [selectedShareCamp]);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/#campaign-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('campaign-qr-canvas') as HTMLCanvasElement;
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

  const handleMobileShare = async () => {
    if (!selectedShareCamp) return;
    const campaignUrl = `${window.location.origin}/#campaign-${selectedShareCamp.id}`;
    const shareData = {
      title: selectedShareCamp.title,
      text: `Participez à la campagne "${selectedShareCamp.title}" pour gagner : ${qrCustomLabel || selectedShareCamp.rewardTitle} ! 🎁🚀`,
      url: campaignUrl
    };

    const canvas = document.getElementById('campaign-qr-canvas') as HTMLCanvasElement;
    if (canvas && navigator.canShare && navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `qrcode-${selectedShareCamp.id}.png`, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                ...shareData,
                files: [file]
              });
            } else {
              await navigator.share(shareData);
            }
          } else {
            await navigator.share(shareData);
          }
        }, 'image/png');
      } catch (err) {
        console.error('Error sharing image on mobile:', err);
        try {
          await navigator.share(shareData);
        } catch (shareErr) {
          console.log('Mobile share cancelled:', shareErr);
        }
      }
    } else if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Mobile share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(campaignUrl);
      setCopiedId(selectedShareCamp.id);
      setTimeout(() => setCopiedId(null), 1800);
      alert(language === 'en' ? "Sharing not natively supported. Link copied to clipboard!" : language === 'es' ? "Partager non supporté. Lien copié au presse-papiers !" : "Le partage natif n'est pas supporté. Le lien a été copié dans votre presse-papiers !");
    }
  };

  const getPlatformColor = (plat: string) => {
    switch (plat) {
      case 'tiktok': return 'bg-zinc-900 text-white';
      case 'youtube': return 'bg-rose-600 text-white';
      case 'instagram': return 'bg-pink-600 text-white';
      case 'telegram': return 'bg-sky-500 text-white';
      case 'twitter': return 'bg-zinc-800 text-white';
      case 'facebook': return 'bg-blue-600 text-white';
      case 'linkedin': return 'bg-indigo-700 text-white';
      default: return 'bg-gray-650 text-white';
    }
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Title/Stat header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-blue-600" />
            {t.campListTitle.replace('{count}', campaigns.length.toString())}
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {t.campListSub}
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleManualRefresh}
            className={`px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-slate-700 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all outline-none cursor-pointer ${isRefreshing ? 'opacity-80' : ''}`}
            title={language === 'en' ? 'Refresh' : language === 'es' ? 'Actualizar' : 'Rafraîchir'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {language === 'en' ? 'Refresh' : language === 'es' ? 'Actualizar' : 'Rafraîchir'}
          </button>

          <button
            onClick={() => setCurrentTab('create-campaign')}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-md shadow-blue-500/10 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {t.dashNewCampaign}
          </button>
        </div>
      </div>

      {/* Filter and search tools */}
      <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-100 dark:border-zinc-805 shadow-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={t.campListSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
        />
      </div>

      {/* Campaign cards grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col justify-between animate-pulse"
            >
              <div>
                {/* cover image placeholder */}
                <div className="h-36 bg-slate-150 dark:bg-zinc-950/80 relative">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="w-16 h-4.5 bg-slate-200 dark:bg-zinc-800 rounded"></span>
                    <span className="w-16 h-4.5 bg-slate-200 dark:bg-zinc-800 rounded"></span>
                  </div>
                </div>
                {/* card padding details */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <span className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-2/3 block"></span>
                    <div className="space-y-1.5">
                      <span className="h-3.5 bg-slate-150 dark:bg-zinc-800/65 rounded w-full block"></span>
                      <span className="h-3.5 bg-slate-150 dark:bg-zinc-800/65 rounded w-4/5 block"></span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between border-t border-slate-50 dark:border-zinc-850/60 pt-4">
                    <span className="h-3.5 bg-slate-150 dark:bg-zinc-800 rounded w-20"></span>
                    <span className="h-3.5 bg-slate-200 dark:bg-zinc-800 rounded w-16"></span>
                  </div>
                </div>
              </div>
              
              {/* footer action buttons */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 flex items-center gap-2">
                <span className="h-9.5 bg-slate-150 dark:bg-zinc-800 rounded-xl w-1/3 animate-pulse"></span>
                <span className="h-9.5 bg-slate-200 dark:bg-zinc-800 rounded-xl w-2/3 animate-pulse"></span>
              </div>
            </div>
          ))
        ) : filteredCampaigns.length === 0 ? (
          <div className="md:col-span-3 text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
            <h3 className="font-bold text-slate-700 dark:text-zinc-300">{t.campListEmpty}</h3>
            <p className="text-xs text-slate-400">
              {language === 'en' ? "Why not create one right now in a single click?" : language === 'es' ? "¿Por qué no crear una ahora mismo en un clic?" : "Pourquoi ne pas en créer une maintenant en un clic ?"}
            </p>
            <button
              onClick={() => setCurrentTab('create-campaign')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              {language === 'en' ? "Create a campaign now" : language === 'es' ? "Crear una campaña ahora" : "Créer une campagne maintenant"}
            </button>
          </div>
        ) : (
          filteredCampaigns.map((camp) => (
            <div 
              key={camp.id} 
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Image & platform tag */}
                <div className="relative h-36 bg-slate-100 dark:bg-zinc-950">
                  <img src={camp.coverImage} alt={camp.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-350" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest ${getPlatformColor(camp.platform)}`}>
                      {camp.platform}
                    </span>
                    <span className="text-[9px] font-bold bg-white text-gray-800 px-2.5 py-0.5 rounded shadow">
                      {camp.rewardType.toUpperCase()}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Title overlay or summary bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-sm tracking-tight line-clamp-1 drop-shadow-sm">
                      {camp.title}
                    </h3>
                  </div>
                </div>

                {/* Body metadata stats */}
                <div className="p-4 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-slate-50 dark:bg-zinc-950 rounded-lg">
                      <p className="text-[10px] text-gray-400">{t.campListSoutiens}</p>
                      <p className="text-base font-extrabold font-mono text-indigo-650 dark:text-indigo-400 mt-0.5">{camp.participantsCount}</p>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-zinc-950 rounded-lg flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400">{t.campListConversion}</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-zinc-300 mt-0.5">~ 64.2%</p>
                    </div>
                  </div>

                  <div className="space-y-1 bg-slate-50/50 dark:bg-zinc-950/20 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-[10px]">{t.campListGift}</span>
                      <span className="font-bold text-slate-700 dark:text-zinc-300 truncate max-w-[150px]">{camp.rewardTitle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-[10px]">{t.campListAction}</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {camp.actionType === 'follow' ? t.dashTableActionAbonnement : camp.actionType === 'subscribe' ? t.dashTableActionAbonner : t.dashTableActionPartager} ({camp.targetHandle})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action operations footer card */}
              <div className="p-4 border-t/50 border-slate-50 dark:border-zinc-850 flex items-center justify-between gap-2.5">
                
                <Tooltip content={getTooltipText('test')} position="top">
                  <button
                    id={`list-unlock-sim-${camp.id}`}
                    onClick={() => onSelectCampaign(camp)}
                    className="px-3.5 py-1.5 bg-blue-50/70 hover:bg-blue-50 text-blue-700 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-colors dark:bg-blue-950/20 dark:text-blue-300 dark:hover:bg-blue-950/40 cursor-pointer"
                    aria-label={getTooltipText('test')}
                  >
                    {t.campListTest} <ChevronRight className="w-3 h-3" />
                  </button>
                </Tooltip>

                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <Tooltip content={getTooltipText('share')} position="top">
                    <button
                      id={`list-share-btn-${camp.id}`}
                      onClick={() => setSelectedShareCamp(camp)}
                      className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-150 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 inline-flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
                      aria-label={getTooltipText('share')}
                    >
                      <QrCode className="w-3.5 h-3.5" /> {t.campListShare}
                    </button>
                  </Tooltip>

                  <Tooltip content={getTooltipText('edit')} position="top">
                    <button
                      id={`list-edit-btn-${camp.id}`}
                      onClick={() => handleStartEdit(camp)}
                      className="p-1 px-1.5 bg-indigo-50/70 hover:bg-indigo-50 text-indigo-700 rounded border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-950 inline-flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
                      aria-label={getTooltipText('edit')}
                    >
                      <Sliders className="w-3.5 h-3.5" /> Modifier
                    </button>
                  </Tooltip>

                  <Tooltip content={getTooltipText('delete')} position="top">
                    <button
                      id={`list-delete-btn-${camp.id}`}
                      onClick={() => handleDeleteButtonClick(camp)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-100 dark:hover:border-rose-950 transition-all text-[10px] cursor-pointer"
                      aria-label={getTooltipText('delete')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </Tooltip>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* QR Code and Share Sheet Modal Overlay */}
      {selectedShareCamp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-hidden relative animate-fade-in text-gray-900 dark:text-zinc-150">
            
            {/* Header portion */}
            <div className="border-b border-slate-100 dark:border-zinc-800 p-6 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 dark:bg-zinc-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
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
                id="share-modal-close"
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
                  <div className="text-left flex justify-between items-start border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                    <div>
                      <span className="text-[8.5px] font-mono tracking-widest text-indigo-550 dark:text-indigo-400 uppercase font-bold">SOCIALBOOST HQ</span>
                      <p className="text-xs font-bold truncate text-slate-800 dark:text-zinc-150 mt-0.5 max-w-[180px]">{selectedShareCamp.title}</p>
                    </div>
                    <span className="text-[9px] font-extrabold font-mono uppercase bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-zinc-400">
                      {selectedShareCamp.platform}
                    </span>
                  </div>

                  {/* Dynamic Canvas rendering */}
                  <div className="p-3 bg-slate-50 dark:bg-zinc-950/10 rounded-xl inline-flex items-center justify-center border border-slate-100 dark:border-zinc-850/30 shadow-inner">
                    <QRCodeCanvas
                      id="campaign-qr-canvas"
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
                          : qrLogoOption === 'custom'
                          ? {
                              src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="12" y="18" font-size="16" text-anchor="middle">${encodeURIComponent(qrCustomEmoji)}</text></svg>`,
                              height: 32,
                              width: 32,
                              excavate: true
                            }
                          : undefined
                      }
                    />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-700 dark:text-zinc-300 font-mono max-w-[200px] truncate text-center">
                      {qrCustomLabel || selectedShareCamp.rewardTitle}
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
                      id="qr-copy-sub-link-btn"
                      onClick={() => copyLink(selectedShareCamp.id)}
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
                <div className="space-y-3 text-left">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-sans">
                    <Palette className="w-4 h-4 text-violet-500" />
                    {language === 'en' ? 'Point Colors & Style' : language === 'es' ? 'Estilo y Color de Puntos' : 'Style & Palette de Couleurs'}
                  </label>

                  {/* Preset Theme Palettes */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Preset Theme Palettes:' : language === 'es' ? 'Paletas de Temas Predefinidas:' : 'Thèmes préconfigurés :'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: 'Indigo', fg: '#4f46e5', bg: '#ffffff' },
                        { name: 'Sunset', fg: '#db2777', bg: '#fff1f2' },
                        { name: 'Emerald', fg: '#059669', bg: '#ecfdf5' },
                        { name: 'Cyber', fg: '#e11d48', bg: '#fef2f2' },
                        { name: 'Dark', fg: '#18181b', bg: '#f8fafc' },
                        { name: 'Gold', fg: '#d97706', bg: '#fef3c7' }
                      ].map(theme => (
                        <button
                          key={theme.name}
                          type="button"
                          onClick={() => {
                            setQrFgColor(theme.fg);
                            setQrBgColor(theme.bg);
                          }}
                          className="px-2 py-1 text-[9px] rounded bg-white hover:bg-slate-50 dark:bg-zinc-800 dark:hover:bg-zinc-750 font-medium text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 cursor-pointer"
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
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
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { option: 'none', label: language === 'en' ? 'None' : language === 'es' ? 'Ninguno' : 'Sans logo' },
                      { option: 'platform', label: language === 'en' ? 'Platform' : language === 'es' ? 'Réseau' : 'Réseau' },
                      { option: 'star', label: language === 'en' ? 'Star' : language === 'es' ? 'Estrella' : 'Étoile' },
                      { option: 'custom', label: language === 'en' ? 'Emoji' : language === 'es' ? 'Emoji' : 'Émoji' },
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

                  {qrLogoOption === 'custom' && (
                    <div className="space-y-2 p-2.5 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200/50 dark:border-zinc-800 animate-fade-in text-left">
                      <span className="text-[10px] text-slate-400 block font-semibold leading-none mb-1">
                        {language === 'en' ? 'Select or type custom emoji:' : language === 'es' ? 'Seleccione o escriba un emoji:' : 'Saisissez ou choisissez un émoji :'}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {['🎁', '🔥', '🚀', '💡', '💎', '🎉', '📢', '⚡', '❤️'].map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setQrCustomEmoji(emoji)}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg border text-sm transition-all hover:scale-110 cursor-pointer ${qrCustomEmoji === emoji ? 'bg-indigo-50 border-indigo-500 scale-105 font-bold' : 'bg-white dark:bg-zinc-900 border-slate-205 dark:border-zinc-800'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                        <input
                          type="text"
                          maxLength={2}
                          value={qrCustomEmoji}
                          onChange={(e) => setQrCustomEmoji(e.target.value)}
                          className="w-10 h-7 bg-white dark:bg-zinc-900 text-center text-xs border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-zinc-100"
                          placeholder="Emoji"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Subtitle text */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5 font-sans">
                    <Sliders className="w-4 h-4 text-pink-550" />
                    {language === 'en' ? 'Custom Action Label' : language === 'es' ? 'Texto de Llamado a la Acción' : 'Texte d\'appel à l\'action'}
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={qrCustomLabel}
                    onChange={(e) => setQrCustomLabel(e.target.value)}
                    className="w-full text-xs bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-850 focus:outline-none focus:ring-1 focus:ring-indigo-505 text-slate-800 dark:text-zinc-200"
                    placeholder={language === 'en' ? 'e.g., Scan to win!' : language === 'es' ? 'ej., ¡Escanea para ganar!' : 'ex : Scannez pour gagner !'}
                  />
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
                      className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
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
                <div className="pt-3 flex flex-col gap-2">
                  <div className="flex gap-2.5">
                    <button
                      id="qr-btn-download-trigger"
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

                  <button
                    onClick={handleMobileShare}
                    className="w-full py-2.5 px-4 rounded-xl border-2 border-indigo-150 text-indigo-750 dark:border-indigo-900/50 dark:text-indigo-300 bg-indigo-50/20 hover:bg-indigo-50/45 dark:bg-indigo-950/20 hover:bg-indigo-50/50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-indigo-500 animate-bounce" />
                    {language === 'en' ? 'Share Custom Code on Mobile' : language === 'es' ? 'Compartir QR en Móvil' : 'Partager sur Mobile (WhatsApp, SMS...)'}
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2FA EMAIL DELIVERED NOTIFICATION TOAST IN THE CORNER */}
      {simulationEmailAlert?.show && (
        <div id="simulation-email-alert-hud" className="fixed bottom-6 right-6 z-55 max-w-sm w-full bg-slate-900 text-white dark:bg-white dark:text-zinc-950 p-4 rounded-2xl shadow-2xl border-2 border-emerald-500 animate-slide-in flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-zinc-800 dark:border-slate-100 pb-2">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold animate-pulse">
              📩 Centre d'Alerte Sécurisé (SocialBoost Notify)
            </span>
            <button 
              onClick={() => setSimulationEmailAlert(prev => prev ? { ...prev, show: false } : null)}
              className="p-1 hover:bg-zinc-800 dark:hover:bg-slate-200 rounded text-gray-400 dark:text-zinc-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300 dark:text-zinc-700">
            <p><strong>De :</strong> security-alerts@socialboost.io</p>
            <p><strong>À :</strong> {simulationEmailAlert.to}</p>
            <div className="bg-emerald-950/45 dark:bg-slate-50 text-emerald-200 dark:text-zinc-850 p-2 rounded border border-emerald-900/60 font-mono text-[11px] leading-snug">
              Objet : Code d'autorisation temporaire - Paramètres de campagne.<br/>
              Votre code indispensable à usage unique pour valider les modifications sensibles est : 
              <strong className="text-sm font-mono block text-center text-emerald-300 dark:text-emerald-650 bg-black/40 dark:bg-slate-100 p-2 rounded tracking-widest mt-1">
                {simulationEmailAlert.code}
              </strong>
            </div>
          </div>
          <p className="text-[9px] text-gray-400 dark:text-zinc-500 italic mt-0.5 leading-tight">
            * Ce volet de sécurité vous permet de valider le parcours utilisateur de sécurité 2FA de SocialBoost de manière hautement sécurisée.
          </p>
        </div>
      )}

      {/* EDITING CAMPAIGN MODAL CARD */}
      {editingCamp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full border border-slate-150 dark:border-zinc-800 shadow-2xl relative animate-fade-in text-gray-900 dark:text-zinc-150 max-h-[92vh] flex flex-col justify-between overflow-hidden">
            
            {/* Modal Header */}
            <div className="border-b border-slate-100 dark:border-zinc-800 p-5 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-955/20 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-xl">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-950 dark:text-white">
                    Modifier la campagne & Sécurité
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Mettez à jour le lien de distribution, les cibles et la double validation par code email.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingCamp(null);
                  setVerificationRequired(false);
                }}
                className="p-1 text-zinc-400 hover:text-zinc-650 bg-slate-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form Container */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              
              {!verificationRequired ? (
                <form onSubmit={handleSaveEdit} className="space-y-6 text-left">
                  
                  {/* Part 1: Default Information */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                      📋 Informations Générales de la Campagne
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                      
                      <div className="space-y-1">
                        <label className="text-gray-700 dark:text-zinc-300">Titre de la campagne *</label>
                        <input
                          type="text"
                          required
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none font-bold text-gray-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-700 dark:text-zinc-300">Description / Consigne</label>
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none text-gray-650"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-755 dark:text-zinc-400">Expiration / Clôture</label>
                        <input
                          type="date"
                          value={editExpirationDate}
                          onChange={(e) => setEditExpirationDate(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-755 dark:text-zinc-400">Nombre maximum d'accès (Quota)</label>
                        <input
                          type="number"
                          placeholder="Illimité"
                          value={editMaxParticipants}
                          onChange={(e) => setEditMaxParticipants(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Part 2: Sensitive Configuration Fields */}
                  <div className="space-y-4 pt-4 border-t border-slate-150 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] bg-red-100 text-red-700 dark:bg-rose-950/40 dark:text-rose-450 font-bold px-2 py-0.5 rounded tracking-wider">
                        SENSIPLE
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 font-mono flex items-center gap-1">
                        ⚠️ Paramètres Sensibles Protégés
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                      
                      <div className="space-y-1">
                        <label className="text-gray-755 dark:text-zinc-400">Identifiant social / Handle visé *</label>
                        <input
                          type="text"
                          required
                          value={editTargetHandle}
                          onChange={(e) => setEditTargetHandle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none font-bold text-gray-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-755 dark:text-zinc-400">Lien exact de redirection réseau (*)</label>
                        <input
                          type="url"
                          required
                          value={editTargetUrl}
                          onChange={(e) => setEditTargetUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-755 dark:text-zinc-400">Nom du Bonus livré *</label>
                        <input
                          type="text"
                          required
                          value={editRewardTitle}
                          onChange={(e) => setEditRewardTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none font-bold text-gray-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-700 dark:text-zinc-300">Lien secret de récompense *</label>
                        <input
                          type="url"
                          required
                          value={editRewardFileUrl}
                          onChange={(e) => setEditRewardFileUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-zinc-950 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-lg outline-none text-gray-700 font-mono dark:text-zinc-300"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Part 3: Email Verification preference toggle */}
                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                    <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-3.5">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-xs text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 font-sans">
                            <Shield className="w-4 h-4 text-indigo-500 animate-pulse" /> Activer la Validation 2FA par Email
                          </label>
                          <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-snug font-sans">
                            Si cette option est cochée, toute modification future des paramètres sensibles exigera la saisie d'un code temporaire à 6 chiffres envoyé au mail configuré.
                          </p>
                        </div>

                        {/* Custom Switch Toggle button */}
                        <button
                          type="button"
                          onClick={() => setEditEmailVerification(!editEmailVerification)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${editEmailVerification ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-zinc-800'}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${editEmailVerification ? 'translate-x-5' : 'translate-x-0'}`}
                          />
                        </button>
                      </div>

                      {editEmailVerification && (
                        <div className="space-y-1.5 pt-2.5 border-t border-slate-200 dark:border-zinc-800 animate-fade-in text-xs font-semibold">
                          <label className="text-gray-700 dark:text-zinc-300">Email destinataire de sauvegarde</label>
                          <input
                            type="email"
                            required={editEmailVerification}
                            placeholder="createur@studio_growth.com"
                            value={editEmailForVerification}
                            onChange={(e) => setEditEmailForVerification(e.target.value)}
                            className="w-full max-w-md px-3 py-2 bg-white dark:bg-zinc-900 border text-xs text-slate-800 dark:text-zinc-200 rounded-lg outline-none font-mono tracking-wide"
                          />
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Form Footer Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingCamp(null)}
                      className="px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold border border-slate-150 dark:border-zinc-850 cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Shield className="w-4 h-4" /> Enregistrer les changements
                    </button>
                  </div>

                </form>
              ) : (
                
                /* VERIFICATION CODE SCREEN IF REQUIRED */
                <div className="py-6 text-center space-y-6 max-w-md mx-auto animate-fade-in text-xs">
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/45 rounded-full flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
                    <Shield className="w-7 h-7 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Validation double facteur requise 🛡️
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 leading-relaxed text-center">
                      Par mesure de sécurité pour votre audience, un code confidentiel à usage unique à 6 chiffres a été envoyé à l'adresse :<br/>
                      <strong className="text-indigo-600 dark:text-indigo-400 font-mono select-all text-xs block mt-1">{editingCamp.emailForVerification || 'etsvictoria11@gmail.com'}</strong>
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="••••••"
                        value={userInputCode}
                        onChange={(e) => {
                          setUserInputCode(e.target.value.replace(/\D/g, ''));
                          setVerificationError('');
                        }}
                        className="text-center font-mono text-2xl tracking-[0.5em] px-4 py-3 text-slate-900 bg-slate-50 border-2 border-slate-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 rounded-2xl w-48 outline-none focus:border-indigo-500 focus:bg-white"
                      />
                    </div>

                    {verificationError && (
                      <p className="text-rose-500 font-semibold leading-relaxed px-4 text-center">
                        {verificationError}
                      </p>
                    )}

                    <div className="text-center text-[10px] text-gray-400">
                      Entrez le code requis pour approuver les altérations.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setVerificationRequired(false)}
                      className="flex-1 py-2.5 rounded-xl font-bold bg-slate-50 hover:bg-slate-100 dark:bg-zinc-805 dark:hover:bg-zinc-850 hover:text-slate-800 text-xs border border-transparent cursor-pointer"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyCodeAndSave}
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer"
                    >
                      Approuver & Sauvegarder
                    </button>
                  </div>

                  <div className="pt-3 border-t dark:border-zinc-800 text-center">
                    <p className="text-[10px] text-slate-400">
                      Vous n'avez pas reçu l'e-mail ?{' '}
                      <button 
                        type="button" 
                        onClick={handleResendCode}
                        className="text-blue-500 hover:underline font-bold bg-transparent border-none cursor-pointer"
                      >
                        Renvoyer un nouveau code ({resentCodeCount})
                      </button>
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* DELETION CONFIRMATION WITH EMAIL VERIFICATION */}
      {deleteVerificationRequired && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in text-xs text-gray-900 dark:text-zinc-100 text-center font-sans">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-150 dark:border-zinc-800 max-w-sm w-full shadow-2xl space-y-6">
            
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-955/20 rounded-full flex items-center justify-center text-rose-500 animate-pulse mx-auto">
              <Trash2 className="w-5.5 h-5.5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Autorisation de suppression requise 🛡️
              </h3>
              <p className="text-slate-505 dark:text-zinc-400 leading-relaxed text-center">
                La campagne visée possède la sécurité 2FA activée. Veuillez insérer le code de sécurité envoyé à l'email pour détruire définitivement cette campagne et son lien d'accès.
              </p>
            </div>

            <div className="space-y-3 flex flex-col items-center">
              <input
                type="text"
                placeholder="••••••"
                maxLength={6}
                value={deleteUserInputCode}
                onChange={(e) => {
                  setDeleteUserInputCode(e.target.value.replace(/\D/g, ''));
                  setDeleteVerificationError('');
                }}
                className="text-center font-mono text-xl tracking-[0.4em] p-2 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-205 dark:border-zinc-800 w-36 outline-none text-slate-800 dark:text-zinc-150"
              />
              
              {deleteVerificationError && (
                <p className="text-rose-500 font-semibold px-2 text-center">{deleteVerificationError}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteVerificationRequired(false);
                  setDeletingCampId(null);
                }}
                className="flex-1 py-2.5 border rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-850 font-bold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleVerifyDeleteCode}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-750 text-white rounded-xl font-bold shadow cursor-pointer"
              >
                Détruire
              </button>
            </div>

          </div>
        </div>
      )}

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => {
          setIsDeleteAlertOpen(false);
          setCampaignToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={
          language === 'fr' 
            ? 'Supprimer la campagne ?' 
            : language === 'es' 
              ? '¿Eliminar campaña?' 
              : 'Delete campaign?'
        }
        description={
          language === 'fr'
            ? `Êtes-vous sûr de vouloir supprimer définitivement la campagne "${campaignToDelete?.title || ''}" ? Cette action est irréversible.`
            : language === 'es'
              ? `¿Está seguro de que desea eliminar permanentemente la campaña "${campaignToDelete?.title || ''}"? Cette action no se puede deshacer.`
              : `Are you sure you want to permanently delete the campaign "${campaignToDelete?.title || ''}"? This action cannot be undone.`
        }
        confirmText={
          language === 'fr'
            ? 'Supprimer'
            : language === 'es'
              ? 'Eliminar'
              : 'Delete'
        }
        cancelText={
          language === 'fr'
            ? 'Annuler'
            : language === 'es'
              ? 'Cancelar'
              : 'Cancel'
        }
        type="danger"
      />

    </div>
  );
}
